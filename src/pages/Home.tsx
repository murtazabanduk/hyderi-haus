import { Link } from 'react-router-dom'
import Picture from '../components/Picture'
import ZoomHero from '../components/ZoomHero'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import { featuredProjects, posters } from '../data/projects'
import { site } from '../data/site'
import { dimsFor } from '../lib/srcset'

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
              {(() => {
                const { fullW, fullH } = dimsFor(posters[0].src)
                return (
                  <Picture
                    src={posters[0].src}
                    sizes="(min-width: 900px) 30vw, 100vw"
                    width={fullW}
                    height={fullH}
                    loading="lazy"
                    alt={posters[0].alt}
                  />
                )
              })()}
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
              {(() => {
                const { fullW, fullH } = dimsFor(posters[1].src)
                return (
                  <Picture
                    src={posters[1].src}
                    sizes="(min-width: 900px) 30vw, 100vw"
                    width={fullW}
                    height={fullH}
                    loading="lazy"
                    alt={posters[1].alt}
                  />
                )
              })()}
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
              {(() => {
                const { fullW, fullH } = dimsFor('/photos/monument-sketches.jpg')
                return (
                  <Picture
                    src="/photos/monument-sketches.jpg"
                    sizes="(min-width: 900px) 55vw, 100vw"
                    width={fullW}
                    height={fullH}
                    loading="lazy"
                    alt="Wall of concept sketches iterating the folded form of The Monument"
                  />
                )
              })()}
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
                {(() => {
                  const { fullW, fullH } = dimsFor('/photos/monument-sketch.jpg')
                  return (
                    <Picture
                      src="/photos/monument-sketch.jpg"
                      sizes="(min-width: 900px) 30vw, 100vw"
                      width={fullW}
                      height={fullH}
                      loading="lazy"
                      alt="Hand-drawn perspective sketch of the folded roof massing"
                    />
                  )
                })()}
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

      <section className="sec sec-dark sec-studio-teaser">
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
              {(() => {
                const { fullW, fullH } = dimsFor('/photos/certificate.jpg')
                return (
                  <Picture
                    src="/photos/certificate.jpg"
                    alt="Certificate for excellent work awarded to Hussain Hyderi, National College of Arts Rawalpindi"
                    sizes="(min-width: 900px) 30vw, 100vw"
                    width={fullW}
                    height={fullH}
                    loading="lazy"
                  />
                )
              })()}
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
