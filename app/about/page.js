import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-48 pb-48 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-serif text-black mb-20 leading-[0.9] tracking-tight">
            About
          </h1>

          <div className="space-y-8">
            <p className="text-xl md:text-2xl text-black/50 leading-relaxed font-light">
              constant flow of musical ideas in my head, i have to get them out. this is where they come out :^) <br />
              my only goal is to one day compose a full moving orchestra piece and play it live with a live orchestra (like Rachmaninoff's 2nd piano concerto). <br />
              also, i LOVE writing and software engineering.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
