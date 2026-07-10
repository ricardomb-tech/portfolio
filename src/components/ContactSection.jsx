import { useRef, useState, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const CONTACT_EMAIL = 'rickmartinezbanda@gmail.com'
const SOCIAL_LINKS = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/ricardo-martinez-banda/' },
  { label: 'Instagram', href: 'https://www.instagram.com/r.martinez_b/' },
  { label: 'GitHub',    href: 'https://github.com/ricardomb-tech' },
]

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(0,0,0,0.2)',
  padding: '0.6rem 0',
  fontFamily: '"Inter", sans-serif',
  fontSize: '1rem',
  color: '#000',
  outline: 'none',
}

const fieldLabelStyle = {
  display: 'block',
  fontFamily: '"Inter", sans-serif',
  fontSize: '0.7rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'rgba(0,0,0,0.45)',
  marginBottom: '0.4rem',
}

export default function ContactSection() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const labelRef   = useRef(null)
  const headingRef = useRef(null)
  const bodyRef    = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(labelRef.current, { opacity: 0, y: 12 })
      gsap.set(headingRef.current, { opacity: 0, y: 24 })
      gsap.set(bodyRef.current, { opacity: 0, y: 24 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'center 50%',
          scrub: 1,
        },
      })

      tl.to(labelRef.current, { opacity: 1, y: 0, ease: 'none', duration: 0.4 })
      tl.to(headingRef.current, { opacity: 1, y: 0, ease: 'none', duration: 0.5 }, '-=0.2')
      tl.to(bodyRef.current, { opacity: 1, y: 0, ease: 'none', duration: 0.5 }, '-=0.3')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Contacto desde el portfolio — ${form.name || ''}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(5rem, 8vw, 7rem) clamp(2rem, 6vw, 8rem) clamp(2rem, 4vw, 3rem)',
        position: 'relative',
        gap: '2rem',
      }}
    >
      <span
        ref={labelRef}
        style={{
          position: 'absolute',
          top: 'clamp(2rem, 5vw, 4rem)',
          left: 'clamp(2rem, 6vw, 8rem)',
          fontFamily: '"Inter", sans-serif',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          color: 'rgba(0,0,0,0.45)',
          textTransform: 'uppercase',
        }}
      >
        {t.contact.label}
      </span>

      <div ref={headingRef} style={{ maxWidth: '900px' }}>
        <h2
          style={{
            fontFamily: '"AldoTheApache","Bebas Neue",Impact,sans-serif',
            fontSize: 'clamp(2.6rem, 7vw, 6rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: '#000',
            margin: 0,
          }}
        >
          {t.contact.heading}
        </h2>
        <p
          style={{
            marginTop: '1rem',
            fontFamily: '"Inter", sans-serif',
            fontSize: 'clamp(1rem, 1.6vw, 1.3rem)',
            lineHeight: 1.5,
            color: 'rgba(0,0,0,0.65)',
            maxWidth: '38rem',
          }}
        >
          {t.contact.subheading}
        </p>
      </div>

      <div
        ref={bodyRef}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(2rem, 5vw, 5rem)',
        }}
      >
        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          style={{
            flex: '1 1 380px',
            maxWidth: '520px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem',
          }}
        >
          <div>
            <label style={fieldLabelStyle}>{t.contact.nameLabel}</label>
            <input
              type="text"
              required
              placeholder={t.contact.namePlaceholder}
              value={form.name}
              onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={fieldLabelStyle}>{t.contact.emailLabel}</label>
            <input
              type="email"
              required
              placeholder={t.contact.emailPlaceholder}
              value={form.email}
              onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={fieldLabelStyle}>{t.contact.messageLabel}</label>
            <textarea
              required
              rows={4}
              placeholder={t.contact.messagePlaceholder}
              value={form.message}
              onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
              style={{ ...inputStyle, resize: 'vertical', fontFamily: '"Inter", sans-serif' }}
            />
          </div>
          <button
            type="submit"
            style={{
              alignSelf: 'flex-start',
              marginTop: '0.5rem',
              background: '#000',
              color: '#fff',
              border: 'none',
              padding: '0.85rem 1.6rem',
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            {t.contact.submit}
          </button>
        </form>

        {/* Redes sociales */}
        <div style={{ flex: '0 1 240px', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          <span style={fieldLabelStyle}>{t.contact.social}</span>
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"AldoTheApache","Bebas Neue",Impact,sans-serif',
                fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                color: '#000',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(0,0,0,0.15)',
                paddingBottom: '2px',
                width: 'fit-content',
              }}
            >
              {label} →
            </a>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: 'clamp(2rem, 5vw, 4rem)',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(0,0,0,0.1)',
        fontFamily: '"Inter", sans-serif',
        fontSize: '0.7rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'rgba(0,0,0,0.35)',
      }}>
        {t.contact.footer}
      </div>
    </section>
  )
}
