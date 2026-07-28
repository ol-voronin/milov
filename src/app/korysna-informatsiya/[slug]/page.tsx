import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Container } from '@/components/Container';
import { PageHero } from '@/components/ContentBlocks';
import { ArticleBody, ChecklistActions } from '@/components/ArticleComponents';
import { LegalMeta, OfficialSources } from '@/components/LegalComponents';
import { CallbackSection } from '@/components/CallbackSection';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';
import { articles, getArticle } from '@/content/articles';
import { officialSources } from '@/content/payments';
import { team } from '@/config/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/korysna-informatsiya/${article.slug}` },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Головна', path: '/' },
          { name: 'Корисна інформація', path: '/korysna-informatsiya' },
          { name: article.title, path: `/korysna-informatsiya/${article.slug}` },
        ])}
      />

      <PageHero
        title={article.title}
        lead={article.description}
        crumbs={[
          { label: 'Корисна інформація', href: '/korysna-informatsiya' },
          { label: article.title },
        ]}
        pictogram="info"
      />

      <Section variant="transparent" padding={8} paddingBlock={8}>
        <Container gap={6} maxWidth={820}>
          {article.isChecklist ? (
            <ChecklistActions pdfHref="/downloads/pershi-kroky-checklist.pdf" />
          ) : null}

          <ArticleBody article={article} />

          <VStack gap={2}>
            <LegalMeta
              updatedAt={article.updatedAt}
              reviewed={article.reviewed}
              reviewedBy={article.reviewedBy}
            />
            {/* Автор / юридичний редактор матеріалу */}
            <OfficialSources sources={officialSources.slice(0, 3)} />
          </VStack>
        </Container>
      </Section>

      <CallbackSection />
    </>
  );
}
