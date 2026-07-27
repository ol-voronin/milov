import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { Container } from '@/components/Container';
import { PageHero } from '@/components/ContentBlocks';
import { ArticleSearch } from '@/components/ArticleComponents';
import { CallbackSection } from '@/components/CallbackSection';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Корисна інформація для родин військових',
  description:
    'Практичні матеріали: перші кроки після загибелі військовослужбовця, дії при затримці чи відмові у виплаті, права родин зниклих безвісти.',
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
        lead="Практичні матеріали простою мовою: що робити, куди звертатися і на що звернути увагу. Скористайтеся пошуком, щоб знайти потрібну тему."
      />

      <Section variant="transparent" padding={8} paddingBlock={0}>
        <Container>
          <ArticleSearch />
        </Container>
      </Section>

      <CallbackSection />
    </>
  );
}
