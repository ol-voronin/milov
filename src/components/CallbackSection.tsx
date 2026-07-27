'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Skeleton } from '@astryxdesign/core/Skeleton';
import { Container } from './Container';

/**
 * Форму підвантажуємо динамічно: RHF+Zod не потрапляють
 * у першу порцію JS кожної сторінки (аудит P1t).
 */
const CallbackForm = dynamic(
  () => import('./CallbackForm').then((m) => m.CallbackForm),
  {
    ssr: false,
    loading: () => <Skeleton height={320} />,
  },
);

type Props = {
  title?: string;
  description?: string;
  defaultTopic?: string;
};

export function CallbackSection({
  title = 'Замовити дзвінок юриста',
  description = 'Опишіть ситуацію або просто залиште номер телефону. Юрист зв’яжеться з вами, поставить декілька уточнювальних запитань і пояснить, з чого почати.',
  defaultTopic,
}: Props) {
  return (
    <Section variant="muted" padding={8}>
      <Container>
        <VStack gap={4}>
          <Heading level={2} id="callback">
            {title}
          </Heading>
          <Text as="p" type="body" color="secondary">
            {description}
          </Text>
          <Suspense fallback={null}>
            <CallbackForm defaultTopic={defaultTopic} />
          </Suspense>
        </VStack>
      </Container>
    </Section>
  );
}
