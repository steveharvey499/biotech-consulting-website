# Step-by-Step Deployment Guide

This guide will walk you through deploying your biotech consulting website from start to finish. We'll use Vercel, which is the easiest and best option for Next.js websites.

## Prerequisites Checklist

Before you start, make sure you have:
- [ ] A GitHub account (free) - [Sign up here](https://github.com)
- [ ] A Vercel account (free) - We'll create this in the steps below
- [ ] Your Calendly URL
- [ ] A Resend account for email (free tier available)
- [ ] A Google Analytics 4 account (optional but recommended)
- [ ] Your professional headshot image

---

## Part 1: Prepare Your Code

### Step 1: Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

This installs all the required packages. Wait for it to complete (may take 1-2 minutes).

### Step 2: Add Your Headshot Image

1. Find your professional headshot image file
2. Rename it to `headshot.jpg` (if it's not already)
3. Copy it to: `public/images/headshot.jpg`

**Important**: The image should be:
- High quality (at least 800x800 pixels)
- Square or close to square
- JPG or PNG format
- Under 2MB in size

### Step 3: Set Up Environment Variables

1. Create a file named `.env.local` in the root of your project (same folder as `package.json`)
2. Copy this template and fill in your actual values:

```env
# Resend API Key (for contact form emails)
RESEND_API_KEY=your_resend_api_key_here

# Calendly URL (your booking page)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/your-event-type

# Google Analytics 4 ID (optional - format: G-XXXXXXXXXX)
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX

# Your email address (for contact form notifications)
CONTACT_EMAIL=steve@yourdomain.com
NOTIFICATION_EMAIL=steve@yourdomain.com

# LinkedIn profile URL
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/your-profile

# Your website URL (update after deployment)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

**How to get these values:**

- **Resend API Key**: 
  1. Go to [resend.com](https://resend.com) and sign up (free)
  2. Create an API key in the dashboard
  3. Copy and paste it here re_jZPDVXgr_JAwSW7QFAaviQ8o522ReR4Ja

- **Calendly URL**: 
  - Your Calendly booking page URL (e.g., `https://calendly.com/steve-harvey/discovery-call`)

- **Google Analytics 4 ID**: 
  1. Go to [analytics.google.com](https://analytics.google.com)
  2. Create a new property
  3. Copy the Measurement ID (starts with `G-`)

- **Contact Email**: Your professional email address

- **LinkedIn URL**: Your LinkedIn profile URL

- **Site URL**: We'll update this after deployment

### Step 4: Test Locally

Before deploying, test your website locally:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

**Check:**
- ✅ Website loads correctly
- ✅ All pages work (Home, About, Services, Contact)
- ✅ Images display properly
- ✅ Navigation works
- ✅ Contact form appears (won't send emails yet, but should display)

Press `Ctrl+C` in the terminal to stop the server when done testing.

---

## Part 2: Set Up GitHub (Code Repository)

### Step 5: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in:
   - **Repository name**: `biotech-consulting-website` (or any name you like)
   - **Description**: "Personal consulting website"
   - **Visibility**: Choose **Private** (recommended) or **Public**
   - **DO NOT** check "Initialize with README" (we already have files)
4. Click **"Create repository"**

### Step 6: Push Your Code to GitHub

In your terminal, run these commands one by one:

```bash
# Initialize git (if not already done)
git init

# Add al


l files
git add .

# Create your first commit
git commit -m "Initial commit - biotech consulting website"

# Connect to GitHub (replace YOUR_USERNAME and REPO_NAME with your actual values)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note**: GitHub may ask you to authenticate. Follow the prompts to sign in.

**Troubleshooting**: If you get authentication errors:
- Use GitHub Desktop app (easier for beginners)
- Or set up a Personal Access Token: [GitHub Docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

---

## Part 3: Deploy to Vercel

### Step 7: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (easiest option)
4. Authorize Vercel to access your GitHub account

### Step 8: Deploy Your Website

1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. Find and select your repository (`biotech-consulting-website`)
3. Click **"Import"**

### Step 9: Configure Environment Variables in Vercel

**IMPORTANT**: You need to add your environment variables here so they work in production.

1. In the Vercel project setup page, scroll down to **"Environment Variables"**
2. Add each variable from your `.env.local` file:

Click **"Add"** for each of these:

- `RESEND_API_KEY` = (your Resend API key)
- `NEXT_PUBLIC_CALENDLY_URL` = (your Calendly URL)
- `NEXT_PUBLIC_GA4_ID` = (your Google Analytics ID)
- `CONTACT_EMAIL` = (your email)
- `NOTIFICATION_EMAIL` = (your email)
- `NEXT_PUBLIC_LINKEDIN_URL` = (your LinkedIn URL)
- `NEXT_PUBLIC_SITE_URL` = (we'll update this after deployment)

3. Make sure all variables are set for **Production**, **Preview**, and **Development** environments

### Step 10: Deploy!

1. Scroll down and click **"Deploy"**
2. Wait 2-3 minutes for Vercel to build and deploy your website
3. You'll see a success message with a URL like: `https://biotech-consulting-website.vercel.app`

**🎉 Congratulations! Your website is now live!**

### Step 11: Update Your Site URL

1. Go back to your Vercel project settings
2. Update the `NEXT_PUBLIC_SITE_URL` environment variable to your actual Vercel URL
3. Redeploy (Vercel will auto-redeploy when you save environment variables)

---

## Part 4: Set Up a Custom Domain (Optional but Recommended)

### Step 12: Buy a Domain (if you don't have one)

Popular domain registrars:
- [Namecheap](https://www.namecheap.com) - Recommended for beginners
- [Google Domains](https://domains.google)
- [Cloudflare](https://www.cloudflare.com/products/registrar)

**Tips:**
- Choose something professional: `steveharveyconsulting.com` or `steveharvey.co.uk`
- `.com` is most professional, but `.co.uk` works for UK businesses
- Expect to pay $10-15/year for a domain

### Step 13: Connect Domain to Vercel

1. In your Vercel project, go to **Settings** → **Domains**
2. Enter your domain name (e.g., `steveharveyconsulting.com`)
3. Click **"Add"**
4. Vercel will show you DNS records to add

### Step 14: Update DNS Records

1. Go to your domain registrar's website
2. Find the DNS/Domain settings
3. Add the DNS records Vercel provided (usually just an A record or CNAME)
4. Wait 24-48 hours for DNS to propagate (usually faster, but can take time)

### Step 15: Update Environment Variable

Once your domain is working:
1. Update `NEXT_PUBLIC_SITE_URL` in Vercel to your custom domain
2. Vercel will automatically redeploy

---

## Part 5: Final Setup & Testing

### Step 16: Test Everything

Visit your live website and test:

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] About page displays properly
- [ ] Services page shows all content
- [ ] Contact form submits (check your email!)
- [ ] Calendly widget loads
- [ ] Images display correctly
- [ ] Mobile view works (test on your phone)

### Step 17: Set Up Email Domain (For Professional Emails)

**Option A: Use Resend's Email Domain (Recommended)**

1. In Resend dashboard, go to **Domains**
2. Add your domain (e.g., `steveharveyconsulting.com`)
3. Add the DNS records Resend provides to your domain registrar
4. Wait for verification (usually 24 hours)
5. Update your `CONTACT_EMAIL` to use your domain: `steve@steveharveyconsulting.com`

**Option B: Use Your Existing Email**

If you already have a professional email, just use that in the environment variables.

### Step 18: Test Contact Form

1. Go to your live website's Contact page
2. Fill out and submit the contact form
3. Check that:
   - You receive the notification email
   - The submitter receives the auto-response email

---

## Part 6: Ongoing Maintenance

### Making Updates

1. Edit files on your computer
2. Test locally: `npm run dev`
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
4. Vercel will automatically redeploy (usually takes 1-2 minutes)

### Monitoring

- **Vercel Dashboard**: Check deployment status and analytics
- **Google Analytics**: Monitor website traffic
- **Resend Dashboard**: Monitor email delivery

---

## Troubleshooting

### Website won't build
- Check Vercel build logs for errors
- Make sure all environment variables are set
- Verify `package.json` has all dependencies

### Contact form not working
- Check Resend API key is correct
- Verify email addresses in environment variables
- Check Resend dashboard for delivery errors

### Images not showing
- Make sure `headshot.jpg` is in `public/images/`
- Check file name matches exactly (case-sensitive)
- Verify image file size isn't too large

### Calendly not loading
- Check `NEXT_PUBLIC_CALENDLY_URL` is correct
- Make sure Calendly event is published and public

---

## Quick Reference

**Local Development:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server locally
```

**Git Commands:**
```bash
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push             # Push to GitHub
```

**Important URLs:**
- Vercel Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
- GitHub: [github.com](https://github.com)
- Resend Dashboard: [resend.com](https://resend.com)
- Google Analytics: [analytics.google.com](https://analytics.google.com)

---

## Need Help?

If you get stuck:
1. Check Vercel deployment logs for error messages
2. Verify all environment variables are set correctly
3. Make sure all dependencies are installed (`npm install`)
4. Check that your code is pushed to GitHub

Your website should now be live and ready to accept bookings! 🚀

