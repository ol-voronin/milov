import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { Container } from '@/components/Container';
import { PageHero } from '@/components/ContentBlocks';
import { KnowledgeHub } from '@/components/KnowledgeHub';
import { NextSteps } from '@/components/NextSteps';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';
import { photos } from '@/config/photos';

export const metadata: Metadata = {
  title: 'Корисна інформація для родин військових',
  description:
    'Практичні матеріали: перші кроки після загибелі військовослужбовця, дії при затримці чи відмові у виплаті, права родин зниклих безвісти. Пошук і фільтр за темами.',
  alternates: { canonical: '/korysna-informatsiya' },
};

export default function ArticlesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Головна', path: '/' },
          { name: 'Корисна інформація', path: '/korysna-informatsiya' },
        ])}
      />

      <PageHero
        title="Корисна інформація"
        lead="Практичні матеріали простою мовою. Знайдіть свою тему через пошук або фільтр."
        crumbs={[{ label: 'Корисна інформація' }]}
        photo={photos.info}
      />

      <Section variant="transparent" padding={8} paddingBlock={10}>
        <Container>
          <KnowledgeHub />
        </Container>
      </Section>

      <NextSteps page="info" />
    </>
  );
}
