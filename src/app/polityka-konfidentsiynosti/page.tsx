import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { List, ListItem } from '@astryxdesign/core/List';
import { Container } from '@/components/Container';
import { PageHero } from '@/components/ContentBlocks';
import { LegalMeta, ReviewNote } from '@/components/LegalComponents';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Політика конфіденційності',
  description:
    'Як ми збираємо, використовуємо та захищаємо персональні дані відвідувачів сайту.',
  alternates: { canonical: '/polityka-konfidentsiynosti' },
};

/**
 * ШАБЛОН політики конфіденційності.
 * ⚠️ [ПОТРІБНА ПЕРЕВІРКА АДВОКАТОМ ПЕРЕД ПУБЛІКАЦІЄЮ]
 * Перед запуском адвокат має перевірити відповідність Закону України
 * «Про захист персональних даних» і фактичним процесам обробки.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Політика конфіденційності"
        lead="Ми збираємо мінімум даних — лише те, що потрібно, щоб зв’язатися з вами та опрацювати звернення."
      />

      <Section variant="transparent" padding={8} paddingBlock={0}>
        <Container gap={6} maxWidth={820}>
          <ReviewNote>
            [ПОТРІБНА ПЕРЕВІРКА АДВОКАТОМ ПЕРЕД ПУБЛІКАЦІЄЮ] Цей текст є
            шаблоном. Перед публікацією його має перевірити та затвердити
            адвокат з урахуванням фактичних процесів обробки даних.
          </ReviewNote>

          <VStack gap={3}>
            <Heading level={2}>1. Хто ми</Heading>
            <Text as="p" type="body" color="secondary">
              Володільцем персональних даних є {site.legalEntityName} (далі —
              «ми»). Контакт із питань персональних даних: {site.privacyContact}.
            </Text>
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>2. Які дані ми збираємо</Heading>
            <List>
              <ListItem label="Ім’я та номер телефону — коли ви замовляєте дзвінок через форму." />
              <ListItem label="Тема звернення та короткий опис ситуації — якщо ви вирішили їх вказати." />
              <ListItem label="Зручний спосіб і час зв’язку — якщо вказані." />
              <ListItem label="Службові UTM-мітки кампанії та сторінку, з якої надіслано форму (без персональних даних)." />
            </List>
            <Text as="p" type="body" color="secondary">
              Ми свідомо просимо не надсилати через сайт паспортні дані, РНОКПП,
              банківські реквізити, медичні відомості та інші чутливі дані.
            </Text>
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>3. Для чого ми використовуємо дані</Heading>
            <List>
              <ListItem label="Щоб зателефонувати вам і відповісти на звернення." />
              <ListItem label="Щоб підготуватися до розмови (тема звернення)." />
              <ListItem label="Щоб виконати вимоги законодавства, якщо вони застосовні." />
            </List>
            <Text as="p" type="body" color="secondary">
              Ми не використовуємо ваші дані для розсилок без окремої згоди та не
              передаємо їх рекламним системам. Текст вашого звернення не
              передається сервісам аналітики.
            </Text>
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>4. Правова підстава обробки</Heading>
            <Text as="p" type="body" color="secondary">
              Обробка здійснюється на підставі вашої згоди, яку ви надаєте,
              позначаючи відповідне поле у формі. Ви можете відкликати згоду в
              будь-який час, звернувшись на {site.privacyContact}.
            </Text>
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>5. Скільки зберігаються дані</Heading>
            <Text as="p" type="body" color="secondary">
              Заявки зберігаються протягом обмеженого строку, визначеного
              внутрішньою політикою зберігання даних, після чого видаляються.
            </Text>
            <ReviewNote>
              Вкажіть конкретний строк зберігання, узгоджений із власником
              сайту (див. LEAD_RETENTION_DAYS).
            </ReviewNote>
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>6. Кому можуть передаватися дані</Heading>
            <Text as="p" type="body" color="secondary">
              Доступ до заявок має обмежене коло осіб команди. Технічно дані
              можуть оброблятися постачальниками інфраструктури (хостинг,
              захищена CRM або поштовий сервіс), які діють за нашими
              інструкціями.
            </Text>
            <ReviewNote>Перелічіть фактичних процесорів даних.</ReviewNote>
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>7. Ваші права</Heading>
            <List>
              <ListItem label="Дізнатися, які дані про вас ми обробляємо." />
              <ListItem label="Вимагати виправлення неточних даних." />
              <ListItem label="Вимагати видалення вашого звернення." />
              <ListItem label="Відкликати згоду на обробку." />
              <ListItem label="Оскаржити обробку до Уповноваженого Верховної Ради України з прав людини або до суду." />
            </List>
            <Text as="p" type="body" color="secondary">
              Для реалізації прав напишіть на {site.privacyContact}. Ми
              відповімо у строки, встановлені законодавством.
            </Text>
          </VStack>

          <VStack gap={3}>
            <Heading level={2}>8. Файли cookie та аналітика</Heading>
            <Text as="p" type="body" color="secondary">
              Сайт не використовує рекламних трекерів. Якщо буде підключено
              знеособлену аналітику відвідуваності, вона не отримуватиме вміст
              ваших звернень.
            </Text>
            <ReviewNote>
              Оновіть розділ відповідно до фактично підключених сервісів.
            </ReviewNote>
          </VStack>

          <LegalMeta />
        </Container>
      </Section>
    </>
  );
}
