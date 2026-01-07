# HubSpot Setup Guide

This guide covers setting up HubSpot integration for contact forms, newsletter subscriptions, tracking, and meeting scheduling.

## Prerequisites

- HubSpot account (free tier available)
- Access to HubSpot Settings

## Step 1: Create HubSpot Account

1. Sign up at [hubspot.com](https://www.hubspot.com)
2. Complete account setup
3. Note your HubSpot Portal ID (Hub ID) - found in Settings > Account Setup > Account Defaults

## Step 2: Create Private App

1. Navigate to **Settings > Integrations > Private Apps**
2. Click **"Create a private app"**
3. Name your app (e.g., "Website Integration")
4. Configure scopes - select the following:
   - **CRM**:
     - `crm.objects.contacts.read`
     - `crm.objects.contacts.write`
   - **Lists**:
     - `crm.lists.read`
     - `crm.lists.write`
   - **Marketing**:
     - `marketing.read`
     - `marketing.write`
5. Click **"Create app"**
6. Copy the **Access Token** - you'll need this for environment variables
7. **Important**: Store the token securely. You won't be able to see it again.

## Step 3: Create Custom Properties

Navigate to **Settings > Properties > Contact properties** and create:

### Company Property
- **Label**: Company
- **Type**: Text
- **Field name**: `company`
- **Description**: Company name from contact form

### Message Property
- **Label**: Message
- **Type**: Textarea
- **Field name**: `message`
- **Description**: Contact form message

### Subscription Source Property
- **Label**: Subscription Source
- **Type**: Text
- **Field name**: `subscription_source`
- **Description**: Where the newsletter subscription came from

### Subscription Date Property
- **Label**: Subscription Date
- **Type**: Date
- **Field name**: `subscription_date`
- **Description**: When the user subscribed to newsletter

## Step 4: Create Newsletter List

1. Navigate to **Contacts > Lists**
2. Click **"Create list"**
3. Name it **"Newsletter Subscribers"**
4. Set list type to **"Static list"**
5. Click **"Create"**
6. Note the **List ID** from the URL or list settings - you'll need this for `HUBSPOT_NEWSLETTER_LIST_ID`

## Step 5: Set Up HubSpot Meeting Scheduler

1. Navigate to **Sales > Meetings**
2. Click **"Create meeting link"**
3. Configure your meeting:
   - Set meeting duration (e.g., 20 minutes)
   - Set availability
   - Add meeting description
4. Click **"Create"**
5. Copy the **Meeting URL** - you'll need this for `NEXT_PUBLIC_HUBSPOT_MEETING_URL`

Alternatively, you can embed the meeting scheduler:
- Click **"Embed"** on your meeting link
- Copy the embed code or URL

## Step 6: Configure Environment Variables

Add the following to your `.env.local` file and Vercel environment variables:

```bash
# HubSpot API Configuration
HUBSPOT_ACCESS_TOKEN=your_private_app_token_here
HUBSPOT_PORTAL_ID=your_portal_id_here
HUBSPOT_NEWSLETTER_LIST_ID=your_list_id_here

# HubSpot Public Configuration (for client-side)
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_portal_id_here
NEXT_PUBLIC_HUBSPOT_MEETING_URL=your_meeting_url_here

# Resend Configuration (for welcome emails - works with Starter plan)
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
```

## Step 7: Set Up Welcome Emails for Newsletter Subscribers

### For HubSpot Starter Plan Users (Recommended: Resend)

Since HubSpot Starter plan doesn't include Workflows or transactional email API, we use **Resend** to send welcome emails. This is already implemented in the code.

1. **Sign up for Resend** (free tier available):
   - Go to [resend.com](https://resend.com)
   - Sign up for a free account
   - Free tier includes: 100 emails/day, 3,000 emails/month

2. **Get your API Key**:
   - Go to **API Keys** in Resend dashboard
   - Click **"Create API Key"**
   - Copy the API key

3. **Set Environment Variables**:
   ```bash
   # Resend API Key (for welcome emails)
   RESEND_API_KEY=re_your_api_key_here
   
   # Optional: Custom "from" email address
   # Default: onboarding@resend.dev (works for testing)
   # For production, verify your domain in Resend
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   ```

4. **Install Resend package** (if not already installed):
   ```bash
   npm install resend
   ```

5. **Verify it works**:
   - Subscribe to your newsletter
   - Check your email inbox for the welcome email

**Note**: The welcome email is sent automatically when someone subscribes. If Resend is not configured, the subscription still succeeds (email sending is non-blocking).

### Alternative: HubSpot Workflows (Professional/Enterprise Plans Only)

⚠️ **Note**: HubSpot Workflows require **Professional** tier or higher. Starter plan users should use Resend (above).

If you have Professional/Enterprise:

1. Navigate to **Automation > Workflows**
2. Click **"Create workflow"**
3. Choose **"Contact-based"** workflow
4. Set trigger: **"Contact is added to list"**
   - Select your **"Newsletter Subscribers"** list
5. Add action: **"Send email"**
   - Choose or create a welcome email template
   - Customize the email content with personalization tokens (e.g., `{{contact.firstname}}`)
6. Click **"Activate"**

## Step 8: Test Integration

### Test Contact Form
1. Submit the contact form on your website
2. Check HubSpot **Contacts** - new contact should appear
3. Check contact record - note should be attached with message
4. Verify custom properties are populated

### Test Newsletter Subscription
1. Subscribe to newsletter on your website
2. Check HubSpot **Contacts** - contact should be created/updated
3. Check **"Newsletter Subscribers"** list - contact should be added
4. Verify `subscription_source` and `subscription_date` properties are set
5. **If using API-based emails**: Check your email inbox for welcome email
6. **If using workflows**: Check workflow activity log to verify email was sent

### Test Tracking
1. Visit your website
2. Check HubSpot **Analytics > Traffic Analytics** - page views should appear
3. Verify tracking script is loading (check browser console)

### Test Meeting Scheduler
1. Visit contact page
2. Verify meeting scheduler widget loads
3. Test booking a meeting

## Troubleshooting

### Contacts Not Creating
- Verify `HUBSPOT_ACCESS_TOKEN` is correct
- Check Private App has `crm.objects.contacts.write` scope
- Check API rate limits in HubSpot

### Lists Not Working
- Verify `HUBSPOT_NEWSLETTER_LIST_ID` is correct
- Check Private App has `crm.lists.write` scope
- Verify list exists and is active

### Tracking Not Working
- Verify `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` is set
- Check browser console for script loading errors
- Verify Portal ID matches your HubSpot account

### Meeting Widget Not Loading
- Verify `NEXT_PUBLIC_HUBSPOT_MEETING_URL` is correct
- Check meeting link is active in HubSpot
- Verify iframe permissions in browser console

### Welcome Emails Not Sending
- **If using workflows**: Check workflow is activated and trigger conditions are met
- **If using API**: Verify `SEND_WELCOME_EMAIL=true` is set
- Check Private App has email sending scopes (`marketing.send` or `email.send`)
- Verify HubSpot plan includes email sending (Marketing Hub or Sales Hub)
- Check Vercel logs for email sending errors
- If using template: Verify `HUBSPOT_WELCOME_EMAIL_TEMPLATE_ID` is correct

## API Rate Limits

HubSpot free tier includes:
- 100 API calls per 10 seconds
- 40,000 API calls per day

Monitor usage in HubSpot Settings > Integrations > API Usage.

## Additional Resources

- [HubSpot API Documentation](https://developers.hubspot.com/docs/api/overview)
- [HubSpot Private Apps Guide](https://developers.hubspot.com/docs/api/working-with-oauth)
- [HubSpot Meeting Links](https://knowledge.hubspot.com/meetings/schedule-meetings-with-hubspot-meetings)

