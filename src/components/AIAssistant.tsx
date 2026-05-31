'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { aiAssistantContent } from '@/data/ai-assistant';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  status?: 'streaming' | 'done' | 'aborted' | 'error';
}

interface AIAssistantProps {
  onOpenChange?: (open: boolean) => void;
}

function messageTimestamp(): number {
  return Date.now();
}

const AIAssistant = ({ onOpenChange }: AIAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      role: 'model',
      text: aiAssistantContent.greeting,
      timestamp: messageTimestamp(),
      status: 'done',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking, isOpen]);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (isOpen) {
      // Slight delay so the panel is mounted before we focus.
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Abort any in-flight stream on unmount.
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isThinking) return;

    // Cancel any prior in-flight stream
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setError(null);
    const historySnapshot: ChatMessage[] = [
      ...messages,
      { role: 'user', text: trimmed, timestamp: messageTimestamp(), status: 'done' },
      { role: 'model', text: '', timestamp: messageTimestamp(), status: 'streaming' },
    ];
    setMessages(historySnapshot);
    setInputValue('');
    setIsThinking(true);

    // Build history payload from messages BEFORE the new user turn.
    const historyForApi = messages
      .filter((m) => m.text.length > 0)
      .map((m) => ({ role: m.role, text: m.text }));

    let res: Response;
    try {
      res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: historyForApi, message: trimmed }),
        signal: controller.signal,
      });
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        markLastModelStatus('aborted');
        setIsThinking(false);
        return;
      }
      setError(aiAssistantContent.errors.generic);
      removeEmptyTrailingModel();
      setIsThinking(false);
      return;
    }

    if (!res.ok || !res.body) {
      let errMsg = aiAssistantContent.errors.generic;
      if (res.status === 429) errMsg = aiAssistantContent.errors.rateLimit;
      else if (res.status === 503) errMsg = aiAssistantContent.errors.notConfigured;
      setError(errMsg);
      removeEmptyTrailingModel();
      setIsThinking(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let firstChunk = true;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (firstChunk) {
          setIsThinking(false);
          firstChunk = false;
        }
        appendToLastModel(chunk);
      }
      markLastModelStatus('done');
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        markLastModelStatus('aborted');
      } else {
        markLastModelStatus('error');
        setError(aiAssistantContent.errors.generic);
      }
    } finally {
      setIsThinking(false);
    }
  };

  const appendToLastModel = (chunk: string) => {
    setMessages((prev) => {
      if (prev.length === 0) return prev;
      const next = [...prev];
      const last = next[next.length - 1];
      if (last.role !== 'model') return prev;
      next[next.length - 1] = { ...last, text: last.text + chunk };
      return next;
    });
  };

  const markLastModelStatus = (status: ChatMessage['status']) => {
    setMessages((prev) => {
      if (prev.length === 0) return prev;
      const next = [...prev];
      const last = next[next.length - 1];
      if (last.role !== 'model') return prev;
      next[next.length - 1] = { ...last, status };
      return next;
    });
  };

  const removeEmptyTrailingModel = () => {
    setMessages((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      if (last.role === 'model' && last.text.length === 0) {
        return prev.slice(0, -1);
      }
      return prev;
    });
  };

  const closeAssistant = () => {
    // Abort any in-flight stream so closing the panel doesn't leave hidden work
    // (and token spend) running in the background.
    abortRef.current?.abort();
    setIsThinking(false);
    setIsOpen(false);
  };

  const handleSend = () => sendMessage(inputValue);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showStarterPrompts =
    messages.length === 1 && messages[0].role === 'model' && !isThinking;

  return (
    <motion.div className="flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="ai-panel"
            role="dialog"
            aria-label={aiAssistantContent.title}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-4 w-[92vw] sm:w-[380px] h-[min(560px,80vh)] flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-black/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center text-accent">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <p className="font-montserrat font-bold text-sm text-foreground">
                    {aiAssistantContent.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {aiAssistantContent.subtitle}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeAssistant}
                aria-label={aiAssistantContent.closeLabel}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-background"
              aria-live="polite"
            >
              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                const isLast = idx === messages.length - 1;
                const isStreaming = msg.status === 'streaming' && isLast;
                return (
                  <div
                    key={`${msg.timestamp}-${idx}`}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
                        isUser
                          ? 'bg-accent text-accent-foreground rounded-br-md'
                          : 'bg-card text-card-foreground border border-border rounded-bl-md'
                      }`}
                    >
                      {msg.text}
                      {isStreaming && msg.text.length > 0 && (
                        <span
                          aria-hidden="true"
                          className="inline-block w-[2px] h-4 align-middle ml-0.5 bg-current animate-pulse"
                        />
                      )}
                      {msg.status === 'aborted' && (
                        <span className="block mt-1 text-xs text-muted-foreground italic">
                          {aiAssistantContent.errors.aborted}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-bl-md flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:120ms]" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:240ms]" />
                  </div>
                </div>
              )}

              {showStarterPrompts && (
                <div className="pt-2 space-y-2">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground/80 font-montserrat font-bold">
                    Try asking
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {aiAssistantContent.starterPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => sendMessage(prompt)}
                        className="text-xs px-3 py-1.5 rounded-full border border-border bg-card hover:bg-muted hover:border-accent/40 text-foreground transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <div className="text-xs text-destructive bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2">
                  {error}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-border bg-card/40">
              <div className="flex gap-2 items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={aiAssistantContent.placeholder}
                  maxLength={1000}
                  className="flex-1 bg-background border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-full px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground text-foreground"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isThinking}
                  aria-label="Send message"
                  className="bg-accent text-accent-foreground w-10 h-10 flex items-center justify-center rounded-full transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground/60 text-center font-montserrat">
                {aiAssistantContent.poweredBy}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => (isOpen ? closeAssistant() : setIsOpen(true))}
        aria-label={isOpen ? aiAssistantContent.closeLabel : aiAssistantContent.toggleLabel}
        aria-expanded={isOpen}
        className="bg-accent text-accent-foreground w-14 h-14 flex items-center justify-center rounded-full shadow-xl shadow-accent/30 hover:scale-105 hover:brightness-110 transition-all duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </motion.div>
  );
};

export default AIAssistant;
