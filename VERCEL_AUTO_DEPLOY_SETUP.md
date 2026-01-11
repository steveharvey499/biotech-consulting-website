# Vercel Automatic Deployment Setup

This guide will help you verify or set up automatic deployments from GitHub to Vercel.

## ✅ Quick Check: Is Vercel Already Connected?

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Check if you see a project named `biotech-consulting-website`
3. If yes → Skip to "Verify Automatic Deployments" below
4. If no → Follow "Initial Setup" below

---

## 🚀 Initial Setup (If Not Already Connected)

### Step 1: Create Vercel Account (if needed)

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Repository

1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. Find and select `steveharvey499/biotech-consulting-website`
3. Click **"Import"**

### Step 3: Configure Project Settings

Vercel should auto-detect Next.js. Verify these settings:
- **Framework Preset**: Next.js
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)

### Step 4: Add Environment Variables

**IMPORTANT**: Add your environment variables from your `.env.local` file:

1. Scroll down to **"Environment Variables"** section
2. Add each variable (click "Add" for each):
   - `RESEND_API_KEY`
   - `NEXT_PUBLIC_CALENDLY_URL`
   - `NEXT_PUBLIC_GA4_ID` (if you have one)
   - `CONTACT_EMAIL`
   - `NOTIFICATION_EMAIL`
   - `NEXT_PUBLIC_LINKEDIN_URL`
   - `NEXT_PUBLIC_SITE_URL` (you can update this after first deployment)

3. Make sure to select **Production**, **Preview**, and **Development** for each variable

### Step 5: Deploy

1. Click **"Deploy"** at the bottom
2. Wait 2-3 minutes for the build to complete
3. You'll get a URL like: `https://biotech-consulting-website.vercel.app`

---

## ✅ Verify Automatic Deployments

Once your project is set up, automatic deployments should work by default. Here's how to verify:

### Check Deployment Settings

1. Go to your project in Vercel dashboard
2. Click **Settings** → **Git**
3. Verify:
   - ✅ **Production Branch**: Should be `main`
   - ✅ **Automatic deployments from Git**: Should be **Enabled**

### Test Automatic Deployment

1. Make a small change to any file (or we just pushed changes)
2. Push to GitHub: `git push origin main`
3. Go to Vercel dashboard → **Deployments** tab
4. You should see a new deployment starting automatically within seconds
5. Wait 2-3 minutes for it to complete
6. Your site will update automatically!

---

## 🔍 How Automatic Deployments Work

**By default, Vercel automatically:**
- ✅ Deploys every push to `main` branch → **Production**
- ✅ Creates preview deployments for pull requests → **Preview**
- ✅ Rebuilds when environment variables change

**No manual action needed!** Just push to GitHub and Vercel handles the rest.

---

## 📊 Monitor Deployments

### View Deployment Status

1. Go to Vercel dashboard → Your project → **Deployments** tab
2. You'll see:
   - ✅ Green checkmark = Successful deployment
   - ⏳ Spinning icon = Currently deploying
   - ❌ Red X = Failed deployment (check logs)

### View Deployment Logs

1. Click on any deployment
2. Click **"View Build Logs"** to see what happened
3. Check for any errors or warnings

---

## 🐛 Troubleshooting

### Deployments Not Triggering?

1. **Check Git Connection:**
   - Settings → Git → Verify repository is connected
   - Make sure you're pushing to the `main` branch

2. **Check Branch Settings:**
   - Settings → Git → Production Branch should be `main`

3. **Verify GitHub Integration:**
   - Settings → Git → Click "Disconnect" and reconnect if needed

### Build Failures?

1. Check deployment logs for error messages
2. Verify all environment variables are set
3. Make sure `npm install` works locally
4. Check that all dependencies are in `package.json`

### Environment Variables Not Working?

1. Make sure variables are set for **Production** environment
2. Redeploy after adding new variables
3. Check variable names match exactly (case-sensitive)

---

## 🎯 Next Steps

Once automatic deployments are working:

1. ✅ Every `git push` to main = automatic production deployment
2. ✅ Pull requests = automatic preview deployments
3. ✅ Your site updates within 2-3 minutes of pushing

**You're all set!** Your website will now automatically update whenever you push changes to GitHub.

---

## 📝 Quick Reference

- **Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **GitHub Repository**: [github.com/steveharvey499/biotech-consulting-website](https://github.com/steveharvey499/biotech-consulting-website)
- **Deployment Status**: Check Vercel dashboard → Deployments tab
