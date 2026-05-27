import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion, useHasFinePointer } from '../hooks/useMotionPrefs.js'
import './PosterFrame.css'

/* ----------------------------------------------------------------
   PosterFrame — one project as a printed movie one-sheet.
   Shared anatomy (strip · art · key-art window · tagline · stamp ·
   billing · slug · trim marks) with bespoke typographic art per
   project, keyed by project id.

   The key-art window holds the real product still behind a printed
   "curtain" panel:
     fine pointer — hover/focus wipes the curtain up; it also
       auto-peeks once when the poster crosses mid-viewport, so a
       reader who never hovers still sees the product.
     touch — the still shows by default; a real button swaps
       between screen and poster art.
   All micro print (strip, billing, slug, stamp) is decorative and
   duplicated at body size in the placard, so it's aria-hidden.
   ---------------------------------------------------------------- */
export default function PosterFrame({ project }) {
  const { id, title, index, year, screen, accent, poster } = project
  const fine = useHasFinePointer()
  const reduced = usePrefersReducedMotion()
  const [showStill, setShowStill] = useState(!fine) // touch: lead with product
  const [peek, setPeek] = useState(false)
  const ref = useRef(null)

  // keep default in sync if the pointer capability flips (e.g. iPad + mouse)
  useEffect(() => { setShowStill(!fine) }, [fine])

  // auto-peek once: open the curtain for a beat at ~55% visibility
  useEffect(() => {
    if (!fine || reduced) return
    const el = ref.current
    if (!el) return
    let t = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          io.disconnect()
          setPeek(true)
          t = setTimeout(() => setPeek(false), 1700)
        }
      },
      { threshold: 0.55 },
    )
    io.observe(el)
    return () => { io.disconnect(); clearTimeout(t) }
  }, [fine, reduced])

  const rgb = accent === '#C9A44A' ? 'var(--gold-rgb)' : 'var(--crimson-rgb)'

  return (
    <div
      ref={ref}
      className={`sheet trims sheet-${id} ${peek ? 'is-peek' : ''} ${showStill ? 'is-still' : ''}`}
      style={{ '--acc': accent, '--acc-rgb': rgb }}
    >
      <div className="sheet-paper">
        <span className="sheet-strip mono" aria-hidden="true">Karan Thakur presents</span>

        <div className="sheet-art" aria-hidden="true">
          {id === 'indian-monitor' && (
            <>
              <span className="sa-title display"><span>Indian</span><span>Monitor</span></span>
              <svg className="sa-route" viewBox="0 0 300 360" preserveAspectRatio="none">
                <path d="M22 332 C 90 300 70 210 150 180 S 230 110 262 44" fill="none" stroke="#C9A44A" strokeWidth="2.5" strokeDasharray="1 9" strokeLinecap="round" />
                <circle cx="22" cy="332" r="5" fill="#F2EADD" />
                <circle cx="262" cy="44" r="9" fill="var(--acc)" />
                <circle cx="262" cy="44" r="17" fill="none" stroke="var(--acc)" strokeWidth="1.4" opacity="0.55" />
                <circle cx="262" cy="44" r="27" fill="none" stroke="var(--acc)" strokeWidth="1.2" opacity="0.3" />
              </svg>
            </>
          )}
          {id === 'legal-analyzer' && (
            <>
              <span className="sa-field" />
              <span className="sa-query display">§</span>
              <span className="sa-title display sa-title-dark">Legal Analyzer</span>
            </>
          )}
          {id === 'skill-swap' && (
            <>
              <span className="sa-title display sa-echo" data-echo="Skill-Swap">Skill-Swap</span>
              <span className="sa-wire" />
            </>
          )}
        </div>

        <div className="sheet-window">
          <img src={screen} alt={`${title} — interface preview`} draggable="false" />
          <div className="sheet-curtain" aria-hidden="true">
            <span className="sc-letter display">{poster.stamp.letter}</span>
            <span className="sc-label mono">Still Nº {index}</span>
          </div>
          {/* two-state command button: the swapping label IS the state cue */}
          <button
            type="button"
            className="sheet-flip mono"
            onClick={() => setShowStill((s) => !s)}
          >
            {showStill ? 'View poster' : 'View screen'}
          </button>
        </div>

        <p className="sheet-tagline">{poster.tagline}</p>

        <div className="sheet-foot" aria-hidden="true">
          <span className="sheet-stamp">
            <b className="display">{poster.stamp.letter}</b>
            <span>
              <em>{poster.stamp.label}</em>
              {poster.stamp.detail}
            </span>
          </span>
          <p className="sheet-billing">{poster.billing}</p>
        </div>

        <span className="sheet-slug mono" aria-hidden="true">
          One-sheet {index}/03 · {title} · {year}
        </span>
      </div>
    </div>
  )
}
