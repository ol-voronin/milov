import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { CheckList } from '@/components/CheckList';
import { Container } from '@/components/Container';
import { ButtonLink } from '@/components/ButtonLink';
import {
  PageHero,
  PaymentsList,
  CaseFlow,
  SummaryBox,
  PageToc,
  SectionTabs,
  InlineCta,
  FinalCta,
} from '@/components/ContentBlocks';
import { WeHelpBlock } from '@/components/WeHelpBlock';
import {
  LegalNotice,
  LegalMeta,
  OfficialSources,
} from '@/components/LegalComponents';
import { FaqList } from '@/components/FaqList';
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/JsonLd';
import { officialSources } from '@/content/payments';
import { faqItems } from '@/content/faq';
import { site } from '@/config/site';
import { photos } from '@/config/photos';

export const metadata: Metadata = {
  title: 'Виплати сім’ї загиблого військового: хто має право та як оформити',
  description:
    'Які виплати можуть належати родині загиблого військовослужбовця, від чого залежить право на них, які документи потрібні та що робити у разі затримки чи відмови.',
  alternates: { canonical: '/vyplaty-u-razi-zagybeli' },
};

const pageFaq = faqItems.filter((f) =>
  ['who-eligible', 'personal-order', 'unregistered-marriage', 'appeal-refusal'].includes(f.id),
);

const eligibilityFactors = [
  'родинний зв’язок із загиблим і його документальне підтвердження',
  'обставини загибелі чи смерті та їхній зв’язок із виконанням обов’язків служби',
  'наявність особистого розпорядження військовослужбовця щодо отримувачів',
  'коло інших осіб, які претендують на виплату',
  'строки та порядок звернення до відповідних органів',
];

const potentialRecipients = [
  'дружина або чоловік',
  'діти, зокрема від попередніх шлюбів; інтереси неповнолітніх представляють законні представники',
  'батьки загиблого',
  'особи, які перебували на утриманні',
  'особи, які проживали із загиблим однією сім’єю без зареєстрованого шлюбу — за умови встановлення цього факту',
];

const requiredDocs = [
  'документ, що засвідчує загибель або смерть (повідомлення частини, свідоцтво про смерть)',
  'документи, що підтверджують родинний зв’язок (свідоцтво про шлюб, про народження)',
  'паспорт та РНОКПП заявника (подаються безпосередньо до органу, не через сайт)',
  'документи про перебування на утриманні або рішення суду — якщо застосовно',
  'заява встановленої форми до відповідного органу',
];

const complexCases = [
  'кілька заявників із суперечливими вимогами щодо часток',
  'незареєстрований шлюб і необхідність встановлення факту спільного проживання',
  'особисте розпорядження, з яким не згодні інші члени родини',
  'сумніви органу щодо обставин загибелі',
  'пропущені строки звернення',
  'втрачені або недоступні документи',
];

