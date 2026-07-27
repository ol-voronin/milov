'use client';

import { Button } from '@astryxdesign/core/Button';

/**
 * Постійна нижня кнопка «Замовити дзвінок» для мобільних пристроїв.
 * Показується лише на вузьких екранах (клас .mobile-call-cta у globals.css);
 * контент сторінки має нижній відступ, щоб кнопка його не перекривала.
 */
export function MobileCallCta() {
  return (
    <nav className="mobile-call-cta" aria-label="Швидке замовлення дзвінка">
      <Button label="Замовити дзвінок" variant="primary" href="/#callback" size="lg" />
    </nav>
  );
}
