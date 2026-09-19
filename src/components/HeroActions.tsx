'use client';

import { ArrowDown, FileDown, Mail } from 'lucide-react';
import { contactContent } from '@/data/contact';
import { heroContent } from '@/data/hero';
import { openResumeGate } from '@/lib/resume-gate-events';

const primaryClass =
  'inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-full bg-accent text-accent-foreground font-montserrat font-extrabold text-sm uppercase tracking-wider sm:tracking-widest whitespace-nowrap shadow-lg shadow-accent/20 hover:brightness-110 hover:scale-105 transition-[background-color,filter,transform,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

const secondaryClass =
  'inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-full bg-muted text-foreground font-montserrat font-extrabold text-sm uppercase tracking-wider sm:tracking-widest whitespace-nowrap border border-border hover:border-accent/40 hover:bg-accent/10 hover:scale-105 transition-[background-color,border-color,transform,filter] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

export default function HeroActions() {
  return (
    <div className="w-full max-w-2xl space-y-4 md:space-y-8">
      <div className="flex w-full flex-col items-center gap-4">
        <div className="mx-auto flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4 [@media(max-height:600px)]:mx-0 [@media(max-height:600px)]:w-[calc(100%-5.75rem)] [@media(max-height:600px)]:max-w-none [@media(max-height:600px)]:self-start">
          <a href={`mailto:${contactContent.email}`} className={primaryClass}>
            <Mail className="w-4 h-4" aria-hidden="true" />
            {heroContent.primaryCtaLabel}
          </a>
          <button type="button" onClick={openResumeGate} className={secondaryClass}>
            <FileDown className="w-4 h-4" aria-hidden="true" />
            {heroContent.secondaryCtaLabel}
          </button>
        </div>
        <p className="text-base text-muted-foreground italic max-w-xl leading-relaxed text-pretty [@media(max-height:600px)]:hidden">
          {contactContent.invitation}
        </p>
      </div>
      <a
        href={heroContent.exploreHref}
        className="inline-flex items-center gap-2 text-sm font-montserrat font-bold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md [@media(max-height:600px)]:hidden"
      >
        {heroContent.exploreLabel}
        <ArrowDown
          className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300"
          aria-hidden="true"
        />
      </a>
    </div>
  );
}
