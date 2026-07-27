'use client';

import { Grid } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';
import { VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Blockquote } from '@astryxdesign/core/Blockquote';
import { reviews } from '@/content/reviews';

/**
 * Блок відгуків.
 * - НЕ показується, коли масив відгуків порожній.
 * - Підтримує анонімізацію (author — лише анонімізоване ім'я).
 * - Не містить деталей справи без письмової згоди (контролюється правилами
 *   у src/content/reviews.ts).
 */
export function Reviews() {
  if (reviews.length === 0) return null;

  return (
    <VStack gap={4}>
      <Heading level={2}>Відгуки</Heading>
      <Text as="p" type="supporting">
        Відгуки опубліковано з письмової згоди клієнтів, з анонімізацією.
        Результат в іншій справі може відрізнятися — кожна ситуація є унікальною.
      </Text>
      <Grid columns={{ minWidth: 300, max: 3 }} gap={4}>
        {reviews.map((r, i) => (
          <Card key={i} padding={5}>
            <VStack gap={3}>
              <Blockquote>{r.text}</Blockquote>
              <Text type="supporting">{r.author}</Text>
            </VStack>
          </Card>
        ))}
      </Grid>
    </VStack>
  );
}
