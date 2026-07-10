import { Link } from 'react-router-dom'
import { site } from '../data/site'

function NorthArrow() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
      <circle cx="17" cy="17" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M17 6 L21 22 L17 18.5 L13 22 Z" fill="#2b45d8" />
      <text x="17" y="30.5" textAnchor="middle" fontSize="7" fill="currentColor" fontFamily="Spline Sans Mono, monospace">
        N
      </text>
    </svg>
  )
}

const cells = [
  { k: 'Project', v: 'Portfolio — Public Issue' },
  { k: 'Client', v: site.name.toUpperCase() },
  { k: 'Drawn by', v: 'A.S.' },
  { k: 'Scale', v: 'NTS @ Screen' },
  { k: 'Sheet', v: 'A-000 · Rev 04' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container" style={{ paddingBlock: 'clamp(40px, 6vw, 72px)' }}>
        <div className="tblock" role="presentation">
          {cells.map((c) => (
            <div className="tblock-cell" key={c.k}>
              <span className="mono k">{c.k}</span>
              <span className="v">{c.v}</span>
            </div>
          ))}
          <div className="tblock-cell" style={{ alignItems: 'flex-start' }}>
            <span className="mono k">North</span>
            <NorthArrow />
          </div>
        </div>
        <div className="footer-base mono">
          <span>
            © {year} {site.name} · {site.city} · {site.coordinates}
          </span>
          <span style={{ display: 'flex', gap: 24 }}>
            <Link to="/work">Work</Link>
            <Link to="/studio">Studio</Link>
            <Link to="/contact">Contact</Link>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
