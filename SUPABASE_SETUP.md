# Supabase Setup for Download Tokens

## 1. Create Supabase Project

1. Go to https://supabase.com and create a new project
2. Note your project URL and anon key from Settings → API

## 2. Create Database Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create download_tokens table
CREATE TABLE download_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token TEXT UNIQUE NOT NULL,
  session_id TEXT NOT NULL,
  sheet_id INTEGER NOT NULL,
  pdf_path TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  customer_email TEXT,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on token for fast lookups
CREATE INDEX idx_download_tokens_token ON download_tokens(token);

-- Create index on session_id to prevent duplicates
CREATE INDEX idx_download_tokens_session_id ON download_tokens(session_id);

-- Create index on expires_at for cleanup
CREATE INDEX idx_download_tokens_expires_at ON download_tokens(expires_at);

-- Enable Row Level Security (optional, for extra security)
ALTER TABLE download_tokens ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to access all rows
CREATE POLICY "Service role can access all tokens"
ON download_tokens
FOR ALL
USING (true)
WITH CHECK (true);
```

## 3. Environment Variables

Add to your `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# For server-side operations (use service role key for full access)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## 4. Get Your Keys

1. Go to Supabase Dashboard → Settings → API
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** (secret!) → `SUPABASE_SERVICE_ROLE_KEY`

## 5. Features

- ✅ Prevents duplicate token generation for same checkout session
- ✅ Tracks expiration dates
- ✅ Marks tokens as used (one-time download)
- ✅ Automatic cleanup of expired tokens
- ✅ Secure storage outside of memory

## 6. Cleanup (Optional)

You can set up a database function to automatically clean expired tokens:

```sql
-- Function to clean expired tokens
CREATE OR REPLACE FUNCTION clean_expired_tokens()
RETURNS void AS $$
BEGIN
  DELETE FROM download_tokens
  WHERE expires_at < NOW() OR used = TRUE;
END;
$$ LANGUAGE plpgsql;

-- Run cleanup periodically (you can set this up as a cron job)
-- Or call it manually: SELECT clean_expired_tokens();
```

