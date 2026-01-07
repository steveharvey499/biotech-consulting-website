---
name: Password-Protected Deployment Setup
overview: Set up password protection on Vercel deployment so the site can be shared privately with a friend for feedback without making it publicly accessible.
todos:
  - id: deploy-to-vercel
    content: Deploy site to Vercel (if not already deployed) - push to GitHub and connect to Vercel
    status: pending
  - id: enable-password-protection
    content: "Enable password protection in Vercel dashboard: Settings → Deployment Protection → Enable Password Protection"
    status: pending
    dependencies:
      - deploy-to-vercel
  - id: set-password
    content: Set a password for the deployment and save settings
    status: pending
    dependencies:
      - enable-password-protection
  - id: share-access
    content: Share the Vercel deployment URL and password with your friend
    status: pending
    dependencies:
      - set-password
---

# Password-Protected Deployment Setup

## Overview

Enable password protection on your Vercel deployment so you can share the site privately with your friend for feedback without making it publicly accessible or searchable.

## Steps

### 1. Deploy to Vercel (if not already deployed)

- Push your code to GitHub (if not already there)
- Connect your GitHub repository to Vercel
- Deploy the site to Vercel (this creates a production URL)

### 2. Enable Password Protection

- Go to your Vercel project dashboard
- Navigate to Settings → Deployment Protection
- Enable "Password Protection"
- Set a password (share this with your friend)
- Save the settings

### 3. Share Access

- Share your Vercel deployment URL with your friend
- Share the password you set
- Your friend can now access the site with the password

## Alternative: Preview Deployment with Password

If you prefer not to use the production deployment:

- Create a preview deployment from a branch
- Enable password protection on that specific deployment
- Share the preview URL and password

## Notes

- Password protection works on both production and preview deployments