'use client';

import { FileDown, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ResumeGate from '@/components/ResumeGate';
import { ThemeToggle } from '@/components/theme-toggle';
import { navItems } from '@/data/navigation';
import { RESUME_GATE_EVENT } from '@/lib/resume-gate-events';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onOpenResume = () => setIsResumeOpen(true);
    window.addEventListener(RESUME_GATE_EVENT, onOpenResume);
    return () => window.removeEventListener(RESUME_GATE_EVENT, onOpenResume);
  }, []);

  // Derive display values when not on home to avoid setState in effect
  const displayScrolled = isHome ? isScrolled : true;
  const displayActiveSection = isHome ? activeSection : '';

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setIsScrolled(scrolled);
      }

      const sections = navItems.map((item) => item.section);
      let currentSection = '';
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = section;
            break;
          }
        }
      }

      if (window.scrollY < 200) {
        currentSection = '';
      }

      if (activeSection !== currentSection) {
        setActiveSection(currentSection);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome, isScrolled, activeSection, pathname]);

  const navClasses = `fixed w-full top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ${
    displayScrolled
      ? 'bg-background/80 backdrop-blur-md shadow-sm border-b border-border'
      : 'bg-transparent'
  }`;

  return (
    <>
      <nav className={navClasses} aria-label="Primary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="text-foreground font-montserrat font-bold text-xl uppercase tracking-wider transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
              onClick={() => isMenuOpen && setIsMenuOpen(false)}
            >
              <span translate="no">@xosnos</span>
            </Link>

            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex space-x-1">
                {navItems.map((item) => {
                  const href = isHome ? `#${item.section}` : `/#${item.section}`;
                  const isActive = displayActiveSection === item.section;
                  return (
                    <Link
                      key={item.section}
                      href={href}
                      className={`font-montserrat font-bold uppercase text-sm tracking-wider py-2 px-4 rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        isActive
                          ? 'text-accent'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setIsResumeOpen(true)}
                  className="inline-flex items-center gap-1.5 font-montserrat font-bold uppercase text-sm tracking-wider py-2 px-4 rounded-md transition-colors duration-200 text-accent hover:text-accent/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <FileDown className="w-4 h-4" aria-hidden="true" />
                  Resume
                </button>
              </div>

              <ThemeToggle />

              <button
                type="button"
                className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle navigation"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav"
              >
                {isMenuOpen ? (
                  <X size={24} aria-hidden="true" />
                ) : (
                  <Menu size={24} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                id="mobile-nav"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border overflow-hidden"
              >
                <div className="flex flex-col p-4 space-y-2">
                  {navItems.map((item, index) => {
                    const href = isHome ? `#${item.section}` : `/#${item.section}`;
                    const isActive = displayActiveSection === item.section;
                    return (
                      <motion.div
                        key={item.section}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * index, duration: 0.2 }}
                      >
                        <Link
                          href={href}
                          className={`block font-montserrat font-bold uppercase text-sm tracking-wider py-3 px-4 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                            isActive
                              ? 'text-accent bg-accent/10'
                              : 'text-foreground hover:bg-muted'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * navItems.length, duration: 0.2 }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setIsResumeOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 font-montserrat font-bold uppercase text-sm tracking-wider py-3 px-4 rounded-md transition-colors text-accent hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <FileDown className="w-4 h-4" aria-hidden="true" />
                      Resume
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
      <ResumeGate open={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
};

export default Navigation;
