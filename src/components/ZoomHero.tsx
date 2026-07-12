import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site'

// ---------------------------------------------------------------------------
// The flagship feature: a scroll-scrubbed flythrough of The Monument.
// Scrolling the 430vh track scrubs an actual aerial video — fast between
// shots, held flat while a shot is on screen so project information can
// reveal against it — then resolves into a letterboxed ground-level
// elevation photo. A slider gives the same journey without scrolling. All
// motion is written straight to the DOM inside one rAF loop; React never
// re-renders during the ride.
// ---------------------------------------------------------------------------

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const smooth = (t: number) => {
  const x = clamp01(t)
  return x * x * (3 - 2 * x)
}
/** Visibility window [a, b] with fade width f. */
const win = (p: number, a: number, b: number, f = 0.06) =>
  smooth((p - a) / f) * (1 - smooth((p - (b - f)) / f))

// Scroll-progress -> video-time keyframes. Equal `t` between two consecutive
// points is a hold (the shot freezes there); differing `t` is a scrubbed
// ramp between shots, eased with `smooth` so it accelerates then settles.
const RIDE: { p: number; t: number }[] = [
  { p: 0.0, t: 0.0 }, // aerial wide, whole building against the ridge — hold
  { p: 0.13, t: 0.0 },
  { p: 0.33, t: 1.25 }, // swipe down — closer aerial, still reads as the whole building
  { p: 0.46, t: 1.25 }, // hold
  { p: 0.66, t: 3.88 }, // swipe right — around to the folded roof / glass corner
  { p: 0.8, t: 3.88 }, // hold
  { p: 0.92, t: 4.85 }, // speed up — into the arrival shot
  { p: 1.0, t: 4.85 }, // hold, cross-fades into the static elevation photo
]

const videoTimeAt = (p: number) => {
  for (let i = 1; i < RIDE.length; i++) {
    const a = RIDE[i - 1]
    const b = RIDE[i]
    if (p <= b.p) {
      if (b.t === a.t) return a.t
      return a.t + (b.t - a.t) * smooth((p - a.p) / (b.p - a.p))
    }
  }
  return RIDE[RIDE.length - 1].t
}

// Desktop gets the upscaled all-intra encode (every frame a keyframe, so a
// scrub seek decodes exactly one frame); phones keep the small file.
const HD_SRC = '/video/monument-fly-1-hd.mp4'
const SD_SRC = '/video/monument-fly-1.mp4'

const PHASES: [number, string][] = [
  [0.13, 'AERIAL SURVEY'],
  [0.46, 'DESCENT'],
  [0.8, 'ORBIT'],
  [0.92, 'ARRIVAL'],
  [1.01, 'ON SITE'],
]

