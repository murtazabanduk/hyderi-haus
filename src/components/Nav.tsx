import { Link, NavLink } from 'react-router-dom'
import { site } from '../data/site'

const links = [
  { to: '/work', label: 'Work' },
  { to: '/studio', label: 'Studio' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="wordmark" aria-label={`${site.name} — home`}>
          {site.wordmark}
          <small>
            {site.tagline} · {site.city.split(',')[0]}
          </small>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
