'use client';

import type { Variants } from 'motion/react';
import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import {
  fadeIn,
  fadeInUp,
  scaleIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
  viewportOnce,
} from '@/lib/animations';

const variantMap = {
  fadeInUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
} as const;

type VariantName = keyof typeof variantMap;

interface ScrollRevealProps {
  children: ReactNode;
  variant?: VariantName;
  custom?: Variants;
  className?: string;
  delay?: number;
}

export function ScrollReveal({
  children,
  variant = 'fadeInUp',
  custom,
  className,
  delay,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const variants = custom ?? variantMap[variant];
  const transition = delay && !reduceMotion ? { delay } : undefined;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={className}
    >
      {children}
    </motion.div>
  );
}
