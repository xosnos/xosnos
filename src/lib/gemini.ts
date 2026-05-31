import 'server-only';
import { GoogleGenAI } from '@google/genai';
import { buildSystemInstruction } from './ai-context';

// Cheapest preview model as of 2026-04. If/when this is renamed or
// deprecated, fall back to 'gemini-2.5-flash' (stable).
export const MODEL_ID = 'gemini-3.1-flash-lite';

export interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

let cachedClient: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI | null => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!cachedClient) {
    cachedClient = new GoogleGenAI({ apiKey });
  }
  return cachedClient;
};

export const isAIConfigured = (): boolean => Boolean(process.env.GEMINI_API_KEY);

/**
 * Streams a chat response from Gemini given prior history and a new user message.
 * Yields incremental text chunks. Throws if the SDK call fails.
 */
export async function* streamChat(
  history: ChatTurn[],
  message: string,
): AsyncGenerator<string, void, unknown> {
  const client = getClient();
  if (!client) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const chat = client.chats.create({
    model: MODEL_ID,
    config: {
      systemInstruction: buildSystemInstruction(),
    },
    history: history.map((h) => ({
      role: h.role,
      parts: [{ text: h.text }],
    })),
  });

  const stream = await chat.sendMessageStream({ message });
  for await (const chunk of stream) {
    const text = chunk.text;
    if (text) yield text;
  }
}
