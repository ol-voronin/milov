'use client';

/**
 * Юридичні службові компоненти:
 * - LegalNotice — застереження про інформаційний характер
 * - OfficialSources — блок офіційних джерел
 * - LegalMeta — дата юридичного оновлення + позначка «Перевірено адвокатом»
 * - SensitiveDataNotice — попередження про чутливі дані у формі
 * - ReviewFlag — службова позначка для неперевіреного контенту
 */

import { Banner } from '@astryxdesign/core/Banner';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { Link } from '@astryxdesign/core/Link';
import { Token } from '@astryxdesign/core/Token';
import { Icon } from '@astryxdesign/core/Icon';
import { CheckBadgeIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { site, hasAttorney } from '@/config/site';
import type { OfficialSource } from '@/content/payments';
import { NEEDS_LAWYER_REVIEW } from '@/content/payments';

export function LegalNotice() {
  return (
    <Banner
      status="info"
      title="Інформаційний матеріал"
      description="Матеріал має інформаційний характер. Остаточний висновок залежить від обставин конкретної справи та чинної редакції законодавства."
    />
  );
}

export function OfficialSources({ sources }: { sources: OfficialSource[] }) {
  if (sources.length === 0) return null;
  return (
    <VStack gap={2}>
      <Text as="p" type="label" weight="semibold">
        Офіційні джерела
      </Text>
      <VStack gap={1} hAlign="start">
        {sources.map((s) => (
          <Link key={s.url} href={s.url} isExternalLink isStandalone>
            {s.title}
          </Link>
        ))}
      </VStack>
      <Text as="p" type="supporting">
        Норми законодавства змінюються. Перевіряйте актуальну редакцію на
        офіційних ресурсах або уточнюйте в юриста.
      </Text>
    </VStack>
  );
}

export function LegalMeta({
  updatedAt,
  reviewed = false,
  reviewedBy = '',
}: {
  updatedAt?: string;
  reviewed?: boolean;
  reviewedBy?: string;
}) {
  const date = updatedAt ?? site.lastLegalUpdate;
  return (
    <HStack gap={3} wrap="wrap" vAlign="center">
      <HStack gap={1} vAlign="center">
        <Icon icon={CalendarDaysIcon} size="sm" color="secondary" />
        <Text type="supporting">Інформацію оновлено: {formatDate(date)}</Text>
      </HStack>
      {reviewed && hasAttorney ? (
        <HStack gap={1} vAlign="center">
          <Icon icon={CheckBadgeIcon} size="sm" color="accent" />
          <Text type="supporting">
            Перевірено адвокатом{reviewedBy ? `: ${reviewedBy}` : ''}
          </Text>
        </HStack>
      ) : null}
    </HStack>
  );
}

export function SensitiveDataNotice() {
  return (
    <Banner
      status="warning"
      title="Не надсилайте чутливі дані через сайт"
      description="Не вказуйте у формі паспортні дані, РНОКПП, банківські реквізити, номер військової частини, детальні медичні відомості або іншу чутливу інформацію. Юрист пояснить, як безпечно передати документи після первинної розмови."
    />
  );
}

/**
 * Службова позначка для контенту, який ще не перевірив адвокат.
 * Показує текстову позначку [ПОТРІБНА ПЕРЕВІРКА АДВОКАТОМ ПЕРЕД ПУБЛІКАЦІЄЮ],
 * щоб її було видно і в CMS-файлах, і на сторінці до моменту перевірки.
 */
export function ReviewFlag({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return <Token label={NEEDS_LAWYER_REVIEW} color="yellow" size="sm" />;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}
