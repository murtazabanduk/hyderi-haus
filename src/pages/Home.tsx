import { Link } from 'react-router-dom'
import ZoomHero from '../components/ZoomHero'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import { featuredProjects, posters } from '../data/projects'
import { site } from '../data/site'

export default function Home() {
  return (
    <main>
      <ZoomHero />

      <section className="sec">
        <header className="sec-head">
          <span className="mono sec-no">01</span>
          <h2 className="sec-title">SELECTED WORKS</h2>
          <Link className="mono sec-link" to="/work">
            ALL PROJECTS →
          </Link>
        </header>
        <div className="works-grid">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 90}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sec sec-dark sec-print">
        <header className="sec-head">
          <span className="mono sec-no">02</span>
          <h2 className="sec-title">IN PRINT</h2>
        </header>
        <div className="print-band">
          <Reveal>
            <figure className="poster poster-l">
              <img src={posters[0].src} alt={posters[0].alt} loading="lazy" />
            </figure>
          </Reveal>
          <Reveal delay={120}>
            <div className="print-copy">
              <p className="serif">
                The studio also works on paper — poster editions that argue for material honesty in type as bold as
                the buildings.
              </p>
              <p className="mono dimmed">SELF-PUBLISHED EDITIONS — CONCRETE SERIES</p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <figure className="poster poster-r">
              <img src={posters[1].src} alt={posters[1].alt} loading="lazy" />
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="sec sec-process">
        <header className="sec-head">
          <span className="mono sec-no">03</span>
          <h2 className="sec-title">PROCESS</h2>
        </header>
        <div className="process-grid">
          <Reveal>
            <figure className="process-fig">
              <img src="/photos/monument-sketches.jpg" alt="Wall of concept sketches iterating the folded form of The Monument" loading="lazy" />
              <figcaption className="mono">CONCEPT WALL — THE MONUMENT</figcaption>
            </figure>
          </Reveal>
          <div className="process-copy">
            <Reveal delay={100}>
              <p className="serif process-lede">
                Every building starts as an argument on paper. The fold of the Monument was drawn a hundred ways —
                as ridgeline, as ledger, as roof — before the first model was built.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <figure className="process-fig-sm">
                <img src="/photos/monument-sketch.jpg" alt="Hand-drawn perspective sketch of the folded roof massing" loading="lazy" />
                <figcaption className="mono">FIRST MASSING SKETCH</figcaption>
              </figure>
            </Reveal>
            <Reveal delay={240}>
              <Link className="btn" to="/work/the-monument">
                Follow the fold <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec sec-studio-teaser">
        <div className="studio-teaser">
          <Reveal>
            <div>
              <span className="mono sec-no">04 — STUDIO</span>
              <p className="serif studio-lede">
                {site.name} is the practice of {site.principal} — trained at the {site.school}, and recognised there
                for the Monument Design project. Buildings, interiors and images, made with equal seriousness.
              </p>
              <Link className="btn" to="/studio">
                About the studio <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <figure className="studio-cert">
              <img src="/photos/certificate.jpg" alt="Certificate for excellent work awarded to Hussain Hyderi, National College of Arts Rawalpindi" loading="lazy" />
              <figcaption className="mono">CERTIFICATE FOR EXCELLENT WORK — NCA, 2025</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="sec sec-dark sec-cta">
        <Reveal>
          <span className="mono sec-no">05 — CONTACT</span>
          <h2 className="cta-word">
            LET’S BUILD
            <br />
            SOMETHING THAT LASTS
          </h2>
          <div className="cta-row">
            <Link className="btn btn-light" to="/contact">
              Start a project <span aria-hidden>→</span>
            </Link>
            <a className="mono cta-mail" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
