// ---------------------------------------------------------------------------
// Axonometric line drawings, generated in code — one per project.
// These stand in for photography until real renders arrive, and stay useful
// afterwards as drawing-set illustrations.
// ---------------------------------------------------------------------------

import type { ReactNode } from 'react'

const SX = Math.cos(Math.PI / 6)
const SY = Math.sin(Math.PI / 6)

const TOP = '#faf9f6'
const RIGHT = '#e7e5de'
const LEFT = '#dad8cf'
const INK = '#17181a'
const BLUE = '#2b45d8'

type P = [number, number]
type O = { s: number; ox: number; oy: number }

function pj(o: O, x: number, y: number, z: number): P {
  return [o.ox + (x - y) * SX * o.s, o.oy + (x + y) * SY * o.s - z * o.s]
}

function poly(pts: P[]) {
  return pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
}

function rect(cx: number, cy: number, w: number, d: number, rot = 0): [number, number][] {
  const c = Math.cos((rot * Math.PI) / 180)
  const s = Math.sin((rot * Math.PI) / 180)
  const base: [number, number][] = [
    [-w / 2, -d / 2],
    [w / 2, -d / 2],
    [w / 2, d / 2],
    [-w / 2, d / 2],
  ]
  return base.map(([x, y]) => [cx + x * c - y * s, cy + x * s + y * c])
}

/** An extruded prism from CCW plan corners. Draws visible side faces + top. */
function Prism({
  o,
  corners,
  z,
  h,
  topFill = TOP,
}: {
  o: O
  corners: [number, number][]
  z: number
  h: number
  topFill?: string
}) {
  const faces: { pts: P[]; fill: string; depth: number }[] = []
  for (let i = 0; i < corners.length; i++) {
    const a = corners[i]
    const b = corners[(i + 1) % corners.length]
    const n: [number, number] = [b[1] - a[1], -(b[0] - a[0])]
    if (n[0] + n[1] > 1e-6) {
      faces.push({
        pts: [pj(o, a[0], a[1], z), pj(o, b[0], b[1], z), pj(o, b[0], b[1], z + h), pj(o, a[0], a[1], z + h)],
        fill: n[0] >= n[1] ? RIGHT : LEFT,
        depth: (a[0] + a[1] + b[0] + b[1]) / 2,
      })
    }
  }
  faces.sort((p, q) => p.depth - q.depth)
  const top = corners.map(([x, y]) => pj(o, x, y, z + h))
  return (
    <g stroke={INK} strokeWidth="0.9" strokeLinejoin="round">
      {faces.map((f, i) => (
        <polygon key={i} points={poly(f.pts)} fill={f.fill} />
      ))}
      <polygon points={poly(top)} fill={topFill} />
    </g>
  )
}

function Box({
  o,
  x,
  y,
  z,
  w,
  d,
  h,
  rot = 0,
  topFill,
}: {
  o: O
  x: number
  y: number
  z: number
  w: number
  d: number
  h: number
  rot?: number
  topFill?: string
}) {
  return <Prism o={o} corners={rect(x, y, w, d, rot)} z={z} h={h} topFill={topFill} />
}

/** Blueprint-blue dimension line between two screen points. */
function Dim({ a, b, label }: { a: P; b: P; label: string }) {
  const mx = (a[0] + b[0]) / 2
  const my = (a[1] + b[1]) / 2
  return (
    <g stroke={BLUE} strokeWidth="0.8" fill="none">
      <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
      <line x1={a[0]} y1={a[1] - 4} x2={a[0]} y2={a[1] + 4} />
      <line x1={b[0]} y1={b[1] - 4} x2={b[0]} y2={b[1] + 4} />
      <text
        x={mx}
        y={my - 6}
        textAnchor="middle"
        fill={BLUE}
        stroke="none"
        fontSize="9"
        letterSpacing="0.08em"
        fontFamily="Spline Sans Mono, monospace"
      >
        {label}
      </text>
    </g>
  )
}

/* --- compositions -------------------------------------------------------- */

function VeilHouse() {
  const o: O = { s: 34, ox: 230, oy: 96 }
  const fins: ReactNode[] = []
  for (let i = 0; i < 14; i++) {
    const x = -2.6 + 0.4 * i
    fins.push(<Box key={i} o={o} x={x} y={3.7} z={0.3} w={0.16} d={0.16} h={2.1} />)
  }
  return (
    <g>
      <Box o={o} x={0} y={2} z={0} w={6.4} d={4.4} h={0.3} />
      <Box o={o} x={0} y={0.9} z={0.3} w={6} d={1.7} h={2.0} />
      <Box o={o} x={-2.4} y={2.6} z={0.3} w={1.2} d={1.6} h={1.1} />
      <Box o={o} x={0} y={0.9} z={2.3} w={6.3} d={2.0} h={0.14} />
      {fins}
      <Box o={o} x={-0.1} y={3.7} z={2.4} w={5.4} d={0.22} h={0.12} />
      <Dim a={pj(o, -3.2, 4.4, -0.5)} b={pj(o, 3.2, 4.4, -0.5)} label="24.0 M" />
    </g>
  )
}

