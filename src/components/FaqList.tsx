'use client';

import { Collapsible, CollapsibleGroup } from '@astryxdesign/core/Collapsible';
import { VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import type { FaqItem } from '@/content/faq';
import { CallbackButton } from './CallbackDialog';

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
          <VStack gap={4} paddingBlock={1} hAlign="start" maxWidth={780}>
            <Text as="p" type="body" color="secondary" textWrap="pretty">
              {item.answer}
            </Text>
            <CallbackButton label="Обговорити мою ситуацію" variant="secondary" />
          </VStack>
        </Collapsible>
      ))}
    </CollapsibleGroup>
  );
}
