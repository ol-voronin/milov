'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@astryxdesign/core/Button';
import type { ComponentProps } from 'react';

type ButtonLinkProps = Omit<ComponentProps<typeof Button>, 'onClick' | 'type'> & {
  href: string;
};

/**
 * Кнопка-посилання: вигляд Button з навігацією Next.js.
 * Зовнішні посилання (tel:, mailto:, http…) відкриваються напряму.
 */
export function ButtonLink({ href, ...props }: ButtonLinkProps) {
  const router = useRouter();
  const isExternal =
    href.startsWith('http') ||
    href.startsWith('tel:') ||
    href.startsWith('mailto:') ||
    href.startsWith('viber:');

  return (
    <Button
      {...props}
      onClick={() => {
        if (isExternal) {
          window.location.href = href;
        } else {
          router.push(href);
        }
      }}
    />
  );
}
