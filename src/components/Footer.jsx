import Reveal from './Reveal.jsx'
import './Footer.css'

/* End of the print run: a centered billing block, registration
   crosses, and the one bumper line. */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <span className="footer-reg mono" aria-hidden="true" data-corner="tl">✕</span>
        <span className="footer-reg mono" aria-hidden="true" data-corner="tr">✕</span>

        <p className="footer-bill mono">Directed, designed, and developed by</p>
        <p className="footer-name display">Karan Thakur</p>
        <p className="footer-bill mono">
          Built with React and Vite · Set in Anton, Cormorant Garamond, and
          JetBrains Mono
        </p>

        <Reveal as="p" className="footer-return display" amount={0.8}>
          Karan Thakur will return
        </Reveal>

        <div className="footer-end">
          <span className="mono footer-year">© 2026</span>
          <button
            className="footer-top mono"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
