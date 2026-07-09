import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGithubRepos } from '../hooks/useGithubRepos'
import { CactusSVG } from './ui/CactusSVG'

// ── SVGL icon map: language/tech name → component ───────────────────────────
import { Nodejs           } from '@/components/ui/svgs/nodejs'
import { Python           } from '@/components/ui/svgs/python'
import { Java             } from '@/components/ui/svgs/java'
import { Postgresql       } from '@/components/ui/svgs/postgresql'
import { Docker           } from '@/components/ui/svgs/docker'
import { Redis            } from '@/components/ui/svgs/redis'
import { Graphql          } from '@/components/ui/svgs/graphql'
import { Spring           } from '@/components/ui/svgs/spring'
import { Nginx            } from '@/components/ui/svgs/nginx'
import { MongodbIconLight } from '@/components/ui/svgs/mongodbIconLight'
import { Golang           } from '@/components/ui/svgs/golang'
import { ReactDark        } from '@/components/ui/svgs/reactDark'
import { Vue              } from '@/components/ui/svgs/vue'
import { Typescript       } from '@/components/ui/svgs/typescript'
import { Tailwindcss      } from '@/components/ui/svgs/tailwindcss'
import { Figma            } from '@/components/ui/svgs/figma'
import { Angular          } from '@/components/ui/svgs/angular'
import { NextjsIconDark   } from '@/components/ui/svgs/nextjsIconDark'
import { Vite             } from '@/components/ui/svgs/vite'
import { Sass             } from '@/components/ui/svgs/sass'
import { Html5            } from '@/components/ui/svgs/html5'
import { CssOld           } from '@/components/ui/svgs/cssOld'
import { AnthropicBlack   } from '@/components/ui/svgs/anthropicBlack'
import { Openai           } from '@/components/ui/svgs/openai'
import { OllamaDark       } from '@/components/ui/svgs/ollamaDark'
import { HuggingFace      } from '@/components/ui/svgs/huggingFace'
import { TensorflowIconDark } from '@/components/ui/svgs/tensorflowIconDark'
import { Fastapi          } from '@/components/ui/svgs/fastapi'
import { Grafana          } from '@/components/ui/svgs/grafana'
import { RaspberryPi      } from '@/components/ui/svgs/raspberryPi'

const ICON_MAP = {
  'javascript':   Nodejs,
  'typescript':   Typescript,
  'python':       Python,
  'java':         Java,
  'go':           Golang,
  'golang':       Golang,
  'css':          CssOld,
  'html':         Html5,
  'sass':         Sass,
  'nodejs':       Nodejs,
  'node.js':      Nodejs,
  'node':         Nodejs,
  'react':        ReactDark,
  'vue':          Vue,
  'vuejs':        Vue,
  'angular':      Angular,
  'nextjs':       NextjsIconDark,
  'next.js':      NextjsIconDark,
  'vite':         Vite,
  'spring boot':  Spring,
  'springboot':   Spring,
  'spring':       Spring,
  'fastapi':      Fastapi,
  'postgresql':   Postgresql,
  'postgres':     Postgresql,
  'mongodb':      MongodbIconLight,
  'redis':        Redis,
  'docker':       Docker,
  'nginx':        Nginx,
  'grafana':      Grafana,
  'anthropic':    AnthropicBlack,
  'openai':       Openai,
  'ollama':       OllamaDark,
  'huggingface':  HuggingFace,
  'tensorflow':   TensorflowIconDark,
  'graphql':      Graphql,
  'figma':        Figma,
  'tailwindcss':  Tailwindcss,
  'tailwind':     Tailwindcss,
  'raspberrypi':  RaspberryPi,
  'raspberry pi': RaspberryPi,
}

function getLogo(lang) {
  return ICON_MAP[lang.toLowerCase()] || null
}

gsap.registerPlugin(ScrollTrigger)

// ── Pájaro (pterodáctilo) estilo pixel, como el juego de Chrome ──────────────
function BirdSVG({ width = 64, height = 44, style = {}, className = '' }) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 64 44"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', overflow: 'visible', ...style }}
    >
      {/* cuerpo */}
      <path d="M0 24 H26 V18 H34 V24 H46 V29 H34 V33 H26 V29 H0 Z" fill="#000" />
      {/* cabeza + pico */}
      <path d="M46 21 H58 L64 25 H46 Z" fill="#000" />
      {/* ala */}
      <path d="M16 18 L30 0 L40 18 Z" fill="#000" />
      {/* ojo */}
      <rect x="52" y="22" width="3" height="3" fill="#fff" />
    </svg>
  )
}

