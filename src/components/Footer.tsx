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
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center gap-10">
        <nav aria-label="Social" className="flex flex-wrap justify-center gap-4">
          {footerContent.socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-muted border border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={link.label}
            >
              {iconMap[link.icon]}
            </a>
          ))}
        </nav>

        <div className="space-y-3 text-center">
          <h5 className="text-xs font-montserrat font-bold uppercase tracking-widest text-foreground opacity-60">
            {footerContent.builtWithLabel}
          </h5>
          <p className="text-sm text-muted-foreground">
            {footerContent.techStack.map((tech, index) => (
              <span key={tech}>
                {index > 0 ? (
                  <span className="mx-2 text-border" aria-hidden="true">
                    ·
                  </span>
                ) : null}
                <span translate="no">{tech}</span>
              </span>
            ))}
          </p>
        </div>

        <div className="w-full pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-center text-xs font-montserrat font-bold uppercase tracking-widest text-muted-foreground/50 md:text-left">
            Copyright &copy; {currentYear}{' '}
            <span className="text-foreground/60" translate="no">
              Steven Nguyen ({footerContent.brand})
            </span>
            . All rights reserved.
          </p>

          <a
            href="#page-top"
            className="group hidden items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md lg:inline-flex"
          >
            Back to top
            <ArrowUp
              className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
