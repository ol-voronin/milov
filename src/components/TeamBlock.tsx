'use client';

import { Grid } from '@astryxdesign/core/Grid';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Link } from '@astryxdesign/core/Link';
import { Icon } from '@astryxdesign/core/Icon';
import {
  CheckBadgeIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

/** Нейтральні портрети-заглушки, поки не додані реальні фото */
const placeholders = ['/team/placeholder-1.jpg', '/team/placeholder-2.jpg'];
import { team } from '@/config/site';
import { CheckList } from './CheckList';
import { CallbackButton } from './CallbackDialog';

/**
 * Блок команди.
 * - Показує свідоцтво та посилання на ЄРАУ лише коли поля заповнені.
 * - Роль («Адвокат» / «Юрист») задається у src/config/site.ts —
 *   «Адвокат» дозволено лише за наявності чинного свідоцтва.
 * - Поки published=false, замість імен-заглушок показується
 *   плейсхолдер із підказкою, яке фото потрібне.
 */
export function TeamBlock() {
  const published = team.filter((m) => m.published);
  const showPlaceholders = published.length === 0;
  const members = showPlaceholders ? team : published;

  return (
    <VStack gap={5}>
      <VStack gap={3}>
        <span className="section-rule" aria-hidden="true" />
        <Heading level={2}>Хто працює з вашою справою</Heading>
        <Text as="p" type="body" color="secondary" textWrap="pretty">
          З кожним зверненням працює конкретна людина, а не «команда фахівців».
          Ви знатимете, хто веде вашу справу, ще до початку роботи.
        </Text>
      </VStack>

      <Grid columns={{ minWidth: 300, max: 2 }} gap={5}>
        {members.map((member, i) => (
          <article className="person-card" key={`${member.name}-${i}`}>
            {/* Фото спеціаліста. Поки реального немає — нейтральна
                заглушка-портрет, щоб картка не виглядала як вайрфрейм.
                TODO: покладіть фото у /public/team/ і вкажіть шлях
                у src/config/site.ts → team[].photo */}
            <img
              className="person-card__photo"
              src={member.photo || placeholders[i % placeholders.length]}
              alt={member.photo ? member.name : 'Портрет спеціаліста'}
              loading="lazy"
            />

            <VStack gap={3} padding={5}>
              <VStack gap={1}>
                <Heading level={3}>
                  {showPlaceholders ? 'Ім’я спеціаліста' : member.name}
                </Heading>
                <HStack gap={2} vAlign="center" wrap="wrap">
                  <span className="person-card__role">{member.role}</span>
                  {member.certificateNumber ? (
                    <HStack gap={1} vAlign="center">
                      <Icon icon={CheckBadgeIcon} size="sm" color="accent" />
                      <Text type="supporting">
                        Свідоцтво {member.certificateNumber}
                      </Text>
                    </HStack>
                  ) : null}
                </HStack>
              </VStack>

              <Text as="p" type="body" color="secondary" textWrap="pretty">
                {member.experience}
              </Text>

              <VStack gap={2}>
                <Text type="label" weight="semibold">
                  Напрями роботи
                </Text>
                <CheckList items={[...member.focusAreas]} tone="navy" />
              </VStack>

              {member.registryLink ? (
                <Link href={member.registryLink} isExternalLink isStandalone>
                  <HStack gap={1} vAlign="center">
                    Перевірити в Єдиному реєстрі адвокатів
                    <Icon icon={ArrowTopRightOnSquareIcon} size="sm" color="inherit" />
                  </HStack>
                </Link>
              ) : null}
            </VStack>
          </article>
        ))}
      </Grid>

      <HStack gap={3} wrap="wrap" vAlign="center">
        <CallbackButton label="Записатися на розмову" size="lg" />
        <Text type="supporting">Розмову веде юрист, а не менеджер.</Text>
      </HStack>
    </VStack>
  );
}
