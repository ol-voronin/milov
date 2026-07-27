import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { List, ListItem } from '@astryxdesign/core/List';
import { Banner } from '@astryxdesign/core/Banner';
import { Container } from '@/components/Container';
import { PageHero } from '@/components/ContentBlocks';
import { LegalNotice, LegalMeta, OfficialSources } from '@/components/LegalComponents';
import { CallbackSection } from '@/components/CallbackSection';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';
import { officialSources } from '@/content/payments';

export const metadata: Metadata = {
  title: 'Юридична допомога родинам зниклих безвісти та військовополонених',
  description:
    'Які права має родина зниклого безвісти або військовополоненого, чи зберігається грошове забезпечення, куди звертатися і як не стати жертвою шахраїв.',
  alternates: { canonical: '/znykli-bezvisty-ta-poloneni' },
};

const familySteps = [
  'Переконайтеся, що факт зникнення офіційно зафіксовано військовою частиною та внесено до відповідних реєстрів.',
  'Зверніться із заявою до правоохоронних органів про зникнення безвісти за особливих обставин.',
  'Станьте на облік у державних структурах, які опікуються родинами зниклих безвісти та полонених.',
  'З’ясуйте порядок отримання грошового забезпечення військовослужбовця на період відсутності.',
  'Зберігайте всі документи та листування — вони знадобляться на кожному наступному етапі.',
];

export default function MissingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Головна', path: '/' },
          { name: 'Зниклі безвісти та полонені', path: '/znykli-bezvisty-ta-poloneni' },
        ])}
      />

      <PageHero
        title="Зниклі безвісти та військовополонені: права родини"
        lead="Родина має право знати, що відбувається, отримувати належні кошти та юридичну підтримку. Пояснюємо порядок звернень простими словами."
      />

      <Section variant="transparent" padding={8} paddingBlock={0}>
        <Container gap={8}>
          <LegalNotice />

          <VStack gap={4}>
            <Heading level={2}>Основні кроки для родини</Heading>
            <List>
              {familySteps.map((s, i) => (
                <ListItem key={s} label={`${i + 1}. ${s}`} />
              ))}
            </List>
          </VStack>

          <VStack gap={4}>
            <Heading level={2}>Грошове забезпечення та виплати</Heading>
            <Text as="p" type="body" color="secondary" textWrap="pretty">
              На період, поки військовослужбовець вважається зниклим безвісти або
              перебуває в полоні, за ним зазвичай зберігається грошове
              забезпечення, яке може отримувати родина у визначеному порядку.
              Умови та порядок залежать від обставин — ми допомагаємо їх
              з’ясувати та оформити необхідні звернення.
            </Text>
          </VStack>

          <Banner
            status="warning"
            title="Обережно: шахраї"
            description="Не сплачуйте нікому за «інформацію про полонених» чи «пришвидшення обміну». Такі пропозиції — типова схема шахрайства щодо родин зниклих безвісти. Офіційна інформація надається державними органами безкоштовно."
          />

          <VStack gap={4}>
            <Heading level={2}>Чим допомагаємо ми</Heading>
            <List>
              <ListItem label="Пояснюємо права родини та порядок звернень до державних органів." />
              <ListItem label="Готуємо заяви й запити щодо статусу та виплат." />
              <ListItem label="Супроводжуємо отримання грошового забезпечення на період відсутності." />
              <ListItem label="Допомагаємо, якщо органи не відповідають або відмовляють." />
            </List>
          </VStack>

          <OfficialSources sources={officialSources} />
          <LegalMeta />
        </Container>
      </Section>

      <CallbackSection defaultTopic="missing" />
    </>
  );
}
