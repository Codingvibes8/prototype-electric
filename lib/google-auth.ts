import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

let _jwtClient: JWT | null = null;

function getJwtClient(): JWT {
  if (_jwtClient) return _jwtClient;

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const keyBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!email || !keyBase64) {
    throw new Error(
      'Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_KEY env vars. ' +
      'Set up a Google Cloud Service Account and add the base64-encoded JSON key.'
    );
  }

  const keyJson = Buffer.from(keyBase64, 'base64').toString('utf-8');
  const key = JSON.parse(keyJson);

  _jwtClient = new google.auth.JWT({
    email,
    key: key.private_key,
    scopes: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/gmail.send',
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });

  return _jwtClient;
}

export function getCalendarClient() {
  return google.calendar({ version: 'v3', auth: getJwtClient() });
}

export function getGmailClient() {
  return google.gmail({ version: 'v1', auth: getJwtClient() });
}

export function getSheetsClient() {
  return google.sheets({ version: 'v4', auth: getJwtClient() });
}