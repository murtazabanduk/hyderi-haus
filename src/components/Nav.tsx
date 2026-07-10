import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../data/site'

export default function Nav() {
  const { pathname } = useLocation()
  const overHero = pathname === '/'
  const [solid, setSolid] = useState(!overHero)

  useEffect(() => {
    if (!overHero) {
      setSolid(true)
      return
    }
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>('[data-hero]')
      const end =
        hero && hero.offsetHeight > 0 ? hero.offsetTop + hero.offsetHeight - 90 : window.innerHeight
      setSolid(window.scrollY > end)
    }
    // Double rAF so the first check runs after styles and layout settle.
    const raf = requestAnimationFrame(() => requestAnimationFrame(onScroll))
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [overHero, pathname])

  return (
    <header className={`nav ${solid ? 'nav-solid' : 'nav-clear'}`}>
      <Link className="nav-brand" to="/">
        {site.wordmark}
      </Link>
      <nav className="nav-links" aria-label="Primary">
        <NavLink to="/work">Work</NavLink>
        <NavLink to="/studio">Studio</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  )
}
