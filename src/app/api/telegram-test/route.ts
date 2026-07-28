import { NextRequest, NextResponse } from 'next/server';

/**
 * Діагностичний endpoint для перевірки Telegram-сповіщень.
 *
 * Вмикається лише коли задана змінна TELEGRAM_TEST_KEY — без неї
 * повертає 404, щоб ніхто сторонній не міг спамити ваш чат.
 *
 * Використання:
 *   https://ваш-домен/api/telegram-test?key=ВАШ_TELEGRAM_TEST_KEY
 *
 * Відповідь показує, що саме не так: відсутні змінні, невірний токен,
 * невірний chat id тощо.
 */
export async function GET(req: NextRequest) {
  const testKey = process.env.TELEGRAM_TEST_KEY;
  const providedKey = req.nextUrl.searchParams.get('key');

  if (!testKey || providedKey !== testKey) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const diagnostics = {
    TELEGRAM_BOT_TOKEN: token
      ? `задано (${token.slice(0, 6)}…, довжина ${token.length})`
      : '❌ ВІДСУТНЯ',
    TELEGRAM_CHAT_ID: chatId ? `задано (${chatId})` : '❌ ВІДСУТНЯ',
  };

  if (!token || !chatId) {
    return NextResponse.json({
      ok: false,
      problem:
        'Змінні не бачить сервер. Додайте їх у Vercel → Settings → Environment Variables і ОБОВʼЯЗКОВО зробіть Redeploy.',
      diagnostics,
    });
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: '✅ Тестове повідомлення з сайту. Якщо ви це бачите — сповіщення про заявки працюють.',
      }),
      signal: AbortSignal.timeout(8000),
    });

    const body = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      description?: string;
      error_code?: number;
    };

    if (body.ok) {
      return NextResponse.json({
        ok: true,
        message: 'Повідомлення надіслано — перевірте Telegram.',
        diagnostics,
      });
    }

    const hints: Record<number, string> = {
      401: 'Невірний токен бота. Перевірте TELEGRAM_BOT_TOKEN (має бути повністю, разом із частиною до двокрапки).',
      400: 'Найчастіше: невірний TELEGRAM_CHAT_ID, або ви ще не натиснули Start у своєму боті. Напишіть боту будь-яке повідомлення і спробуйте знову.',
      403: 'Бота заблоковано або видалено з групи.',
      404: 'Невірний токен — Telegram не знаходить такого бота.',
    };

    return NextResponse.json({
      ok: false,
      telegramError: body.description ?? 'невідома помилка',
      errorCode: body.error_code,
      hint: body.error_code ? hints[body.error_code] : undefined,
      diagnostics,
    });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      problem: 'Не вдалося звʼязатися з api.telegram.org',
      type: e instanceof Error ? e.name : 'unknown',
      diagnostics,
    });
  }
}
