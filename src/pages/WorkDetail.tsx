import { Link, Navigate, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { adjacentProjects, getProject } from '../data/projects'

export default function WorkDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <Navigate to="/work" replace />
  const { prev, next } = adjacentProjects(project.slug)

  return (
    <main className="wd">
      <header className="wd-hero">
        <img src={project.cover} alt={project.name} />
        <div className="wd-scrim">
          <span className="mono kicker">
            {project.index} — {project.typology.toUpperCase()}
          </span>
          <h1>{project.name}</h1>
        </div>
      </header>

      <div className="wd-meta mono">
        <div>
          <span className="dimmed">LOCATION</span>
          <span>{project.location}</span>
        </div>
        <div>
          <span className="dimmed">YEAR</span>
          <span>{project.year}</span>
        </div>
        <div>
          <span className="dimmed">STATUS</span>
          <span>{project.status}</span>
        </div>
        <div>
          <span className="dimmed">TYPOLOGY</span>
          <span>{project.typology}</span>
        </div>
      </div>

      <div className="wd-body">
        <Reveal>
          <p className="serif wd-summary">{project.summary}</p>
        </Reveal>
        {project.body.map((para, i) => (
          <Reveal key={i} delay={60}>
            <p>{para}</p>
          </Reveal>
        ))}
        {project.materials && (
          <Reveal>
            <ul className="wd-materials">
              {project.materials.map((m) => (
                <li key={m} className="mono">
                  {m.toUpperCase()}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>

      <div className="wd-gallery">
        {project.images.map((img) => (
          <Reveal key={img.src} className={img.wide ? 'g-wide' : ''}>
            <figure>
              <img src={img.src} alt={img.alt} loading="lazy" />
              {img.caption && <figcaption className="mono">{img.caption.toUpperCase()}</figcaption>}
            </figure>
          </Reveal>
        ))}
      </div>

      {project.videos && (
        <div className="wd-videos">
          <span className="mono kicker">FILM STUDIES</span>
          <div className="wd-videos-row">
            {project.videos.map((v) => (
              <Reveal key={v.src}>
                <figure>
                  <video src={v.src} controls muted loop playsInline preload="metadata" />
                  <figcaption className="mono">{v.caption.toUpperCase()}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      <nav className="wd-pager" aria-label="More projects">
        {prev && (
          <Link to={`/work/${prev.slug}`} className="pager-link">
            <span className="mono dimmed">← PREVIOUS</span>
            <span>{prev.name}</span>
          </Link>
        )}
        {next && (
          <Link to={`/work/${next.slug}`} className="pager-link pager-next">
            <span className="mono dimmed">NEXT →</span>
            <span>{next.name}</span>
          </Link>
        )}
      </nav>
    </main>
  )
}
