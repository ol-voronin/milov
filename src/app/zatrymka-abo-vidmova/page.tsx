import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { List, ListItem } from '@astryxdesign/core/List';
import { Container } from '@/components/Container';
import { PageHero, NumberedSteps } from '@/components/ContentBlocks';
import { LegalNotice, LegalMeta, OfficialSources } from '@/components/LegalComponents';
import { CallbackSection } from '@/components/CallbackSection';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';
import { officialSources } from '@/content/payments';
import { photos } from '@/config/photos';

export const metadata: Metadata = {
  title: 'Затримка або відмова у виплаті родині військового: що робити',
  description:
    'Виплату родині загиблого затримують або відмовили? Пояснюємо, як зафіксувати бездіяльність, оскаржити відмову та які кроки реально зрушують справу.',
  alternates: { canonical: '/zatrymka-abo-vidmova' },
};

const delaySteps = [
  'Перевірте, що заява зареєстрована: вхідний номер або поштове підтвердження.',
  'Надішліть письмовий запит про стан розгляду.',
  'Після спливу строків — скарга на бездіяльність до вищого органу.',
  'Якщо результату немає — позов до адміністративного суду.',
];

const refusalSteps = [
  'Отримайте письмову відмову з посиланням на підстави.',
  'Проаналізуйте, чи можна усунути причину без суду (наприклад, донести документ).',
  'Подайте скаргу до вищого органу або позов до суду — залежно від ситуації.',
  'Слідкуйте за строками оскарження: вони обмежені.',
];

export default function DelayRefusalPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Головна', path: '/' },
          { name: 'Затримка або відмова у виплаті', path: '/zatrymka-abo-vidmova' },
        ])}
      />

      <PageHero
        title="Затримка або відмова у виплаті"
        lead="Мовчання органу та необґрунтована відмова оскаржуються. Головне — правильно зафіксувати факти."
        crumbs={[{ label: 'Затримка або відмова' }]}
        photo={photos.delay}
      />

      <Section variant="transparent" padding={8} paddingBlock={8}>
        <Container gap={8} maxWidth={980}>
          <VStack gap={4}>
            <Heading level={2}>Виплату затримують: покроково</Heading>
            <Text as="p" type="body" color="secondary">
              Затримка — це не завжди відмова. Але тривале мовчання потрібно
              переводити в юридичну площину:
            </Text>
            <NumberedSteps steps={delaySteps} />
          </VStack>

          <VStack gap={4}>
            <Heading level={2} id="vidmova">
              Отримали відмову: покроково
            </Heading>
            <Text as="p" type="body" color="secondary">
              Відмова має бути письмовою та вмотивованою. Саме з її тексту
              починається аналіз:
            </Text>
            <NumberedSteps steps={refusalSteps} />
            <Text as="p" type="body" color="secondary" textWrap="pretty">
              Ми не обіцяємо результат без аналізу документів. Спочатку
              з’ясовуємо обставини, перевіряємо правові підстави та пояснюємо
              можливі варіанти дій.
            </Text>
          </VStack>

          <VStack gap={4}>
            <Heading level={2}>Чим допомагаємо ми</Heading>
            <List>
              <ListItem label="Аналізуємо відповідь або її відсутність і визначаємо правову позицію." />
              <ListItem label="Готуємо запити, скарги та адвокатські звернення." />
              <ListItem label="Контролюємо строки та проходження документів." />
              <ListItem label="За потреби — представляємо інтереси в суді." />
            </List>
          </VStack>

          <LegalNotice />
          <OfficialSources sources={officialSources} />
          <LegalMeta />
        </Container>
      </Section>

      <CallbackSection defaultTopic="delay" />
    </>
  );
}
