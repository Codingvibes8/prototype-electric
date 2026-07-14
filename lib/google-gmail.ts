import { getGmailClient } from './google-auth';

/**
 * Send a booking notification to the business owner via Gmail.
 * Uses the Service Account to send on behalf of the delegated address.
 */
export async function sendOwnerNotification(params: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string;
  date: string;
  time: string;
  address: string;
  notes: string;
  calendarLink: string;
}): Promise<void> {
  const ownerEmail = process.env.OWNER_EMAIL;
  if (!ownerEmail) throw new Error('Missing OWNER_EMAIL env var');

  const gmail = getGmailClient();

  const timeFormatted = `${params.date} at ${params.time}`;

  const htmlBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
  <h2 style="color: #1a73e8;">🔌 New Booking — Electric Jamez</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Customer:</td><td>${params.customerName}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${params.customerEmail}">${params.customerEmail}</a></td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td><a href="tel:${params.customerPhone}">${params.customerPhone}</a></td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold;">Service:</td><td>${params.service}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold;">Date/Time:</td><td>${timeFormatted}</td></tr>
    <tr><td style="padding: 8px 0; font-weight: bold;">Address:</td><td>${params.address}</td></tr>
    ${params.notes ? `<tr><td style="padding: 8px 0; font-weight: bold;">Notes:</td><td>${params.notes}</td></tr>` : ''}
  </table>
  <div style="margin-top: 20px;">
    <a href="${params.calendarLink}" style="display: inline-block; padding: 10px 20px; background: #1a73e8; color: white; text-decoration: none; border-radius: 4px;">View in Google Calendar</a>
  </div>
  <p style="margin-top: 20px; color: #666; font-size: 12px;">This booking was created automatically by the Electric Jamez website chatbot.</p>
</div>`;

  const raw = [
    `From: ${ownerEmail}`,
    `To: ${ownerEmail}`,
    `Subject: =?utf-8?B?${Buffer.from(`🔌 New Booking: ${params.service} — ${params.customerName} (${params.date})`).toString('base64')}?=`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    '',
    htmlBody,
  ].join('\r\n');

  const encoded = Buffer.from(raw).toString('base64url');

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw: encoded },
  });
}