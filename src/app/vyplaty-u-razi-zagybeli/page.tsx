import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { List, ListItem } from '@astryxdesign/core/List';
import { Container } from '@/components/Container';
import {
  PageHero,
  PaymentsList,
  CaseFlow,
  SummaryBox,
  PageToc,
} from '@/components/ContentBlocks';
import {
  LegalNotice,
  LegalMeta,
  OfficialSources,
} from '@/components/LegalComponents';
import { CallbackSection } from '@/components/CallbackSection';
import { FaqList } from '@/components/FaqList';
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/JsonLd';
import { officialSources } from '@/content/payments';
import { faqItems } from '@/content/faq';
import { site } from '@/config/site';

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
  'документи про перебування на утриманні або рішення суду про встановлення відповідних фактів — якщо застосовно',
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
        lead="Пояснюємо простими словами, які виплати та оформлення можуть стосуватися родини, від чого залежить право на них і що робити, якщо процес зупинився."
        extra="У одній ситуації можуть існувати різні види коштів і процедур — від одноразової грошової допомоги до пенсії у зв’язку з втратою годувальника. Нижче — огляд основних із них."
        crumbs={[{ label: 'Виплати у разі загибелі' }]}
        pictogram="payments"
      />

      <Section variant="transparent" padding={8} paddingBlock={0}>
        <Container gap={8} maxWidth={980}>
          {/* Коротко — для тих, кому важко читати довгу сторінку (аудит C1) */}
          <SummaryBox
            items={[
              'Родині можуть належати кілька різних виплат — від одноразової допомоги до пенсії.',
              'Право на кожну виплату залежить від родинного зв’язку, обставин та документів.',
              'Заяви подаються до військової частини, ТЦК та СП, Пенсійного фонду чи соцзахисту.',
              'Затримку і відмову можна оскаржити — головне зафіксувати подання документів.',
            ]}
          />

          <PageToc
            items={[
              { label: 'Які виплати можуть бути актуальними', anchor: 'vydy-vyplat' },
              { label: 'Від чого залежить право на виплату', anchor: 'pravo' },
              { label: 'Хто може бути отримувачем', anchor: 'khto-maye-pravo' },
              { label: 'Особисте розпорядження', anchor: 'rozporiadzhennia' },
              { label: 'Документи', anchor: 'dokumenty' },
              { label: 'Куди звертатися', anchor: 'kudy' },
              { label: 'Затримка та відмова', anchor: 'zatrymka' },
              { label: 'Складні ситуації', anchor: 'skladni' },
              { label: 'Запитання та відповіді', anchor: 'pytannia' },
            ]}
          />

          <CaseFlow />

          <VStack gap={4}>
            <Heading level={2} id="vydy-vyplat">
              Які виплати та оформлення можуть бути актуальними
            </Heading>
            <Text as="p" type="body" color="secondary">
              Наявність кожної виплати залежить від обставин конкретної справи —
              перелік нижче не означає, що всі виплати гарантовано доступні
              кожній родині.
            </Text>
            <PaymentsList />
          </VStack>

          <VStack gap={4}>
            <Heading level={2} id="pravo">
              Від чого залежить право на виплату
            </Heading>
            <List>
              {eligibilityFactors.map((f) => (
                <ListItem key={f} label={f} />
              ))}
            </List>
          </VStack>

          <VStack gap={4}>
            <Heading level={2} id="khto-maye-pravo">
              Хто може належати до потенційних отримувачів
            </Heading>
            <Text as="p" type="body" color="secondary">
              Коло отримувачів різниться залежно від виду виплати. Найчастіше до
              нього можуть входити:
            </Text>
            <List>
              {potentialRecipients.map((r) => (
                <ListItem key={r} label={r} />
              ))}
            </List>
          </VStack>

          <VStack gap={4}>
            <Heading level={2} id="rozporiadzhennia">
              Як може впливати особисте розпорядження
            </Heading>
            <Text as="p" type="body" color="secondary" textWrap="pretty">
              Військовослужбовець за життя може визначити, хто саме отримає
              одноразову грошову допомогу, або змінити розподіл часток між
              членами родини. Якщо таке розпорядження існує, воно суттєво впливає
              на те, кому і в яких частках призначається виплата. Перевірити його
              наявність можна через військову частину — ми допомагаємо зробити це
              коректно.
            </Text>
          </VStack>

          <VStack gap={4}>
            <Heading level={2} id="dokumenty">
              Які документи можуть знадобитися
            </Heading>
            <List>
              {requiredDocs.map((d) => (
                <ListItem key={d} label={d} />
              ))}
            </List>
            <Text as="p" type="supporting">
              Точний перелік залежить від виду виплати та органу. Не надсилайте
              персональні документи через форму на сайті — юрист пояснить, як
              передати їх безпечно.
            </Text>
          </VStack>

          <VStack gap={4}>
            <Heading level={2} id="kudy">
              Куди звертатися
            </Heading>
            <Text as="p" type="body" color="secondary" textWrap="pretty">
              Залежно від виду виплати заяви подаються до військової частини,
              ТЦК та СП, Пенсійного фонду України або органів соціального
              захисту. Якщо не знаєте, з якого органу почати, — зателефонуйте:
              підкажемо конкретний маршрут для вашої ситуації.
            </Text>
          </VStack>

          <VStack gap={4}>
            <Heading level={2}>Що робити після подання документів</Heading>
            <Text as="p" type="body" color="secondary" textWrap="pretty">
              Збережіть копії всіх поданих заяв і підтвердження реєстрації
              (вхідний номер, поштову квитанцію). Це головний інструмент
              контролю: без зафіксованої дати подання складно довести затримку
              чи бездіяльність.
            </Text>
          </VStack>

          <VStack gap={4}>
            <Heading level={2} id="zatrymka">
              Що робити при затримці
            </Heading>
            <Text as="p" type="body" color="secondary" textWrap="pretty">
              Якщо рішення чи виплати немає тривалий час — надішліть письмовий
              запит про стан розгляду. Мовчання органу після спливу строків — це
              бездіяльність, яку можна оскаржити. Докладніше — на сторінці про
              затримки та відмови.
            </Text>
          </VStack>

          <VStack gap={4}>
            <Heading level={2}>Що робити при відмові</Heading>
            <Text as="p" type="body" color="secondary" textWrap="pretty">
              Вимагайте письмову відмову з підставами. Іноді причина формальна і
              її можна усунути, доповнивши документи. Якщо орган помиляється по
              суті — відмова оскаржується до вищого органу або в суді. Строки на
              оскарження обмежені, тому зволікати не варто.
            </Text>
          </VStack>

          <VStack gap={4}>
            <Heading level={2} id="skladni">
              Типові складні ситуації
            </Heading>
            <List>
              {complexCases.map((c) => (
                <ListItem key={c} label={c} />
              ))}
            </List>
            <Text as="p" type="body" color="secondary">
              У таких випадках краще не діяти навмання: одна невдала заява може
              ускладнити подальший процес.
            </Text>
          </VStack>

          <VStack gap={4}>
            <Heading level={2} id="pytannia">
              Поширені запитання
            </Heading>
            <FaqList items={pageFaq} />
          </VStack>

          {/* Дисклеймер після контенту, а не перед ним (аудит T3) */}
          <LegalNotice />

          <OfficialSources sources={officialSources} />

          <VStack gap={2}>
            <LegalMeta updatedAt={site.lastLegalUpdate} />
            <Text as="p" type="supporting">
              Матеріал має інформаційний характер. Остаточний висновок залежить
              від обставин конкретної справи та чинної редакції законодавства.
            </Text>
          </VStack>
        </Container>
      </Section>

      <CallbackSection defaultTopic="death" />
    </>
  );
}
