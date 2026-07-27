import type { Metadata } from 'next';
import { Section } from '@astryxdesign/core/Section';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Card } from '@astryxdesign/core/Card';
import { Grid } from '@astryxdesign/core/Grid';
import { Link } from '@astryxdesign/core/Link';
import { Container } from '@/components/Container';
import { PageHero } from '@/components/ContentBlocks';
import { ButtonLink } from '@/components/ButtonLink';
import { CallbackSection } from '@/components/CallbackSection';
import { JsonLd, breadcrumbSchema } from '@/components/JsonLd';
import { site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Контакти',
  description:
    'Зв’яжіться з нами телефоном, електронною поштою або через форму на сайті. Працюємо з родинами військових по всій Україні, онлайн і телефоном.',
  alternates: { canonical: '/kontakty' },
};

export default function ContactsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Головна', path: '/' },
          { name: 'Контакти', path: '/kontakty' },
        ])}
      />

      <PageHero
        title="Контакти"
        lead="Оберіть зручний спосіб зв’язку. Якщо телефонувати важко — залиште заявку, і ми зателефонуємо самі."
      />

      <Section variant="transparent" padding={8} paddingBlock={0}>
        <Container>
          <Grid columns={{ minWidth: 260, max: 3 }} gap={4}>
            <Card padding={5}>
              <VStack gap={2}>
                <Heading level={2}>Телефон</Heading>
                <Link href={`tel:${site.phone}`} isStandalone>
                  {site.phone}
                </Link>
                <Text as="p" type="supporting">
                  {site.workingHours}
                </Text>
                <HStack gap={2} wrap="wrap">
                  <ButtonLink
                    label="Зателефонувати"
                    variant="primary"
                    href={`tel:${site.phone}`}
                  />
                </HStack>
              </VStack>
            </Card>

            <Card padding={5}>
              <VStack gap={2}>
                <Heading level={2}>Пошта та месенджери</Heading>
                <Link href={`mailto:${site.email}`} isStandalone>
                  {site.email}
                </Link>
                {/* Кнопки месенджерів показуються лише після додавання
                    реальних контактів у src/config/site.ts */}
                {site.telegram ? (
                  <ButtonLink label="Написати в Telegram" variant="secondary" href={site.telegram} />
                ) : null}
                {site.viber ? (
                  <ButtonLink label="Написати у Viber" variant="secondary" href={site.viber} />
                ) : null}
              </VStack>
            </Card>

            <Card padding={5}>
              <VStack gap={2}>
                <Heading level={2}>Формат роботи</Heading>
                <Text as="p" type="body" color="secondary">
                  {site.serviceArea}
                </Text>
                <Text as="p" type="body" color="secondary">
                  Місто: {site.city}
                </Text>
                <Text as="p" type="supporting">
                  Питання щодо персональних даних: {site.privacyContact}
                </Text>
              </VStack>
            </Card>
          </Grid>
        </Container>
      </Section>

      <CallbackSection />
    </>
  );
}
