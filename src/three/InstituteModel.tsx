// The Fold Institute — the showcase maquette. Built from two techniques not
// used elsewhere in Maquette.tsx: an extruded trapezoid profile for the
// outward-leaning concrete "fin" walls, and hand-authored flat polygons for
// the folded-plate roof, so the roof reads as creased rather than gabled.

import { useMemo, type ReactNode } from 'react'
import * as THREE from 'three'
import { Edges } from '@react-three/drei'

type Vec3 = [number, number, number]

function useConcrete(color: string) {
  // Double-sided: the roof/fin panels are hand-authored ExtrudeGeometry and a
  // winding-order slip would otherwise cull a facet from certain angles.
  return useMemo(
    () => new THREE.MeshStandardMaterial({ color, roughness: 0.94, metalness: 0.02, side: THREE.DoubleSide }),
    [color],
  )
}

/** A wall panel that leans outward as it rises — wide/set-back at the base,
 *  narrow/forward at the top. Profile (thickness × height) is extruded
 *  along Z to give the panel its facade width. */
function Fin({
  p,
  rotY = 0,
  width = 2.0,
  height = 1.7,
  baseDepth = 0.34,
  topDepth = 0.14,
  lean = 0.36,
  material,
  edge,
}: {
  p: Vec3
  rotY?: number
  width?: number
  height?: number
  baseDepth?: number
  topDepth?: number
  lean?: number
  material: THREE.Material
  edge: string
}) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    shape.lineTo(baseDepth, 0)
    shape.lineTo(lean + topDepth, height)
    shape.lineTo(lean, height)
    shape.closePath()
    const geo = new THREE.ExtrudeGeometry(shape, { depth: width, bevelEnabled: false })
    geo.translate(-baseDepth / 2, 0, -width / 2)
    geo.computeVertexNormals()
    return geo
  }, [width, height, baseDepth, topDepth, lean])

  return (
    <group position={p} rotation={[0, rotY, 0]}>
      <mesh geometry={geometry} material={material} castShadow receiveShadow>
        <Edges color={edge} threshold={18} />
      </mesh>
    </group>
  )
}

/** One flat facet of the folded roof — an irregular quad, angled and offset
 *  to sit as a crease against its neighbours. */
function RoofPanel({
  pts,
  p,
  tilt,
  thickness = 0.09,
  material,
  edge,
}: {
  pts: [number, number][]
  p: Vec3
  tilt: Vec3
  thickness?: number
  material: THREE.Material
  edge: string
}) {
  const geometry = useMemo(() => {
    // rotateX(-90°) maps local (x, y, z) -> world (x, z, -y), so the shape's
    // y-coordinate must be pre-negated for pts[i][1] to land at the intended
    // world Z (otherwise the whole roof mirrors front-to-back).
    const shape = new THREE.Shape()
    shape.moveTo(pts[0][0], -pts[0][1])
    for (let i = 1; i < pts.length; i++) shape.lineTo(pts[i][0], -pts[i][1])
    shape.closePath()
    const geo = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false })
    geo.rotateX(-Math.PI / 2)
    geo.computeVertexNormals()
    return geo
  }, [pts, thickness])

  return (
    <mesh position={p} rotation={tilt} geometry={geometry} material={material} castShadow receiveShadow>
      <Edges color={edge} threshold={12} />
    </mesh>
  )
}

/** A glazed bay: dark tinted glass with a mullion grid, recessed under the roof. */
function GlassBay({
  p,
  width,
  height,
  cols = 4,
  rows = 3,
  glass,
  mullion,
}: {
  p: Vec3
  width: number
  height: number
  cols?: number
  rows?: number
  glass: THREE.Material
  mullion: THREE.Material
}) {
  const bars: ReactNode[] = []
  for (let i = 0; i <= cols; i++) {
    const x = -width / 2 + (i / cols) * width
    bars.push(
      <mesh key={`v${i}`} position={[x, height / 2, 0]} material={mullion}>
        <boxGeometry args={[0.028, height, 0.05]} />
      </mesh>,
    )
  }
  for (let j = 0; j <= rows; j++) {
    const y = (j / rows) * height
    bars.push(
      <mesh key={`h${j}`} position={[0, y, 0]} material={mullion}>
        <boxGeometry args={[width, 0.028, 0.05]} />
      </mesh>,
    )
  }
  return (
    <group position={p}>
      <mesh position={[0, height / 2, 0]} material={glass}>
        <planeGeometry args={[width, height]} />
      </mesh>
      {bars}
    </group>
  )
}

