import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import crypto from 'crypto';
import { supabase } from '../../lib/supabase';
import { musicSheets } from '../../data/musicSheets';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  console.log('=== PAYMENT SUCCESS ENDPOINT CALLED ===');
  console.log('Full URL:', request.url);
  
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');
    console.log('Session ID from URL:', sessionId);
    console.log('All search params:', Object.fromEntries(searchParams.entries()));

    if (!sessionId) {
      console.error('ERROR: No session_id in URL');
      return NextResponse.redirect(
        new URL('/sheets?error=no_session', request.url)
      );
    }

    console.log('Step 1: Checking Supabase connection...');
    // Check if token already exists for this session (prevent duplicates)
    const { data: existingToken, error: existingTokenError } = await supabase
      .from('download_tokens')
      .select('token')
      .eq('session_id', sessionId)
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (existingTokenError && existingTokenError.code !== 'PGRST116') {
      console.error('ERROR checking existing token:', existingTokenError);
    }

    if (existingToken) {
      // Token already exists, redirect to existing download
      console.log('Existing token found for session:', sessionId);
      return NextResponse.redirect(
        new URL(`/download?token=${existingToken.token}`, request.url)
      );
    }

    console.log('Step 2: Retrieving Stripe session...');
    console.log('Stripe key exists:', !!process.env.STRIPE_SECRET_KEY);
    console.log('Stripe key prefix:', process.env.STRIPE_SECRET_KEY?.substring(0, 7));
    
    // Retrieve the checkout session from Stripe
    let session;
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId);
      console.log('Stripe session retrieved:', {
        id: session.id,
        payment_status: session.payment_status,
        amount_total: session.amount_total,
        currency: session.currency
      });
    } catch (stripeError) {
      console.error('ERROR retrieving Stripe session:', {
        message: stripeError.message,
        type: stripeError.type,
        code: stripeError.code,
        stack: stripeError.stack
      });
      throw stripeError;
    }

    // Verify payment was successful
    if (session.payment_status !== 'paid') {
      console.error('ERROR: Payment not paid. Status:', session.payment_status);
      return NextResponse.redirect(
        new URL('/sheets?error=payment_failed', request.url)
      );
    }

    console.log('Step 3: Finding matching sheet music...');
    // Find the sheet music by matching the payment amount or metadata
    const amountPaid = session.amount_total / 100; // Convert from cents
    console.log('Amount paid (EUR):', amountPaid);
    console.log('Available sheets:', musicSheets.map(s => ({ id: s.id, price: s.price })));
    
    const sheet = musicSheets.find(s => parseFloat(s.price) === amountPaid);
    console.log('Found sheet:', sheet ? { id: sheet.id, title: sheet.title, pdfPath: sheet.pdfPath } : 'NOT FOUND');

    if (!sheet || !sheet.pdfPath) {
      console.error('ERROR: Sheet not found for amount:', amountPaid);
      return NextResponse.redirect(
        new URL('/sheets?error=sheet_not_found', request.url)
      );
    }

    console.log('Step 4: Generating download token...');
    // Generate a secure temporary download token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
    console.log('Generated token:', token);
    console.log('Expires at:', expiresAt.toISOString());

    console.log('Step 5: Storing token in Supabase...');
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
      console.error('ERROR storing token in Supabase:', {
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        code: insertError.code
      });
      return NextResponse.redirect(
        new URL('/sheets?error=token_creation_failed', request.url)
      );
    }

    console.log('Token successfully stored:', insertedData);

    console.log('Step 6: Cleaning up expired tokens...');
    // Clean up expired tokens (optional, can be done via cron job)
    const { error: cleanupError } = await supabase
      .from('download_tokens')
      .delete()
      .lt('expires_at', new Date().toISOString());
    
    if (cleanupError) {
      console.warn('Warning during cleanup:', cleanupError);
    }

    // Redirect to download page with token
    const redirectUrl = new URL(`/download?token=${token}`, request.url);
    console.log('SUCCESS: Redirecting to:', redirectUrl.toString());
    console.log('=== PAYMENT SUCCESS ENDPOINT COMPLETED ===');
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('=== PAYMENT SUCCESS ERROR ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    console.error('=== END ERROR ===');
    return NextResponse.redirect(
      new URL('/sheets?error=verification_failed', request.url)
    );
  }
}

