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

# Other variables (optional for now)
RESEND_API_KEY=
NEXT_PUBLIC_GA4_ID=
CONTACT_EMAIL=steve@example.com
NOTIFICATION_EMAIL=steve@example.com
NEXT_PUBLIC_SITE_URL=http://localhost:3001
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

