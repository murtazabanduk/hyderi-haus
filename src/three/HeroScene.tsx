// Ambient hero scene — a maquette turning slowly on the drawing sheet,
// with a gentle parallax toward the pointer. Not orbitable; the full
// viewer lives on each project page.

import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import Maquette from './Maquette'

function Turntable() {
  const spin = useRef<THREE.Group>(null)
  const tilt = useRef<THREE.Group>(null)
  const reduced = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  useFrame((state, dt) => {
    if (spin.current && !reduced) {
      spin.current.rotation.y += dt * 0.12
    }
    if (tilt.current && !reduced) {
      tilt.current.rotation.x = THREE.MathUtils.lerp(
        tilt.current.rotation.x,
        state.pointer.y * -0.05,
        0.04,
      )
      tilt.current.rotation.y = THREE.MathUtils.lerp(
        tilt.current.rotation.y,
        state.pointer.x * 0.12,
        0.04,
      )
    }
  })

  return (
    <group ref={tilt} position={[1.05, 0.45, 0]} scale={0.42}>
      <group ref={spin} rotation={[0, Math.PI / 7, 0]}>
        <Maquette variant="veil-house" face="#edecE6" edge="#3a3b38" />
        <ContactShadows position={[0, 0, 0]} opacity={0.22} scale={11} blur={2.6} far={3.2} />
      </group>
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [7.2, 4.2, 7.4], fov: 26 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <hemisphereLight args={['#ffffff', '#c9c7bf', 0.9]} />
      <directionalLight position={[6, 9, 4]} intensity={1.5} color="#fff8ec" />
      <directionalLight position={[-6, 4, -3]} intensity={0.35} color="#dfe4ff" />
      <Suspense fallback={null}>
        <Turntable />
      </Suspense>
    </Canvas>
  )
}
