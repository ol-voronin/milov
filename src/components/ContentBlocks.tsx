'use client';

/**
 * Контентні блоки, які повторюються на сторінках:
 * - PageHero — вступ сторінки
 * - StepsBlock — «Як проходить робота»
 * - PrepChecklist — «Що підготувати до консультації»
 * - HelpGrid — «З чим допомагаємо»
 * - FinalCta — фінальний заклик
 * - PaymentsList — перелік видів виплат (з CMS-моделі)
 */

import { Section } from '@astryxdesign/core/Section';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Icon } from '@astryxdesign/core/Icon';
import { List, ListItem } from '@astryxdesign/core/List';
import { Badge } from '@astryxdesign/core/Badge';
import {
  CheckCircleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { helpItems } from '@/content/services';
import {
  payments,
  NEEDS_LAWYER_REVIEW,
  type PaymentInfo,
} from '@/content/payments';
import { Container } from './Container';
import { ButtonLink } from './ButtonLink';
import { OfficialSources, ReviewFlag } from './LegalComponents';

export function PageHero({
  title,
  lead,
  extra,
  id,
}: {
  title: string;
  lead: string;
  extra?: string;
  id?: string;
}) {
  return (
    <Section variant="transparent" padding={8}>
      <Container gap={4}>
        <Heading level={1} textWrap="balance" id={id}>
          {title}
        </Heading>
        <Text as="p" type="large" color="secondary" textWrap="pretty">
          {lead}
        </Text>
        {extra ? (
          <Text as="p" type="body" color="secondary" textWrap="pretty">
            {extra}
          </Text>
        ) : null}
      </Container>
    </Section>
  );
}

const steps = [
  {
    title: 'Ви залишаєте номер',
    text: 'Не потрібно одразу надсилати документи або детально описувати особисту ситуацію.',
  },
  {
    title: 'Ми уточнюємо обставини',
    text: 'З’ясовуємо, що сталося, які документи вже є та куди ви зверталися.',
  },
  {
    title: 'Формуємо план дій',
    text: 'Пояснюємо можливі підстави, документи, строки та наступні кроки.',
  },
  {
    title: 'Супроводжуємо справу',
    text: 'За домовленістю готуємо документи, звернення, скарги або представляємо інтереси клієнта.',
  },
];

export function StepsBlock() {
  return (
    <VStack gap={4}>
      <Heading level={2}>Як проходить робота</Heading>
      <Grid columns={{ minWidth: 240, max: 4 }} gap={4}>
        {steps.map((step, i) => (
          <Card key={step.title} padding={5}>
            <VStack gap={2}>
              <Badge variant="info" label={`Крок ${i + 1}`} />
              <Heading level={3}>{step.title}</Heading>
              <Text as="p" type="body" color="secondary">
                {step.text}
              </Text>
            </VStack>
          </Card>
        ))}
      </Grid>
      <Text as="p" type="supporting">
        Строки розгляду заяв і призначення державних виплат залежать від органу
        та обставин — ми не обіцяємо фіксованих строків отримання виплати.
      </Text>
    </VStack>
  );
}

const prepItems = [
  'повідомлення або документ про загибель чи смерть',
  'свідоцтво про смерть, якщо вже отримано',
  'документи, що підтверджують родинний зв’язок',
  'відповіді військової частини, ТЦК та СП або інших органів',
  'копії поданих заяв',
  'рішення про призначення або відмову у виплаті',
  'будь-яке листування, що стосується справи',
];

export function PrepChecklist() {
  return (
    <VStack gap={4}>
      <Heading level={2}>Що можна підготувати до консультації</Heading>
      <Text as="p" type="body" color="secondary">
        Якщо чогось із переліку немає — це не перешкода. Почати можна з того, що є.
      </Text>
      <List>
        {prepItems.map((item) => (
          <ListItem
            key={item}
            label={item}
            startContent={<Icon icon={CheckCircleIcon} size="sm" color="accent" />}
          />
        ))}
      </List>
      <Text as="p" type="supporting">
        Не надсилайте паспорт, РНОКПП, банківські реквізити, медичні документи
        або повний пакет матеріалів через звичайну форму на сайті. Юрист пояснить,
        як безпечно передати документи після первинної розмови.
      </Text>
    </VStack>
  );
}

export function HelpGrid({ limit }: { limit?: number }) {
  const items = limit ? helpItems.slice(0, limit) : helpItems;
  return (
    <VStack gap={4}>
      <Heading level={2}>З чим допомагаємо</Heading>
      <Grid columns={{ minWidth: 280, max: 3 }} gap={4}>
        {items.map((item) => (
          <Card key={item.title} padding={4} variant="muted">
            <VStack gap={1}>
              <HStack gap={2} vAlign="center">
                <Icon icon={DocumentTextIcon} size="sm" color="accent" />
                <Text type="label" weight="semibold">
                  {item.title}
                </Text>
              </HStack>
              <Text as="p" type="supporting">
                {item.description}
              </Text>
            </VStack>
          </Card>
        ))}
      </Grid>
      <Text as="p" type="supporting">
        Перелік виплат і можливостей у кожній ситуації є різним — наявність
        послуги в списку не означає, що всі виплати гарантовано доступні кожному.
      </Text>
    </VStack>
  );
}

export function FinalCta() {
  return (
    <Section variant="transparent" padding={8}>
      <Container gap={4}>
        <Heading level={2} textWrap="balance">
          Не знаєте, з чого почати?
        </Heading>
        <Text as="p" type="body" color="secondary">
          Залиште номер телефону. Ми уточнимо основні обставини та пояснимо,
          який наступний крок може бути доречним у вашій ситуації.
        </Text>
        <VStack gap={2} hAlign="start">
          <ButtonLink
            label="Замовити дзвінок юриста"
            variant="primary"
            size="lg"
            href="/#callback"
          />
          <Text as="p" type="supporting">
            Не потрібно одразу надсилати документи або детально описувати
            особисті обставини.
          </Text>
        </VStack>
      </Container>
    </Section>
  );
}

/**
 * Перелік видів виплат із CMS-моделі (src/content/payments.ts).
 * Неперевірені значення (позначка NEEDS_LAWYER_REVIEW) не показуються
 * відвідувачам як факти — замість них службова позначка для редактора.
 */
export function PaymentsList({ items = payments }: { items?: PaymentInfo[] }) {
  return (
    <VStack gap={4}>
      {items.map((p) => (
        <Card key={p.id} padding={5}>
          <VStack gap={3}>
            <Heading level={3} id={p.id}>
              {p.title}
            </Heading>
            <Text as="p" type="body" color="secondary">
              {p.plainDescription}
            </Text>

            {isVerifiedValue(p.amount) ? (
              <MetaRow label="Розмір" value={p.amount} />
            ) : (
              <ReviewFlag visible={p.amount === NEEDS_LAWYER_REVIEW} />
            )}
            {isVerifiedValue(p.eligibilitySummary) ? (
              <MetaRow label="Хто може мати право" value={p.eligibilitySummary} />
            ) : (
              <ReviewFlag visible={p.eligibilitySummary === NEEDS_LAWYER_REVIEW} />
            )}
            {isVerifiedValue(p.paymentSchedule) ? (
              <MetaRow label="Порядок виплати" value={p.paymentSchedule} />
            ) : (
              <ReviewFlag visible={p.paymentSchedule === NEEDS_LAWYER_REVIEW} />
            )}
            {isVerifiedValue(p.importantExceptions) ? (
              <MetaRow label="Важливі винятки" value={p.importantExceptions} />
            ) : (
              <ReviewFlag visible={p.importantExceptions.includes(NEEDS_LAWYER_REVIEW)} />
            )}

            <OfficialSources sources={p.officialSource} />
          </VStack>
        </Card>
      ))}
    </VStack>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <VStack gap={0.5}>
      <Text type="label" weight="semibold">
        {label}
      </Text>
      <Text as="p" type="body" color="secondary">
        {value}
      </Text>
    </VStack>
  );
}

function isVerifiedValue(value: string): boolean {
  return value !== '' && !value.includes(NEEDS_LAWYER_REVIEW);
}
