import { useParams, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import BrushReveal from '../components/BrushReveal.jsx'
import Reveal from '../components/Reveal.jsx'
import { projects, getProject, projectIndex } from '../data/projects.js'
import { useTitleCard } from '../lib/titlecard.js'
import './ProjectDetail.css'

/* The press kit: the film's title card under the brush, then the
   synopsis, production notes, and the payoff. */
export default function ProjectDetail() {
  const { id } = useParams()
  const project = getProject(id)
  const reduce = useReducedMotion()

  // hooks before any early return: paint the Anton title card the
  // brush wipes away (dark placeholder until fonts resolve)
  const cover = useTitleCard({
    title: project?.title ?? '',
    index: project?.index ?? '01',
    accent: project?.accent ?? '#C0001A',
  })

  if (!project) {
    return (
      <main id="main" className="pd-missing shell">
        <p className="pd-eyebrow mono">404</p>
        <h1 className="display pd-missing-title">No such project</h1>
        <Link className="btn btn-solid" to="/#projects">Back to projects</Link>
      </main>
    )
  }

  const i = projectIndex(id)
  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]
  const isGold = project.accent === '#C9A44A'
  const glow = isGold ? [201, 164, 74] : [192, 0, 26]
  const accentRgb = isGold ? '201, 164, 74' : '192, 0, 26'

  const group = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 } },
  }
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <main id="main" className="pd" style={{ '--accent-rgb': accentRgb }}>
      <div className="accent-line pd-line" />

      <motion.header className="pd-hero shell" variants={group} initial="hidden" animate="show">
        <motion.div variants={item}>
          <Link className="pd-back mono" to="/#projects">
            <span aria-hidden="true">←</span> All projects
          </Link>
        </motion.div>
        <motion.p className="pd-eyebrow mono" variants={item}>
          {project.index} / 0{projects.length} · {project.role} · {project.year}
        </motion.p>
        <motion.h1 className="pd-title display" variants={item}>{project.title}</motion.h1>
        <motion.p className="pd-tagline" variants={item}>{project.tagline}</motion.p>
        <motion.div className="pd-actions" variants={item}>
          <a className="btn btn-solid" href={project.demo}>Live demo</a>
          <a className="btn btn-ghost" href={project.github}>View code</a>
        </motion.div>
      </motion.header>

      <Reveal className="pd-showcase shell" amount={0.15}>
        <div className="pd-frame trims">
          <BrushReveal
            cover={cover}
            reveal={project.screen}
            aspect="16 / 9"
            hint="drag to reveal"
            glow={glow}
            focusable
          />
        </div>
        <span className="pd-showcase-tag mono" aria-hidden="true">
          press kit · interface preview · still nº {project.index}
        </span>
      </Reveal>

      <div className="pd-body shell">
        <aside className="pd-meta">
          <dl>
            <div><dt className="mono">Role</dt><dd>{project.role}</dd></div>
            <div><dt className="mono">Year</dt><dd>{project.year}</dd></div>
            <div className="pd-meta-stack">
              <dt className="mono">Stack</dt>
              <dd>
                <ul>
                  {project.stack.map((s) => <li key={s} className="mono">{s}</li>)}
                </ul>
              </dd>
            </div>
          </dl>
        </aside>

        <div className="pd-content">
          <Reveal as="section" className="pd-section" amount={0.4}>
            <h2 className="pd-h2 display">Synopsis</h2>
            <p className="prose pd-p">{project.problem}</p>
          </Reveal>

          <Reveal as="section" className="pd-section" amount={0.3}>
            <h2 className="pd-h2 display">Production notes</h2>
            <ul className="pd-build">
              {project.build.map((b, idx) => (
                <li key={idx}>
                  <span className="pd-build-n mono">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="pd-build-t prose">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section" className="pd-section" amount={0.4}>
            <h2 className="pd-h2 display">The payoff</h2>
            <p className="prose pd-p pd-outcome">{project.outcome}</p>
          </Reveal>
        </div>
      </div>

      <nav className="pd-pager shell" aria-label="More projects">
        <span className="pd-pager-head mono" aria-hidden="true">Next showing</span>
        <div className="pd-pager-row">
          <Link className="pd-pager-link pd-prev" to={`/projects/${prev.id}`}>
            <span className="mono">← Prev</span>
            <span className="pd-pager-name display">{prev.title}</span>
          </Link>
          <Link className="pd-pager-link pd-next" to={`/projects/${next.id}`}>
            <span className="mono">Next →</span>
            <span className="pd-pager-name display">{next.title}</span>
          </Link>
        </div>
      </nav>
    </main>
  )
}
