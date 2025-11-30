import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import crypto from 'crypto';
import { supabase } from '../../lib/supabase';
import { musicSheets } from '../../data/musicSheets';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.redirect(
        new URL('/sheets?error=no_session', request.url)
      );
    }

    // Check if token already exists for this session (prevent duplicates)
    const { data: existingToken } = await supabase
      .from('download_tokens')
      .select('token')
      .eq('session_id', sessionId)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (existingToken) {
      // Token already exists, redirect to existing download
      console.log('Existing token found for session:', sessionId);
      return NextResponse.redirect(
        new URL(`/download?token=${existingToken.token}`, request.url)
      );
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify payment was successful
    if (session.payment_status !== 'paid') {
      return NextResponse.redirect(
        new URL('/sheets?error=payment_failed', request.url)
      );
    }

    // Find the sheet music by matching the payment amount or metadata
    const amountPaid = session.amount_total / 100; // Convert from cents
    const sheet = musicSheets.find(s => parseFloat(s.price) === amountPaid);

    if (!sheet || !sheet.pdfPath) {
      return NextResponse.redirect(
        new URL('/sheets?error=sheet_not_found', request.url)
      );
    }

    // Generate a secure temporary download token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    console.log('Generated token (length):', token.length, token);

    // Store token in Supabase
    const { data: insertedData, error: insertError } = await supabase
      .from('download_tokens')
      .insert({
        token,
        session_id: session.id,
        sheet_id: sheet.id,
        pdf_path: sheet.pdfPath,
        expires_at: expiresAt.toISOString(),
        customer_email: session.customer_details?.email || null,
        used: false,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error storing token:', insertError);
      return NextResponse.redirect(
        new URL('/sheets?error=token_creation_failed', request.url)
      );
    }

    console.log('Token generated and stored:', token);
    console.log('Stored token data:', insertedData);
    console.log('Token stored for PDF:', sheet.pdfPath);

    // Clean up expired tokens (optional, can be done via cron job)
    await supabase
      .from('download_tokens')
      .delete()
      .lt('expires_at', new Date().toISOString());

    // Redirect to download page with token
    const redirectUrl = new URL(`/download?token=${token}`, request.url);
    console.log('Redirecting to:', redirectUrl.toString());
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Payment success error:', error);
    return NextResponse.redirect(
      new URL('/sheets?error=verification_failed', request.url)
    );
  }
}

