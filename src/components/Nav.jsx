import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import './Nav.css'

const LINKS = [
  { label: 'Projects', to: '/#projects', id: 'projects' },
  { label: 'About', to: '/#about', id: 'about' },
  { label: 'Contact', to: '/#contact', id: 'contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const { pathname } = useLocation()

  // transparent over the hero; solid with a gold hairline once scrolling
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  // section spy (home only): the active link keeps its underline drawn
  useEffect(() => {
    if (pathname !== '/') { setActive(''); return }
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return (
    <motion.header
      className={`nav ${scrolled ? 'is-scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <div className="nav-inner">
        <Link className="nav-logo display" to="/" aria-label="Karan Thakur — home">
          Karan <span>Thakur</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              className={`nav-link mono ${active === l.id ? 'is-active' : ''}`}
              aria-current={active === l.id ? 'true' : undefined}
              to={l.to}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="nav-toggle-label mono">{open ? 'Close' : 'Menu'}</span>
          <span className={`nav-burger ${open ? 'is-open' : ''}`} aria-hidden="true">
            <i /><i />
          </span>
        </button>
      </div>

      <div id="nav-menu" className={`nav-sheet ${open ? 'is-open' : ''}`} hidden={!open}>
        {LINKS.map((l) => (
          <Link
            key={l.to}
            className="nav-sheet-link display"
            to={l.to}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </motion.header>
  )
}
