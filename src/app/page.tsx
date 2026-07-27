import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Badge } from '@astryxdesign/core/Badge';
import { Container } from '@/components/Container';
import { ButtonLink } from '@/components/ButtonLink';
import { SituationCards } from '@/components/SituationCards';
import {
  HelpGrid,
  StepsBlock,
  PrepChecklist,
  FinalCta,
} from '@/components/ContentBlocks';
import { TeamBlock } from '@/components/TeamBlock';
import { TrustBlock } from '@/components/TrustBlock';
import { Reviews } from '@/components/Reviews';
import { FaqList } from '@/components/FaqList';
import { CallbackSection } from '@/components/CallbackSection';
import { JsonLd, faqSchema } from '@/components/JsonLd';
import { faqItems } from '@/content/faq';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Юридична допомога родинам військових — виплати, документи, захист прав',
  description:
    'Допомагаємо родинам загиблих військовослужбовців оформити належні виплати, зібрати документи, оскаржити відмову та захистити права. Працюємо по всій Україні.',
  alternates: { canonical: '/' },
};

const homeFaq = faqItems.slice(0, 6);

const trustSignals = [
  'Конфіденційно',
  'Працюємо по всій Україні',
  'Консультації онлайн і телефоном',
  'Пояснюємо без складних юридичних термінів',
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaq)} />

      {/* Hero */}
      <Section variant="transparent" padding={8}>
        <Container gap={6}>
          <VStack gap={4} maxWidth={760}>
            <Heading level={1} type="display-3" textWrap="balance">
              Юридична допомога родинам військових
            </Heading>
            <Text as="p" type="large" color="secondary" textWrap="pretty">
              Допомагаємо оформити належні виплати, зібрати документи, оскаржити
              відмову та захистити права членів родини.
            </Text>
            <Text as="p" type="body" color="secondary" textWrap="pretty">
              Опишіть ситуацію або залиште номер телефону. Юрист зв’яжеться з
              вами, поставить декілька уточнювальних запитань і пояснить, з чого
              почати.
            </Text>
            <HStack gap={3} wrap="wrap">
              <ButtonLink
                label="Замовити дзвінок"
                variant="primary"
                size="lg"
                href="/#callback"
              />
              <ButtonLink
                label="Обрати свою ситуацію"
                variant="secondary"
                size="lg"
                href="/#situatsii"
              />
            </HStack>
            <HStack gap={2} wrap="wrap">
              {trustSignals.map((signal) => (
                <Badge key={signal} variant="neutral" label={signal} />
              ))}
            </HStack>
            <Text as="p" type="supporting">
              {site.initialCallTerms}
            </Text>
          </VStack>
        </Container>
      </Section>

      {/* Що сталося? */}
      <Section variant="muted" padding={8}>
        <Container gap={4}>
          <Heading level={2} id="situatsii">
            Що сталося?
          </Heading>
          <Text as="p" type="body" color="secondary">
            Оберіть ситуацію, яка найбільше схожа на вашу, — покажемо, що можна
            зробити.
          </Text>
          <SituationCards />
        </Container>
      </Section>

      {/* З чим допомагаємо */}
      <Section variant="transparent" padding={8}>
        <Container>
          <HelpGrid />
        </Container>
      </Section>

      {/* Як проходить робота */}
      <Section variant="muted" padding={8}>
        <Container>
          <StepsBlock />
        </Container>
      </Section>

      {/* Що підготувати */}
      <Section variant="transparent" padding={8}>
        <Container>
          <PrepChecklist />
        </Container>
      </Section>

      {/* Команда */}
      <Section variant="muted" padding={8}>
        <Container>
          <TeamBlock />
        </Container>
      </Section>

      {/* Довіра */}
      <Section variant="transparent" padding={8}>
        <Container>
          <TrustBlock />
        </Container>
      </Section>

      {/* Відгуки: не показуються, поки масив порожній */}
      <Reviews />

      {/* FAQ */}
      <Section variant="muted" padding={8}>
        <Container gap={4}>
          <Heading level={2}>Поширені запитання</Heading>
          <FaqList items={homeFaq} />
          <ButtonLink
            label="Усі запитання та відповіді"
            variant="secondary"
            href="/faq"
          />
        </Container>
      </Section>

      {/* Форма */}
      <CallbackSection />

      {/* Фінальний CTA */}
      <FinalCta />
    </>
  );
}
