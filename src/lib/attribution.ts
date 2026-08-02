/**
 * ЗВІДКИ ПРИЙШЛА ЛЮДИНА — визначення каналу без стеження за людиною.
 *
 * ПРОБЛЕМА, ЯКУ ЦЕ ВИРІШУЄ
 * Раніше форма читала utm_* із поточного URL у момент надсилання. Реальний
 * шлях виглядає інакше: людина заходить на /?utm_source=google, читає, йде
 * на /vyplaty-u-razi-zagybeli — і мітка зникає з адреси. Заявка приходила
 * без джерела майже завжди. Тому фіксуємо джерело ПЕРШОГО входу і тримаємо
 * його на час сесії.
 *
 * ЩО САМЕ ЗБЕРІГАЄТЬСЯ
 * Тільки службові дані каналу: utm-мітки, домен переходу, перша сторінка.
 * Жодних ідентифікаторів людини, жодного вмісту звернення. Дані живуть
 * у sessionStorage — тобто зникають, щойно людина закриє вкладку, і не
 * дозволяють упізнати її при наступному візиті. Це свідомо: у ТЗ прямо
 * заборонено передавати текст звернення в аналітику, і будувати тут
 * довготривалий профіль відвідувача було б проти духу цієї вимоги.
 *
 * КУДИ ЦЕ ЙДЕ
 * Лише у сповіщення власника в Telegram. Ніяких зовнішніх аналітик.
 *
 * ⚠️ Google відносить особисті нещастя до чутливих категорій і забороняє
 * будувати на них власні аудиторії для реклами. Ці дані НЕ МОЖНА
 * вивантажувати в рекламні кабінети для ремаркетингу на тих, хто читав
 * сторінку про загибель. Вони існують лише для відповіді на питання
 * «який канал приносить звернення».
 */

const KEY = 'lead-attribution';

export type Attribution = {
  /** utm_source або 'organic' / 'direct' / домен сайту-реферера */
  source?: string;
  medium?: string;
  campaign?: string;
  /** Читабельна назва каналу для повідомлення в Telegram */
  channel?: string;
  /** Перша сторінка, на яку людина потрапила */
  landing?: string;
};

/** Пошукові системи, з яких приходить органічний трафік */
const SEARCH_ENGINES = [
  'google.',
  'bing.',
  'duckduckgo.',
  'yahoo.',
  'ecosia.',
  'search.brave',
  'ukr.net',
  'meta.ua',
];

const SOCIAL = new Map<string, string>([
  ['facebook.', 'Facebook'],
  ['instagram.', 'Instagram'],
  ['t.me', 'Telegram'],
  ['telegram.', 'Telegram'],
  ['youtube.', 'YouTube'],
  ['linkedin.', 'LinkedIn'],
  ['tiktok.', 'TikTok'],
  ['threads.', 'Threads'],
]);

/**
 * Перетворює технічні дані на зрозумілу назву каналу.
 * Саме її власник побачить у Telegram — «Пошук Google», а не «google / organic».
 */
function describeChannel(a: Attribution, referrerHost: string): string {
  if (a.source && a.medium) {
    // Явна кампанія: показуємо як є, це найточніше
    return `${a.source} / ${a.medium}${a.campaign ? ` / ${a.campaign}` : ''}`;
  }
  if (a.source) return a.source;

  if (!referrerHost) return 'Прямий перехід або збережене посилання';

  if (SEARCH_ENGINES.some((e) => referrerHost.includes(e))) {
    const name = referrerHost.replace(/^www\./, '').split('.')[0];
    return `Пошук ${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  }
  for (const [needle, label] of SOCIAL) {
    if (referrerHost.includes(needle)) return label;
  }
  // Сайт партнера, фонду, спільноти — найцінніший канал, показуємо домен
  return `Перехід із ${referrerHost.replace(/^www\./, '')}`;
}

/**
 * Запам'ятовує джерело першого входу. Викликається один раз на сесію:
 * повторні виклики нічого не перезаписують, інакше останній клік
 * усередині сайту затирав би реальне джерело.
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;
  try {
    if (sessionStorage.getItem(KEY)) return;

    const params = new URLSearchParams(window.location.search);
    let referrerHost = '';
    try {
      if (document.referrer) {
        const url = new URL(document.referrer);
        // Переходи всередині сайту джерелом не вважаються
        if (url.hostname !== window.location.hostname) referrerHost = url.hostname;
      }
    } catch {
      /* некоректний referrer — просто ігноруємо */
    }

    const data: Attribution = {
      source: params.get('utm_source') ?? undefined,
      medium: params.get('utm_medium') ?? undefined,
      campaign: params.get('utm_campaign') ?? undefined,
      landing: window.location.pathname,
    };
    data.channel = describeChannel(data, referrerHost);

    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* приватний режим може забороняти sessionStorage — не критично */
  }
}

/** Повертає збережене джерело. Порожній об'єкт, якщо нічого не збережено. */
export function readAttribution(): Attribution {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
