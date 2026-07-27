'use client';

import type { ComponentType, SVGProps } from 'react';
import { Grid } from '@astryxdesign/core/Grid';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Icon } from '@astryxdesign/core/Icon';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import {
  DocumentTextIcon,
  ClockIcon,
  XCircleIcon,
  UsersIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { situations } from '@/content/situations';

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

const situationIcons: Record<string, HeroIcon> = {
  death: DocumentTextIcon,
  delay: ClockIcon,
  refusal: XCircleIcon,
  dispute: UsersIcon,
  missing: MagnifyingGlassIcon,
  other: ChatBubbleLeftRightIcon,
};

/**
 * Блок «Що сталося?» — великі картки ситуацій з іконками.
 */
export function SituationCards() {
  return (
    <Grid columns={{ minWidth: 300, max: 3 }} gap={4}>
      {situations.map((s) => {
        const CardIcon = situationIcons[s.id] ?? DocumentTextIcon;
        return (
          <ClickableCard
            key={s.id}
            label={s.title}
            href={s.id === 'other' ? `/#callback` : s.href}
            padding={5}
          >
            <VStack gap={3} minHeight={170} vAlign="between">
              <VStack gap={3}>
                <span className="icon-medallion" aria-hidden="true">
                  <Icon icon={CardIcon} size="lg" color="accent" />
                </span>
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
        );
      })}
    </Grid>
  );
}
