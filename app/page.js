import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MusicSheetCard from './components/MusicSheetCard';
import { musicSheets } from './data/musicSheets';

export default function Home() {
  // Get first 3 sheets for homepage
  const featuredSheets = musicSheets.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-48 pb-48 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-left max-w-4xl">
            <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-serif text-black mb-12 leading-[0.9] tracking-tight">
              Jinca
            </h1>
            <p className="text-2xl md:text-3xl text-black/50 mb-16 leading-relaxed font-light max-w-2xl">
              Piano compositions crafted with passion and artistry.
            </p>
            <Link 
              href="/sheets"
              className="inline-block text-xs uppercase tracking-[0.2em] text-black border-b border-black/20 pb-3 hover:border-black transition-all duration-300"
            >
              View Music Sheets
            </Link>
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

      {/* Featured Compositions */}
      <section className="py-32 px-6 lg:px-12 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <h2 className="text-5xl md:text-6xl font-serif text-black text-left leading-tight">
              Compositions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Link key={item} href="/sheets" className="group block">
                <div className="aspect-[3/4] bg-black/3 mb-8 transition-all duration-700 group-hover:bg-black/8 group-hover:scale-[1.02]"></div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif text-black mb-1 group-hover:opacity-70 transition-opacity">
                    Composition {item}
                  </h3>
                  <p className="text-sm text-black/40 uppercase tracking-wider">
                    Intermediate
                  </p>
                </div>
              </Link>
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
              Jinca is a passionate piano composer dedicated to creating music that resonates 
              with the soul. Each composition is carefully crafted to evoke emotion and inspire 
              musicians of all skill levels.
            </p>
            <p className="text-xl md:text-2xl text-black/50 leading-relaxed font-light">
              With years of experience in composition and performance, Jinca has developed a 
              unique style that blends classical elegance with contemporary expression.
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
