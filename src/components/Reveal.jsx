import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/useMotionPrefs.js'

/* Scroll-reveal that NEVER leaves content hidden.
   Default (no JS / observer never fires / headless render) = visible.
   When motion is allowed, JS sets the pre-state and an
   IntersectionObserver animates it in; a hard timeout guarantees
   the element resolves to visible even if the observer never fires.

   Variants (see index.css): '' fade-up · 'pinup' poster settle
   (reads --rest from style) · 'stamp' rating-card stamp. */
export default function Reveal({
  as: Tag = 'div',
  className = '',
  children,
  delay = 0,
  amount = 0.18,
  variant = '',
  style,
  ...rest
}) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (reduced) { setShown(true); return }
    const el = ref.current
    if (!el) return
    let io
    try {
      io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) { setShown(true); io.disconnect() } },
        { threshold: amount },
      )
      io.observe(el)
    } catch {
      setShown(true)
      return
    }
    // safety net for a broken/never-firing observer: resolve to visible,
    // but ONLY if the element is actually on screen — otherwise the page's
    // entire choreography completes invisibly 1.5s after load.
    const fallback = setTimeout(() => {
      const r = ref.current?.getBoundingClientRect()
      if (r && r.top < window.innerHeight && r.bottom > 0) setShown(true)
    }, 1500)
    return () => { io.disconnect(); clearTimeout(fallback) }
  }, [reduced, amount])

  return (
    <Tag
      ref={ref}
      className={`reveal${variant ? ` reveal-${variant}` : ''} ${shown ? 'is-in' : ''} ${className}`}
      style={{ ...(delay ? { transitionDelay: `${delay}ms` } : null), ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
