'use client';

import type { ReactNode } from 'react';
import { Center } from '@astryxdesign/core/Center';
import { VStack } from '@astryxdesign/core/Stack';

/**
 * Центрований контейнер сторінкового контенту з обмеженою шириною.
 *
 * ВЕРТИКАЛЬНИЙ РИТМ
 *
 * Замір до правки показав розкид відступів між смисловими блоками
 * від 20px до 160px на тих самих сторінках. Найгірші місця:
 * 20px перед «Вартість послуг», 32px між двома блоками «покроково»
 * на сторінці про затримку — два списки по чотири кроки зливалися
 * в один список із восьми.
 *
 * Тому замість довільного gap вводимо три рівні розділення:
 *
 *   rhythm="major"  96px — між великими смисловими розділами
 *   rhythm="minor"  64px — між підрозділами всередині розділу
 *   rhythm="tight"  40px — між блоками одного підрозділу
 *
 * Числовий gap лишається для випадків, де ритм не застосовний
 * (сітки карток, вузькі колонки).
 */
export type Rhythm = 'major' | 'minor' | 'tight';

export function Container({
  children,
  maxWidth = 1120,
  gap = 6,
  rhythm,
}: {
  children: ReactNode;
  maxWidth?: number;
  gap?: 0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
  /** Крок вертикального ритму між прямими дітьми контейнера */
  rhythm?: Rhythm;
}) {
  return (
    <Center axis="horizontal">
      <VStack
        gap={rhythm ? 0 : gap}
        width="100%"
        maxWidth={maxWidth}
        className={rhythm ? `rhythm rhythm--${rhythm}` : undefined}
      >
        {children}
      </VStack>
    </Center>
  );
}
