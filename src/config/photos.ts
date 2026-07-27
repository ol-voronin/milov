/**
 * Тематичні фото сторінок — безкоштовний фотосток Unsplash (CDN-хотлінк,
 * дозволений умовами Unsplash License: безоплатне комерційне використання
 * без атрибуції; атрибуцію все ж додаємо в alt/credit як good practice).
 *
 * Правила добору (ТЗ + docs/SENSITIVE_CLAIMS.md):
 * — жодних фото горя, поховань, поранень, бойових дій;
 * — жодних рукостискань, Феміди чи суддівського молотка;
 * — лише спокійні нейтральні сюжети: документи, робочі місця, пейзажі.
 *
 * TODO: за бажанням замініть на власні фото у /public/photos/.
 */

export type PagePhoto = {
  src: string;
  alt: string;
  credit: string;
};

const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const photos: Record<string, PagePhoto> = {
  home: {
    src: unsplash('photo-1500382017468-9049fed747ef', 1600),
    alt: 'Самотнє дерево серед пшеничного поля на світанку',
    credit: 'Unsplash',
  },
  payments: {
    src: unsplash('photo-1450101499163-c8848c66ca85'),
    alt: 'Перова ручка над документом, який підписують',
    credit: 'Unsplash',
  },
  delay: {
    src: unsplash('photo-1455390582262-044cdead277a'),
    alt: 'Рука пише перовою ручкою на аркуші паперу',
    credit: 'Unsplash',
  },
  missing: {
    src: unsplash('photo-1470071459604-3b5ec3a7fe05'),
    alt: 'Спокійні пагорби в ранковому тумані',
    credit: 'Unsplash',
  },
  otherPayments: {
    src: unsplash('photo-1497032628192-86f99bcd76bc'),
    alt: 'Робочий стіл із ноутбуком і нотатником',
    credit: 'Unsplash',
  },
  services: {
    src: unsplash('photo-1516387938699-a93567ec168e'),
    alt: 'Охайне робоче місце з документами та ноутбуком, вигляд згори',
    credit: 'Unsplash',
  },
  team: {
    src: unsplash('photo-1497366754035-f200968a6e72'),
    alt: 'Світлий спокійний офісний простір',
    credit: 'Unsplash',
  },
  faq: {
    src: unsplash('photo-1507842217343-583bb7270b66'),
    alt: 'Зала бібліотеки з рядами книжок',
    credit: 'Unsplash',
  },
  info: {
    src: unsplash('photo-1481627834876-b7833e8f5570'),
    alt: 'Ряд книжок на полиці крупним планом',
    credit: 'Unsplash',
  },
  contacts: {
    src: unsplash('photo-1486312338219-ce68d2c6f44d'),
    alt: 'Людина працює за ноутбуком',
    credit: 'Unsplash',
  },
};
