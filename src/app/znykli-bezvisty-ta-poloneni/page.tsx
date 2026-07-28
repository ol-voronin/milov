import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { List, ListItem } from '@astryxdesign/core/List';
import { Banner } from '@astryxdesign/core/Banner';
import { Container } from '@/components/Container';
import { PageHero, NumberedSteps } from '@/components/ContentBlocks';
import { LegalNotice, LegalMeta, OfficialSources } from '@/components/LegalComponents';
import { CallbackSection } from '@/components/CallbackSection';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';
import { officialSources } from '@/content/payments';
import { photos } from '@/config/photos';

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
        lead="Пояснюємо порядок звернень і належні родині кошти — простими словами."
        crumbs={[{ label: 'Зниклі безвісти та полонені' }]}
        photo={photos.missing}
      />

      <Section variant="transparent" padding={8} paddingBlock={8}>
        <Container gap={8} maxWidth={980}>
          <VStack gap={4}>
            <Heading level={2}>Основні кроки для родини</Heading>
            <NumberedSteps steps={familySteps} />
          </VStack>

          <VStack gap={4}>
            <Heading level={2}>Грошове забезпечення та виплати</Heading>
            <Text as="p" type="body" color="secondary" textWrap="pretty">
              На період відсутності за військовослужбовцем зазвичай зберігається
              грошове забезпечення, яке може отримувати родина. Допомагаємо
              з’ясувати умови й оформити звернення.
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

          <LegalNotice />
          <OfficialSources sources={officialSources} />
          <LegalMeta />
        </Container>
      </Section>

      <CallbackSection defaultTopic="missing" />
    </>
  );
}
