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
