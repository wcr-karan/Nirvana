import BrushReveal from './BrushReveal.jsx'
import Reveal from './Reveal.jsx'
import './About.css'

/* the credits grammar: role left, names right. OSS gets its own
   credit pair so a recruiter can't miss it. */
const CAST = [
  { role: 'Frontend', names: 'React · Tailwind · Framer Motion · TypeScript' },
  { role: 'Backend', names: 'Node · Express · Socket.io · Prisma ORM' },
  { role: 'Data & AI', names: 'Python · NLP · LangChain · Scikit-learn' },
  { role: 'Also featuring', names: 'real-time dashboards in D3.js & MapLibre GL', star: true },
]

/* reuse the hero's two photographs — the brush exposes the candid
   beneath the lit frame, the same interaction that opens the site. */
const PORTRAIT_COVER = '/images/hero-cover.jpg'
const PORTRAIT_REVEAL = '/images/hero-reveal.jpg'

export default function About() {
  return (
    <section className="about section scene-deep" id="about">
      <div className="shell about-grid">
        <Reveal className="about-portrait" amount={0.3}>
          <div className="about-frame trims">
            <BrushReveal
              cover={PORTRAIT_COVER}
              reveal={PORTRAIT_REVEAL}
              aspect="4 / 5"
              hint="drag to reveal"
              glow={[201, 164, 74]}
              focusable
            />
          </div>
          <span className="about-portrait-cap mono">
            <span className="about-cap-dot" aria-hidden="true" />the person behind the code
          </span>
          <span className="about-portrait-slug mono" aria-hidden="true">
            still from production · 2026
          </span>
        </Reveal>

        <Reveal className="about-body" amount={0.3} delay={80}>
          <h2 className="about-head display cine-glow">
            I sweat the surface <span className="about-amp">&amp;</span> the system.
          </h2>
          <blockquote className="about-quote">
            <p>If it's worth building, it's worth making it feel good to use.</p>
            <footer className="about-quote-by mono" aria-hidden="true">
              Karan Thakur, on Karan Thakur
            </footer>
          </blockquote>

          <p className="prose about-p about-p-lead">
            I'm Karan, a full-stack developer and aspiring AI engineer. I build
            across the stack: React and Node on the web, real-time systems, and
            AI pipelines (NLP, LLMs) that turn complex data into something people
            can actually use. I care about the parts people skip: clean clause
            segmentation, sockets that don't drop, the dashboard that stays live.
          </p>
          <p className="prose about-p">
            Outside the editor I've led <strong>NSS</strong> volunteer drives and
            represented at <strong>Model UN</strong> conferences — community
            coordination at scale. Right now I'm a CS undergrad at Newton School
            of Technology, after a team that ships often and sweats how the work
            feels.
          </p>

          <p className="about-cast-head mono">Cast of technologies</p>
          <dl className="about-cast">
            {CAST.map((c) => (
              <div className={`about-credit ${c.star ? 'is-star' : ''}`} key={c.role}>
                <dt className="mono">{c.role}</dt>
                <dd>{c.names}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
