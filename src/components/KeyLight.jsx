import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion, useHasFinePointer } from '../hooks/useMotionPrefs.js'
import './KeyLight.css'

/* ----------------------------------------------------------------
   KeyLight — the site-wide cinematic key light. ONE soft light
   source travels with the viewer down the whole page, extending the
   hero's "a moving light reveals what's hidden" into every section.

   - desktop fine pointer: the light eases toward the cursor (same
     lerp feel as the hero brush).
   - scroll: the light's hue crossfades crimson (the builder, top) →
     gold (the signal, bottom), and when there's no pointer it drifts
     downward as you scroll, so the light literally walks the reel.
   - faint concentric "signal" rings ride the light head (the
     bat-signal motif from the reference, now in motion).
   - reduced motion / touch: a static, gently-placed light, no rAF.

   Decorative (aria-hidden); sits behind all content and adds light via
   `screen` blend. Screen LIFTS the dark stage, so it can lower contrast
   if pushed — orb peak alphas are budgeted (see KeyLight.css) to keep
   --ink-soft / --gold comfortably above AA at the brightest core.
   ---------------------------------------------------------------- */
export default function KeyLight() {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  const fine = useHasFinePointer()
  const animate = !reduced

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const set = (x, y, mix) => {
      el.style.setProperty('--x', `${x}px`)
      el.style.setProperty('--y', `${y}px`)
      el.style.setProperty('--mix', mix.toFixed(3))
    }

    // cached layout metrics — refreshed only on resize, never in the
    // scroll/rAF hot path (no forced reflow per frame).
    let vw = window.innerWidth
    let vh = window.innerHeight
    let maxScroll = Math.max(0, document.documentElement.scrollHeight - vh)
    const measure = () => {
      vw = window.innerWidth
      vh = window.innerHeight
      maxScroll = Math.max(0, document.documentElement.scrollHeight - vh)
    }
    const scrollMix = () => (maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0)
    // resting target when there's no live pointer: centred, walking
    // downward with scroll so the beam travels the page.
    const restingTarget = () => ({ x: vw * 0.58, y: vh * (0.26 + 0.5 * scrollMix()) })

    if (!animate) {
      // reduced motion: one fixed, gently-placed light. No scroll/pointer
      // tracking — recentre only on resize so it never animates.
      const place = () => { measure(); set(vw * 0.58, vh * 0.32, 0.18) }
      place()
      window.addEventListener('resize', place)
      return () => window.removeEventListener('resize', place)
    }

    const start = restingTarget()
    const target = { ...start }
    const smooth = { ...start }
    let mix = scrollMix()
    let mixSmooth = mix
    let hasPointer = false
    let raf = 0
    let idle = 0

    const wake = () => {
      if (!raf) { el.classList.add('is-live'); raf = requestAnimationFrame(tick) }
    }
    const stop = () => { raf = 0; el.classList.remove('is-live') }

    const tick = () => {
      if (!hasPointer) { const r = restingTarget(); target.x = r.x; target.y = r.y }
      const dx = target.x - smooth.x
      const dy = target.y - smooth.y
      const dm = mix - mixSmooth
      smooth.x += dx
      smooth.y += dy
      mixSmooth += dm * 0.06
      set(smooth.x, smooth.y, mixSmooth)

      if (Math.abs(dx) < 0.15 && Math.abs(dy) < 0.15 && Math.abs(dm) < 0.001) {
        if (++idle > 30) { stop(); return } // settle: stop burning frames
      } else { idle = 0 }
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      if (e.pointerType === 'touch') return
      hasPointer = true
      target.x = e.clientX
      target.y = e.clientY
      idle = 0
      wake()
    }
    const onScroll = () => { mix = scrollMix(); idle = 0; wake() }
    const onResize = () => { measure(); idle = 0; wake() }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    set(smooth.x, smooth.y, mixSmooth)
    wake()

    return () => {
      cancelAnimationFrame(raf)
      el.classList.remove('is-live')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [animate, fine])

  return (
    <div className="keylight" ref={ref} aria-hidden="true">
      <div className="kl-base" />
      <div className="kl-orb kl-crimson" />
      <div className="kl-orb kl-gold" />
      <svg className="kl-rings" width="760" height="760" viewBox="0 0 760 760">
        {[120, 200, 290, 380].map((r, i) => (
          <circle key={r} cx="380" cy="380" r={r} className={i === 1 ? 'kl-ring-key' : ''} />
        ))}
      </svg>
    </div>
  )
}
