import ProjectCard from './ProjectCard.jsx'
import Reveal from './Reveal.jsx'
import { projects } from '../data/projects.js'
import './Work.css'

/* The One-Sheet Wall: three projects hung as printed movie posters.
   The cast list under the head gives a hurried reader all three
   names and jump links before any poster scrolls in. */
export default function Work() {
  return (
    <section className="work section" id="projects">
      <div className="shell work-head">
        <Reveal as="h2" className="work-title display cine-glow" amount={0.5}>Projects</Reveal>
        <Reveal as="p" className="work-lead" amount={0.6}>
          Three things I built end to end, hung like one-sheets.
          The real screens are under the posters.
        </Reveal>
        <Reveal as="nav" className="work-cast" amount={0.6} aria-label="Jump to a project">
          {projects.map((p) => (
            <a key={p.id} className="work-cast-link mono" href={`#sheet-${p.id}`}>
              {p.title}<span aria-hidden="true"> ↓</span>
            </a>
          ))}
        </Reveal>
      </div>

      <div className="shell work-wall">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} flip={i % 2 === 1} rest={ROTATIONS[i]} />
        ))}
      </div>
    </section>
  )
}

/* rest angles: tiny, alternating, so the wall reads hand-hung */
const ROTATIONS = ['-0.4deg', '0.6deg', '-0.3deg', '0.5deg']
