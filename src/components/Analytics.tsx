import Script from 'next/script';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';

/**
 * АНАЛІТИКА БЕЗ COOKIE Й БЕЗ БАНЕРА ЗГОДИ.
 *
 * ЧОМУ НЕ GOOGLE ANALYTICS. GA4 ставить cookie й передає дані про
 * відвідувача третій стороні, тому потребує вікна згоди. Перше, що
 * побачить жінка на четвертий день після загибелі чоловіка, — спливаюче
 * вікно про файли cookie. Це той бар'єр, який тут коштує найдорожче,
 * і ставити його заради статистики немає підстав.
 *
 * ⚠️ Не додавайте сюди рекламні пікселі. У ТЗ прямо заборонено
 * передавати текст звернення в аналітику й рекламні системи, а Google
 * відносить особисті нещастя до чутливих категорій і забороняє
 * будувати на них рекламні аудиторії.
 *
 * ────────────────────────────────────────────────────────────
 * 1. VERCEL WEB ANALYTICS — основний лічильник
 *
 * Без cookie, без наскрізного профілю відвідувача, скрипт віддається
 * з нашого ж домену через /_vercel/insights — тобто жодного запиту до
 * стороннього сервісу з браузера людини.
 *
 * ⚠️ Сам пакет нічого не вмикає. Web Analytics треба активувати в
 * панелі: проєкт → вкладка Analytics → Enable. Поки не ввімкнено,
 * скрипт вантажиться, але дані нікуди не пишуться.
 *
 * У режимі розробки компонент сам себе вимикає — рахуються лише
 * реальні відвідувачі на продакшені.
 *
 * ────────────────────────────────────────────────────────────
 * 2. PLAUSIBLE / UMAMI — необов'язкова альтернатива
 *
 * Лишено на випадок, якщо знадобиться статистика поза Vercel: власний
 * хостинг даних, довша історія або звіти, яких немає у вбудованій
 * аналітиці. Поки змінні не задані, жоден сторонній скрипт не
 * завантажується.
 *
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=zastupa.com.ua
 *   NEXT_PUBLIC_UMAMI_SRC=https://ваш-сервер/script.js
 *   NEXT_PUBLIC_UMAMI_ID=<id сайту>
 *
 * ────────────────────────────────────────────────────────────
 * ЧОГО АНАЛІТИКА НЕ ВИРІШУЄ. Питання «звідки прийшло звернення»
 * закрите інакше — канал приходить прямо у сповіщення Telegram
 * (src/lib/attribution.ts). Аналітика відповідає на інше: які
 * сторінки читають і де люди зупиняються.
 */
export function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_ID;

  return (
    <>
      <VercelAnalytics />

      {plausibleDomain ? (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      ) : null}

      {umamiSrc && umamiId ? (
        <Script
          defer
          src={umamiSrc}
          data-website-id={umamiId}
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
