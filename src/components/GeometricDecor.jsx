// Top-left: golden ratio / grid lines decoration
export function DecorTopLeft() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 60,
        left: 0,
        width: 220,
        height: 220,
        zIndex: 15,
        opacity: 0.28,
        pointerEvents: 'none',
      }}
    >
      <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
        {/* Outer rectangle */}
        <rect x="10" y="10" width="200" height="200" stroke="white" strokeWidth="0.8" />
        {/* Golden ratio subdivisions */}
        <rect x="10" y="10" width="124" height="200" stroke="white" strokeWidth="0.8" />
        <rect x="10" y="10" width="124" height="124" stroke="white" strokeWidth="0.8" />
        <rect x="10" y="96" width="76" height="76" stroke="white" strokeWidth="0.8" />
        <rect x="58" y="96" width="48" height="48" stroke="white" strokeWidth="0.8" />
        <rect x="58" y="96" width="48" height="30" stroke="white" strokeWidth="0.8" />
        {/* Diagonal cross lines */}
        <line x1="10" y1="10" x2="134" y2="210" stroke="white" strokeWidth="0.5" />
        <line x1="134" y1="10" x2="10" y2="134" stroke="white" strokeWidth="0.5" />
        {/* Arc suggestion */}
        <path d="M 134 10 A 124 124 0 0 1 10 134" stroke="white" strokeWidth="0.8" fill="none" />
        <path d="M 86 96 A 76 76 0 0 1 10 172" stroke="white" strokeWidth="0.6" fill="none" />
      </svg>
    </div>
  )
}

// Bottom-right: angular lines + diamond star
export function DecorBottomRight() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 180,
        height: 120,
        zIndex: 15,
        opacity: 0.25,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        gap: 16,
      }}
    >
      {/* Geometric line decoration */}
      <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
        <line x1="0" y1="40" x2="100" y2="40" stroke="white" strokeWidth="0.7" />
        <line x1="20" y1="0" x2="20" y2="80" stroke="white" strokeWidth="0.7" />
        <line x1="0" y1="0" x2="100" y2="80" stroke="white" strokeWidth="0.5" />
        <line x1="100" y1="0" x2="0" y2="80" stroke="white" strokeWidth="0.5" />
        <rect x="10" y="10" width="80" height="60" stroke="white" strokeWidth="0.7" />
        <rect x="25" y="20" width="50" height="40" stroke="white" strokeWidth="0.5" />
      </svg>

    </div>
  )
}

// Bottom-left scroll arrow
export function ScrollArrow() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '2.5rem',
        left: '2rem',
        zIndex: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        animation: 'arrowBounce 2s ease-in-out infinite',
      }}
    >
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
        <line x1="8" y1="0" x2="8" y2="18" stroke="white" strokeWidth="1.2" opacity="0.5" />
        <path d="M2 13 L8 20 L14 13" stroke="white" strokeWidth="1.2" fill="none" opacity="0.5" />
      </svg>
      <style>{`
        @keyframes arrowBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
      `}</style>
    </div>
  )
}
