/**
 * Службові прапорці інтерфейсу.
 *
 * showReviewFlags — чи показувати службові позначки
 * «[ПОТРІБНА ПЕРЕВІРКА АДВОКАТОМ ПЕРЕД ПУБЛІКАЦІЄЮ]».
 * На продакшні вони приховані (аудит T1): відвідувач не має бачити
 * внутрішні редакційні мітки. Увімкнути на проді можна змінною
 * NEXT_PUBLIC_SHOW_REVIEW_FLAGS=1 (наприклад, на staging).
 */
export const showReviewFlags =
  process.env.NEXT_PUBLIC_SHOW_REVIEW_FLAGS === '1' ||
  process.env.NODE_ENV === 'development';
