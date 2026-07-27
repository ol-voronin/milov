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

export function ArticleSearch() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.keywords.some((k) => k.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <VStack gap={4}>
      <TextInput
        label="Пошук по матеріалах"
        value={query}
        onChange={setQuery}
        placeholder="Наприклад: відмова, документи, полон…"
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
              key={a.slug}
              label={a.title}
              description={a.description}
              href={`/korysna-informatsiya/${a.slug}`}
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
      {!article.reviewed ? (
        <Banner
          status="warning"
          title="Матеріал очікує юридичної перевірки"
          description="Текст підготовлено редакцією і ще не перевірено адвокатом. Не приймайте рішень лише на його основі — зателефонуйте, і ми уточнимо актуальний порядок дій."
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
    case 'warning':
      return <Banner status="info" title="Зверніть увагу" description={section.text} />;
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
