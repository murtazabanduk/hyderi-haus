import { useState } from 'react'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import ShowcaseCard from '../components/ShowcaseCard'
import Reveal from '../components/Reveal'

const typologies = ['All', 'Residential', 'Commercial', 'Cultural', 'Public'] as const

export default function Work() {
  const [filter, setFilter] = useState<(typeof typologies)[number]>('All')
  const list = filter === 'All' ? projects : projects.filter((p) => p.typology === filter)

  return (
    <>
      <section className="detail-head">
        <div className="container">
          <p className="mono u-muted" style={{ marginBottom: 18 }}>
            Sheet A-100 · Index of works · 2012 — {new Date().getFullYear()}
          </p>
          <h1 className="display display-lg" style={{ marginBottom: 16 }}>
            Index of works
          </h1>
          <p className="serif-lede" style={{ maxWidth: '46ch' }}>
            Every project is shown as a digital maquette — open one and turn it over the way
            you would a model on the studio table.
          </p>
        </div>
      </section>

      <section className="sheet" style={{ paddingTop: 'clamp(32px, 4vw, 56px)' }}>
        <div className="container">
          <div className="chip-row" role="group" aria-label="Filter by typology">
            {typologies.map((t) => (
              <button
                key={t}
                className={'chip' + (filter === t ? ' on' : '')}
                onClick={() => setFilter(t)}
                aria-pressed={filter === t}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="works-grid">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 90}>
                {p.showcase ? <ShowcaseCard project={p} /> : <ProjectCard project={p} />}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
