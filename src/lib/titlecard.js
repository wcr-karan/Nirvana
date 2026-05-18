import { useEffect, useState } from 'react'

/* ----------------------------------------------------------------
   titlecard.js — paints a film title card on a canvas and returns
   it as a PNG data URL, so BrushReveal can use it as a `cover`
   image: the brush literally wipes the movie's title card away to
   expose the product UI beneath.

   Canvas (unlike SVG-in-<img>) can use the page's loaded webfonts,
   so the card is set in real Anton at any DPR. Painted only after
   document.fonts resolves; until then the caller shows a plain
   dark placeholder so nothing flashes unstyled.
   ---------------------------------------------------------------- */

const FALLBACK = (() => {
  // 4x4 warm-black png-ish placeholder via svg (instant, no fonts)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="10"><rect width="16" height="10" fill="#171210"/></svg>`
  return 'data:image/svg+xml,' + encodeURIComponent(svg)
})()

export function paintTitleCard({
  title,
  index = '01',
  accent = '#C0001A',
  w = 1280,
  h = 800,
} = {}) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const c = document.createElement('canvas')
  c.width = Math.round(w * dpr)
  c.height = Math.round(h * dpr)
  const ctx = c.getContext('2d')
  ctx.scale(dpr, dpr)

  // stage
  ctx.fillStyle = '#14100d'
  ctx.fillRect(0, 0, w, h)

  // accent key light from the top corner
  const g = ctx.createRadialGradient(w * 0.28, h * 0.1, 40, w * 0.28, h * 0.1, w * 0.75)
  g.addColorStop(0, hexA(accent, 0.34))
  g.addColorStop(0.45, hexA(accent, 0.08))
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)

  // floor shadow
  const fg = ctx.createLinearGradient(0, h * 0.55, 0, h)
  fg.addColorStop(0, 'rgba(0,0,0,0)')
  fg.addColorStop(1, 'rgba(0,0,0,0.7)')
  ctx.fillStyle = fg
  ctx.fillRect(0, 0, w, h)

  // the title, in Anton, bleeding off the left edge a touch
  const size = Math.min(190, (w * 0.92) / Math.max(4, title.length) * 1.7)
  ctx.font = `${size}px Anton, 'Arial Narrow', sans-serif`
  ctx.textBaseline = 'alphabetic'
  ctx.shadowColor = hexA(accent, 0.55)
  ctx.shadowBlur = 26
  ctx.shadowOffsetX = 6
  ctx.shadowOffsetY = 6
  ctx.fillStyle = '#F2EADD'
  ctx.fillText(title.toUpperCase(), w * 0.06 - 8, h * 0.62)
  ctx.shadowColor = 'transparent'
  ctx.shadowBlur = 0
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0

  // gold rule under the title
  ctx.fillStyle = '#C9A44A'
  ctx.fillRect(w * 0.06, h * 0.68, w * 0.2, 2)

  // index + credit, tiny mono
  ctx.font = `500 17px "JetBrains Mono", monospace`
  ctx.fillStyle = 'rgba(201,164,74,0.9)'
  ctx.fillText(`NO. ${index} / 03`, w * 0.06, h * 0.74)
  ctx.fillStyle = 'rgba(242,234,221,0.5)'
  ctx.fillText('A FULL-STACK PRODUCTION BY KARAN THAKUR', w * 0.06, h * 0.785)

  // letterbox bars
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, w, 24)
  ctx.fillRect(0, h - 24, w, 24)

  return c.toDataURL('image/png')
}

function hexA(hex, a) {
  const n = hex.replace('#', '')
  const r = parseInt(n.slice(0, 2), 16)
  const g = parseInt(n.slice(2, 4), 16)
  const b = parseInt(n.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${a})`
}

/* Hook: resolves to the painted card once Anton + JetBrains Mono are
   ready; serves the dark placeholder before that (and on any error). */
export function useTitleCard(opts) {
  const [url, setUrl] = useState(FALLBACK)
  const { title, index, accent } = opts
  useEffect(() => {
    let alive = true
    const paint = () => { if (alive) setUrl(paintTitleCard({ title, index, accent })) }
    if (typeof document === 'undefined' || !document.fonts?.load) { paint(); return }
    Promise.all([
      document.fonts.load('120px Anton'),
      document.fonts.load('500 17px "JetBrains Mono"'),
    ]).then(paint, paint)
    return () => { alive = false }
  }, [title, index, accent])
  return url
}
