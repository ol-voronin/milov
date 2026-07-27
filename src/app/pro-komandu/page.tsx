import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Container } from '@/components/Container';
import { PageHero } from '@/components/ContentBlocks';
import { TeamBlock } from '@/components/TeamBlock';
import { TrustBlock } from '@/components/TrustBlock';
import { CallbackSection } from '@/components/CallbackSection';
import { JsonLd, breadcrumbSchema, organizationSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Про команду',
  description:
    'Хто працює з вашою справою: досвід, напрями роботи та можливість перевірити статус спеціаліста. Чесно про те, що ми можемо і чого не обіцяємо.',
  alternates: { canonical: '/pro-komandu' },
};

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
        lead="Ми працюємо з родинами військовослужбовців у делікатних та складних ситуаціях. Наш підхід — спокійно, чесно і без обіцянок, які неможливо виконати."
        crumbs={[{ label: 'Про команду' }]}
        pictogram="team"
      />

      <Section variant="transparent" padding={8} paddingBlock={0}>
        <Container gap={8} maxWidth={980}>
          {/* Місія — чому ми цим займаємось (аудит T6) */}
          <VStack gap={3}>
            <Heading level={2}>Чому ми цим займаємось</Heading>
            <Text as="p" type="body" color="secondary" textWrap="pretty">
              Родини військових часто залишаються сам на сам із документами,
              строками та органами, які відповідають повільно або відмовляють
              без пояснень. Ми вважаємо, що людина у втраті не повинна ставати
              ще й юристом. Тому беремо на себе процедурну частину — спокійно,
              методично і з повагою до вашої ситуації.
            </Text>
          </VStack>
          <TeamBlock />
          <TrustBlock />
        </Container>
      </Section>

      <CallbackSection />
    </>
  );
}
