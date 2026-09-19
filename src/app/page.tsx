import About from '@/components/About';
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
      <main id="main-content" className="pt-[var(--nav-height)] lg:pt-0">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <About />
      </main>
      <Footer />
    </div>
  );
}
