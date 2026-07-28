import type { Metadata } from 'next';
import { ThankYou } from '@/components/ThankYou';

export const metadata: Metadata = {
  title: 'Дякуємо за звернення',
  description: 'Ваше звернення отримано.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYou />;
}
