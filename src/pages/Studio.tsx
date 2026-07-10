import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { testimonials } from '../data/testimonials'
import Reveal from '../components/Reveal'

export default function Studio() {
  return (
    <>
      <section className="detail-head">
        <div className="container">
          <p className="mono u-muted" style={{ marginBottom: 18 }}>
            Sheet A-200 · The practice · {site.city}
          </p>
          <h1 className="display display-lg" style={{ marginBottom: 16 }}>
            The practice
          </h1>
          <p className="serif-lede" style={{ maxWidth: '48ch' }}>
            {site.statement}
          </p>
        </div>
      </section>

      <section className="sheet" style={{ paddingTop: 'clamp(32px, 4vw, 56px)' }}>
        <div className="container">
          <div className="split">
            <Reveal>
              <div className="prose">
                {site.bio.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
              <div className="meta-table" style={{ marginTop: 44 }}>
                {site.credentials.map((c, i) => (
                  <div className="cred-row" key={i}>
                    <span className="mono u-muted">{c.label}</span>
                    <span className="val" style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>
                      {c.value}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="portrait-panel">
                <span className="mono">
                  Portrait · {site.principal}
                  <br />
                  Photograph pending issue
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sheet">
        <div className="container">
          <div className="sheet-head mono">
            <span>
              <b>SH-05</b> · Services
            </span>
            <span>Full scope · concept to handover</span>
          </div>
          <div className="services-list" style={{ maxWidth: 820 }}>
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
        </div>
      </section>

      <section className="sheet">
        <div className="container">
          <div className="sheet-head mono">
            <span>
              <b>SH-06</b> · Client record
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

      <section className="band-dark cta-band">
        <div className="container">
          <p className="mono u-muted" style={{ marginBottom: 24 }}>
            New commissions — {new Date().getFullYear()}
          </p>
          <h2 className="display display-lg">
            Work with the studio — <Link to="/contact">get in touch</Link>
          </h2>
        </div>
      </section>
    </>
  )
}
