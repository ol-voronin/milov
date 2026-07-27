'use client';

import { Card } from '@astryxdesign/core/Card';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Avatar } from '@astryxdesign/core/Avatar';
import { Link } from '@astryxdesign/core/Link';
import { Badge } from '@astryxdesign/core/Badge';
import { List, ListItem } from '@astryxdesign/core/List';
import { Icon } from '@astryxdesign/core/Icon';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { team } from '@/config/site';

/**
 * Блок команди.
 * - Показує свідоцтво та посилання на ЄРАУ лише коли поля заповнені.
 * - Роль («Адвокат» / «Юрист») задається у src/config/site.ts —
 *   «Адвокат» дозволено лише за наявності чинного свідоцтва.
 */
export function TeamBlock() {
  return (
    <VStack gap={4}>
      <Heading level={2}>Хто працює з вашою справою</Heading>
      {team.map((member) => (
        <Card key={member.name} padding={6}>
          <VStack gap={4}>
            <HStack gap={4} vAlign="center" wrap="wrap">
              <Avatar
                size="xl"
                name={member.name}
                src={member.photo || undefined}
              />
              <VStack gap={1}>
                <Heading level={3}>{member.name}</Heading>
                <Badge variant="info" label={member.role} />
              </VStack>
            </HStack>

            <Text as="p" type="body" color="secondary">
              {member.experience}
            </Text>

            <VStack gap={2}>
              <Text type="label" weight="semibold">
                Основні напрями роботи
              </Text>
              <List>
                {member.focusAreas.map((area) => (
                  <ListItem
                    key={area}
                    label={area}
                    startContent={
                      <Icon icon={CheckCircleIcon} size="sm" color="accent" />
                    }
                  />
                ))}
              </List>
            </VStack>

            {member.certificateNumber ? (
              <Text as="p" type="supporting">
                Свідоцтво про право на заняття адвокатською діяльністю:{' '}
                {member.certificateNumber}
              </Text>
            ) : null}

            {member.registryLink ? (
              <Link href={member.registryLink} isExternalLink isStandalone>
                Перевірити у Єдиному реєстрі адвокатів України
              </Link>
            ) : null}
          </VStack>
        </Card>
      ))}
    </VStack>
  );
}
