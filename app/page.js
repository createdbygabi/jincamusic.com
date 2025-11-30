import Link from 'next/link';
import Image from 'next/image';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MusicSheetCard from './components/MusicSheetCard';
import { musicSheets } from './data/musicSheets';
import { songs, getCurrentDay, getCurrentDate } from './data/songs';

export default function Home() {
  // Get first 3 sheets with images for homepage
  const featuredSheets = musicSheets
    .filter((sheet) => sheet.image) // Only include sheets with images
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-48 pb-48 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-16">
            <div className="text-left max-w-4xl flex-1">
              <h1 className="text-7xl md:text-9xl lg:text-[8rem] font-serif text-black mb-12 leading-[0.9] tracking-tight">
                Jinca
              </h1>
              <p className="text-2xl md:text-3xl text-black/50 mb-16 leading-relaxed font-light max-w-2xl">
              constant flow of musical ideas in my head, i have to get them out. this is where they come out :^)
              </p>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                <Link 
                  href="/sheets"
                  className="inline-block text-xs uppercase tracking-[0.2em] text-black border-b border-black/20 pb-3 hover:border-black transition-all duration-300"
                >
                  View Music Sheets
                </Link>
                <a 
                  href="https://linktr.ee/jincamusic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs uppercase tracking-[0.2em] text-black border-b border-black/20 pb-3 hover:border-black transition-all duration-300"
                >
                  Listen to my music
                </a>
              </div>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto lg:flex-1 lg:max-w-2xl">
              <div className="relative w-full h-[500px] lg:h-[600px] xl:h-[700px] rounded-lg overflow-hidden">
                <Image
                  src="/images/me.jpg"
                  alt="Jinca"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Music Sheets Section */}
      <section className="py-32 px-6 lg:px-12 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <h2 className="text-5xl md:text-6xl font-serif text-black text-left leading-tight mb-4">
              Music Sheets
            </h2>
            <Link 
              href="/sheets"
              className="inline-block text-xs uppercase tracking-[0.2em] text-black/50 border-b border-black/20 pb-2 hover:border-black hover:text-black transition-all duration-300"
            >
              See All Sheets →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
            {featuredSheets.map((sheet) => (
              <MusicSheetCard key={sheet.id} sheet={sheet} showDescription={true} />
            ))}
          </div>
        </div>
      </section>

      {/* 1 Song a Day Challenge */}
      <section className="py-32 px-6 lg:px-12 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <h2 className="text-5xl md:text-6xl font-serif text-black text-left leading-tight mb-4">
              1 song a day{' '}
              <span className="text-2xl md:text-3xl text-black/50 font-light">
                (more or less, actually 1 song every 2 days oops)
              </span>
            </h2>
            <p className="text-lg text-black/50 font-light max-w-2xl mb-8">
              A daily commitment to creating and sharing one solo piano song every day.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="border-t border-black/10 pt-6">
                <div className="text-5xl md:text-6xl font-serif text-black mb-2">
                  {songs.length}
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
            <Link 
              href="/challenge"
              className="inline-block text-xs uppercase tracking-[0.2em] text-black/50 border-b border-black/20 pb-2 hover:border-black hover:text-black transition-all duration-300"
            >
              See All Challenge Songs →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
            {songs.slice(0, 6).map((song) => (
              <a 
                key={song.id} 
                href="https://linktr.ee/jincamusic"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="aspect-[3/4] bg-black/3 mb-8 transition-all duration-700 group-hover:bg-black/8 group-hover:scale-[1.02] relative overflow-hidden rounded">
                  <Image
                    src={song.image}
                    alt={song.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif text-black mb-1 group-hover:opacity-70 transition-opacity">
                    {String(song.id).padStart(2, '0')}
                  </h3>
                  <p className="text-sm text-black/40 uppercase tracking-wider">
                    {song.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-48 px-6 lg:px-12 border-t border-black/5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-serif text-black mb-12 text-left leading-tight">
              About
            </h2>
          </div>
          <div className="space-y-8">
            <p className="text-xl md:text-2xl text-black/50 leading-relaxed font-light">
            constant flow of musical ideas in my head, i have to get them out. this is where they come out :^) <br />
            my only goal is to one day compose a full moving orchestra piece and play it live with a live orchestra (like Rachmaninoff's 2nd piano concerto). <br />
            also, i LOVE writing.
            </p>
  
          </div>
          <Link 
            href="/about"
            className="inline-block mt-12 text-xs uppercase tracking-[0.2em] text-black border-b border-black/20 pb-3 hover:border-black transition-all duration-300"
          >
            Read More
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
