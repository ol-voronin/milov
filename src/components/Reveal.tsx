'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * М'яка поява блоку при прокручуванні (fade-up).
 * - Одноразова, ледь помітна (0.5s).
 * - Повністю вимикається через prefers-reduced-motion (див. globals.css).
 * - Без сторонніх бібліотек: IntersectionObserver.
 */
export function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal reveal-delay-${delay}`}>
      {children}
    </div>
  );
}
