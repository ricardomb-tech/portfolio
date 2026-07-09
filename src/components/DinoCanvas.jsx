import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import KeyboardModel from './KeyboardModel'
import CanvasErrorBoundary from './CanvasErrorBoundary'

export default function DinoCanvas({ mouseRef }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '65%',
        height: '100%',
        zIndex: 25,
        pointerEvents: 'none',
      }}
    >
      <CanvasErrorBoundary>
        <Canvas
          camera={{ position: [0, 7, 5], fov: 32 }}
          style={{ background: 'transparent', position: 'absolute', inset: 0 }}
          gl={{ alpha: true, antialias: true, toneMapping: 4 /* ACESFilmic */ }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0)
            gl.toneMappingExposure = 1.1
          }}
        >
          {/* Soft fill from above-left (key face light) */}
          <directionalLight position={[3, 8, 6]}   intensity={2.2} color="#fff8f0" />
          {/* Rim from back-right */}
          <directionalLight position={[-4, 4, -3]} intensity={1.0} color="#ddeeff" />
          {/* Warm underlight */}
          <directionalLight position={[0, -4, 3]}  intensity={0.5} color="#ffe8d0" />
          {/* Soft ambient */}
          <ambientLight intensity={0.9} />

          <Suspense fallback={null}>
            <KeyboardModel mouseRef={mouseRef} />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  )
}
