'use client';

import { FileDown, Loader2, Mail, User, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useDialog } from '@/hooks/useDialog';

interface ResumeGateProps {
  open: boolean;
  onClose: () => void;
}

const inputFocusClass =
  'w-full min-h-11 pl-10 pr-4 py-3 rounded-full bg-background border border-border text-foreground text-base sm:text-sm font-montserrat placeholder:text-muted-foreground/50 outline-none transition-[border-color,box-shadow] duration-200 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20';

export default function ResumeGate({ open, onClose }: ResumeGateProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const emailRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);

  const resetForm = () => {
    // Abandon an in-flight submission so its result cannot repopulate the form
    // after it has been cleared. abort() is idempotent, so calling this from
    // the render-phase guard below stays safe under StrictMode double renders.
    requestRef.current?.abort();
    requestRef.current = null;
    setEmail('');
    setName('');
    setLoading(false);
    setError(null);
    setSuccess(false);
  };

  // Reset state whenever the dialog transitions to closed, including external
  // closes driven by the parent flipping `open` (e.g. while a submit is still
  // in flight). Done during render via a previous-value guard rather than an
  // effect to avoid a cascading re-render. See https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (!open) resetForm();
  }

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose]);

  useDialog(open, handleClose, dialogRef);

  useEffect(() => {
    if (!open || success) return;
    const isCoarsePointer =
      typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    if (isCoarsePointer) return;

    const t = setTimeout(() => emailRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open, success]);

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  useEffect(() => () => requestRef.current?.abort(), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim() || undefined }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error || 'Something went wrong. Please try again.');
      }

      if (controller.signal.aborted) return;
      setSuccess(true);
    } catch (err) {
      if (controller.signal.aborted) return;
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      );
    } finally {
      if (requestRef.current === controller) requestRef.current = null;
      if (!controller.signal.aborted) setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="presentation"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          className="safe-area-overlay fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm overscroll-contain"
          onClick={handleClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
            className="max-h-full w-full max-w-md space-y-4 overflow-y-auto overscroll-contain rounded-3xl border border-border/50 bg-card/95 p-5 shadow-2xl backdrop-blur-md sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileDown className="w-4 h-4 text-accent" aria-hidden="true" />
                <span
                  id={titleId}
                  className="text-xs font-montserrat font-extrabold uppercase tracking-widest text-muted-foreground sm:tracking-[0.2em]"
                >
                  Download Resume
                </span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {success ? (
              <div
                className="flex flex-col items-center gap-3 py-6 text-center"
                aria-live="polite"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-montserrat font-bold text-sm text-foreground">
                    Check your email!
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    A download link has been sent to{' '}
                    <span className="text-foreground">{email}</span>. The link expires in
                    24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <label htmlFor="resume-email" className="sr-only">
                    Email address
                  </label>
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <input
                    ref={emailRef}
                    id="resume-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    spellCheck={false}
                    required
                    placeholder="you@example.com…"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputFocusClass}
                  />
                </div>

                <div className="relative">
                  <label htmlFor="resume-name" className="sr-only">
                    Name (optional)
                  </label>
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <input
                    id="resume-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Doe…"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputFocusClass}
                  />
                </div>

                {error && (
                  <p
                    ref={errorRef}
                    tabIndex={-1}
                    role="alert"
                    className="text-sm text-red-500 font-montserrat font-medium px-2 outline-none"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-montserrat font-extrabold uppercase tracking-widest text-accent-foreground shadow-lg shadow-accent/20 transition-[transform,filter,opacity] duration-300 hover:scale-105 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      <span>Send Download Link</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-muted-foreground/50 text-center font-montserrat">
                  A download link will be sent to your email.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
