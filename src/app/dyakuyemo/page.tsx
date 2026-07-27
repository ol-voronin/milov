import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Link } from '@astryxdesign/core/Link';
import { Container } from '@/components/Container';
import { ButtonLink } from '@/components/ButtonLink';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Дякуємо за звернення',
  description: 'Ваше звернення отримано.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <Section variant="transparent" padding={10}>
      <Container maxWidth={640} gap={4}>
        <Heading level={1}>Дякуємо. Звернення отримано.</Heading>
        <Text as="p" type="large" color="secondary" textWrap="pretty">
          {site.callbackTimePromise}
        </Text>
        <Text as="p" type="body" color="secondary" textWrap="pretty">
          Не дочекалися дзвінка або питання термінове? Зателефонуйте нам
          самостійно: <Link href={`tel:${site.phone}`}>{site.phone}</Link> (
          {site.workingHours}).
        </Text>
        {site.telegram || site.viber ? (
          <VStack gap={2} hAlign="start">
            {site.telegram ? (
              <ButtonLink label="Написати в Telegram" variant="secondary" href={site.telegram} />
            ) : null}
            {site.viber ? (
              <ButtonLink label="Написати у Viber" variant="secondary" href={site.viber} />
            ) : null}
          </VStack>
        ) : null}
        <Text as="p" type="body" color="secondary" textWrap="pretty">
          Тим часом можете переглянути корисні матеріали — можливо, там уже є
          відповідь на частину ваших запитань.
        </Text>
        <VStack gap={2} hAlign="start">
          <ButtonLink
            label="Корисна інформація"
            variant="secondary"
            href="/korysna-informatsiya"
          />
          <ButtonLink label="На головну" variant="ghost" href="/" />
        </VStack>
      </Container>
    </Section>
  );
}
