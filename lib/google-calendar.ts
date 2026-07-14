import { getCalendarClient } from './google-auth';

interface BookingSlot {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm (24h)
}

/**
 * Check free/busy for a given date and return available 1-hour slots
 * between 08:00–17:00 (Mon–Fri), excluding already-booked time.
 */
export async function getAvailableSlots(date: string): Promise<string[]> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) throw new Error('Missing GOOGLE_CALENDAR_ID env var');

  const calendar = getCalendarClient();

  const dayStart = new Date(`${date}T08:00:00+00:00`);
  const dayEnd = new Date(`${date}T17:00:00+00:00`);

  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      items: [{ id: calendarId }],
    },
  });

  const busy = res.data.calendars?.[calendarId]?.busy ?? [];

  // Generate all 1-hour slots from 08:00 to 16:00 (last slot starts at 16:00)
  const allSlots: string[] = [];
  for (let h = 8; h < 17; h++) {
    allSlots.push(`${String(h).padStart(2, '0')}:00`);
  }

  // Filter out slots that overlap with busy periods
  const available = allSlots.filter((slot) => {
    const slotStart = new Date(`${date}T${slot}:00+00:00`);
    const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000);

    return !busy.some((b) => {
      const bStart = new Date(b.start!);
      const bEnd = new Date(b.end!);
      return slotStart < bEnd && slotEnd > bStart;
    });
  });

  return available;
}

/**
 * Create a 1-hour calendar event and return the event link.
 */
export async function createCalendarEvent(params: {
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string;
  address: string;
  notes: string;
}): Promise<string> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) throw new Error('Missing GOOGLE_CALENDAR_ID env var');

  const calendar = getCalendarClient();

  const startDateTime = new Date(`${params.date}T${params.time}:00+00:00`);
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

  const description = [
    `Customer: ${params.customerName}`,
    `Email: ${params.customerEmail}`,
    `Phone: ${params.customerPhone}`,
    `Service: ${params.service}`,
    `Address: ${params.address}`,
    params.notes ? `Notes: ${params.notes}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const event = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `🔌 ${params.service} — ${params.customerName}`,
      description,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'Europe/London',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'Europe/London',
      },
      attendees: [{ email: params.customerEmail, displayName: params.customerName }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    },
  });

  return event.data.htmlLink ?? '';
}