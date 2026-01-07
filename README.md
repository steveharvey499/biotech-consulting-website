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
# HubSpot Configuration
HUBSPOT_ACCESS_TOKEN=your_hubspot_private_app_token_here
HUBSPOT_PORTAL_ID=your_hubspot_portal_id_here
HUBSPOT_NEWSLETTER_LIST_ID=your_newsletter_list_id_here
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_hubspot_portal_id_here
NEXT_PUBLIC_HUBSPOT_MEETING_URL=your_hubspot_meeting_url_here

# General Configuration
CONTACT_EMAIL=your_email@example.com
NEXT_PUBLIC_GA4_ID=your_ga4_id_here
NEXT_PUBLIC_LINKEDIN_URL=your_linkedin_url_here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
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
- ✅ HubSpot integration for CRM, contact forms, and newsletter subscriptions
- ✅ HubSpot meeting scheduler for booking calls
- ✅ HubSpot tracking and analytics
- ✅ SEO optimization
- ✅ Google Analytics 4 integration
- ✅ GDPR-compliant privacy policy
- ✅ Performance optimized

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This project is optimized for deployment on Vercel. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:

- Setting up Vercel deployment
- Configuring password protection
- Setting up HubSpot integration
- Environment variable configuration

## HubSpot Setup

To use HubSpot features, you'll need to:

1. Create a HubSpot account (free tier available)
2. Create a Private App with the following scopes:
   - `crm.objects.contacts.read`
   - `crm.objects.contacts.write`
   - `crm.lists.read`
   - `crm.lists.write`
   - `marketing.read`
   - `marketing.write`
3. Generate an access token and add it to your environment variables
4. Create custom properties in HubSpot for `company`, `message`, `subscription_source`, and `subscription_date`
5. Create a "Newsletter Subscribers" list and note the List ID
6. Set up a HubSpot Meeting Scheduler and get the meeting URL

See [HUBSPOT_SETUP.md](./HUBSPOT_SETUP.md) for detailed HubSpot configuration instructions.

