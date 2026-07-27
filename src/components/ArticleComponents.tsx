'use client';

/**
 * Компоненти розділу «Корисна інформація»:
 * - ArticleSearch — пошук по матеріалах (клієнтський, без запитів на сервер)
 * - ArticleBody — рендер секцій статті з CMS-моделі
 * - ChecklistActions — друк / завантаження чекліста
 */

import { useMemo, useState } from 'react';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { TextInput } from '@astryxdesign/core/TextInput';
import { Heading, Text } from '@astryxdesign/core/Text';
import { List, ListItem } from '@astryxdesign/core/List';
import { Banner } from '@astryxdesign/core/Banner';
import { Button } from '@astryxdesign/core/Button';
import { EmptyState } from '@astryxdesign/core/EmptyState';
import { Icon } from '@astryxdesign/core/Icon';
import {
  MagnifyingGlassIcon,
  DocumentTextIcon,
  PrinterIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { articles, type Article, type ArticleSection } from '@/content/articles';
import { showReviewFlags } from '@/lib/flags';
import { NEEDS_LAWYER_REVIEW } from '@/content/payments';

/** Статичний індекс основних сторінок для глобального пошуку (аудит N3) */
const pageIndex = [
  {
    title: 'Виплати у разі загибелі військовослужбовця',
    description: 'Хто має право, документи, порядок дій',
    href: '/vyplaty-u-razi-zagybeli',
    keywords: ['виплати', 'загибель', 'одноразова грошова допомога', 'огд', 'право'],
  },
  {
    title: 'Затримка або відмова у виплаті',
    description: 'Як зафіксувати бездіяльність та оскаржити відмову',
    href: '/zatrymka-abo-vidmova',
    keywords: ['затримка', 'відмова', 'оскарження', 'скарга', 'суд'],
  },
  {
    title: 'Зниклі безвісти та полонені',
    description: 'Права родини та порядок звернень',
    href: '/znykli-bezvisty-ta-poloneni',
    keywords: ['зниклий безвісти', 'полон', 'грошове забезпечення'],
  },
  {
    title: 'Пенсія, компенсації, статуси',
    description: 'Інші виплати та оформлення для родини',
    href: '/inshi-vyplaty',
    keywords: ['пенсія', 'втрата годувальника', 'компенсація', 'відпустка', 'статус', 'поховання'],
  },
  {
    title: 'Послуги та вартість',
    description: 'Формати допомоги і прозорий підхід до ціни',
    href: '/poslugy',
    keywords: ['послуги', 'вартість', 'ціна', 'консультація', 'супровід'],
  },
  {
    title: 'Поширені запитання',
    description: 'Короткі відповіді на найчастіші питання',
    href: '/faq',
    keywords: ['питання', 'faq', 'шлюб', 'спір', 'онлайн'],
  },
  {
    title: 'Замовити дзвінок юриста',
    description: 'Залиште номер — ми зателефонуємо',
    href: '/zamovyty-dzvinok',
    keywords: ['дзвінок', 'заявка', 'контакт', 'юрист'],
  },
];

export function ArticleSearch({ includePages = false }: { includePages?: boolean }) {
  const [query, setQuery] = useState('');

  const corpus = useMemo(() => {
    const articleEntries = articles.map((a) => ({
      title: a.title,
      description: a.description,
      href: `/korysna-informatsiya/${a.slug}`,
      keywords: a.keywords,
    }));
    return includePages ? [...pageIndex, ...articleEntries] : articleEntries;
  }, [includePages]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return corpus;
    return corpus.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.keywords.some((k) => k.toLowerCase().includes(q)),
    );
  }, [query, corpus]);

  return (
    <VStack gap={4}>
      <TextInput
        label={includePages ? 'Пошук по сайту' : 'Пошук по матеріалах'}
        value={query}
        onChange={setQuery}
        placeholder="Наприклад: відмова у виплаті, документи, полон…"
        startIcon={MagnifyingGlassIcon}
        hasClear
      />
      {filtered.length === 0 ? (
        <EmptyState
          title="Нічого не знайдено"
          description="Спробуйте інше слово або залиште номер — юрист підкаже, де шукати відповідь."
        />
      ) : (
        <List>
          {filtered.map((a) => (
            <ListItem
              key={a.href}
              label={a.title}
              description={a.description}
              href={a.href}
              startContent={<Icon icon={DocumentTextIcon} size="md" color="accent" />}
            />
          ))}
        </List>
      )}
    </VStack>
  );
}

export function ArticleBody({ article }: { article: Article }) {
  return (
    <VStack gap={4}>
      {!article.reviewed && showReviewFlags ? (
        <Banner
          status="warning"
          title="Матеріал очікує юридичної перевірки (службова примітка)"
          description="Текст підготовлено редакцією і ще не перевірено адвокатом. На продакшні ця примітка не показується."
        />
      ) : null}
      {article.sections.map((section, i) => (
        <SectionRenderer key={i} section={section} />
      ))}
    </VStack>
  );
}

function SectionRenderer({ section }: { section: ArticleSection }) {
  switch (section.type) {
    case 'heading':
      return <Heading level={2}>{section.text}</Heading>;
    case 'paragraph':
      return (
        <Text as="p" type="body" color="secondary" textWrap="pretty">
          {section.text}
        </Text>
      );
    case 'list':
      return (
        <List>
          {section.items.map((item) => (
            <ListItem
              key={item}
              label={item}
              startContent={<Icon icon={CheckCircleIcon} size="sm" color="accent" />}
            />
          ))}
        </List>
      );
    case 'warning': {
      // На проді службовий маркер перевірки прибирається з тексту (аудит T1)
      const text = showReviewFlags
        ? section.text
        : section.text.replace(NEEDS_LAWYER_REVIEW, '').trim();
      return <Banner status="info" title="Зверніть увагу" description={text} />;
    }
    default:
      return null;
  }
}

export function ChecklistActions({ pdfHref }: { pdfHref: string }) {
  return (
    <HStack gap={3} wrap="wrap" vAlign="center">
      <span className="no-print">
        <Button
          label="Роздрукувати чекліст"
          variant="secondary"
          icon={<Icon icon={PrinterIcon} size="sm" color="inherit" />}
          onClick={() => window.print()}
        />
      </span>
      <span className="no-print">
        <Button
          label="Завантажити PDF"
          variant="secondary"
          icon={<Icon icon={ArrowDownTrayIcon} size="sm" color="inherit" />}
          onClick={() => {
            window.location.href = pdfHref;
          }}
        />
      </span>
    </HStack>
  );
}
