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

// Escalera diagonal — patrón por defecto (primer grupo de cuadros).
const STAIRCASE_STEPS = [
  { x: 0, y: 3 },
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 3, y: 0 },
  { x: 4, y: 1 },  // pegado al último de la diagonal
]

// Cruz compacta — patrón del segundo grupo, para que no se vea como una
// versión chica de la misma escalera.
const CROSS_STEPS = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 1 },
  { x: 1, y: 2 },
]

// Decoración geométrica de cuadros. Se arma con cuadrados sueltos para
// controlar con precisión la disposición.
function Checkerboard({ size = 100, gap = 0, steps = STAIRCASE_STEPS }) {
  const minX = Math.min(...steps.map(step => step.x))
  const minY = Math.min(...steps.map(step => step.y))
  const maxX = Math.max(...steps.map(step => step.x))
  const maxY = Math.max(...steps.map(step => step.y))
  const width = (maxX - minX + 1) * size + (maxX - minX) * gap
  const height = (maxY - minY + 1) * size + (maxY - minY) * gap

  return (
    <div style={{ position: 'relative', width, height }}>
      {steps.map((step) => (
        <div
          key={`${step.x}-${step.y}`}
          style={{
            position: 'absolute',
            left: (step.x - minX) * (size + gap),
            top: (step.y - minY) * (size + gap),
            width: size,
            height: size,
            background: '#000',
          }}
        />
      ))}
    </div>
  )
}

// Decoración del proyecto destacado — por ahora solo los cuadros, sin nombre
// ni descripción. Fijo en la esquina de la sección (no viaja con el mundo).
function FeaturedProjectCard({ size = 72, steps }) {
  return (
    <div data-card style={{ position: 'relative' }}>
      <Checkerboard size={size} steps={steps} />
    </div>
  )
}

