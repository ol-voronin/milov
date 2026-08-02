/**
 * Structured data (JSON-LD) для пошукових систем.
 * Серверний компонент — без 'use client'.
 */

import { site, team, hasAttorney } from '@/config/site';
import type { FaqItem } from '@/content/faq';

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function legalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: site.brandName,
    alternateName: `${site.brandName} — ${site.tagline}`,
    url: site.siteUrl,
    telephone: site.phone,
    email: site.email,
    areaServed: 'UA',
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressCountry: 'UA',
    },
    description:
      'Юридична допомога родинам військовослужбовців: виплати у разі загибелі, оскарження затримок і відмов, пенсія у зв’язку з втратою годувальника, права родин зниклих безвісти та військовополонених, пільги й статуси для родин діючих військовослужбовців.',
  };
}

export function organizationSchema() {
  const member = team[0];
  return {
    '@context': 'https://schema.org',
    '@type': hasAttorney ? 'Attorney' : 'Person',
    name: member.name,
    jobTitle: member.role,
    worksFor: { '@type': 'LegalService', name: site.brandName },
    url: `${site.siteUrl}/pro-komandu`,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.siteUrl}${item.path}`,
    })),
  };
}

/** FAQPage — лише для запитань, які реально відображені на сторінці */
export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
