import { z } from 'zod';

/**
 * Модель заявки на зворотний дзвінок.
 * Використовується і на клієнті (react-hook-form), і на сервері (API route).
 *
 * Privacy by design: збираємо лише мінімально необхідні дані.
 */

export const leadTopics = [
  { value: 'death', label: 'Загибель або смерть військовослужбовця' },
  { value: 'delay', label: 'Затримка виплати' },
  { value: 'refusal', label: 'Відмова у виплаті' },
  { value: 'dispute', label: 'Спір між членами родини' },
  { value: 'missing', label: 'Зникнення безвісти або полон' },
  { value: 'other', label: 'Інша ситуація' },
] as const;

export const contactMethods = [
  { value: 'phone', label: 'Телефон' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'viber', label: 'Viber' },
] as const;

const topicValues = leadTopics.map((t) => t.value) as [string, ...string[]];
const methodValues = contactMethods.map((m) => m.value) as [string, ...string[]];

/** Український номер: +380XXXXXXXXX або 0XXXXXXXXX (пробіли/дужки/дефіси допускаються) */
const phoneRegex = /^\+?[\d\s()-]{9,18}$/;

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Вкажіть ім’я (щонайменше 2 символи)')
    .max(100, 'Занадто довге ім’я'),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Вкажіть номер телефону, наприклад +380 67 000 00 00'),
  topic: z.enum(topicValues, {
    message: 'Оберіть тему звернення',
  }),
  contactMethod: z.enum(methodValues).optional(),
  preferredTime: z.string().trim().max(100, 'Занадто довгий текст').optional(),
  message: z
    .string()
    .trim()
    .max(500, 'Опис має бути не довшим за 500 символів')
    .optional(),
  consent: z.literal(true, {
    message: 'Потрібна згода на обробку персональних даних',
  }),
  /** Сторінка, з якої надіслано заявку (шлях без параметрів, без PII) */
  sourcePage: z.string().trim().max(200).optional(),
  /** UTM-мітки — лише службові значення кампаній, без персональних даних */
  utm: z
    .object({
      source: z.string().trim().max(100).optional(),
      medium: z.string().trim().max(100).optional(),
      campaign: z.string().trim().max(100).optional(),
    })
    .optional(),
  /** Honeypot: приховане поле, справжні користувачі його не заповнюють */
  website: z.string().max(0, 'Spam detected').optional().or(z.literal('')),
  /** Токен Cloudflare Turnstile (якщо ввімкнено) */
  turnstileToken: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export function topicLabel(value: string): string {
  return leadTopics.find((t) => t.value === value)?.label ?? value;
}
