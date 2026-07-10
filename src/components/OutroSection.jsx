import { useRef, useState, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function OutroSection() {
  const { t } = useLanguage()
  const PARAGRAPHS = t.outro.bio.map(p => p.split(' '))
  const sectionRef = useRef(null)
  const labelRef   = useRef(null)
  const textRef    = useRef(null)
  const photoRef   = useRef(null)
  const [photoOk, setPhotoOk] = useState(true)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const inners = textRef.current?.querySelectorAll('[data-inner]')

      gsap.set(labelRef.current, { opacity: 0, y: 12 })
      gsap.set(inners, { y: '110%', color: 'rgba(255,255,255,0.08)' })
      gsap.set(photoRef.current, { opacity: 0, y: 24 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'center 40%',
          scrub: 1,
        },
      })

      tl.to(labelRef.current, { opacity: 1, y: 0, ease: 'none', duration: 0.5 })
      tl.to(photoRef.current, { opacity: 1, y: 0, ease: 'none', duration: 0.5 }, '-=0.3')
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
      id="outro"
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
        {t.outro.label}
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
              fontSize: 'clamp(1.05rem, 2.1vw, 1.7rem)',
              lineHeight: 1.4,
              color: 'rgba(255,255,255,0.88)',
              margin: 0,
              letterSpacing: '-0.01em',
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

      {/* Foto — col derecha */}
      <div
        ref={photoRef}
        style={{
          flex: '0 0 40%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'clamp(320px, 42vw, 560px)',
        }}
      >
        {photoOk ? (
          <img
            src="/about-photo.jpg"
            alt="Ricardo Martinez"
            onError={() => setPhotoOk(false)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(1)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at center, #000 55%, transparent 100%)',
              maskImage: 'radial-gradient(ellipse 70% 70% at center, #000 55%, transparent 100%)',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              border: '1px dashed rgba(255,255,255,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              textAlign: 'center',
              padding: '1rem',
            }}
          >
            {t.outro.photoPending}
            <br />
            public/about-photo.jpg
          </div>
        )}
      </div>
    </section>
  )
}
