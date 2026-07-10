import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { featuredProjects } from '../data/projects'
import { testimonials } from '../data/testimonials'
import ProjectCard from '../components/ProjectCard'
import ShowcaseCard from '../components/ShowcaseCard'
import Reveal from '../components/Reveal'
import HeroScene from '../three/HeroScene'

export default function Home() {
  return (
    <>
      {/* ------------------------------------------------ hero / cover sheet */}
      <section className="hero">
        <div className="hero-canvas" aria-hidden="true">
          <HeroScene />
        </div>

        <div className="hero-corner tr mono rise d3">
          Sheet A-000 · Cover
          <br />
          {site.coordinates}
        </div>
        <div className="hero-corner br mono rise d4">
          Est. {site.established} · COA Registered
          <br />
          Scroll — Section A-A ↓
        </div>

        <div className="container hero-content">
          <p className="hero-eyebrow mono rise d1">
            {site.name} · {site.tagline} · {site.city}
          </p>
          <h1 className="display display-xl hero-title">
            <span className="rise d1" style={{ display: 'block' }}>
              Buildings
            </span>
            <span className="rise d2" style={{ display: 'block' }}>
              that age well
            </span>
          </h1>
          <div className="hero-foot">
            <p className="serif-lede rise d3">{site.statement}</p>
            <span className="rise d4">
              <Link to="/work" className="btn-line">
                View selected work <span className="arr">→</span>
              </Link>
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ selected works */}
      <section className="sheet">
        <div className="container">
          <div className="sheet-head mono">
            <span>
              <b>SH-01</b> · Selected work
            </span>
            <span>{featuredProjects.length} of 6 projects · each opens as a 3D maquette</span>
          </div>
          <div className="works-grid">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 90}>
                {p.showcase ? <ShowcaseCard project={p} /> : <ProjectCard project={p} />}
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ marginTop: 'clamp(40px, 5vw, 72px)' }}>
              <Link to="/work" className="btn-line">
                Index of all works <span className="arr">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ practice */}
      <section className="sheet">
        <div className="container">
          <div className="sheet-head mono">
            <span>
              <b>SH-02</b> · The practice
            </span>
            <span>{site.principal} · Est. {site.established}</span>
          </div>
          <div className="split">
            <Reveal>
              <p className="serif-lede" style={{ marginBottom: 28 }}>
                A building is judged in the round — so the studio designs in the round: card
                models, digital maquettes, and drawings you can hold up to the light.
              </p>
              <div className="prose">
                <p>{site.bio[0]}</p>
              </div>
              <div style={{ marginTop: 36 }}>
                <Link to="/studio" className="btn-line">
                  About the principal <span className="arr">→</span>
                </Link>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="services-list">
                {site.services.map((s) => (
                  <div className="service-row" key={s.id}>
                    <span className="mono">{s.id}</span>
                    <div>
                      <div className="service-name">{s.name}</div>
                      <div className="service-detail">{s.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ testimonials */}
      <section className="sheet">
        <div className="container">
          <div className="sheet-head mono">
            <span>
              <b>SH-03</b> · Client record
            </span>
            <span>As noted on handover</span>
          </div>
          <div className="quotes">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 110}>
                <figure className="quote">
                  <blockquote>{t.quote}</blockquote>
                  <figcaption className="mono">
                    <b>{t.name}</b>
                    {t.role} · {t.project}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ CTA */}
      <section className="band-dark cta-band">
        <div className="container">
          <p className="mono u-muted" style={{ marginBottom: 24 }}>
            SH-04 · New commissions — {new Date().getFullYear()}
          </p>
          <h2 className="display display-lg">
            Start a project —{' '}
            <Link to="/contact">let’s talk</Link>
          </h2>
        </div>
      </section>
    </>
  )
}
