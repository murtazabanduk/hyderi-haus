// Real per-image pixel dimensions for every photo in /public/photos.
// The `-sm` variant is the 800px-wide (or smaller, for tall images) sibling.
// Where `sm` equals `full` (e.g. monument-elevation), only the full candidate
// is emitted — there is no meaningful smaller version.
const DIMS: Record<string, { full: number; sm: number; fullH: number }> = {
  'monument-aerial': { full: 1296, sm: 800, fullH: 730 },
  'monument-elevation': { full: 1296, sm: 1296, fullH: 306 },
  'monument-views': { full: 1296, sm: 800, fullH: 722 },
  'monument-sketch': { full: 1496, sm: 800, fullH: 838 },
  'monument-sketches': { full: 1600, sm: 800, fullH: 1565 },
  'f1-full': { full: 1086, sm: 600, fullH: 1448 },
  'f1-entrance': { full: 1402, sm: 800, fullH: 1122 },
  'f1-sheet': { full: 1402, sm: 800, fullH: 1122 },
  'f1-terraces': { full: 1402, sm: 800, fullH: 1122 },
  'hospital-aerial': { full: 1600, sm: 800, fullH: 959 },
  'hospital-roof': { full: 1600, sm: 800, fullH: 872 },
  'campus-brick': { full: 1408, sm: 800, fullH: 685 },
  'tower-margalla': { full: 896, sm: 654, fullH: 1096 },
  'villa-crest': { full: 1308, sm: 800, fullH: 1203 },
  'villa-terrace': { full: 1313, sm: 800, fullH: 1198 },
  'villa-brick': { full: 1321, sm: 800, fullH: 1191 },
  'villa-details': { full: 1329, sm: 800, fullH: 1183 },
  'interior-bath-1': { full: 1325, sm: 800, fullH: 681 },
  'interior-bath-2': { full: 1161, sm: 800, fullH: 777 },
  'poster-brutalist': { full: 1086, sm: 600, fullH: 1448 },
  'poster-massive': { full: 1086, sm: 600, fullH: 1448 },
  'certificate': { full: 1248, sm: 800, fullH: 832 },
  'certificate-iapex26': { full: 1096, sm: 800, fullH: 792 },
  'certificate-ndma-dawe': { full: 1123, sm: 800, fullH: 793 },
  'logo': { full: 1254, sm: 800, fullH: 1254 },
}

export type Dims = { fullW: number; smW: number; hasSm: boolean; fullH: number }

/** Resolve the full/sm pixel widths + full height for a photo path like `/photos/monument-aerial.jpg`. */
export function dimsFor(src: string): Dims {
  const base = src.replace(/^\/photos\//, '').replace(/\.jpg$/, '')
  const d = DIMS[base] ?? { full: 1600, sm: 800, fullH: 1200 }
  return { fullW: d.full, smW: d.sm, hasSm: d.full !== d.sm, fullH: d.fullH }
}
