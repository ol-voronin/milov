import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
/**
 * Шрифти.
 *
 * IBM Plex Sans — лише вісь ваги (wght). Тілу тексту більше нічого не треба,
 * а зайві осі це зайві кілобайти.
 *
 * Literata — варіант standard, тобто вісь ваги ПЛЮС вісь optical size.
 * Кирилична підмножина важить 64 КБ замість 28 КБ, і ці 36 КБ витрачаються
 * свідомо: саме opsz робить заголовок на 44px гострішим і контрастнішим,
 * а дрібний серіф — міцнішим. Латинська підмножина на україномовних
 * заголовках майже не завантажується (unicode-range).
 */
import '@fontsource-variable/ibm-plex-sans';
import '@fontsource-variable/literata/standard.css';
import '@/theme/brandTheme.css';
import './globals.css';
import { Providers } from '@/components/Providers';
import { SiteShell } from '@/components/SiteShell';
import { AttributionTracker } from '@/components/AttributionTracker';
import { Analytics } from '@/components/Analytics';
import { site } from '@/config/site';
import { JsonLd, legalServiceSchema, webSiteSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.brandName} — ${site.tagline}`,
    template: `%s — ${site.brandName}`,
  },
  description:
    'Права родин військовослужбовців: виплати у разі загибелі, оскарження відмов, зниклі безвісти, пенсії та статуси, пільги для родини, поки він служить. Консультації онлайн і телефоном по всій Україні.',
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: site.brandName,
    title: `${site.brandName} — ${site.tagline}`,
    description:
      'Перевіримо вашу ситуацію, пояснимо порядок дій та, за потреби, візьмемо на себе юридичний супровід.',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  /**
   * Категорія вмісту для корпоративних фільтрів.
   *
   * Свіжий домен фільтри за замовчуванням кладуть у «uncategorized», а
   * така політика в багатьох організаціях означає блокування. Наша
   * аудиторія читає сайт зокрема з роботи — з лікарень, соцслужб, ТЦК,
   * банків — і замість сторінки бачила б заглушку.
   *
   * Теги нижче — здебільшого застаріла специфікація, сучасні фільтри
   * спираються радше на structured data (див. legalServiceSchema).
   * Але вони нічого не коштують, а частина шлюзів їх ще читає.
   *
   * ⚠️ Це НЕ знімає вже наявне блокування в конкретній компанії — там
   * потрібна заявка до їхньої підтримки. Див. docs/SITE_CATEGORIZATION.md
   */
  category: 'Legal Services',
  other: {
    classification: 'Legal Services, Government and Legal Organizations',
    // Вміст придатний для будь-якої аудиторії — жодних вікових обмежень
    rating: 'general',
    'content-language': 'uk-UA',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Не блокуємо зум: людям зі слабким зором він потрібен (WCAG 1.4.4)
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#14304d',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body>
        {/* Без JS reveal-блоки мають бути видимі одразу (аудит A5) */}
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <JsonLd data={legalServiceSchema()} />
        <JsonLd data={webSiteSchema()} />
        <Providers>
          {/* Фіксує канал першого входу на сесію — нічого не рендерить */}
          <AttributionTracker />
          {/* Cookieless-аналітика. Не завантажується, поки не задано змінні */}
          <Analytics />
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
