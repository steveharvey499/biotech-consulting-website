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
```

## Step 7: Set Up Email Workflows (Optional)

HubSpot workflows can automatically send emails when contacts are created or added to lists:

1. Navigate to **Automation > Workflows**
2. Create a new workflow
3. Set trigger: **"Contact is created"** or **"Contact is added to list"**
4. Add action: **"Send email"**
5. Configure email template
6. Activate workflow

This replaces the need for API-based email sending.

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

## API Rate Limits

HubSpot free tier includes:
- 100 API calls per 10 seconds
- 40,000 API calls per day

Monitor usage in HubSpot Settings > Integrations > API Usage.

## Additional Resources

- [HubSpot API Documentation](https://developers.hubspot.com/docs/api/overview)
- [HubSpot Private Apps Guide](https://developers.hubspot.com/docs/api/working-with-oauth)
- [HubSpot Meeting Links](https://knowledge.hubspot.com/meetings/schedule-meetings-with-hubspot-meetings)

