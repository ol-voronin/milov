import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Link } from '@astryxdesign/core/Link';
import { Container } from '@/components/Container';
import { CallbackSection } from '@/components/CallbackSection';
import { SectionAccent } from '@/components/HeroVisual';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Замовити дзвінок юриста',
  description:
    'Залиште ім’я та номер телефону — юрист зателефонує, поставить кілька уточнювальних запитань і пояснить, з чого почати у вашій ситуації.',
  alternates: { canonical: '/zamovyty-dzvinok' },
};

/**
 * Окрема спокійна сторінка форми (аудит F2, патерн GOV.UK start page):
 * мінімум відволікань, зрозумілий наступний крок.
 */
export default function CallbackPage() {
  return (
    <>
      <Section variant="transparent" padding={8} paddingBlock={6}>
        <Container gap={4} maxWidth={860}>
          <SectionAccent />
          <Heading level={1} textWrap="balance">
            Замовити дзвінок юриста
          </Heading>
          <Text as="p" type="large" color="secondary" textWrap="pretty">
            Це займе менше хвилини. Не потрібно одразу надсилати документи або
            детально описувати особисті обставини.
          </Text>
          <HStack gap={2} vAlign="center" wrap="wrap">
            <Text type="body" color="secondary">
              Зручніше подзвонити самостійно?
            </Text>
            <Link href={`tel:${site.phone}`} isStandalone>
              {site.phone}
            </Link>
            <Text type="supporting">({site.workingHours})</Text>
          </HStack>
        </Container>
      </Section>

      <CallbackSection
        title="Форма заявки"
        description="Обов’язкові лише ім’я, телефон і тема. Решту можна розповісти голосом."
      />
    </>
  );
}
