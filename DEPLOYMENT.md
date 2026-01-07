# Deployment Guide

This guide covers deploying the website to Vercel with password protection and HubSpot integration.

## Prerequisites

- GitHub account
- Vercel account (Pro plan required for password protection)
- HubSpot account (free tier available)
- Node.js 18+ installed locally

## Step 1: Git Repository Setup

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a GitHub repository and push your code:
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

## Step 2: Vercel Account Setup

1. Sign up or log in to [Vercel](https://vercel.com)
2. Upgrade to Pro plan ($20/month) - required for password protection feature
3. Connect your GitHub account to Vercel

## Step 3: Deploy to Vercel

1. In Vercel dashboard, click "Add New Project"
2. Import your GitHub repository
3. Configure project settings:
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)
4. Click "Deploy"

## Step 4: Environment Variables

Add the following environment variables in Vercel dashboard (Project Settings > Environment Variables):

### HubSpot Configuration
- `HUBSPOT_ACCESS_TOKEN` - Your HubSpot Private App access token
- `HUBSPOT_PORTAL_ID` - Your HubSpot Portal ID (Hub ID)
- `HUBSPOT_NEWSLETTER_LIST_ID` - Newsletter subscribers list ID
- `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` - Same as HUBSPOT_PORTAL_ID (for tracking script)
- `NEXT_PUBLIC_HUBSPOT_MEETING_URL` - HubSpot meeting scheduler URL

### General Configuration
- `CONTACT_EMAIL` - Your contact email address
- `NEXT_PUBLIC_GA4_ID` - Google Analytics 4 ID (optional)
- `NEXT_PUBLIC_LINKEDIN_URL` - LinkedIn profile URL (optional)
- `NEXT_PUBLIC_SITE_URL` - Your production URL (set after first deployment)

After adding environment variables, redeploy the project.

## Step 5: Enable Password Protection

1. In Vercel project settings, navigate to **"Deployment Protection"**
2. Enable **"Password Protection"** feature
3. Set a password for site access
4. Configure protection to apply to:
   - All deployments, or
   - Specific branches (e.g., preview deployments only)
5. Save settings

**Note**: Password protection requires Vercel Pro plan. The password will be required for all visitors until disabled.

## Step 6: HubSpot Setup

See [HUBSPOT_SETUP.md](./HUBSPOT_SETUP.md) for detailed HubSpot configuration instructions.

### Quick HubSpot Setup Checklist:

1. ✅ Create HubSpot account
2. ✅ Create Private App with required scopes
3. ✅ Generate access token
4. ✅ Create custom properties (`company`, `message`, `subscription_source`, `subscription_date`)
5. ✅ Create "Newsletter Subscribers" list
6. ✅ Set up HubSpot Meeting Scheduler
7. ✅ Add all credentials to Vercel environment variables

## Step 7: Verify Deployment

1. Visit your deployed site URL
2. Verify password protection is working
3. Test contact form submission
4. Test newsletter subscription
5. Verify HubSpot tracking is working (check HubSpot dashboard)
6. Test meeting scheduler widget

## Troubleshooting

### Build Failures
- Check that all environment variables are set in Vercel
- Verify Node.js version compatibility
- Check build logs in Vercel dashboard

### HubSpot Integration Issues
- Verify `HUBSPOT_ACCESS_TOKEN` is correct
- Check that Private App has required scopes
- Verify custom properties exist in HubSpot
- Check HubSpot API rate limits

### Password Protection Not Working
- Ensure Vercel Pro plan is active
- Check Deployment Protection settings
- Verify password is set correctly
- Clear browser cache and cookies

## Custom Domain (Optional)

1. In Vercel project settings, go to **"Domains"**
2. Add your custom domain
3. Update DNS records at your domain registrar:
   - Add CNAME record pointing to Vercel
   - Or add A record with Vercel IP addresses
4. Update `NEXT_PUBLIC_SITE_URL` environment variable with custom domain
5. Redeploy project

## Continuous Deployment

Once set up, Vercel will automatically deploy:
- Every push to the main branch (production)
- Every pull request (preview deployments)

Password protection can be configured to apply only to preview deployments if desired.

