import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import { projects } from '../data/projects'

const typologies = ['All', ...Array.from(new Set(projects.map((p) => p.typology)))]

export default function Work() {
  const [filter, setFilter] = useState('All')
  const shown = filter === 'All' ? projects : projects.filter((p) => p.typology === filter)

  return (
    <main className="page">
      <header className="page-head">
        <span className="mono kicker">PORTFOLIO — {String(projects.length).padStart(2, '0')} PROJECTS</span>
        <h1 className="page-title">THE WORK</h1>
      </header>

      <div className="chips" role="tablist" aria-label="Filter by typology">
        {typologies.map((t) => (
          <button
            key={t}
            className={`chip mono ${filter === t ? 'chip-on' : ''}`}
            onClick={() => setFilter(t)}
            role="tab"
            aria-selected={filter === t}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="works-grid works-grid-full">
        {shown.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 90}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </main>
  )
}
