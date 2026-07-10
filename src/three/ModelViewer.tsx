// The maquette room — a dark museum space with the project model on a
// plinth. Orbit with the pointer; the image softens while the camera
// moves and pulls back into focus at rest.

import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { DepthOfField, EffectComposer, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import type { DepthOfFieldEffect } from 'postprocessing'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import Maquette from './Maquette'
import type { Project } from '../data/projects'

function FocusEffects() {
  const dof = useRef<DepthOfFieldEffect>(null)
  const { camera } = useThree()
  const prev = useRef(camera.position.clone())
  const blur = useRef(0)

  useFrame((_, dt) => {
    const dist = camera.position.distanceTo(prev.current)
    prev.current.copy(camera.position)
    const speed = dist / Math.max(dt, 1e-4)
    const target = THREE.MathUtils.clamp(speed * 0.55, 0, 1)
    // sharpen slowly, blur quickly — feels like a lens hunting for focus
    const k = target > blur.current ? 0.18 : 0.05
    blur.current += (target - blur.current) * k
    const e = dof.current
    if (e) {
      e.bokehScale = 1.2 + blur.current * 9
    }
  })

  return (
    <EffectComposer multisampling={2}>
      <DepthOfField ref={dof} target={[0, 1, 0]} focalLength={0.06} focusRange={0.008} bokehScale={1.2} />
      <Vignette eskil={false} offset={0.26} darkness={0.62} />
    </EffectComposer>
  )
}

type Vec3 = [number, number, number]
const DEFAULT_CAMERA: Vec3 = [6.6, 3.4, 6.8]
const SHOWCASE_START_CAMERA: Vec3 = [9.45, 4.44, 9.74]

/** Only on the showcase project: camera starts pulled back and dollies in to
 * the standard framing over ~1.5s, then hands off to normal orbit controls. */
function IntroDolly({ active }: { active: boolean }) {
  const { camera } = useThree()
  const done = useRef(false)

  useFrame((_, dt) => {
    if (!active || done.current) return
    camera.position.x = THREE.MathUtils.damp(camera.position.x, DEFAULT_CAMERA[0], 2.2, dt)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, DEFAULT_CAMERA[1], 2.2, dt)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, DEFAULT_CAMERA[2], 2.2, dt)
    if (
      Math.abs(camera.position.x - DEFAULT_CAMERA[0]) < 0.01 &&
      Math.abs(camera.position.z - DEFAULT_CAMERA[2]) < 0.01
    ) {
      done.current = true
    }
  })

  return null
}

function Controls({ showcase = false }: { showcase?: boolean }) {
  const ref = useRef<OrbitControlsImpl>(null)
  const interacting = useRef(false)
  const idle = useRef(0)

  useFrame((_, dt) => {
    const c = ref.current
    if (!c) return
    idle.current = interacting.current ? 0 : idle.current + dt
    c.autoRotate = idle.current > 3.5
    c.update()
  })

  return (
    <OrbitControls
      ref={ref}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      enablePan={false}
      autoRotateSpeed={0.55}
      minDistance={4.5}
      maxDistance={showcase ? 15 : 11.5}
      minPolarAngle={0.15}
      maxPolarAngle={1.42}
      target={[0, 1, 0]}
      onStart={() => {
        interacting.current = true
      }}
      onEnd={() => {
        interacting.current = false
      }}
    />
  )
}

function Room({ project }: { project: Project }) {
  return (
    <>
      <hemisphereLight args={['#e9eaec', '#3a3b40', 0.55]} />
      <directionalLight
        position={[6, 8, 4]}
        intensity={1.7}
        color="#fff6e8"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
      />
      <directionalLight position={[-6, 3.5, -4]} intensity={0.4} color="#aab4ff" />

      {/* floor + plinth */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.71, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#141519" roughness={1} />
      </mesh>
      <mesh position={[0, -0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.4, 0.7, 6.4]} />
        <meshStandardMaterial color="#212228" roughness={0.85} />
      </mesh>

      <Maquette variant={project.slug} model={project.model} />
      <ContactShadows position={[0, 0.01, 0]} opacity={0.5} scale={11} blur={2.2} far={3.4} />
      {project.showcase && <Environment preset="city" />}
    </>
  )
}

export default function ModelViewer({ project }: { project: Project }) {
  const [touched, setTouched] = useState(false)
  const showcase = project.showcase === true

  return (
    <div className="viewer-wrap" onPointerDown={() => setTouched(true)}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: showcase ? SHOWCASE_START_CAMERA : DEFAULT_CAMERA, fov: 30 }}
      >
        <color attach="background" args={['#121316']} />
        <Suspense fallback={null}>
          <Room project={project} />
          <FocusEffects />
          {showcase && <IntroDolly active={!touched} />}
        </Suspense>
        <Controls showcase={showcase} />
      </Canvas>
      <div className={'viewer-hint' + (touched ? ' hide' : '')} aria-hidden="true">
        <span className="dot" />
        Drag to orbit · scroll to zoom
      </div>
    </div>
  )
}
