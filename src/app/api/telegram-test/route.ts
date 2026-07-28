import { NextRequest, NextResponse } from 'next/server';
import { notifyTelegram } from '@/lib/telegram';

/**
 * Діагностичний endpoint для перевірки Telegram-сповіщень.
 *
 * Вмикається лише коли задана змінна TELEGRAM_TEST_KEY — без неї
 * повертає 404, щоб ніхто сторонній не міг спамити ваш чат.
 *
 * Використання:
 *   https://ваш-домен/api/telegram-test?key=ВАШ_TELEGRAM_TEST_KEY
 *
 * ⚠️ Перевіряє САМЕ ТОЙ виклик, що використовується для реальних заявок
 * (notifyTelegram) — інакше тест міг би проходити, а сповіщення про лід ні.
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

  // Той самий шлях, що й у справжньої заявки
  const sent = await notifyTelegram({
    name: 'ТЕСТ (перевірка сповіщень)',
    phone: '+380670000000',
    topic: 'Затримка виплати',
    contactMethod: 'phone',
    preferredTime: '',
    message:
      'Це тестове сповіщення. Якщо ви його бачите — заявки з сайту теж будуть приходити.',
    sourcePage: '/api/telegram-test',
    utm: {},
    receivedAt: new Date().toISOString(),
  });

  if (sent) {
    return NextResponse.json({
      ok: true,
      message: 'Повідомлення надіслано — перевірте Telegram.',
      diagnostics,
    });
  }

  // Додатково дістаємо точну помилку від Telegram для підказки
  let telegramError = '';
  let errorCode: number | undefined;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/getChat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId }),
      signal: AbortSignal.timeout(8000),
    });
    const body = (await res.json()) as {
      ok?: boolean;
      description?: string;
      error_code?: number;
    };
    telegramError = body.description ?? '';
    errorCode = body.error_code;
  } catch {
    telegramError = 'не вдалося звʼязатися з api.telegram.org';
  }

  const hints: Record<number, string> = {
    401: 'Невірний токен бота. Перевірте TELEGRAM_BOT_TOKEN — має бути повністю, разом із частиною до двокрапки.',
    400: 'Найчастіше: невірний TELEGRAM_CHAT_ID (це має бути id ВАШОГО акаунта, не бота), або ви ще не натиснули Start у своєму боті.',
    403: 'Бота заблоковано або видалено з групи.',
    404: 'Невірний токен — Telegram не знаходить такого бота.',
  };

  return NextResponse.json({
    ok: false,
    problem: 'notifyTelegram() не зміг надіслати повідомлення',
    telegramError,
    errorCode,
    hint: errorCode ? hints[errorCode] : 'Подробиці — у Vercel Logs, рядок [telegram] send failed',
    diagnostics,
  });
}
