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
    // Manrope Variable — відкритий шрифт із повною кирилицею (аудит V2);
    // підключається через @fontsource-variable/manrope у layout.tsx
    body: {
      family: 'Manrope Variable',
      fallbacks:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    heading: {
      family: 'Manrope Variable',
      fallbacks:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
  },
  tokens: {
    // Теплий білий / світло-бежевий фон сторінки
    '--color-background-body': ['#F8F6F2', '#141517'],
  },
});
