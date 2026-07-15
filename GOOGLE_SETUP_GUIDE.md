# Google Cloud Credentials Setup Guide

This guide walks you through obtaining all five environment variables needed for the booking system to send calendar events, emails, and store leads.

---

## Prerequisites

- A Google account (the website owner's account)
- Access to [Google Cloud Console](https://console.cloud.google.com/)
- A Google Calendar and Google Sheets (free with any Google account)

---

## Step 1: Create a Google Cloud Project

1. Go to **[Google Cloud Console](https://console.cloud.google.com/)**.
2. Click the project dropdown at the top of the page (next to the Google Cloud logo).
3. Click **New Project**.
4. Enter a project name, e.g., `prototype-electric-booking`.
5. Click **Create**.
6. Wait for the project to be created, then select it from the dropdown.

---

## Step 2: Enable the Required APIs

You need to enable three APIs: **Calendar**, **Gmail**, and **Sheets**.

1. In the Cloud Console, go to **APIs & Services → Library** (left sidebar).
2. Search for **Google Calendar API** → click it → click **Enable**.
3. Go back to the Library, search for **Gmail API** → click it → click **Enable**.
4. Go back to the Library, search for **Google Sheets API** → click it → click **Enable**.

> ✅ All three APIs should now show as "Enabled".

---

## Step 3: Create a Service Account

1. Go to **APIs & Services → Credentials** (left sidebar).
2. Click **Create Credentials → Service account**.
3. Enter a service account name, e.g., `booking-bot`.
4. Click **Create and Continue**.
5. Skip the "Grant access" and "Grant users access" steps — click **Done**.

---

## Step 4: Get `GOOGLE_SERVICE_ACCOUNT_EMAIL`

1. Go to **APIs & Services → Credentials**.
2. Scroll down to the **Service Accounts** section.
3. Click the service account you just created (e.g., `booking-bot@prototype-electric-booking.iam.gserviceaccount.com`).
4. Copy the email address shown.

### Set in `.env`:
```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=booking-bot@prototype-electric-booking.iam.gserviceaccount.com
```

---

## Step 5: Create and Download the JSON Key → `GOOGLE_SERVICE_ACCOUNT_KEY`

1. In the **Service Accounts** section, click the service account email.
2. Go to the **Keys** tab.
3. Click **Add Key → Create new key**.
4. Select **JSON** as the key type.
5. Click **Create** — a JSON file will download to your computer.

### The downloaded JSON looks like this:
```json
{
  "type": "service_account",
  "project_id": "prototype-electric-booking",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIB...\n-----END PRIVATE KEY-----\n",
  "client_email": "booking-bot@prototype-electric-booking.iam.gserviceaccount.com",
  "client_id": "123456789...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/booking-bot%40prototype-electric-booking.iam.gserviceaccount.com"
}
```

### Base64-encode the entire JSON file

The app expects the key to be **base64-encoded** (not the raw JSON). Here's how to encode it:

#### Option A: PowerShell (Windows)
```powershell
# Replace the path with the actual path to your downloaded JSON file
$jsonPath = "$env:USERPROFILE\Downloads\prototype-electrics-61608079c9eb.json"
$bytes = [System.IO.File]::ReadAllBytes($jsonPath)
$base64 = [System.Convert]::ToBase64String($bytes)
$base64 | Set-Clipboard
Write-Host "Base64 key copied to clipboard!"
```

#### Option B: macOS / Linux
```bash
base64 -i ~/Downloads/your-key-file.json | tr -d '\n' | pbcopy
```

#### Option C: Online Tool
Go to [base64encode.org](https://www.base64encode.org/), paste the entire JSON content, and encode it.

### Set in `.env`:
```env
GOOGLE_SERVICE_ACCOUNT_KEY=ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY...
```

> ⚠️ **Important**: The base64 string will be very long (single line, no spaces or line breaks). Paste the entire thing.

---

## Step 6: Share a Google Calendar & Get `GOOGLE_CALENDAR_ID`

### 6a. Share the Calendar with the Service Account

1. Go to **[Google Calendar](https://calendar.google.com/)**.
2. In the left sidebar, find the calendar you want to use (or create a new one).
3. Hover over the calendar name → click the **three dots (⋮)** → **Settings and sharing**.
4. Scroll down to **Share with specific people or groups**.
5. Click **Add people**.
6. Paste the **service account email** from Step 4.
7. Set permissions to **Make changes and manage sharing**.
8. Click **Send**.

> ℹ️ You may get a warning that the email doesn't have a Google account — that's fine. The service account can still access the calendar via the API.

### 6b. Get the Calendar ID

1. Still in **Settings and sharing** for that calendar.
2. Scroll down to **Integrate calendar**.
3. Copy the **Calendar ID** (it looks like `abc123@group.calendar.google.com` or your Gmail address).

### Set in `.env`:
```env
GOOGLE_CALENDAR_ID=your-email@gmail.com
```

> 💡 If you're using your primary Google Calendar, the Calendar ID is just your Gmail address.

---

## Step 7: Create a Google Sheet & Get `GOOGLE_SHEET_ID`

### 7a. Create the Sheet

1. Go to **[Google Sheets](https://sheets.google.com/)**.
2. Click **Blank** to create a new spreadsheet.
3. Name it something like `Prototype Electric Leads`.
4. In row 1, add these headers (optional but recommended):
   ```
   A1: Timestamp | B1: Name | C1: Phone | D1: Email | E1: Service | F1: Date | G1: Time | H1: Address | I1: Notes
   ```

### 7b. Share the Sheet with the Service Account

1. Click **Share** (top right of the sheet).
2. Paste the **service account email** from Step 4.
3. Set the role to **Editor**.
4. Uncheck "Notify people" (the service account can't receive emails).
5. Click **Share**.

### 7c. Get the Sheet ID

1. Look at the URL in your browser's address bar:
   ```
   https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H9I0J/edit#gid=0
                                        ^^^^^^^^^^^^^^^^^^
                                        This is the Sheet ID
   ```
2. Copy the long string between `/d/` and `/edit`.

### Set in `.env`:
```env
GOOGLE_SHEET_ID=1A2B3C4D5E6F7G8H9I0J
```

---

## Step 8: Set `OWNER_EMAIL`

This is the email address where you want booking notifications sent. It should be the website owner's email (can be a Gmail or any email address).

### Set in `.env`:
```env
OWNER_EMAIL=owner@example.com
```

> 💡 The service account will send emails "on behalf of" this address. The owner will receive a notification email every time a booking is made through the chatbot.

---

## Final `.env` File

Create or update your `.env.local` file (in the project root) with all five variables:

```env
# Google Cloud Service Account
GOOGLE_SERVICE_ACCOUNT_EMAIL=booking-bot@prototype-electric-booking.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_KEY=ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOi...

# Google Calendar
GOOGLE_CALENDAR_ID=your-email@gmail.com

# Google Sheets
GOOGLE_SHEET_ID=1A2B3C4D5E6F7G8H9I0J

# Owner Notifications
OWNER_EMAIL=owner@example.com
```

---

## Quick Verification Checklist

| Step | Variable | Where to find it |
|------|----------|-----------------|
| 1-3 | — | Create GCP project + enable APIs + create service account |
| 4 | `GOOGLE_SERVICE_ACCOUNT_EMAIL` | GCP Console → IAM → Service Accounts |
| 5 | `GOOGLE_SERVICE_ACCOUNT_KEY` | Download JSON key → base64-encode it |
| 6 | `GOOGLE_CALENDAR_ID` | Google Calendar → Settings → Integrate calendar |
| 7 | `GOOGLE_SHEET_ID` | Google Sheets URL (between `/d/` and `/edit`) |
| 8 | `OWNER_EMAIL` | Your email address for notifications |

---

## Troubleshooting

### "The caller does not have permission"
- Make sure you shared the calendar AND the sheet with the service account email.
- Calendar: needs **Make changes and manage sharing** permission.
- Sheet: needs **Editor** role.

### "Invalid grant" / "Invalid JWT"
- The base64 key may be corrupted. Re-encode the JSON file and try again.
- Make sure you're encoding the **entire JSON file** (not just the private key).

### Gmail API not sending
- Gmail API requires the service account to be authorized. If you get a `403` error, you may need to enable **Domain-wide Delegation** in the GCP Console for the service account, or use a regular OAuth flow instead.
- For personal Gmail accounts, the service account approach works for sending emails programmatically.

### Calendar events not appearing
- Verify the `GOOGLE_CALENDAR_ID` is correct.
- Check that the service account email was added to the calendar with edit permissions.

---

## Security Notes

- **Never commit `.env.local` to git** — it's already in `.gitignore`.
- Keep the JSON key file secure — treat it like a password.
- If the key is compromised, go to GCP Console → Service Accounts → Keys → Delete the key and create a new one.
