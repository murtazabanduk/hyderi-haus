// ---------------------------------------------------------------------------
// Procedural "museum board" maquettes — one per project.
// If a project has a `model` path (.glb in /public/models), that file is
// rendered instead; these built forms are the placeholder sculptures.
// ---------------------------------------------------------------------------

import { useMemo, type ReactNode } from 'react'
import * as THREE from 'three'
import { Edges, useGLTF } from '@react-three/drei'
import InstituteModel from './InstituteModel'

type Vec3 = [number, number, number]

function GlbModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const obj = useMemo(() => {
    const clone = scene.clone(true)
    const box = new THREE.Box3().setFromObject(clone)
    const size = box.getSize(new THREE.Vector3())
    const scale = 4 / Math.max(size.x, size.y, size.z, 1e-4)
    clone.scale.setScalar(scale)
    const box2 = new THREE.Box3().setFromObject(clone)
    const center = box2.getCenter(new THREE.Vector3())
    clone.position.set(-center.x, -box2.min.y, -center.z)
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    return clone
  }, [scene])
  return <primitive object={obj} />
}

export default function Maquette({
  variant,
  model,
  face = '#f3f2ee',
  edge = '#7c7d81',
}: {
  variant: string
  model?: string
  face?: string
  edge?: string
}) {
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: face, roughness: 0.92, metalness: 0 }),
    [face],
  )
  const water = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#93a5dd', roughness: 0.25, metalness: 0.1 }),
    [],
  )

  const B = ({ p, s, r = 0, m = mat }: { p: Vec3; s: Vec3; r?: number; m?: THREE.Material }) => (
    <mesh position={p} rotation={[0, (r * Math.PI) / 180, 0]} material={m} castShadow receiveShadow>
      <boxGeometry args={s} />
      <Edges color={edge} threshold={20} />
    </mesh>
  )

  if (model) {
    return <GlbModel url={model} />
  }

  let parts: ReactNode = null

  switch (variant) {
    case 'veil-house': {
      const fins = []
      for (let i = 0; i < 15; i++) {
        fins.push(<B key={i} p={[-1.96 + i * 0.28, 1.1, 1.45]} s={[0.07, 1.6, 0.12]} />)
      }
      parts = (
        <>
          <B p={[0, 0.15, 0]} s={[4.6, 0.3, 3.4]} />
          <B p={[0, 1.05, -0.85]} s={[4.2, 1.5, 1.2]} />
          <B p={[-1.6, 0.7, 0.35]} s={[0.9, 0.8, 1.5]} />
          <B p={[0, 1.85, -0.85]} s={[4.45, 0.09, 1.45]} />
          <B p={[0, 0.32, 0.35]} s={[2.2, 0.05, 1.5]} />
          {fins}
          <B p={[0, 1.94, 1.45]} s={[4.1, 0.08, 0.14]} />
        </>
      )
      break
    }
    case 'terrace-tower': {
      const floors = []
      for (let i = 0; i < 7; i++) {
        const d = 2.4 - i * 0.2
        const cz = 1.35 - i * 0.2 - d / 2
        const w = 3.4 - i * 0.08
        const y = 0.5 + i * 0.5
        floors.push(<B key={`f${i}`} p={[0, y + 0.2, cz]} s={[w, 0.4, d]} />)
        floors.push(<B key={`p${i}`} p={[0, y + 0.44, cz + 0.06]} s={[w + 0.3, 0.07, d + 0.4]} />)
      }
      parts = (
        <>
          <B p={[0, 0.25, 0]} s={[3.8, 0.5, 2.8]} />
          {floors}
          <B p={[0, 2.35, -1.1]} s={[1.2, 3.7, 0.5]} />
        </>
      )
      break
    }
    case 'fold-institute': {
      parts = <InstituteModel face={face} edge={edge} />
      break
    }
    case 'kiln-gallery': {
      const bars = [
        { len: 4.2, z: -1.15 },
        { len: 3.5, z: 0 },
        { len: 2.9, z: 1.15 },
      ]
      parts = (
        <>
          <B p={[0, 0.125, 0]} s={[4.8, 0.25, 3.6]} />
          {bars.map((b, i) => {
            const cx = -2.1 + b.len / 2
            return (
              <group key={i}>
                <B p={[cx, 0.75, b.z]} s={[b.len, 1.0, 1.0]} />
                <mesh
                  position={[cx, 1.25, b.z]}
                  rotation={[0, 0, Math.PI / 2]}
                  material={mat}
                  castShadow
                  receiveShadow
                >
                  <cylinderGeometry args={[0.5, 0.5, b.len, 24, 1, false, 0, Math.PI]} />
                  <Edges color={edge} threshold={30} />
                </mesh>
              </group>
            )
          })}
        </>
      )
      break
    }
    case 'stack-house': {
      parts = (
        <>
          <B p={[0, 0.125, 0]} s={[3.2, 0.25, 3.2]} />
          <B p={[0, 0.75, 0]} s={[2.6, 1.0, 2.4]} />
          <B p={[0, 1.29, 0]} s={[2.9, 0.08, 2.7]} r={12} />
          <B p={[0.08, 1.83, -0.05]} s={[2.4, 1.0, 2.6]} r={12} />
          <B p={[0, 2.37, 0]} s={[2.8, 0.08, 2.6]} r={-9} />
          <B p={[-0.06, 2.91, 0.05]} s={[2.7, 1.0, 2.2]} r={-9} />
        </>
      )
      break
    }
    case 'stepwell-museum': {
      const ring = (outer: number, t: number, h: number, key: string) => (
        <group key={key}>
          <B p={[0, 0.3 + h / 2, -(outer - t) / 2]} s={[outer, h, t]} />
          <B p={[0, 0.3 + h / 2, (outer - t) / 2]} s={[outer, h, t]} />
          <B p={[-(outer - t) / 2, 0.3 + h / 2, 0]} s={[t, h, outer - 2 * t]} />
          <B p={[(outer - t) / 2, 0.3 + h / 2, 0]} s={[t, h, outer - 2 * t]} />
        </group>
      )
      parts = (
        <>
          <B p={[0, 0.15, 0]} s={[5.4, 0.3, 5.4]} />
          {ring(4.6, 0.75, 1.05, 'r1')}
          {ring(3.2, 0.6, 0.7, 'r2')}
          {ring(2.05, 0.5, 0.38, 'r3')}
          <B p={[0, 0.33, 0]} s={[1.0, 0.06, 1.0]} m={water} />
        </>
      )
      break
    }
    default:
      parts = <B p={[0, 0.5, 0]} s={[2, 1, 2]} />
  }

  return <group>{parts}</group>
}