function TerraceTower() {
  const o: O = { s: 30, ox: 230, oy: 118 }
  const floors: ReactNode[] = []
  for (let i = 0; i < 7; i++) {
    const d = 3.0 - i * 0.28
    const cy = 1.7 - i * 0.28 - d / 2 + 1.3
    const z = 0.4 + i * 0.62
    floors.push(<Box key={`f${i}`} o={o} x={0} y={cy} z={z} w={4.4 - i * 0.1} d={d} h={0.5} />)
    floors.push(
      <Box key={`p${i}`} o={o} x={0} y={cy + 0.12} z={z + 0.5} w={4.7 - i * 0.1} d={d + 0.24} h={0.1} />,
    )
  }
  return (
    <g>
      <Box o={o} x={0} y={1.5} z={0} w={5.2} d={3.8} h={0.4} />
      {floors}
      <Box o={o} x={0} y={0.35} z={0.4} w={1.4} d={0.7} h={4.7} />
      <Dim a={pj(o, -2.6, 3.7, -1.0)} b={pj(o, 2.6, 3.7, -1.0)} label="G+7 · STEPPED SECTION" />
    </g>
  )
}

function FoldInstitute() {
  const o: O = { s: 27, ox: 224, oy: 116 }
  return (
    <g>
      {/* stepped plinth */}
      <Box o={o} x={0} y={0.6} z={0} w={7.6} d={5.4} h={0.16} />
      <Box o={o} x={0} y={0.6} z={0.16} w={7.0} d={4.9} h={0.12} />
      {/* three wings, staggered */}
      <Box o={o} x={-2.5} y={0.2} z={0.28} w={2.3} d={2.6} h={1.5} />
      <Box o={o} x={0.1} y={0.7} z={0.28} w={2.5} d={3.2} h={1.9} />
      <Box o={o} x={2.6} y={1.2} z={0.28} w={2.2} d={2.4} h={1.4} />
      {/* folded roof: five facets at shifting pitches, sharing rough ridge lines */}
      <Box o={o} x={-2.6} y={0.3} z={1.86} w={2.9} d={2.9} h={0.1} rot={-4} />
      <Box o={o} x={-0.6} y={0.85} z={2.02} w={2.7} d={3.3} h={0.1} rot={3} />
      <Box o={o} x={1.3} y={1.3} z={2.24} w={2.6} d={2.7} h={0.1} rot={-2.5} />
      <Box o={o} x={3.1} y={1.65} z={2.4} w={2.3} d={2.5} h={0.1} rot={4} />
      <Box o={o} x={0.2} y={1.0} z={2.5} w={7.6} d={0.5} h={0.07} />
      <Dim a={pj(o, -3.9, 5.0, -0.55)} b={pj(o, 3.9, 5.0, -0.55)} label="ONE ROOF · THREE WINGS" />
    </g>
  )
}

