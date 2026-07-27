import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Container } from '@/components/Container';
import { PageHero } from '@/components/ContentBlocks';
import { LegalMeta, ReviewNote } from '@/components/LegalComponents';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Умови користування сайтом',
  description: 'Правила користування сайтом та межі відповідальності.',
  alternates: { canonical: '/umovy-korystuvannia' },
};

/**
 * ШАБЛОН умов користування.
 * ⚠️ [ПОТРІБНА ПЕРЕВІРКА АДВОКАТОМ ПЕРЕД ПУБЛІКАЦІЄЮ]
 */
export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Умови користування сайтом"
        lead="Коротко і чесно про те, чим є цей сайт і чим він не є."
      />

      <Section variant="transparent" padding={8} paddingBlock={0}>
        <Container gap={6} maxWidth={820}>
          <ReviewNote>
            [ПОТРІБНА ПЕРЕВІРКА АДВОКАТОМ ПЕРЕД ПУБЛІКАЦІЄЮ] Текст є шаблоном
            і потребує затвердження адвокатом.
          </ReviewNote>

          <VStack gap={3}>
            <Heading level={2}>1. Інформаційний характер</Heading>
            <Text as="p" type="body" color="secondary">
              Матеріали сайту мають загальний інформаційний характер і не є
              індивідуальною юридичною консультацією. Право на виплати, їх
              розмір, порядок та строки залежать від обставин справи і чинної
              редакції законодавства. Використання сайту не створює відносин
              «клієнт — юрист/адвокат»: такі відносини виникають лише після
              укладення договору про надання правової допомоги.
            </Text>
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>2. Не державний ресурс</Heading>
            <Text as="p" type="body" color="secondary">
              Цей сайт не є сайтом Міністерства оборони України, ТЦК та СП,
              військової частини або іншого державного органу. Ми не приймаємо
              заяв на державні виплати і не ухвалюємо рішень про їх призначення.
            </Text>
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>3. Точність інформації</Heading>
            <Text as="p" type="body" color="secondary">
              Ми прагнемо підтримувати матеріали в актуальному стані та вказуємо
              дату останнього юридичного оновлення. Водночас законодавство
              змінюється, тому перед ухваленням рішень радимо звіритися з
              офіційними джерелами або отримати консультацію.
            </Text>
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>4. Інтелектуальна власність</Heading>
            <Text as="p" type="body" color="secondary">
              Тексти та матеріали сайту належать {site.legalEntityName}.
              Використання матеріалів можливе з посиланням на джерело.
            </Text>
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>5. Контакти</Heading>
            <Text as="p" type="body" color="secondary">
              З питань роботи сайту: {site.email}. З питань персональних даних:{' '}
              {site.privacyContact}.
            </Text>
          </VStack>

          <LegalMeta />
        </Container>
      </Section>
    </>
  );
}
