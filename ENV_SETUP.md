# Environment Variables Setup

## Create `.env.local` file

Create a file named `.env.local` in the root directory of your project with the following content:

```env
# Stripe Configuration
# Get your test secret key from: https://dashboard.stripe.com/test/apikeys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# Base URL for redirects
# For local development:
NEXT_PUBLIC_BASE_URL=http://localhost:3000
# For production, change to your domain:
# NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Supabase Configuration
# Get these from: https://supabase.com/dashboard/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## How to Get Your Stripe Secret Key

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy your **Secret key** (starts with `sk_test_`)
3. Paste it in `.env.local` replacing `sk_test_your_stripe_secret_key_here`

## How to Get Your Supabase Keys

1. Go to https://supabase.com and create a new project (or use existing)
2. Go to your project → Settings → API
3. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** (secret!) → `SUPABASE_SERVICE_ROLE_KEY`
4. **Important**: Run the SQL from `SUPABASE_SETUP.md` to create the database table

## Important Notes

- `.env.local` is already in `.gitignore` - it won't be committed to git
- Never share your secret keys publicly
- For production, use live keys (start with `sk_live_`)
- Restart your Next.js dev server after creating/updating `.env.local`

## Example `.env.local` file:

```env
STRIPE_SECRET_KEY=sk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
NEXT_PUBLIC_BASE_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Next Steps

1. **Set up Supabase database**: Follow instructions in `SUPABASE_SETUP.md` to create the `download_tokens` table
2. **Add your keys**: Copy all keys to `.env.local`
3. **Restart server**: Restart your Next.js dev server after adding environment variables

