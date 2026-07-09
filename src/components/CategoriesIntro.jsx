import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = ['BACKEND', 'DISEÑO WEB', 'IA', 'IoT']

// Animated arrow hint component
function HoverHint({ visible }) {
  const arrowRef = useRef(null)
  useEffect(() => {
    if (!arrowRef.current) return
    if (visible) {
      gsap.killTweensOf(arrowRef.current)
      gsap.fromTo(arrowRef.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
      )
      // Bounce loop
      gsap.to(arrowRef.current, {
        x: 8, duration: 0.55, ease: 'power1.inOut',
        repeat: -1, yoyo: true, delay: 0.5,
      })
    } else {
      gsap.killTweensOf(arrowRef.current)
      gsap.to(arrowRef.current, { opacity: 0, x: -6, duration: 0.25, ease: 'power2.in' })
    }
  }, [visible])

  return (
    <span
      ref={arrowRef}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        opacity: 0,
        marginLeft: '18px',
        verticalAlign: 'middle',
        pointerEvents: 'none',
      }}
    >
      {/* Arrow made of spans */}
      <span style={{
        display: 'inline-block',
        width: '36px',
        height: '2px',
        background: 'rgba(0,0,0,0.25)',
        borderRadius: '1px',
        position: 'relative',
        top: '-1px',
      }} />
      <span style={{
        fontFamily: '"Inter", sans-serif',
        fontSize: '0.6rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'rgba(0,0,0,0.3)',
        whiteSpace: 'nowrap',
      }}>
        hover
      </span>
    </span>
  )
}

// ─── SVGL React components (installed via shadcn @svgl registry) ─────────────
import { Nodejs      } from '@/components/ui/svgs/nodejs'
import { Python      } from '@/components/ui/svgs/python'
import { Java        } from '@/components/ui/svgs/java'
import { Postgresql  } from '@/components/ui/svgs/postgresql'
import { Docker      } from '@/components/ui/svgs/docker'
import { Redis       } from '@/components/ui/svgs/redis'
import { Graphql     } from '@/components/ui/svgs/graphql'
import { Spring      } from '@/components/ui/svgs/spring'
import { Nginx       } from '@/components/ui/svgs/nginx'
import { MongodbIconLight } from '@/components/ui/svgs/mongodbIconLight'
import { Golang      } from '@/components/ui/svgs/golang'
import { ReactDark   } from '@/components/ui/svgs/reactDark'
import { Vue         } from '@/components/ui/svgs/vue'
import { Typescript  } from '@/components/ui/svgs/typescript'
import { Tailwindcss } from '@/components/ui/svgs/tailwindcss'
import { Figma       } from '@/components/ui/svgs/figma'
import { Angular     } from '@/components/ui/svgs/angular'
import { NextjsIconDark } from '@/components/ui/svgs/nextjsIconDark'
import { Vite        } from '@/components/ui/svgs/vite'
import { Sass        } from '@/components/ui/svgs/sass'
import { Html5       } from '@/components/ui/svgs/html5'
import { CssOld      } from '@/components/ui/svgs/cssOld'
import { AnthropicBlack } from '@/components/ui/svgs/anthropicBlack'
import { Openai      } from '@/components/ui/svgs/openai'
import { OllamaDark  } from '@/components/ui/svgs/ollamaDark'
import { HuggingFace } from '@/components/ui/svgs/huggingFace'
import { TensorflowIconDark } from '@/components/ui/svgs/tensorflowIconDark'
import { Fastapi     } from '@/components/ui/svgs/fastapi'
import { LangchainLogo } from '@/components/ui/svgs/langchainLogo'
import { Grafana     } from '@/components/ui/svgs/grafana'
import { RaspberryPi } from '@/components/ui/svgs/raspberryPi'

const DATA = {
  'BACKEND': {
    desc: 'APIs escalables, microservicios y arquitecturas que sostienen productos en producción sin fallar.',
    icons: [Nodejs, Python, Java, Postgresql, Docker, Redis, Graphql, Spring, Nginx, MongodbIconLight, Golang],
  },
  'DISEÑO WEB': {
    desc: 'Interfaces modernas y responsivas que conectan la experiencia del usuario con la lógica del negocio.',
    icons: [ReactDark, Vue, Typescript, Tailwindcss, Figma, Angular, NextjsIconDark, Vite, Sass, Html5, CssOld],
  },
  'IA': {
    desc: 'Integración de LLMs y pipelines inteligentes para automatizar decisiones en tiempo real.',
    icons: [AnthropicBlack, Openai, OllamaDark, HuggingFace, TensorflowIconDark, Fastapi],
  },
  'IoT': {
    desc: 'Sensores, dispositivos embebidos y plataformas de telemetría que conectan el mundo físico con la nube.',
    icons: [Grafana, RaspberryPi, Docker, Python, Nodejs, Postgresql, Redis, Nginx],
  },
}

