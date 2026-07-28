'use client';

import { CallbackButton } from './CallbackDialog';

/**
 * Постійна нижня кнопка «Замовити дзвінок» для мобільних пристроїв.
 * Відкриває модалку форми (клас .mobile-call-cta у globals.css);
 * контент сторінки має нижній відступ, щоб кнопка його не перекривала.
 */
export function MobileCallCta() {
  return (
    <nav className="mobile-call-cta" aria-label="Швидке замовлення дзвінка">
      <CallbackButton size="lg" width="100%" />
    </nav>
  );
}
