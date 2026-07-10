import { useRef, useState, useLayoutEffect } from 'react'
import { gsap } from 'gsap'

const LINKS = [
  { id: 'home',     label: 'HOME' },
  { id: 'about',    label: 'ABOUT' },
  { id: 'skills',   label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const overlayRef = useRef(null)
  const itemRefs    = useRef([])

  useLayoutEffect(() => {
    if (!overlayRef.current) return
    const items = itemRefs.current.filter(Boolean)

    if (open) {
      gsap.set(overlayRef.current, { display: 'flex' })
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      gsap.fromTo(items,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06, delay: 0.1 }
      )
    } else if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0, duration: 0.25, ease: 'power2.in',
        onComplete: () => { if (overlayRef.current) gsap.set(overlayRef.current, { display: 'none' }) },
      })
    }
  }, [open])

  const goTo = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
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
          onClick={() => setOpen(o => !o)}
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
          aria-expanded={open}
        >
          <span style={{
            display: 'block', width: 24, height: 1.5, background: '#fff',
            transform: open ? 'translateY(3.25px) rotate(45deg)' : 'none',
            transition: 'transform 0.25s ease',
          }} />
          <span style={{
            display: 'block', width: 18, height: 1.5, background: '#fff',
            transform: open ? 'translateY(-3.25px) rotate(-45deg) scaleX(1.33)' : 'none',
            transformOrigin: 'center',
            transition: 'transform 0.25s ease',
          }} />
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
          onClick={(e) => { e.preventDefault(); goTo('projects') }}
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

      {/* Menú a pantalla completa — panel sólido, fuera del mix-blend-mode
          del nav (necesita ser opaco y legible sobre cualquier fondo). */}
      <div
        ref={overlayRef}
        style={{
          display: 'none',
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          background: '#000',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: 'clamp(0.5rem, 2vw, 1rem)',
          padding: 'clamp(2rem, 8vw, 8rem)',
        }}
      >
        {LINKS.map((link, i) => (
          <button
            key={link.id}
            ref={(el) => { itemRefs.current[i] = el }}
            onClick={() => goTo(link.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontFamily: '"AldoTheApache", "Bebas Neue", Impact, sans-serif',
              fontSize: 'clamp(3rem, 9vw, 7rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: '#fff',
              textAlign: 'left',
            }}
          >
            {link.label}
          </button>
        ))}
      </div>
    </>
  )
}
