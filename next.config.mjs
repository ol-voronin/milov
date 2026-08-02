/**
 * CONTENT-SECURITY-POLICY.
 *
 * НАВІЩО. Сайт статичний, без бази й адмінки, тож класичного XSS тут
 * узяти нема звідки. CSP потрібен на інший випадок: якщо колись у
 * складальну залежність підмішають шкідливий код (supply-chain атака),
 * саме ця політика не дасть йому нікуди відправити зібрані дані.
 * Для сайту, куди люди вводять ім'я і номер телефону, це головне.
 *
 * ЧОМУ ТУТ 'unsafe-inline' ДЛЯ СКРИПТІВ. Next.js вбудовує невеликі
 * інлайнові скрипти для гідрації. Прибрати їх можна лише через nonce,
 * а nonce вимагає middleware на кожен запит і вимикає статичне
 * кешування сторінок. Для сайту, де зламана верстка означає, що вдова
 * не додзвониться до юриста, ця ціна зависока.
 *
 * Чесно про наслідок: 'unsafe-inline' знімає захист від впровадження
 * інлайнового скрипта. Але `script-src 'self'` усе одно забороняє
 * підвантажити зовнішній файл, а `connect-src 'self'` — відправити
 * будь-що на чужий сервер. Саме ці два обмеження й роблять роботу.
 *
 * ЯКЩО ВМИКАТИМЕТЕ TURNSTILE — додайте `https://challenges.cloudflare.com`
 * у script-src, frame-src і connect-src, інакше віджет не завантажиться.
 * Якщо вмикатимете Plausible — додайте `https://plausible.io` у
 * script-src і connect-src.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  // StyleX (дизайн-система Astryx) підставляє стилі інлайном
  "style-src 'self' 'unsafe-inline'",
  // Фото зі стоку йдуть через /_next/image, тобто з нашого ж домену
  "img-src 'self' data: blob:",
  // Шрифти Literata та IBM Plex Sans лежать локально (Fontsource)
  "font-src 'self' data:",
  // Аналітика Vercel б'є в /_vercel/insights — той самий домен
  "connect-src 'self'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  // Форму не можна перенаправити на чужий сервер
  "form-action 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  // Захист від clickjacking. Дублює frame-ancestors для старих браузерів
  { key: 'X-Frame-Options', value: 'DENY' },
  // Заборона MIME-sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Мінімальний referrer — не передаємо шлях сторінки третім сторонам
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Вимикаємо непотрібні браузерні API
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // HSTS (діє лише по HTTPS)
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
];

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  /**
   * Зображення зі стоку проксіюються й кешуються на нашому боці.
   * Браузер відвідувача не звертається до Unsplash — його IP-адреса
   * не потрапляє до третьої сторони (див. коментар у PageHeroPhoto.tsx).
   *
   * Коли власник покладе власні фото у /public/photos/, цей блок
   * можна буде видалити разом із зовнішніми посиланнями.
   */
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
    // Фото банерів рідко змінюються — тримаємо в кеші 30 днів
    minimumCacheTTL: 2592000,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