// Positions for icons — spread across screen, avoid text zone (x<42, y:20-78)
// Format: [x%, y%, size]
const POSITIONS = [
  // Top strip
  [10, 5,  72], [30, 4,  48], [52, 6,  64], [70, 5,  80], [88, 7,  56],
  // Upper-right
  [55, 18, 52], [72, 16, 88], [85, 22, 44], [93, 12, 60],
  // Mid-right
  [46, 32, 72], [62, 35, 48], [78, 30, 64], [91, 40, 80],
  [50, 50, 56], [66, 52, 88], [82, 48, 44], [96, 55, 68],
  // Lower-right
  [48, 65, 52], [63, 68, 72], [76, 62, 48], [89, 70, 64],
  // Bottom strip
  [8, 88,  56], [25, 92, 72], [45, 90, 48], [62, 94, 80], [80, 89, 52], [94, 92, 64],
  // Left column edges
  [6, 10,  48], [18, 15, 56], [12, 82, 64], [22, 87, 44],
]

// Geometric shapes: triangles + squares in the gaps
// Format: [x%, y%, size, type('t'=triangle|'s'=square|'d'=diamond), opacity]
const SHAPES = [
  // top-left area
  [4,  20, 14, 's', 0.12], [14, 30, 10, 't', 0.09], [7,  45, 18, 'd', 0.08],
  [20, 22, 12, 't', 0.11], [30, 35, 16, 's', 0.07], [38, 20, 10, 'd', 0.10],
  // mid-left
  [5,  55, 20, 's', 0.09], [16, 60, 12, 't', 0.12], [28, 48, 14, 'd', 0.08],
  [35, 62, 18, 's', 0.07], [10, 70, 10, 't', 0.10], [22, 74, 16, 'd', 0.09],
  // right-side gaps
  [57, 42, 12, 't', 0.08], [74, 43, 16, 's', 0.10], [87, 36, 10, 'd', 0.09],
  [60, 78, 14, 's', 0.11], [73, 80, 18, 't', 0.08], [92, 78, 12, 'd', 0.10],
  // random sprinkles
  [40, 8,  10, 't', 0.09], [84, 58, 14, 's', 0.08], [97, 28, 10, 'd', 0.11],
  [43, 75, 12, 't', 0.09], [55, 85, 16, 's', 0.08],
]

