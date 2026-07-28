import { NextRequest, NextResponse } from 'next/server';
import { leadSchema, topicLabel } from '@/lib/leadSchema';
import { checkRateLimit } from '@/lib/rateLimit';
import { notifyTelegram } from '@/lib/telegram';

/**
 * API заявок на зворотний дзвінок.
 *
 * Privacy by design:
 * - серверна валідація (Zod);
 * - rate limiting по IP;
 * - honeypot;
 * - опційна перевірка Cloudflare Turnstile;
 * - журналювання помилок БЕЗ текстів звернень і персональних даних;
 * - доставка лише у захищені канали (webhook / email-сервіс).
 */

export async function POST(req: NextRequest) {
  try {
    // ---- Rate limiting ----
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown';
    const limit = checkRateLimit(ip);
    if (!limit.ok) {
      return NextResponse.json(
        { error: 'Забагато запитів. Спробуйте пізніше або зателефонуйте нам.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec ?? 600) } },
      );
    }

    // ---- Парсинг та валідація ----
    const body: unknown = await req.json().catch(() => null);
    if (body === null) {
      return NextResponse.json({ error: 'Некоректний запит' }, { status: 400 });
    }

    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      // Логуються лише назви полів із помилками — без значень
      const fields = Object.keys(parsed.error.flatten().fieldErrors);
      console.warn('[lead] validation failed', { fields });
      return NextResponse.json(
        { error: 'Перевірте правильність заповнення форми' },
        { status: 422 },
      );
    }

    const lead = parsed.data;

    // ---- Honeypot: боти заповнюють приховане поле ----
    if (lead.website && lead.website.length > 0) {
      // Відповідаємо успіхом, щоб не підказувати ботам
      return NextResponse.json({ ok: true });
    }

    // ---- Cloudflare Turnstile (якщо налаштовано) ----
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      const verified = await verifyTurnstile(turnstileSecret, lead.turnstileToken, ip);
      if (!verified) {
        return NextResponse.json(
          { error: 'Не вдалося підтвердити, що ви не робот. Оновіть сторінку та спробуйте ще раз.' },
          { status: 403 },
        );
      }
    }

    // ---- Формування безпечного payload ----
    const payload = {
      name: lead.name,
      phone: lead.phone,
      topic: topicLabel(lead.topic),
      contactMethod: lead.contactMethod ?? 'phone',
      preferredTime: lead.preferredTime ?? '',
      message: lead.message ?? '',
      sourcePage: lead.sourcePage ?? '',
      utm: lead.utm ?? {},
      receivedAt: new Date().toISOString(),
      retentionDays: Number(process.env.LEAD_RETENTION_DAYS ?? 90),
    };

    // ---- Сповіщення в Telegram ----
    // Надсилаємо першим: власник має дізнатися про лід одразу.
    // Помилка Telegram не ламає прийом заявки.
    const telegramSent = await notifyTelegram({
      name: payload.name,
      phone: payload.phone,
      topic: payload.topic,
      contactMethod: payload.contactMethod,
      preferredTime: payload.preferredTime,
      message: payload.message,
      sourcePage: payload.sourcePage,
      utm: payload.utm,
      receivedAt: payload.receivedAt,
    });

    // ---- Доставка ----
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;
    const leadsEmail = process.env.LEADS_EMAIL;

    if (webhookUrl) {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        // Без тексту звернення в логах
        console.error('[lead] webhook delivery failed', { status: res.status });
        // Якщо Telegram уже отримав заявку — вона не втрачена,
        // тому не показуємо людині помилку.
        if (!telegramSent) {
          return NextResponse.json(
            { error: 'Тимчасова помилка. Зателефонуйте нам напряму.' },
            { status: 502 },
          );
        }
      }
    } else if (leadsEmail) {
      /**
       * TODO(інтеграція): підключіть поштовий сервіс (Resend, Postmark, SES…)
       * і надішліть payload на LEADS_EMAIL. Навмисно не реалізовано конкретним
       * провайдером, щоб не прив'язувати проєкт до сервісу.
       * У режимі розробки заявка фіксується без персональних даних:
       */
      console.info('[lead] received (delivery: email pending integration)', {
        topic: payload.topic,
        sourcePage: payload.sourcePage,
      });
    } else if (!telegramSent) {
      console.info('[lead] received (no delivery channel configured)', {
        topic: payload.topic,
        sourcePage: payload.sourcePage,
      });
    }

    // notified — щоб можна було швидко перевірити доставку в Telegram
    // з DevTools → Network, не заглядаючи в логи. Персональних даних немає.
    return NextResponse.json({ ok: true, notified: telegramSent });
  } catch (e) {
    // Журналюємо тип помилки без вмісту запиту
    console.error('[lead] unexpected error', {
      type: e instanceof Error ? e.name : 'unknown',
    });
    return NextResponse.json(
      { error: 'Тимчасова помилка. Спробуйте пізніше або зателефонуйте нам.' },
      { status: 500 },
    );
  }
}

async function verifyTurnstile(
  secret: string,
  token: string | undefined,
  ip: string,
): Promise<boolean> {
  if (!token) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