export default function DeathPaymentsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Головна', path: '/' },
          { name: 'Виплати у разі загибелі', path: '/vyplaty-u-razi-zagybeli' },
        ])}
      />
      <JsonLd data={faqSchema(pageFaq)} />

      <PageHero
        title="Виплати у разі загибелі військовослужбовця"
        lead="Які виплати можуть належати родині, які документи потрібні та що робити при затримці чи відмові — простими словами."
        crumbs={[{ label: 'Виплати у разі загибелі' }]}
        photo={photos.payments}
      />

      {/* Блок 1: коротко + зміст. Відповідь за 20 секунд */}
      <Section variant="transparent" padding={8} paddingBlock={10}>
        <Container gap={6}>
          <SummaryBox
            items={[
              'Родині можуть належати кілька різних виплат — від одноразової допомоги до пенсії.',
              'Право на кожну виплату залежить від родинного зв’язку, обставин та документів.',
              'Заяви подаються до військової частини, ТЦК та СП, Пенсійного фонду чи соцзахисту.',
              'Затримку і відмову можна оскаржити — головне зафіксувати подання документів.',
            ]}
          />
          <div className="page-toc--sticky">
            <PageToc
              items={[
                { label: 'Види виплат', anchor: 'vydy-vyplat' },
                { label: 'Хто має право і які документи', anchor: 'pravo' },
                { label: 'Куди звертатися', anchor: 'kudy' },
                { label: 'Затримка та відмова', anchor: 'zatrymka' },
                { label: 'Складні ситуації', anchor: 'skladni' },
                { label: 'Запитання та відповіді', anchor: 'pytannia' },
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* Темний якір 1: інфографіка шляху справи */}
      <Section variant="transparent" padding={8} paddingBlock={0}>
        <Container>
          <CaseFlow tone="dark" />
        </Container>
      </Section>

      {/* Блок 2: види виплат — акордеон замість 8 карток поспіль */}
      <Section variant="transparent" padding={8} paddingBlock={10}>
        <Container gap={5}>
          <VStack gap={3} maxWidth={720}>
            <span className="section-rule" aria-hidden="true" />
            <Heading level={2} id="vydy-vyplat">
              Які виплати можуть бути актуальними
            </Heading>
            <Text as="p" type="body" color="secondary" textWrap="pretty">
              Натисніть на виплату, щоб побачити подробиці. Наявність кожної
              залежить від обставин — перелік не означає, що всі виплати
              гарантовано доступні кожній родині.
            </Text>
          </VStack>
          <PaymentsList />
        </Container>
      </Section>

      {/* Темний якір 2: CTA в середині сторінки */}
      <Section variant="transparent" padding={8} paddingBlock={0}>
        <Container>
          <InlineCta topic="death" />
        </Container>
      </Section>

      {/* Блок 3: право, отримувачі, розпорядження, документи — у вкладках */}
      <Section variant="transparent" padding={8} paddingBlock={10}>
        <Container gap={5}>
          <VStack gap={3} maxWidth={720}>
            <span className="section-rule" aria-hidden="true" />
            <Heading level={2} id="pravo">
              Хто має право і які документи потрібні
            </Heading>
          </VStack>

          <SectionTabs
            defaultId="khto-maye-pravo"
            sections={[
              {
                id: 'khto-maye-pravo',
                label: 'Хто має право',
                intro:
                  'Коло отримувачів різниться залежно від виду виплати. Найчастіше до нього можуть входити:',
                content: <CheckList items={potentialRecipients} tone="gold" />,
              },
              {
                id: 'vid-choho-zalezhyt',
                label: 'Від чого залежить',
                content: <CheckList items={eligibilityFactors} tone="navy" />,
              },
              {
                id: 'rozporiadzhennia',
                label: 'Розпорядження',
                content: (
                  <Text as="p" type="body" color="secondary" textWrap="pretty">
                    Військовослужбовець за життя може визначити, хто саме отримає
                    одноразову грошову допомогу, або змінити розподіл часток. Якщо
                    таке розпорядження існує, воно суттєво впливає на те, кому і в
                    яких частках призначається виплата. Перевірити його наявність
                    можна через військову частину — ми допомагаємо зробити це
                    коректно.
                  </Text>
                ),
              },
              {
                id: 'dokumenty',
                label: 'Документи',
                content: <CheckList items={requiredDocs} tone="navy" />,
                note: 'Точний перелік залежить від виду виплати та органу. Не надсилайте персональні документи через форму на сайті — юрист пояснить, як передати їх безпечно.',
              },
            ]}
          />
        </Container>
      </Section>

      {/* Блок 4: куди звертатися + затримка/відмова + складні ситуації */}
      <Section variant="muted" padding={8} paddingBlock={10}>
        <Container gap={8}>
          <VStack gap={3} maxWidth={720}>
            <span className="section-rule" aria-hidden="true" />
            <Heading level={2} id="kudy">
              Куди звертатися
            </Heading>
            <Text as="p" type="body" color="secondary" textWrap="pretty">
              Залежно від виплати — військова частина, ТЦК та СП, Пенсійний фонд
              або соцзахист. Не знаєте, звідки почати? Зателефонуйте — підкажемо
              маршрут.
            </Text>
          </VStack>

          <VStack gap={4} maxWidth={720}>
            <Heading level={2} id="zatrymka">
              Затримка та відмова
            </Heading>
            <Text as="p" type="body" color="secondary" textWrap="pretty">
              Зберігайте копії заяв і вхідні номери — це головний доказ подання.
              Мовчання органу після спливу строків і необґрунтована відмова
              оскаржуються.
            </Text>
            <VStack hAlign="start">
              <ButtonLink
                label="Що робити при затримці чи відмові"
                variant="secondary"
                href="/zatrymka-abo-vidmova"
              />
            </VStack>
          </VStack>

          <VStack gap={4} maxWidth={720}>
            <Heading level={2} id="skladni">
              Типові складні ситуації
            </Heading>
            <CheckList items={complexCases} tone="danger" />
          </VStack>
        </Container>
      </Section>

      {/* Темний якір 3: чим допомагаємо */}
      <Section variant="transparent" padding={8} paddingBlock={10}>
        <Container>
          <WeHelpBlock
            topic="death"
            note="Беремо на себе процедурну частину — від перевірки права до контролю строків."
            items={[
              'Перевіряємо, які виплати можуть стосуватися вашої ситуації.',
              'Визначаємо коло отримувачів і частки, зокрема при спорах у родині.',
              'Готуємо заяви, запити та адвокатські звернення до органів.',
              'Оскаржуємо затримки й відмови, за потреби — представляємо в суді.',
            ]}
          />
        </Container>
      </Section>

      {/* Блок 5: FAQ + юридичні застереження + джерела одним блоком */}
      <Section variant="transparent" padding={8} paddingBlock={10}>
        <Container gap={8}>
          <VStack gap={4}>
            <VStack gap={3} maxWidth={720}>
              <span className="section-rule" aria-hidden="true" />
              <Heading level={2} id="pytannia">
                Поширені запитання
              </Heading>
            </VStack>
            <FaqList items={pageFaq} />
          </VStack>

          <VStack gap={4} maxWidth={720}>
            <LegalNotice />
            <OfficialSources sources={officialSources} />
            <LegalMeta updatedAt={site.lastLegalUpdate} />
          </VStack>
        </Container>
      </Section>

      <FinalCta topic="death" />
    </>
  );
}
