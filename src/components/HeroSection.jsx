import { useRef, useLayoutEffect, useCallback, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './Navbar'
import { DecorTopLeft, DecorBottomRight, ScrollArrow } from './GeometricDecor'
import TerminalCursor from './TerminalCursor'
import TerminalScreen from './TerminalScreen'

const FONT = '"AldoTheApache", "Bebas Neue", Impact, sans-serif'
const EDGE_PAD = 32 // px de margen de seguridad respecto a los bordes del viewport
const MARTINEZ_LEFT = 0.24 // fracción del viewport que se desplaza MARTINEZ hacia la derecha

function SplitWord({ word, color, wrapperRef, style = {} }) {
  return (
    <span
      ref={wrapperRef}
      style={{
        fontFamily: FONT,
        fontWeight: 400,
        lineHeight: 0.86,
        letterSpacing: '-0.01em',
        userSelect: 'none',
        display: 'block',
        whiteSpace: 'nowrap',
        color,
        ...style,
      }}
    >
      {word.split('').map((char, i) => (
        <span
          key={i}
          data-word={word.toLowerCase()}
          style={{ display: 'inline-block' }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}

export default function HeroSection() {
  const heroRef       = useRef(null)
  const topHalfRef    = useRef(null)
  const bottomHalfRef = useRef(null)
  const ricardoRef    = useRef(null)
  const martinezRef   = useRef(null)

  // Un único tamaño de letra para ambas palabras (antes se calculaba por
  // separado para cada una, y al tener distinto número de letras terminaban
  // con tamaños distintos). Respeta EDGE_PAD en ambos bordes del viewport
  // para que ninguna letra quede cortada. Usa solo scrollWidth (intrínseco)
  // y los offsets fijos que definimos en el layout (MARTINEZ_LEFT) — nunca
  // getBoundingClientRect, que puede leer una posición transitoria durante
  // un resize/transform y producir un tamaño degenerado.
  const fitText = useCallback(() => {
    const vw = window.innerWidth
    const ricardoEl  = ricardoRef.current
    const martinezEl = martinezRef.current
    if (!ricardoEl || !martinezEl) return

    ricardoEl.style.fontSize  = '10px'
    martinezEl.style.fontSize = '10px'

    const ricardoW  = ricardoEl.scrollWidth
    const martinezW = martinezEl.scrollWidth
    if (!ricardoW || !martinezW) return

    const ricardoAvailable  = vw - EDGE_PAD * 2
    const martinezAvailable = vw - EDGE_PAD - vw * MARTINEZ_LEFT

    const maxByRicardo  = 10 * (ricardoAvailable  / ricardoW)
    const maxByMartinez = 10 * (martinezAvailable / martinezW)

    const fontSize = `${Math.max(24, Math.min(maxByRicardo, maxByMartinez))}px`
    ricardoEl.style.fontSize  = fontSize
    martinezEl.style.fontSize = fontSize
  }, [])

  useEffect(() => {
    fitText()
    document.fonts.ready.then(fitText)
    window.addEventListener('resize', fitText)
    return () => window.removeEventListener('resize', fitText)
  }, [fitText])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const ricardoChars  = ricardoRef.current?.querySelectorAll('[data-word="ricardo"]')
      const martinezChars = martinezRef.current?.querySelectorAll('[data-word="martinez"]')

      // ── Ensure chars start visible ────────────────────────────────────
      gsap.set(ricardoChars,  { opacity: 1, y: 0, x: 0 })
      gsap.set(martinezChars, { opacity: 1, y: 0, x: 0 })

      // ── Intro: whole panels slide up ──────────────────────────────────
      gsap.from(ricardoRef.current, {
        opacity: 0, y: 60, duration: 1.0, ease: 'power4.out', delay: 0.2,
      })
      gsap.from(martinezRef.current, {
        opacity: 0, y: -60, duration: 1.0, ease: 'power4.out', delay: 0.35,
      })

      // ── ScrollTrigger: panels open + letters disperse ─────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Panels slide apart
      tl.to(topHalfRef.current,    { x: '-105%', ease: 'none' }, 0)
      tl.to(bottomHalfRef.current, { x:  '105%', ease: 'none' }, 0)

      // RICARDO: fromTo con estado inicial explícito
      ricardoChars?.forEach((char, i) => {
        const total = ricardoChars.length
        const norm  = (i / (total - 1)) - 0.5
        tl.fromTo(char,
          { opacity: 1, y: 0, x: 0 },
          { opacity: 0, y: -(120 + Math.abs(norm) * 80), x: norm * 140, ease: 'power2.in', duration: 1 },
          0
        )
      })

      // MARTINEZ: fromTo con estado inicial explícito
      martinezChars?.forEach((char, i) => {
        const total = martinezChars.length
        const norm  = (i / (total - 1)) - 0.5
        tl.fromTo(char,
          { opacity: 1, y: 0, x: 0 },
          { opacity: 0, y: (120 + Math.abs(norm) * 80), x: norm * 140, ease: 'power2.in', duration: 1 },
          0
        )
      })
    }, heroRef)

    return () => ctx.revert()
  }, [fitText])

  return (
    <section
      ref={heroRef}
      style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}
    >
      {/* ── TOP HALF — white ──────────────────────────────────────────── */}
      <div
        ref={topHalfRef}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '50%',
          background: '#fff',
          zIndex: 10,
          willChange: 'transform',
          display: 'flex',
          alignItems: 'flex-end',
          paddingLeft: EDGE_PAD,
        }}
      >
        <SplitWord
          word="RICARDO"
          color="#000"
          wrapperRef={ricardoRef}
          style={{ marginBottom: '-0.14em' }}
        />
      </div>

      {/* ── BOTTOM HALF — black ───────────────────────────────────────── */}
      <div
        ref={bottomHalfRef}
        style={{
          position: 'absolute',
          bottom: 0, left: 0,
          width: '100%', height: '50%',
          background: '#000',
          zIndex: 10,
          willChange: 'transform',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <SplitWord
          word="MARTINEZ"
          color="#fff"
          wrapperRef={martinezRef}
          style={{ marginLeft: `${MARTINEZ_LEFT * 100}%`, marginTop: '0.1em' }}
        />
      </div>

      {/* ── Navbar ────────────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Decorations ───────────────────────────────────────────────── */}
      <ScrollArrow />
      <TerminalCursor />
      <TerminalScreen />
    </section>
  )
}
