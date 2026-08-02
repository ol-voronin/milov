'use client';

import NextLink from 'next/link';
import { Button } from '@astryxdesign/core/Button';
import type { ComponentProps } from 'react';

type ButtonLinkProps = Omit<ComponentProps<typeof Button>, 'onClick' | 'type'> & {
  href: string;
};

/**
 * Кнопка-посилання: вигляд Button, поведінка справжнього посилання.
 *
 * ЩО БУЛО НЕ ТАК. Раніше компонент рендерив <button> і викликав
 * router.push() у onClick. Для ока різниці немає, але людина втрачала
 * усе, що вміє посилання:
 *   — не скопіювати адресу правою кнопкою;
 *   — не відкрити в новій вкладці (Ctrl/Cmd-клік, середня кнопка);
 *   — не зберегти файл через «Зберегти посилання як» — критично для
 *     чекліста PDF, який координатор фонду хоче переслати колезі;
 *   — пошукові системи не бачать переходу, бо в розмітці немає href;
 *   — зчитувач екрана оголошує «кнопка» замість «посилання», що для
 *     навігації є порушенням очікуваної семантики (WCAG 2.2).
 *
 * Astryx Button уміє це сам: з href рендериться <a>, а `as` дозволяє
 * підставити маршрутизатор Next.js для внутрішніх переходів без
 * перезавантаження сторінки.
 */
export function ButtonLink({ href, ...props }: ButtonLinkProps) {
  /**
   * Зовнішні схеми й файли віддаємо браузеру напряму: маршрутизатор
   * Next.js їх не обробляє, а для PDF потрібне звичайне завантаження.
   */
  const isPlainHref =
    href.startsWith('http') ||
    href.startsWith('tel:') ||
    href.startsWith('mailto:') ||
    href.startsWith('viber:') ||
    href.startsWith('/downloads/') ||
    href.endsWith('.pdf');

  const isExternalSite = href.startsWith('http');

  return (
    <Button
      {...props}
      href={href}
      as={isPlainHref ? undefined : NextLink}
      // Зовнішні сайти — у новій вкладці, щоб людина не втрачала місце
      // в тексті, який читала
      target={isExternalSite ? '_blank' : undefined}
      rel={isExternalSite ? 'noopener noreferrer' : undefined}
    />
  );
}
