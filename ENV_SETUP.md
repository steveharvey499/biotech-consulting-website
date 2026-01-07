# Environment Variables Setup Guide

## Important: Restart Required

After creating or updating `.env.local`, you **MUST** restart your development server for changes to take effect.

## Steps to Fix Calendly and LinkedIn Links

1. **Stop your current server** (press `Ctrl+C` in the terminal where `npm run dev` is running)

2. **Check your `.env.local` file** - Make sure it contains your actual URLs:

```env
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-actual-username/your-event-type
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/your-actual-profile
```

**Important Notes:**
- Use your **actual** Calendly URL (not the placeholder)
- Use your **actual** LinkedIn profile URL (not the placeholder)
- No quotes around the URLs
- No spaces around the `=` sign

3. **Restart the server:**

```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && nvm use 20 && npm run dev
```

4. **Verify it's working:**
   - Open http://localhost:3001 (or whatever port it shows)
   - Check that Calendly links go to your actual Calendly page
   - Check that LinkedIn link goes to your actual profile

## Example .env.local File

```env
# Calendly URL - Replace with your actual booking page URL
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/steve-harvey/20min

# LinkedIn URL - Replace with your actual profile URL  
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/steveharvey

# Beehiiv Configuration (for newsletter subscriptions)
BEEHIV_API_KEY=your_beehiiv_api_key_here
BEEHIV_PUBLICATION_ID=your_publication_id_here

# Resend Configuration (for email notifications and welcome emails)
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev

# Contact Form Configuration
CONTACT_EMAIL=steve@example.com
NOTIFICATION_EMAIL=steve@example.com

# Google Sheets Configuration (optional - for contact form storage)
# Leave these empty if you only want email notifications
GOOGLE_SHEETS_ID=your_google_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"

# Analytics
NEXT_PUBLIC_GA4_ID=your_ga4_id_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3001

# HubSpot Configuration (optional - only if using HubSpot meeting widget)
# NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_hubspot_portal_id_here
# NEXT_PUBLIC_HUBSPOT_MEETING_URL=your_hubspot_meeting_url_here
```

## Troubleshooting

If links still don't work after restarting:

1. **Check the file format:**
   - File must be named exactly `.env.local` (not `.env.local.txt` or `.env.local.rtf`)
   - Must be plain text (not Rich Text Format)
   - Must be in the project root directory (same folder as `package.json`)

2. **Check the values:**
   - URLs must start with `https://`
   - No trailing slashes
   - No quotes around the values

3. **Verify in browser:**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Type: `console.log(process.env)` - You won't see the values (they're server-side), but this confirms the page loaded

4. **Check terminal output:**
   - When you start the server, it should show "Ready in X.Xs"
   - No errors about environment variables

## Quick Test

To verify your URLs are correct, you can temporarily hardcode them in the components to test, then switch back to environment variables once confirmed.

