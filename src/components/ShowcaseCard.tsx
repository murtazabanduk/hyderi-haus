// The one portfolio card with a live 3D preview instead of a flat drawing.
// Deliberately cheap: no shadows, no postprocessing, no orbit controls (the
// whole card is a nav link) — just a slow auto-turn so it stays legible
// sitting next to five static SVG cards in the grid.

import { Suspense, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import type { Project } from '../data/projects'
import InstituteModel from '../three/InstituteModel'

function Turntable() {
  const spin = useRef<Group>(null)
  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.y += dt * 0.16
  })
  return (
    <group ref={spin} rotation={[0, Math.PI / 5, 0]}>
      <InstituteModel />
    </group>
  )
}

export default function ShowcaseCard({ project }: { project: Project }) {
  return (
    <Link to={`/work/${project.slug}`} className="card" aria-label={`${project.name} — open 3D showcase`}>
      <div className="card-fig">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [9.6, 5.5, 9.9], fov: 34 }}
          gl={{ antialias: true, alpha: true }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <hemisphereLight args={['#ffffff', '#c7c4ba', 0.95]} />
          <directionalLight position={[6, 8, 4]} intensity={1.25} color="#fff6e8" />
          <directionalLight position={[-6, 3, -4]} intensity={0.3} color="#dfe4ff" />
          <Suspense fallback={null}>
            <Turntable />
          </Suspense>
        </Canvas>
        <span className="card-cue mono">Open 3D model →</span>
      </div>
      <div className="card-meta mono">
        <span>
          {project.index} · {project.typology}
        </span>
        <span>
          {project.location.split(',')[0]} — {project.year}
        </span>
      </div>
      <div className="card-name">{project.name}</div>
    </Link>
  )
}
