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
    areaServed: {
      '@type': 'Country',
      name: 'Україна',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressCountry: 'UA',
    },
    /**
     * ContactPoint — структурований спосіб зв'язку для Google.
     * Дозволяє Google показувати телефон і години роботи
     * безпосередньо в результатах пошуку.
     */
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.phone,
      email: site.email,
      contactType: 'customer service',
      areaServed: 'UA',
      availableLanguage: 'Ukrainian',
    },
    description:
      "Юридична допомога родинам військовослужбовців: виплати у разі загибелі, оскарження затримок і відмов, пенсія у зв’язку з втратою годувальника, права родин зниклих безвісти та військовополонених, пільги й статуси для родин діючих військовослужбовців.",
    inLanguage: 'uk-UA',
    /**
     * hasOfferCatalog — перелік послуг у структурованому вигляді.
     * Google може показувати їх у Knowledge Panel.
     */
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Юридичні послуги для родин військовослужбовців',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Виплати у разі загибелі',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Перевірка права на виплати',
                description:
                  'Аналіз документів і визначення, які виплати належать родині загиблого військовослужбовця',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Оскарження затримки або відмови у виплаті',
                description:
                  'Від скарги до вищого органу до представництва в адміністративному суді',
              },
            },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Зниклі безвісти та військовополонені',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Встановлення юридичних фактів у суді',
                description:
                  'Супровід процедури визнання факту зниклості безвісти, збереження виплат за родиною',
              },
            },
          ],
        },
        {
          '@type': 'OfferCatalog',
          name: 'Пенсії, статуси, пільги',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: "Пенсія у зв'язку з втратою годувальника",
                description:
                  'Призначення, перерахунок, оскарження відмови',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Оформлення статусів для родини',
                description:
                  "Статус члена сім'ї загиблого Захисника, пільги та компенсації",
              },
            },
          ],
        },
      ],
    },
    /**
     * Поля нижче потрібні не пошуку, а автоматичним класифікаторам
     * корпоративних фільтрів (Infoblox, Cisco Talos, Fortinet тощо).
     *
     * Свіжий домен без історії вони за замовчуванням кладуть у
     * «uncategorized», а більшість корпоративних політик таке ріже.
     * Для нашої аудиторії це має наслідок: людина читає сайт із роботи —
     * з лікарні, соцслужби, ТЦК, банку — і бачить заглушку.
     *
     * Явно оголошена галузь, послуги й аудиторія роблять класифікацію
     * однозначною. Це не розблоковує конкретну компанію (там потрібна
     * заявка в їхню підтримку), але прискорює категоризацію загалом.
     */
    isicV4: '6910', // Діяльність у сфері права — міжнародний класифікатор
    knowsAbout: [
      'Соціальні виплати родинам військовослужбовців',
      'Оскарження рішень та бездіяльності державних органів',
      "Пенсія у зв'язку з втратою годувальника",
      "Статус члена сім'ї загиблого Захисника України",
      'Права родин зниклих безвісти та військовополонених',
    ],
    serviceType: [
      'Юридична консультація',
      'Представництво в адміністративному суді',
      'Підготовка звернень і скарг до державних органів',
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Родини військовослужбовців Збройних Сил України',
      geographicArea: { '@type': 'Country', name: 'Україна' },
    },
  };
}

/**
 * WebSite schema — повідомляє Google загальну інформацію про сайт.
 * Це дозволяє Google показувати sitelinks search box.
 */
export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.brandName,
    alternateName: `${site.brandName} — ${site.tagline}`,
    url: site.siteUrl,
    inLanguage: 'uk-UA',
    /**
     * potentialAction — якщо Google вирішить показати sitelinks
     * search box, він використає цей шаблон для пошуку по сайту.
     * Поки на сайті немає повнотекстового пошуку, це працює
     * через Google site:zastupa.com.ua.
     */
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://www.google.com/search?q=site:zastupa.com.ua+{search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
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
