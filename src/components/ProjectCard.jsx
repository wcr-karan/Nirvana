import { Link } from 'react-router-dom'
import PosterFrame from './PosterFrame.jsx'
import Reveal from './Reveal.jsx'

/* One row of the wall: the one-sheet poster + its museum placard.
   The placard carries every load-bearing fact at body size; the
   poster's micro print is decorative duplication. */
export default function ProjectCard({ project, flip, rest }) {
  const p = project
  return (
    <article className={`prow ${flip ? 'is-flip' : ''}`} id={`sheet-${p.id}`}>
      <Reveal
        className="prow-poster"
        variant="pinup"
        amount={0.22}
        style={{ '--rest': rest }}
      >
        <PosterFrame project={p} />
      </Reveal>

      <Reveal className="prow-placard" amount={0.3} delay={120}>
        <p className="placard-bill mono">
          {p.index} · {p.role} · {p.year}
        </p>
        <h3 className="placard-title display">
          <Link to={`/projects/${p.id}`}>{p.title}</Link>
        </h3>
        <p className="placard-blurb prose">{p.blurb}</p>
        <p className="placard-stack mono" aria-label="Tech stack">
          {p.stack.map((s, i) => [
            // separator glued inside the nowrap span so a wrap always ends
            // a line with '·'; the plain space BETWEEN spans is the break
            // opportunity (without it the whole line is one unbreakable run)
            <span key={s} style={{ whiteSpace: 'nowrap' }}>
              {s}{i < p.stack.length - 1 && ' ·'}
            </span>,
            i < p.stack.length - 1 ? ' ' : null,
          ])}
        </p>
        <div className="placard-links">
          <Link className="btn btn-ghost placard-cta" to={`/projects/${p.id}`}>
            Open case file <span aria-hidden="true">→</span>
          </Link>
          <a className="link" href={p.github}>
            Code <span aria-hidden="true">↗</span>
          </a>
          <a className="link" href={p.demo}>
            Demo <span aria-hidden="true">↗</span>
          </a>
        </div>
      </Reveal>
    </article>
  )
}
