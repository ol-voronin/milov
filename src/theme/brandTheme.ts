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
     * Шрифтова пара.
     *
     * Literata — читацький серіф зі змінною віссю optical size: у великому
     * кеглі стає контрастнішою й гострішою, у дрібному — міцнішою та
     * відкритішою. Саме через це заголовки не виглядають «розтягнутим
     * дефолтом». Малювалася для довгого читання з екрана, повна кирилиця.
     *
     * IBM Plex Sans — гротеск із упізнаваними скошеними терміналами;
     * не сплутати з Inter / Roboto / Source, які стоять на кожному
     * другому сайті. Кирилиця від ParaType.
     *
     * Разом: серйозна редакційна інтонація без «юрфірмового шаблону».
     */
    body: {
      family: 'IBM Plex Sans Variable',
      fallbacks:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    heading: {
      family: 'Literata Variable',
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

    /**
     * ТИПОГРАФІЧНА ШКАЛА — задана поштучно, а не одним коефіцієнтом.
     *
     * Геометрична прогресія (scale.ratio) не може одночасно дати
     * великі заголовки і НЕ дати мікроскопічний допоміжний текст:
     * щоб h1 виріс до 44px, ratio має бути ~1.36, і тоді допоміжний
     * падає до 12,5px. Тому шкалу фіксуємо вручну.
     *
     * Було → стало:
     *   h1        34 → 44    (ієрархія була заслабка: h1 лише в 1,3× h2)
     *   h2        26 → 32
     *   h3/lead   20 → 22
     *   текст     16 → 17
     *   допоміжн. 13 → 15    (13px на екрані читається важко)
     *   найдрібн. 10 → 14    (нижче 14px не опускаємось ніде)
     */
    '--font-size-xs': '0.875rem', //  14px — бейджі, дрібні мітки
    '--font-size-sm': '0.9375rem', //  15px — допоміжний текст
    '--font-size-base': '1.0625rem', // 17px — основний текст
    '--font-size-lg': '1.375rem', //  22px — лід і h3
    '--font-size-xl': '2rem', //      32px — h2
    '--font-size-2xl': '2.75rem', //  44px — h1
    '--font-size-3xl': '3.375rem', // 54px — display
    '--font-size-4xl': '4.25rem', //  68px
    '--font-size-5xl': '5.25rem', //  84px

    /**
     * Інтерліньяж. Українська має довші слова за англійську, а тексти
     * тут юридичні — читати доводиться уважно. 1,5 було тісно.
     */
    '--text-body-leading': '1.65', //       17 → 28px
    '--text-label-leading': '1.5',
    '--text-supporting-leading': '1.6', //  15 → 24px
    '--text-large-leading': '1.45', //      22 → 32px
    '--text-heading-1-leading': '1.18', //  44 → 52px
    '--text-heading-2-leading': '1.3', //   32 → 42px
    '--text-heading-3-leading': '1.36', //  22 → 30px
    '--text-heading-4-leading': '1.45',

    /**
     * Лід-абзац під заголовком був semibold — на 22px це читалося як
     * другий заголовок і сперечалося з h1. Робимо звичайну вагу:
     * розмір уже виділяє його достатньо.
     */
    '--text-large-weight': 'var(--font-weight-normal)',
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
