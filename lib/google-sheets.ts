import { getSheetsClient } from './google-auth';

/**
 * Append a new lead row to the Google Sheet.
 * Expected columns: Timestamp, Name, Email, Phone, Service, Date, Time, Address, Notes, Calendar Link
 */
export async function appendLeadRow(params: {
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
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  if (!spreadsheetId) throw new Error('Missing GOOGLE_SHEETS_ID env var');

  const sheets = getSheetsClient();

  const timestamp = new Date().toISOString();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Sheet1!A:J',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [
        [
          timestamp,
          params.customerName,
          params.customerEmail,
          params.customerPhone,
          params.service,
          params.date,
          params.time,
          params.address,
          params.notes || '',
          params.calendarLink || '',
        ],
      ],
    },
  });
}