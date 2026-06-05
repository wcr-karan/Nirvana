import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { usePrefersReducedMotion, useHasFinePointer } from '../hooks/useMotionPrefs.js'
import './Hero.css'

/* Canvas reveal component: handles dynamic mouse coordinates and touch fallback */
   the `bottom` image shows by default and a circle following the
   pointer wipes in the `top` image via source-in. Hardened here with
   DPR scaling, an offscreen canvas reused across frames, pointer
   (touch) support, image-error fallback, and a reduced-motion path.
   The mechanics are the site's centerpiece — change nothing here. */
const coverSrc = '/images/hero-cover.jpg'    // shown by default
const revealSrc = '/images/hero-reveal.jpg'  // wiped in by the brush

export default function Hero() {
  const heroRef = useRef(null)
  const canvasRef = useRef(null)
  const reduceFM = useReducedMotion()
  const reduced = usePrefersReducedMotion()
  const fine = useHasFinePointer()
  // touch gets the static fallback (the work shows by default) — the
  // circle reveal only makes sense with a hovering pointer
  const canvasMode = !reduced && fine

  useEffect(() => {
    if (!canvasMode) return
    const hero = heroRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const off = document.createElement('canvas')
    const offCtx = off.getContext('2d')

    const HEAD_RADIUS = 110 // brush reveal radius (reference used 180)
    const bottom = new Image()
    const top = new Image()
    bottom.src = coverSrc
    top.src = revealSrc

    let cw = 0, ch = 0, dpr = 1, raf = 0, loaded = 0
    let dead = false      // effect disposed: image onload must not restart the loop
    let onScreen = true   // pause the loop while the hero is scrolled away
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      cw = hero.offsetWidth
      ch = hero.offsetHeight
      for (const c of [canvas, off]) { c.width = Math.round(cw * dpr); c.height = Math.round(ch * dpr) }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const drawCover = (c, img) => {
      if (!img.width) return
      const ir = img.width / img.height, rr = cw / ch
      let dw, dh, dx, dy
      if (ir > rr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; dy = 0 }
      else { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2 }
      c.drawImage(img, dx, dy, dw, dh)
    }

    const onMove = (e) => {
      const r = hero.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    hero.addEventListener('pointermove', onMove)

    const running = () => !dead && onScreen && !document.hidden

    const draw = () => {
      if (!running()) { raf = 0; return }
      ctx.clearRect(0, 0, cw, ch)
      drawCover(ctx, bottom)

      offCtx.globalCompositeOperation = 'source-over'
      offCtx.clearRect(0, 0, cw, ch)
      offCtx.beginPath()
      offCtx.arc(mouse.x, mouse.y, HEAD_RADIUS, 0, Math.PI * 2)
      offCtx.fillStyle = 'rgba(0,0,0,1)'
      offCtx.fill()
      offCtx.globalCompositeOperation = 'source-in'
      drawCover(offCtx, top)
      ctx.drawImage(off, 0, 0, cw, ch)

      raf = requestAnimationFrame(draw)
    }
    const kick = () => {
      if (!raf && loaded === 2 && running()) raf = requestAnimationFrame(draw)
    }

    const onLoad = () => {
      if (dead) return
      if (++loaded === 2) { drawCover(ctx, bottom); kick() }
    }
    bottom.onload = onLoad
    top.onload = onLoad
    bottom.onerror = onLoad
    top.onerror = onLoad

    // pause the full-viewport redraw while the hero is offscreen or the
    // tab is hidden — the draw path itself stays untouched
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      kick()
    })
    io.observe(hero)
    const onVisibility = () => kick()
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      dead = true
      bottom.onload = top.onload = bottom.onerror = top.onerror = null
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      hero.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [canvasMode])

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceFM ? 0 : 0.2, delayChildren: 0.25 } },
  }
  const item = {
    hidden: reduceFM ? { opacity: 0 } : { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 13 } },
  }

  return (
    <section className="hero" id="top" ref={heroRef}>
      {canvasMode ? (
        <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      ) : (
        /* touch: the work shows by default; reduced motion + mouse:
           cover crossfades to the reveal on hover */
        <div className={`hero-canvas hero-fallback ${fine ? '' : 'is-touch'}`} aria-hidden="true">
          <img src={revealSrc} alt="" />
          <img className="hero-fallback-cover" src={coverSrc} alt="" />
        </div>
      )}

      <motion.div className="hero-content" variants={container} initial="hidden" animate="visible">
        <motion.div className="hero-side left" variants={item}>
          <span className="st-eyebrow">Full-stack developer</span>
          <h1 className="st-title">I BUILD{' '}<br />THE STACK</h1>
          <p className="st-desc">
            Front to back: interactive dashboards, real-time systems, and
            AI pipelines. Reliable, fast, and actually shipped.
          </p>
          <a className="st-btn" href="#projects">View projects</a>
        </motion.div>

        <motion.div className="hero-side right" variants={item}>
          <span className="st-eyebrow right-eyebrow">The person</span>
          <p className="st-title">Behind{' '}<br />the Code</p>
          <p className="st-text">
            Off the clock: chasing AI systems that ship, MUN debates, and
            NSS volunteer drives.
          </p>
        </motion.div>
      </motion.div>

      {canvasMode && (
        <span className="hero-hint mono" aria-hidden="true">drag to reveal</span>
      )}
      <span className="hero-billing mono" aria-hidden="true">
        Karan Thakur presents · a full-stack production · shot on React · graded in crimson and gold
      </span>
    </section>
  )
}
