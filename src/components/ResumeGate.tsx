'use client';

import { useState } from 'react';
import { FileDown, Mail, User, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ResumeGateProps {
  open: boolean;
  onClose: () => void;
}

export default function ResumeGate({ open, onClose }: ResumeGateProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetForm = () => {
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

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim() || undefined }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error || 'Something went wrong');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full max-w-md mx-4 bg-card/95 backdrop-blur-md rounded-3xl p-6 border border-border/50 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileDown className="w-4 h-4 text-accent" />
                <span className="text-xs font-montserrat font-extrabold text-muted-foreground uppercase tracking-[0.2em]">
                  Download Resume
                </span>
              </div>
              <button
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {success ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-accent" />
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
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    placeholder="Your email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-full bg-background border border-border text-foreground text-sm font-montserrat placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-full bg-background border border-border text-foreground text-sm font-montserrat placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500 font-montserrat font-medium px-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-montserrat font-extrabold text-sm uppercase tracking-widest shadow-lg shadow-accent/20 hover:scale-105 hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
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
