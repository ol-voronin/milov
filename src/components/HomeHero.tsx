'use client';

/**
 * Hero головної сторінки.
 * Клієнтський компонент: heroicons не передаються через межу server → client.
 */

import { Section } from '@astryxdesign/core/Section';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Icon } from '@astryxdesign/core/Icon';
import { CheckIcon } from '@heroicons/react/20/solid';
import { Container } from './Container';
import { ButtonLink } from './ButtonLink';
import { CallbackButton } from './CallbackDialog';
import { SectionAccent } from './HeroVisual';
import { Reveal } from './Reveal';
import { photos } from '@/config/photos';

const trustSignals = [
  'Конфіденційно',
  'Працюємо по всій Україні',
  'Консультації онлайн і телефоном',
  'Пояснюємо без складних термінів',
];

export function HomeHero() {
  return (
    <Section variant="transparent" padding={8} paddingBlock={10}>
      <Container gap={6}>
        <Grid columns={{ minWidth: 340, max: 2 }} gap={8} align="center">
          <VStack gap={5}>
            <SectionAccent />
            <Heading level={1} type="display-3" textWrap="balance">
              Юридична допомога родинам військових
            </Heading>
            <Text as="p" type="large" color="secondary" textWrap="pretty">
              Оформимо належні виплати, зберемо документи та оскаржимо відмову.
              Просто залиште номер — юрист пояснить, з чого почати.
            </Text>
            <HStack gap={3} wrap="wrap">
              <CallbackButton label="Замовити дзвінок" size="lg" />
              <ButtonLink
                label="Обрати свою ситуацію"
                variant="secondary"
                size="lg"
                href="/#situatsii"
              />
            </HStack>
            {/* Довірчі позначки — спокійний текстовий рядок, а не кнопки */}
            <VStack paddingBlock={2}>
              <HStack gap={5} wrap="wrap" vAlign="center">
                {trustSignals.map((signal) => (
                  <HStack gap={1.5} vAlign="center" key={signal}>
                    <Icon icon={CheckIcon} size="sm" color="accent" />
                    <Text type="supporting">{signal}</Text>
                  </HStack>
                ))}
              </HStack>
            </VStack>
          </VStack>
          <Reveal delay={1}>
            {/* Фото — безкоштовний фотосток Unsplash (src/config/photos.ts).
                TODO: за бажанням замініть на власне фото — без сцен горя. */}
            <span className="hero-photo-frame">
              <img
                src={photos.home.src}
                alt={photos.home.alt}
                loading="eager"
                fetchPriority="high"
              />
              <span className="hero-photo-accent" aria-hidden="true" />
            </span>
          </Reveal>
        </Grid>
      </Container>
    </Section>
  );
}
