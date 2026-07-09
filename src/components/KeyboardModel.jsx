import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

function lerp(a, b, t) { return a + (b - a) * t }

const CREAM       = '#ede0cc'
const ORANGE      = '#e85c00'
const SILVER      = '#c4c4c4'
const SILVER_DARK = '#a0a0a0'
const BLACK       = '#111111'

function Keycap({ position = [0, 0, 0], label, color = CREAM, labelColor = '#2a1f0e' }) {
  const isOrange = color === ORANGE

  const mat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color:              new THREE.Color(color),
    roughness:          isOrange ? 0.22 : 0.12,
    metalness:          0.0,
    clearcoat:          isOrange ? 0.30 : 0.60,
    clearcoatRoughness: 0.15,
    transmission:       isOrange ? 0.0  : 0.06,
    thickness:          0.6,
    ior:                1.45,
  }), [color, isOrange])

  return (
    <group position={position}>
      {/* Base skirt */}
      <RoundedBox args={[0.84, 0.08, 0.84]} radius={0.05} smoothness={4}>
        <primitive object={mat} attach="material" />
      </RoundedBox>
      {/* Mid body */}
      <RoundedBox args={[0.76, 0.18, 0.76]} radius={0.07} smoothness={5}
                  position={[0, 0.13, 0]}>
        <primitive object={mat} attach="material" />
      </RoundedBox>
      {/* Top cap — gentle pillow */}
      <RoundedBox args={[0.67, 0.18, 0.67]} radius={0.14} smoothness={6}
                  position={[0, 0.28, 0]}>
        <primitive object={mat} attach="material" />
      </RoundedBox>
      {/* Label */}
      <Text
        position={[0, 0.40, 0.30]}
        rotation={[0.28, 0, 0]}
        fontSize={0.16}
        color={labelColor}
        anchorX="center"
        anchorY="middle"
        font="/AldotheApache.ttf"
        renderOrder={10}
        depthOffset={-1}
      >
        {label}
      </Text>
    </group>
  )
}

export default function KeyboardModel({ mouseRef }) {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!groupRef.current) return
    groupRef.current.rotation.y = lerp(
      groupRef.current.rotation.y, mouseRef.current.x * 0.18 + 0.35, 0.04)
    groupRef.current.rotation.x = lerp(
      groupRef.current.rotation.x, -mouseRef.current.y * 0.10 - 0.52, 0.04)
    groupRef.current.position.y = Math.sin(t * 0.85) * 0.05
  })

  return (
    <group ref={groupRef}
           position={[0.0, 0.0, 0]}
           rotation={[-0.52, 0.35, 0.06]}
           scale={0.82}>

      {/* Outer silver base — thick enough to look solid */}
      <RoundedBox args={[2.60, 0.44, 2.60]} radius={0.10} smoothness={6}
                  position={[0, -0.56, 0]}>
        <meshStandardMaterial color={SILVER} roughness={0.16} metalness={0.55} />
      </RoundedBox>

      {/* Darker lip / rim */}
      <RoundedBox args={[2.34, 0.14, 2.34]} radius={0.08} smoothness={5}
                  position={[0, -0.30, 0]}>
        <meshStandardMaterial color={SILVER_DARK} roughness={0.20} metalness={0.45} />
      </RoundedBox>

      {/* Black rubber inner tray */}
      <RoundedBox args={[2.12, 0.16, 2.12]} radius={0.07} smoothness={4}
                  position={[0, -0.20, 0]}>
        <meshStandardMaterial color={BLACK} roughness={0.85} metalness={0.0} />
      </RoundedBox>

      {/* Keys:
            1       ← back-center
          0   2     ← mid-left / mid-right
            GO      ← front-center
      */}
      <Keycap position={[ 0,    -0.06,  -0.85]} label="1" />
      <Keycap position={[-0.85, -0.06,   0   ]} label="0" />
      <Keycap position={[ 0.85, -0.06,   0   ]} label="2" />
      <Keycap position={[ 0,    -0.06,   0.85]}
              label="GO" color={ORANGE} labelColor="#ffffff" />

    </group>
  )
}
