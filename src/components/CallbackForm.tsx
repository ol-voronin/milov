'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { TextInput } from '@astryxdesign/core/TextInput';
import { TextArea } from '@astryxdesign/core/TextArea';
import { Selector } from '@astryxdesign/core/Selector';
import { RadioList, RadioListItem } from '@astryxdesign/core/RadioList';
import { CheckboxInput } from '@astryxdesign/core/CheckboxInput';
import { Collapsible } from '@astryxdesign/core/Collapsible';
import { Field } from '@astryxdesign/core/Field';
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
  /** Викликається після успішного надсилання (напр. закрити модалку) */
  onSuccess?: () => void;
};

/** Легке форматування телефону без жорсткої маски (аудит F7) */
function formatPhone(raw: string): string {
  const cleaned = raw.replace(/[^\d+]/g, '').slice(0, 13);
  if (!cleaned.startsWith('+380')) return raw.slice(0, 18);
  const digits = cleaned.slice(4);
  const parts = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)];
  return ('+380 ' + parts.filter(Boolean).join(' ')).trim();
}

/**
 * Форма замовлення дзвінка.
 * Privacy by design + прогресивне розкриття: 3 обов'язкові поля одразу,
 * опційні — за бажанням (аудит F3, патерн GOV.UK «одна дія за раз»).
 */
export function CallbackForm({ defaultTopic, onSuccess }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

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
        body: JSON.stringify({ ...data, sourcePage: pathname, utm }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? 'Не вдалося надіслати заявку');
      }

      setStatus('success');
      onSuccess?.();
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
        <div aria-live="polite" role="status">
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
              label="Ім’я · обов’язково"
              value={field.value ?? ''}
              onChange={(v) => field.onChange(v)}
              isRequired
              placeholder="Як до вас звертатися"
              htmlName="name"
              status={
                errors.name ? { type: 'error', message: errors.name.message } : undefined
              }
            />
          )}
        />

        {/* Телефон: нативний input type=tel — правильна клавіатура на мобільних (аудит F1) */}
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Field
              label="Телефон · обов’язково"
              inputID="lead-phone"
              isRequired
              description="Юрист зателефонує на цей номер"
              descriptionID="lead-phone-desc"
              status={
                errors.phone
                  ? { type: 'error', message: errors.phone.message }
                  : undefined
              }
              statusVariant="detached"
            >
              <input
                id="lead-phone"
                className="native-input"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                name="phone"
                placeholder="+380 __ ___ __ __"
                aria-describedby="lead-phone-desc"
                aria-invalid={errors.phone ? 'true' : undefined}
                value={field.value ?? ''}
                onChange={(e) => field.onChange(formatPhone(e.target.value))}
                onBlur={field.onBlur}
              />
            </Field>
          )}
        />

        {/* Тема: радіо-список замість випадного меню — всі опції видимі одразу (аудит A3) */}
        <Controller
          name="topic"
          control={control}
          render={({ field }) => (
            <RadioList
              label="Тема звернення · обов’язково"
              value={field.value ?? ''}
              onChange={(v) => field.onChange(v)}
              isRequired
              status={
                errors.topic ? { type: 'error', message: errors.topic.message } : undefined
              }
            >
              {leadTopics.map((t) => (
                <RadioListItem key={t.value} value={t.value} label={t.label} />
              ))}
            </RadioList>
          )}
        />

        {/* Опційні поля — за прогресивним розкриттям (аудит F3) */}
        <Collapsible
          defaultIsOpen={false}
          trigger={<Text type="label" weight="medium">Додати деталі (необов’язково)</Text>}
        >
          <VStack gap={4} paddingBlock={2}>
            <Controller
              name="contactMethod"
              control={control}
              render={({ field }) => (
                <Selector
                  label="Зручний спосіб зв’язку · за бажанням"
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
                  label="Зручний час для дзвінка · за бажанням"
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
                  label="Короткий опис ситуації · за бажанням"
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
          </VStack>
        </Collapsible>

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
                status={
                  errors.consent
                    ? { type: 'error', message: errors.consent.message ?? 'Потрібна згода' }
                    : undefined
                }
              />
              <Text as="p" type="supporting">
                Як ми обробляємо дані —{' '}
                <Link href="/polityka-konfidentsiynosti">політика конфіденційності</Link>.
              </Text>
            </VStack>
          )}
        />

        <SensitiveDataNotice />

        <VStack gap={2} hAlign="start">
          <Button
            label="Замовити дзвінок юриста"
            variant="primary"
            size="lg"
            type="submit"
            isLoading={isSubmitting || status === 'submitting'}
          />
          {/* Що буде далі — знімає невизначеність (аудит F5, патерн Дії) */}
          <Text as="p" type="supporting">
            Після надсилання юрист зателефонує у робочі години ({site.workingHours}).
            Нічого надсилати заздалегідь не потрібно.
          </Text>
          <Text as="p" type="supporting">
            {site.initialCallTerms}
          </Text>
        </VStack>
      </VStack>
    </form>
  );
}
