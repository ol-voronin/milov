'use client';

/**
 * Акцентний блок «Чим допомагаємо ми».
 * Замість плоского списку — виділена картка з іконками та CTA,
 * щоб око чіплялося за головне на довгій сторінці.
 */

import { Card } from '@astryxdesign/core/Card';
import { Grid } from '@astryxdesign/core/Grid';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Icon } from '@astryxdesign/core/Icon';
import { CheckIcon } from '@heroicons/react/20/solid';
import { CallbackButton } from './CallbackDialog';

export function WeHelpBlock({
  items,
  title = 'Чим допомагаємо ми',
  note,
  topic,
}: {
  items: string[];
  title?: string;
  note?: string;
  topic?: string;
}) {
  return (
    <Card padding={0} variant="transparent">
      <div className="we-help">
        <VStack gap={5}>
          <VStack gap={2}>
            <Heading level={2}>{title}</Heading>
            {note ? (
              <Text as="p" type="body" color="secondary" textWrap="pretty">
                {note}
              </Text>
            ) : null}
          </VStack>

          <Grid columns={{ minWidth: 300, max: 2 }} gap={4}>
            {items.map((item) => (
              <HStack gap={3} vAlign="start" key={item}>
                <span className="we-help__check" aria-hidden="true">
                  <Icon icon={CheckIcon} size="sm" color="inherit" />
                </span>
                <Text as="p" type="body">
                  {item}
                </Text>
              </HStack>
            ))}
          </Grid>

          <HStack gap={3} wrap="wrap" vAlign="center">
            <CallbackButton label="Обговорити мою ситуацію" size="lg" topic={topic} />
            <Text type="supporting">
              Достатньо імені та номера телефону.
            </Text>
          </HStack>
        </VStack>
      </div>
    </Card>
  );
}
