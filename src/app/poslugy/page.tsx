import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Container } from '@/components/Container';
import {
  PageHero,
  HelpGrid,
  StepsBlock,
  CaseFlow,
  InlineCta,
} from '@/components/ContentBlocks';
import { PriceBlock } from '@/components/PriceBlock';
import { WeHelpBlock } from '@/components/WeHelpBlock';
import { NextSteps } from '@/components/NextSteps';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';
import { photos } from '@/config/photos';

export const metadata: Metadata = {
  title: 'Послуги: юридична допомога родинам військовослужбовців',
  description:
    'Перевірка права на виплати, аналіз документів, оскарження затримок і відмов, представництво в суді. Формати роботи та прозорий підхід до вартості.',
  alternates: { canonical: '/poslugy' },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Головна', path: '/' },
          { name: 'Послуги', path: '/poslugy' },
        ])}
      />

      <PageHero
        title="Послуги"
        lead="Від першої розмови до представництва в суді. Обсяг і вартість погоджуємо заздалегідь."
        crumbs={[{ label: 'Послуги' }]}
        statement="Ми не беремося за все підряд. Якщо в справі немає перспективи — скажемо про це на першій розмові, а не після авансу."
      />

      {/* Темний якір 1: як проходить робота */}
      <Section variant="transparent" padding={8} paddingBlock={10}>
        <Container>
          <CaseFlow tone="dark" />
        </Container>
      </Section>

      {/* З чим допомагаємо */}
      <Section variant="transparent" padding={8} paddingBlock={0}>
        <Container>
          <HelpGrid />
        </Container>
      </Section>

      {/* Темний якір 2: CTA в середині */}
      <Section variant="transparent" padding={8} paddingBlock={10}>
        <Container>
          <InlineCta
            title="Не знаєте, яка послуга вам потрібна?"
            text="Опишіть ситуацію телефоном — юрист скаже, з чого почати і чи потрібна взагалі платна допомога."
          />
        </Container>
      </Section>

      {/* Кроки роботи */}
      <Section variant="muted" padding={8} paddingBlock={10}>
        <Container>
          <StepsBlock />
        </Container>
      </Section>

      {/* Вартість */}
      <Section variant="transparent" padding={8} paddingBlock={10}>
        <Container rhythm="minor">
          <VStack gap={3} maxWidth={720}>
            <span className="section-rule" aria-hidden="true" />
            <Heading level={2}>Вартість і формати допомоги</Heading>
            <Text as="p" type="body" color="secondary" textWrap="pretty">
              Ми розмежовуємо організаційний дзвінок, консультацію і супровід
              справи — щоб ви платили лише за те, що дійсно потрібно.
            </Text>
          </VStack>
          <PriceBlock withHeading={false} />
        </Container>
      </Section>

      {/* Темний якір 3: чим допомагаємо */}
      <Section variant="transparent" padding={8} paddingBlock={0}>
        <Container>
          <WeHelpBlock
            title="Що саме ми зробимо з вашими документами"
            note="Не абстрактні «юридичні послуги», а конкретні дії з вашими документами."
            items={[
              'Письмовий висновок: які виплати вам належать і чого бракує.',
              'Готові заяви та запити — вам залишається лише подати або підписати.',
              'Контроль строків: ми стежимо, щоб орган відповів вчасно.',
              'Супровід оскарження, якщо орган мовчить або відмовляє.',
            ]}
          />
        </Container>
      </Section>

      <NextSteps page="services" />
    </>
  );
}
