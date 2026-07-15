import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
  createGateway,
  tool,
} from 'ai'
import { z } from 'zod'
import { services } from '@/components/services'
import { faqs } from '@/components/faq'
import { getAvailableSlots, createCalendarEvent } from '@/lib/google-calendar'
import { sendOwnerNotification } from '@/lib/google-gmail'
import { appendLeadRow } from '@/lib/google-sheets'

export const maxDuration = 30

const SYSTEM_PROMPT = `You are Readdy Agent, the friendly AI assistant for ElectricJamex — a NAPIT-approved and Which? Trusted Trader electrician based in NW2, North West London.

Your role is to:
- Answer questions about ElectricJamex's services
- Help customers understand what they need
- Provide general electrical advice (while always recommending professional assessment)
- Guide customers toward booking a consultation or getting a quote. YOU HAVE THE ABILITY TO BOOK APPOINTMENTS FOR CUSTOMERS.

Here are the detailed services we offer:
${services.map(s => `- ${s.title}: ${s.summary}\n  Details: ${s.details}`).join('\n\n')}

Here are our Frequently Asked Questions (Use these to answer user queries):
${faqs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')}

Key information:
- Based in NW2, serves North West London (Cricklewood, Willesden, Kilburn, Hampstead, Golders Green, Hendon)
- NAPIT Approved Contractor
- Which? Trusted Trader
- Part P Registered
- Fully insured
- BS 7671 compliant
- Available Mon-Sat, 8am-6pm
- Free, no-obligation quotes
- Emergency call-out available
- Phone: 07000 000 000
- Email: info@electricjamex.co.uk

Tone: Professional, friendly, helpful, and reassuring. Keep responses concise but thorough. Always prioritize safety. By default, you use a British English voice to speak to users, so write your responses in a way that sounds natural when spoken aloud.

**BOOKING APPOINTMENTS (IMPORTANT)**
If a user wants to book an appointment, you must collect the following details:
1. Full Name
2. Email Address
3. Phone Number
4. Service they need (e.g. EICR, EV Charger, Full Rewire, etc.)
5. Date (YYYY-MM-DD)
6. Time (HH:mm)
7. Full Address (including postcode)
8. Any extra notes (optional)

Do not overwhelm the user; ask for these details in 1 or 2 steps (e.g. "What's your name, email, and phone number?", then "What date and time work best for you?", etc).
When the user proposes a date, you MUST use the \`checkAvailability\` tool to see what times are actually available on that date.
When you have collected all the required details AND confirmed an available time slot, you MUST use the \`bookAppointment\` tool to finalize the booking. Do not say it is booked until the \`bookAppointment\` tool returns success.

If someone asks about pricing, give general ranges but always recommend getting a formal quote. If someone describes an emergency, advise them to call directly.`

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json()

    const myGateway = createGateway({
      apiKey: process.env.AI_GATEWAY_API_KEY,
    })

    const result = streamText({
      model: myGateway.languageModel('openai/gpt-4o-mini'),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      abortSignal: req.signal,
      tools: {
        checkAvailability: tool({
          description: 'Check available time slots for a specific date.',
          parameters: z.object({
            date: z.string().describe('The date to check in YYYY-MM-DD format (e.g. 2026-07-20).'),
          }),
          // @ts-ignore
          execute: async ({ date }: { date: string }) => {
            try {
              const availableSlots = await getAvailableSlots(date)
              return { success: true, availableSlots, message: `Available slots for ${date}: ${availableSlots.join(', ')}` }
            } catch (error: any) {
              return { success: false, error: error.message || 'Failed to check availability' }
            }
          },
        }),
        bookAppointment: tool({
          description: 'Book an appointment for the customer.',
          parameters: z.object({
            name: z.string().describe('Customer full name'),
            email: z.string().email().describe('Customer email address'),
            phone: z.string().describe('Customer phone number'),
            service: z.string().describe('The service requested (e.g. EICR, EV Charger, Full Rewire)'),
            date: z.string().describe('The date for the appointment in YYYY-MM-DD format'),
            time: z.string().describe('The time for the appointment in HH:mm format'),
            address: z.string().describe('The full address where the service is needed'),
            notes: z.string().optional().describe('Any additional notes from the customer'),
          }),
          // @ts-ignore
          execute: async (data: any) => {
            try {
              // 1. Check availability
              const availableSlots = await getAvailableSlots(data.date);
              if (!availableSlots.includes(data.time)) {
                return {
                  success: false,
                  error: `The slot ${data.time} on ${data.date} is no longer available.`,
                  availableSlots,
                };
              }

              // 2. Create calendar event
              const calendarLink = await createCalendarEvent({
                date: data.date,
                time: data.time,
                customerName: data.name,
                customerEmail: data.email,
                customerPhone: data.phone,
                service: data.service,
                address: data.address,
                notes: data.notes || '',
              });

              // 3. Send Gmail notification (fire-and-forget)
              sendOwnerNotification({
                customerName: data.name,
                customerEmail: data.email,
                customerPhone: data.phone,
                service: data.service,
                date: data.date,
                time: data.time,
                address: data.address,
                notes: data.notes || '',
                calendarLink,
              }).catch((err) => console.error('Gmail notification failed:', err));

              // 4. Append to Google Sheets (fire-and-forget)
              appendLeadRow({
                customerName: data.name,
                customerEmail: data.email,
                customerPhone: data.phone,
                service: data.service,
                date: data.date,
                time: data.time,
                address: data.address,
                notes: data.notes || '',
                calendarLink,
              }).catch((err) => console.error('Sheets append failed:', err));

              return { success: true, message: `Booking confirmed successfully for ${data.date} at ${data.time}!` }
            } catch (error: any) {
              console.error('Booking tool error:', error)
              return { success: false, error: 'Something went wrong while booking the appointment.' }
            }
          },
        }),
      },
    })

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      consumeSseStream: consumeStream,
    })
  } catch (error: any) {
    console.error('Chat error:', error)
    return new Response(error.message || 'Error occurred', { status: 500 })
  }
}
