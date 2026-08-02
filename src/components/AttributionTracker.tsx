'use client';

/**
 * Фіксує джерело першого входу на сесію.
 *
 * Нічого не рендерить і нікуди не надсилає — лише кладе назву каналу
 * в sessionStorage, щоб форма заявки могла її прикласти до звернення.
 * Подробиці й межі приватності — у src/lib/attribution.ts.
 */

import { useEffect } from 'react';
import { captureAttribution } from '@/lib/attribution';

export function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