// Silueta real de la nube (del SVG proporcionado) — solo el contorno, sin las
// gotas de lluvia del trazado original. Blanco sólido, estirada con
// preserveAspectRatio="none" para cubrir siempre el panel de contenido
// aunque el texto cambie de alto.
function CloudBg() {
  return (
    <svg
      viewBox="0 0 1234 1280"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
    >
      <g transform="translate(0,1280) scale(0.1,-0.1)" fill="#fff" stroke="none">
        <path d="M7925 12794 c-646 -42 -1207 -288 -1727 -757 -249 -225 -511 -570
-659 -869 l-42 -85 -186 63 c-267 91 -373 108 -621 101 -387 -11 -708 -93
-1060 -272 -539 -275 -954 -733 -1135 -1255 -19 -57 -37 -106 -39 -107 -2 -2
-59 6 -127 17 -357 58 -797 -14 -1144 -187 -261 -131 -465 -306 -616 -531
-117 -174 -181 -328 -226 -540 -24 -112 -27 -149 -27 -317 0 -168 3 -205 27
-319 151 -713 743 -1248 1532 -1383 155 -26 446 -24 600 4 163 30 352 83 491
138 l116 45 87 -69 c397 -315 863 -512 1376 -581 151 -20 487 -24 645 -7 374
40 702 138 1047 310 71 36 152 79 181 96 l51 30 58 -48 c203 -169 491 -310
787 -386 219 -55 342 -70 596 -70 239 1 321 10 519 61 439 114 896 417 1184
787 38 48 72 87 77 87 4 0 60 -22 123 -49 298 -128 445 -170 627 -178 369 -17
785 107 1090 324 197 141 398 362 525 578 276 469 357 1089 214 1642 -192 748
-747 1292 -1463 1436 l-119 24 -22 111 c-209 1032 -1029 1869 -2055 2096 -221
48 -493 72 -685 60z"/>
      </g>
    </svg>
  )
}

// Tarjeta de proyecto con forma de nube — nombre, descripción, tecnología y links.
// Sin captura de GitHub: contenido propio, curado.
function CloudCard({ repo }) {
  const logos = (repo.languages || [])
    .map(lang => ({ lang, Logo: getLogo(lang) }))
    .filter(x => x.Logo)
    .slice(0, 4)

  return (
    <div data-card style={{
      position: 'relative',
      width: 440,
      filter: 'drop-shadow(0 26px 36px rgba(0,0,0,0.18)) drop-shadow(0 8px 14px rgba(0,0,0,0.10))',
    }}>
      {/* Silueta real de la nube (sin gotas), estirada para cubrir el panel */}
      <CloudBg />

      {/* Contenido — centrado y con padding generoso para quedar dentro del
          cuerpo ancho de la nube, lejos de los bultos finos de los bordes */}
      <div style={{
        position: 'relative', zIndex: 1,
        padding: '44px 60px 80px 85px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center',
      }}>
        <h3 style={{
          fontFamily: '"AldoTheApache", "Bebas Neue", Impact, sans-serif',
          fontWeight: 400,
          fontSize: '1.9rem',
          color: '#000',
          margin: '0 0 10px',
          letterSpacing: '0.01em',
          textTransform: 'uppercase',
          lineHeight: 1,
        }}>
          {repo.name.replace(/-/g, ' ')}
        </h3>

        <div style={{ display: 'flex', width: '100%', alignItems: 'flex-start', justifyContent: 'flex-start', gap: '14px', marginBottom: '18px' }}>
          {/* Logos de tecnología */}
          {logos.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', paddingTop: '2px', order: 0, flexShrink: 0 }}>
              {logos.map(({ lang, Logo }) => (
                <span
                  key={lang}
                  title={lang}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 30,
                    height: 30,
                    background: '#f4f4f4',
                    borderRadius: '8px',
                    border: '1px solid #ebebeb',
                    flexShrink: 0,
                  }}
                >
                  <Logo width={17} height={17} style={{ filter: 'grayscale(1) brightness(0) contrast(1)' }} />
                </span>
              ))}
            </div>
          )}

          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.74rem',
            lineHeight: 1.45,
            color: 'rgba(0,0,0,0.55)',
            margin: 0,
            flex: 1,
            minWidth: 0,
            textAlign: 'left',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            overflow: 'hidden',
            order: 1,
          }}>
            {repo.description || '—'}
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.4)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(0,0,0,0.15)',
              paddingBottom: '1px',
            }}
          >
            GitHub →
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#000',
                textDecoration: 'none',
                borderBottom: '1px solid #000',
                paddingBottom: '1px',
              }}
            >
              Live →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

