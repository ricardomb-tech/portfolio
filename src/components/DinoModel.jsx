import { useRef, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

function lerp(a, b, t) { return a + (b - a) * t }

export default function DinoModel({ mouseRef }) {
  const groupRef = useRef()
  const gltf = useLoader(GLTFLoader, '/dino.glb')

  // Refs to specific bones for procedural animation
  const headBone  = useRef()
  const neckBone  = useRef()
  const tailBones = useRef([])
  const coreBone  = useRef()

  useEffect(() => {
    if (!gltf.scene) return
    // Head is the last bone in the spine chain
    headBone.current  = gltf.scene.getObjectByName('Bone.007_08')
    neckBone.current  = gltf.scene.getObjectByName('Bone.005_06')
    coreBone.current  = gltf.scene.getObjectByName('Core_01')

    // Collect tail bones
    const tails = []
    for (let i = 0; i <= 9; i++) {
      const name = i === 0 ? 'Tail_00' : `Tail.00${i}_0${i + 12}`
      const bone = gltf.scene.getObjectByName(name)
      if (bone) tails.push(bone)
    }
    tailBones.current = tails
  }, [gltf.scene])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const mx = mouseRef.current.x
    const my = mouseRef.current.y

    // ── Root group: mouse look + idle sway ─────────────────────────
    if (groupRef.current) {
      groupRef.current.rotation.y = lerp(
        groupRef.current.rotation.y, mx * 0.25 + Math.sin(t * 0.4) * 0.06, 0.04
      )
      groupRef.current.rotation.x = lerp(
        groupRef.current.rotation.x, my * 0.12, 0.04
      )
      // subtle vertical bob
      groupRef.current.position.y = -2.2 + Math.sin(t * 1.1) * 0.04
    }

    // ── Head: follows mouse + independent look-around ───────────────
    if (headBone.current) {
      const targetX = lerp(0, my * 0.4, 0.8) + Math.sin(t * 0.6) * 0.08
      const targetY = lerp(0, mx * 0.35, 0.8) + Math.sin(t * 0.35) * 0.12
      headBone.current.rotation.x = lerp(headBone.current.rotation.x, targetX, 0.06)
      headBone.current.rotation.y = lerp(headBone.current.rotation.y, targetY, 0.06)
    }

    // ── Neck: subtle secondary motion ───────────────────────────────
    if (neckBone.current) {
      neckBone.current.rotation.x = lerp(
        neckBone.current.rotation.x, Math.sin(t * 0.5) * 0.06, 0.05
      )
    }

    // ── Tail: wave propagation ───────────────────────────────────────
    tailBones.current.forEach((bone, i) => {
      const phase = t * 1.4 - i * 0.35
      const amp   = 0.05 + i * 0.015
      bone.rotation.y = lerp(bone.rotation.y, Math.sin(phase) * amp, 0.08)
      bone.rotation.z = lerp(bone.rotation.z, Math.cos(phase * 0.7) * amp * 0.4, 0.08)
    })
  })

  return (
    <group ref={groupRef} position={[-0.8, -2.2, 0]} scale={0.65}>
      <primitive object={gltf.scene} />
    </group>
  )
}
