'use client';

/**
 * Юридичні службові компоненти:
 * - LegalNotice — застереження про інформаційний характер
 * - OfficialSources — блок офіційних джерел
 * - LegalMeta — дата юридичного оновлення + позначка «Перевірено адвокатом»
 * - SensitiveDataNotice — попередження про чутливі дані у формі
 * - ReviewFlag — службова позначка для неперевіреного контенту
 */

import type { ReactNode } from 'react';
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
import { showReviewFlags } from '@/lib/flags';

export function LegalNotice() {
  return (
    <Banner
      status="info"
      title="Інформаційний матеріал"
      description="Матеріал має інформаційний характер. Остаточний висновок залежить від обставин конкретної справи та чинної редакції законодавства."
    />
  );
}

/**
 * Офіційні джерела.
 *
 * Було: стовпчик однакових синіх посилань без пояснень — людина не
 * розуміла, куди саме її відправляють і навіщо. Стало: два стовпці
 * з підписом, що шукати на кожному ресурсі, у тихій рамці.
 */
export function OfficialSources({ sources }: { sources: OfficialSource[] }) {
  if (sources.length === 0) return null;
  return (
    <aside className="sources">
      <Text as="p" type="label" weight="semibold">
        Перевірити в першоджерелі
      </Text>
      <ul className="sources__list">
        {sources.map((s) => (
          <li key={s.url}>
            <Link href={s.url} isExternalLink isStandalone>
              {s.title}
            </Link>
          </li>
        ))}
      </ul>
      <Text as="p" type="supporting">
        Норми законодавства змінюються. Перед тим як діяти, перевірте
        актуальну редакцію на офіційному ресурсі або уточніть у юриста.
      </Text>
    </aside>
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
 * Видима лише в dev / за NEXT_PUBLIC_SHOW_REVIEW_FLAGS=1 — відвідувачі
 * продакшн-сайту внутрішніх редакційних міток не бачать (аудит T1).
 */
export function ReviewFlag({ visible }: { visible: boolean }) {
  if (!visible || !showReviewFlags) return null;
  return <Token label={NEEDS_LAWYER_REVIEW} color="yellow" size="sm" />;
}

/**
 * Службова примітка для власника/редактора (напр. у шаблонах політик).
 * Рендериться лише в dev / на staging із увімкненим прапорцем.
 */
export function ReviewNote({ children }: { children: ReactNode }) {
  if (!showReviewFlags) return null;
  return (
    <Banner
      status="warning"
      title="Службова примітка (не видно на продакшні)"
      description={<>{children}</>}
    />
  );
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
