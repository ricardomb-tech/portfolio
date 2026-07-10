import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DarkMatterOrb from './DarkMatterOrb'
import { useLanguage } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const { t } = useLanguage()
  const PARAGRAPHS = [t.about.bio].map(p => p.split(' '))
  const sectionRef = useRef(null)
  const labelRef   = useRef(null)
  const textRef    = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const inners = textRef.current?.querySelectorAll('[data-inner]')

      gsap.set(labelRef.current, { opacity: 0, y: 12 })
      gsap.set(inners, { y: '110%', color: 'rgba(255,255,255,0.08)' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'center 40%',
          scrub: 1,
        },
      })

      tl.to(labelRef.current, {
        opacity: 1, y: 0, ease: 'none', duration: 0.5,
      })
      tl.to(inners, {
        y: '0%',
        color: 'rgba(255,255,255,0.88)',
        ease: 'none',
        stagger: 0.08,
        duration: 0.6,
      }, '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(2rem, 6vw, 8rem)',
        position: 'relative',
        gap: '2rem',
      }}
    >
      {/* Label */}
      <span
        ref={labelRef}
        style={{
          position: 'absolute',
          top: 'clamp(2rem, 5vw, 4rem)',
          left: 'clamp(2rem, 6vw, 8rem)',
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.45)',
          textTransform: 'uppercase',
        }}
      >
        {t.about.label}
      </span>

      {/* Texto — col izquierda */}
      <div
        ref={textRef}
        style={{
          flex: '0 0 55%',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.1em',
        }}
      >
        {PARAGRAPHS.map((words, pi) => (
          <p
            key={pi}
            style={{
              fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 4.5vw, 4.2rem)',
              lineHeight: 1.25,
              color: 'rgba(255,255,255,0.88)',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  overflow: 'hidden',
                  verticalAlign: 'bottom',
                  marginRight: '0.28em',
                }}
              >
                <span data-inner style={{ display: 'inline-block' }}>
                  {word}
                </span>
              </span>
            ))}
          </p>
        ))}
      </div>

      {/* Orb — right col */}
      <div style={{ flex: '0 0 40%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'clamp(320px, 42vw, 560px)' }}>
        <DarkMatterOrb />
      </div>
    </section>
  )
}
