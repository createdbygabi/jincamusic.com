import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MusicSheetCard from '../components/MusicSheetCard';
import { musicSheets } from '../data/musicSheets';

export default function Sheets() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-48 pb-48 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-32">
            <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-serif text-black mb-8 leading-[0.9] tracking-tight">
              Music Sheets
            </h1>
            <p className="text-xl md:text-2xl text-black/50 max-w-3xl leading-relaxed font-light mt-12">
              Browse our collection of piano compositions. Each sheet includes detailed 
              notation and is available for instant download.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
            {musicSheets
              .filter((sheet) => sheet.image) // Only show sheets with images
              .map((sheet) => (
                <MusicSheetCard key={sheet.id} sheet={sheet} showDescription={true} />
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
