export type Testimonial = {
  quote: string
  name: string
  role: string
  project: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'We asked for a house and got a way of living. Two monsoons in, the brick screen has gone exactly the colour Aariz said it would — and the court is where every evening ends.',
    name: 'Meera & Sandeep Kelkar',
    role: 'Clients',
    project: 'The Veil House',
  },
  {
    quote:
      'The studio argued us out of 1,100 rentable square metres and into terraces. Leasing closed eight months early. The terraces are why.',
    name: 'R. Unnikrishnan',
    role: 'Director, Mirae Developments',
    project: 'Terrace Tower',
  },
  {
    quote:
      'Most architects hand over drawings. Sarai handed over a model we could hold, turn, and argue with. By the time we built, there were no surprises left.',
    name: 'Farida Contractor',
    role: 'Trustee, Sarabhai Arts Trust',
    project: 'Kiln Gallery',
  },
]
