/* ============================================================
   art.js — procedural SVG product stills (the layer the curtain
   or brush reveals). SVG-as-data-URL: self-contained, no binary
   assets. These are PLACEHOLDERS for real screenshots; swap by
   pointing `screen` in projects.js at an image URL.

   v2: brightened for the One-Sheet Wall. The old stills read as
   mud next to the posters — base luminance is up, panels are
   lifted, an accent header band and a top spotlight carry light
   into the frame so the reveal feels like a lit screen.
   ============================================================ */

export function svgToDataUrl(svg) {
  return 'data:image/svg+xml,' + encodeURIComponent(svg.replace(/\n\s*/g, ' ').trim())
}

const W = 1280, H = 800

/* lifted palette (was bg #15110E / panel #201912 — too close to the stage) */
const UI = {
  bg: '#211a14',
  panel: '#2e251c',
  panel2: '#3a2e22',
  line: '#4d3e30',
  ink: '#F2EADD',
  mute: '#8a7a68',
}

function windowFrame(inner, accent) {
  const m = 36
  const iw = W - 2 * m, ih = H - 2 * m
  return `
    <defs>
      <linearGradient id="scr" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2a211a"/><stop offset="100%" stop-color="#1c1610"/></linearGradient>
      <radialGradient id="scrlight" cx="50%" cy="0%" r="90%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.2"/>
        <stop offset="60%" stop-color="${accent}" stop-opacity="0"/></radialGradient>
      <filter id="cardsh" x="-20%" y="-20%" width="140%" height="160%">
        <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000" flood-opacity="0.45"/></filter>
      <clipPath id="ci"><rect x="0" y="0" width="${iw}" height="${ih - 54}" rx="2"/></clipPath>
    </defs>
    <rect width="${W}" height="${H}" fill="#171210"/>
    <rect x="${m}" y="${m}" width="${iw}" height="${ih}" rx="18" fill="url(#scr)" stroke="${UI.line}" stroke-width="1.5"/>
    <rect x="${m}" y="${m}" width="${iw}" height="${ih}" rx="18" fill="url(#scrlight)"/>
    <rect x="${m}" y="${m}" width="${iw}" height="54" fill="${accent}" opacity="0.16"/>
    <rect x="${m}" y="${m}" width="${iw}" height="54" fill="${UI.panel}" opacity="0.6"/>
    <line x1="${m}" y1="${m + 54}" x2="${m + iw}" y2="${m + 54}" stroke="${UI.line}" stroke-width="1.2"/>
    <circle cx="${m + 30}" cy="${m + 27}" r="6.5" fill="#C0001A"/>
    <circle cx="${m + 54}" cy="${m + 27}" r="6.5" fill="#C9A44A"/>
    <circle cx="${m + 78}" cy="${m + 27}" r="6.5" fill="#3a8f5a"/>
    <rect x="${W / 2 - 160}" y="${m + 16}" width="320" height="22" rx="11" fill="${UI.bg}"/>
    <rect x="${W / 2 - 144}" y="${m + 22}" width="120" height="10" rx="5" fill="${UI.mute}"/>
    <g transform="translate(${m}, ${m + 54})" clip-path="url(#ci)">${inner}</g>`
}
const bar = (x, y, w, h, fill, r = 5) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`
const card = (x, y, w, h, r = 14) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${UI.panel}" stroke="${UI.line}" stroke-width="1" filter="url(#cardsh)"/>`

function sidebar(accent, w = 248) {
  return `${bar(0, 0, w, 692, UI.panel, 0)}
    <line x1="${w}" y1="0" x2="${w}" y2="692" stroke="${UI.line}" stroke-width="1.2"/>
    ${bar(28, 30, 30, 30, accent, 8)}${bar(70, 38, 110, 13, UI.ink)}
    ${[0, 1, 2, 3, 4].map((i) => `${bar(28, 96 + i * 46, 20, 20, i === 1 ? accent : UI.mute, 5)}${bar(60, 100 + i * 46, i === 1 ? 150 : 120, 12, i === 1 ? UI.ink : UI.mute)}`).join('')}
    ${bar(28, 600, 192, 56, UI.panel2, 12)}<circle cx="56" cy="628" r="16" fill="${accent}"/>${bar(82, 618, 90, 11, UI.ink)}${bar(82, 636, 60, 9, UI.mute)}`
}

function dashboard(accent) {
  const vals = [120, 180, 95, 220, 150, 260, 200, 300, 240, 310]
  let chart = ''
  vals.forEach((v, i) => { chart += bar(360 + i * 64, 440 - v, 38, v, i % 3 === 0 ? accent : UI.panel2, 5) })
  const line = `<polyline points="${vals.map((v, i) => `${379 + i * 64},${440 - v - 26}`).join(' ')}" fill="none" stroke="${accent}" stroke-width="4" opacity="0.9"/>`
  return `${sidebar(accent)}
    ${bar(296, 36, 220, 18, UI.ink)}${bar(296, 64, 320, 12, UI.mute)}
    ${[0, 1, 2].map((i) => `${card(296 + i * 210, 100, 192, 110)}${bar(320 + i * 210, 122, 80, 11, UI.mute)}${bar(320 + i * 210, 146, 110, 26, i === 0 ? accent : UI.ink)}${bar(320 + i * 210, 184, 60, 9, '#4a9f6a')}`).join('')}
    ${card(296, 238, 844, 240)}${bar(320, 260, 140, 13, UI.ink)}
    <g transform="translate(-44,-14)">${chart}${line}</g>`
}

