'use client';

/**
 * Глобальна модалка «Замовити дзвінок юриста».
 * Форма відкривається поверх будь-якої сторінки (запит власника) —
 * людина не втрачає контекст читання. Сторінка /zamovyty-dzvinok
 * лишається як fallback для прямих посилань і no-JS.
 */

import {
  createContext,
  useCallback,
  useContext,
  useState,
  Suspense,
  type ReactNode,
} from 'react';
import dynamic from 'next/dynamic';
import { Dialog, DialogHeader } from '@astryxdesign/core/Dialog';
import { Button } from '@astryxdesign/core/Button';
import { Skeleton } from '@astryxdesign/core/Skeleton';
import { VStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';

const CallbackForm = dynamic(
  () => import('./CallbackForm').then((m) => m.CallbackForm),
  { ssr: false, loading: () => <Skeleton height={280} /> },
);

type CallbackDialogContextValue = {
  openCallback: (topic?: string) => void;
};

const CallbackDialogContext = createContext<CallbackDialogContextValue | null>(null);

export function useCallbackDialog(): CallbackDialogContextValue {
  const ctx = useContext(CallbackDialogContext);
  if (!ctx) {
    throw new Error('useCallbackDialog must be used within CallbackDialogProvider');
  }
  return ctx;
}

export function CallbackDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState<string | undefined>(undefined);

  const openCallback = useCallback((t?: string) => {
    setTopic(t);
    setIsOpen(true);
  }, []);

  return (
    <CallbackDialogContext.Provider value={{ openCallback }}>
      {children}
      <Dialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        width={560}
        maxHeight="90vh"
        purpose="form"
      >
        <DialogHeader title="Замовити дзвінок юриста" />
        <VStack paddingBlock={2} gap={3}>
          <Text as="p" type="supporting">
            Обов’язкові лише ім’я, телефон і тема. Решту можна розповісти
            голосом.
          </Text>
          {isOpen ? (
            <Suspense fallback={<Skeleton height={280} />}>
              <CallbackForm
                defaultTopic={topic}
                onSuccess={() => setIsOpen(false)}
              />
            </Suspense>
          ) : null}
        </VStack>
      </Dialog>
    </CallbackDialogContext.Provider>
  );
}

/**
 * Кнопка, що відкриває модалку форми. Заміна ButtonLink на /zamovyty-dzvinok.
 */
export function CallbackButton({
  label = 'Замовити дзвінок',
  variant = 'primary',
  size,
  topic,
  width,
}: {
  label?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  topic?: string;
  width?: string | number;
}) {
  const { openCallback } = useCallbackDialog();
  return (
    <Button
      label={label}
      variant={variant}
      size={size}
      width={width}
      onClick={() => openCallback(topic)}
    />
  );
}
