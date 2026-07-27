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
