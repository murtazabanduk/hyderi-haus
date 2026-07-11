import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { services, site } from '../data/site'

export default function Studio() {
  return (
    <main className="page">
      <header className="page-head">
        <span className="mono kicker">THE PRACTICE</span>
        <h1 className="page-title">STUDIO</h1>
      </header>

      <Reveal>
        <p className="serif studio-statement">
          {site.name} is the architecture practice of {site.principal} — buildings, interiors and images made with
          equal seriousness, from {site.city}.
        </p>
      </Reveal>

      <div className="studio-grid">
        <Reveal>
          <div className="studio-block">
            <span className="mono kicker">EDUCATION</span>
            <p>
              {site.principal} trained at the {site.school}, where the Monument Design project — a folded concrete
              cultural landmark — was awarded a certificate for excellent work in 2025.
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <figure className="studio-cert studio-cert-lg">
            <img src="/photos/certificate.jpg" alt="Certificate for excellent work awarded to Hussain Hyderi at the National College of Arts, Rawalpindi" loading="lazy" />
            <figcaption className="mono">CERTIFICATE FOR EXCELLENT WORK — MONUMENT DESIGN, NCA RAWALPINDI, 2025</figcaption>
          </figure>
        </Reveal>
      </div>

      <section className="studio-recognition">
        <span className="mono kicker">RECOGNITION</span>
        <p className="studio-recognition-lede">
          Alongside the studio, {site.principal} volunteers and participates at industry gatherings across Pakistan.
        </p>
        <div className="studio-certs-row">
          <Reveal>
            <figure className="studio-cert">
              <img
                src="/photos/certificate-iapex26.jpg"
                alt="Institute of Architects Pakistan, Rawalpindi-Islamabad Chapter certificate acknowledging Hussain Mufadal for volunteering at IAPEX26"
                loading="lazy"
              />
              <figcaption className="mono">VOLUNTEER, IAPEX26 — INSTITUTE OF ARCHITECTS PAKISTAN, ISLAMABAD, 2026</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={100}>
            <figure className="studio-cert">
              <img
                src="/photos/certificate-ndma-dawe.jpg"
                alt="NDMA Pakistan certificate of participation for Hussain at the Disaster Early Warning Tech Expo 2025"
                loading="lazy"
              />
              <figcaption className="mono">PARTICIPANT, DISASTER EARLY WARNING TECH EXPO — NDMA PAKISTAN, 2025</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="studio-services">
        <span className="mono kicker">WHAT THE STUDIO DOES</span>
        <ul>
          {services.map((s, i) => (
            <Reveal key={s.index} delay={i * 70}>
              <li>
                <span className="mono svc-idx">{s.index}</span>
                <div>
                  <h3>{s.name}</h3>
                  <p>{s.detail}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <Reveal>
        <div className="studio-mark">
          <img src="/photos/logo.jpg" alt="Hyderi Haus logo — two H letterforms drawn as buildings" loading="lazy" />
          <div>
            <p className="serif">
              The mark is two letters drawn as buildings — a house and a tower sharing one wall. Architecture, design,
              space.
            </p>
            <Link className="btn" to="/contact">
              Work with us <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </Reveal>
    </main>
  )
}
