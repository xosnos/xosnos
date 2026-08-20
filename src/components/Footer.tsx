import { ArrowUp, Github, Globe, Linkedin, MapPin } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { footerContent } from '@/data/footer';

const XIcon = () => (
  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const iconMap = {
  github: <Github className="w-5 h-5" aria-hidden="true" />,
  linkedin: <Linkedin className="w-5 h-5" aria-hidden="true" />,
  x: <XIcon />,
} as const;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-20 px-6 md:px-12 relative overflow-hidden border-t border-border/50">
      <ScrollReveal variant="fadeIn">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
            <div className="space-y-6 lg:col-span-1">
              <h4 className="text-3xl font-montserrat font-extrabold tracking-tighter text-foreground text-balance">
                <span translate="no">{footerContent.brand}</span>
                <span className="text-accent">.</span>
              </h4>
              <div className="space-y-3 text-muted-foreground font-light text-sm leading-relaxed">
                {footerContent.locations.map((loc) => (
                  <div key={loc.label} className="flex items-center gap-2">
                    {loc.type === 'primary' ? (
                      <MapPin className="w-4 h-4 text-accent" aria-hidden="true" />
                    ) : (
                      <Globe className="w-4 h-4 text-accent" aria-hidden="true" />
                    )}
                    <span>{loc.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 lg:col-span-1">
              <h5 className="text-xs font-montserrat font-bold uppercase tracking-widest text-foreground opacity-60">
                Social Connectivity
              </h5>
              <div className="flex flex-wrap gap-4">
                {footerContent.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-muted border border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent hover:scale-110 hover:-translate-y-1 transition-[transform,background-color,color,border-color] duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={link.label}
                  >
                    {iconMap[link.icon]}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6 lg:col-span-1">
              <h5 className="text-xs font-montserrat font-bold uppercase tracking-widest text-foreground opacity-60">
                Inspiration &amp; Tools
              </h5>
              <ul className="space-y-3 text-sm text-muted-foreground font-light">
                {footerContent.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center gap-2 hover:text-foreground transition-colors cursor-default"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent" aria-hidden="true" />
                    <span translate="no">{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 lg:col-span-1">
              <h5 className="text-xs font-montserrat font-bold uppercase tracking-widest text-foreground opacity-60">
                Availability
              </h5>
              <div className="p-4 rounded-2xl bg-accent/5 border border-accent/10 space-y-2">
                <p className="text-xs font-montserrat font-bold uppercase text-accent tracking-widest animate-pulse motion-reduce:animate-none">
                  {footerContent.availability.status}
                </p>
                <p className="text-sm text-muted-foreground font-light italic">
                  {footerContent.availability.message}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-montserrat font-bold uppercase tracking-widest text-muted-foreground/50">
              Copyright &copy; {currentYear}{' '}
              <span className="text-foreground/60" translate="no">
                Steven Nguyen (xosnos)
              </span>
              . All rights reserved.
            </p>

            <a
              href="#page-top"
              className="group inline-flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              Back to top
              <ArrowUp
                className="w-4 h-4 group-hover:-translate-y-1 transition-transform"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;
