'use client';

/**
 * Блок «Далі за темою» — замінює однаковий фінальний CTA,
 * який до правки стояв на всіх 13 сторінках.
 *
 * Верстка свідомо НЕ карткова: три-чотири однакові прямокутники в сітці
 * — саме те, що вже є на сайті в п'яти інших місцях. Тут переходи
 * зроблено як список рядків із розділювальними лініями: візуально
 * тихіше, читається швидше, і сторінки перестають закінчуватися
 * однаково.
 */

import { Section } from '@astryxdesign/core/Section';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Icon } from '@astryxdesign/core/Icon';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Container } from './Container';
import { CallbackButton } from './CallbackDialog';
import { nextSteps } from '@/config/nextSteps';
import { site } from '@/config/site';

export function NextSteps({
  page,
  ctaLabel = 'Замовити дзвінок юриста',
}: {
  /** Ключ із src/config/nextSteps.ts */
  page: keyof typeof nextSteps;
  ctaLabel?: string;
}) {
  const block = nextSteps[page];
  if (!block) return null;

  return (
    <Section variant="transparent" padding={8} paddingBlock={10}>
      <Container rhythm="minor">
        <div className="next-steps">
          <VStack gap={5}>
            <Heading level={2}>{block.title}</Heading>

            <ul className="next-steps__list">
              {block.steps.map((s) => (
                <li key={s.href} className="next-steps__item">
                  <Link href={s.href} className="next-steps__link">
                    <span className="next-steps__label">{s.label}</span>
                    <span className="next-steps__hint">{s.hint}</span>
                    <Icon
                      icon={ArrowRightIcon}
                      size="sm"
                      color="accent"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </VStack>

          <div className="next-steps__cta">
            <VStack gap={3} hAlign="start">
              <Text as="p" type="large">
                Не знаєте, що з цього стосується саме вас?
              </Text>
              <Text as="p" type="supporting">
                Залиште номер — юрист уточнить обставини й скаже, який крок
                доречний у вашій ситуації. Документи надсилати не потрібно.
              </Text>
              <HStack gap={3} wrap="wrap" vAlign="center">
                <CallbackButton label={ctaLabel} />
                <Text type="supporting">
                  або {site.workingHours.toLowerCase()}
                </Text>
              </HStack>
            </VStack>
          </div>
        </div>
      </Container>
    </Section>
  );
}
