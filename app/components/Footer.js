import SocialIcons from './SocialIcons';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          <div>
            <h3 className="text-2xl font-serif mb-6 text-black">Jinca</h3>
            <p className="text-sm text-black/40 leading-relaxed font-light mb-6">
              Piano compositions for musicians of all levels.
            </p>
            <SocialIcons />
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] mb-6 text-black/50">Navigation</h4>
            <ul className="space-y-3 text-sm text-black/40 font-light">
              <li><a href="/" className="hover:text-black transition-colors duration-300">Home</a></li>
              <li><a href="/sheets" className="hover:text-black transition-colors duration-300">Music Sheets</a></li>
              <li><a href="/about" className="hover:text-black transition-colors duration-300">About</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] mb-6 text-black/50">Contact</h4>
            <p className="text-sm text-black/40 leading-relaxed font-light">
              For inquiries and custom compositions.
            </p>
          </div>
        </div>
        <div className="border-t border-black/5 pt-8 text-center text-xs text-black/30 font-light">
          <p>&copy; {new Date().getFullYear()} Jinca. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
