'use client';

import { Grid } from '@astryxdesign/core/Grid';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Icon } from '@astryxdesign/core/Icon';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { situations } from '@/content/situations';

/**
 * Блок «Що сталося?» — великі зрозумілі картки ситуацій.
 * Натискання відкриває відповідну сторінку або форму з підставленою темою.
 */
export function SituationCards() {
  return (
    <Grid columns={{ minWidth: 300, max: 3 }} gap={4}>
      {situations.map((s) => (
        <ClickableCard
          key={s.id}
          label={s.title}
          href={s.id === 'other' ? `/#callback` : s.href}
          padding={5}
        >
          <VStack gap={2} minHeight={140} vAlign="between">
            <VStack gap={2}>
              <Heading level={3}>{s.title}</Heading>
              <Text as="p" type="body" color="secondary">
                {s.description}
              </Text>
            </VStack>
            <HStack gap={1} vAlign="center">
              <Text type="label" color="accent" weight="medium">
                Докладніше
              </Text>
              <Icon icon={ArrowRightIcon} size="sm" color="accent" />
            </HStack>
          </VStack>
        </ClickableCard>
      ))}
    </Grid>
  );
}
