import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Container } from '@/components/Container';
import { PageHero, InlineCta, FinalCta } from '@/components/ContentBlocks';
import { TeamBlock } from '@/components/TeamBlock';
import { TrustBlock } from '@/components/TrustBlock';
import { CheckList } from '@/components/CheckList';
import { JsonLd, breadcrumbSchema, organizationSchema } from '@/components/JsonLd';
import { photos } from '@/config/photos';

export const metadata: Metadata = {
  title: 'Про команду',
  description:
    'Хто працює з вашою справою: досвід, напрями роботи та можливість перевірити статус спеціаліста. Чесно про те, що ми можемо і чого не обіцяємо.',
  alternates: { canonical: '/pro-komandu' },
};

/** Принципи роботи — головний матеріал довіри, поки немає кейсів і відгуків */
const principles = [
  {
    title: 'Кажемо «ні», коли справа безперспективна',
    text: 'Якщо шансів немає — скажемо про це на першій розмові, а не після оплати. Втрачений час для родини дорожчий за наш гонорар.',
  },
  {
    title: 'Пояснюємо без юридичної мови',
    text: 'Якщо після розмови вам щось незрозуміло — це наша помилка, а не ваша. Перепитуйте стільки разів, скільки потрібно.',
  },
  {
    title: 'Не тиснемо і не квапимо',
    text: 'Ніяких «встигніть до кінця тижня». Більшість процедур не має жорстких строків, і ми про це прямо кажемо.',
  },
  {
    title: 'Один юрист — одна справа',
    text: 'Вас не передають між менеджерами. Людина, яка взяла справу, веде її до результату.',
  },
];

export default function TeamPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Головна', path: '/' },
          { name: 'Про команду', path: '/pro-komandu' },
        ])}
      />
      <JsonLd data={organizationSchema()} />

      <PageHero
        title="Про команду"
        lead="Працюємо спокійно, чесно і без обіцянок, які неможливо виконати."
        crumbs={[{ label: 'Про команду' }]}
        photo={photos.team}
      />

      {/* Місія — чому ми цим займаємось */}
      <Section variant="transparent" padding={8} paddingBlock={10}>
        <Container gap={8}>
          <VStack gap={3} maxWidth={720}>
            <span className="section-rule" aria-hidden="true" />
            <Heading level={2}>Чому ми цим займаємось</Heading>
            <Text as="p" type="large" color="secondary" textWrap="pretty">
              Родини військових часто залишаються сам на сам із документами,
              строками та органами, які відповідають повільно або відмовляють
              без пояснень.
            </Text>
            <Text as="p" type="body" color="secondary" textWrap="pretty">
              Ми вважаємо, що людина у втраті не повинна ставати ще й юристом.
              Тому беремо на себе процедурну частину — спокійно, методично і з
              повагою до вашої ситуації.
            </Text>
          </VStack>

          {/* Принципи — конкретні обіцянки поведінки, а не гасла */}
          <VStack gap={5}>
            <VStack gap={3} maxWidth={720}>
              <span className="section-rule" aria-hidden="true" />
              <Heading level={2}>Наші принципи</Heading>
              <Text as="p" type="body" color="secondary" textWrap="pretty">
                Це не гасла, а правила, за якими нас можна перевірити на першій
                же розмові.
              </Text>
            </VStack>
            <Grid columns={{ minWidth: 300, max: 2 }} gap={4}>
              {principles.map((p) => (
                <div className="accent-card" key={p.title}>
                  <VStack gap={2}>
                    <Text type="label" weight="semibold">
                      {p.title}
                    </Text>
                    <Text as="p" type="body" color="secondary" textWrap="pretty">
                      {p.text}
                    </Text>
                  </VStack>
                </div>
              ))}
            </Grid>
          </VStack>
        </Container>
      </Section>

      {/* Темний якір 1: CTA — піднятий вище, щоб не стояв поруч
          із темним блоком довіри */}
      <Section variant="transparent" padding={8} paddingBlock={0}>
        <Container>
          <InlineCta
            title="Хочете спершу просто поговорити?"
            text="Перша розмова ні до чого не зобов'язує. Розкажіть ситуацію — почуєте чесну оцінку."
          />
        </Container>
      </Section>

      {/* Світлий блок між двома темними: команда з фото */}
      <Section variant="muted" padding={8} paddingBlock={10}>
        <Container>
          <TeamBlock />
        </Container>
      </Section>

      {/* Темний якір 2: блок довіри */}
      <Section variant="transparent" padding={8} paddingBlock={10}>
        <Container>
          <TrustBlock />
        </Container>
      </Section>

      {/* Чого ми не робимо — сильний сигнал довіри */}
      <Section variant="transparent" padding={8} paddingBlock={10}>
        <Container gap={4}>
          <VStack gap={3} maxWidth={720}>
            <span className="section-rule" aria-hidden="true" />
            <Heading level={2}>Чого ми не робимо</Heading>
          </VStack>
          <VStack maxWidth={720}>
            <CheckList
              tone="danger"
              items={[
                'Не гарантуємо виплату — жоден юрист не ухвалює рішень за державний орган.',
                'Не називаємо суми «які ви отримаєте» до аналізу документів.',
                'Не беремо гроші за «прискорення» державних процедур — це неможливо.',
                'Не публікуємо чужі історії та фото без письмової згоди людей.',
              ]}
            />
          </VStack>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
