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
import { Link } from '@astryxdesign/core/Link';
import { CheckList } from './CheckList';
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
import { useState, type ReactNode } from 'react';
import { Breadcrumbs, BreadcrumbItem } from '@astryxdesign/core/Breadcrumbs';
import { Button } from '@astryxdesign/core/Button';
import { Collapsible, CollapsibleGroup } from '@astryxdesign/core/Collapsible';
import { Tab, TabList } from '@astryxdesign/core/TabList';
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
      <VStack gap={3}>
        <span className="section-rule" aria-hidden="true" />
        <Heading level={2}>Як проходить робота</Heading>
      </VStack>
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

export function CaseFlow({ tone = 'light' }: { tone?: 'light' | 'dark' } = {}) {
  if (tone === 'dark') {
    return (
      <div className="trust-band">
        <VStack gap={5}>
          <VStack gap={3}>
            <span className="section-rule section-rule--light" aria-hidden="true" />
            <Heading level={2}>Шлях справи: від звернення до результату</Heading>
          </VStack>
          <div className="case-flow">
            {flowStages.map((stage, i) => (
              <div className="case-flow__row" key={stage.label}>
                <div className="case-flow__stage">
                  <span className="trust-card__icon" aria-hidden="true">
                    <Icon icon={stage.icon} size="lg" color="inherit" />
                  </span>
                  <Text type="label" weight="medium" justify="center" textWrap="balance">
                    {stage.label}
                  </Text>
                </div>
                {i < flowStages.length - 1 ? (
                  <span className="case-flow__arrow" aria-hidden="true">
                    <Icon icon={ArrowLongRightIcon} size="md" color="secondary" />
                  </span>
                ) : null}
              </div>
            ))}
          </div>
          <Text as="p" type="supporting">
            Схема є узагальненою: послідовність і тривалість етапів залежать від
            виду виплати та органу.
          </Text>
        </VStack>
      </div>
    );
  }

  return (
    <VStack gap={4}>
      <VStack gap={3}>
        <span className="section-rule" aria-hidden="true" />
        <Heading level={2}>Шлях справи: від звернення до результату</Heading>
      </VStack>
      <Card padding={5} variant="muted">
        {/* На мобільному стрілки ховаються, етапи стають у два стовпці */}
        <div className="case-flow">
          {flowStages.map((stage, i) => (
            <div className="case-flow__row" key={stage.label}>
              <div className="case-flow__stage">
                <span className="icon-medallion" aria-hidden="true">
                  <Icon icon={stage.icon} size="lg" color="accent" />
                </span>
                <Text type="label" weight="medium" justify="center" textWrap="balance">
                  {stage.label}
                </Text>
              </div>
              {i < flowStages.length - 1 ? (
                <span className="case-flow__arrow" aria-hidden="true">
                  <Icon icon={ArrowLongRightIcon} size="md" color="secondary" />
                </span>
              ) : null}
            </div>
          ))}
        </div>
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
      <VStack gap={3}>
        <span className="section-rule" aria-hidden="true" />
        <Heading level={2}>Що можна підготувати до консультації</Heading>
      </VStack>
      <Text as="p" type="body" color="secondary">
        Якщо чогось із переліку немає — це не перешкода. Почати можна з того, що є.
      </Text>
      <CheckList items={[...prepItems]} tone="navy" columns={2} />
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
      <VStack gap={3}>
        <span className="section-rule" aria-hidden="true" />
        <Heading level={2}>З чим допомагаємо</Heading>
      </VStack>
      <Grid columns={{ minWidth: 280, max: 3 }} gap={4}>
        {items.map((item, i) => (
          <Card key={item.title} padding={4}>
            <VStack gap={2}>
              <HStack gap={3} vAlign="center">
                <span
                  className={`icon-medallion icon-medallion--sm${
                    ['', ' icon-medallion--sand', ' icon-medallion--slate'][i % 3]
                  }`}
                  aria-hidden="true"
                >
                  <Icon icon={DocumentTextIcon} size="md" color="accent" />
                </span>
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
    <div className="accent-card accent-card--gold">
      <VStack gap={3}>
        <HStack gap={3} vAlign="center">
          <span className="step-circle" aria-hidden="true">
            !
          </span>
          <Heading level={2}>Коротко</Heading>
        </HStack>
        <CheckList items={items} tone="gold" />
      </VStack>
    </div>
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
      <CheckList
        tone="mist"
        columns={2}
        items={items.map((item) => (
          <Link key={item.anchor} href={`#${item.anchor}`}>
            {item.label}
          </Link>
        ))}
      />
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
/** Коротка підказка в рядку акордеона — щоб не розкривати все підряд */
const paymentHints: Record<string, string> = {
  'odnorazova-hroshova-dopomoha': 'Основна виплата родині',
  'nevyplachene-hroshove-zabezpechennia': 'Зароблене, але не отримане',
  'dodatkova-vynahoroda': 'За наявності законних підстав',
  'kompensatsiia-za-vidpustky': 'За невикористані дні відпустки',
  'pensiia-vtrata-hoduvalnyka': 'Щомісячна виплата',
  'dopomoha-na-pokhovannia': 'Тому, хто організував поховання',
  'derzhavni-ta-mistsevi-prohramy': 'Залежить від вашої громади',
  'status-chlena-simi': 'Статус, а не гроші: відкриває пільги',
};

export function PaymentsList({ items = payments }: { items?: PaymentInfo[] }) {
  return (
    <VStack gap={3}>
      <CollapsibleGroup type="single" hasDividers>
        {items.map((p) => (
          <Collapsible
            key={p.id}
            value={p.id}
            defaultIsOpen={false}
            trigger={
              <HStack gap={3} vAlign="center" wrap="wrap">
                <Text type="large" weight="medium">
                  {p.title}
                </Text>
                {paymentHints[p.id] ? (
                  <Text type="supporting">{paymentHints[p.id]}</Text>
                ) : null}
              </HStack>
            }
          >
            <VStack gap={3} paddingBlock={1} maxWidth={720} id={p.id}>
              <Text as="p" type="body" color="secondary" textWrap="pretty">
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
                <ReviewFlag
                  visible={p.importantExceptions.includes(NEEDS_LAWYER_REVIEW)}
                />
              )}

              <CallbackButton
                label="Дізнатися, чи стосується це мене"
                variant="secondary"
                topic="death"
              />
            </VStack>
          </Collapsible>
        ))}
      </CollapsibleGroup>
      {/* Офіційні джерела — один блок наприкінці сторінки, а не в кожній картці */}
    </VStack>
  );
}

/**
 * Вкладки замість чотирьох дрібних розділів, розбитих на однакові
 * сірі шматки: людина бачить структуру одразу, без скролу.
 */
/**
 * Компактна темна CTA-смуга для середини довгої сторінки —
 * ловить тих, хто не дочитає до кінця.
 */
export function InlineCta({
  title = 'Не впевнені, що саме стосується вас?',
  text = 'Опишіть ситуацію телефоном — юрист підкаже, які виплати перевіряти першими.',
  topic,
}: {
  title?: string;
  text?: string;
  topic?: string;
}) {
  return (
    <div className="inline-cta">
      <Grid columns={{ minWidth: 280, max: 2 }} gap={5} align="center">
        <VStack gap={2}>
          <Heading level={2}>{title}</Heading>
          <Text as="p" type="body" color="secondary" textWrap="pretty">
            {text}
          </Text>
        </VStack>
        <VStack gap={2} hAlign="start">
          <CallbackButton label="Замовити дзвінок юриста" size="lg" topic={topic} />
          <Text type="supporting">Достатньо імені та номера телефону.</Text>
        </VStack>
      </Grid>
    </div>
  );
}

export type TabSection = {
  id: string;
  label: string;
  intro?: string;
  content: ReactNode;
  note?: string;
};

export function SectionTabs({
  sections,
  defaultId,
}: {
  sections: TabSection[];
  defaultId?: string;
}) {
  const [active, setActive] = useState(defaultId ?? sections[0]?.id);
  const current = sections.find((s) => s.id === active) ?? sections[0];

  return (
    <VStack gap={4}>
      <TabList
        value={active}
        onChange={setActive}
        hasDivider
        layout="hug"
        aria-label="Розділи"
      >
        {sections.map((s) => (
          <Tab key={s.id} value={s.id} label={s.label} />
        ))}
      </TabList>

      {/* Astryx рендерить навігаційні таби (aria-current), тому не вдаємо
          ARIA-паттерн tabpanel — просто озвучуємо зміну вмісту. */}
      <div aria-live="polite">
        <VStack gap={4} maxWidth={720} id={current.id}>
          {current.intro ? (
            <Text as="p" type="body" color="secondary" textWrap="pretty">
              {current.intro}
            </Text>
          ) : null}
          {current.content}
          {current.note ? (
            <Text as="p" type="supporting">
              {current.note}
            </Text>
          ) : null}
        </VStack>
      </div>
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
