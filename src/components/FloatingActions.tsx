'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import AIAssistant from '@/components/AIAssistant';
import { useScrollThreshold } from '@/hooks/useScrollThreshold';

const SCROLL_THRESHOLD = 300;

const FloatingActions = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const showScrollTop = useScrollThreshold(SCROLL_THRESHOLD);

  const showScrollFab = showScrollTop && !isChatOpen;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-lato pb-[max(0px,env(safe-area-inset-bottom))]">
      <AnimatePresence>
        {showScrollFab && (
          <motion.a
            key="scroll-to-top"
            href="#page-top"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="lg:hidden w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center shadow-2xl text-accent hover:scale-110 active:scale-95 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.a>
        )}
      </AnimatePresence>

      <AIAssistant onOpenChange={setIsChatOpen} />
    </div>
  );
};

export default FloatingActions;
