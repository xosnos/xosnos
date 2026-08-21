'use client';

import { type RefObject, useEffect } from 'react';
import { useEscapeKey } from '@/hooks/useEscapeKey';

let scrollLockCount = 0;
let previousOverflow = '';
let previousPaddingRight = '';

function lockBodyScroll() {
  if (typeof document === 'undefined') return;

  if (scrollLockCount === 0) {
    previousOverflow = document.body.style.overflow;
    previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  scrollLockCount += 1;
}

function unlockBodyScroll() {
  if (typeof document === 'undefined') return;

  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    document.body.style.overflow = previousOverflow;
    document.body.style.paddingRight = previousPaddingRight;
  }
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.tabIndex !== -1 && !el.hasAttribute('disabled'),
  );
}

/**
 * Dialog a11y: Escape to close, body scroll lock, and Tab focus trap.
 * Restores focus to the previously focused element on close.
 */
export function useDialog(
  active: boolean,
  onClose: () => void,
  containerRef: RefObject<HTMLElement | null>,
) {
  useEscapeKey(active, onClose);

  useEffect(() => {
    if (!active) return;

    lockBodyScroll();
    const previousFocus = document.activeElement as HTMLElement | null;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const container = containerRef.current;
      if (!container) return;

      const focusable = getFocusable(container);
      if (focusable.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeEl = document.activeElement;
      const focusInside = activeEl instanceof Node && container.contains(activeEl);

      if (event.shiftKey && (activeEl === first || !focusInside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (activeEl === last || !focusInside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      unlockBodyScroll();
      previousFocus?.focus();
    };
  }, [active, containerRef]);
}
