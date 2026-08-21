'use client';

import { ArrowDown, FileDown, Mail } from 'lucide-react';
import { heroContent } from '@/data/hero';
import { openResumeGate } from '@/lib/resume-gate-events';

const primaryClass =
  'inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-accent text-accent-foreground font-montserrat font-extrabold text-sm uppercase tracking-widest shadow-lg shadow-accent/20 hover:brightness-110 transition-[filter] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

const secondaryClass =
  'inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-muted text-foreground font-montserrat font-extrabold text-sm uppercase tracking-widest border border-border hover:border-accent/40 hover:bg-accent/10 transition-[background-color,border-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

export default function HeroActions() {
  return (
    <div className="w-full max-w-lg space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <a href={heroContent.primaryCtaHref} className={primaryClass}>
          <Mail className="w-4 h-4" aria-hidden="true" />
          {heroContent.primaryCtaLabel}
        </a>
        <button type="button" onClick={openResumeGate} className={secondaryClass}>
          <FileDown className="w-4 h-4" aria-hidden="true" />
          {heroContent.secondaryCtaLabel}
        </button>
      </div>
      <a
        href={heroContent.exploreHref}
        className="inline-flex items-center gap-2 text-sm font-montserrat font-bold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
      >
        {heroContent.exploreLabel}
        <ArrowDown
          className="w-4 h-4 group-hover:translate-y-1 transition-transform"
          aria-hidden="true"
        />
      </a>
    </div>
  );
}
