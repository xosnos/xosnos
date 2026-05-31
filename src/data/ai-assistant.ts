export const aiAssistantContent = {
  toggleLabel: 'Open AI assistant',
  closeLabel: 'Close AI assistant',
  title: 'Ask Steven',
  subtitle: 'AI assistant',
  greeting:
    "Hi! I'm Steven's AI assistant. Ask me about his experience, projects, skills, or how to get in touch.",
  placeholder: 'Ask about Steven…',
  poweredBy: 'Powered by Gemini',
  starterPrompts: [
    'What is Steven currently working on?',
    'Tell me about his time at Workday.',
    'What projects has he built?',
    'How can I reach him?',
  ],
  errors: {
    rateLimit: "You're sending messages too quickly. Please pause for a moment and try again.",
    notConfigured:
      "The AI assistant isn't configured right now. Feel free to email Steven at steven@xosnos.com instead!",
    generic: 'Something went wrong reaching the assistant. Please try again in a moment.',
    aborted: '(stopped)',
  },
};
