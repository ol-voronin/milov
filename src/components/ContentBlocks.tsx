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
import {
  CheckCircleIcon,
  DocumentTextIcon,
  PhoneArrowUpRightIcon,
  ChatBubbleLeftRightIcon,
  MapIcon,
  ShieldCheckIcon,
  DocumentPlusIcon,
  BuildingLibraryIcon,
  ScaleIcon,
  BanknotesIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/24/outline';
import { helpItems } from '@/content/services';
import {
  payments,
  NEEDS_LAWYER_REVIEW,
  type PaymentInfo,
} from '@/content/payments';
import { useState } from 'react';
import { Breadcrumbs, BreadcrumbItem } from '@astryxdesign/core/Breadcrumbs';
import { Button } from '@astryxdesign/core/Button';
import { Container } from './Container';
import { ButtonLink } from './ButtonLink';
import { OfficialSources, ReviewFlag } from './LegalComponents';
import { SectionAccent } from './HeroVisual';
import { PagePictogram, type PictogramName } from './PagePictogram';
import { CallbackButton } from './CallbackDialog';

export type Crumb = { label: string; href?: string };

export function PageHero({
  title,
  lead,
  extra,
  id,
  crumbs,
  pictogram,
  photo,
}: {
  title: string;
  lead: string;
  extra?: string;
  id?: string;
  /** Хлібні крихти (аудит N2); головна додається автоматично */
  crumbs?: Crumb[];
  /** Тематична піктограма — коли фото не задано */
  pictogram?: PictogramName;
  /** Фотобанер сторінки (безкоштовний фотосток, src/config/photos.ts) */
  photo?: { src: string; alt: string };
}) {
  const textBlock = (
    <VStack gap={3} maxWidth={720}>
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
      <HStack gap={3} wrap="wrap">
        <CallbackButton />
      </HStack>
    </VStack>
  );

  return (
    <Section variant="muted" padding={8} paddingBlock={8}>
      <Container gap={4}>
        {crumbs ? (
          <Breadcrumbs variant="supporting" label="Ви тут">
            <BreadcrumbItem href="/">Головна</BreadcrumbItem>
            {crumbs.map((c, i) => (
              <BreadcrumbItem
                key={c.label}
                href={c.href}
                isCurrent={i === crumbs.length - 1}
              >
                {c.label}
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
        ) : (
          <SectionAccent />
        )}
        {photo ? (
          <Grid columns={{ minWidth: 340, max: 2 }} gap={6} align="center">
            {textBlock}
            <img
              className="page-hero-img"
              src={photo.src}
              alt={photo.alt}
              loading="eager"
              fetchPriority="high"
            />
          </Grid>
        ) : (
          <HStack gap={5} vAlign="center" wrap="wrap">
            {pictogram ? <PagePictogram name={pictogram} /> : null}
            {textBlock}
          </HStack>
        )}
      </Container>
    </Section>
  );
}

const steps = [
  {
    title: 'Ви залишаєте номер',
    text: 'Не потрібно одразу надсилати документи або детально описувати особисту ситуацію.',
    icon: PhoneArrowUpRightIcon,
  },
  {
    title: 'Ми уточнюємо обставини',
    text: 'З’ясовуємо, що сталося, які документи вже є та куди ви зверталися.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    title: 'Формуємо план дій',
    text: 'Пояснюємо можливі підстави, документи, строки та наступні кроки.',
    icon: MapIcon,
  },
  {
    title: 'Супроводжуємо справу',
    text: 'За домовленістю готуємо документи, звернення, скарги або представляємо інтереси клієнта.',
    icon: ShieldCheckIcon,
  },
];

export function StepsBlock() {
  return (
    <VStack gap={5}>
      <Heading level={2}>Як проходить робота</Heading>
      <Grid columns={{ minWidth: 240, max: 4 }} gap={4}>
        {steps.map((step) => (
          <Card key={step.title} padding={5}>
            <VStack gap={3}>
              {/* Іконка в сірому кружечку (запит власника) */}
              <span className="icon-circle" aria-hidden="true">
                <Icon icon={step.icon} size="lg" color="accent" />
              </span>
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

/**
 * Інфографіка «Шлях справи»: від звернення до виплати або оскарження.
 * Без строків і обіцянок — лише етапи процесу.
 */
const flowStages = [
  { label: 'Звернення', icon: PhoneArrowUpRightIcon },
  { label: 'Документи', icon: DocumentPlusIcon },
  { label: 'Подання до органу', icon: BuildingLibraryIcon },
  { label: 'Рішення', icon: ScaleIcon },
  { label: 'Виплата або оскарження', icon: BanknotesIcon },
];

export function CaseFlow() {
  return (
    <VStack gap={4}>
      <Heading level={2}>Шлях справи: від звернення до результату</Heading>
      <Card padding={5} variant="muted">
        <HStack gap={3} wrap="wrap" vAlign="center">
          {flowStages.map((stage, i) => (
            <HStack gap={3} vAlign="center" key={stage.label}>
              <VStack gap={2} hAlign="center" width={128}>
                <span className="icon-medallion" aria-hidden="true">
                  <Icon icon={stage.icon} size="lg" color="accent" />
                </span>
                <Text type="label" weight="medium" justify="center" textWrap="balance">
                  {stage.label}
                </Text>
              </VStack>
              {i < flowStages.length - 1 ? (
                <Icon icon={ArrowLongRightIcon} size="md" color="secondary" />
              ) : null}
            </HStack>
          ))}
        </HStack>
      </Card>
      <Text as="p" type="supporting">
        Схема є узагальненою: послідовність і тривалість етапів залежать від
        виду виплати та органу.
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

export function HelpGrid({ limit = 6 }: { limit?: number }) {
  // Стіна з 14 карток пригнічує — показуємо 6 + «Показати всі» (аудит C3)
  const [expanded, setExpanded] = useState(false);
  const items = expanded ? helpItems : helpItems.slice(0, limit);
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
      {!expanded && helpItems.length > limit ? (
        <VStack hAlign="start">
          <Button
            label={`Показати всі (${helpItems.length})`}
            variant="secondary"
            onClick={() => setExpanded(true)}
          />
        </VStack>
      ) : null}
      <Text as="p" type="supporting">
        Перелік виплат і можливостей у кожній ситуації є різним — наявність
        послуги в списку не означає, що всі виплати гарантовано доступні кожному.
      </Text>
    </VStack>
  );
}

export function FinalCta({ topic }: { topic?: string } = {}) {
  return (
    <Section variant="muted" padding={8} paddingBlock={10}>
      <Container gap={4}>
        <SectionAccent />
        <Heading level={2} textWrap="balance">
          Не знаєте, з чого почати?
        </Heading>
        <Text as="p" type="body" color="secondary">
          Залиште номер телефону. Ми уточнимо основні обставини та пояснимо,
          який наступний крок може бути доречним у вашій ситуації.
        </Text>
        <VStack gap={2} hAlign="start">
          <CallbackButton label="Замовити дзвінок юриста" size="lg" topic={topic} />
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
 * Блок «Коротко» — стислий висновок угорі довгої сторінки (аудит C1).
 */
export function SummaryBox({ items }: { items: string[] }) {
  return (
    <Card padding={5} variant="muted">
      <VStack gap={3}>
        <HStack gap={2} vAlign="center">
          <span className="step-circle" aria-hidden="true">!</span>
          <Heading level={2}>Коротко</Heading>
        </HStack>
        <List>
          {items.map((item) => (
            <ListItem
              key={item}
              label={item}
              startContent={<Icon icon={CheckCircleIcon} size="sm" color="accent" />}
            />
          ))}
        </List>
      </VStack>
    </Card>
  );
}

/**
 * Зміст сторінки з якорями (аудит C1).
 */
export function PageToc({ items }: { items: { label: string; anchor: string }[] }) {
  return (
    <VStack gap={2}>
      <Text as="p" type="label" weight="semibold">
        Зміст сторінки
      </Text>
      <List>
        {items.map((item) => (
          <ListItem key={item.anchor} label={item.label} href={`#${item.anchor}`} />
        ))}
      </List>
    </VStack>
  );
}

/**
 * Нумеровані кроки з кружечками (аудит C2, патерн GOV.UK step-by-step).
 */
export function NumberedSteps({ steps: stepItems }: { steps: string[] }) {
  return (
    <VStack gap={4}>
      {stepItems.map((step, i) => (
        // vAlign=center — текст стоїть по центру кружечка, не «стрибає»
        <HStack gap={4} vAlign="center" key={step}>
          <span className="step-circle" aria-hidden="true">
            {i + 1}
          </span>
          <Text as="p" type="body" color="secondary" textWrap="pretty">
            {step}
          </Text>
        </HStack>
      ))}
    </VStack>
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
