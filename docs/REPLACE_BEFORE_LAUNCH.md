# Що замінити перед запуском

> **Оновлено 2 серпня 2026.** Назву практики й домен уже заповнено:
> `brandName: 'Заступа'`, `siteUrl: https://zastupa.com.ua`.
> Решта позначок TODO лишається чинною.

Усі значення зібрані у **двох місцях**: `src/config/site.ts` і `.env`.
Шукайте коментарі `TODO:` — кожне таке місце потребує заміни.

## src/config/site.ts

| Поле | Що вписати |
|---|---|
| `brandName` | назва практики / бренду |
| `legalEntityName` | повна юридична назва (ФОП / АО / АБ) |
| `phone`, `email` | реальні контакти (дублюються з .env) |
| `telegram`, `viber` | реальні посилання; поки порожні — кнопки приховані |
| `city`, `serviceArea` | місто та територія обслуговування |
| `workingHours` | графік роботи |
| `initialCallTerms` | умови первинного дзвінка (⚠️ «безкоштовно» — лише якщо підтверджено власником) |
| `callbackTimePromise` | обіцянка щодо часу дзвінка (⚠️ без конкретного часу, якщо не гарантується) |
| `privacyContact` | контакт з питань персональних даних |
| `lastLegalUpdate` | дата останньої юридичної перевірки |

## src/config/site.ts → team[]

| Поле | Що вписати |
|---|---|
| `name` | справжнє ім'я спеціаліста |
| `role` | ⚠️ «Адвокат» — ТІЛЬКИ за наявності чинного свідоцтва; інакше «Юрист» |
| `experience` | реальний опис досвіду, без вигаданих цифр |
| `focusAreas` | реальні напрями роботи |
| `certificateNumber` | номер свідоцтва (або порожньо) |
| `registryLink` | профіль у ЄРАУ https://erau.unba.org.ua (або порожньо) |
| `photo` | шлях до реальної фотографії у `/public/team/` |

## src/config/site.ts → pricing

Поки поля порожні, сайт показує чесний текст «вартість погоджується до
початку роботи». Заповнюйте лише підтверджені власником ціни:
`initialCallPrice`, `consultationPrice`, `documentAnalysisPrice`,
`caseSupportPricingModel`.

## .env (див. .env.example)

`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_EMAIL`,
`NEXT_PUBLIC_WORKING_HOURS`, `LEADS_WEBHOOK_URL` / `LEADS_EMAIL`,
`TURNSTILE_*`, `LEAD_RETENTION_DAYS`.

## Інше

- `src/app/icon.svg` — замініть favicon-заглушку на реальний логотип.
- `public/downloads/pershi-kroky-checklist.pdf` — перегенеруйте після
  юридичної перевірки тексту чекліста.
- `src/content/reviews.ts` — відгуки додаються лише з письмової згоди клієнтів.
- Метадані OG: додайте зображення `/public/og.png` (1200×630) і пропишіть у
  `src/app/layout.tsx` → `openGraph.images`, якщо потрібен банер для соцмереж.
