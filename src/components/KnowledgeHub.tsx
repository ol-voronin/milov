'use client';

/**
 * Інтерактивний хаб «Корисна інформація»:
 * — пошук у реальному часі;
 * — фільтр за категоріями (ToggleButtonGroup);
 * — картки статей з категорією та часом читання;
 * — швидкі старти («З чого почати») та блок чекліста.
 */

import { useMemo, useState } from 'react';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { Heading, Text } from '@astryxdesign/core/Text';
import { TextInput } from '@astryxdesign/core/TextInput';
import { Badge } from '@astryxdesign/core/Badge';
import { Icon } from '@astryxdesign/core/Icon';
import { Link } from '@astryxdesign/core/Link';
import { EmptyState } from '@astryxdesign/core/EmptyState';
import {
  ToggleButton,
  ToggleButtonGroup,
} from '@astryxdesign/core/ToggleButton';
import {
  MagnifyingGlassIcon,
  ClockIcon,
  ArrowRightIcon,
  DocumentArrowDownIcon,
  FlagIcon,
  BanknotesIcon,
  ScaleIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';
import {
  articles,
  categoryLabels,
  type ArticleCategory,
} from '@/content/articles';
import { ButtonLink } from './ButtonLink';
import { CallbackButton } from './CallbackDialog';

const categoryIcons: Record<ArticleCategory, typeof FlagIcon> = {
  'first-steps': FlagIcon,
  payments: BanknotesIcon,
  appeal: ScaleIcon,
  missing: MagnifyingGlassIcon,
  documents: IdentificationIcon,
};

/** Швидкі старти — найчастіші питання з переходом у потрібне місце */
const quickStarts = [
  {
    title: 'Щойно сталося горе',
    text: 'Покроковий чекліст на перші дні',
    href: '/korysna-informatsiya/pershi-kroky',
  },
  {
    title: 'Не знаю, чи маю право',
    text: 'Хто з родини може отримати виплату',
    href: '/vyplaty-u-razi-zagybeli#khto-maye-pravo',
  },
  {
    title: 'Виплату не дають',
    text: 'Що робити при затримці або відмові',
    href: '/zatrymka-abo-vidmova',
  },
];

export function KnowledgeHub() {
  const [query, setQuery] = useState('');
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const usedCategories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category))),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesQuery =
        q === '' ||
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.keywords.some((k) => k.toLowerCase().includes(q));
      const matchesCategory =
        activeCategories.length === 0 || activeCategories.includes(a.category);
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategories]);

  return (
    <VStack gap={8}>
      {/* Швидкі старти */}
      <VStack gap={4}>
        <Heading level={2}>З чого почати</Heading>
        <Grid columns={{ minWidth: 260, max: 3 }} gap={4}>
          {quickStarts.map((q) => (
            <ClickableCard key={q.title} label={q.title} href={q.href} padding={5}>
              <VStack gap={2}>
                <Text type="label" weight="semibold">
                  {q.title}
                </Text>
                <Text as="p" type="supporting">
                  {q.text}
                </Text>
                <HStack gap={1} vAlign="center">
                  <Text type="label" color="accent" weight="medium">
                    Відкрити
                  </Text>
                  <Icon icon={ArrowRightIcon} size="sm" color="accent" />
                </HStack>
              </VStack>
            </ClickableCard>
          ))}
        </Grid>
      </VStack>

      {/* Пошук + фільтри */}
      <VStack gap={4}>
        <Heading level={2}>Усі матеріали</Heading>
        <TextInput
          label="Пошук по матеріалах"
          value={query}
          onChange={setQuery}
          placeholder="Наприклад: відмова, документи, полон…"
          startIcon={MagnifyingGlassIcon}
          hasClear
        />
        <VStack gap={2}>
          <Text type="supporting">Фільтр за темою</Text>
          <ToggleButtonGroup
            label="Фільтр за темою"
            type="multiple"
            value={activeCategories}
            onChange={(v) => setActiveCategories(Array.isArray(v) ? v : [])}
          >
            {usedCategories.map((c) => (
              <ToggleButton key={c} value={c} label={categoryLabels[c]} />
            ))}
          </ToggleButtonGroup>
        </VStack>

        <Text type="supporting">
          {filtered.length === articles.length
            ? `Матеріалів: ${articles.length}`
            : `Знайдено: ${filtered.length} з ${articles.length}`}
        </Text>

        {filtered.length === 0 ? (
          <EmptyState
            title="Нічого не знайдено"
            description="Спробуйте інше слово, зніміть фільтр — або залиште номер, і юрист підкаже, де шукати відповідь."
          />
        ) : (
          <Grid columns={{ minWidth: 300, max: 2 }} gap={4}>
            {filtered.map((a) => {
              const CatIcon = categoryIcons[a.category];
              return (
                <ClickableCard
                  key={a.slug}
                  label={a.title}
                  href={`/korysna-informatsiya/${a.slug}`}
                  padding={5}
                >
                  <VStack gap={3} minHeight={190} vAlign="between">
                    <VStack gap={3}>
                      <HStack gap={2} vAlign="center" wrap="wrap">
                        <span className="icon-circle icon-circle--sm" aria-hidden="true">
                          <Icon icon={CatIcon} size="md" color="accent" />
                        </span>
                        <Badge variant="neutral" label={categoryLabels[a.category]} />
                        {a.isChecklist ? (
                          <Badge variant="info" label="Чекліст + PDF" />
                        ) : null}
                      </HStack>
                      <Heading level={3}>{a.title}</Heading>
                      <Text as="p" type="body" color="secondary">
                        {a.description}
                      </Text>
                    </VStack>
                    <HStack gap={3} vAlign="center" wrap="wrap">
                      <HStack gap={1} vAlign="center">
                        <Icon icon={ClockIcon} size="sm" color="secondary" />
                        <Text type="supporting">{a.readingMinutes} хв читання</Text>
                      </HStack>
                      <HStack gap={1} vAlign="center">
                        <Text type="label" color="accent" weight="medium">
                          Читати
                        </Text>
                        <Icon icon={ArrowRightIcon} size="sm" color="accent" />
                      </HStack>
                    </HStack>
                  </VStack>
                </ClickableCard>
              );
            })}
          </Grid>
        )}
      </VStack>

      {/* Чекліст-довантаження */}
      <Card padding={6} variant="muted">
        <Grid columns={{ minWidth: 280, max: 2 }} gap={5} align="center">
          <VStack gap={2}>
            <HStack gap={2} vAlign="center">
              <Icon icon={DocumentArrowDownIcon} size="lg" color="accent" />
              <Heading level={2}>Чекліст «Перші кроки»</Heading>
            </HStack>
            <Text as="p" type="body" color="secondary" textWrap="pretty">
              PDF на одну сторінку: що зробити найближчим часом, що можна
              відкласти і чого робити не варто. Можна роздрукувати й тримати
              під рукою.
            </Text>
          </VStack>
          <VStack gap={2} hAlign="start">
            <ButtonLink
              label="Завантажити PDF"
              variant="primary"
              href="/downloads/pershi-kroky-checklist.pdf"
            />
            <ButtonLink
              label="Відкрити на сайті"
              variant="secondary"
              href="/korysna-informatsiya/pershi-kroky"
            />
          </VStack>
        </Grid>
      </Card>

      {/* Не знайшли відповідь */}
      <Card padding={6}>
        <VStack gap={3}>
          <Heading level={2}>Не знайшли відповідь?</Heading>
          <Text as="p" type="body" color="secondary" textWrap="pretty">
            Ситуації бувають різні, і не кожну можна описати в статті. Залиште
            номер — юрист уточнить обставини й підкаже, який матеріал чи крок
            вам потрібен.
          </Text>
          <HStack gap={3} wrap="wrap" vAlign="center">
            <CallbackButton label="Поставити своє питання" />
            <Link href="/faq" isStandalone>
              Переглянути поширені запитання
            </Link>
          </HStack>
        </VStack>
      </Card>
    </VStack>
  );
}
