import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-24">
          <Link href="/" className="text-3xl font-serif text-black hover:opacity-60 transition-opacity duration-300">
            Jinca
          </Link>
          <div className="flex space-x-12 text-xs tracking-[0.15em] uppercase">
            <Link href="/" className="text-black/50 hover:text-black transition-colors duration-300">
              Home
            </Link>
            <Link href="/sheets" className="text-black/50 hover:text-black transition-colors duration-300">
              Sheets
            </Link>
            <Link href="/about" className="text-black/50 hover:text-black transition-colors duration-300">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
