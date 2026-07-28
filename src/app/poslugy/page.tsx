import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { Container } from '@/components/Container';
import { PageHero, HelpGrid, StepsBlock } from '@/components/ContentBlocks';
import { PriceBlock } from '@/components/PriceBlock';
import { CallbackSection } from '@/components/CallbackSection';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';
import { photos } from '@/config/photos';

export const metadata: Metadata = {
  title: 'Послуги: юридична допомога родинам військовослужбовців',
  description:
    'Перевірка права на виплати, аналіз документів, оскарження затримок і відмов, представництво в суді. Формати роботи та прозорий підхід до вартості.',
  alternates: { canonical: '/poslugy' },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Головна', path: '/' },
          { name: 'Послуги', path: '/poslugy' },
        ])}
      />

      <PageHero
        title="Послуги"
        lead="Від першої розмови до представництва в суді. Обсяг і вартість погоджуємо заздалегідь."
        crumbs={[{ label: 'Послуги' }]}
        photo={photos.services}
      />

      <Section variant="transparent" padding={8} paddingBlock={8}>
        <Container gap={8}>
          <HelpGrid />
          <StepsBlock />
          <PriceBlock />
        </Container>
      </Section>

      <CallbackSection />
    </>
  );
}
