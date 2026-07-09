import { useEffect, useRef, useState } from 'react'

const TEXT = '> SOFTWARE DEVELOPER_'

export default function TerminalCursor() {
  const [charCount, setCharCount] = useState(0)
  const [blink, setBlink] = useState(true)

  // scroll-driven text reveal
  useEffect(() => {
    const onScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1)
      const chars = Math.floor(progress * TEXT.length)
      setCharCount(chars)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // cursor blink (only when no text yet)
  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530)
    return () => clearInterval(id)
  }, [])

  const showText = charCount > 0

  return (
    <div style={{
      position: 'absolute',
      bottom: '6rem',
      left: '2.2rem',
      zIndex: 30,
      fontFamily: '"Courier New", Courier, monospace',
      fontSize: '3.2rem',
      letterSpacing: '0.06em',
      color: 'rgba(255,255,255,0.55)',
      userSelect: 'none',
      pointerEvents: 'none',
      lineHeight: 1.4,
    }}>
      {showText
        ? <span>{TEXT.slice(0, charCount)}</span>
        : null
      }
      <span style={{ opacity: blink ? 1 : 0, transition: 'opacity 0.05s' }}>█</span>
    </div>
  )
}