function ProjectRevealCard({ repo, label = 'project' }) {
  if (!repo) return null

  const logos = (repo.languages || [])
    .map(lang => ({ lang, Logo: getLogo(lang) }))
    .filter(x => x.Logo)
    .slice(0, 5)

  return (
    <div
      style={{
        width: 'min(30vw, 440px)',
        padding: 0,
        border: 'none',
        background: 'transparent',
        boxShadow: 'none',
        backdropFilter: 'none',
      }}
    >
      <span style={{ display: 'block', fontFamily: '"Inter",sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.45)', marginBottom: '0.55rem' }}>
        {label}
      </span>
      <div style={{ fontFamily: '"AldoTheApache","Bebas Neue",Impact,sans-serif', fontSize: 'clamp(2.1rem, 4vw, 4rem)', lineHeight: 0.95, letterSpacing: '-0.03em', color: '#000' }}>
        {repo.name.toUpperCase()}
      </div>
      <div style={{ marginTop: '0.8rem', fontFamily: '"Inter",sans-serif', fontSize: '0.95rem', lineHeight: 1.45, color: 'rgba(0,0,0,0.72)' }}>
        {repo.description}
      </div>

      {logos.length > 0 && (
        <div style={{ marginTop: '1rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
          {logos.map(({ lang, Logo }) => (
            <span
              key={lang}
              title={lang}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 34,
                height: 34,
                background: '#f4f4f4',
                borderRadius: '9px',
                border: '1px solid #ebebeb',
                flexShrink: 0,
              }}
            >
              <Logo width={19} height={19} style={{ filter: 'grayscale(1)' }} />
            </span>
          ))}
        </div>
      )}

      <div style={{ marginTop: '1.1rem', display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#000', textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,0.18)', paddingBottom: '2px', whiteSpace: 'nowrap' }}>
          github →
        </a>
        {repo.homepage && (
          <a href={repo.homepage} target="_blank" rel="noopener noreferrer" style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#000', textDecoration: 'none', borderBottom: '1px solid #000', paddingBottom: '2px', whiteSpace: 'nowrap' }}>
            live →
          </a>
        )}
      </div>
    </div>
  )
}

// Todas las medidas en px de esta sección están ajustadas para un viewport
// de referencia de 762px de ancho (el tamaño en el que se diseñó la escena).
// REF_VW + getSceneScale() escalan todo (dino, cactus, cuadros, separaciones)
// según el ancho real de pantalla — pero AMORTIGUADO: escalar 1:1 con el
// viewport (una pantalla de 1440px es ~1.9x el de referencia) se veía
// gigante en un monitor normal. DAMPING reduce ese crecimiento a una
// fracción, así se nota más grande que en el preview angosto sin llegar a
// verse desproporcionado.
const REF_VW = 762
const SCALE_DAMPING = 0.2
function getSceneScale(vw) {
  const raw = vw / REF_VW
  const damped = 1 + (raw - 1) * SCALE_DAMPING
  return gsap.utils.clamp(0.8, 1.3, damped)
}

const GROUND_BOTTOM_BASE = 65 // px desde el borde inferior de la sección
const DINO_W_BASE    = 150
const DINO_H_BASE    = 162
const CACTUS_H_BASE  = 170    // alto del cactus (obstáculo de suelo)
const CACTUS_W_BASE  = 104    // ancho del cactus
const CACTUS_DROP_BASE = 35   // px que el cactus baja por debajo de la línea del suelo
const BIRD_W_BASE    = 66
const BIRD_H_BASE    = 46
const BIRD_FLY_BASE  = 78     // cuánto vuela el pájaro por encima del suelo (px)
const CJUMP_BASE     = 250    // altura del salto sobre un cactus
const BIRD_LIFT_BASE = 210    // altura a la que el dino se eleva para superar un pájaro
const OBSTACLE_GAP_BASE = 320 // separación (px) entre un obstáculo y el siguiente
const JUMP_SCALE = 1.22  // cuánto crece el dino en el aire al saltar (no es px, no escala)
const CUBE_SIZE_1_BASE = 110  // tamaño de cuadro de la primera escalera / ancla del efecto
const CUBE_SIZE_2_BASE = 90   // tamaño de cuadro de la segunda escalera (cruz)
const BOARD_GAP_BASE = 80     // separación antes de la primera escalera

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
  const cardRef       = useRef(null)
  const overlayRef    = useRef(null)
  const whiteDinoRef  = useRef(null)
  const { repos, loading } = useGithubRepos()
  const [vpKey, setVpKey] = useState(0)

  // Reconstruir el timeline al redimensionar (las posiciones se miden en px)
  useEffect(() => {
    let t
    const onResize = () => { clearTimeout(t); t = setTimeout(() => setVpKey(k => k + 1), 200) }
    window.addEventListener('resize', onResize)
    return () => { clearTimeout(t); window.removeEventListener('resize', onResize) }
  }, [])

  // Escala de la escena según el ancho real de pantalla (ver getSceneScale).
  // vpKey cambia al redimensionar y fuerza este re-render, así se recalcula.
  const scale = getSceneScale(typeof window !== 'undefined' ? window.innerWidth : REF_VW)
  const GROUND_BOTTOM = GROUND_BOTTOM_BASE * scale
  const DINO_W    = DINO_W_BASE * scale
  const DINO_H    = DINO_H_BASE * scale
  const CACTUS_H  = CACTUS_H_BASE * scale
  const CACTUS_W  = CACTUS_W_BASE * scale
  const CACTUS_DROP = CACTUS_DROP_BASE * scale
  const BIRD_W    = BIRD_W_BASE * scale
  const BIRD_H    = BIRD_H_BASE * scale
  const BIRD_FLY  = BIRD_FLY_BASE * scale
  const OBSTACLE_GAP = OBSTACLE_GAP_BASE * scale
  const CUBE_SIZE_1 = CUBE_SIZE_1_BASE * scale
  const CUBE_SIZE_2 = CUBE_SIZE_2_BASE * scale
  const BOARD_GAP = BOARD_GAP_BASE * scale
  // Separaciones verticales/horizontales de tarjetas y cuadros (antes en
  // rem fijo, que no crecía con el resto de la escena en pantallas grandes).
  const SPACE_LOW   = 176 * scale // proyecto "bajo"
  const SPACE_HIGH  = 232 * scale // proyecto "alto" (desalineado)
  const SPACE_BOARD  = 96  * scale // debajo de la primera escalera (diagonal)
  const SPACE_BOARD_2 = 160 * scale // debajo de la segunda escalera (cruz) — más arriba
  const GAP_CARD    = 48  * scale // ~3rem: entre tarjetas de proyecto
  const GAP_SMALL   = 32  * scale // ~2rem

  useLayoutEffect(() => {
    if (loading || !repos.length || !worldRef.current) return

    // El overlay se anima con un gsap.ticker (no lo gestiona gsap.context),
    // así que hay que quitarlo a mano en el cleanup para no acumular tickers
    // huérfanos en cada resize/remonte que sigan leyendo un cubo desmontado.
    let overlayTicker = null

    const ctx = gsap.context(() => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const CJUMP     = CJUMP_BASE * scale
      const BIRD_LIFT = BIRD_LIFT_BASE * scale

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

      // Reparto del scroll entre intro (transición), carrera y crecimiento final
      const introScroll = vh * 0.9
      const GROW_SCROLL = vh * 0.7   // scroll dedicado al cuadro creciendo a pantalla completa
      // Colchón de scroll pineado DESPUÉS de que el efecto llega a p=1.
      // p=1 SIEMPRE coincide exactamente con el scroll `end` del ScrollTrigger
      // (así funciona scrub), así que agregar buffer solo a `end` no crea
      // ningún margen — mueve el punto p=1 proporcionalmente con él. Para
      // que quede tiempo pineado de sobra DESPUÉS de p=1, hace falta un tween
      // vacío que estire tl.duration() sin mover cuándo se alcanza p=1 (ver
      // más abajo, junto al ticker del overlay). Sin este colchón,
      // `anticipatePin` libera el pin unos ~150px antes de que el negro
      // termine de crecer, y el dino blanco se dibuja ya sin `position:
      // fixed` — rompiendo su posición en pantalla.
      const END_BUFFER     = vh * 0.4
      const INTRO_DUR   = 0.55
      const RUN_START   = 0.55
      const RUN_DUR     = INTRO_DUR * (travel / introScroll)
      const GROW_DUR    = INTRO_DUR * (GROW_SCROLL / introScroll)
      const END_BUFFER_DUR = INTRO_DUR * (END_BUFFER / introScroll)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${introScroll + travel + GROW_SCROLL + END_BUFFER}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })
      window.__debugTl = tl
      window.__debugGeo = { RUN_START, RUN_DUR, GROW_DUR, END_BUFFER_DUR, introScroll, travel, GROW_SCROLL, END_BUFFER }

      // Estado inicial
      gsap.set(dinoRef.current, { scaleY: 0, scaleX: 1, y: 0, transformOrigin: 'bottom center' })
      gsap.set(groundRef.current, { opacity: 0 })
      gsap.set(worldRef.current, { x: 0, opacity: 0 })
      if (cardRef.current) gsap.set(cardRef.current, { opacity: 1, scale: 1 })

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

      // ── Efecto final: overlay negro crece desde el cuadro data-bottom-cell ──
      // Usa gsap.ticker para leer la posición REAL del cuadro en cada frame.
      {
        const bottomCellEl = cardRef.current?.querySelector('[data-bottom-cell="true"]')
        if (bottomCellEl && overlayRef.current) {
          // El crecimiento tiene su PROPIO tramo de scroll (GROW_DUR), después
          // de que la carrera termina (RUN_START+RUN_DUR): el mundo ya dejó de
          // moverse y la escalera de cuadros está asentada en su posición
          // final antes de que el negro empiece a crecer. Antes, el negro
          // arrancaba a una fracción fija de la carrera, sin relación con si
          // la escalera ya había entrado en pantalla o si el dino ya había
          // saltado el último obstáculo.
          const fadeStart = RUN_START + RUN_DUR
          const fadeDur   = GROW_DUR
          gsap.set(overlayRef.current, { clipPath: 'inset(100% 0% 0% 100%)', opacity: 1 })
          gsap.set(whiteDinoRef.current, { opacity: 0, scale: 0.85, transformOrigin: 'center center' })

          // Crear un objeto de progreso que el timeline scrub controla
          const state = { progress: 0 }

          tl.to(state, {
            progress: 1,
            ease: 'power2.in',
            duration: fadeDur,
          }, fadeStart)

          // Tween vacío que solo alarga tl.duration() (y por lo tanto el
          // scroll `end` del pin) sin animar nada. Esto deja el pin activo
          // un rato DESPUÉS de que p llega a 1, para que el negro completo y
          // el dino blanco terminen de dibujarse mientras la sección todavía
          // es `position: fixed` (ver nota junto a END_BUFFER más arriba).
          tl.to({}, { duration: END_BUFFER_DUR }, fadeStart + fadeDur)

          // El mundo ya está detenido cuando arranca el fundido (termina en
          // fadeStart), así que la posición del cuadro es estable. Aun así se
          // captura una única vez al arrancar, por si el scrub deja el mundo
          // a mitad de camino en algún frame intermedio.
          let anchorRect = null

          // El ticker lee la posición real del cuadro en cada frame
          const ticker = gsap.ticker.add(() => {
            if (!overlayRef.current) return
            if (state.progress <= 0) {
              if (anchorRect) overlayRef.current.style.clipPath = 'inset(100% 0% 0% 100%)'
              anchorRect = null
              if (whiteDinoRef.current) gsap.set(whiteDinoRef.current, { opacity: 0, scale: 0.85 })
              return
            }
            const p = state.progress

            // El dino blanco solo aparece una vez la pantalla ya está
            // prácticamente negra (últimos 15% del crecimiento), y se
            // desvanece de nuevo si el usuario vuelve hacia atrás.
            if (whiteDinoRef.current) {
              const dinoP = gsap.utils.clamp(0, 1, (p - 0.85) / 0.15)
              whiteDinoRef.current.style.opacity = dinoP
              whiteDinoRef.current.style.transform = `scale(${0.85 + dinoP * 0.15})`
            }
            if (!anchorRect) {
              const r0 = bottomCellEl.getBoundingClientRect()
              anchorRect = { top: r0.top, left: r0.left, right: r0.right, bottom: r0.bottom }
            }
            const r = anchorRect

            // El cubo se engrandece HACIA LA DERECHA: el borde izquierdo queda
            // anclado al cuadro mientras el resto (derecha, arriba, abajo) se
            // expande. Solo en el tramo final (p > 0.7) el borde izquierdo se
            // suelta para completar el fundido a pantalla completa.
            const pGrow = gsap.utils.clamp(0, 1, p / 0.7)          // crece a la derecha
            const pLeft = gsap.utils.clamp(0, 1, (p - 0.7) / 0.3)  // rellena a la izquierda al final

            const iTop    = r.top                      * (1 - pGrow)
            const iRight  = Math.max(vw - r.right, 0)  * (1 - pGrow)
            const iBottom = Math.max(vh - r.bottom, 0) * (1 - pGrow)
            const iLeft   = r.left                     * (1 - pLeft)

            overlayRef.current.style.clipPath =
              `inset(${iTop}px ${iRight}px ${iBottom}px ${iLeft}px)`

            // El ticker se queda registrado incluso al llegar a p=1: el
            // scroll es reversible, así que si el usuario vuelve hacia
            // atrás necesita seguir recalculando el clip-path para que el
            // negro se achique de nuevo. Antes se desregistraba aquí mismo,
            // dejando el overlay trabado en negro para siempre tras llegar
            // al final una vez. Solo se limpia de verdad en el cleanup del
            // efecto (unmount/resize).
          })
          overlayTicker = ticker

          // Mundo y dino desaparecen a mitad del efecto
          tl.to([dinoRef.current, groundRef.current, worldRef.current], {
            opacity: 0, ease: 'none', duration: fadeDur * 0.3,
          }, fadeStart + fadeDur * 0.5)
        }
      }

      // ── Saltos sincronizados: cada obstáculo cruza al dino en un momento exacto ──
      obstacles.forEach(o => {
        // Fracción de la carrera en la que este obstáculo coincide con el dino
        const f = gsap.utils.clamp(0.02, 0.99, (o.cx - dinoCenterX) / travel)
        const T = RUN_START + f * RUN_DUR

        if (o.type === 'cactus') {
          // Salto rápido: cima justo cuando el cactus está debajo del dino.
          // Además crece un poco en el aire, para dar sensación de impulso.
          const JW = gsap.utils.clamp(0.05, 0.5, (300 / travel) * RUN_DUR)
          tl.to(dinoRef.current, { y: -CJUMP, scale: JUMP_SCALE, ease: 'power2.out', duration: JW / 2 }, T - JW / 2)
          tl.to(dinoRef.current, { y: 0,      scale: 1,          ease: 'power2.in',  duration: JW / 2 }, T)
          tl.to(dinoInnerRef.current, { rotation: -8, duration: JW / 2 }, T - JW / 2)
          tl.to(dinoInnerRef.current, { rotation: 0,  duration: JW / 2 }, T)
        } else {
          // Pájaro: el dino se eleva, crece mientras se mantiene arriba, y baja
          const BW = gsap.utils.clamp(0.08, 0.7, (520 / travel) * RUN_DUR)
          tl.to(dinoRef.current, { y: -BIRD_LIFT, scale: JUMP_SCALE, ease: 'power2.out', duration: BW * 0.35 }, T - BW * 0.55)
          tl.to(dinoRef.current, { y: -BIRD_LIFT, duration: BW * 0.30 }, T - BW * 0.20) // se mantiene arriba
          tl.to(dinoRef.current, { y: 0, scale: 1, ease: 'power2.in', duration: BW * 0.35 }, T + BW * 0.15)
        }
      })
    }, sectionRef)

    return () => {
      if (overlayTicker) gsap.ticker.remove(overlayTicker)
      ctx.revert()
    }
  }, [repos, loading, vpKey])

  const H2 = {
    fontFamily: '"AldoTheApache", "Bebas Neue", Impact, sans-serif',
    fontSize: 'clamp(5rem, 17vw, 17rem)',
    fontWeight: 400, margin: 0, lineHeight: 1,
    letterSpacing: '-0.02em', userSelect: 'none', whiteSpace: 'nowrap',
  }

  const obstacles = repos.slice(0, 4).map((repo, i) => ({ repo, type: obstacleType(i) }))
  const findRepo = (needle, fallbackIndex) => repos.find(repo => repo.name.toLowerCase().includes(needle)) || repos[fallbackIndex]
  const project1 = findRepo('surq', 0)      // surqo
  const project2 = findRepo('mylife', 1)    // mylife-hub
  const project3 = findRepo('auth', 2)      // auth-service
  const project4 = findRepo('donde', 3)     // donde-oscar (GPS)
  const project5 = findRepo('redis', 4)     // redis-cache-aside-catalog

  return (
    <section id="projects" ref={sectionRef} style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>

      {/* ── Fondos ── */}
      <div ref={blackBgRef} style={{ position: 'absolute', inset: 0, zIndex: 0, background: '#000', clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
      <div ref={whiteBgRef} style={{ position: 'absolute', inset: 0, zIndex: 1, background: '#fff', clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%, 100% 0%)' }} />

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
        paddingLeft: '18vw',
        willChange: 'transform',
        pointerEvents: 'none',
      }}>
        {!loading && obstacles.map(({ repo, type }, i) => (
          <div key={repo.name} style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', flex: '0 0 auto' }}>
            {/* Entre el primer cactus y la primera escalera: dos proyectos,
                el segundo un poco más arriba para que no queden alineados */}
            {i === 1 && project1 && (
              <div style={{ flex: '0 0 auto', marginRight: GAP_CARD, marginBottom: SPACE_LOW, pointerEvents: 'auto' }}>
                <ProjectRevealCard repo={project1} label="project" />
              </div>
            )}
            {i === 1 && project2 && (
              <div style={{ flex: '0 0 auto', marginRight: GAP_CARD, marginBottom: SPACE_HIGH, pointerEvents: 'auto' }}>
                <ProjectRevealCard repo={project2} label="project" />
              </div>
            )}
            {/* Escalera de cuadros — decoración visible junto al segundo cactus */}
            {i === 1 && (
              <div data-board-decor style={{ flex: '0 0 auto', marginLeft: BOARD_GAP, marginRight: GAP_SMALL, marginBottom: SPACE_BOARD, position: 'relative', zIndex: 7, pointerEvents: 'none' }}>
                <FeaturedProjectCard size={CUBE_SIZE_1} />
              </div>
            )}
            {/* Entre el segundo y el tercer cactus: otros dos proyectos */}
            {i === 2 && project3 && (
              <div style={{ flex: '0 0 auto', marginRight: GAP_CARD, marginBottom: SPACE_LOW, pointerEvents: 'auto' }}>
                <ProjectRevealCard repo={project3} label="project" />
              </div>
            )}
            {i === 2 && project4 && (
              <div style={{ flex: '0 0 auto', marginRight: GAP_CARD, marginBottom: SPACE_HIGH, pointerEvents: 'auto' }}>
                <ProjectRevealCard repo={project4} label="project" />
              </div>
            )}
            {/* Segunda escalera de cuadros, antes del cuarto cactus — patrón
                distinto (cruz compacta) para que no se vea igual que la primera */}
            {i === 3 && (
              <div style={{ flex: '0 0 auto', marginRight: GAP_SMALL, marginBottom: SPACE_BOARD_2, position: 'relative', zIndex: 7, pointerEvents: 'none' }}>
                <FeaturedProjectCard size={CUBE_SIZE_2} steps={CROSS_STEPS} />
              </div>
            )}
            {/* Último proyecto, junto a la segunda escalera */}
            {i === 3 && project5 && (
              <div style={{ flex: '0 0 auto', marginRight: GAP_CARD * 1.6, marginBottom: SPACE_LOW, pointerEvents: 'auto' }}>
                <ProjectRevealCard repo={project5} label="project" />
              </div>
            )}
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
          </div>
        ))}

        {/* Cuadro final — vive después del último obstáculo, así que cuando la
            carrera termina ya está asentado en una posición de pantalla
            válida. Es el cuadro visible del que arranca el crecimiento a
            pantalla completa (la escalera decorativa de antes es solo
            ambientación, junto al segundo cactus). */}
        {!loading && (
          <div ref={cardRef} style={{ flex: '0 0 auto', marginRight: GAP_CARD * 1.3, marginBottom: SPACE_HIGH, position: 'relative', zIndex: 7, pointerEvents: 'none' }}>
            <div data-bottom-cell="true" style={{ width: CUBE_SIZE_1, height: CUBE_SIZE_1, background: '#000' }} />
          </div>
        )}

        {/* Bloque final */}
        <div style={{ flex: '0 0 auto', width: '40vw', display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '3rem', paddingLeft: '1rem', pointerEvents: 'auto' }}>
          <span style={{ fontFamily: '"AldoTheApache","Bebas Neue",Impact,sans-serif', fontSize: 'clamp(2rem,4vw,4rem)', color: 'rgba(0,0,0,0.12)', whiteSpace: 'nowrap' }}>& more</span>
          <a href="https://github.com/ricardomb-tech" target="_blank" rel="noopener noreferrer" style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)', textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,0.15)', paddingBottom: '1px', width: 'fit-content' }}>github.com/ricardomb-tech →</a>
        </div>
      </div>

      {/* Overlay que crece desde el cuadro data-bottom-cell hasta pantalla completa.
          Debe vivir FUERA del árbol de worldRef: worldRef recibe un transform (x)
          animado por GSAP, y un ancestro con transform vuelve `position: fixed`
          relativo a ese ancestro en vez de al viewport, lo que rompía el efecto
          (el overlay se movía y recortaba junto con el mundo en vez de cubrir
          la pantalla real). Aquí, como hijo directo de la sección pineada
          (que sí coincide con el viewport durante el pin), el fixed funciona. */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#000',
          zIndex: 9999,
          pointerEvents: 'none',
          clipPath: 'inset(100% 100% 100% 100%)',
          opacity: 1,
        }}
      />

      {/* Dino blanco — aparece recién cuando el overlay ya está prácticamente
          a pantalla completa, encima de él (z-index mayor). Mismo trazado
          que el dino negro, con los colores invertidos. */}
      <div
        ref={whiteDinoRef}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          marginLeft: -DINO_W * 1.3 / 2,
          marginTop: -DINO_H * 1.3 / 2,
          width: DINO_W * 1.3,
          height: DINO_H * 1.3,
          zIndex: 10000,
          pointerEvents: 'none',
        }}
      >
        <svg viewBox="13.848 0 283.645 305.4" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <path d="M269.352 91.664h-42.436V80.04h70.577v-65.73h-14.294V0H168.4v14.309h-13.848v91.664H140.26v13.861h-20.994v14.309H98.271v14.308H83.977v13.862H58.069v-14.309H44.222v-13.861H29.928v-28.17h-16.08v86.746h13.847v14.308h14.293v13.862h13.848v14.308H70.13v13.862h13.847v56.34h30.375V289.3h-13.848V277.23h13.848v-13.862h14.294V249.06h11.613v14.308h14.294V305.4h30.375V289.3h-14.294v-54.104h14.294V220.89h13.847v-21.016h14.294v-49.186h11.614v13.862h16.527v-30.406h-28.14v-25.934h56.282z" fill="#fff"/>
          <path d="M182.248 20.569h16.974V37.56h-16.974z" fill="#000"/>
        </svg>
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
