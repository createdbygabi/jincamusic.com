'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MusicSheetCard from '../components/MusicSheetCard';
import { songs, getCurrentDay } from '../data/songs';

export default function Challenge() {
  // Get all songs with images, sorted by composed date (newest first)
  const sheetsWithDates = songs
    .filter((song) => song.image && song.composedDate)
    .sort((a, b) => new Date(b.composedDate) - new Date(a.composedDate));

  // Calculate challenge stats
  const totalSongs = sheetsWithDates.length;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-48 pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-serif text-black mb-8 leading-[0.9] tracking-tight">
              1 Song a Day
            </h1>
            <p className="text-2xl md:text-3xl text-black/50 mb-12 leading-relaxed font-light max-w-3xl">
              A journey of daily composition, one song at a time.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="border-t border-black/10 pt-6">
              <div className="text-5xl md:text-6xl font-serif text-black mb-2">
                {totalSongs}
              </div>
              <div className="text-sm uppercase tracking-[0.15em] text-black/50">
                Total Songs
              </div>
            </div>
            <div className="border-t border-black/10 pt-6">
              <div className="text-5xl md:text-6xl font-serif text-black mb-2">
                {getCurrentDay()}
              </div>
              <div className="text-sm uppercase tracking-[0.15em] text-black/50">
                Days Active
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Compositions Grid */}
      <section className="py-32 px-6 lg:px-12 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <h2 className="text-5xl md:text-6xl font-serif text-black text-left leading-tight mb-4">
              All Compositions
            </h2>
            <p className="text-lg text-black/50 max-w-2xl">
              Browse through all the songs created during the challenge.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
            {sheetsWithDates.map((song) => (
              <a 
                key={song.id}
                href="https://linktr.ee/jincamusic"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="mb-2 text-sm text-black/60 font-serif">
                  {String(song.id).padStart(2, '0')}
                </div>
                <MusicSheetCard sheet={song} showDescription={true} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

