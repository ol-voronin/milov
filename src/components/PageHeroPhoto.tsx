'use client';

/**
 * Фотобанер сторінки.
 *
 * ЧОМУ NEXT/IMAGE, А НЕ ЗВИЧАЙНИЙ <img>
 *
 * Раніше тут стояв <img src="https://images.unsplash.com/…">. Це означало,
 * що браузер кожного відвідувача робив прямий запит до стороннього CDN —
 * тобто IP-адреса й User-Agent людини, яка щойно втратила близького і читає
 * про виплати у разі загибелі, потрапляли до третьої сторони. Для сайту,
 * побудованого навколо приватності звернення, це суперечність.
 *
 * next/image завантажує зображення на боці сервера, кешує його на власному
 * CDN і віддає з нашого домену. Відвідувач ніколи не звертається до Unsplash.
 * Побічно це також дає AVIF/WebP і правильний розмір під ширину екрана —
 * раніше на телефон 390px їхав JPEG шириною 1600px.
 *
 * ЛОКАЛЬНІ ФОТО МАЮТЬ ПРІОРИТЕТ: покладіть власний файл у
 * /public/photos/pages/<ключ>.jpg і вкажіть його в src/config/photos.ts —
 * тоді зовнішній сервіс не задіюється взагалі.
 *
 * ЗАПАСНИЙ ВАРІАНТ: якщо зображення не завантажилося, показуємо спокійний
 * градієнт у кольорах практики, а не порожню рамку з alt-текстом.
 */

import { useState } from 'react';
import Image from 'next/image';

export function PageHeroPhoto({
  src,
  alt,
  priority = true,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // Декоративна заглушка: не несе змісту, тому прихована від зчитувачів екрана
    return <div className="page-hero-img page-hero-img--fallback" aria-hidden="true" />;
  }

  return (
    <Image
      className="page-hero-img"
      src={src}
      alt={alt}
      width={1400}
      height={933}
      priority={priority}
      sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 620px"
      onError={() => setFailed(true)}
    />
  );
}
