'use client';

import { Collapsible, CollapsibleGroup } from '@astryxdesign/core/Collapsible';
import { VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { faqCategories, type FaqItem } from '@/content/faq';
import { CallbackButton } from './CallbackDialog';

/**
 * Список поширених запитань.
 *
 * @param grouped — розбити на теми.
 *
 * ЧОМУ ГРУПИ ОФОРМЛЕНІ САМЕ ТАК. Спершу теми відрізнялися лише
 * заголовком, і на сторінці з дванадцяти питань межі груп не читалися:
 * заголовок теми конкурував за увагу з самими питаннями, які набрані
 * майже тим самим кеглем.
 *
 * Тепер кожна група — окремий блок із трьома ознаками одразу:
 *   1. колірна мітка збоку (три відтінки палітри, не три різні кольори);
 *   2. власна рамка, тобто видно, де група починається і де закінчується;
 *   3. лічильник питань — одразу зрозуміло, скільки тут дивитися.
 *
 * Три ознаки, а не одна, тому що на самий колір покладатися не можна:
 * приблизно кожен дванадцятий чоловік не розрізняє частину відтінків.
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
    <VStack gap={6}>
      {faqCategories.map((cat) => {
        const inCat = items.filter((i) => i.category === cat.id);
        if (inCat.length === 0) return null;
        return (
          <section
            className={`faq-group faq-group--${cat.accent}`}
            key={cat.id}
            aria-labelledby={`faq-${cat.id}`}
          >
            <div className="faq-group__head">
              <h3 className="faq-group__title" id={`faq-${cat.id}`}>
                {cat.title}
              </h3>
              <span className="faq-group__count">
                {inCat.length} {pluralQuestions(inCat.length)}
              </span>
              <p className="faq-group__hint">{cat.hint}</p>
            </div>
            <FaqGroup items={inCat} />
          </section>
        );
      })}
    </VStack>
  );
}

/** «1 питання», «2 питання», «5 питань» */
function pluralQuestions(n: number): string {
  const last = n % 10;
  const teen = n % 100 >= 11 && n % 100 <= 14;
  if (!teen && last === 1) return 'питання';
  if (!teen && last >= 2 && last <= 4) return 'питання';
  return 'питань';
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
