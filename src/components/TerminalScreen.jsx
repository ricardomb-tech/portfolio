import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

function buildSpans(visible, highlightWords) {
  const spans = []
  let i = 0
  while (i < visible.length) {
    let matched = false
    for (const word of highlightWords) {
      if (visible.slice(i, i + word.length) === word) {
        spans.push(<em key={i} style={{ color: '#000000', fontStyle: 'italic', background: '#ffffff', padding: '0 8px', borderRadius: '4px' }}>{word}</em>)
        i += word.length
        matched = true
        break
      }
    }
    if (!matched) {
      spans.push(<span key={i}>{visible[i]}</span>)
      i++
    }
  }
  return spans
}

export default function TerminalScreen() {
  const { t } = useLanguage()
  const FULL_TEXT = t.hero.screenText
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const p = Math.min(window.scrollY / window.innerHeight, 1)
      setProgress(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const opacity = Math.min(Math.max((progress - 0.05) / 0.25, 0), 1)
  const rotateX = 75 - progress * 75
  const translateZ = -500 + progress * 500

  const charCount = Math.floor(progress * FULL_TEXT.length)
  const visible = FULL_TEXT.slice(0, charCount)

  return (
    <div style={{
      position:  'absolute',
      top:       '50%',
      left:      '50%',
      transform: `translate(-50%, -50%) perspective(900px) rotateX(${rotateX}deg) translateZ(${translateZ}px)`,
      zIndex:    5,
      opacity,
      pointerEvents: 'none',
      width:     'clamp(360px, 82vw, 1100px)',
      textAlign: 'center',
      transition: 'none',
    }}>
      <div style={{
        background:     'rgba(8, 8, 8, 0.97)',
        border:         '1px solid rgba(255,255,255,0.12)',
        borderRadius:   '12px',
        padding:        '48px 56px',
        boxShadow:      '0 0 0 1px rgba(255,255,255,0.04), 0 24px 80px rgba(0,0,0,0.95)',
        backdropFilter: 'blur(8px)',
      }}>
        <p style={{
          fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
          fontWeight: 700,
          fontSize:   'clamp(1.8rem, 4.5vw, 3.6rem)',
          lineHeight: 1.3,
          color:      '#ffffff',
          margin:     0,
          letterSpacing: '-0.02em',
          minHeight:  '1em',
        }}>
          {buildSpans(visible, t.hero.screenHighlight)}
        </p>
      </div>
    </div>
  )
}
