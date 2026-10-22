import { ArrowUp } from 'lucide-react';
import BrandIcon from '@/components/BrandIcon';
import { brandIcons } from '@/components/brandIcons';
import { footerContent } from '@/data/footer';

const iconMap = {
  github: <BrandIcon icon={brandIcons.github} title="" className="w-5 h-5" />,
  linkedin: <BrandIcon icon={brandIcons.linkedin} title="" className="w-5 h-5" />,
  x: <BrandIcon icon={brandIcons.x} title="" className="w-5 h-5" />,
} as const;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border/50 bg-background px-6 pb-[var(--fab-offset)] pt-16 md:px-12 lg:pb-16">
      <div className="w-full max-w-7xl mx-auto relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-border/40">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2">
              <span
                className="text-xl font-montserrat font-extrabold tracking-tight text-foreground"
                translate="no"
              >
                Steven Nguyen
              </span>
              <span
                className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-accent/10 border border-accent/20 text-accent"
                translate="no"
              >
                @{footerContent.brand}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
              Software engineer and builder passionate about distributed systems,
              developer tooling, and AI-native products.
            </p>
          </div>

          <div className="space-y-4">
            <h5 className="text-xs font-montserrat font-bold uppercase tracking-widest text-foreground">
              {footerContent.builtWithLabel}
            </h5>
            <div className="flex flex-wrap gap-2">
              {footerContent.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-card border border-border/60 text-xs font-montserrat font-medium text-foreground/90 shadow-sm"
                  translate="no"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 md:text-right flex flex-col md:items-end justify-between">
            <div>
              <h5 className="text-xs font-montserrat font-bold uppercase tracking-widest text-foreground mb-3">
                Connect
              </h5>
              <nav
                aria-label="Social links"
                className="flex flex-wrap md:justify-end gap-3"
              >
                {footerContent.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-card border border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent hover:scale-105 transition-all duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={link.label}
                  >
                    {iconMap[link.icon]}
                  </a>
                ))}
              </nav>
            </div>

            <a
              href="#page-top"
              className="group inline-flex items-center gap-2 text-xs font-montserrat font-semibold tracking-wider text-muted-foreground hover:text-accent transition-colors pt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            >
              Back to top
              <ArrowUp
                className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300 text-accent"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-montserrat text-muted-foreground">
          <p>&copy; {currentYear} Steven Nguyen (@xosnos). All rights reserved.</p>
          <p className="text-foreground/80 font-medium">
            Designed &amp; built in the San Francisco Bay Area
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
