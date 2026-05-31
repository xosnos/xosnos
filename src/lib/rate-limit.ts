// Simple in-memory rate limiter
// Note: This works per-instance (serverless function) and is not shared across instances.
// For distributed rate limiting, consider using Redis/Upstash.

interface Options {
  uniqueTokenPerInterval?: number;
  interval?: number;
}

export default function rateLimit(options?: Options) {
  const tokenCache = new Map<string, number[]>();
  const config = {
    uniqueTokenPerInterval: options?.uniqueTokenPerInterval || 500,
    interval: options?.interval || 60000,
  };

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const now = Date.now();
        const windowStart = now - config.interval;

        const requestTimestamps = tokenCache.get(token) || [];
        const requestsInWindow = requestTimestamps.filter((timestamp) => timestamp > windowStart);
        
        if (requestsInWindow.length >= limit) {
          return reject(); // Rate limit exceeded
        }

        requestsInWindow.push(now);
        tokenCache.set(token, requestsInWindow);
        
        // Cleanup old entries if cache grows too large
        if (tokenCache.size > config.uniqueTokenPerInterval) {
             const firstKey = tokenCache.keys().next().value;
             if (firstKey) tokenCache.delete(firstKey);
        }
        
        resolve();
      }),
  };
}
