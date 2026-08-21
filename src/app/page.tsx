import About from '@/components/About';
import Contact from '@/components/Contact';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main id="main-content" className="pt-16 lg:pt-0">
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <About />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
