# Beehiiv Setup Guide

This guide covers setting up Beehiiv integration for newsletter subscriptions.

## Prerequisites

- Beehiiv account (free tier available)
- Access to Beehiiv dashboard

## Step 1: Create Beehiiv Account

1. Sign up at [beehiiv.com](https://www.beehiiv.com)
2. Create a publication (newsletter) if you haven't already
3. Note your publication name

## Step 2: Get Your Publication ID

1. Log in to your Beehiiv dashboard
2. Go to **Settings** > **API** (or navigate to your publication settings)
3. Look for **Publication ID** - this is a unique identifier for your publication
4. Copy the Publication ID - you'll need this for `BEEHIV_PUBLICATION_ID`

**Alternative method:**
- The Publication ID may also be visible in your publication URL
- Format: Usually appears as a long string or in the URL path

## Step 3: Create API Key

1. In your Beehiiv dashboard, go to **Settings** > **API**
2. Click **Create New API Key** or **Generate API Key**
3. Name the key appropriately (e.g., "Website Newsletter Subscription")
4. **Important**: Copy the API key immediately - you won't be able to see it again
5. Save the API key securely - you'll need this for `BEEHIV_API_KEY`

**Note**: API keys have permissions - make sure the key has permission to:
- Create subscriptions
- Manage subscribers (if needed)

## Step 4: Configure Environment Variables

Add the following to your `.env.local` file:

```env
# Beehiiv Configuration
BEEHIV_API_KEY=your_beehiiv_api_key_here
BEEHIV_PUBLICATION_ID=your_publication_id_here
```

## Step 5: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your newsletter subscription page (usually `/latest-synthesis`)

3. Enter a test email address and submit the subscription form

4. Check your Beehiiv dashboard:
   - Go to **Audience** > **Subscribers**
   - Verify the test email appears in your subscriber list
   - Check the subscription status

5. Verify welcome email:
   - Check the test email inbox for the welcome email (sent via Resend)
   - Confirm the email was received

## Troubleshooting

### Subscription Not Working

- **Check API Key**: Verify `BEEHIV_API_KEY` is correct and not expired
- **Check Publication ID**: Verify `BEEHIV_PUBLICATION_ID` matches your publication
- **Check API Permissions**: Ensure your API key has subscription creation permissions
- **Check Console Logs**: Look for error messages in your server logs

### Error: "Publication ID not found"

- Verify your Publication ID is correct
- Ensure the API key has access to the specified publication
- Check that the publication exists and is active

### Error: "Invalid API Key"

- Regenerate your API key in Beehiiv dashboard
- Update `BEEHIV_API_KEY` in your `.env.local` file
- Restart your development server

### Subscriber Not Appearing in Beehiiv

- Check Beehiiv dashboard for the subscriber (may take a few seconds)
- Verify the email was valid and properly formatted
- Check server logs for any API errors
- Ensure the subscription endpoint was called successfully

## Additional Resources

- [Beehiiv API Documentation](https://developers.beehiiv.com/)
- [Beehiiv Help Center](https://help.beehiiv.com/)
- [Where to find your Publication ID and API keys](https://help.beehiiv.com/hc/en-us/articles/13091918395799-Where-to-find-your-Publication-ID-or-API-keys)

## Next Steps

After setting up Beehiiv:

1. Customize your welcome email template (handled by Resend)
2. Set up automated email sequences in Beehiiv (if needed)
3. Configure subscriber segments and tags
4. Set up analytics tracking for newsletter performance

