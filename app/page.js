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
      <section className="pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-24 sm:pb-32 md:pb-40 lg:pb-48 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 sm:gap-12 lg:gap-16">
            <div className="text-left max-w-4xl flex-1 w-full">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl xl:text-[8rem] font-serif text-black mb-6 sm:mb-8 md:mb-12 leading-[0.9] tracking-tight">
                Jinca
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-black/50 mb-8 sm:mb-12 md:mb-16 leading-relaxed font-light max-w-2xl">
              constant flow of musical ideas in my head, i have to get them out. this is where they come out :^)
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
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
            <div className="flex-shrink-0 w-full lg:w-auto lg:flex-1 lg:max-w-2xl mt-8 lg:mt-0">
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] rounded-lg overflow-hidden">
                <Image
                  src="/images/me.jpg"
                  alt="Jinca"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  quality={90}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Music Sheets Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-12 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 md:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-black text-left leading-tight mb-3 sm:mb-4">
              Music Sheets
            </h2>
            <Link 
              href="/sheets"
              className="inline-block text-xs uppercase tracking-[0.2em] text-black/50 border-b border-black/20 pb-2 hover:border-black hover:text-black transition-all duration-300"
            >
              See All Sheets →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
            {featuredSheets.map((sheet) => (
              <MusicSheetCard key={sheet.id} sheet={sheet} showDescription={true} />
            ))}
          </div>
        </div>
      </section>

      {/* 1 Song a Day Challenge */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-12 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16 md:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-black text-left leading-tight mb-3 sm:mb-4">
              1 song a day{' '}
              <span className="block sm:inline text-lg sm:text-xl md:text-2xl lg:text-3xl text-black/50 font-light mt-2 sm:mt-0">
                (more or less, actually 1 song every 2 days oops)
              </span>
            </h2>
            <p className="text-base sm:text-lg text-black/50 font-light max-w-2xl mb-6 sm:mb-8">
              A daily commitment to creating and sharing one solo piano song every day.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 md:mb-16">
              <div className="border-t border-black/10 pt-4 sm:pt-6">
                <div className="text-4xl sm:text-5xl md:text-6xl font-serif text-black mb-2">
                  {songs.length}
                </div>
                <div className="text-xs sm:text-sm uppercase tracking-[0.15em] text-black/50">
                  Total Songs
                </div>
              </div>
              <div className="border-t border-black/10 pt-4 sm:pt-6">
                <div className="text-4xl sm:text-5xl md:text-6xl font-serif text-black mb-2">
                  {getCurrentDay()}
                </div>
                <div className="text-xs sm:text-sm uppercase tracking-[0.15em] text-black/50">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
            {songs.slice(0, 6).map((song) => (
              <a 
                key={song.id} 
                href="https://linktr.ee/jincamusic"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="aspect-[3/4] bg-black/3 mb-6 sm:mb-8 transition-all duration-700 group-hover:bg-black/8 group-hover:scale-[1.02] relative overflow-hidden rounded">
                  <Image
                    src={song.image}
                    alt={song.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-serif text-black mb-1 group-hover:opacity-70 transition-opacity">
                    {String(song.id).padStart(2, '0')}
                  </h3>
                  <p className="text-xs sm:text-sm text-black/40 uppercase tracking-wider">
                    {song.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 sm:py-32 md:py-40 lg:py-48 px-4 sm:px-6 lg:px-12 border-t border-black/5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-6 sm:mb-8 md:mb-12 text-left leading-tight">
              About
            </h2>
          </div>
          <div className="space-y-6 sm:space-y-8">
            <p className="text-lg sm:text-xl md:text-2xl text-black/50 leading-relaxed font-light">
            constant flow of musical ideas in my head, i have to get them out. this is where they come out :^) <br className="hidden sm:block" />
            <span className="block sm:inline"> </span>my only goal is to one day compose a full moving orchestra piece and play it live with a live orchestra (like Rachmaninoff's 2nd piano concerto). <br className="hidden sm:block" />
            <span className="block sm:inline"> </span>also, i LOVE writing and software engineering.
            </p>
  
          </div>
          <Link 
            href="/about"
            className="inline-block mt-8 sm:mt-10 md:mt-12 text-xs uppercase tracking-[0.2em] text-black border-b border-black/20 pb-3 hover:border-black transition-all duration-300"
          >
            Read More
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
