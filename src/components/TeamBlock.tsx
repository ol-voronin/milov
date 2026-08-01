'use client';

import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Link } from '@astryxdesign/core/Link';
import { Icon } from '@astryxdesign/core/Icon';
import {
  CheckBadgeIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import { team } from '@/config/site';
import { CallbackButton } from './CallbackDialog';

/**
 * Блок команди — п'ять напрямів роботи.
 *
 * ЧОМУ ЗА НАПРЯМАМИ, А НЕ ЗА ПОСАДАМИ. Людині, яка щойно втратила
 * близького, ім'я незнайомого юриста нічого не каже. Питання, на яке
 * вона шукає відповідь — «хто взагалі розбирається в моїй ситуації».
 * Тому картка спершу називає напрям, і лише потім людину.
 *
 * ЧОМУ НЕ КАРТКИ-ПРЯМОКУТНИКИ. Сітка однакових скруглених карток уже
 * використана на сайті в п'яти інших блоках. Тут — горизонтальні смуги
 * з портретом ліворуч і напрямом у заголовку: інший ритм, менше
 * «конструктора».
 *
 * Свідоцтво та посилання на ЄРАУ показуються лише коли поля заповнені.
 * Роль «Адвокат» дозволена тільки за наявності чинного свідоцтва —
 * контроль у src/config/site.ts.
 */
export function TeamBlock() {
  /** Поки жодного запису не опубліковано — показуємо всі як напрями */
  const published = team.filter((m) => m.published);
  const awaitingContent = published.length === 0;
  const members = awaitingContent ? team : published;

  return (
    <VStack gap={5}>
      <VStack gap={3} maxWidth={720}>
        <span className="section-rule" aria-hidden="true" />
        <Heading level={2}>Хто працює з вашою справою</Heading>
        <Text as="p" type="body" color="secondary" textWrap="pretty">
          Ми не передаємо справу «черговому спеціалісту». За кожним напрямом
          закріплена конкретна людина, і ви знатимете, хто веде вашу справу,
          ще до початку роботи.
        </Text>
      </VStack>

      <ul className="team-list">
        {members.map((member, i) => (
          <li className="team-row" key={`${member.focus}-${i}`}>
            <div className="team-row__portrait">
              {member.photo ? (
                <img src={member.photo} alt={member.name} loading="lazy" />
              ) : (
                /* Поки фото немає — монограма напряму замість силуету:
                   порожній силует читається як «сайт недороблений»,
                   а нейтральний знак виглядає як свідоме рішення */
                <span className="team-row__mark" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
              )}
            </div>

            <VStack gap={3}>
              <VStack gap={1}>
                <Heading level={3}>{member.focus}</Heading>
                <Text as="p" type="supporting">
                  {member.focusNote}
                </Text>
              </VStack>

              <Text as="p" type="body" color="secondary" textWrap="pretty">
                {member.experience}
              </Text>

              <ul className="team-row__tasks">
                {member.focusAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>

              {/* Ім'я, роль і свідоцтво — коли власник їх заповнить */}
              {member.name ? (
                <HStack gap={3} vAlign="center" wrap="wrap">
                  <Text type="label" weight="semibold">
                    {member.name}
                  </Text>
                  <span className="person-card__role">{member.role}</span>
                  {member.experienceYears ? (
                    <Text type="supporting">
                      стаж {member.experienceYears}
                    </Text>
                  ) : null}
                  {member.certificateNumber ? (
                    <HStack gap={1} vAlign="center">
                      <Icon icon={CheckBadgeIcon} size="sm" color="accent" />
                      <Text type="supporting">
                        Свідоцтво {member.certificateNumber}
                      </Text>
                    </HStack>
                  ) : null}
                  {member.registryLink ? (
                    <Link href={member.registryLink} isExternalLink isStandalone>
                      <HStack gap={1} vAlign="center">
                        Перевірити в реєстрі адвокатів
                        <Icon
                          icon={ArrowTopRightOnSquareIcon}
                          size="sm"
                          color="inherit"
                        />
                      </HStack>
                    </Link>
                  ) : null}
                </HStack>
              ) : null}
            </VStack>
          </li>
        ))}
      </ul>

      <HStack gap={3} wrap="wrap" vAlign="center">
        <CallbackButton label="Записатися на розмову" />
        <Text type="supporting">
          Розмову веде юрист відповідного напряму, а не менеджер.
        </Text>
      </HStack>
    </VStack>
  );
}
