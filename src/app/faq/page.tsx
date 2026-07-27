import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { Container } from '@/components/Container';
import { PageHero } from '@/components/ContentBlocks';
import { FaqList } from '@/components/FaqList';
import { CallbackSection } from '@/components/CallbackSection';
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/JsonLd';
import { faqItems } from '@/content/faq';

export const metadata: Metadata = {
  title: 'Поширені запитання про виплати родинам військових',
  description:
    'Відповіді на найчастіші запитання: хто має право на виплати, що робити при відмові, як діяти без зареєстрованого шлюбу, скільки коштують послуги.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Головна', path: '/' },
          { name: 'Поширені запитання', path: '/faq' },
        ])}
      />
      <JsonLd data={faqSchema(faqItems)} />

      <PageHero
        title="Поширені запитання"
        lead="Зібрали відповіді на запитання, які нам ставлять найчастіше. Якщо вашого немає — зателефонуйте, пояснимо без складних термінів."
      />

      <Section variant="transparent" padding={8} paddingBlock={0}>
        <Container>
          <FaqList items={faqItems} />
        </Container>
      </Section>

      <CallbackSection />
    </>
  );
}
