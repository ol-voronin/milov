/** @type {import('next').NextConfig} */
const securityHeaders = [
  // Захист від clickjacking
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
