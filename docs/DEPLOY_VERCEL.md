# Розгортання на Vercel

## Крок 1. Репозиторій

```bash
git init
git add .
git commit -m "Initial site"
# створіть репозиторій на GitHub/GitLab і запуште
```

## Крок 2. Імпорт у Vercel

1. [vercel.com](https://vercel.com) → **Add New → Project** → імпортуйте репозиторій.
2. Framework автоматично визначиться як **Next.js**.
3. У **Build & Development Settings**:
   - Install Command: `npm install --legacy-peer-deps`
   - Build Command: `next build` (за замовчуванням)

## Крок 3. Змінні середовища

У **Settings → Environment Variables** додайте значення з `.env.example`:

| Змінна | Обов'язково | Примітка |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | так | `https://ваш-домен.ua` — без слеша в кінці |
| `NEXT_PUBLIC_PHONE` | так | реальний номер |
| `NEXT_PUBLIC_EMAIL` | так | реальна пошта |
| `NEXT_PUBLIC_WORKING_HOURS` | так | графік роботи |
| `LEADS_WEBHOOK_URL` | одне з двох | HTTPS-webhook CRM |
| `LEADS_EMAIL` | одне з двох | потребує інтеграції поштового сервісу |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | ні | антиспам Cloudflare |
| `TURNSTILE_SECRET_KEY` | ні | секрет — тільки серверна змінна |
| `LEAD_RETENTION_DAYS` | ні | політика зберігання заявок |

⚠️ Секретні ключі (`TURNSTILE_SECRET_KEY`, `LEADS_WEBHOOK_URL`) не мають
префікса `NEXT_PUBLIC_` — вони ніколи не потрапляють на клієнт.

## Крок 4. Домен і HTTPS

1. **Settings → Domains** → додайте домен, налаштуйте DNS за підказками.
2. HTTPS-сертифікат Vercel видає автоматично.
3. Оновіть `NEXT_PUBLIC_SITE_URL` на фінальний домен і зробіть redeploy.

## Крок 5. Після деплою

- Перевірте `https://домен/sitemap.xml` і `https://домен/robots.txt`.
- Додайте сайт у Google Search Console та надішліть sitemap.
- Пройдіть `docs/LAUNCH_CHECKLIST.md`.

## Rate limiting на Vercel

Вбудований ліміт працює в межах одного serverless-інстансу. Для суворого
ліміту підключіть Upstash Redis (Vercel Marketplace) і адаптуйте
`src/lib/rateLimit.ts`.