export default function ZoomHero() {
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [videoSrc] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 900px)').matches ? HD_SRC : SD_SRC,
  )

  const track = useRef<HTMLDivElement>(null)
  const aerial = useRef<HTMLDivElement>(null)
  const aerialVideo = useRef<HTMLVideoElement>(null)
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

    // iOS Safari won't seek a <video> that has never played. A silent
    // play/pause kick right away primes the decoder for programmatic scrubbing.
    const vid = aerialVideo.current
    if (vid) {
      vid.play()
        .then(() => vid.pause())
        .catch(() => {})
    }

    let top = 0
    let span = 1
    let curP = 0
    let primed = false
    const measure = () => {
      top = el.getBoundingClientRect().top + window.scrollY
      span = Math.max(1, el.offsetHeight - window.innerHeight)
      if (!primed) {
        // First measurement: snap straight to the real position instead of
        // easing up from 0, so a mid-page load/refresh doesn't rewind.
        curP = clamp01((window.scrollY - top) / span)
        primed = true
      }
      last = -1 // invalidate so the next apply() rewrites everything
      if (!raf) raf = requestAnimationFrame(apply)
    }

    const sl = slider.current
    const onSlide = () => {
      if (sl) window.scrollTo({ top: top + (Number(sl.value) / 1000) * span })
    }
    sl?.addEventListener('input', onSlide)

    let last = -1
    let raf = 0
    let lastTs = 0
    // Time-based easing (τ=50ms) so feel is identical at 60Hz and 120Hz.
    // 1 - e^(-16.67/50) ≈ 0.284, matching the previous per-tick EASE=0.28.
    const TAU = 50
    // Seek coalescing: only issue a currentTime write after the previous seek
    // completes, avoiding the seek-cancel storm that causes stutter.
    let pendingSeekT = -1
    const doSeek = (t: number) => {
      if (!vid || vid.readyState < 1) return
      pendingSeekT = t
      if (seekingRef) return
      seekingRef = true
      seekReallyPending = false
      try { vid.currentTime = t } catch { seekingRef = false }
    }
    // Use plain mutable vars (not React state) so we don't need a ref object.
    let seekingRef = false
    let seekReallyPending = false
    const onSeeked = () => {
      seekingRef = false
      if (seekReallyPending) doSeek(pendingSeekT)
    }
    vid?.addEventListener('seeked', onSeeked)

    const apply = (ts: number) => {
      const dt = lastTs ? Math.min(ts - lastTs, 100) : 16.67
      lastTs = ts
      const factor = 1 - Math.exp(-dt / TAU)
      const targetP = clamp01((window.scrollY - top) / span)
      curP += (targetP - curP) * factor
      if (Math.abs(targetP - curP) < 0.0004) curP = targetP
      const p = curP
      raf = p === targetP ? 0 : requestAnimationFrame(apply)
      if (p === last) return
      last = p

      // Scrub the flythrough. Dim and defocus as the ground stage takes over.
      const dim = smooth((p - 0.8) / 0.14)
      if (aerial.current) {
        aerial.current.style.filter = `brightness(${(1 - 0.72 * dim).toFixed(3)}) saturate(${(1 + 0.08 * smooth(p / 0.5)).toFixed(3)}) blur(${(4 * dim).toFixed(2)}px)`
      }
      if (vid && vid.readyState >= 1) {
        const t = videoTimeAt(p)
        if (Math.abs((pendingSeekT >= 0 ? pendingSeekT : vid.currentTime) - t) > 0.008) {
          if (seekingRef) {
            // Previous seek still in flight — just update the target; onSeeked will fire it.
            pendingSeekT = t
            seekReallyPending = true
          } else {
            doSeek(t)
          }
        }
      }

      // Dusk wash deepens across the ride.
      if (dusk.current) dusk.current.style.opacity = (0.5 * smooth((p - 0.15) / 0.6)).toFixed(3)

      // Intro wordmark.
      if (intro.current) {
        const o = 1 - smooth(p / 0.09)
        intro.current.style.opacity = o.toFixed(3)
        intro.current.style.transform = `translateY(${(-38 * smooth(p / 0.09)).toFixed(1)}px)`
        intro.current.style.visibility = o <= 0.001 ? 'hidden' : 'visible'
      }

      // Info panels — timed to the two holds (low pass, then the corner reflection).
      if (panelA.current) {
        const o = win(p, 0.34, 0.46, 0.04)
        panelA.current.style.opacity = o.toFixed(3)
        panelA.current.style.transform = `translateY(${(30 * (1 - smooth((p - 0.34) / 0.05))).toFixed(1)}px)`
      }
      if (panelB.current) {
        const o = win(p, 0.67, 0.8, 0.04)
        panelB.current.style.opacity = o.toFixed(3)
        panelB.current.style.transform = `translateY(${(30 * (1 - smooth((p - 0.67) / 0.05))).toFixed(1)}px)`
      }

      // Arrival: letterbox bars close in, the elevation stretches to width.
      const a = smooth((p - 0.85) / 0.13)
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
      const approach = smooth(p / 0.92)
      if (hudPct.current) hudPct.current.textContent = `${String(Math.round(p * 100)).padStart(3, '0')}%`
      if (hudAlt.current) hudAlt.current.textContent = `ALT ${String(Math.round(320 * (1 - approach))).padStart(3, '0')} M`
      if (hudFill.current) hudFill.current.style.height = `${(p * 100).toFixed(1)}%`
      if (hudPhase.current) {
        const phase = PHASES.find(([limit]) => p < limit)?.[1] ?? 'ON SITE'
        if (hudPhase.current.textContent !== phase) hudPhase.current.textContent = phase
      }
      if (sl && document.activeElement !== sl) sl.value = String(Math.round(p * 1000))
    }
    // Scroll-driven: wakes the eased rAF loop, which then keeps re-scheduling
    // itself each frame until curP has caught up to the scroll target.
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
      vid?.removeEventListener('seeked', onSeeked)
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
          <video
            ref={aerialVideo}
            src={videoSrc}
            poster="/photos/monument-aerial.jpg"
            muted
            playsInline
            preload="auto"
            aria-hidden
          />
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
          aria-label="Scrub the approach to The Monument"
        />
      </div>
    </section>
  )
}
