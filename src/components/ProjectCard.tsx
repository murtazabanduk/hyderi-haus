import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import ProjectDrawing from './Drawing'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/work/${project.slug}`} className="card" aria-label={`${project.name} — open project`}>
      <div className="card-fig">
        <ProjectDrawing slug={project.slug} title={project.name} />
        <span className="card-cue mono">Open 3D model →</span>
      </div>
      <div className="card-meta mono">
        <span>
          {project.index} · {project.typology}
        </span>
        <span>
          {project.location.split(',')[0]} — {project.year}
        </span>
      </div>
      <div className="card-name">{project.name}</div>
    </Link>
  )
}
