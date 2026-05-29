import Hero from '../components/Hero.jsx'
import Work from '../components/Work.jsx'
import About from '../components/About.jsx'
import Contact from '../components/Contact.jsx'

/* printer's slug between scenes — decorative print matter */
function Slug({ children }) {
  return <div className="print-slug" aria-hidden="true">{children}</div>
}

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Slug>sheet 02/05 · the work</Slug>
      <Work />
      <Slug>sheet 03/05 · the person</Slug>
      <About />
      <Slug>sheet 04/05 · the verdict</Slug>
      <Contact />
    </main>
  )
}
