import Script from 'next/script';

/**
 * АНАЛІТИКА БЕЗ COOKIE Й БЕЗ БАНЕРА ЗГОДИ.
 *
 * ЧОМУ НЕ GOOGLE ANALYTICS. GA4 ставить cookie й передає дані про
 * відвідувача третій стороні, тому потребує вікна згоди. Перше, що
 * побачить жінка на четвертий день після загибелі чоловіка, — спливаюче
 * вікно про файли cookie. Це той бар'єр, який тут коштує найдорожче,
 * і ставити його заради статистики немає підстав.
 *
 * Plausible і Umami не використовують cookie й не збирають персональних
 * даних: жодного ідентифікатора відвідувача, жодного профілю між
 * візитами. Вони відповідають на єдине потрібне питання — які сторінки
 * читають і де люди зупиняються.
 *
 * Питання «звідки прийшло звернення» аналітика не вирішує і не має:
 * канал приходить прямо у сповіщення Telegram (src/lib/attribution.ts).
 *
 * ЯК УВІМКНУТИ
 *   Plausible: NEXT_PUBLIC_PLAUSIBLE_DOMAIN=vash-domen.com.ua
 *   Umami:     NEXT_PUBLIC_UMAMI_SRC=https://ваш-сервер/script.js
 *              NEXT_PUBLIC_UMAMI_ID=<id сайту>
 * Поки змінні не задані, жодного стороннього скрипта не завантажується.
 *
 * ⚠️ Не додавайте сюди рекламні пікселі. У ТЗ прямо заборонено
 * передавати текст звернення в аналітику й рекламні системи, а Google
 * відносить особисті нещастя до чутливих категорій і забороняє
 * будувати на них рекламні аудиторії.
 */
export function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_ID;

  return (
    <>
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
