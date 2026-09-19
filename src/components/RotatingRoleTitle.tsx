'use client';

import { useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { heroContent } from '@/data/hero';

const TYPE_MS = 55;
const DELETE_MS = 35;
const PAUSE_AFTER_TYPE_MS = 2200;
const REDUCED_MOTION_ROTATION_MS = 3200;

const titleClassName =
  'text-left font-mono text-sm md:text-base text-muted-foreground tracking-normal normal-case pt-0.5 break-words';

type TypingPhase = 'typing' | 'pausing' | 'deleting';

export function RotatingRoleTitle() {
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<TypingPhase>('typing');
  const [announcedRole, setAnnouncedRole] = useState(heroContent.roles[0]);

  const role = heroContent.roles[roleIndex];
  const isComplete = displayText.length === role.length && phase !== 'deleting';

  useEffect(() => {
    if (reduceMotion) return;

    let timeoutId = 0;

    if (phase === 'typing') {
      if (displayText.length < role.length) {
        timeoutId = window.setTimeout(() => {
          setDisplayText(role.slice(0, displayText.length + 1));
        }, TYPE_MS);
      } else {
        setAnnouncedRole(role);
        setPhase('pausing');
      }
    } else if (phase === 'pausing') {
      timeoutId = window.setTimeout(() => setPhase('deleting'), PAUSE_AFTER_TYPE_MS);
    } else if (displayText.length > 0) {
      timeoutId = window.setTimeout(() => {
        setDisplayText((current) => current.slice(0, -1));
      }, DELETE_MS);
    } else {
      setRoleIndex((current) => (current + 1) % heroContent.roles.length);
      setPhase('typing');
    }

    return () => window.clearTimeout(timeoutId);
  }, [displayText, phase, reduceMotion, role]);

  useEffect(() => {
    if (!reduceMotion) return;

    const id = window.setInterval(() => {
      setRoleIndex((current) => {
        const next = (current + 1) % heroContent.roles.length;
        setAnnouncedRole(heroContent.roles[next]);
        return next;
      });
    }, REDUCED_MOTION_ROTATION_MS);

    return () => window.clearInterval(id);
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <p className={titleClassName} aria-live="polite" aria-atomic="true">
        <span className="text-accent/70">&quot;</span>
        {heroContent.roles[roleIndex]}
        <span className="text-accent/70">&quot;</span>
      </p>
    );
  }

  return (
    <p className={titleClassName}>
      <span className="inline-flex max-w-full flex-wrap items-center" aria-hidden="true">
        <span className="text-accent/70">&quot;</span>
        {displayText}
        {isComplete ? <span className="text-accent/70">&quot;</span> : null}
        <span
          className="ml-px inline-block h-[1.05em] w-[0.55em] translate-y-px bg-accent motion-reduce:animate-none animate-pulse"
          aria-hidden="true"
        />
      </span>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {announcedRole}
      </span>
    </p>
  );
}
