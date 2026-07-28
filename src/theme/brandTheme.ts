/**
 * Брендова тема сайту.
 *
 * Палітра: глибокий темно-синій акцент, теплий світлий фон,
 * нейтральні сірі. Побудована поверх neutralTheme через токени Astryx —
 * компоненти не містять жодних hex-значень.
 */

import { defineTheme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral';

export const brandTheme = defineTheme({
  name: 'family-defense',
  extends: neutralTheme,
  color: {
    // Глибокий темно-синій акцент (світлий/темний режими генеруються автоматично)
    accent: '#24527E',
    neutralStyle: 'warm',
  },
  typography: {
    /**
     * Базовий кегль 16px замість дефолтних 14px.
     * Аудиторія — зокрема люди 50+, які читають у стресі, часто з телефона.
     * 16px body + більші заголовки відповідають практиці держпорталів
     * (Дія, GOV.UK) і рекомендаціям щодо читабельності.
     */
    scale: { base: 16, ratio: 1.22 },
    // Manrope Variable — відкритий шрифт із повною кирилицею (аудит V2);
    // підключається через @fontsource-variable/manrope у layout.tsx
    body: {
      family: 'Manrope Variable',
      fallbacks:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    /**
     * Заголовки — Lora (serif з повною кирилицею).
     * Контрастна пара serif+sans прибирає «шаблонність» дефолтного
     * інтерфейсу і додає юридичній практиці ваги та людяності:
     * serif читається як «документ, якому можна довіряти»,
     * а не як черговий SaaS-лендінг.
     */
    heading: {
      family: 'Lora Variable',
      fallbacks: 'Georgia, "Times New Roman", serif',
    },
  },
  tokens: {
    // Теплий білий / світло-бежевий фон сторінки
    '--color-background-body': ['#F8F6F2', '#141517'],
  },
  components: {
    /**
     * Кнопки більші: цільова аудиторія часто користується телефоном,
     * тому тап-зона і кегль підняті понад дефолт (мінімум 44px за WCAG 2.2).
     */
    button: {
      base: { fontWeight: '600' },
      'size:sm': { minHeight: '2.5rem', paddingInline: '1rem' },
      'size:md': { minHeight: '3rem', paddingInline: '1.5rem' },
      'size:lg': { minHeight: '3.5rem', paddingInline: '2rem' },
    },
  },
});
