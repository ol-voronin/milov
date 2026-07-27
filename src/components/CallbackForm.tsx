'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { TextInput } from '@astryxdesign/core/TextInput';
import { TextArea } from '@astryxdesign/core/TextArea';
import { Selector } from '@astryxdesign/core/Selector';
import { CheckboxInput } from '@astryxdesign/core/CheckboxInput';
import { Button } from '@astryxdesign/core/Button';
import { Banner } from '@astryxdesign/core/Banner';
import { Text } from '@astryxdesign/core/Text';
import { Link } from '@astryxdesign/core/Link';
import { VisuallyHidden } from '@astryxdesign/core/VisuallyHidden';
import {
  leadSchema,
  leadTopics,
  contactMethods,
  type LeadInput,
} from '@/lib/leadSchema';
import { site } from '@/config/site';
import { SensitiveDataNotice } from './LegalComponents';

type Props = {
  /** Попередньо обрана тема (напр. з картки ситуації) */
  defaultTopic?: string;
};

/**
 * Форма замовлення дзвінка.
 * Privacy by design: мінімум обов'язкових полів (ім'я, телефон, тема),
 * honeypot, без передачі PII в аналітику чи URL.
 */
export function CallbackForm({ defaultTopic }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const liveRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      phone: '',
      topic: (defaultTopic as LeadInput['topic']) ?? undefined,
      contactMethod: undefined,
      preferredTime: '',
      message: '',
      consent: undefined as unknown as true,
      website: '',
    },
  });

  // Тема з URL (?tema=delay) — коли людина прийшла з картки ситуації
  useEffect(() => {
    const tema = searchParams.get('tema');
    if (tema && leadTopics.some((t) => t.value === tema)) {
      setValue('topic', tema as LeadInput['topic']);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: LeadInput) => {
    setServerError(null);
    setStatus('submitting');
    try {
      // UTM-мітки: лише службові значення кампанії, без персональних даних
      const utm = {
        source: searchParams.get('utm_source') ?? undefined,
        medium: searchParams.get('utm_medium') ?? undefined,
        campaign: searchParams.get('utm_campaign') ?? undefined,
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          sourcePage: pathname,
          utm,
        }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? 'Не вдалося надіслати заявку');
      }

      setStatus('success');
      router.push('/dyakuyemo');
    } catch (e) {
      setStatus('idle');
      setServerError(
        e instanceof Error && e.message !== 'Failed to fetch'
          ? e.message
          : 'Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.',
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <VStack gap={4} maxWidth={560}>
      {/* aria-live статус для screen reader */}
      <div ref={liveRef} aria-live="polite" role="status">
        {status === 'success' ? (
          <Text as="p" type="body">
            Дякуємо. Звернення отримано. {site.callbackTimePromise}
          </Text>
        ) : (
          <VisuallyHidden>
            {status === 'submitting' ? 'Надсилаємо заявку…' : ''}
          </VisuallyHidden>
        )}
      </div>

      {serverError ? (
        <Banner status="error" title="Помилка надсилання" description={serverError} />
      ) : null}

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Ім’я"
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            isRequired
            placeholder="Як до вас звертатися"
            status={
              errors.name ? { type: 'error', message: errors.name.message } : undefined
            }
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Телефон"
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            isRequired
            placeholder="+380 __ ___ __ __"
            description="Юрист зателефонує на цей номер"
            status={
              errors.phone ? { type: 'error', message: errors.phone.message } : undefined
            }
          />
        )}
      />

      <Controller
        name="topic"
        control={control}
        render={({ field }) => (
          <Selector
            label="Тема звернення"
            placeholder="Оберіть ситуацію"
            options={leadTopics.map((t) => ({ value: t.value, label: t.label }))}
            value={field.value}
            onChange={(v) => field.onChange(v)}
            isRequired
            status={
              errors.topic ? { type: 'error', message: errors.topic.message } : undefined
            }
          />
        )}
      />

      <Controller
        name="contactMethod"
        control={control}
        render={({ field }) => (
          <Selector
            label="Зручний спосіб зв’язку"
            placeholder="Телефон"
            options={contactMethods.map((m) => ({ value: m.value, label: m.label }))}
            value={field.value}
            onChange={(v) => field.onChange(v)}
            isOptional
          />
        )}
      />

      <Controller
        name="preferredTime"
        control={control}
        render={({ field }) => (
          <TextInput
            label="Зручний час для дзвінка"
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            isOptional
            placeholder="Наприклад: будні після 17:00"
          />
        )}
      />

      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <TextArea
            label="Короткий опис ситуації"
            value={field.value ?? ''}
            onChange={(v) => field.onChange(v)}
            isOptional
            rows={4}
            maxLength={500}
            placeholder="Кількома реченнями, без персональних документів"
            status={
              errors.message
                ? { type: 'error', message: errors.message.message }
                : undefined
            }
          />
        )}
      />

      {/* Honeypot: приховане поле для ботів */}
      <VisuallyHidden>
        <label htmlFor="lead-website">
          Не заповнюйте це поле
          <input
            id="lead-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register('website')}
          />
        </label>
      </VisuallyHidden>

      <Controller
        name="consent"
        control={control}
        render={({ field }) => (
          <VStack gap={1}>
            <CheckboxInput
              label="Я погоджуюся на обробку персональних даних для опрацювання мого звернення та зворотного зв’язку."
              value={field.value === true}
              onChange={(checked) => field.onChange(checked ? true : undefined)}
              isRequired
            />
            {errors.consent ? (
              <Text as="p" type="supporting">
                {errors.consent.message}
              </Text>
            ) : null}
            <Text as="p" type="supporting">
              Як ми обробляємо дані —{' '}
              <Link href="/polityka-konfidentsiynosti">політика конфіденційності</Link>.
            </Text>
          </VStack>
        )}
      />

      <SensitiveDataNotice />

      <HStack gap={3} vAlign="center" wrap="wrap">
        <Button
          label="Замовити дзвінок юриста"
          variant="primary"
          size="lg"
          type="submit"
          isLoading={isSubmitting || status === 'submitting'}
        />
        <Text type="supporting">{site.initialCallTerms}</Text>
        </HStack>
      </VStack>
    </form>
  );
}
