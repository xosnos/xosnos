'use client';

import { useEffect, useState } from 'react';

/**
 * Hydration-safe replacement for `useReducedMotion` from motion/react,
 * which reads `matchMedia` synchronously during the first client render
 * and can produce different markup than SSR. State syncs after mount
 * instead, so the first client render always matches the server output.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(query.matches);

    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduceMotion;
}
