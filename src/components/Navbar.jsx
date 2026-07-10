import { useRef, useState, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { useLanguage } from '../i18n/LanguageContext'

export default function Navbar() {
  const { t, lang } = useLanguage()
  const LINKS = [
    { id: 'home',     label: t.nav.home },
    { id: 'about',    label: t.nav.about },
    { id: 'skills',   label: t.nav.skills },
    { id: 'projects', label: t.nav.projects },
    { id: 'contact',  label: t.nav.contact },
  ]
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

        {/* Acciones derechas: proyectos + descargar CV */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
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
            {t.nav.projects}
          </a>
          <a
            href={lang === 'es' ? '/cv-es.pdf' : '/cv-en.pdf'}
            download
            title={t.contact.downloadCV ?? 'Descargar CV'}
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#fff',
              opacity: 0.75,
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = 0.75}
          >
            {/* Ícono descarga */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v13M7 11l5 5 5-5"/>
              <path d="M4 20h16"/>
            </svg>
          </a>
        </div>
      </nav>

      {/* Menú a pantalla completa — panel sólido, fuera del mix-blend-mode
          del nav (necesita ser opaco y legible sobre cualquier fondo). Su
          z-index (100) es mayor al del nav (50), así que tapa por completo
          al botón hamburguesa/X de ahí abajo — por eso lleva su propio botón
          de cierre explícito, no solo el ícono que gira a X en el nav. */}
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
        <button
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
          style={{
            position: 'absolute',
            top: '1.4rem',
            left: '2rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            width: 24,
            height: 24,
          }}
        >
          <span style={{ position: 'absolute', top: '50%', left: '50%', width: 24, height: 1.5, background: '#fff', transform: 'translate(-50%,-50%) rotate(45deg)' }} />
          <span style={{ position: 'absolute', top: '50%', left: '50%', width: 24, height: 1.5, background: '#fff', transform: 'translate(-50%,-50%) rotate(-45deg)' }} />
        </button>

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
