/**
 * Знак практики.
 *
 * Портик (фронтон + три колони + цоколь) — стриманий, однозначно
 * юридичний мотив, який читається навіть на 24px. Свідомо без терезів
 * Феміди: у бібліотечних іконках у них тонкі лінії, що на малому розмірі
 * зливаються і виглядають обрізаними зверху.
 *
 * Попередній варіант із двох арок на 32px читався як веселка —
 * не той настрій для практики, яка працює з родинами загиблих.
 *
 * Золота лінія цоколя — той самий акцент, що й на решті сайту.
 */
export function BrandMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Знак практики"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <rect width="40" height="40" rx="5" fill="var(--brand-navy, #24527E)" />
      {/* Фронтон */}
      <path d="M20 9 31 15.8 H9 Z" fill="#FFFFFF" />
      {/* Колони */}
      <rect x="11.8" y="18.4" width="3.2" height="9.2" fill="#FFFFFF" />
      <rect x="18.4" y="18.4" width="3.2" height="9.2" fill="#FFFFFF" />
      <rect x="25" y="18.4" width="3.2" height="9.2" fill="#FFFFFF" />
      {/* Цоколь */}
      <rect
        x="9"
        y="29.6"
        width="22"
        height="2.6"
        rx="1.3"
        fill="var(--brand-gold, #C9A35C)"
      />
    </svg>
  );
}
