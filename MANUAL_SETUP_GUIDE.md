# Manual Setup Guide - Step by Step

This guide walks you through all the manual setup steps needed to deploy your website with password protection and HubSpot integration.

## Prerequisites Checklist

Before starting, make sure you have:
- [ ] GitHub account
- [ ] Vercel account (or ready to create one)
- [ ] HubSpot account (or ready to create one)
- [ ] Credit card for Vercel Pro plan ($20/month)

---

## Part 1: Git Repository Setup

### Step 1.1: Initialize Git Repository (if not already done)

1. Open terminal in your project directory (`/Users/stevenharvey/tutorial/2025_12_30`)
2. Check if git is initialized:
   ```bash
   git status
   ```
3. If you see "not a git repository", initialize it:
   ```bash
   git init
   ```
4. Add all files:
   ```bash
   git add .
   ```
5. Create initial commit:
   ```bash
   git commit -m "Initial commit - HubSpot integration ready"
   ```

### Step 1.2: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in repository details:
   - **Repository name**: `biotech-consulting-website` (or your preferred name)
   - **Description**: "Biotech consulting website with HubSpot integration"
   - **Visibility**: Choose Private or Public
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

### Step 1.3: Push Code to GitHub

1. GitHub will show you commands - use these (replace `YOUR_USERNAME` with your GitHub username):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/biotech-consulting-website.git
   git branch -M main
   git push -u origin main
   ```
2. You'll be prompted for GitHub credentials
3. Verify: Refresh your GitHub repository page - you should see all your files

**✅ Checkpoint**: Your code is now on GitHub!

---

## Part 2: Vercel Account Setup and Deployment

### Step 2.1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended for easy integration)
4. Authorize Vercel to access your GitHub account
5. Complete account setup

### Step 2.2: Upgrade to Pro Plan (Required for Password Protection)

1. In Vercel dashboard, click your profile icon (top right)
2. Go to **"Billing"** or **"Settings"** → **"Billing"**
3. Click **"Upgrade to Pro"** or **"Change Plan"**
4. Select **Pro Plan** ($20/month)
5. Enter payment information
6. Complete upgrade

**Note**: You can use password protection during the 14-day free trial, but you'll need to upgrade to Pro to keep it active.

### Step 2.3: Deploy Project

1. In Vercel dashboard, click **"Add New Project"** (or **"New Project"**)
2. You'll see your GitHub repositories - find and click **"Import"** next to your repository
3. Configure project:
   - **Project Name**: Keep default or change (e.g., `biotech-consulting`)
   - **Framework Preset**: Should auto-detect as **Next.js** ✅
   - **Root Directory**: Leave as `./` (default)
   - **Build Command**: `npm run build` (default) ✅
   - **Output Directory**: `.next` (default) ✅
   - **Install Command**: `npm install` (default) ✅
4. **DO NOT** add environment variables yet - we'll do that next
5. Click **"Deploy"**
6. Wait for deployment to complete (2-3 minutes)
7. Once deployed, you'll see a success message with your site URL (e.g., `https://biotech-consulting.vercel.app`)

**✅ Checkpoint**: Your site is deployed! Visit the URL to see it live.

---

## Part 3: HubSpot Setup

### Step 3.1: Create HubSpot Account

