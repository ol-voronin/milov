/**
 * Сповіщення про нові заявки в Telegram.
 *
 * Налаштування (див. docs/TELEGRAM_BOT.md):
 *   TELEGRAM_BOT_TOKEN — токен від @BotFather
 *   TELEGRAM_CHAT_ID   — ваш chat id або id групи/каналу
 *
 * Обидві змінні — серверні (без NEXT_PUBLIC_), токен ніколи не потрапляє
 * на клієнт. Якщо змінні не задані, сповіщення просто не надсилається,
 * і форма продовжує працювати як звичайно.
 */

export type LeadNotification = {
  name: string;
  phone: string;
  topic: string;
  contactMethod: string;
  preferredTime: string;
  message: string;
  sourcePage: string;
  utm: { source?: string; medium?: string; campaign?: string };
  receivedAt: string;
};

/** Екранування для Telegram HTML parse_mode */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatMessage(lead: LeadNotification): string {
  const time = new Date(lead.receivedAt).toLocaleString('uk-UA', {
    timeZone: 'Europe/Kyiv',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const lines = [
    '🔔 <b>Нова заявка з сайту</b>',
    '',
    `👤 <b>Ім’я:</b> ${esc(lead.name)}`,
    `📞 <b>Телефон:</b> ${esc(lead.phone)}`,
    `📌 <b>Тема:</b> ${esc(lead.topic)}`,
  ];

  if (lead.contactMethod && lead.contactMethod !== 'phone') {
    lines.push(`💬 <b>Спосіб зв’язку:</b> ${esc(lead.contactMethod)}`);
  }
  if (lead.preferredTime) {
    lines.push(`🕒 <b>Зручний час:</b> ${esc(lead.preferredTime)}`);
  }
  if (lead.message) {
    lines.push('', `📝 <b>Опис ситуації:</b>`, esc(lead.message));
  }

  lines.push('', `🌐 <b>Сторінка:</b> ${esc(lead.sourcePage || '/')}`);

  const utmParts = [
    lead.utm.source && `source=${lead.utm.source}`,
    lead.utm.medium && `medium=${lead.utm.medium}`,
    lead.utm.campaign && `campaign=${lead.utm.campaign}`,
  ].filter(Boolean);
  if (utmParts.length) {
    lines.push(`📊 <b>UTM:</b> ${esc(utmParts.join(', '))}`);
  }

  lines.push(`⏰ <b>Отримано:</b> ${esc(time)} (Київ)`);

  return lines.join('\n');
}

/**
 * Надсилає сповіщення в Telegram.
 * Ніколи не кидає виняток — падіння Telegram не має ламати форму.
 * Повертає true, якщо повідомлення доставлено.
 */
export async function notifyTelegram(lead: LeadNotification): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Явний лог: у Vercel Logs одразу видно, чому сповіщення не пішло
  if (!token || !chatId) {
    console.warn('[telegram] disabled — не задані змінні', {
      hasToken: Boolean(token),
      hasChatId: Boolean(chatId),
    });
    return false;
  }

  try {
    // TELEGRAM_API_BASE — лише для локальних тестів; у проді не задається
    const apiBase = process.env.TELEGRAM_API_BASE ?? 'https://api.telegram.org';
    const res = await fetch(`${apiBase}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatMessage(lead),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        // Кнопка «Подзвонити» прямо зі сповіщення
        reply_markup: {
          inline_keyboard: [
            [{ text: '📞 Подзвонити', url: `tel:${lead.phone.replace(/\s/g, '')}` }],
          ],
        },
      }),
      // Не блокуємо відповідь користувачу надовго
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      // Логуємо код і пояснення від Telegram (без вмісту заявки),
      // щоб причина була видна прямо у Vercel Logs
      let description = '';
      try {
        const body = (await res.json()) as { description?: string };
        description = body.description ?? '';
      } catch {
        /* тіло не JSON — байдуже */
      }
      console.error('[telegram] send failed', { status: res.status, description });
      return false;
    }
    console.info('[telegram] sent');
    return true;
  } catch (e) {
    console.error('[telegram] unexpected error', {
      type: e instanceof Error ? e.name : 'unknown',
    });
    return false;
  }
}