const GROUND_BOTTOM = 90 // px desde el borde inferior de la sección
const DINO_W    = 150
const DINO_H    = 162
const CACTUS_H  = 170    // alto del cactus (obstáculo de suelo)
const CACTUS_W  = 104    // ancho del cactus
const CACTUS_DROP = 35   // px que el cactus baja por debajo de la línea del suelo
const BIRD_W    = 66
const BIRD_H    = 46
const BIRD_FLY  = 78     // cuánto vuela el pájaro por encima del suelo (px)
const CJUMP     = 250    // altura del salto sobre un cactus
const BIRD_LIFT = 210    // altura a la que el dino se eleva para superar un pájaro
const CLOUD_BOTTOM = 270 // altura de la nube-proyecto sobre la línea del suelo (por encima del salto del dino)
const OBSTACLE_GAP = 460 // separación (px) entre un obstáculo y el siguiente

// Patrón de obstáculos: solo cactus
function obstacleType() {
  return 'cactus'
}

export default function ProjectsSection() {
  const sectionRef    = useRef(null)
  const blackBgRef    = useRef(null)
  const whiteBgRef    = useRef(null)
  const titleWhiteRef = useRef(null)
  const titleBlackRef = useRef(null)
  const dinoRef       = useRef(null)
  const dinoInnerRef  = useRef(null)
  const worldRef      = useRef(null)
  const groundRef     = useRef(null)
  const { repos, loading } = useGithubRepos()
  const [vpKey, setVpKey] = useState(0)

  // Reconstruir el timeline al redimensionar (las posiciones se miden en px)
  useEffect(() => {
    let t
    const onResize = () => { clearTimeout(t); t = setTimeout(() => setVpKey(k => k + 1), 200) }
    window.addEventListener('resize', onResize)
    return () => { clearTimeout(t); window.removeEventListener('resize', onResize) }
  }, [])

  useLayoutEffect(() => {
    if (loading || !repos.length || !worldRef.current) return

    const ctx = gsap.context(() => {
      const vw = window.innerWidth
      const vh = window.innerHeight

      // ── Geometría del mundo: medir la posición real de cada obstáculo ──
      const dinoCenterX = vw * 0.10 + DINO_W / 2
      const worldRect   = worldRef.current.getBoundingClientRect()
      const obsEls      = gsap.utils.toArray('[data-obstacle]', worldRef.current)
      const obstacles   = obsEls.map(el => {
        const r = el.getBoundingClientRect()
        return { cx: (r.left - worldRect.left) + r.width / 2, type: el.dataset.type }
      })

      const worldW  = worldRef.current.scrollWidth
      const lastCx  = obstacles.length ? obstacles[obstacles.length - 1].cx : worldW
      // Desplazamiento total: suficiente para que el último obstáculo pase al dino
      // y quede espacio para ver el bloque final.
      const travel  = Math.max(worldW - vw * 0.98, lastCx - dinoCenterX + vw * 0.6)
      const endX    = -travel

      // Reparto del scroll entre intro (transición) y carrera
      const introScroll = vh * 0.9
      const INTRO_DUR   = 0.55
      const RUN_START   = 0.55
      const RUN_DUR     = INTRO_DUR * (travel / introScroll)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${introScroll + travel}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Estado inicial
      gsap.set(dinoRef.current, { scaleY: 0, y: 0, transformOrigin: 'bottom center' })
      gsap.set(groundRef.current, { opacity: 0 })
      gsap.set(worldRef.current, { x: 0, opacity: 0 })

      // Bob de las patas (independiente del scroll) para que el dino "corra"
      gsap.to(dinoInnerRef.current, { y: -5, repeat: -1, yoyo: true, duration: 0.16, ease: 'power1.inOut' })
      // Aleteo suave de los pájaros
      gsap.to('.bird-el', { y: 7, repeat: -1, yoyo: true, duration: 0.5, ease: 'sine.inOut', stagger: { each: 0.13 } })

      // ── Intro: fondos + el texto "PROJECTS" se transforma en el dino ──
      tl.to(blackBgRef.current, { yPercent: -100, ease: 'power2.inOut', duration: 0.5 }, 0)
      tl.to(whiteBgRef.current, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'power2.inOut', duration: 0.5 }, 0)
      tl.to(titleWhiteRef.current, { opacity: 0, ease: 'power2.in', duration: 0.2 }, 0)
      tl.to(titleBlackRef.current, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'power2.inOut', duration: 0.5 }, 0)
      tl.to(titleBlackRef.current.querySelector('h2'), {
        y: () => window.innerHeight * 0.38,
        scaleY: 0, scaleX: 0.15,
        transformOrigin: 'bottom center',
        ease: 'power3.in', duration: 0.28,
      }, 0.05)
      tl.to(dinoRef.current, { scaleY: 1, ease: 'back.out(1.6)', duration: 0.22 }, 0.3)
      tl.to(groundRef.current, { opacity: 1, duration: 0.15 }, 0.32)
      tl.to(worldRef.current, { opacity: 1, duration: 0.15 }, 0.45)

      // ── Carrera: el mundo se desplaza a la izquierda a velocidad constante ──
      tl.fromTo(worldRef.current, { x: 0 }, { x: endX, ease: 'none', duration: RUN_DUR }, RUN_START)

      // ── Saltos sincronizados: cada obstáculo cruza al dino en un momento exacto ──
      obstacles.forEach(o => {
        // Fracción de la carrera en la que este obstáculo coincide con el dino
        const f = gsap.utils.clamp(0.02, 0.99, (o.cx - dinoCenterX) / travel)
        const T = RUN_START + f * RUN_DUR

        if (o.type === 'cactus') {
          // Salto rápido: cima justo cuando el cactus está debajo del dino
          const JW = gsap.utils.clamp(0.05, 0.5, (300 / travel) * RUN_DUR)
          tl.to(dinoRef.current, { y: -CJUMP, ease: 'power2.out', duration: JW / 2 }, T - JW / 2)
          tl.to(dinoRef.current, { y: 0,      ease: 'power2.in',  duration: JW / 2 }, T)
          tl.to(dinoInnerRef.current, { rotation: -8, duration: JW / 2 }, T - JW / 2)
          tl.to(dinoInnerRef.current, { rotation: 0,  duration: JW / 2 }, T)
        } else {
          // Pájaro: el dino se eleva, se mantiene arriba mientras pasa, y baja
          const BW = gsap.utils.clamp(0.08, 0.7, (520 / travel) * RUN_DUR)
          tl.to(dinoRef.current, { y: -BIRD_LIFT, ease: 'power2.out', duration: BW * 0.35 }, T - BW * 0.55)
          tl.to(dinoRef.current, { y: -BIRD_LIFT, duration: BW * 0.30 }, T - BW * 0.20) // se mantiene arriba
          tl.to(dinoRef.current, { y: 0,          ease: 'power2.in',  duration: BW * 0.35 }, T + BW * 0.15)
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [repos, loading, vpKey])

  const H2 = {
    fontFamily: '"AldoTheApache", "Bebas Neue", Impact, sans-serif',
    fontSize: 'clamp(5rem, 17vw, 17rem)',
    fontWeight: 400, margin: 0, lineHeight: 1,
    letterSpacing: '-0.02em', userSelect: 'none', whiteSpace: 'nowrap',
  }

  const obstacles = repos.map((repo, i) => ({ repo, type: obstacleType(i) }))

  return (
    <section ref={sectionRef} style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>

      {/* ── Fondos ── */}
      <div ref={blackBgRef} style={{ position: 'absolute', inset: 0, zIndex: 0, background: '#000', clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
      <div ref={whiteBgRef} style={{ position: 'absolute', inset: 0, zIndex: 1, background: '#fff', clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%, 100% 0%)' }} />

      {/* ── Nubes decorativas (zona cielo) ── */}
      {[
        { left: '12%', top: '12%', scale: 1 },
        { left: '38%', top: '7%',  scale: 0.7 },
        { left: '65%', top: '15%', scale: 0.85 },
      ].map((c, i) => (
        <svg key={i} width={90 * c.scale} height={36 * c.scale}
          viewBox="0 0 90 36" xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', left: c.left, top: c.top, zIndex: 2, pointerEvents: 'none', opacity: 0.1 }}
        >
          <rect x="10" y="18" width="70" height="12" rx="4" fill="#000"/>
          <rect x="20" y="10" width="22" height="14" rx="5" fill="#000"/>
          <rect x="38" y="6"  width="26" height="16" rx="6" fill="#000"/>
          <rect x="58" y="12" width="18" height="12" rx="4" fill="#000"/>
        </svg>
      ))}

      {/* ── Texto (encima de fondos) ── */}
      <div ref={titleWhiteRef} style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', background: '#000', clipPath: 'polygon(0 0, 100% 0, 0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ ...H2, color: '#fff' }}>PROJECTS</h2>
      </div>
      <div ref={titleBlackRef} style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', background: '#fff', clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%, 100% 0%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ ...H2, color: '#000' }}>PROJECTS</h2>
      </div>

      {/* ── Línea del suelo ── */}
      <div ref={groundRef} style={{
        position: 'absolute',
        bottom: GROUND_BOTTOM,
        left: '4vw', right: '4vw',
        height: 2,
        background: 'rgba(0,0,0,0.2)',
        zIndex: 4, pointerEvents: 'none',
      }} />

      {/* ── El "mundo" que se desplaza: obstáculo → descripción → obstáculo → … ── */}
      <div ref={worldRef} style={{
        position: 'absolute',
        bottom: GROUND_BOTTOM,
        left: 0,
        zIndex: 5,
        display: 'flex',
        alignItems: 'flex-end',
        paddingLeft: '42vw',
        willChange: 'transform',
        pointerEvents: 'none',
      }}>
        {!loading && obstacles.map(({ repo, type }, i) => (
          <div key={repo.name} style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', flex: '0 0 auto' }}>
            {/* Obstáculo */}
            {type === 'cactus' ? (
              <div data-obstacle data-type="cactus" style={{ flex: '0 0 auto', marginRight: OBSTACLE_GAP, marginBottom: -CACTUS_DROP }}>
                <CactusSVG width={CACTUS_W} height={CACTUS_H} />
              </div>
            ) : (
              <div data-obstacle data-type="bird" style={{ flex: '0 0 auto', marginRight: OBSTACLE_GAP, marginBottom: BIRD_FLY }}>
                <BirdSVG className="bird-el" width={BIRD_W} height={BIRD_H} />
              </div>
            )}

            {/* Nube-proyecto — flota en el cielo, sobre el tramo libre donde corre el dino tras el obstáculo */}
            <div style={{
              position: 'absolute',
              left: 0, right: 0,
              bottom: CLOUD_BOTTOM,
              display: 'flex', justifyContent: 'center',
              pointerEvents: 'none',
            }}>
              <div style={{ pointerEvents: 'auto' }}>
                <CloudCard repo={repo} />
              </div>
            </div>
          </div>
        ))}

        {/* Bloque final */}
        <div style={{ flex: '0 0 auto', width: '40vw', display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '3rem', paddingLeft: '1rem', pointerEvents: 'auto' }}>
          <span style={{ fontFamily: '"AldoTheApache","Bebas Neue",Impact,sans-serif', fontSize: 'clamp(2rem,4vw,4rem)', color: 'rgba(0,0,0,0.12)', whiteSpace: 'nowrap' }}>& more</span>
          <a href="https://github.com/ricardomb-tech" target="_blank" rel="noopener noreferrer" style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: '1px', width: 'fit-content' }}>github.com/ricardomb-tech →</a>
        </div>
      </div>

      {/* ── Dino — fijo, corre en su sitio; el mundo pasa por debajo/detrás ── */}
      <div ref={dinoRef} style={{
        position: 'absolute',
        bottom: GROUND_BOTTOM,
        left: '10vw',
        zIndex: 6, pointerEvents: 'none',
        width: DINO_W, height: DINO_H,
      }}>
        <div ref={dinoInnerRef} style={{ width: '100%', height: '100%' }}>
          <svg viewBox="13.848 0 283.645 305.4" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <path d="M269.352 91.664h-42.436V80.04h70.577v-65.73h-14.294V0H168.4v14.309h-13.848v91.664H140.26v13.861h-20.994v14.309H98.271v14.308H83.977v13.862H58.069v-14.309H44.222v-13.861H29.928v-28.17h-16.08v86.746h13.847v14.308h14.293v13.862h13.848v14.308H70.13v13.862h13.847v56.34h30.375V289.3h-13.848V277.23h13.848v-13.862h14.294V249.06h11.613v14.308h14.294V305.4h30.375V289.3h-14.294v-54.104h14.294V220.89h13.847v-21.016h14.294v-49.186h11.614v13.862h16.527v-30.406h-28.14v-25.934h56.282z" fill="#000"/>
            <path d="M182.248 20.569h16.974V37.56h-16.974z" fill="#fff"/>
          </svg>
        </div>
      </div>

    </section>
  )
}
