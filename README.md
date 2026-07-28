# Сайт юридичної практики для родин військовослужбовців

Інформаційний сайт юридичної практики, що спеціалізується на захисті прав
військовослужбовців та членів їхніх сімей: виплати у разі загибелі, затримки
та відмови, родини зниклих безвісти, статуси та пенсії.

## Технології

- **Next.js 15** (App Router) + **TypeScript**
- **Astryx Design System** (`@astryxdesign/core`) — компоненти, токени, тема
- **React Hook Form + Zod** — форма заявки з клієнтською та серверною валідацією
- Серверний API endpoint `/api/lead` з rate limiting, honeypot і опційним Cloudflare Turnstile

## Запуск локально

```bash
# 1. Встановити залежності
npm install --legacy-peer-deps

# 2. Створити локальний конфіг
cp .env.example .env.local
# заповніть значення (див. коментарі у файлі)

# 3. Запустити дев-сервер
npm run dev
# → http://localhost:3000

# 4. Продакшн-збірка
npm run build && npm start
```

> `--legacy-peer-deps` потрібен через перетин peer-залежностей zod v3/v4
> у транзитивних пакетах. На роботу це не впливає.

## Структура проєкту

```
src/
  app/                    # сторінки (App Router)
    api/lead/route.ts     # серверний endpoint заявок
    vyplaty-u-razi-zagybeli/  # ключова SEO-сторінка
    korysna-informatsiya/[slug]/  # статті з CMS-моделі
    sitemap.ts, robots.ts
  components/             # reusable-компоненти (Astryx)
    CallbackForm.tsx      # форма заявки
    LegalComponents.tsx   # застереження, джерела, дата оновлення
    ContentBlocks.tsx     # hero, кроки, чеклісти, виплати
  config/
    site.ts               # ← ВСІ контакти, назви, ціни (єдине місце)
  content/                # ← юридичний контент (CMS-модель, без коду)
    payments.ts           # види виплат: amount, eligibility, sources…
    articles.ts           # статті «Корисна інформація»
    faq.ts, services.ts, situations.ts, reviews.ts
  lib/
    leadSchema.ts         # Zod-модель заявки (клієнт + сервер)
    rateLimit.ts
  theme/brandTheme.ts     # брендова тема поверх Astryx
docs/                     # чеклісти запуску та юридичної перевірки
public/downloads/         # PDF-чекліст «Перші кроки»
```

## Оновлення юридичного контенту (без зміни компонентів)

Весь юридичний контент живе у `src/content/*`:

- **Виплати** — `payments.ts`. Кожен запис має поля `amount`,
  `eligibilitySummary`, `paymentSchedule`, `officialSource`, `lastVerifiedAt`,
  `verifiedBy`, `importantExceptions`. Поки значення містить позначку
  `[ПОТРІБНА ПЕРЕВІРКА АДВОКАТОМ ПЕРЕД ПУБЛІКАЦІЄЮ]`, воно **не показується
  відвідувачам** — лише службова позначка.
- **Статті** — `articles.ts`. Поле `reviewed: false` показує на сторінці
  банер «очікує юридичної перевірки».
- **FAQ** — `faq.ts`; **послуги** — `services.ts`; **відгуки** — `reviews.ts`
  (блок прихований, поки масив порожній).

Дата юридичного оновлення сайту — `site.lastLegalUpdate` у `src/config/site.ts`.

## Форма заявки та безпека

- Обов'язкові поля: ім'я, телефон, тема. Все інше — опційне.
- Checkbox згоди **без** попередньо встановленої позначки.
- Honeypot-поле + in-memory rate limiting (5 заявок / 10 хв з IP).
- Cloudflare Turnstile вмикається автоматично, якщо задані
  `NEXT_PUBLIC_TURNSTILE_SITE_KEY` і `TURNSTILE_SECRET_KEY`.
- **Telegram-сповіщення про нові заявки** — приходять власнику одразу
  (`TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`). Покрокова інструкція:
  `docs/TELEGRAM_BOT.md`.
- Доставка заявок: `LEADS_WEBHOOK_URL` (CRM/внутрішня система) або
  `LEADS_EMAIL` (потребує підключення поштового провайдера — див. TODO у
  `src/app/api/lead/route.ts`).
- Логи не містять текстів звернень і персональних даних.
- Заявки **не** зберігаються у відкритих Google Sheets.
- UTM-мітки та сторінка-джерело передаються без персональних даних.

Для суворішого rate limiting на serverless підключіть зовнішнє сховище
(наприклад, Upstash Redis) у `src/lib/rateLimit.ts`.

## Доступність (WCAG 2.2 AA)

Semantic HTML, навігація клавіатурою та видимий фокус (Astryx), label у кожного
поля, `aria-live` для статусу форми, `prefers-reduced-motion`, контрастні
токени теми, кнопки ≥44px (розмір `lg` у ключових CTA).

## Перед запуском

1. `docs/REPLACE_BEFORE_LAUNCH.md` — дані, які потрібно замінити.
2. `docs/LEGAL_REVIEW.md` — матеріали для перевірки адвокатом.
3. `docs/SENSITIVE_CLAIMS.md` — усі юридично чутливі твердження.
4. `docs/LAUNCH_CHECKLIST.md` — фінальний чекліст.
5. `docs/DEPLOY_VERCEL.md` — інструкція розгортання.
6. `docs/TELEGRAM_BOT.md` — налаштування сповіщень про заявки в Telegram.
7. `docs/DESIGN_ACCENTS.md` — кольорова ієрархія та план акцентів.
