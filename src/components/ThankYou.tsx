'use client';

/**
 * Вміст сторінки подяки.
 * Виділено в клієнтський компонент: heroicons — forwardRef-компоненти,
 * і їх не можна передавати як props із серверного компонента.
 */

import { Section } from '@astryxdesign/core/Section';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Link } from '@astryxdesign/core/Link';
import { Icon } from '@astryxdesign/core/Icon';
import { Center } from '@astryxdesign/core/Center';
import {
  CheckCircleIcon,
  PhoneIcon,
  DocumentTextIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { ButtonLink } from './ButtonLink';
import { site } from '@/config/site';

const nextLinks = [
  {
    title: 'Корисна інформація',
    text: 'Практичні матеріали простою мовою',
    href: '/korysna-informatsiya',
    icon: DocumentTextIcon,
  },
  {
    title: 'Поширені запитання',
    text: 'Короткі відповіді на найчастіші питання',
    href: '/faq',
    icon: QuestionMarkCircleIcon,
  },
];

export function ThankYou() {
  return (
    <>
      <Section variant="muted" padding={8} paddingBlock={10}>
        <Center axis="horizontal">
          <VStack gap={4} hAlign="center" maxWidth={640}>
            <span className="success-mark" aria-hidden="true">
              <Icon icon={CheckCircleIcon} size="lg" color="accent" />
            </span>
            <Heading level={1} justify="center" textWrap="balance">
              Дякуємо. Звернення отримано.
            </Heading>
            <Text as="p" type="large" color="secondary" justify="center" textWrap="pretty">
              {site.callbackTimePromise}
            </Text>
            <HStack gap={2} vAlign="center" wrap="wrap" hAlign="center">
              <Icon icon={PhoneIcon} size="sm" color="accent" />
              <Text type="body" color="secondary">
                Питання термінове?
              </Text>
              <Link href={`tel:${site.phone}`} isStandalone>
                {site.phone}
              </Link>
              <Text type="supporting">({site.workingHours})</Text>
            </HStack>
          </VStack>
        </Center>
      </Section>

      <Section variant="transparent" padding={8} paddingBlock={10}>
        <Center axis="horizontal">
          <VStack gap={5} width="100%" maxWidth={1120}>
            <Heading level={2} justify="center">
              Що можна почитати тим часом
            </Heading>
            <Grid columns={{ minWidth: 260, max: 2 }} gap={4}>
              {nextLinks.map((l) => (
                <Card key={l.href} padding={5}>
                  <VStack gap={3}>
                    <span className="icon-circle" aria-hidden="true">
                      <Icon icon={l.icon} size="lg" color="accent" />
                    </span>
                    <Heading level={3}>{l.title}</Heading>
                    <Text as="p" type="body" color="secondary">
                      {l.text}
                    </Text>
                    <ButtonLink label="Відкрити" variant="secondary" href={l.href} />
                  </VStack>
                </Card>
              ))}
            </Grid>
            <Center axis="horizontal">
              <ButtonLink label="На головну" variant="ghost" href="/" />
            </Center>
          </VStack>
        </Center>
      </Section>
    </>
  );
}
