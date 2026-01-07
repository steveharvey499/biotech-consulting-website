---
name: Deploy and HubSpot Integration
overview: Deploy the website to production and integrate HubSpot for contact form submissions, newsletter subscriptions, and tracking/analytics. Replace Resend with HubSpot for email handling.
todos:
  - id: deploy-setup
    content: Set up GitHub repository and deploy to Vercel with initial environment variables
    status: pending
  - id: hubspot-account
    content: Create HubSpot account, generate API key, and set up custom properties and lists
    status: pending
  - id: hubspot-package
    content: Install @hubspot/api-client package and create lib/hubspot.ts service module
    status: pending
    dependencies:
      - hubspot-account
  - id: update-contact-api
    content: Replace Resend with HubSpot in app/api/contact/route.ts for contact form submissions
    status: pending
    dependencies:
      - hubspot-package
  - id: update-subscribe-api
    content: Replace Resend with HubSpot in app/api/subscribe/route.ts for newsletter subscriptions
    status: pending
    dependencies:
      - hubspot-package
  - id: add-tracking
    content: Add HubSpot tracking script to app/layout.tsx for analytics
    status: pending
    dependencies:
      - hubspot-account
  - id: update-env
    content: "Update environment variables: add HubSpot credentials, remove Resend"
    status: pending
    dependencies:
      - hubspot-account
  - id: test-integration
    content: Test contact form and newsletter subscription locally and in production
    status: pending
    dependencies:
      - update-contact-api
      - update-subscribe-api
      - add-tracking
  - id: update-docs
    content: Update README.md and DEPLOYMENT_GUIDE.md with HubSpot setup instructions
    status: pending
    dependencies:
      - test-integration
---

# Deployment and HubSpot Integration Plan

## Overview

Deploy the website to Vercel and integrate HubSpot to replace Resend for all email and CRM functionality, including contact form submissions, newsletter subscriptions, and tracking.

## Part 1: Deployment Setup

### 1.1 Environment Preparation

- Review and update `.env.local` with production values
- Ensure all required environment variables are documented
- Verify `NEXT_PUBLIC_SITE_URL` placeholder is ready for production URL

### 1.2 GitHub Repository Setup

- Initialize git repository (if not already done)
- Create `.gitignore` to exclude `.env.local` and `node_modules`
- Push code to GitHub repository
- Document repository URL

### 1.3 Vercel Deployment

- Create Vercel account and connect GitHub
- Import project from GitHub repository
- Configure build settings (Next.js auto-detected)
- Set up environment variables in Vercel dashboard
- Deploy and verify initial deployment
- Update `NEXT_PUBLIC_SITE_URL` with production URL

### 1.4 Custom Domain (Optional)

- Configure custom domain in Vercel
- Update DNS records at domain registrar
- Update `NEXT_PUBLIC_SITE_URL` with custom domain

## Part 2: HubSpot Integration

### 2.1 HubSpot Account Setup

- Create HubSpot account (free tier available)
- Set up HubSpot portal
- Generate HubSpot API key or Private App access token
- Create custom properties in HubSpot for:
- Contact form: `company`, `message`
- Newsletter subscription: track subscription date/source

### 2.2 Install HubSpot Package

- Install `@hubspot/api-client` npm package
- Add to `package.json` dependencies

### 2.3 Create HubSpot Service Module

- Create `lib/hubspot.ts` with:
- HubSpot client initialization
- Function to create/update contacts
- Function to add contacts to lists (for newsletter)
- Error handling and logging

### 2.4 Update Contact Form API

- Modify `app/api/contact/route.ts`:
- Remove Resend dependency
- Add HubSpot contact creation
- Create contact with properties: name, email, company, message
- Optionally send email notification via HubSpot workflows (or keep simple notification)
- Maintain backward compatibility during transition

### 2.5 Update Newsletter Subscription API

- Modify `app/api/subscribe/route.ts`:
- Remove Resend dependency
- Add HubSpot contact creation/update
- Add contact to newsletter list/segment
- Track subscription source and date

### 2.6 Update Email Library

- Modify `lib/email.ts`:
- Replace Resend calls with HubSpot API calls
- Or remove email sending entirely if using HubSpot workflows
- Keep interface compatible for existing code

### 2.7 Add HubSpot Tracking Code

- Add HubSpot tracking script to `app/layout.tsx`
- Include HubSpot Hub ID in environment variables
- Ensure tracking works for form submissions and page views

### 2.8 Environment Variables

- Add to `.env.local` and Vercel:
- `HUBSPOT_API_KEY` or `HUBSPOT_ACCESS_TOKEN`
- `HUBSPOT_PORTAL_ID` (if needed)
- `HUBSPOT_NEWSLETTER_LIST_ID` (for newsletter subscriptions)
- Remove `RESEND_API_KEY` (no longer needed)

## Part 3: Testing and Verification

### 3.1 Local Testing

- Test contact form submission locally
- Test newsletter subscription locally
- Verify HubSpot contacts are created correctly
- Check HubSpot dashboard for new contacts

### 3.2 Production Testing

- Test contact form on live site
- Test newsletter subscription on live site
- Verify HubSpot tracking is working
- Check email notifications (if using HubSpot workflows)

### 3.3 Cleanup

- Remove Resend package from `package.json` (optional)
- Remove Resend-related code comments
- Update documentation

## Part 4: Documentation Updates

### 4.1 Update README.md

- Update environment variables section
- Remove Resend references
- Add HubSpot setup instructions

### 4.2 Update DEPLOYMENT_GUIDE.md

- Replace Resend setup with HubSpot setup
- Update environment variable instructions
- Add HubSpot account creation steps

### 4.3 Create HUBSPOT_SETUP.md (Optional)

- Detailed HubSpot configuration guide
- How to set up workflows for email notifications
- How to create custom properties
- How to set up lists/segments

## Files to Modify

1. **`package.json`** - Add `@hubspot/api-client`, remove `resend` (optional)
2. **`lib/hubspot.ts`** - New file for HubSpot service functions
3. **`app/api/contact/route.ts`** - Replace Resend with HubSpot
4. **`app/api/subscribe/route.ts`** - Replace Resend with HubSpot
5. **`lib/email.ts`** - Update or replace with HubSpot functions
6. **`app/layout.tsx`** - Add HubSpot tracking script
7. **`.env.local`** - Add HubSpot variables, remove Resend
8. **`README.md`** - Update documentation
9. **`DEPLOYMENT_GUIDE.md`** - Update deployment instructions

## Alternative Approach (If HubSpot Email Sending is Limited)

If HubSpot's email sending capabilities don't meet needs for transactional emails (notifications, auto-responses), we can use a hybrid approach: