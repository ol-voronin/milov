import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Badge } from '@astryxdesign/core/Badge';
import { Container } from '@/components/Container';
import { ButtonLink } from '@/components/ButtonLink';
import { CallbackButton } from '@/components/CallbackDialog';
import { SituationCards } from '@/components/SituationCards';
import { SectionAccent } from '@/components/HeroVisual';
import { Reveal } from '@/components/Reveal';
import {
  HelpGrid,
  StepsBlock,
  CaseFlow,
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
import { photos } from '@/config/photos';

export const metadata: Metadata = {
  title: 'Юридична допомога родинам військових — виплати, документи, захист прав',
  description:
    'Допомагаємо родинам загиблих військовослужбовців оформити належні виплати, зібрати документи, оскаржити відмову та захистити права. Працюємо по всій Україні.',
  alternates: { canonical: '/' },
};

const homeFaq = faqItems.slice(0, 4);

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
      <Section variant="transparent" padding={8} paddingBlock={10}>
        <Container gap={6}>
          <Grid columns={{ minWidth: 340, max: 2 }} gap={8} align="center">
            <VStack gap={4}>
              <SectionAccent />
              <Heading level={1} type="display-3" textWrap="balance">
                Юридична допомога родинам військових
              </Heading>
              <Text as="p" type="large" color="secondary" textWrap="pretty">
                Оформимо належні виплати, зберемо документи та оскаржимо
                відмову. Просто залиште номер — юрист пояснить, з чого почати.
              </Text>
              <HStack gap={3} wrap="wrap">
                <CallbackButton label="Замовити дзвінок" size="lg" />
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
            <Reveal delay={1}>
              {/* Фото — безкоштовний фотосток Unsplash (src/config/photos.ts).
                  TODO: за бажанням замініть на власне фото — без сцен горя. */}
              <span className="hero-photo-frame">
                <img
                  src={photos.home.src}
                  alt={photos.home.alt}
                  loading="eager"
                  fetchPriority="high"
                />
                <span className="hero-photo-accent" aria-hidden="true" />
              </span>
            </Reveal>
          </Grid>
        </Container>
      </Section>

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

      {/* Команда */}
      <Section variant="muted" padding={8} paddingBlock={10}>
        <Container>
          <Reveal>
            <TeamBlock />
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

      {/* Форма */}
      <CallbackSection />

      {/* Фінальний CTA */}
      <FinalCta />
    </>
  );
}
