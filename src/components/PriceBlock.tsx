'use client';

import { Card } from '@astryxdesign/core/Card';
import { VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Table } from '@astryxdesign/core/Table';
import { pricing } from '@/config/site';
import { serviceFormats } from '@/content/services';

/**
 * Прозорий блок вартості.
 * Ціни беруться з конфігурації; поки значення порожні — показується
 * чесний текст про погодження вартості (без вигаданих цифр).
 */
const priceRows = [
  { label: 'Первинний організаційний дзвінок', value: pricing.initialCallPrice },
  { label: 'Юридична консультація', value: pricing.consultationPrice },
  { label: 'Аналіз документів', value: pricing.documentAnalysisPrice },
  { label: 'Супровід справи', value: pricing.caseSupportPricingModel },
];

export function PriceBlock() {
  const hasAnyPrice = priceRows.some((r) => r.value !== '');

  return (
    <VStack gap={4}>
      <Heading level={2}>Вартість послуг</Heading>
      <Text as="p" type="body" color="secondary">
        {pricing.fallbackText}
      </Text>

      {hasAnyPrice ? (
        <Table
          data={priceRows.filter((r) => r.value !== '')}
          columns={[
            { key: 'label', header: 'Послуга' },
            { key: 'value', header: 'Вартість' },
          ]}
          idKey="label"
        />
      ) : null}

      <VStack gap={3}>
        <Heading level={3}>Формати допомоги</Heading>
        {serviceFormats.map((f) => (
          <Card key={f.title} padding={4} variant="muted">
            <VStack gap={1}>
              <Text type="label" weight="semibold">
                {f.title}
              </Text>
              <Text as="p" type="supporting">
                {f.description}
              </Text>
            </VStack>
          </Card>
        ))}
      </VStack>
    </VStack>
  );
}
