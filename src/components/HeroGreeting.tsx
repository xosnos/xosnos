'use client';

import { Hand } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { HandIcon, type HandIconHandle } from '@/components/icons/hand';
import { heroContent } from '@/data/hero';

const WAVE_INTERVAL_MS = 5000;

export function HeroGreeting() {
  const reduceMotion = useReducedMotion();
  const handRef = useRef<HandIconHandle>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const wave = () => handRef.current?.startAnimation();
    wave();
    const id = window.setInterval(wave, WAVE_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <p className="flex items-center justify-center gap-1.5 text-sm font-montserrat font-medium text-muted-foreground md:justify-start md:text-base">
      {reduceMotion ? (
        <Hand className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
      ) : (
        <HandIcon
          ref={handRef}
          size={16}
          className="shrink-0 text-accent"
          aria-hidden="true"
        />
      )}
      {heroContent.greeting}
    </p>
  );
}
