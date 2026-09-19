'use client';

import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import AIAssistant from '@/components/AIAssistant';
import { useScrollThreshold } from '@/hooks/useScrollThreshold';

const SCROLL_THRESHOLD = 300;

const FloatingActions = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const showScrollTop = useScrollThreshold(SCROLL_THRESHOLD);

  const showScrollFab = showScrollTop && !isChatOpen;

  return (
    <div className="fixed inset-x-4 bottom-6 z-50 flex flex-col items-end gap-3 font-lato pb-[max(0px,env(safe-area-inset-bottom))] lg:inset-x-auto lg:right-6">
      <AnimatePresence>
        {showScrollFab && (
          <motion.a
            key="scroll-to-top"
            href="#page-top"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="lg:hidden flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background/80 text-accent shadow-2xl backdrop-blur-md transition-[transform,opacity] duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" aria-hidden="true" />
          </motion.a>
        )}
      </AnimatePresence>

      <AIAssistant onOpenChange={setIsChatOpen} />
    </div>
  );
};

export default FloatingActions;
