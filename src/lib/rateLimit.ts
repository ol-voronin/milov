/**
 * Простий in-memory rate limiter для API заявок.
 *
 * Для одного інстансу (Vercel serverless — на рівні інстансу) цього достатньо
 * як базового захисту разом із honeypot і Turnstile. Для суворішого ліміту
 * підключіть зовнішнє сховище (Upstash Redis тощо) — див. README.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 10 * 60 * 1000; // 10 хвилин
const MAX_REQUESTS = 5; // максимум заявок з однієї IP за вікно

export function checkRateLimit(key: string): { ok: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  // періодичне прибирання, щоб мапа не росла безмежно
  if (buckets.size > 10_000) {
    for (const [k, b] of buckets) {
      if (b.resetAt < now) buckets.delete(k);
    }
  }

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { ok: false, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true };
}
