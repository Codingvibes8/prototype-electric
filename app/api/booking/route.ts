import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots, createCalendarEvent } from '@/lib/google-calendar';
import { sendOwnerNotification } from '@/lib/google-gmail';
import { appendLeadRow } from '@/lib/google-sheets';

const VALID_SERVICES = [
  'EICR / Electrical Safety Certificate',
  'EV Charger Installation',
  'Fuse Board / Consumer Unit Upgrade',
  'Full Rewire',
  'Lighting & Socket Installation',
  'Fault Finding & Repair',
  'Other / Not Sure',
] as const;

interface BookingBody {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  address: string;
  notes?: string;
}

function validate(body: Partial<BookingBody>): { valid: true; data: BookingBody } | { valid: false; error: string } {
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
    return { valid: false, error: 'Name is required (min 2 characters).' };
  }
  if (!body.email || typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return { valid: false, error: 'A valid email address is required.' };
  }
  if (!body.phone || typeof body.phone !== 'string' || body.phone.trim().length < 7) {
    return { valid: false, error: 'A valid phone number is required.' };
  }
  if (!body.service || !VALID_SERVICES.includes(body.service as typeof VALID_SERVICES[number])) {
    return { valid: false, error: `Service must be one of: ${VALID_SERVICES.join(', ')}.` };
  }
  if (!body.date || typeof body.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(body.date)) {
    return { valid: false, error: 'Date must be in YYYY-MM-DD format.' };
  }
  if (!body.time || typeof body.time !== 'string' || !/^\d{2}:\d{2}$/.test(body.time)) {
    return { valid: false, error: 'Time must be in HH:mm format.' };
  }
  if (!body.address || typeof body.address !== 'string' || body.address.trim().length < 5) {
    return { valid: false, error: 'Address is required (min 5 characters).' };
  }

  return {
    valid: true,
    data: {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      service: body.service,
      date: body.date,
      time: body.time,
      address: body.address.trim(),
      notes: body.notes?.trim() || '',
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = validate(body);

    if (!result.valid) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    const { data } = result;

    // 1. Check availability
    const availableSlots = await getAvailableSlots(data.date);
    if (!availableSlots.includes(data.time)) {
      return NextResponse.json(
        {
          success: false,
          error: `The slot ${data.time} on ${data.date} is no longer available.`,
          availableSlots,
        },
        { status: 409 }
      );
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

    // 3. Send Gmail notification (fire-and-forget — don't block response)
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

    return NextResponse.json({
      success: true,
      message: `Booking confirmed for ${data.date} at ${data.time}. We'll send a confirmation to ${data.email}.`,
      calendarLink,
    });
  } catch (err) {
    console.error('Booking error:', err);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}