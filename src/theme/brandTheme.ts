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
     * Базовий кегль 16px, коефіцієнт 1.28 — заголовки помітно більші
     * за текст. Аудиторія читає у стресі, часто з телефона, тому
     * контраст розмірів важливіший за компактність.
     */
    scale: { base: 16, ratio: 1.28 },
    /**
     * Шрифтова пара — суперсімейство Source (Adobe): Source Sans 3
     * для тексту і Source Serif 4 для заголовків. Вони спроєктовані
     * разом, мають однакові пропорції та повну кирилицю, тому не
     * «сперечаються» одне з одним, як випадкова пара з різних сімейств.
     */
    body: {
      family: 'Source Sans 3 Variable',
      fallbacks:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    heading: {
      family: 'Source Serif 4 Variable',
      fallbacks: 'Georgia, "Times New Roman", serif',
    },
  },
  /**
   * Радіус кутів — єдиний по всьому сайту, 4–6px.
   * base 4 + multiplier 0.5 дає скупу шкалу без «мильних» заокруглень.
   */
  radius: { base: 4, multiplier: 0.5 },
  tokens: {
    // Теплий білий / світло-бежевий фон сторінки
    '--color-background-body': ['#F8F6F2', '#141517'],
    /**
     * Жорстко фіксуємо всю шкалу радіусів у діапазоні 4–6px,
     * щоб великі поверхні (page) не «розпливалися».
     * ⚠️ Значення — рядком, а не парою: пару Astryx обгортає в
     * light-dark(), а ця CSS-функція працює лише з кольорами,
     * і для довжин дає невалідне значення (радіус стає 0).
     */
    '--radius-inner': '4px',
    '--radius-element': '5px',
    '--radius-container': '6px',
    '--radius-page': '6px',
    '--radius-chat': '6px',
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
