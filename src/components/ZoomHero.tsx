import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site'

// ---------------------------------------------------------------------------
// The flagship feature: a scroll-driven approach to The Monument.
// Scrolling the 430vh track zooms from the wide aerial into the entrance,
// stretches through a seam, then resolves into a letterboxed ground-level
// elevation — with project information revealed stage by stage. A slider
// gives the same journey without scrolling. All motion is written straight
// to the DOM inside one rAF loop; React never re-renders during the ride.
// ---------------------------------------------------------------------------

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const smooth = (t: number) => {
  const x = clamp01(t)
  return x * x * (3 - 2 * x)
}
/** Gaussian bump centred at c — powers the elastic "stretch" at stage seams. */
const bump = (p: number, c: number, w: number) => Math.exp(-((p - c) ** 2) / (2 * w * w))
/** Visibility window [a, b] with fade width f. */
const win = (p: number, a: number, b: number, f = 0.06) =>
  smooth((p - a) / f) * (1 - smooth((p - (b - f)) / f))

const PHASES: [number, string][] = [
  [0.3, 'AERIAL SURVEY'],
  [0.62, 'DESCENT'],
  [0.9, 'ARRIVAL'],
  [1.01, 'ON SITE'],
]

export default function ZoomHero() {
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const track = useRef<HTMLDivElement>(null)
  const aerial = useRef<HTMLDivElement>(null)
  const dusk = useRef<HTMLDivElement>(null)
  const intro = useRef<HTMLDivElement>(null)
  const panelA = useRef<HTMLDivElement>(null)
  const panelB = useRef<HTMLDivElement>(null)
  const arrive = useRef<HTMLDivElement>(null)
  const barTop = useRef<HTMLDivElement>(null)
  const barBot = useRef<HTMLDivElement>(null)
  const strip = useRef<HTMLDivElement>(null)
  const hudPct = useRef<HTMLSpanElement>(null)
  const hudAlt = useRef<HTMLSpanElement>(null)
  const hudPhase = useRef<HTMLSpanElement>(null)
  const hudFill = useRef<HTMLDivElement>(null)
  const hud = useRef<HTMLDivElement>(null)
  const slider = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (reduced) return
    const el = track.current
    if (!el) return

    let top = 0
    let span = 1
    const measure = () => {
      top = el.getBoundingClientRect().top + window.scrollY
      span = Math.max(1, el.offsetHeight - window.innerHeight)
      last = -1 // invalidate so the next apply() rewrites everything
      onScroll()
    }

    const sl = slider.current
    const onSlide = () => {
      if (sl) window.scrollTo({ top: top + (Number(sl.value) / 1000) * span })
    }
    sl?.addEventListener('input', onSlide)

    let last = -1
    let raf = 0
    const apply = () => {
      raf = 0
      const p = clamp01((window.scrollY - top) / span)
      if (p === last) return
      last = p

      // Aerial: zoom toward the entrance, elastic stretch through the seam,
      // then dim and defocus as the ground stage takes over.
      const zoom = 1 + 1.5 * smooth(p / 0.72)
      const stretch = bump(p, 0.4, 0.05)
      const dim = smooth((p - 0.56) / 0.16)
      if (aerial.current) {
        aerial.current.style.transform = `scale(${(zoom * (1 + 0.09 * stretch)).toFixed(4)}, ${(zoom * (1 - 0.055 * stretch)).toFixed(4)})`
        aerial.current.style.filter = `brightness(${(1 - 0.68 * dim).toFixed(3)}) saturate(${(1 + 0.12 * smooth(p / 0.5)).toFixed(3)}) blur(${(7 * dim).toFixed(2)}px)`
      }

      // Dusk wash deepens on the way down.
      if (dusk.current) dusk.current.style.opacity = (0.5 * smooth((p - 0.18) / 0.45)).toFixed(3)

      // Intro wordmark.
      if (intro.current) {
        const o = 1 - smooth(p / 0.075)
        intro.current.style.opacity = o.toFixed(3)
        intro.current.style.transform = `translateY(${(-38 * smooth(p / 0.075)).toFixed(1)}px)`
        intro.current.style.visibility = o <= 0.001 ? 'hidden' : 'visible'
      }

      // Info panels.
      if (panelA.current) {
        const o = win(p, 0.13, 0.45)
        panelA.current.style.opacity = o.toFixed(3)
        panelA.current.style.transform = `translateY(${(30 * (1 - smooth((p - 0.13) / 0.06))).toFixed(1)}px)`
      }
      if (panelB.current) {
        const o = win(p, 0.42, 0.66)
        panelB.current.style.opacity = o.toFixed(3)
        panelB.current.style.transform = `translateY(${(30 * (1 - smooth((p - 0.42) / 0.06))).toFixed(1)}px)`
      }

      // Arrival: letterbox bars close in, the elevation stretches to width.
      const a = smooth((p - 0.6) / 0.14)
      if (arrive.current) {
        arrive.current.style.opacity = a > 0 ? '1' : '0'
        arrive.current.style.pointerEvents = a > 0.7 ? 'auto' : 'none'
      }
      if (barTop.current) barTop.current.style.transform = `translateY(${(-102 * (1 - a)).toFixed(2)}%)`
      if (barBot.current) barBot.current.style.transform = `translateY(${(102 * (1 - a)).toFixed(2)}%)`
      if (strip.current) {
        strip.current.style.opacity = a.toFixed(3)
        strip.current.style.transform = `scaleX(${(0.82 + 0.18 * a).toFixed(4)}) scaleY(${(1.12 - 0.12 * a).toFixed(4)})`
      }

      // Instrument cluster reads the approach; it stands down once the
      // letterboxed arrival card is in place so it never overlaps that text.
      if (hud.current) {
        hud.current.style.opacity = (1 - a).toFixed(3)
        hud.current.style.pointerEvents = a > 0.3 ? 'none' : 'auto'
      }

      // Instruments.
      const approach = smooth(p / 0.75)
      if (hudPct.current) hudPct.current.textContent = `${String(Math.round(p * 100)).padStart(3, '0')}%`
      if (hudAlt.current) hudAlt.current.textContent = `ALT ${String(Math.round(320 * (1 - approach))).padStart(3, '0')} M`
      if (hudFill.current) hudFill.current.style.height = `${(p * 100).toFixed(1)}%`
      if (hudPhase.current) {
        const phase = PHASES.find(([limit]) => p < limit)?.[1] ?? 'ON SITE'
        if (hudPhase.current.textContent !== phase) hudPhase.current.textContent = phase
      }
      if (sl && document.activeElement !== sl) sl.value = String(Math.round(p * 1000))
    }
    // Scroll-driven, rAF-coalesced: no work while the page is idle.
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    window.addEventListener('load', measure)
    measure()
    // Re-measure once layout has fully settled (fonts/styles landing late).
    const raf0 = requestAnimationFrame(() => requestAnimationFrame(measure))

    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(raf0)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
      sl?.removeEventListener('input', onSlide)
    }
  }, [reduced])

  // Static hero for reduced motion: everything visible, nothing animated.
  if (reduced) {
    return (
      <section className="hero-static" data-hero>
        <img src="/photos/monument-aerial.jpg" alt="Aerial view of The Monument, a folded concrete cultural building" />
        <div className="hero-static-body">
          <p className="mono kicker">RAWALPINDI · PAKISTAN</p>
          <h1 className="hero-word">{site.wordmark}</h1>
          <p className="hero-tag">{site.tagline}</p>
          <p className="hero-static-line">
            Featured — The Monument: a folded concrete landmark, awarded at the National College of Arts, 2025.
          </p>
          <Link className="btn" to="/work/the-monument">
            Open project
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="hero-track" ref={track} data-hero aria-label="Featured project — The Monument">
      <div className="hero-stage">
        <div className="hero-aerial" ref={aerial}>
          <img src="/photos/monument-aerial.jpg" alt="Aerial view of The Monument, a folded concrete cultural building among trees" />
        </div>

        <div className="hero-dusk" ref={dusk} aria-hidden />
        <div className="hero-grain" aria-hidden />

        <div className="hero-arrive" ref={arrive}>
          <div className="hero-bar hero-bar-top" ref={barTop}>
            <span className="mono">ARRIVAL — SOUTH ELEVATION</span>
            <span className="mono ember">THE MONUMENT</span>
          </div>
          <div className="hero-strip" ref={strip}>
            <img src="/photos/monument-elevation.jpg" alt="Ground-level south elevation of The Monument: glass curtain wall between board-formed concrete walls" />
          </div>
          <div className="hero-bar hero-bar-bot" ref={barBot}>
            <div className="hero-stats mono">
              <span>TYPOLOGY — CULTURAL</span>
              <span>SITE — RAWALPINDI</span>
              <span>YEAR — 2025</span>
              <span className="ember">STATUS — AWARDED, NCA</span>
            </div>
            <Link className="btn btn-light" to="/work/the-monument">
              Open project <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="hero-intro" ref={intro}>
          <p className="mono kicker">RAWALPINDI · PAKISTAN</p>
          <h1 className="hero-word">{site.wordmark}</h1>
          <p className="hero-tag">{site.tagline}</p>
          <div className="hero-cue mono" aria-hidden>
            SCROLL TO APPROACH
            <span className="cue-line" />
          </div>
        </div>

        <aside className="hero-panel hero-panel-a" ref={panelA}>
          <p className="mono kicker">PROJECT 01 — CULTURAL</p>
          <h2>THE MONUMENT</h2>
          <p className="serif">A folded concrete landmark answering the ridgeline behind it.</p>
          <p className="mono dimmed">NCA MONUMENT DESIGN — 2025</p>
        </aside>

        <aside className="hero-panel hero-panel-b" ref={panelB}>
          <p className="mono kicker">CONCEPT</p>
          <p className="serif">
            Blind board-formed walls and full-height glass trade places around the plan; the roof lifts and creases
            like the hills, letting daylight in through the seams.
          </p>
          <p className="mono dimmed">CONCRETE · GLASS · FOLDED PLATE</p>
        </aside>

        <div className="hero-hud" aria-hidden ref={hud}>
          <span className="mono hud-phase" ref={hudPhase}>
            AERIAL SURVEY
          </span>
          <div className="hud-rail">
            <div className="hud-fill" ref={hudFill} />
          </div>
          <span className="mono" ref={hudPct}>
            000%
          </span>
          <span className="mono hud-alt" ref={hudAlt}>
            ALT 320 M
          </span>
        </div>

        <input
          className="hero-zoom"
          ref={slider}
          type="range"
          min={0}
          max={1000}
          defaultValue={0}
          aria-label="Zoom into The Monument"
        />
      </div>
    </section>
  )
}
