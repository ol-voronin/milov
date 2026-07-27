'use client';

import type { ReactNode } from 'react';
import { Center } from '@astryxdesign/core/Center';
import { VStack } from '@astryxdesign/core/Stack';

/**
 * Центрований контейнер сторінкового контенту з обмеженою шириною.
 */
export function Container({
  children,
  maxWidth = 1120,
  gap = 6,
}: {
  children: ReactNode;
  maxWidth?: number;
  gap?: 0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
}) {
  return (
    <Center axis="horizontal">
      <VStack gap={gap} width="100%" maxWidth={maxWidth}>
        {children}
      </VStack>
    </Center>
  );
}
