'use client';

/**
 * Блок показників практики на головній сторінці.
 *
 * ⚠️ Цифри беруться з src/config/site.ts і мають бути правдивими та
 * підтверджуваними. Якщо масив порожній — блок не рендериться взагалі.
 */

import { Grid } from '@astryxdesign/core/Grid';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { practiceStats } from '@/config/site';
import { CallbackButton } from './CallbackDialog';

export function PracticeStats() {
  if (practiceStats.length === 0) return null;

  return (
    <VStack gap={5}>
      <VStack gap={3} maxWidth={720}>
        <span className="section-rule" aria-hidden="true" />
        <Heading level={2}>Практика в цифрах</Heading>
        <Text as="p" type="body" color="secondary" textWrap="pretty">
          З кожним зверненням працює конкретний адвокат, а не «команда
          фахівців». Ви знатимете, хто веде вашу справу, ще до початку роботи.
        </Text>
      </VStack>

      <Grid columns={{ minWidth: 260, max: 3 }} gap={4}>
        {practiceStats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <VStack gap={2}>
              <span className="stat-card__value">{stat.value}</span>
              <Text type="label" weight="semibold">
                {stat.label}
              </Text>
              <Text as="p" type="supporting">
                {stat.note}
              </Text>
            </VStack>
          </div>
        ))}
      </Grid>

      <HStack gap={3} wrap="wrap" vAlign="center">
        <CallbackButton label="Записатися на розмову" size="lg" />
        <Text type="supporting">Розмову веде адвокат, а не менеджер.</Text>
      </HStack>
    </VStack>
  );
}
