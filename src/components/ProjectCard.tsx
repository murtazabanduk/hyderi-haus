import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import Picture from './Picture'
import { dimsFor } from '../lib/srcset'

export default function ProjectCard({ project }: { project: Project }) {
  const { fullW, fullH } = dimsFor(project.cover)

  return (
    <Link className="pcard" to={`/work/${project.slug}`}>
      <figure className="pcard-fig">
        <Picture
          src={project.cover}
          sizes="(min-width: 900px) 45vw, 100vw"
          width={fullW}
          height={fullH}
          loading="lazy"
          alt={project.name}
        />
      </figure>
      <div className="pcard-meta">
        <span className="mono pcard-idx">{project.index}</span>
        <h3>{project.name}</h3>
        <span className="mono pcard-tags">
          {project.typology.toUpperCase()} — {project.location.toUpperCase()}
        </span>
      </div>
    </Link>
  )
}
