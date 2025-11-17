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

          <div className="space-y-12 text-xl md:text-2xl text-black/50 leading-relaxed font-light">
            <p>
              Welcome to the world of Jionca, where piano compositions come to life 
              through passion, dedication, and artistic vision.
            </p>
            
            <p>
              Jionca is a composer who believes that music has the power to transcend 
              boundaries and touch the deepest parts of our souls. Each piece is crafted 
              with meticulous attention to detail, ensuring that both the performer and 
              the listener experience something truly special.
            </p>

            <h2 className="text-4xl md:text-5xl font-serif text-black mt-20 mb-8 leading-tight">
              The Journey
            </h2>
            <p>
              With years of experience in composition and performance, Jionca has 
              developed a unique style that blends classical elegance with contemporary 
              expression. The compositions range from gentle, introspective pieces to 
              powerful, dramatic works that showcase the full range of the piano.
            </p>

            <h2 className="text-4xl md:text-5xl font-serif text-black mt-20 mb-8 leading-tight">
              For Every Musician
            </h2>
            <p>
              Whether you're just beginning your piano journey or you're an experienced 
              performer looking for new repertoire, Jionca's compositions offer something 
              for everyone. Each piece is carefully graded and includes detailed notation 
              to help you bring the music to life.
            </p>

            <h2 className="text-4xl md:text-5xl font-serif text-black mt-20 mb-8 leading-tight">
              Connect
            </h2>
            <p>
              We'd love to hear from you. Whether you have questions about a composition, 
              need help with a piece, or want to commission a custom work, feel free to 
              reach out. Your musical journey is important to us.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
