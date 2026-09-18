'use client';

import { Rocket } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { heroContent } from '@/data/hero';

const ROTATION_INTERVAL_MS = 3000;

export function RotatingRoleTitle() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroContent.roles.length);
    }, ROTATION_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const role = heroContent.roles[index];

  if (reduceMotion) {
    return (
      <span className="inline-flex items-center gap-2">
        {role}
        <Rocket className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
      </span>
    );
  }

  return (
    <motion.span
      layout
      transition={{ layout: { duration: 0.3, ease: 'easeOut' } }}
      className="inline-flex items-center gap-2 overflow-hidden"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={role}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="whitespace-nowrap"
        >
          {role}
        </motion.span>
      </AnimatePresence>
      <Rocket className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
    </motion.span>
  );
}
