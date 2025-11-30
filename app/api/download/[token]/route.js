import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { supabase } from '../../../lib/supabase';

export async function GET(request, { params }) {
  try {
    // In Next.js App Router, params need to be awaited
    const { token } = await params;

    console.log('Download request - token:', token);
    
    if (!token) {
      console.error('No token provided in URL');
      return NextResponse.json(
        { error: 'Invalid download link' },
        { status: 400 }
      );
    }

    // Verify token exists and is valid in Supabase
    console.log('Searching for token in database (length):', token.length);
    
    const { data: tokenData, error: tokenError } = await supabase
      .from('download_tokens')
      .select('*')
      .eq('token', token)
      .single();

    if (tokenError || !tokenData) {
      console.error('Token not found:', tokenError);
      return NextResponse.json(
        { error: 'Invalid download link' },
        { status: 404 }
      );
    }

    console.log('Token found:', tokenData.id);
    console.log('Token used status:', tokenData.used);
    console.log('Token expires at:', tokenData.expires_at);

    // Check if token has expired (only time constraint, no usage limit - IGNORE used field)
    const expiresAt = new Date(tokenData.expires_at);
    const now = Date.now();
    const expiresAtTime = expiresAt.getTime();
    
    // Always return expiration info for frontend to display time remaining
    const responseData = {
      expiresAt: tokenData.expires_at
    };
    
    if (now > expiresAtTime) {
      console.log('Token expired');
      return NextResponse.json(
        { 
          error: 'Download link has expired',
          ...responseData
        },
        { status: 410 }
      );
    }

    console.log('Token is valid and not expired - proceeding with download');

    // Get PDF path (PDFs stored in app/private/pdfs/ - outside public folder)
    const pdfPath = join(process.cwd(), 'app', 'private', 'pdfs', tokenData.pdf_path);

    try {
      // Read the PDF file
      const pdfBuffer = await readFile(pdfPath);

      // Don't mark as used - allow multiple downloads within 1 hour
      // Token expires naturally after expires_at
      console.log('PDF downloaded successfully for token:', token);

      // Return PDF with appropriate headers
      return new NextResponse(pdfBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${tokenData.pdf_path}"`,
          'Content-Length': pdfBuffer.length.toString(),
        },
      });
    } catch (fileError) {
      console.error('File read error:', fileError);
      return NextResponse.json(
        { error: 'PDF file not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to process download' },
      { status: 500 }
    );
  }
}

