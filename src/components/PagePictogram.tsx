/**
 * Компактні тематичні піктограми для hero внутрішніх сторінок (аудит V1).
 * Стиль узгоджений із брендовою палітрою; суто декоративні (aria-hidden).
 */

import type { ReactNode } from 'react';

export type PictogramName =
  | 'payments'
  | 'delay'
  | 'missing'
  | 'other'
  | 'services'
  | 'team'
  | 'faq'
  | 'info'
  | 'contacts';

export function PagePictogram({ name }: { name: PictogramName }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      style={{ width: '5.5rem', height: '5.5rem', flexShrink: 0 }}
    >
      <circle cx="60" cy="60" r="56" fill="#24527E14" />
      {pictograms[name]}
    </svg>
  );
}

const navy = '#24527E';
const gold = '#C9A35C';
const mist = '#9DB6CC';

const pictograms: Record<PictogramName, ReactNode> = {
  payments: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="30" y="42" width="60" height="42" rx="6" stroke={navy} strokeWidth="4" fill="#fff" />
      <path d="M30 54h60" stroke={navy} strokeWidth="4" />
      <circle cx="60" cy="70" r="8" stroke={gold} strokeWidth="4" />
      <path d="M42 36h36" stroke={mist} strokeWidth="4" />
    </g>
  ),
  delay: (
    <g fill="none" strokeLinecap="round">
      <circle cx="60" cy="62" r="26" stroke={navy} strokeWidth="4" fill="#fff" />
      <path d="M60 48v16l10 7" stroke={gold} strokeWidth="4" />
      <path d="M84 36l8 8M36 36l-8 8" stroke={mist} strokeWidth="4" />
    </g>
  ),
  missing: (
    <g fill="none" strokeLinecap="round">
      <circle cx="54" cy="56" r="20" stroke={navy} strokeWidth="4" fill="#fff" />
      <path d="M69 71l16 16" stroke={gold} strokeWidth="5" />
      <path d="M46 56h16M54 48v16" stroke={mist} strokeWidth="4" />
    </g>
  ),
  other: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M34 44h52v30H58l-12 12v-12H34z" stroke={navy} strokeWidth="4" fill="#fff" />
      <circle cx="50" cy="59" r="2.6" fill={gold} />
      <circle cx="60" cy="59" r="2.6" fill={gold} />
      <circle cx="70" cy="59" r="2.6" fill={gold} />
    </g>
  ),
  services: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M60 34l24 10v14c0 16-10 26-24 30-14-4-24-14-24-30V44z" stroke={navy} strokeWidth="4" fill="#fff" />
      <path d="M50 60l7 7 13-13" stroke={gold} strokeWidth="4" />
    </g>
  ),
  team: (
    <g fill="none" strokeLinecap="round">
      <circle cx="47" cy="50" r="10" stroke={navy} strokeWidth="4" fill="#fff" />
      <circle cx="73" cy="50" r="10" stroke={mist} strokeWidth="4" fill="#fff" />
      <path d="M32 84c2-12 8-18 15-18s13 6 15 18" stroke={navy} strokeWidth="4" />
      <path d="M60 84c2-10 7-16 13-16s11 6 13 16" stroke={mist} strokeWidth="4" />
      <circle cx="60" cy="36" r="3" fill={gold} />
    </g>
  ),
  faq: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="60" cy="58" r="26" stroke={navy} strokeWidth="4" fill="#fff" />
      <path d="M52 50c1-5 5-8 9-8 5 0 9 3 9 8 0 6-9 6-9 13" stroke={gold} strokeWidth="4" />
      <circle cx="61" cy="72" r="2.8" fill={gold} />
    </g>
  ),
  info: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M38 40h30l14 14v28H38z" stroke={navy} strokeWidth="4" fill="#fff" />
      <path d="M68 40v14h14" stroke={mist} strokeWidth="4" />
      <path d="M46 62h26M46 71h26" stroke={gold} strokeWidth="4" />
    </g>
  ),
  contacts: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M44 38c4 0 8 8 6 12l-4 5c3 8 9 14 17 17l5-4c4-2 12 2 12 6 0 6-5 10-11 10-19-2-33-16-35-35 0-6 4-11 10-11z"
        stroke={navy}
        strokeWidth="4"
        fill="#fff"
      />
      <circle cx="76" cy="42" r="4" fill={gold} />
    </g>
  ),
};
