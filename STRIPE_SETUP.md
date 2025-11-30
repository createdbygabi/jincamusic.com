# Stripe Payment Setup Guide

## Overview
This application uses Stripe Checkout to process payments for sheet music downloads. After successful payment, users receive a temporary download link (valid for 1 hour, one-time use).

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in the root directory with:

```
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

For production, use:
- `STRIPE_SECRET_KEY=sk_live_...` (live secret key)
- `NEXT_PUBLIC_BASE_URL=https://yourdomain.com`

### 2. Stripe Account Setup
1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. For testing, use test mode keys (start with `sk_test_` and `pk_test_`)
4. For production, use live mode keys (start with `sk_live_` and `pk_live_`)

### 3. PDF Storage
1. Place your PDF files in `app/private/pdfs/`
2. Name the PDF file exactly as specified in `musicSheets.js` (e.g., `abuelita.pdf`)
3. These files are NOT accessible via public URLs - they're only served through the secure download API

### 4. Testing
1. Use Stripe test cards: https://stripe.com/docs/testing
2. Recommended test card: `4242 4242 4242 4242`
3. Use any future expiry date and any CVC

### 5. Webhook Setup (Optional - for production)
For production, set up Stripe webhooks to verify payments server-side:
- Webhook endpoint: `https://yourdomain.com/api/webhook`
- Events to listen for: `checkout.session.completed`

## File Structure

```
app/
├── api/
│   ├── checkout/route.js          # Creates Stripe checkout session
│   ├── payment-success/route.js    # Handles payment success, generates download token
│   └── download/[token]/route.js   # Secure PDF download endpoint
├── download/
│   └── page.js                     # Download page UI
├── private/
│   └── pdfs/                       # Secure PDF storage (not publicly accessible)
│       └── abuelita.pdf            # Your PDF files go here
└── data/
    └── musicSheets.js              # Sheet music data (includes pdfPath)
```

## Security Features

1. **Temporary Tokens**: Download links expire after 1 hour
2. **One-Time Use**: Tokens are deleted after successful download
3. **Secure Storage**: PDFs stored outside public folder
4. **Payment Verification**: Only paid sessions can generate download tokens
5. **Token Cleanup**: Expired tokens are automatically cleaned up

## Current Configuration

- Currency: EUR (Euros)
- Price: €3.00 for "abuelita"
- Token Expiry: 1 hour
- Download: One-time use

## Notes

- In production, consider using Redis or a database instead of in-memory token storage
- Set up proper error logging and monitoring
- Consider adding email notifications for successful purchases
- Add rate limiting to prevent abuse

