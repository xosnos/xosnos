import About from '@/components/About';
import Contact from '@/components/Contact';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import PageTransition from '@/components/PageTransition';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';

export default function Home() {
  return (
    <PageTransition className="min-h-screen">
      <Navigation />
      <main id="main-content" className="pt-16 lg:pt-0">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <About />
        <Contact />
      </main>
      <Footer />
    </PageTransition>
  );
}
