import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion, useHasFinePointer } from '../hooks/useMotionPrefs.js'
import './BrushReveal.css'

/* ----------------------------------------------------------------
   BrushReveal — the signature interaction.
   `cover` is shown by default; the cursor is a soft brush whose
   fading comet-trail wipes `cover` away to expose `reveal` beneath.

   Modes (chosen from capability, not guessed):
     canvas  — fine pointer + motion ok  → the real brush effect
     hover   — fine pointer + reduced    → cover crossfades to reveal on hover/focus
     static  — coarse pointer (touch)    → reveal (the work) shown by default

   The canvas is decorative (aria-hidden). All real copy is `children`,
   rendered in live DOM on top — never gated on the reveal.
   ---------------------------------------------------------------- */
export default function BrushReveal({
  cover,
  reveal,
  children,
  className = '',
  aspect = '4 / 3',
  hint = 'drag to reveal',
  glow = [30, 63, 224],
  focusable = false,
}) {
  const reduced = usePrefersReducedMotion()
  const fine = useHasFinePointer()
  const mode = !fine ? 'static' : reduced ? 'hover' : 'canvas'

  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (mode !== 'canvas') return
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')

    const off = document.createElement('canvas')
    const offCtx = off.getContext('2d')

    const coverImg = new Image()
    const revealImg = new Image()
    coverImg.src = cover
    revealImg.src = reveal

    const state = {
      cw: 0, ch: 0, dpr: 1,
      target: { x: -9999, y: -9999 },
      hovering: false,
      raf: 0,
      running: false,
      loaded: 0,
      R: 150,
    }

    const size = () => {
      const r = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      state.cw = r.width
      state.ch = r.height
      state.dpr = dpr
      state.R = Math.max(90, Math.min(Math.min(r.width, r.height) * 0.34, 240))
      for (const c of [canvas, off]) {
        c.width = Math.round(r.width * dpr)
        c.height = Math.round(r.height * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      offCtx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const drawCover = (c, img) => {
      const { cw, ch } = state
      if (!img.width) return
      const ir = img.width / img.height
      const rr = cw / ch
      let dw, dh, dx, dy
      if (ir > rr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; dy = 0 }
      else { dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2 }
      c.drawImage(img, dx, dy, dw, dh)
    }

    const settle = () => {
      ctx.clearRect(0, 0, state.cw, state.ch)
      drawCover(ctx, coverImg)
    }

    const draw = () => {
      const { cw, ch, R } = state
      const s = state.target

      ctx.clearRect(0, 0, cw, ch)
      drawCover(ctx, coverImg)

      if (state.hovering) {
        offCtx.globalCompositeOperation = 'source-over'
        offCtx.clearRect(0, 0, cw, ch)
        offCtx.beginPath()
        offCtx.arc(s.x, s.y, R, 0, Math.PI * 2)
        offCtx.fillStyle = 'rgba(0,0,0,1)'
        offCtx.fill()
        offCtx.globalCompositeOperation = 'source-in'
        drawCover(offCtx, revealImg)
        ctx.drawImage(off, 0, 0, cw, ch)
      } else {
        state.running = false
        settle()
        return
      }
      state.raf = requestAnimationFrame(draw)
    }

    const kick = () => {
      if (!state.running && state.loaded === 2) {
        state.running = true
        state.raf = requestAnimationFrame(draw)
      }
    }

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect()
      state.target.x = e.clientX - r.left
      state.target.y = e.clientY - r.top
      if (state.hovering) kick() // recover if the pointer was inside during load
    }
    const onEnter = (e) => {
      const r = wrap.getBoundingClientRect()
      state.target.x = e.clientX - r.left
      state.target.y = e.clientY - r.top
      state.hovering = true
      kick()
    }
    const onLeave = () => { state.hovering = false; kick() }

    // keyboard parity: focus parks the brush at the panel's centre so
    // the reveal is reachable without a pointer (wrap is tabbable when
    // `focusable` is set)
    const onFocus = () => {
      state.target.x = state.cw / 2
      state.target.y = state.ch / 2
      state.hovering = true
      kick()
    }
    const onBlur = () => { state.hovering = false; kick() }

    // count both load AND error so the canvas always initializes; the
    // <img> cover beneath provides the visual fallback if a source fails.
    const onSettled = () => {
      if (++state.loaded === 2) {
        settle()
        if (state.hovering) kick() // pointer arrived before the images did
      }
    }
    coverImg.onload = onSettled
    revealImg.onload = onSettled
    coverImg.onerror = onSettled
    revealImg.onerror = onSettled

    size()
    const ro = new ResizeObserver(() => { size(); if (!state.running) settle() })
    ro.observe(wrap)

    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerenter', onEnter)
    wrap.addEventListener('pointerleave', onLeave)
    wrap.addEventListener('focus', onFocus)
    wrap.addEventListener('blur', onBlur)

    return () => {
      cancelAnimationFrame(state.raf)
      ro.disconnect()
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerenter', onEnter)
      wrap.removeEventListener('pointerleave', onLeave)
      wrap.removeEventListener('focus', onFocus)
      wrap.removeEventListener('blur', onBlur)
    }
    // glow is read once at setup and is static per panel; excluding it
    // keeps a new inline array from tearing down the canvas every render.
  }, [mode, cover, reveal]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={wrapRef}
      className={`br ${className}`}
      data-mode={mode}
      style={{ aspectRatio: aspect }}
      tabIndex={focusable ? 0 : undefined}
    >
      <img className="br-layer br-reveal" src={reveal} alt="" aria-hidden="true" draggable="false" />
      <img className="br-layer br-cover" src={cover} alt="" aria-hidden="true" draggable="false" />
      {mode === 'canvas' && (
        <canvas ref={canvasRef} className="br-canvas" aria-hidden="true" />
      )}
      {hint && mode === 'canvas' && (
        <span className="br-hint mono" aria-hidden="true">{hint}</span>
      )}
      <div className="br-content">{children}</div>
    </div>
  )
}