function chat(accent) {
  const rows = [[0, 340], [1, 240], [0, 420], [1, 200], [0, 280]]
  let msgs = ''
  rows.forEach(([side, w], i) => {
    const y = 56 + i * 104, x = side ? 1080 - w : 296
    msgs += `<rect x="${x}" y="${y}" width="${w}" height="68" rx="18" fill="${side ? accent : UI.panel}" stroke="${side ? 'none' : UI.line}" stroke-width="1" filter="url(#cardsh)"/>`
    if (!side) msgs += bar(x + 22, y + 18, w - 90, 11, UI.ink) + bar(x + 22, y + 40, w - 150, 11, UI.mute)
    else msgs += bar(x + 22, y + 18, w - 60, 11, '#1c130a') + bar(x + 22, y + 40, w - 120, 11, '#1c130a')
  })
  return `${sidebar(accent, 268)}
    ${[0, 1, 2, 3].map((i) => `<circle cx="42" cy="${100 + i * 92}" r="22" fill="${i === 0 ? accent : UI.panel2}"/>${bar(78, 84 + i * 92, 130, 13, UI.ink)}${bar(78, 108 + i * 92, 90, 10, UI.mute)}${i === 0 ? `<circle cx="200" cy="84" r="8" fill="#4a9f6a"/>` : ''}`).join('')}
    ${msgs}
    ${bar(296, 600, 760, 56, UI.panel, 28)}${bar(1004, 606, 52, 44, accent, 22)}`
}

function mapview(accent) {
  return `${bar(0, 0, 812, 692, '#241d16', 0)}
    <g stroke="${UI.line}" stroke-width="1.5" opacity="0.7">
      ${[1, 2, 3, 4, 5].map((i) => `<line x1="0" y1="${i * 115}" x2="812" y2="${i * 115}"/>`).join('')}
      ${[1, 2, 3, 4, 5, 6, 7].map((i) => `<line x1="${i * 112}" y1="0" x2="${i * 112}" y2="692"/>`).join('')}
    </g>
    <g filter="url(#cardsh)"><path d="M110 580 C 260 480 240 340 400 300 S 620 240 700 110" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round"/></g>
    <path d="M110 580 C 260 480 240 340 400 300 S 620 240 700 110" fill="none" stroke="${accent}" stroke-width="2.5" stroke-dasharray="1 14" stroke-linecap="round" opacity="0.5"/>
    <circle cx="110" cy="580" r="13" fill="${UI.ink}"/><circle cx="110" cy="580" r="22" fill="none" stroke="${UI.ink}" stroke-width="1.5" opacity="0.4"/>
    <circle cx="700" cy="110" r="16" fill="${accent}"/><circle cx="700" cy="110" r="30" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.5"/>
    <circle cx="400" cy="300" r="10" fill="#C9A44A"/>
    ${bar(812, 0, 328, 692, UI.bg, 0)}<line x1="812" y1="0" x2="812" y2="692" stroke="${UI.line}" stroke-width="1.2"/>
    ${[0, 1, 2].map((i) => `${card(840, 40 + i * 150, 268, 122)}<circle cx="872" cy="${72 + i * 150}" r="14" fill="${i === 0 ? accent : UI.panel2}"/>${bar(896, 64 + i * 150, 110, 13, i === 0 ? accent : UI.ink)}${bar(864, 100 + i * 150, 200, 10, UI.mute)}${bar(864, 122 + i * 150, 150, 10, UI.mute)}`).join('')}`
}

function editor(accent) {
  const tokens = [[60, accent], [150, UI.ink], [90, '#C9A44A'], [200, UI.mute], [110, '#7fa7ff']]
  let code = ''
  for (let i = 0; i < 13; i++) {
    let x = 116; const n = 2 + (i % 4)
    code += `<text x="48" y="${62 + i * 42}" fill="${UI.mute}" font-family="monospace" font-size="19">${i + 1}</text>`
    for (let j = 0; j < n; j++) { const [w, c] = tokens[(i + j) % 5]; code += bar(x, 48 + i * 42, w, 15, c, 3); x += w + 20 }
  }
  return `${bar(0, 0, 1200, 692, '#1c1611', 0)}${bar(0, 0, 300, 692, '#28201a', 0)}
    <line x1="300" y1="0" x2="300" y2="692" stroke="${UI.line}" stroke-width="1.2"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `${bar(26, 34 + i * 40, 16, 16, i === 0 ? accent : UI.mute, 4)}${bar(52, 36 + i * 40, i === 0 ? 180 : 130, 13, i === 0 ? accent : UI.line)}`).join('')}
    <g opacity="0.95">${code}</g>
    ${card(744, 486, 372, 176)}${bar(770, 510, 220, 12, '#4a9f6a')}
    ${[0, 1, 2].map((i) => bar(770, 540 + i * 30, [300, 200, 260][i], 10, UI.mute)).join('')}
    ${bar(1000, 26, 120, 40, accent, 8)}<rect x="1018" y="40" width="84" height="12" rx="6" fill="#1c130a"/>`
}

const SCREENS = { dashboard, chat, map: mapview, editor }

export function screenSVG({ kind = 'dashboard', accent = '#C0001A' } = {}) {
  const inner = (SCREENS[kind] || dashboard)(accent)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${windowFrame(inner, accent)}</svg>`
  return svgToDataUrl(svg)
}
