'use client';

import { Collapsible, CollapsibleGroup } from '@astryxdesign/core/Collapsible';
import { VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { faqCategories, type FaqItem } from '@/content/faq';
import { CallbackButton } from './CallbackDialog';

/**
 * Список поширених запитань.
 *
 * @param grouped — розбити на теми. Замір показав 12 позицій по 61px
 * із розривом 4px: суцільна смуга, у якій око не чіпляється за окреме
 * питання і не розуміє, чи є тут потрібна тема взагалі.
 * На головній сторінці показуються лише перші чотири, тож там
 * групування зайве.
 */
export function FaqList({
  items,
  grouped = false,
}: {
  items: FaqItem[];
  grouped?: boolean;
}) {
  if (!grouped) return <FaqGroup items={items} />;

  return (
    <VStack gap={8}>
      {faqCategories.map((cat) => {
        const inCat = items.filter((i) => i.category === cat.id);
        if (inCat.length === 0) return null;
        return (
          <VStack gap={3} key={cat.id}>
            <VStack gap={1}>
              <Heading level={3}>{cat.title}</Heading>
              <Text as="p" type="supporting">
                {cat.hint}
              </Text>
            </VStack>
            <FaqGroup items={inCat} />
          </VStack>
        );
      })}
    </VStack>
  );
}

function FaqGroup({ items }: { items: FaqItem[] }) {
  return (
    <CollapsibleGroup type="single" hasDividers>
      {items.map((item) => (
        <Collapsible
          key={item.id}
          value={item.id}
          defaultIsOpen={false}
          trigger={
            <Text type="large" weight="medium">
              {item.question}
            </Text>
          }
        >
          <VStack gap={4} paddingBlock={2} hAlign="start" maxWidth={780}>
            <Text as="p" type="body" color="secondary" textWrap="pretty">
              {item.answer}
            </Text>
            <CallbackButton
              label="Обговорити мою ситуацію"
              variant="secondary"
              size="sm"
            />
          </VStack>
        </Collapsible>
      ))}
    </CollapsibleGroup>
  );
}
