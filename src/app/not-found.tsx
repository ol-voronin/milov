import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/Stack';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Container } from '@/components/Container';
import { ButtonLink } from '@/components/ButtonLink';

export default function NotFound() {
  return (
    <Section variant="transparent" padding={10}>
      <Container maxWidth={640} gap={4}>
        <Heading level={1}>Сторінку не знайдено</Heading>
        <Text as="p" type="body" color="secondary" textWrap="pretty">
          Можливо, посилання застаріло або в адресі є помилка. Якщо ви шукали
          інформацію про виплати чи документи — почніть з головної сторінки або
          зателефонуйте нам.
        </Text>
        <VStack gap={2} hAlign="start">
          <ButtonLink label="На головну" variant="primary" href="/" />
          <ButtonLink
            label="Замовити дзвінок"
            variant="secondary"
            href="/#callback"
          />
        </VStack>
      </Container>
    </Section>
  );
}
