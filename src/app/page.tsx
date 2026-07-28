import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Container } from '@/components/Container';
import { ButtonLink } from '@/components/ButtonLink';
import { SituationCards } from '@/components/SituationCards';
import { Reveal } from '@/components/Reveal';
import { HomeHero } from '@/components/HomeHero';
import {
  HelpGrid,
  StepsBlock,
  CaseFlow,
  PrepChecklist,
  FinalCta,
} from '@/components/ContentBlocks';
import { PracticeStats } from '@/components/PracticeStats';
import { TrustBlock } from '@/components/TrustBlock';
import { Reviews } from '@/components/Reviews';
import { FaqList } from '@/components/FaqList';
import { JsonLd, faqSchema } from '@/components/JsonLd';
import { faqItems } from '@/content/faq';

export const metadata: Metadata = {
  title: 'Юридична допомога родинам військових — виплати, документи, захист прав',
  description:
    'Допомагаємо родинам загиблих військовослужбовців оформити належні виплати, зібрати документи, оскаржити відмову та захистити права. Працюємо по всій Україні.',
  alternates: { canonical: '/' },
};

const homeFaq = faqItems.slice(0, 4);

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaq)} />

      <HomeHero />

      {/* Що сталося? */}
      <Section variant="muted" padding={8} paddingBlock={10}>
        <Container gap={4}>
          <Reveal>
            <VStack gap={4}>
              <Heading level={2} id="situatsii">
                Що сталося?
              </Heading>
              <SituationCards />
            </VStack>
          </Reveal>
        </Container>
      </Section>

      {/* З чим допомагаємо */}
      <Section variant="transparent" padding={8} paddingBlock={10}>
        <Container>
          <Reveal>
            <HelpGrid />
          </Reveal>
        </Container>
      </Section>

      {/* Як проходить робота + шлях справи */}
      <Section variant="muted" padding={8} paddingBlock={10}>
        <Container gap={8}>
          <Reveal>
            <StepsBlock />
          </Reveal>
          <Reveal>
            <CaseFlow />
          </Reveal>
        </Container>
      </Section>

      {/* Що підготувати */}
      <Section variant="transparent" padding={8} paddingBlock={10}>
        <Container>
          <Reveal>
            <PrepChecklist />
          </Reveal>
        </Container>
      </Section>

      {/* Практика в цифрах */}
      <Section variant="muted" padding={8} paddingBlock={10}>
        <Container>
          <Reveal>
            <PracticeStats />
          </Reveal>
        </Container>
      </Section>

      {/* Довіра */}
      <Section variant="transparent" padding={8} paddingBlock={10}>
        <Container>
          <Reveal>
            <TrustBlock />
          </Reveal>
        </Container>
      </Section>

      {/* Відгуки: не показуються, поки масив порожній */}
      <Reviews />

      {/* FAQ */}
      <Section variant="muted" padding={8} paddingBlock={10}>
        <Container gap={4}>
          <Reveal>
            <VStack gap={4}>
              <Heading level={2}>Поширені запитання</Heading>
              <FaqList items={homeFaq} />
              <ButtonLink
                label="Усі запитання та відповіді"
                variant="secondary"
                href="/faq"
              />
            </VStack>
          </Reveal>
        </Container>
      </Section>

      {/* Фінальний CTA */}
      <FinalCta />
    </>
  );
}