function KilnGallery() {
  const o: O = { s: 34, ox: 224, oy: 122 }
  const bars = [
    { cy: 0.7, len: 5.6 },
    { cy: 1.9, len: 4.6 },
    { cy: 3.1, len: 3.8 },
  ]
  return (
    <g>
      <Box o={o} x={0} y={1.9} z={0} w={6.6} d={4.6} h={0.24} />
      {bars.map((b, i) => {
        const cx = -3 + b.len / 2
        const springZ = 0.24 + 0.9
        const r = 0.62
        const y0 = b.cy - 0.62
        const y1 = b.cy + 0.62
        const nearX = cx + b.len / 2
        const farX = cx - b.len / 2
        const nA = pj(o, nearX, y0, springZ)
        const nApex = pj(o, nearX, b.cy, springZ + r)
        const nB = pj(o, nearX, y1, springZ)
        const fA = pj(o, farX, y0, springZ)
        const fApex = pj(o, farX, b.cy, springZ + r)
        const fB = pj(o, farX, y1, springZ)
        const cN0 = pj(o, nearX, y0, springZ + r)
        const cN1 = pj(o, nearX, y1, springZ + r)
        const cF0 = pj(o, farX, y0, springZ + r)
        const cF1 = pj(o, farX, y1, springZ + r)
        const nBase0 = pj(o, nearX, y0, 0.24)
        const nBase1 = pj(o, nearX, y1, 0.24)
        return (
          <g key={i} stroke={INK} strokeWidth="0.9" strokeLinejoin="round">
            <Box o={o} x={cx} y={b.cy} z={0.24} w={b.len} d={1.24} h={0.9} />
            {/* vault roof sheet */}
            <path
              d={`M ${nA[0]},${nA[1]} Q ${cN0[0]},${cN0[1]} ${nApex[0]},${nApex[1]} Q ${cN1[0]},${cN1[1]} ${nB[0]},${nB[1]} L ${fB[0]},${fB[1]} Q ${cF1[0]},${cF1[1]} ${fApex[0]},${fApex[1]} Q ${cF0[0]},${cF0[1]} ${fA[0]},${fA[1]} Z`}
              fill={TOP}
            />
            {/* near end arch face */}
            <path
              d={`M ${nA[0]},${nA[1]} Q ${cN0[0]},${cN0[1]} ${nApex[0]},${nApex[1]} Q ${cN1[0]},${cN1[1]} ${nB[0]},${nB[1]} L ${nBase1[0]},${nBase1[1]} L ${nBase0[0]},${nBase0[1]} Z`}
              fill={RIGHT}
            />
            <line x1={nApex[0]} y1={nApex[1]} x2={fApex[0]} y2={fApex[1]} />
          </g>
        )
      })}
      <Dim a={pj(o, -3.3, 4.4, -0.9)} b={pj(o, 1.4, 4.4, -0.9)} label="THREE VAULTS · N-LIGHT" />
    </g>
  )
}

function StackHouse() {
  const o: O = { s: 40, ox: 230, oy: 122 }
  return (
    <g>
      <Box o={o} x={0} y={0} z={0} w={3.4} d={3.4} h={0.24} />
      <Box o={o} x={0} y={0} z={0.24} w={2.7} d={2.5} h={1.15} />
      <Box o={o} x={0} y={0} z={1.39} w={3.1} d={2.9} h={0.1} rot={12} />
      <Box o={o} x={0.08} y={-0.06} z={1.49} w={2.5} d={2.7} h={1.15} rot={12} />
      <Box o={o} x={0} y={0} z={2.64} w={3.0} d={2.8} h={0.1} rot={-9} />
      <Box o={o} x={-0.06} y={0.05} z={2.74} w={2.7} d={2.3} h={1.1} rot={-9} />
      <Dim a={pj(o, -1.7, 1.9, -0.35)} b={pj(o, 1.7, 1.9, -0.35)} label="9.0 M PLOT" />
    </g>
  )
}

function StepwellMuseum() {
  const o: O = { s: 30, ox: 230, oy: 108 }
  const ring = (outer: number, t: number, z: number, h: number, key: string) => (
    <g key={key}>
      <Box o={o} x={0} y={-(outer - t) / 2} z={z} w={outer} d={t} h={h} />
      <Box o={o} x={-(outer - t) / 2} y={0} z={z} w={t} d={outer - 2 * t} h={h} />
      <Box o={o} x={(outer - t) / 2} y={0} z={z} w={t} d={outer - 2 * t} h={h} />
      <Box o={o} x={0} y={(outer - t) / 2} z={z} w={outer} d={t} h={h} />
    </g>
  )
  return (
    <g>
      <Box o={o} x={0} y={0} z={0} w={6.6} d={6.6} h={0.24} />
      {ring(5.6, 0.85, 0.24, 1.1, 'r1')}
      {ring(3.9, 0.7, 0.24, 0.74, 'r2')}
      {ring(2.5, 0.55, 0.24, 0.4, 'r3')}
      {/* water court */}
      <Box o={o} x={0} y={0} z={0.24} w={1.4} d={1.4} h={0.06} topFill="#c9d2f0" />
      <Dim a={pj(o, -2.8, 3.6, -0.5)} b={pj(o, 2.8, 3.6, -0.5)} label="DESCENDING COURT · −3 LVL" />
    </g>
  )
}

const drawings: Record<string, () => ReactNode> = {
  'veil-house': VeilHouse,
  'terrace-tower': TerraceTower,
  'fold-institute': FoldInstitute,
  'kiln-gallery': KilnGallery,
  'stack-house': StackHouse,
  'stepwell-museum': StepwellMuseum,
}

export default function ProjectDrawing({ slug, title }: { slug: string; title?: string }) {
  const D = drawings[slug]
  return (
    <svg
      viewBox="0 0 460 340"
      role="img"
      aria-label={title ? `Axonometric drawing — ${title}` : 'Axonometric drawing'}
    >
      {D ? D() : null}
    </svg>
  )
}