1. Go to [hubspot.com](https://www.hubspot.com)
2. Click **"Get Started Free"** or **"Sign Up"**
3. Fill in:
   - Email address
   - Company name (can be personal)
   - Password
4. Complete account setup wizard
5. Skip any optional steps to get to the dashboard faster

### Step 3.2: Get Your HubSpot Portal ID

1. In HubSpot, click your profile icon (top right)
2. Click **"Account & Billing"** or go to **Settings** (gear icon)
3. Navigate to **Account Setup** → **Account Defaults**
4. Find **"Hub ID"** or **"Portal ID"** - it's a number like `12345678`
5. **Copy this number** - you'll need it for environment variables

### Step 3.3: Create Private App

1. In HubSpot, go to **Settings** (gear icon, top right)
2. Navigate to **Integrations** → **Private Apps**
3. Click **"Create a private app"**
4. Fill in:
   - **App name**: `Website Integration`
   - **App description**: `Integration for contact forms and newsletter subscriptions`
5. Click **"Create app"**
6. Go to **"Scopes"** tab
7. Select these scopes:
   - Under **CRM**:
     - ✅ `crm.objects.contacts.read`
     - ✅ `crm.objects.contacts.write`
   - Under **Lists**:
     - ✅ `crm.lists.read`
     - ✅ `crm.lists.write`
   - Under **Marketing**:
     - ✅ `marketing.read`
     - ✅ `marketing.write`
8. Click **"Save"**
9. Go to **"Auth"** tab
10. Click **"Generate token"** or **"Create token"**
11. **IMPORTANT**: Copy the token immediately - you won't be able to see it again!
12. Store it securely (password manager, notes app, etc.)

**✅ Checkpoint**: You have your HubSpot Portal ID and Access Token!

### Step 3.4: Create Custom Properties

1. In HubSpot, go to **Settings** → **Properties** → **Contact properties**
2. Click **"Create property"**

#### Create "Company" Property:
- **Label**: `Company`
- **Field name**: `company` (auto-filled, keep as is)
- **Type**: `Single-line text`
- **Description**: `Company name from contact form`
- Click **"Create"**

#### Create "Message" Property:
- Click **"Create property"** again
- **Label**: `Message`
- **Field name**: `message` (auto-filled)
- **Type**: `Multi-line text`
- **Description**: `Contact form message`
- Click **"Create"**

#### Create "Subscription Source" Property:
- Click **"Create property"** again
- **Label**: `Subscription Source`
- **Field name**: `subscription_source` (auto-filled)
- **Type**: `Single-line text`
- **Description**: `Where the newsletter subscription came from`
- Click **"Create"**

#### Create "Subscription Date" Property:
- Click **"Create property"** again
- **Label**: `Subscription Date`
- **Field name**: `subscription_date` (auto-filled)
- **Type**: `Date picker`
- **Description**: `When the user subscribed to newsletter`
- Click **"Create"**

**✅ Checkpoint**: All custom properties created!

### Step 3.5: Create Newsletter List

1. In HubSpot, go to **Contacts** → **Lists**
2. Click **"Create list"**
3. Fill in:
   - **List name**: `Newsletter Subscribers`
   - **List type**: Select **"Static list"**
4. Click **"Create"**
5. You'll be taken to the list page
6. **Get the List ID**:
   - Look at the URL - it will be something like: `https://app.hubspot.com/contacts/12345678/lists/9876543`
   - The number after `/lists/` is your List ID (e.g., `9876543`)
   - **Copy this number**

**✅ Checkpoint**: Newsletter list created with List ID noted!

### Step 3.6: Set Up Meeting Scheduler

1. In HubSpot, go to **Sales** → **Meetings** (or **Sales** → **Scheduling**)
2. Click **"Create meeting link"** or **"New meeting link"**
3. Configure your meeting:
   - **Meeting name**: `Discovery Call` or `Consultation Call`
   - **Duration**: `20 minutes` (or your preference)
   - **Description**: Add your meeting description
   - **Availability**: Set your available times
4. Click **"Create"** or **"Save"**
5. **Get the Meeting URL**:
   - You'll see options to share the meeting
   - Look for **"Share link"** or **"Copy link"**
   - The URL will look like: `https://meetings.hubspot.com/your-name/discovery-call`
   - **Copy this full URL**

**✅ Checkpoint**: Meeting scheduler configured with URL copied!

---

## Part 4: Add Environment Variables to Vercel

### Step 4.1: Access Vercel Project Settings

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click on your project name (from the dashboard)
3. Go to **Settings** tab
4. Click **"Environment Variables"** in the left sidebar

### Step 4.2: Add HubSpot Variables

Add each variable one by one:

#### 1. HUBSPOT_ACCESS_TOKEN
- **Key**: `HUBSPOT_ACCESS_TOKEN`
- **Value**: Paste your Private App token (from Step 3.3)
- **Environment**: Select **Production**, **Preview**, and **Development**
- Click **"Save"**

#### 2. HUBSPOT_PORTAL_ID
- **Key**: `HUBSPOT_PORTAL_ID`
- **Value**: Your HubSpot Portal ID (from Step 3.2)
- **Environment**: Select **Production**, **Preview**, and **Development**
- Click **"Save"**

#### 3. HUBSPOT_NEWSLETTER_LIST_ID
- **Key**: `HUBSPOT_NEWSLETTER_LIST_ID`
- **Value**: Your Newsletter List ID (from Step 3.5)
- **Environment**: Select **Production**, **Preview**, and **Development**
- Click **"Save"**

#### 4. NEXT_PUBLIC_HUBSPOT_PORTAL_ID
- **Key**: `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`
- **Value**: Same as HUBSPOT_PORTAL_ID (your Portal ID)
- **Environment**: Select **Production**, **Preview**, and **Development**
- Click **"Save"**

#### 5. NEXT_PUBLIC_HUBSPOT_MEETING_URL
- **Key**: `NEXT_PUBLIC_HUBSPOT_MEETING_URL`
- **Value**: Your meeting scheduler URL (from Step 3.6)
- **Environment**: Select **Production**, **Preview**, and **Development**
- Click **"Save"**

### Step 4.3: Add General Variables

#### 6. CONTACT_EMAIL
- **Key**: `CONTACT_EMAIL`
- **Value**: Your email address (e.g., `steve@example.com`)
- **Environment**: Select **Production**, **Preview**, and **Development**
- Click **"Save"**

#### 7. NEXT_PUBLIC_SITE_URL
- **Key**: `NEXT_PUBLIC_SITE_URL`
- **Value**: Your Vercel deployment URL (e.g., `https://biotech-consulting.vercel.app`)
- **Environment**: Select **Production**, **Preview**, and **Development**
- Click **"Save"**

#### 8. Optional Variables (if you have them):
- **NEXT_PUBLIC_GA4_ID**: Your Google Analytics ID (if using)
- **NEXT_PUBLIC_LINKEDIN_URL**: Your LinkedIn profile URL

### Step 4.4: Redeploy

1. After adding all variables, go to **"Deployments"** tab
2. Find your latest deployment
3. Click the **"..."** menu (three dots)
4. Click **"Redeploy"**
5. Confirm redeployment
6. Wait for deployment to complete

**✅ Checkpoint**: All environment variables added and site redeployed!

---

## Part 5: Enable Password Protection

### Step 5.1: Access Deployment Protection Settings

1. In Vercel project, go to **Settings** tab
2. Click **"Deployment Protection"** in the left sidebar

### Step 5.2: Enable Password Protection

1. Find **"Password Protection"** section
2. Toggle **"Enable Password Protection"** to ON
3. Enter your desired password in the **"Password"** field
4. Choose protection scope:
   - **All Deployments**: Protects production and preview deployments
   - **Only Preview Deployments**: Only protects preview/PR deployments
   - Choose based on your preference (recommend **All Deployments** for now)
5. Click **"Save"** or the save button

### Step 5.3: Test Password Protection

1. Open your site URL in an incognito/private browser window
2. You should see a password prompt
3. Enter your password
4. Site should load after authentication

**✅ Checkpoint**: Password protection is active!

---

## Part 6: Testing Everything

### Step 6.1: Test Contact Form

1. Visit your site (enter password if prompted)
2. Go to the **Contact** page
3. Fill out the contact form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Company: `Test Company`
   - Message: `This is a test message`
4. Submit the form
5. Check HubSpot:
   - Go to **Contacts** → **All contacts**
   - Find `test@example.com`
   - Verify contact was created
   - Check that `company` property is set
   - Check that a note was created with the message

### Step 6.2: Test Newsletter Subscription

1. On your site, find the newsletter subscription form
2. Enter an email address: `newsletter-test@example.com`
3. Submit
4. Check HubSpot:
   - Go to **Contacts** → **All contacts**
   - Find the contact
   - Verify `subscription_source` is set to `website`
   - Verify `subscription_date` is set
   - Go to **Contacts** → **Lists** → **Newsletter Subscribers**
   - Verify contact is in the list

### Step 6.3: Test Meeting Scheduler

1. Go to your **Contact** page
2. Scroll to the meeting scheduler section
3. Verify the HubSpot meeting widget loads
4. Try to book a test meeting (you can cancel it after)

### Step 6.4: Test Tracking

1. Visit a few pages on your site
2. In HubSpot, go to **Analytics** → **Traffic Analytics**
3. Wait a few minutes
4. Check if page views appear (may take a few minutes to show up)

**✅ Checkpoint**: All features tested and working!

---

## Troubleshooting

### Contact Form Not Working
- Check Vercel deployment logs: **Deployments** → Click deployment → **Logs**
- Verify `HUBSPOT_ACCESS_TOKEN` is correct
- Check HubSpot Private App has correct scopes
- Verify custom properties exist in HubSpot

### Newsletter Not Adding to List
- Verify `HUBSPOT_NEWSLETTER_LIST_ID` is correct
- Check List ID in HubSpot (from URL)
- Verify Private App has `crm.lists.write` scope

### Meeting Widget Not Loading
- Check `NEXT_PUBLIC_HUBSPOT_MEETING_URL` is correct
- Verify meeting link is active in HubSpot
- Check browser console for errors

### Password Protection Not Working
- Ensure Vercel Pro plan is active
- Check Deployment Protection settings
- Clear browser cache and cookies
- Try incognito mode

### Build Failures
- Check environment variables are all set
- Review build logs in Vercel
- Verify Node.js version compatibility

---

## Next Steps

Once everything is working:

1. **Custom Domain** (optional):
   - In Vercel Settings → Domains
   - Add your custom domain
   - Update DNS records
   - Update `NEXT_PUBLIC_SITE_URL` with custom domain

2. **HubSpot Workflows** (optional):
   - Set up automated emails when contacts are created
   - Create welcome emails for newsletter subscribers

3. **Monitor Usage**:
   - Check HubSpot API usage in Settings → Integrations → API Usage
   - Monitor Vercel deployment activity

---

## Quick Reference: Environment Variables Checklist

Make sure these are set in Vercel:

- [ ] `HUBSPOT_ACCESS_TOKEN`
- [ ] `HUBSPOT_PORTAL_ID`
- [ ] `HUBSPOT_NEWSLETTER_LIST_ID`
- [ ] `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`
- [ ] `NEXT_PUBLIC_HUBSPOT_MEETING_URL`
- [ ] `CONTACT_EMAIL`
- [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] `NEXT_PUBLIC_GA4_ID` (optional)
- [ ] `NEXT_PUBLIC_LINKEDIN_URL` (optional)

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **HubSpot API Docs**: https://developers.hubspot.com/docs/api/overview
- **HubSpot Support**: Available in HubSpot dashboard

---

**Congratulations!** Your website is now deployed with password protection and HubSpot integration! 🎉