export default function InstituteModel({ face = '#e3e0d6', edge = '#5c5a54' }: { face?: string; edge?: string }) {
  const concrete = useConcrete(face)
  const glass = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#16222f',
        transparent: true,
        opacity: 0.38,
        roughness: 0.08,
        metalness: 0.35,
        side: THREE.DoubleSide,
      }),
    [],
  )
  const mullion = useMemo(() => new THREE.MeshStandardMaterial({ color: '#22242a', roughness: 0.4, metalness: 0.5 }), [])
  const stone = useMemo(() => new THREE.MeshStandardMaterial({ color: '#c9c5b8', roughness: 0.96 }), [])

  return (
    <group scale={0.62}>
      {/* stepped plinth, rising toward the entrance */}
      <mesh position={[0.1, 0.06, 0.1]} material={stone} receiveShadow castShadow>
        <boxGeometry args={[7.0, 0.12, 4.7]} />
        <Edges color={edge} threshold={20} />
      </mesh>
      <mesh position={[0.1, 0.16, 0.35]} material={stone} receiveShadow castShadow>
        <boxGeometry args={[5.6, 0.1, 3.9]} />
        <Edges color={edge} threshold={20} />
      </mesh>

      {/* --- left wing --- */}
      <Fin p={[-3.05, 0.2, 1.15]} rotY={0.22} width={1.85} height={1.55} lean={0.34} material={concrete} edge={edge} />
      <Fin p={[-1.55, 0.2, 1.15]} rotY={-0.16} width={1.85} height={1.55} lean={-0.3} material={concrete} edge={edge} />
      <GlassBay p={[-2.3, 0.2, 1.02]} width={1.55} height={1.42} cols={3} rows={3} glass={glass} mullion={mullion} />
      <mesh position={[-2.3, 0.78, -0.35]} material={concrete} castShadow receiveShadow>
        <boxGeometry args={[2.7, 1.5, 1.55]} />
        <Edges color={edge} threshold={20} />
      </mesh>

      {/* --- centre wing (entrance) --- */}
      <Fin p={[-0.75, 0.2, 1.5]} rotY={0.26} width={2.0} height={1.98} lean={0.4} material={concrete} edge={edge} />
      <Fin p={[0.95, 0.2, 1.5]} rotY={-0.26} width={2.0} height={1.98} lean={-0.4} material={concrete} edge={edge} />
      <GlassBay p={[0.1, 0.2, 1.32]} width={1.6} height={1.86} cols={3} rows={4} glass={glass} mullion={mullion} />
      <mesh position={[0.1, 0.98, -0.25]} material={concrete} castShadow receiveShadow>
        <boxGeometry args={[3.0, 1.9, 1.9]} />
        <Edges color={edge} threshold={20} />
      </mesh>

      {/* --- right wing --- */}
      <Fin p={[2.05, 0.2, 1.05]} rotY={0.18} width={1.7} height={1.4} lean={0.3} material={concrete} edge={edge} />
      <Fin p={[3.35, 0.2, 1.05]} rotY={-0.2} width={1.7} height={1.4} lean={-0.32} material={concrete} edge={edge} />
      <GlassBay p={[2.7, 0.2, 0.92]} width={1.4} height={1.28} cols={2} rows={3} glass={glass} mullion={mullion} />
      <mesh position={[2.7, 0.68, -0.6]} material={concrete} castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.3, 1.4]} />
        <Edges color={edge} threshold={20} />
      </mesh>

      {/* --- folded roof plate — five facets creasing across the three wings --- */}
      <RoofPanel
        pts={[
          [-4.0, -1.7],
          [-1.5, -1.85],
          [-1.25, 2.15],
          [-4.1, 1.95],
        ]}
        p={[0, 1.98, 0.1]}
        tilt={[0.045, 0, 0.09]}
        material={concrete}
        edge={edge}
      />
      <RoofPanel
        pts={[
          [-1.5, -1.85],
          [0.4, -2.0],
          [0.55, 2.28],
          [-1.25, 2.15],
        ]}
        p={[0, 2.28, 0.05]}
        tilt={[0.03, 0, -0.055]}
        material={concrete}
        edge={edge}
      />
      <RoofPanel
        pts={[
          [0.4, -2.0],
          [1.9, -1.9],
          [1.95, 2.2],
          [0.55, 2.28],
        ]}
        p={[0, 2.48, 0]}
        tilt={[0.04, 0, 0.06]}
        material={concrete}
        edge={edge}
      />
      <RoofPanel
        pts={[
          [1.9, -1.9],
          [4.15, -1.55],
          [4.25, 1.75],
          [1.95, 2.2],
        ]}
        p={[0, 2.18, -0.05]}
        tilt={[0.035, 0, -0.075]}
        material={concrete}
        edge={edge}
      />
      <RoofPanel
        pts={[
          [-4.1, 1.95],
          [-1.25, 2.15],
          [0.55, 2.28],
          [1.95, 2.2],
          [4.25, 1.75],
          [4.1, 2.55],
          [-4.0, 2.35],
        ]}
        p={[0, 2.05, 0.35]}
        tilt={[-0.32, 0, 0]}
        material={concrete}
        edge={edge}
      />
    </group>
  )
}
