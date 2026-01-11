# Supabase Setup Guide for Subscriptions

This guide will help you set up Supabase to store subscription data from your newsletter signup form.

## Step 1: Create a Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign Up"**
3. Sign up with GitHub (recommended) or email
4. Verify your email if needed

## Step 2: Create a New Project

1. In the Supabase dashboard, click **"New Project"**
2. Fill in the details:
   - **Name**: `The Synthesis Website` (or any name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users (e.g., `London (eu-west-2)` for UK)
3. Click **"Create new project"**
4. Wait 2-3 minutes for the project to be created

## Step 3: Get Your API Keys

1. Once your project is ready, go to **Settings** → **API** (or **Settings** → **API Keys**)
2. You'll see:
   - **Project URL**: Something like `https://xxxxx.supabase.co` (find this at the top of the page or in **Settings** → **General** → **Reference ID**)
   - **Publishable key**: Starts with `sb_publishable_...` (this is safe for client-side)
   - **Secret key**: Starts with `sb_secret_...` (this is the service role key - **keep this secret!**)

3. **Important**: Copy both:
   - `NEXT_PUBLIC_SUPABASE_URL` = Your Project URL (e.g., `https://augoohadceysjpacbujk.supabase.co`)
   - `SUPABASE_SERVICE_ROLE_KEY` = Your **Secret key** (the one that starts with `sb_secret_...` - click the eye icon to reveal it, then copy it)
   
4. **To find your Project URL**: 
   - Go to **Settings** → **General**
   - Look for **Reference ID** or **Project URL**
   - It should look like: `https://[your-project-id].supabase.co`

## Step 4: Create the Database Table

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy and paste this SQL:

```sql
-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role TEXT,
  company_focus TEXT,
  biggest_challenge TEXT,
  team_size TEXT,
  referral_source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at ON subscriptions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert (required for API)
CREATE POLICY "Allow service role to insert subscriptions"
ON subscriptions
FOR INSERT
TO service_role
WITH CHECK (true);

-- Optional: Create policy to allow authenticated users to read
-- (Uncomment if you want to build an admin dashboard later)
-- CREATE POLICY "Allow authenticated users to read subscriptions"
-- ON subscriptions
-- FOR SELECT
-- TO authenticated
-- USING (true);
```

4. Click **"Run"** (or press `Ctrl+Enter`)
5. You should see "Success. No rows returned"

## Step 5: Verify the Table

1. Go to **Table Editor** (left sidebar)
2. You should see the `subscriptions` table
3. Click on it to see the structure (columns should match the SQL above)

## Step 6: Add Environment Variables

### For Local Development (.env.local)

Add these to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://augoohadceysjpacbujk.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sb_secret_c_NV-your-full-secret-key-here
```

**Important Notes:**
- Replace `augoohadceysjpacbujk` with your actual project ID (from your URL)
- Use your **Secret key** (the one starting with `sb_secret_...`) - click the eye icon to reveal it, then copy the full key
- **DO NOT use the Publishable key** - that's for client-side only
- Keep the `SUPABASE_SERVICE_ROLE_KEY` secret - never commit it to git!
- The Supabase client works with both new format (`sb_...`) and old format (`eyJ...`)

### For Production (Vercel)

1. Go to your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add both variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = (your Supabase project URL)
   - `SUPABASE_SERVICE_ROLE_KEY` = (your service_role key)
4. Select **Production**, **Preview**, and **Development** environments
5. Click **"Save"**
6. **Redeploy** your site for changes to take effect

## Step 7: Test the Integration

1. Test locally:
   ```bash
   npm run dev
   ```
2. Go to your subscription form
3. Fill it out and submit
4. Check Supabase dashboard → **Table Editor** → **subscriptions**
5. You should see a new row with your test data!

## Data Structure

Your subscription data will be stored with these columns:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Auto-generated unique ID |
| `email` | TEXT | Subscriber email (required) |
| `first_name` | TEXT | First name |
| `last_name` | TEXT | Last name |
| `role` | TEXT | Selected role (e.g., "founder-ceo") |
| `company_focus` | TEXT | Company focus (e.g., "rd-discovery") |
| `biggest_challenge` | TEXT | Biggest challenge (e.g., "attention") |
| `team_size` | TEXT | Team size (e.g., "3-10") |
| `referral_source` | TEXT | How they heard about you (e.g., "linkedin") |
| `created_at` | TIMESTAMPTZ | Timestamp of subscription |

## Viewing Your Data

1. **Table Editor**: Go to Supabase dashboard → **Table Editor** → **subscriptions**
2. **SQL Editor**: Run queries like:
   ```sql
   SELECT * FROM subscriptions ORDER BY created_at DESC;
   ```
3. **Export**: Click the export button to download as CSV

## Security Notes

- ✅ `SUPABASE_SERVICE_ROLE_KEY` is server-side only (not exposed to browser)
- ✅ Row Level Security (RLS) is enabled
- ✅ Service role can insert (for API), but can't be used from browser
- ✅ Never expose the service_role key in client-side code

## Troubleshooting

### "relation 'subscriptions' does not exist"
- Make sure you ran the SQL migration in Step 4
- Check that you're in the correct project/database

### "permission denied for table subscriptions"
- Check that you've enabled RLS and created the policy
- Verify you're using the service_role key (not the anon key) in your API route

### Data not appearing
- Check Vercel logs for errors
- Verify environment variables are set correctly
- Check Supabase logs: **Logs** → **API Logs**

## Next Steps

- Build an admin dashboard to view subscriptions
- Set up email notifications when new subscriptions come in
- Export data to CSV regularly
- Create analytics/queries to analyze subscriber trends
