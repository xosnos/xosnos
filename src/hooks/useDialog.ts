'use client';

import { type RefObject, useEffect, useRef } from 'react';

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

type DialogEntry = {
  id: number;
  onClose: () => void;
  containerRef: RefObject<HTMLElement | null>;
};

let nextDialogId = 0;
const dialogStack: DialogEntry[] = [];
let keyListenerAttached = false;

function onDialogKeyDown(event: KeyboardEvent) {
  const top = dialogStack.at(-1);
  if (!top) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    top.onClose();
    return;
  }

  if (event.key !== 'Tab') return;

  const container = top.containerRef.current;
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
}

function pushDialog(entry: Omit<DialogEntry, 'id'>): number {
  const id = ++nextDialogId;
  dialogStack.push({ ...entry, id });
  if (!keyListenerAttached) {
    document.addEventListener('keydown', onDialogKeyDown);
    keyListenerAttached = true;
  }
  return id;
}

function popDialog(id: number) {
  const index = dialogStack.findIndex((entry) => entry.id === id);
  if (index !== -1) dialogStack.splice(index, 1);
  if (dialogStack.length === 0 && keyListenerAttached) {
    document.removeEventListener('keydown', onDialogKeyDown);
    keyListenerAttached = false;
  }
}

function focusDialog(container: HTMLElement | null) {
  if (!container) return;
  if (container.contains(document.activeElement)) return;
  container.focus({ preventScroll: true });
}

/**
 * Dialog a11y: topmost Escape to close, body scroll lock, initial focus, and Tab trap.
 * Restores focus to the previously focused element on close.
 */
export function useDialog(
  active: boolean,
  onClose: () => void,
  containerRef: RefObject<HTMLElement | null>,
) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!active) return;

    const id = pushDialog({
      onClose: () => onCloseRef.current(),
      containerRef,
    });
    lockBodyScroll();
    const previousFocus = document.activeElement as HTMLElement | null;

    focusDialog(containerRef.current);
    const raf = requestAnimationFrame(() => focusDialog(containerRef.current));

    return () => {
      cancelAnimationFrame(raf);
      popDialog(id);
      unlockBodyScroll();
      previousFocus?.focus({ preventScroll: true });
    };
  }, [active, containerRef]);
}
