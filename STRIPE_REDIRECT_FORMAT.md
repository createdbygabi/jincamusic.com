# Stripe Payment Link Redirect URL Format

## Exact Success URL Format

When creating a Stripe Payment Link in the Stripe Dashboard, set the **Success URL** to:

### Production:
```
https://yourdomain.com/api/payment-success?session_id={CHECKOUT_SESSION_ID}
```

### Local Development:
```
http://localhost:3000/api/payment-success?session_id={CHECKOUT_SESSION_ID}
```

## How to Set It Up

1. Go to Stripe Dashboard → Products → Payment Links
2. Create or edit your Payment Link for "abuelita" (€3.00)
3. In the **After payment** section, set:
   - **Success URL**: `https://yourdomain.com/api/payment-success?session_id={CHECKOUT_SESSION_ID}`
   - **Cancel URL**: `https://yourdomain.com/sheets` (or your sheets page)

## Important Notes

- `{CHECKOUT_SESSION_ID}` is a placeholder that Stripe will automatically replace with the actual session ID
- The payment-success endpoint will:
  1. Verify the payment was successful
  2. Generate a temporary download token (1 hour expiry)
  3. Redirect to `/download?token=...` for automatic PDF download

## Example URLs

**Production:**
- Success: `https://jinca.com/api/payment-success?session_id={CHECKOUT_SESSION_ID}`
- Cancel: `https://jinca.com/sheets`

**Development:**
- Success: `http://localhost:3000/api/payment-success?session_id={CHECKOUT_SESSION_ID}`
- Cancel: `http://localhost:3000/sheets`

## Testing

After setting up the Payment Link:
1. Copy the Payment Link URL (e.g., `https://buy.stripe.com/test_...`)
2. Paste it in `app/data/musicSheets.js` as the `stripeLink` value
3. Test the flow: Click Buy → Complete payment → Should redirect to download page

