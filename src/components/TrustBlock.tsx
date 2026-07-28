'use client';

import { Grid } from '@astryxdesign/core/Grid';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Icon } from '@astryxdesign/core/Icon';
import {
  LockClosedIcon,
  DocumentCheckIcon,
  BanknotesIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';
import { hasAttorney } from '@/config/site';
import { CallbackButton } from './CallbackDialog';

/**
 * Блок довіри — темно-синя панель (запит власника).
 * ⚠️ Без вигаданих цифр, статистики чи відгуків. Лише факти про процес.
 * Сертифікати, публікації та анонімізовані судові рішення додаються сюди
 * після надання власником сайту.
 */
const trustItems = [
  {
    icon: DocumentCheckIcon,
    title: 'Договір про надання правової допомоги',
    text: 'Працюємо офіційно: обсяг послуг і вартість фіксуються письмово до початку роботи.',
  },
  {
    icon: LockClosedIcon,
    title: 'Конфіденційність звернення',
    text: 'Деталі вашої ситуації не передаються третім особам. Дані збираються в мінімальному обсязі.',
  },
  {
    icon: BanknotesIcon,
    title: 'Зрозуміла вартість',
    text: 'Жодних прихованих платежів: перелік послуг і ціна погоджуються заздалегідь.',
  },
  {
    icon: IdentificationIcon,
    title: hasAttorney
      ? 'Статус адвоката можна перевірити'
      : 'Чесно про статус спеціаліста',
    text: hasAttorney
      ? 'Номер свідоцтва та профіль у Єдиному реєстрі адвокатів України відкриті для перевірки.'
      : 'Ми прямо вказуємо роль спеціаліста, який працює з вашою справою, і не обіцяємо результат без аналізу документів.',
  },
];

export function TrustBlock() {
  return (
    <div className="trust-band">
      <VStack gap={6}>
        <VStack gap={3}>
          <span className="section-rule section-rule--light" aria-hidden="true" />
          <Heading level={2}>Чому нам можна довіряти</Heading>
          <VStack maxWidth={760}>
            <Text as="p" type="large" color="secondary" textWrap="pretty">
              Ми не обіцяємо результат без аналізу документів. Спочатку
              з’ясовуємо обставини, перевіряємо правові підстави та пояснюємо
              можливі варіанти дій.
            </Text>
          </VStack>
        </VStack>

        <Grid columns={{ minWidth: 250, max: 4 }} gap={4}>
          {trustItems.map((item) => (
            <div className="trust-card" key={item.title}>
              <VStack gap={3}>
                <span className="trust-card__icon" aria-hidden="true">
                  <Icon icon={item.icon} size="lg" color="inherit" />
                </span>
                <Text type="label" weight="semibold">
                  {item.title}
                </Text>
                <Text as="p" type="supporting">
                  {item.text}
                </Text>
              </VStack>
            </div>
          ))}
        </Grid>

        <HStack gap={3} wrap="wrap" vAlign="center">
          <CallbackButton label="Обговорити мою ситуацію" size="lg" />
          <Text type="supporting">Достатньо імені та номера телефону.</Text>
        </HStack>
      </VStack>
    </div>
  );
}
