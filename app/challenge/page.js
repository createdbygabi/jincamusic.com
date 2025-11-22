'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MusicSheetCard from '../components/MusicSheetCard';
import { musicSheets } from '../data/musicSheets';

export default function Challenge() {
  const [selectedDate, setSelectedDate] = useState(null);

  // Get all sheets with images, sorted by composed date (newest first)
  const sheetsWithDates = musicSheets
    .filter((sheet) => sheet.image && sheet.composedDate)
    .sort((a, b) => new Date(b.composedDate) - new Date(a.composedDate));

  // Group sheets by date
  const sheetsByDate = sheetsWithDates.reduce((acc, sheet) => {
    const date = sheet.composedDate;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(sheet);
    return acc;
  }, {});

  // Get all unique dates, sorted
  const dates = Object.keys(sheetsByDate).sort((a, b) => new Date(b) - new Date(a));

  // Calculate challenge stats
  const totalDays = dates.length;
  const totalSongs = sheetsWithDates.length;
  const startDate = dates.length > 0 ? dates[dates.length - 1] : null;
  const currentStreak = calculateStreak(dates);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Calculate streak
  function calculateStreak(dateArray) {
    if (dateArray.length === 0) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let checkDate = new Date(today);
    
    for (let i = 0; i < dateArray.length; i++) {
      const sheetDate = new Date(dateArray[i]);
      sheetDate.setHours(0, 0, 0, 0);
      
      if (sheetDate.getTime() === checkDate.getTime()) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (sheetDate < checkDate) {
        break;
      }
    }
    
    return streak;
  }

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
                {totalDays}
              </div>
              <div className="text-sm uppercase tracking-[0.15em] text-black/50">
                Days Active
              </div>
            </div>
            <div className="border-t border-black/10 pt-6">
              <div className="text-5xl md:text-6xl font-serif text-black mb-2">
                {currentStreak}
              </div>
              <div className="text-sm uppercase tracking-[0.15em] text-black/50">
                Day Streak
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Recap Section */}
      <section className="py-32 px-6 lg:px-12 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <h2 className="text-5xl md:text-6xl font-serif text-black text-left leading-tight mb-4">
              Challenge Recap
            </h2>
            <p className="text-lg text-black/50 max-w-2xl">
              Click on a date to see the songs composed that day.
            </p>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(selectedDate === date ? null : date)}
                className={`text-left p-6 border transition-all duration-300 ${
                  selectedDate === date
                    ? 'border-black bg-black/5'
                    : 'border-black/10 hover:border-black/30 hover:bg-black/2'
                }`}
              >
                <div className="text-xs uppercase tracking-[0.2em] text-black/50 mb-2">
                  {formatDate(date)}
                </div>
                <div className="text-2xl font-serif text-black mb-1">
                  {sheetsByDate[date].length} {sheetsByDate[date].length === 1 ? 'Song' : 'Songs'}
                </div>
                <div className="text-sm text-black/40 mt-2">
                  {sheetsByDate[date].map((sheet, idx) => (
                    <span key={sheet.id}>
                      {sheet.title}
                      {idx < sheetsByDate[date].length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Selected Date Details */}
          {selectedDate && sheetsByDate[selectedDate] && (
            <div className="border-t border-black/10 pt-16">
              <div className="mb-12">
                <h3 className="text-4xl md:text-5xl font-serif text-black mb-4">
                  {formatDate(selectedDate)}
                </h3>
                <p className="text-lg text-black/50">
                  {sheetsByDate[selectedDate].length} {sheetsByDate[selectedDate].length === 1 ? 'composition' : 'compositions'} created
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
                {sheetsByDate[selectedDate].map((sheet) => (
                  <MusicSheetCard key={sheet.id} sheet={sheet} showDescription={true} />
                ))}
              </div>
            </div>
          )}
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
            {sheetsWithDates.map((sheet) => (
              <div key={sheet.id}>
                <MusicSheetCard sheet={sheet} showDescription={true} />
                <div className="mt-4 text-xs uppercase tracking-[0.15em] text-black/40">
                  Composed {formatDate(sheet.composedDate)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

