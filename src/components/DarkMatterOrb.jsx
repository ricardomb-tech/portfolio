import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Torus, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function lerp(a, b, t) { return a + (b - a) * t }

function Scene() {
  const ringRef  = useRef()
  const ring2Ref = useRef()
  const orbRef   = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.4 + 0.6
      ringRef.current.rotation.y += 0.004
      ringRef.current.rotation.z = Math.cos(t * 0.2) * 0.15
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.sin(t * 0.25 + 1.2) * 0.5 + 0.8
      ring2Ref.current.rotation.y -= 0.003
      ring2Ref.current.rotation.z = Math.cos(t * 0.18) * 0.2
    }
    if (orbRef.current) {
      orbRef.current.position.y = Math.sin(t * 0.5) * 0.08
    }
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 3]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-3, -2, -3]} intensity={0.8} color="#aaaaff" />

      {/* Núcleo oscuro */}
      <Sphere ref={orbRef} args={[0.55, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#050505"
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={0.5}
        />
      </Sphere>

      {/* Anillo principal */}
      <Torus ref={ringRef} args={[1.1, 0.045, 16, 120]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#888888"
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </Torus>

      {/* Anillo secundario más delgado */}
      <Torus ref={ring2Ref} args={[1.5, 0.022, 12, 100]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#555555"
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.45}
        />
      </Torus>
    </>
  )
}

export default function DarkMatterOrb() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
