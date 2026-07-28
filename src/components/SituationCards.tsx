'use client';

import type { ComponentType, SVGProps } from 'react';
import { Grid } from '@astryxdesign/core/Grid';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Icon } from '@astryxdesign/core/Icon';
import { Link } from '@astryxdesign/core/Link';
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
import { useCallbackDialog } from './CallbackDialog';

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>;

const situationIcons: Record<string, HeroIcon> = {
  death: DocumentTextIcon,
  delay: ClockIcon,
  refusal: XCircleIcon,
  dispute: UsersIcon,
  missing: MagnifyingGlassIcon,
  other: ChatBubbleLeftRightIcon,
};

/** Легка колірна диференціація медальйонів (аудит V4) */
const medallionVariant: Record<string, string> = {
  death: '',
  delay: ' icon-medallion--sand',
  refusal: ' icon-medallion--slate',
  dispute: ' icon-medallion--sand',
  missing: '',
  other: ' icon-medallion--slate',
};

/**
 * Блок «Що сталося?» — великі картки ситуацій з іконками.
 */
export function SituationCards() {
  const { openCallback } = useCallbackDialog();
  return (
    <Grid columns={{ minWidth: 300, max: 3 }} gap={4}>
      {situations.map((s) => {
        const CardIcon = situationIcons[s.id] ?? DocumentTextIcon;
        const isOther = s.id === 'other';
        return (
          <ClickableCard
            key={s.id}
            label={s.title}
            href={isOther ? undefined : s.href}
            onClick={isOther ? () => openCallback('other') : undefined}
            padding={5}
          >
            <VStack gap={3} minHeight={170} vAlign="between">
              <VStack gap={3}>
                <span
                  className={`icon-medallion${medallionVariant[s.id] ?? ''}`}
                  aria-hidden="true"
                >
                  <Icon icon={CardIcon} size="lg" color="accent" />
                </span>
                <Heading level={3}>{s.title}</Heading>
                <Text as="p" type="body" color="secondary">
                  {s.description}
                </Text>
              </VStack>
              {/* Справжнє посилання всередині картки — краща семантика для SR (аудит A2) */}
              {isOther ? (
                <HStack gap={1} vAlign="center">
                  <Text type="label" color="accent" weight="medium">
                    Замовити дзвінок
                  </Text>
                  <Icon icon={ArrowRightIcon} size="sm" color="accent" />
                </HStack>
              ) : (
                <Link href={s.href} isStandalone>
                  <HStack gap={1} vAlign="center">
                    Докладніше
                    <Icon icon={ArrowRightIcon} size="sm" color="inherit" />
                  </HStack>
                </Link>
              )}
            </VStack>
          </ClickableCard>
        );
      })}
    </Grid>
  );
}
