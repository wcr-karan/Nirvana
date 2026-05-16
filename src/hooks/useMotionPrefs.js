import { useEffect, useState } from 'react'

/* True when the user asked for reduced motion. Reactive to changes. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

/* True when the primary pointer is fine + hover-capable (desktop mouse).
   The brush-reveal canvas only makes sense there; touch gets the
   crossfade fallback. */
export function useHasFinePointer() {
  const [fine, setFine] = useState(
    () => typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const on = () => setFine(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return fine
}
