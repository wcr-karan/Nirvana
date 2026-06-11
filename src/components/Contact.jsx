import { useState, useRef, useEffect } from 'react'
import Reveal from './Reveal.jsx'
import './Contact.css'

const EMAIL = 'karan.thakur@adypu.edu.in'
// working URLs to be provided — placeholders for now
const LINKS = [
  { label: 'GitHub', href: 'https://github.com/wcr-karan' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/karan-thakur-944500264' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/nvm-karan/' },
  { label: 'Résumé', href: 'https://drive.google.com/file/d/1HO0lq8t7sWgtI2rqOGOAYr0w_2szLDuo/view?usp=sharing' },
]

/* Contact page details, social links and email interaction logic 
seats itself once the card crosses 60% visibility. */
export default function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <section className="contact section" id="contact">
      <div className="shell">
        <Reveal className="rating-card" amount={0.3}>
          <div className="rc-inner">
            <Reveal
              className="rc-stamp"
              variant="stamp"
              amount={0.6}
              delay={400}
              aria-hidden="true"
            >
              <b className="display">H</b>
              <span className="mono">Hireable<br />open to work now</span>
            </Reveal>

            <p className="rc-pre mono">The following developer has been approved for</p>
            <h2 className="rc-head display">All audiences</h2>
            <p className="rc-sub">
              Open to work now: full-stack roles, anywhere the work is good.
              No forms and no trackers; email lands in my inbox and I reply fast.
            </p>

            <div className="rc-email">
              <a className="rc-email-link display" href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <button className="rc-copy mono" onClick={copy} aria-live="polite">
                {copied ? 'copied ✓' : 'copy'}
              </button>
            </div>

            <ul className="rc-links">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    className="rc-link mono"
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    {l.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
