'use client';

/**
 * Список пунктів з акцентними маркерами.
 * Замість Astryx List/ListItem, який обрізає довгий текст в один рядок:
 * тут текст переноситься повністю.
 *
 * tone задає колір маркера — щоб блоки на сторінці не були монохромними.
 */

import type { ReactNode } from 'react';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { Icon } from '@astryxdesign/core/Icon';
import {
  CheckIcon,
  XMarkIcon,
  ArrowRightIcon,
  MinusIcon,
} from '@heroicons/react/20/solid';

export type CheckListTone = 'navy' | 'gold' | 'mist' | 'danger' | 'plain';

const markerIcon = {
  navy: CheckIcon,
  gold: CheckIcon,
  mist: ArrowRightIcon,
  danger: XMarkIcon,
  plain: MinusIcon,
};

export function CheckList({
  items,
  tone = 'navy',
  columns = 1,
}: {
  items: (string | ReactNode)[];
  tone?: CheckListTone;
  columns?: 1 | 2;
}) {
  const MarkerIcon = markerIcon[tone];
  return (
    <VStack gap={3} as="ul" className={`check-list${columns === 2 ? ' check-list--two' : ''}`}>
      {items.map((item, i) => (
        <HStack gap={3} vAlign="start" as="li" key={typeof item === 'string' ? item : i}>
          <span className={`check-marker check-marker--${tone}`} aria-hidden="true">
            <Icon icon={MarkerIcon} size="sm" color="inherit" />
          </span>
          {typeof item === 'string' ? (
            <Text as="span" type="body" color="secondary" textWrap="pretty">
              {item}
            </Text>
          ) : (
            item
          )}
        </HStack>
      ))}
    </VStack>
  );
}
