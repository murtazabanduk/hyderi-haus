import { useState, type FormEvent } from 'react'
import Reveal from '../components/Reveal'
import { site } from '../data/site'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [about, setAbout] = useState('A new building')
  const [message, setMessage] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`${about} — enquiry from ${name || 'the website'}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  return (
    <main className="page">
      <header className="page-head">
        <span className="mono kicker">START A PROJECT</span>
        <h1 className="page-title">CONTACT</h1>
      </header>

      <div className="contact-grid">
        <Reveal>
          <div className="contact-info">
            <p className="serif">
              Tell us about the site, the brief and the hour of day you want the building to be photographed in.
            </p>
            <div className="contact-lines mono">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
              <span>{site.city}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form className="contact-form" onSubmit={submit}>
            <label>
              <span className="mono">NAME</span>
              <input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
            </label>
            <label>
              <span className="mono">EMAIL</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </label>
            <label>
              <span className="mono">THE PROJECT IS</span>
              <select value={about} onChange={(e) => setAbout(e.target.value)}>
                <option>A new building</option>
                <option>An interior</option>
                <option>Visualisation work</option>
                <option>Something else</option>
              </select>
            </label>
            <label>
              <span className="mono">MESSAGE</span>
              <textarea rows={6} value={message} onChange={(e) => setMessage(e.target.value)} required />
            </label>
            <button className="btn" type="submit">
              Send enquiry <span aria-hidden>→</span>
            </button>
            <p className="mono dimmed form-note">OPENS YOUR MAIL APP — NOTHING IS SENT FROM THE PAGE ITSELF.</p>
          </form>
        </Reveal>
      </div>
    </main>
  )
}
