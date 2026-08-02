/**
 * Тематичні фото сторінок — безкоштовний фотосток Unsplash
 * (Unsplash License: безоплатне комерційне використання без атрибуції;
 * атрибуцію все одно тримаємо в полі credit як good practice).
 *
 * Правила добору (ТЗ + docs/SENSITIVE_CLAIMS.md):
 * — жодних фото горя, поховань, поранень, бойових дій;
 * — жодних рукостискань, Феміди чи суддівського молотка;
 * — лише спокійні нейтральні сюжети: документи, робочі місця, пейзажі.
 *
 * ⚠️ ПРИВАТНІСТЬ. Зображення НЕ віддаються браузеру напряму з Unsplash:
 * вони проходять через оптимізатор Next.js (див. next.config.mjs → images),
 * тому IP-адреса відвідувача не потрапляє до стороннього сервісу.
 * Не замінюйте <PageHeroPhoto> на звичайний <img> — це поверне витік.
 *
 * ЯК ПОСТАВИТИ ВЛАСНІ ФОТО (бажаний варіант):
 * 1. Покладіть файли у /public/photos/pages/ (напр. payments.jpg).
 * 2. Замініть src на '/photos/pages/payments.jpg' і credit на 'Власне фото'.
 * Локальні файли не потребують зовнішніх запитів узагалі.
 * Рекомендація: 1600×1067, jpg, до 250 КБ.
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
  servingFamily: {
    src: unsplash('photo-1476611317561-60117649dd94'),
    alt: 'Спокійний краєвид на світанку',
    credit: 'Unsplash',
  },
  contacts: {
    src: unsplash('photo-1486312338219-ce68d2c6f44d'),
    alt: 'Людина працює за ноутбуком',
    credit: 'Unsplash',
  },
};
