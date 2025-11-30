'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function DownloadContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setError('No download token provided');
      return;
    }

    // Set direct download URL
    setDownloadUrl(`/api/download/${token}`);

    let intervalId = null;

    // Function to calculate and update time remaining
    const updateTimeRemaining = (expiresAtString) => {
      if (!expiresAtString) return;
      
      const expires = new Date(expiresAtString);
      const now = new Date();
      const diff = expires - now;
      
      if (diff <= 0) {
        setTimeRemaining('expired');
        if (intervalId) {
          clearInterval(intervalId);
        }
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else if (minutes > 0) {
        setTimeRemaining(`${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining(`${seconds}s`);
      }
    };

    // Trigger automatic download
    const downloadFile = async () => {
      try {
        console.log('Attempting download with token:', token);
        const response = await fetch(`/api/download/${token}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Download error:', errorData);
          
          // If we have expiration info, check if link is still valid
          if (errorData.expiresAt) {
            const expires = new Date(errorData.expiresAt);
            const now = new Date();
            const diff = expires - now;
            
            // If link is still valid (not expired), show as available, not error
            if (diff > 0) {
              setExpiresAt(errorData.expiresAt);
              updateTimeRemaining(errorData.expiresAt);
              
              // Update time remaining every second
              intervalId = setInterval(() => {
                updateTimeRemaining(errorData.expiresAt);
              }, 1000);
              
              // Show as available, not error
              setStatus('available');
              setError(null);
              return;
            } else {
              // Link expired
              setError('Download link has expired');
              setStatus('error');
              return;
            }
          }
          
          // Only show error if there's no expiration info or other real error
          if (errorData.error) {
            throw new Error(errorData.error);
          } else {
            throw new Error('Download failed');
          }
        }

        // Get the blob
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sheet-music.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setStatus('success');
      } catch (err) {
        setStatus('error');
        setError(err.message);
      }
    };

    // Small delay to ensure page is rendered
    setTimeout(downloadFile, 500);

    // Cleanup function
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [token]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-48 pb-48 px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          {status === 'loading' && (
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-black mb-4">
                Preparing your download...
              </h1>
              <p className="text-lg text-black/50 mb-8">
                Your sheet music will download shortly.
              </p>
              <div className="border-t border-black/10 pt-8 mt-8">
                <p className="text-lg text-black mb-4">
                  Thank you, kind stranger :)
                </p>
                <p className="text-sm text-black/60">
                  If you have any questions, feel free to email at{' '}
                  <a 
                    href="mailto:garcia.gvj@gmail.com" 
                    className="border-b border-black/20 hover:border-black transition-all"
                  >
                    garcia.gvj@gmail.com
                  </a>
                  {' '}or message me on Instagram{' '}
                  <a 
                    href="https://instagram.com/jincamusic" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-black/20 hover:border-black transition-all"
                  >
                    @jincamusic
                  </a>
                </p>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-black mb-4">
                Download started!
              </h1>
              <p className="text-lg text-black/50 mb-6">
                Your sheet music should be downloading now. If it didn't start automatically, 
                use the download link below.
              </p>
              {downloadUrl && (
                <div className="mb-8">
                  <a
                    href={downloadUrl}
                    download="sheet-music.pdf"
                    className="inline-block text-sm uppercase tracking-[0.2em] text-black border border-black/20 px-6 py-3 hover:border-black hover:bg-black/5 transition-all duration-300 mb-4"
                  >
                    Download PDF
                  </a>
                  <p className="text-xs text-black/40">
                    This download link is valid for 1 hour
                  </p>
                </div>
              )}
              <div className="border-t border-black/10 pt-8 mt-8">
                <p className="text-lg text-black mb-4">
                  Thank you, kind stranger :)
                </p>
                <p className="text-sm text-black/60">
                  If you have any questions, feel free to email at{' '}
                  <a 
                    href="mailto:garcia.gvj@gmail.com" 
                    className="border-b border-black/20 hover:border-black transition-all"
                  >
                    garcia.gvj@gmail.com
                  </a>
                  {' '}or message me on Instagram{' '}
                  <a 
                    href="https://instagram.com/jincamusic" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-black/20 hover:border-black transition-all"
                  >
                    @jincamusic
                  </a>
                </p>
              </div>
              <Link 
                href="/sheets"
                className="inline-block mt-8 text-xs uppercase tracking-[0.2em] text-black border-b border-black/20 pb-2 hover:border-black transition-all duration-300"
              >
                Back to Music Sheets
              </Link>
            </div>
          )}

          {status === 'available' && (
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-black mb-4">
                Download Available
              </h1>
              <p className="text-lg text-black/50 mb-6">
                Your download link is ready.
              </p>
              {timeRemaining && timeRemaining !== 'expired' && (
                <div className="mb-6 p-4 bg-black/5 border border-black/10">
                  <p className="text-sm text-black/60 mb-1">
                    Time remaining:
                  </p>
                  <p className="text-2xl font-serif text-black">
                    {timeRemaining}
                  </p>
                </div>
              )}
              {downloadUrl && (
                <div className="mb-8">
                  <a
                    href={downloadUrl}
                    download="sheet-music.pdf"
                    className="inline-block text-sm uppercase tracking-[0.2em] text-black border border-black/20 px-6 py-3 hover:border-black hover:bg-black/5 transition-all duration-300"
                  >
                    Download PDF
                  </a>
                </div>
              )}
              <div className="border-t border-black/10 pt-8 mt-8">
                <p className="text-lg text-black mb-4">
                  Thank you, kind stranger :)
                </p>
                <p className="text-sm text-black/60">
                  If you have any questions, feel free to email at{' '}
                  <a 
                    href="mailto:garcia.gvj@gmail.com" 
                    className="border-b border-black/20 hover:border-black transition-all"
                  >
                    garcia.gvj@gmail.com
                  </a>
                  {' '}or message me on Instagram{' '}
                  <a 
                    href="https://instagram.com/jincamusic" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-black/20 hover:border-black transition-all"
                  >
                    @jincamusic
                  </a>
                </p>
              </div>
              <Link 
                href="/sheets"
                className="inline-block mt-8 text-xs uppercase tracking-[0.2em] text-black border-b border-black/20 pb-2 hover:border-black transition-all duration-300"
              >
                Back to Music Sheets
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-black mb-4">
                {error && error.includes('expired') ? 'Download Link Expired' : 'Download Error'}
              </h1>
              <p className="text-lg text-black/50 mb-6">
                {error || 'There was an error processing your download.'}
              </p>
              {downloadUrl && !error?.includes('expired') && (
                <div className="mb-8">
                  <p className="text-sm text-black/60 mb-4">
                    Try downloading directly:
                  </p>
                  <a
                    href={downloadUrl}
                    download="sheet-music.pdf"
                    className="inline-block text-sm uppercase tracking-[0.2em] text-black border border-black/20 px-6 py-3 hover:border-black hover:bg-black/5 transition-all duration-300"
                  >
                    Download PDF
                  </a>
                </div>
              )}
              {error?.includes('expired') && (
                <div className="mb-8 p-4 bg-black/5 border border-black/10">
                  <p className="text-sm text-black/60">
                    This download link has expired. Please make a new purchase to get a new download link.
                  </p>
                </div>
              )}
              <div className="border-t border-black/10 pt-8 mt-8">
                <p className="text-lg text-black mb-4">
                  Thank you, kind stranger :)
                </p>
                <p className="text-sm text-black/60">
                  If you have any questions, feel free to email at{' '}
                  <a 
                    href="mailto:garcia.gvj@gmail.com" 
                    className="border-b border-black/20 hover:border-black transition-all"
                  >
                    garcia.gvj@gmail.com
                  </a>
                  {' '}or message me on Instagram{' '}
                  <a 
                    href="https://instagram.com/jincamusic" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-black/20 hover:border-black transition-all"
                  >
                    @jincamusic
                  </a>
                </p>
              </div>
              <Link 
                href="/sheets"
                className="inline-block mt-8 text-xs uppercase tracking-[0.2em] text-black border-b border-black/20 pb-2 hover:border-black transition-all duration-300"
              >
                Back to Music Sheets
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function DownloadPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <Navbar />
        <section className="pt-48 pb-48 px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-black mb-4">
              Loading...
            </h1>
          </div>
        </section>
        <Footer />
      </div>
    }>
      <DownloadContent />
    </Suspense>
  );
}

