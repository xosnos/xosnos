import type { Metadata } from 'next';
import About from '@/components/About';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import { footerContent } from '@/data/footer';
import { heroContent } from '@/data/hero';
import { SITE_URL } from '@/lib/metadata';

const homepageUrl = SITE_URL;
const socialImage = {
  url: '/assets/og/home.jpg',
  width: 1200,
  height: 630,
  alt: 'Steven Nguyen — Software Engineer. Infrastructure to interface. xosnos.com',
};

export const metadata: Metadata = {
  alternates: {
    canonical: homepageUrl,
    types: {
      'text/plain': [
        { url: '/llms.txt', title: 'llms.txt index' },
        { url: '/llms-full.txt', title: 'llms-full.txt' },
      ],
    },
  },
  openGraph: {
    type: 'website',
    siteName: heroContent.name,
    url: homepageUrl,
    title: 'Steven Nguyen | Portfolio',
    description:
      'Portfolio of Steven Nguyen, Software Engineer and co-founder of Terraces. Previously at Workday. Based in the San Francisco Bay Area.',
    images: [socialImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steven Nguyen | Portfolio',
    description: 'Software Engineer and co-founder of Terraces. Previously at Workday.',
    images: [socialImage],
  },
};

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${homepageUrl}/#person`,
  name: heroContent.name,
  alternateName: footerContent.brand,
  url: homepageUrl,
  image: `${homepageUrl}${heroContent.profileImage}`,
  jobTitle: heroContent.roles[0],
  description: heroContent.tagline.replace(/\*\*/g, ''),
  sameAs: footerContent.socialLinks.map((link) => link.href),
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD escapes HTML delimiters before embedding.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, '\\u003c'),
        }}
      />
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
