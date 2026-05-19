import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* On navigation, jump to the top (or to a hash target on the home
   page). Keyed on location.key so clicking the same anchor twice
   still re-scrolls. getElementById (not querySelector) so a stray
   hash like #1 can never throw and blank the app. */
export default function ScrollToTop() {
  const { key, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      let id = hash.slice(1)
      try { id = decodeURIComponent(id) } catch { /* keep raw */ }
      const el = document.getElementById(id)
      if (el) { el.scrollIntoView(); return }
    }
    window.scrollTo(0, 0)
  }, [key, hash])

  return null
}
