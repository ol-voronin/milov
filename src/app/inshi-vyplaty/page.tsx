import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Container } from '@/components/Container';
import { PageHero, PaymentsList } from '@/components/ContentBlocks';
import { LegalNotice, LegalMeta, OfficialSources } from '@/components/LegalComponents';
import { CallbackSection } from '@/components/CallbackSection';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';
import { officialSources, payments } from '@/content/payments';

export const metadata: Metadata = {
  title: 'Інші виплати родинам військових: пенсія, компенсації, статуси',
  description:
    'Пенсія у зв’язку з втратою годувальника, компенсація за невикористані відпустки, допомога на поховання, статус члена сім’ї загиблого Захисника — огляд простими словами.',
  alternates: { canonical: '/inshi-vyplaty' },
};

const otherPayments = payments.filter((p) =>
  [
    'nevyplachene-hroshove-zabezpechennia',
    'kompensatsiia-za-vidpustky',
    'pensiia-vtrata-hoduvalnyka',
    'dopomoha-na-pokhovannia',
    'derzhavni-ta-mistsevi-prohramy',
    'status-chlena-simi',
  ].includes(p.id),
);

export default function OtherPaymentsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Головна', path: '/' },
          { name: 'Інші виплати родинам військових', path: '/inshi-vyplaty' },
        ])}
      />

      <PageHero
        title="Інші виплати та оформлення для родин військових"
        lead="Окрім одноразової грошової допомоги, родині можуть належати інші кошти та статуси. Розповідаємо, які саме і з чого почати."
      />

      <Section variant="transparent" padding={8} paddingBlock={0}>
        <Container gap={8}>
          <LegalNotice />

          <VStack gap={4}>
            <Heading level={2}>Що може належати родині</Heading>
            <Text as="p" type="body" color="secondary">
              Наявність кожної виплати залежить від обставин — перелік не є
              гарантією отримання.
            </Text>
            <PaymentsList items={otherPayments} />
          </VStack>

          <OfficialSources sources={officialSources} />
          <LegalMeta />
        </Container>
      </Section>

      <CallbackSection defaultTopic="other" />
    </>
  );
}