function Shape({ x, y, size, type, opacity }) {
  const base = {
    position: 'absolute',
    left: `${x}%`,
    top: `${y}%`,
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    opacity,
  }
  if (type === 's') {
    return <div style={{ ...base, width: size, height: size, border: '1.5px solid #000', borderRadius: 1 }} />
  }
  if (type === 'd') {
    return <div style={{ ...base, width: size, height: size, border: '1.5px solid #000', transform: 'translate(-50%,-50%) rotate(45deg)' }} />
  }
  // triangle via clip-path
  return (
    <div style={{ ...base, width: size, height: size }}>
      <div style={{ width: '100%', height: '100%', background: '#000', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
    </div>
  )
}

export default function CategoriesIntro() {
  const sectionRef  = useRef(null)
  const linesRef    = useRef([])
  const logosRef    = useRef([])
  const descRef     = useRef(null)
  const [active, setActive]       = useState(null)
  const [userHovered, setUserHovered] = useState(false)
  const autoTimer   = useRef(null)
  const leaveTimer  = useRef(null)
  const prevActive  = useRef(null)

  // Auto-activate BACKEND when section enters viewport
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userHovered) {
          // Small delay so the reveal animation finishes first
          autoTimer.current = setTimeout(() => {
            setActive('BACKEND')
          }, 600)
        } else if (!entry.isIntersecting) {
          clearTimeout(autoTimer.current)
          if (!userHovered) setActive(null)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(section)
    return () => { observer.disconnect(); clearTimeout(autoTimer.current) }
  }, [userHovered])

  // Reveal on scroll
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const lines = linesRef.current.filter(Boolean)
      gsap.set(lines, { x: -80, opacity: 0 })
      gsap.to(lines, {
        x: 0, opacity: 1, duration: 0.8, ease: 'power4.out', stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Animate logos + desc on hover change
  useEffect(() => {
    const logos = logosRef.current.filter(Boolean)
    if (active !== null) {
      gsap.killTweensOf(logos)
      gsap.set(logos, { opacity: 0, scale: 0.6, y: 20 })
      gsap.to(logos, {
        opacity: 1, scale: 1, y: 0,
        duration: 0.5, ease: 'power3.out',
        stagger: { each: 0.04, from: 'random' },
      })
      if (descRef.current) {
        gsap.fromTo(descRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: 0.1 }
        )
      }
    } else {
      gsap.to(logos, { opacity: 0, scale: 0.8, duration: 0.25, ease: 'power2.in', stagger: 0.02 })
      if (descRef.current) {
        gsap.to(descRef.current, { opacity: 0, duration: 0.2 })
      }
    }
    prevActive.current = active
  }, [active])

  // No repetition: shuffle positions and assign one icon per slot, then cut off
  const activeIcons = active ? DATA[active].icons : []

  // Assign icons to positions without repeating — only show as many as icons available
  // Shuffle positions deterministically so they spread across screen
  const shuffledPositions = [...POSITIONS].sort((a, b) => (a[0] * 7 + a[1] * 13) % 17 - (b[0] * 7 + b[1] * 13) % 17)
  const slottedIcons = POSITIONS.map((pos, i) => {
    const iconIdx = shuffledPositions.indexOf(pos)
    return iconIdx < activeIcons.length ? activeIcons[iconIdx] : null
  })

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(2rem, 7vw, 9rem)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* SVGL icons — no repeats, spread across screen, black/gray */}
      {POSITIONS.map((pos, i) => {
        const IconComp = slottedIcons[i]
        const size = pos[2]           // size is 3rd value in each position tuple
        // Alternate between near-black and gray for depth
        const opacity = i % 3 === 0 ? 0.55 : i % 3 === 1 ? 0.28 : 0.38
        return (
          <div
            key={i}
            ref={el => logosRef.current[i] = el}
            style={{
              position: 'absolute',
              left: `${pos[0]}%`,
              top: `${pos[1]}%`,
              width: size,
              height: size,
              opacity: 0,
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {IconComp && (
              <IconComp
                width={size}
                height={size}
                style={{
                  opacity,
                  filter: 'grayscale(1) brightness(0)',
                  display: 'block',
                }}
              />
            )}
          </div>
        )
      })}

      {/* Geometric shapes — always visible, fill the gaps */}
      {SHAPES.map((s, i) => (
        <Shape key={`shape-${i}`} x={s[0]} y={s[1]} size={s[2]} type={s[3]} opacity={s[4]} />
      ))}

      {/* Left: category names — full width so hover works across entire row */}
      <div style={{ flex: '1 1 auto', position: 'relative', zIndex: 2, maxWidth: '70vw' }}>
        {CATEGORIES.map((cat, i) => (
          <div
            key={cat}
            ref={el => linesRef.current[i] = el}
            onMouseEnter={() => {
              clearTimeout(leaveTimer.current)
              setUserHovered(true)
              setActive(cat)
            }}
            onMouseLeave={() => {
              leaveTimer.current = setTimeout(() => setActive(null), 300)
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              lineHeight: 1.0,
              userSelect: 'none',
              cursor: 'default',
            }}
          >
            {/* The actual text */}
            <span style={{
              fontFamily: '"AldoTheApache", "Bebas Neue", Impact, sans-serif',
              fontSize: 'clamp(2.5rem, 7vw, 7rem)',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              color: active === cat ? '#000' : 'transparent',
              WebkitTextStroke: active === cat ? '0px' : '1.5px rgba(0,0,0,0.75)',
              textTransform: 'uppercase',
              transition: 'color 0.3s ease, -webkit-text-stroke 0.3s ease',
              whiteSpace: 'nowrap',
            }}>
              {cat}
            </span>

            {/* Gap + hint arrow — visible when not user-hovered */}
            <span style={{ marginLeft: 'clamp(1.2rem, 3vw, 2.5rem)', display: 'flex', alignItems: 'center' }}>
              <HoverHint visible={!userHovered} />
            </span>
          </div>
        ))}
      </div>

      {/* Right: description */}
      {active && (
        <div
          ref={descRef}
          onMouseEnter={() => clearTimeout(leaveTimer.current)}
          onMouseLeave={() => { leaveTimer.current = setTimeout(() => setActive(null), 300) }}
          style={{
            position: 'absolute',
            bottom: 'clamp(8rem, 18vw, 14rem)',
            right: 'clamp(8rem, 22vw, 28rem)',
            maxWidth: '420px',
            zIndex: 10,
            opacity: 0,
            background: 'transparent',
            padding: '12px 0 0 16px',
          }}
        >
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
            lineHeight: 1.6,
            color: 'rgba(0,0,0,0.82)',
            margin: 0,
            textAlign: 'right',
          }}>
            {DATA[active].desc}
          </p>
        </div>
      )}
    </section>
  )
}
