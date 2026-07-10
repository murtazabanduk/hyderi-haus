import { Link, Navigate, useParams } from 'react-router-dom'
import { adjacentProjects, getProject } from '../data/projects'
import ProjectDrawing from '../components/Drawing'
import Reveal from '../components/Reveal'
import ModelViewer from '../three/ModelViewer'

export default function WorkDetail() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) return <Navigate to="/work" replace />

  const { prev, next } = adjacentProjects(project.slug)
  const meta = [
    ['Location', project.location],
    ['Typology', project.typology],
    ['Year', project.year],
    ['Status', project.status],
    ['Area', project.area],
    ['Client', project.client],
  ]

  return (
    <>
      {/* -------------------------------------------------- title sheet */}
      <section className="detail-head">
        <div className="container">
          <p className="mono u-muted" style={{ marginBottom: 18 }}>
            <Link to="/work">Index</Link> / {project.index} · {project.typology}
          </p>
          <div className="detail-grid">
            <div>
              <h1 className="display display-lg" style={{ marginBottom: 20 }}>
                {project.name}
              </h1>
              <p className="serif-lede" style={{ maxWidth: '42ch' }}>
                {project.summary}
              </p>
            </div>
            <div className="meta-table">
              {meta.map(([k, v]) => (
                <div className="meta-row" key={k}>
                  <span className="mono">{k}</span>
                  <span className="val">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- 3D maquette room */}
      <section className="viewer-shell">
        <div className="viewer-hud tl mono">
          Digital maquette · scale 1:200
          <br />
          Focus softens in motion — rests sharp
        </div>
        <div className="viewer-hud tr mono">
          Model no. {project.index}
          <br />
          {project.status}
        </div>
        <ModelViewer project={project} />
      </section>

      {/* -------------------------------------------------- narrative */}
      <section className="sheet">
        <div className="container">
          <div className="sheet-head mono">
            <span>
              <b>{project.index}</b> · Project record
            </span>
            <span>
              {project.location} · {project.year}
            </span>
          </div>
          <div className="split">
            <Reveal>
              <div className="prose">
                {project.body.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="mono u-muted" style={{ marginBottom: 14 }}>
                Materials & systems
              </p>
              <ul className="materials-list">
                {project.materials.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- drawing set */}
      <section className="sheet">
        <div className="container">
          <div className="sheet-head mono">
            <span>
              <b>DWG</b> · Axonometric
            </span>
            <span>Not to scale · issued for web</span>
          </div>
          <Reveal>
            <div className="drawing-large">
              <ProjectDrawing slug={project.slug} title={project.name} />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="ph-strip" style={{ marginTop: 'clamp(16px, 2vw, 32px)' }}>
              <div className="ph-panel">
                <span className="mono">Photography — pending issue</span>
              </div>
              <div className="ph-panel">
                <span className="mono">Render — pending issue</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------- pager */}
      <nav className="pager" aria-label="More projects">
        <Link to={`/work/${prev.slug}`}>
          <span className="mono u-muted">← Previous · {prev.index}</span>
          <span className="card-name">{prev.name}</span>
        </Link>
        <Link to={`/work/${next.slug}`}>
          <span className="mono u-muted">Next · {next.index} →</span>
          <span className="card-name">{next.name}</span>
        </Link>
      </nav>
    </>
  )
}
