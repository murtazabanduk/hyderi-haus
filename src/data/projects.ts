// ---------------------------------------------------------------------------
// Project index. Each entry drives its card, its drawing, its detail page and
// its 3D maquette.
//
// To use a real 3D render instead of the built-in procedural maquette:
//   1. Export the model as .glb and drop it in  public/models/<slug>.glb
//   2. Set  model: '/models/<slug>.glb'  on the project below.
// To add photography / renders:
//   drop images in  public/images/<slug>/  and list them under  images: [...]
// ---------------------------------------------------------------------------

export type Project = {
  slug: string
  index: string
  name: string
  typology: 'Residential' | 'Commercial' | 'Cultural' | 'Public'
  location: string
  year: string
  status: 'Completed' | 'Under construction' | 'In design' | 'Competition'
  area: string
  client: string
  summary: string
  body: string[]
  materials: string[]
  /** Optional path to a .glb file in /public. Falls back to procedural maquette. */
  model?: string
  /** Optional image paths in /public. */
  images?: string[]
  featured: boolean
  /** Marks the one flagship project with the full 3D showcase treatment. */
  showcase?: boolean
}

export const projects: Project[] = [
  {
    slug: 'veil-house',
    index: 'PRJ-01',
    name: 'The Veil House',
    typology: 'Residential',
    location: 'Alibaug, Maharashtra',
    year: '2023',
    status: 'Completed',
    area: '680 m²',
    client: 'Private',
    summary:
      'A weekend house wrapped in a perforated brick veil — closed to the road, open to a shaded court.',
    body: [
      'The site faces a busy approach road on the west and a mango orchard on the east. The house resolves this in one move: a two-storey brick screen runs the full length of the street edge, and everything private happens behind it. The screen is laid in a stack bond with every third brick omitted, so the wall reads as solid by day and as a lantern by night.',
      'Behind the veil, rooms are arranged around a court that stays in shade from ten in the morning. The court floor is rough Kota stone that cools under monsoon rain; the family reports that the court, not the living room, is where guests end up.',
    ],
    materials: ['Perforated brick screen, stack bond', 'Kota stone flooring', 'Exposed RCC frame', 'Reclaimed teak shutters'],
    featured: true,
  },
  {
    slug: 'terrace-tower',
    index: 'PRJ-02',
    name: 'Terrace Tower',
    typology: 'Commercial',
    location: 'Baner, Pune',
    year: '2024',
    status: 'Under construction',
    area: '12,400 m²',
    client: 'Mirae Developments',
    summary:
      'A mixed-use mid-rise that steps back floor by floor, trading rentable area for planted terraces on every level.',
    body: [
      'The brief asked for the maximum permissible envelope. The studio argued for one degree less: each office floor steps back 1.8 metres from the one below, and the surrendered strip becomes a continuous planted terrace. Every tenancy gets an outdoor room; the building gets a section that shades itself.',
      'The stepped form does structural work too — columns transfer along the setback line, keeping office plates clear-span. Retail holds the street edge under a double-height colonnade.',
    ],
    materials: ['Board-marked concrete', 'Planted setback terraces', 'Anodised aluminium screens', 'Clear-span PT slabs'],
    featured: true,
  },
  {
    slug: 'fold-institute',
    index: 'PRJ-03',
    name: 'The Fold Institute',
    typology: 'Cultural',
    location: 'Mahabaleshwar, Maharashtra',
    year: '2023',
    status: 'Completed',
    area: '6,800 m²',
    client: 'Sahyadri Research Trust',
    summary:
      'A research and exhibition campus roofed in a single origami-folded concrete plate — three wings under one broken sky.',
    body: [
      'The brief was a valley-floor campus for a trust that studies the Western Ghats: labs, an archive and a public gallery, none of which wanted to compete with the hills behind them. The studio\'s answer was to stop building walls and start folding a roof — one continuous plate, creased along diagonals like a sheet of dropped paper, that shelters all three wings and reads from the ridge above as a single fifth elevation.',
      'Under the folds, the walls do the opposite of the roof: they lean outward from the base, board-formed in narrow bays that read as concrete fins from the drive but open into full-height glass the moment you\'re past the treeline. Every crease in the roof throws a different shadow through the glass, so the deepest labs — the ones with no windows of their own — still know the hour and the weather from the light alone.',
      'The building is entered up a full-width flight of stepped plinth, so the first view of the valley is held back until you\'re standing under the roof\'s widest cantilever, looking out from the shade it makes.',
    ],
    materials: [
      'Folded RCC roof plate, post-tensioned',
      'Board-formed concrete fin walls, outward batter',
      'Full-height curtain glazing, dark anodised mullions',
      'Cast stone plinth and stepped entry',
    ],
    featured: true,
    showcase: true,
  },
  {
    slug: 'kiln-gallery',
    index: 'PRJ-04',
    name: 'Kiln Gallery',
    typology: 'Cultural',
    location: 'Vadodara, Gujarat',
    year: '2021',
    status: 'Completed',
    area: '950 m²',
    client: 'Sarabhai Arts Trust',
    summary:
      'Three vaulted brick bars for a private art collection — daylight bounced twice before it touches a canvas.',
    body: [
      'The collection is mostly works on paper, which rules out direct light. The gallery answers with three parallel brick vaults of different lengths, each lit by a north slot at the springing line. Light hits the vault, then the floor, then the work — twice bounced, halved in intensity, and utterly even.',
      'The vaults are true structural masonry, built by a team of bricklayers from Bharuch over eleven months. The building has no applied finishes; the maintenance manual is one page.',
    ],
    materials: ['Structural brick vaults', 'North-light slots', 'Lime-washed interiors', 'IPS floor with brass strips'],
    featured: true,
  },
  {
    slug: 'stack-house',
    index: 'PRJ-05',
    name: 'Stack House',
    typology: 'Residential',
    location: 'Bandra, Mumbai',
    year: '2024',
    status: 'In design',
    area: '310 m²',
    client: 'Private',
    summary:
      'Three rooms stacked and rotated on a 9-metre plot — each floor turns toward its own view and away from its neighbour.',
    body: [
      'A city plot with buildings on three sides and one good tree. The house stacks three volumes and rotates each a few degrees: the lower floor faces the lane, the middle floor faces the tree, the upper floor faces the sky. The rotations open triangular slots of terrace at every level — small, but in Bandra a triangle of outdoors is wealth.',
      'The structure is a single central core; floors cantilever from it, which frees every corner for glass or garden.',
    ],
    materials: ['Central RCC core', 'Cantilevered plates', 'Micro-terracing at rotations', 'Perforated corten entry screen'],
    featured: false,
  },
  {
    slug: 'stepwell-museum',
    index: 'PRJ-06',
    name: 'Stepwell Museum',
    typology: 'Cultural',
    location: 'Ahmedabad, Gujarat',
    year: '2025',
    status: 'Competition',
    area: '4,200 m²',
    client: 'Competition entry',
    summary:
      'A museum that descends instead of rising — galleries step down around a sunken court, cooling as they go.',
    body: [
      'The competition asked for a landmark. The entry proposes the opposite: almost nothing above the ground plane. Galleries wrap a square court and step down three levels, borrowing the section of the region’s stepwells — every level cooler, quieter and darker than the last, ending at a water court that tempers the whole building.',
      'Visitors leave the way they came, climbing back toward daylight — the promenade is the exhibit.',
    ],
    materials: ['Excavated stepped section', 'Self-shading court', 'Evaporative water floor', 'Local sandstone cladding'],
    featured: false,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProject(slug: string | undefined) {
  return projects.find((p) => p.slug === slug)
}

export function adjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug)
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  }
}
