// ---------------------------------------------------------------------------
// The real Hyderi Haus portfolio, built from the studio's own renders and
// drawings in /public/photos. Copy is a first draft — edit freely.
// ---------------------------------------------------------------------------

export type ProjectImage = {
  src: string
  alt: string
  caption?: string
  /** Span the full gallery width. */
  wide?: boolean
}

export type Project = {
  slug: string
  index: string
  name: string
  typology: 'Cultural' | 'Mixed-use' | 'Healthcare' | 'Urban' | 'Residential' | 'Interiors'
  location: string
  year: string
  status: string
  summary: string
  body: string[]
  materials?: string[]
  cover: string
  images: ProjectImage[]
  videos?: { src: string; caption: string }[]
  featured?: boolean
  /** The flagship project shown in the home-page zoom hero. */
  flagship?: boolean
}

export const projects: Project[] = [
  {
    slug: 'the-monument',
    index: '01',
    name: 'The Monument',
    typology: 'Cultural',
    location: 'Rawalpindi, Pakistan',
    year: '2025',
    status: 'Academic — awarded',
    summary:
      'A folded concrete landmark whose roof rises and breaks like the ridgeline behind it — sealed mass from one approach, an open lantern from the next.',
    body: [
      'Two families of walls trade places around the plan: blind board-formed concrete that holds the building shut against the road, and full-height glass that opens the halls to the park. Walking the perimeter, the Monument never shows both faces at once.',
      'The roof is a single folded plate — flat concrete facets that lift, crease and fall across the plan. The folds are not decoration: each seam is a beam, each facet a span, and daylight enters the central hall through the breaks between them.',
      'The scheme was developed as the Monument Design project in the sixth semester at the National College of Arts, Rawalpindi, where it was recognised with a certificate for excellent work.',
    ],
    materials: ['Board-formed concrete', 'Structural glass curtain wall', 'Folded concrete plate roof', 'Local stone paving'],
    cover: '/photos/monument-aerial.jpg',
    images: [
      { src: '/photos/monument-aerial.jpg', alt: 'Aerial view of the folded concrete roof of The Monument', caption: 'Aerial — the folded plate reads as a fifth elevation', wide: true },
      { src: '/photos/monument-elevation.jpg', alt: 'Ground-level south elevation with glass curtain wall between concrete fins', caption: 'South elevation — mass and lantern', wide: true },
      { src: '/photos/monument-views.jpg', alt: 'Three views of The Monument: two aerials and the entrance elevation', caption: 'Survey sheet — approach studies' },
      { src: '/photos/monument-sketch.jpg', alt: 'Hand-drawn perspective sketch of the folded roof massing', caption: 'First massing sketch' },
      { src: '/photos/monument-sketches.jpg', alt: 'A wall of concept sketches iterating the folded form', caption: 'Concept development — the fold, argued on paper', wide: true },
    ],
    videos: [
      { src: '/video/monument-fly-1.mp4', caption: 'Aerial orbit — the fold against the hills' },
      { src: '/video/monument-fly-2.mp4', caption: 'Descent to the entrance' },
    ],
    featured: true,
    flagship: true,
  },
  {
    slug: 'f1-champions-museum',
    index: '02',
    name: 'F1 Champions Museum',
    typology: 'Cultural',
    location: 'Hillside site',
    year: '2025',
    status: 'Design study',
    summary:
      'A museum of speed: planted concrete decks bank around the exhibition halls like a racing line, carrying champions’ cars up a hillside podium.',
    body: [
      'Each floor plate is drawn as a curve under load — wide at the straights, tight at the corners — so the building itself seems to be cornering. Deep cantilevered eyebrows shade continuous glass, and every parapet carries a planted verge.',
      'Visitors climb through the halls the way a lap unfolds: paddock at grade, machines on the middle decks, trophies at the summit against the view. At dusk the interior lights up and the whole section reads through the glass.',
    ],
    materials: ['Post-tensioned concrete decks', 'Curved curtain wall', 'Planted parapets', 'Raking steel props'],
    cover: '/photos/f1-full.jpg',
    images: [
      { src: '/photos/f1-full.jpg', alt: 'Full exterior view of the curved museum at golden hour with an F1 car in front' },
      { src: '/photos/f1-terraces.jpg', alt: 'Close view of the curved planted terraces glowing at sunset' },
      { src: '/photos/f1-entrance.jpg', alt: 'Museum entrance under the cantilever with an F1 car outside', wide: true },
      { src: '/photos/f1-sheet.jpg', alt: 'Presentation sheet with seven labelled views of the museum', caption: 'Presentation sheet — entrance, facade and interior studies', wide: true },
    ],
    featured: true,
  },
  {
    slug: 'capital-business-tower',
    index: '03',
    name: 'Capital Business Tower + Margalla Residences',
    typology: 'Mixed-use',
    location: 'Islamabad, Pakistan',
    year: '2024',
    status: 'Design proposal',
    summary:
      'A woven exoskeleton of branching precast ribs shades offices and residences above a stepped public plaza at the foot of the Margalla Hills.',
    body: [
      'The lattice is structure, shade and identity in one move: ribs gather at the base like tree trunks, splitting as they climb to carry the floor loads and screen the low western sun.',
      'A lower residential block shares the plaza, its own lattice opening wider where balconies and planting push through. Between the two, broad public steps descend past water to the street.',
    ],
    materials: ['Precast concrete lattice', 'High-performance glazing', 'Stone plaza steps', 'Sky terraces'],
    cover: '/photos/tower-margalla.jpg',
    images: [
      { src: '/photos/tower-margalla.jpg', alt: 'The lattice-clad tower and residences above stepped public plaza' },
    ],
    featured: true,
  },
  {
    slug: 'district-general-hospital',
    index: '04',
    name: 'District General Hospital',
    typology: 'Healthcare',
    location: 'District site, Punjab',
    year: '2024',
    status: 'Design proposal',
    summary:
      'A low brick medical campus arranged around planted courtyards, with one legible emergency approach and wards that never lose the trees.',
    body: [
      'Rather than a single deep block, the hospital is broken into brick wings around courtyards, so every ward and waiting room borrows daylight and a view of planting. The emergency entrance is given its own canopy and its own road — legible at speed, day or night.',
      'Brick was chosen for calm as much as economy: a material the region builds with well, laid in deep reveals that shade the windows and age gracefully.',
    ],
    materials: ['Load-bearing brick', 'Concrete canopies', 'Courtyard planting', 'Standing-seam roofs'],
    cover: '/photos/hospital-aerial.jpg',
    images: [
      { src: '/photos/hospital-aerial.jpg', alt: 'Aerial view of the brick hospital campus with EMERGENCY entrance', wide: true },
      { src: '/photos/hospital-roof.jpg', alt: 'Aerial view over the hospital roofscape and central courtyard', wide: true },
    ],
    featured: true,
  },
  {
    slug: 'brick-urban-commons',
    index: '05',
    name: 'Brick Urban Commons',
    typology: 'Urban',
    location: 'Inner-city infill',
    year: '2024',
    status: 'Design study',
    summary:
      'A mixed-use infill quarter in load-bearing brick — shops below, studios above, and a round assembly hall held in the court.',
    body: [
      'The project takes a leftover corner of the city and repairs it with a simple brick datum: two and three storeys, deep window reveals, parking absorbed along the kerb rather than in front yards.',
      'Inside the block, a circular hall sits in the courtyard like a kiln — the one curved figure among straight walls, shared by the whole quarter.',
    ],
    materials: ['Load-bearing brick', 'Precast lintels', 'Timber-lined hall', 'Street planting'],
    cover: '/photos/campus-brick.jpg',
    images: [
      { src: '/photos/campus-brick.jpg', alt: 'Four views of the brick infill quarter and its circular courtyard hall', wide: true },
    ],
  },
  {
    slug: 'golden-hour-villas',
    index: '06',
    name: 'Golden Hour Villas',
    typology: 'Residential',
    location: 'Suburban plots, Pakistan',
    year: '2023–25',
    status: 'Design series',
    summary:
      'A series of private houses that stage the evening: stucco and dark metal, deep balconies, and lighting designed for the hour the family comes home.',
    body: [
      'Each villa is composed for its street corner — a tall stair volume, a brick or slatted screen, a glass balcony — but all of them share the same discipline of warm render, dark metal and shadow.',
      'The lighting is drawn like the architecture: concealed coves wash the entrance walls, gate slats glow from behind, and no fitting glares at a neighbour.',
    ],
    materials: ['Textured render', 'Dark metal slats', 'Glass balustrades', 'Brick feature panels'],
    cover: '/photos/villa-terrace.jpg',
    images: [
      { src: '/photos/villa-crest.jpg', alt: 'Villa with angled roofline at sunset' },
      { src: '/photos/villa-terrace.jpg', alt: 'Flat-roofed villa with glass balcony at sunset' },
      { src: '/photos/villa-brick.jpg', alt: 'Villa with brick feature panel and roof terrace at sunset' },
      { src: '/photos/villa-details.jpg', alt: 'Detail collage: gates, balconies, entrance lighting', caption: 'Detail sheet — gates, coves and thresholds', wide: true },
    ],
    featured: true,
  },
  {
    slug: 'timber-bath-suites',
    index: '07',
    name: 'Timber Bath Suites',
    typology: 'Interiors',
    location: 'Private residences',
    year: '2024',
    status: 'Interior design',
    summary:
      'Compact bathrooms lined in warm timber, lit by a single continuous cove and a halo mirror — small rooms treated as seriously as facades.',
    body: [
      'The palette is deliberately narrow: pale timber boarding on every surface, a dark stone basin, glass instead of walls. With nothing else competing, the light does the architecture.',
      'One cove runs the full perimeter of the ceiling; one halo sits behind the mirror. Both are warm, dimmable and completely concealed.',
    ],
    materials: ['Timber wall boarding', 'Stone vessel basins', 'Concealed LED coves', 'Frameless glass'],
    cover: '/photos/interior-bath-2.jpg',
    images: [
      { src: '/photos/interior-bath-1.jpg', alt: 'Timber-lined bathroom with backlit mirror and stone basin', wide: true },
      { src: '/photos/interior-bath-2.jpg', alt: 'Timber bathroom with halo mirror, dark door and glass shower', wide: true },
    ],
  },
]

export type Poster = { src: string; alt: string; title: string; line: string }

export const posters: Poster[] = [
  {
    src: '/photos/poster-brutalist.jpg',
    alt: 'BRUTALIST — editorial poster over a concrete portal building',
    title: 'BRUTALIST',
    line: 'Form follows structure. Raw, honest, timeless.',
  },
  {
    src: '/photos/poster-massive.jpg',
    alt: 'MASSIVE — editorial poster over a folded-roof cinema',
    title: 'MASSIVE',
    line: 'Rigid. Raw. Real. Built with purpose, designed to endure.',
  },
]

export const featuredProjects = projects.filter((p) => p.featured && !p.flagship)
export const flagship = projects.find((p) => p.flagship)!

export function getProject(slug: string | undefined) {
  return projects.find((p) => p.slug === slug)
}

export function adjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: undefined, next: undefined }
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  }
}
