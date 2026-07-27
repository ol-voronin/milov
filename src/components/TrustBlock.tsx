'use client';

import { Grid } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';
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

/**
 * Блок довіри.
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
    <VStack gap={4}>
      <Heading level={2}>Чому нам можна довіряти</Heading>
      <Text as="p" type="body" color="secondary">
        Ми не обіцяємо результат без аналізу документів. Спочатку з’ясовуємо
        обставини, перевіряємо правові підстави та пояснюємо можливі варіанти дій.
      </Text>
      <Grid columns={{ minWidth: 250, max: 4 }} gap={4}>
        {trustItems.map((item) => (
          <Card key={item.title} padding={5} variant="muted">
            <VStack gap={2}>
              <HStack gap={2} vAlign="center">
                <Icon icon={item.icon} size="md" color="accent" />
                <Text type="label" weight="semibold">
                  {item.title}
                </Text>
              </HStack>
              <Text as="p" type="supporting">
                {item.text}
              </Text>
            </VStack>
          </Card>
        ))}
      </Grid>
    </VStack>
  );
}
