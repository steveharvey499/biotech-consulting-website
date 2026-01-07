# Biotech Consulting Website

Professional personal consulting website for Steve Harvey, a biotech CEO and founder with expertise in scaling early-stage life sciences companies.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory with the following variables:
```
# Beehiiv Configuration (for newsletter subscriptions)
BEEHIV_API_KEY=your_beehiiv_api_key_here
BEEHIV_PUBLICATION_ID=your_publication_id_here

# Resend Configuration (for email notifications and welcome emails)
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev

# Contact Form Configuration
CONTACT_EMAIL=your_email@example.com
NOTIFICATION_EMAIL=your_email@example.com

# Google Sheets Configuration (optional - for contact form storage)
# Leave these empty if you only want email notifications
GOOGLE_SHEETS_ID=your_google_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"

# Analytics
NEXT_PUBLIC_GA4_ID=your_ga4_id_here

# Social Links
NEXT_PUBLIC_LINKEDIN_URL=your_linkedin_url_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# HubSpot Configuration (optional - only if using HubSpot meeting widget)
# NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_hubspot_portal_id_here
# NEXT_PUBLIC_HUBSPOT_MEETING_URL=your_hubspot_meeting_url_here
```

3. Add your professional headshot image to `public/images/headshot.jpg`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` - Next.js app router pages and layouts
- `components/` - React components
- `lib/` - Utility functions (email, analytics)
- `public/` - Static assets
- `styles/` - Global styles
- `types/` - TypeScript type definitions

## Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Beehiiv integration for newsletter subscriptions
- ✅ Google Sheets integration for contact form storage (optional)
- ✅ Resend email notifications for contact forms
- ✅ SEO optimization
- ✅ Google Analytics 4 integration
- ✅ GDPR-compliant privacy policy
- ✅ Performance optimized
- ✅ HubSpot meeting scheduler (optional, if configured)

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This project is optimized for deployment on Vercel. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:

- Setting up Vercel deployment
- Configuring password protection
- Setting up Beehiiv integration
- Environment variable configuration

## Beehiiv Setup

To use Beehiiv for newsletter subscriptions, you'll need to:

1. Create a Beehiiv account (free tier available)
2. Get your Publication ID from Beehiiv dashboard
3. Create an API key in Beehiiv settings
4. Add the API key and Publication ID to your environment variables

See [BEEHIV_SETUP.md](./BEEHIV_SETUP.md) for detailed Beehiiv configuration instructions.

## Google Sheets Setup (Optional)

To store contact form submissions in Google Sheets:

1. Create a Google Cloud project
2. Enable Google Sheets API
3. Create a service account
4. Create a Google Sheet and share it with the service account email
5. Add the service account credentials to your environment variables

The contact form will work without Google Sheets - it will only send email notifications via Resend. Google Sheets integration is optional and provides a spreadsheet backup of all submissions.

