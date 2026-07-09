export default function Navbar() {
  return (
    <nav
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.4rem 2rem',
        mixBlendMode: 'difference',
      }}
    >
      {/* Hamburger */}
      <button
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          padding: '4px',
        }}
        aria-label="Menu"
      >
        <span style={{ display: 'block', width: 24, height: 1.5, background: '#fff' }} />
        <span style={{ display: 'block', width: 18, height: 1.5, background: '#fff' }} />
      </button>

      {/* Logo */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '1.4rem',
          color: '#fff',
          letterSpacing: '0.05em',
        }}
      >
        RM
      </div>

      {/* Nav link */}
      <a
        href="#projects"
        style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: '0.85rem',
          letterSpacing: '0.2em',
          color: '#fff',
          textDecoration: 'none',
        }}
      >
        PROJECTS
      </a>
    </nav>
  )
}
