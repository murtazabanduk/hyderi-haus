// ---------------------------------------------------------------------------
// Studio identity — Hyderi Haus, the practice of Hussain Hyderi.
// Contact details marked TODO are placeholders: swap in the real ones.
// ---------------------------------------------------------------------------

export const site = {
  name: 'Hyderi Haus',
  wordmark: 'HYDERI HAUS',
  tagline: 'Architecture · Design · Space',
  principal: 'Hussain Hyderi',
  school: 'National College of Arts, Rawalpindi',
  city: 'Rawalpindi — Islamabad, Pakistan',
  // TODO: replace with the studio's real contact details before publishing.
  email: 'studio@hyderihaus.com',
  phone: '+92 300 0000000',
}

export type Service = {
  index: string
  name: string
  detail: string
}

export const services: Service[] = [
  {
    index: '01',
    name: 'Architecture',
    detail:
      'Cultural, civic, healthcare and residential buildings — from first sketch to construction documentation.',
  },
  {
    index: '02',
    name: 'Interior design',
    detail:
      'Complete interiors with material, lighting and joinery detail resolved as carefully as the plan.',
  },
  {
    index: '03',
    name: 'Visualisation',
    detail:
      'Photoreal stills, films and editorial artwork that let a client walk through a building before it exists.',
  },
  {
    index: '04',
    name: 'Design development',
    detail:
      'Concept audits, competition entries and feasibility studies for architects and developers.',
  },
]
