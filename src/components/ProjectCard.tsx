import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link className="pcard" to={`/work/${project.slug}`}>
      <figure className="pcard-fig">
        <img src={project.cover} alt={project.name} loading="lazy" />
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
