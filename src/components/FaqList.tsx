'use client';

import { Collapsible, CollapsibleGroup } from '@astryxdesign/core/Collapsible';
import { VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import type { FaqItem } from '@/content/faq';
import { ButtonLink } from './ButtonLink';

/**
 * FAQ на CollapsibleGroup із кнопкою «Обговорити мою ситуацію»
 * під кожною відповіддю.
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <CollapsibleGroup type="single" hasDividers>
      {items.map((item) => (
        <Collapsible
          key={item.id}
          value={item.id}
          defaultIsOpen={false}
          trigger={<Text type="large" weight="medium">{item.question}</Text>}
        >
          <VStack gap={3} paddingBlock={2} hAlign="start">
            <Text as="p" type="body" color="secondary">
              {item.answer}
            </Text>
            <ButtonLink
              label="Обговорити мою ситуацію"
              variant="secondary"
              href="/#callback"
            />
          </VStack>
        </Collapsible>
      ))}
    </CollapsibleGroup>
  );
}
