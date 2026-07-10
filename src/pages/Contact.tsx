import { useState, type FormEvent } from 'react'
import { site } from '../data/site'
import Reveal from '../components/Reveal'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const subject = `Project enquiry — ${data.get('type')}`
    const body = [
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Project type: ${data.get('type')}`,
      '',
      String(data.get('message') ?? ''),
    ].join('\n')
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
      <section className="detail-head">
        <div className="container">
          <p className="mono u-muted" style={{ marginBottom: 18 }}>
            Sheet A-300 · Correspondence · {site.city}
          </p>
          <h1 className="display display-lg" style={{ marginBottom: 16 }}>
            Start a project
          </h1>
          <p className="serif-lede" style={{ maxWidth: '46ch' }}>
            Tell the studio what you want to build. Every enquiry is read by the principal, and
            answered within two working days.
          </p>
        </div>
      </section>

      <section className="sheet" style={{ paddingTop: 'clamp(32px, 4vw, 56px)' }}>
        <div className="container">
          <div className="split">
            <Reveal>
              <form onSubmit={submit}>
                <div className="field">
                  <label htmlFor="name">Your name</label>
                  <input id="name" name="name" type="text" required autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required autoComplete="email" />
                </div>
                <div className="field">
                  <label htmlFor="type">Project type</label>
                  <select id="type" name="type" defaultValue="Residential">
                    <option>Residential</option>
                    <option>Commercial / hospitality</option>
                    <option>Cultural / public</option>
                    <option>Interiors</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="message">About the project — site, scope, timeline</label>
                  <textarea id="message" name="message" required />
                </div>
                <button type="submit" className="btn-solid">
                  Send enquiry <span aria-hidden="true">→</span>
                </button>
                <p className="form-note">
                  {sent
                    ? 'Your mail app should now be open with the enquiry drafted — press send there.'
                    : 'Sending opens your mail app with the enquiry drafted and addressed.'}
                </p>
              </form>
            </Reveal>
            <Reveal delay={120}>
              <div className="contact-line">
                <span className="mono u-muted">Email</span>
                <a className="mono" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </div>
              <div className="contact-line">
                <span className="mono u-muted">Phone</span>
                <a className="mono" href={`tel:${site.phone.replace(/\s/g, '')}`}>
                  {site.phone}
                </a>
              </div>
              <div className="contact-line">
                <span className="mono u-muted">Studio</span>
                <span className="mono" style={{ textAlign: 'right' }}>
                  {site.address.map((l) => (
                    <span key={l} style={{ display: 'block' }}>
                      {l}
                    </span>
                  ))}
                </span>
              </div>
              <div className="contact-line">
                <span className="mono u-muted">Hours</span>
                <span className="mono">{site.hours}</span>
              </div>
              <div className="contact-line">
                <span className="mono u-muted">Site datum</span>
                <span className="mono u-blue">{site.coordinates}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
