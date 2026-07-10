import { Link } from 'react-router-dom'
import { site } from '../data/site'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <span className="footer-word">{site.wordmark}</span>
          <p className="serif">{site.tagline}</p>
        </div>
        <div className="footer-col">
          <span className="mono kicker">EXPLORE</span>
          <Link to="/work">Work</Link>
          <Link to="/studio">Studio</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <span className="mono kicker">STUDIO</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
          <span>{site.city}</span>
        </div>
      </div>
      <div className="footer-base mono">
        <span>© 2026 {site.name}</span>
        <span>{site.principal} — {site.school}</span>
      </div>
    </footer>
  )
}
