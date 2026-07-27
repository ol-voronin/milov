/**
 * Абстрактна спокійна ілюстрація для hero-блоку.
 * Без фото, без військових образів — типографіка + м'які форми
 * у брендовій палітрі (темно-синій, бежевий, стриманий золотистий акцент).
 */
export function HeroVisual() {
  return (
    <svg
      viewBox="0 0 520 420"
      role="img"
      aria-label="Абстрактна ілюстрація: захисна арка над домом і документами"
      style={{ width: '100%', height: 'auto', maxWidth: 520 }}
    >
      <defs>
        <linearGradient id="hv-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EAF0F6" />
          <stop offset="1" stopColor="#F8F6F2" />
        </linearGradient>
        <linearGradient id="hv-arc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#24527E" />
          <stop offset="1" stopColor="#3E6E9E" />
        </linearGradient>
      </defs>

      {/* фонове коло */}
      <circle cx="260" cy="210" r="190" fill="url(#hv-sky)" />

      {/* захисні арки */}
      <path
        d="M 90 300 A 170 170 0 0 1 430 300"
        fill="none"
        stroke="url(#hv-arc)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M 130 300 A 130 130 0 0 1 390 300"
        fill="none"
        stroke="#9DB6CC"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M 168 300 A 92 92 0 0 1 352 300"
        fill="none"
        stroke="#C9A35C"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* дім / родина під захистом */}
      <g>
        <rect x="222" y="252" width="76" height="48" rx="6" fill="#24527E" />
        <path d="M 212 258 L 260 218 L 308 258 Z" fill="#1B3E60" />
        <rect x="250" y="272" width="20" height="28" rx="3" fill="#F8F6F2" />
        <circle cx="260" cy="204" r="6" fill="#C9A35C" />
      </g>

      {/* документи поруч */}
      <g opacity="0.95">
        <rect x="120" y="248" width="58" height="72" rx="6" fill="#FFFFFF" stroke="#9DB6CC" strokeWidth="2" />
        <rect x="130" y="262" width="38" height="5" rx="2.5" fill="#9DB6CC" />
        <rect x="130" y="274" width="38" height="5" rx="2.5" fill="#CBD9E4" />
        <rect x="130" y="286" width="26" height="5" rx="2.5" fill="#CBD9E4" />
        <circle cx="166" cy="306" r="9" fill="#24527E" />
        <path d="M 162 306 l 3 3 l 6 -6" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* терези справедливості */}
      <g opacity="0.95">
        <line x1="368" y1="238" x2="368" y2="308" stroke="#24527E" strokeWidth="4" strokeLinecap="round" />
        <line x1="336" y1="252" x2="400" y2="252" stroke="#24527E" strokeWidth="4" strokeLinecap="round" />
        <path d="M 326 276 A 12 12 0 0 0 350 276" fill="none" stroke="#C9A35C" strokeWidth="3.5" />
        <line x1="338" y1="252" x2="330" y2="274" stroke="#24527E" strokeWidth="2.5" />
        <line x1="338" y1="252" x2="346" y2="274" stroke="#24527E" strokeWidth="2.5" />
        <path d="M 386 276 A 12 12 0 0 0 410 276" fill="none" stroke="#C9A35C" strokeWidth="3.5" />
        <line x1="398" y1="252" x2="390" y2="274" stroke="#24527E" strokeWidth="2.5" />
        <line x1="398" y1="252" x2="406" y2="274" stroke="#24527E" strokeWidth="2.5" />
        <circle cx="368" cy="238" r="5" fill="#C9A35C" />
      </g>

      {/* лінія землі */}
      <line x1="80" y1="320" x2="440" y2="320" stroke="#CBD9E4" strokeWidth="3" strokeLinecap="round" />
      <line x1="150" y1="336" x2="370" y2="336" stroke="#E2E9EF" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Компактна декоративна смуга-роздільник із м'якими арками.
 */
export function SectionAccent() {
  return (
    <svg
      viewBox="0 0 200 24"
      aria-hidden="true"
      style={{ width: 120, height: 'auto', display: 'block' }}
    >
      <path d="M 4 20 A 60 60 0 0 1 96 20" fill="none" stroke="#24527E" strokeWidth="4" strokeLinecap="round" />
      <path d="M 110 20 A 30 30 0 0 1 152 20" fill="none" stroke="#C9A35C" strokeWidth="4" strokeLinecap="round" />
      <circle cx="170" cy="19" r="4" fill="#9DB6CC" />
    </svg>
  );
}
