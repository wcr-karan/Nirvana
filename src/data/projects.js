/* ============================================================
   projects.js — real projects from Karan's resume.
   `github` / `demo` are placeholders ('#') until the working
   links are provided.

   Each project carries its one-sheet poster data:
     poster.tagline — the line printed under the key art
     poster.stamp   — rating-stamp letter + the true capability it encodes
     poster.billing — the billing-block credit line (decorative print)
   `screen` is the product still the curtain/brush reveals — swap
   for a real screenshot anytime (set it to an image URL).
   ============================================================ */

import { screenSVG } from '../lib/art.js'

const CRIMSON = '#C0001A'
const GOLD = '#C9A44A'

export const projects = [
  {
    id: 'indian-monitor',
    index: '01',
    title: 'Indian Monitor',
    role: 'Realtime',
    year: '2026',
    blurb:
      'A real-time intelligence dashboard for India: interactive geospatial maps, live media feeds, and multi-modal monitoring. I built the D3.js and MapLibre visualizations for AQI, weather, seismic, and demographic analytics.',
    tagline: 'A real-time intelligence dashboard for all of India, on one screen.',
    problem:
      'India’s live signals — air quality, weather, seismic activity, demographics, news — sit in a dozen scattered sources. There is no single screen that shows the country in real time.',
    build: [
      'A futuristic, real-time intelligence dashboard with interactive geospatial maps and multi-modal monitoring across India.',
      'High-performance visualizations on D3.js and MapLibre GL JS for dynamic AQI, weather, seismic, and demographic analytics.',
      'Live TV news streams and real-time sports updates folded into one responsive hub.',
      'Fast asset delivery and builds, optimized with Vite.',
    ],
    outcome: 'The whole country’s live signal — maps, AQI, weather, seismic, news — reading in real time on one screen.',
    stack: ['D3.js', 'MapLibre GL', 'JavaScript', 'Vite'],
    github: 'https://github.com/wcr-karan/India-Monitor',
    demo: 'https://india-monitor-wcr-karan.vercel.app/',
    accent: CRIMSON,
    poster: {
      tagline: 'India, in real time, on one screen.',
      stamp: { letter: 'L', label: 'LIVE & REAL-TIME', detail: 'GEOSPATIAL · MULTI-MODAL' },
      billing:
        'A REAL-TIME PRODUCTION · MAPS BY MAPLIBRE GL · VISUALS BY D3 · STREAMS LIVE · SHIPPED ON VITE',
    },
    screen: screenSVG({ kind: 'map', accent: CRIMSON }),
  },
  {
    id: 'legal-analyzer',
    index: '02',
    title: 'Legal Analyzer',
    role: 'NLP / AI',
    year: '2026',
    blurb:
      'Reads a legal document and flags the risky clauses. I built the NLP pipeline for PDF extraction, clause segmentation, and risk classification so manual review shrinks.',
    tagline: 'Upload a contract; it segments the clauses and flags the risky ones.',
    problem:
      'Reviewing legal documents by hand is slow and error-prone — risky clauses hide in pages of dense, unstructured text.',
    build: [
      'An NLP pipeline for PDF extraction, clause segmentation, and risk classification that cuts manual review effort.',
      'Batch clause processing and modular components to analyze large, unstructured legal documents at scale.',
      'Built on Python, Pandas, NLTK, and Scikit-learn with LangChain / OpenAI for automated risk detection.',
      'Interactive insights surfaced through Streamlit and Plotly.',
    ],
    outcome: 'A long contract goes in; segmented clauses and ranked risk flags come out, so review is targeted instead of page-by-page.',
    stack: ['Python', 'NLTK', 'Scikit-learn', 'LangChain', 'Streamlit'],
    github: 'https://github.com/Gautam-Bharadwaj/Pippo.ai',
    demo: 'https://pippo-ai.vercel.app',
    accent: GOLD,
    poster: {
      tagline: 'Every risky clause, flagged.',
      stamp: { letter: 'R', label: 'RISK-CLASSIFIED', detail: 'NLP PIPELINE · CLAUSE-LEVEL' },
      billing:
        'AN NLP PRODUCTION · EXTRACTION BY PYTHON · RISK BY SCIKIT-LEARN · REASONING BY LANGCHAIN · STAGED IN STREAMLIT',
    },
    screen: screenSVG({ kind: 'editor', accent: GOLD }),
  },
  {
    id: 'skill-swap',
    index: '03',
    title: 'Skill-Swap',
    role: 'Full-stack',
    year: '2026',
    blurb:
      'A peer-to-peer platform where people swap skills. I built the React and Node app with a TF-IDF cosine-similarity matcher, real-time Socket.io messaging, and JWT auth.',
    tagline: 'A peer-to-peer platform that matches people by what they want to learn.',
    problem:
      'Finding someone to trade skills with is hit-or-miss — there is no good way to match one person’s learning goals to another’s expertise.',
    build: [
      'A full-stack React and Node peer-to-peer knowledge-sharing platform with a TF-IDF cosine-similarity matcher on learning goals.',
      'An Express.js backend on Prisma ORM and SQLite with real-time Socket.io messaging and secure JWT authentication.',
      'A responsive React frontend in Tailwind CSS and Framer Motion, with dynamic community spaces and dashboards to manage swap requests.',
    ],
    outcome: 'Tell it what you want to learn; it matches you to the right person and opens a real-time room to coordinate the swap.',
    stack: ['React', 'Node', 'Prisma', 'Socket.io', 'JWT'],
    github: 'https://github.com/wcr-karan/skill-swap-new',
    demo: 'https://skill-swap-frontend-2yy3.onrender.com/login',
    accent: CRIMSON,
    poster: {
      tagline: 'Matched by what you want to learn.',
      stamp: { letter: 'M', label: 'SMART-MATCHED', detail: 'TF-IDF COSINE · REAL-TIME' },
      billing:
        'A FULL-STACK PRODUCTION · MATCHING BY TF-IDF · MESSAGING BY SOCKET.IO · AUTH BY JWT · STYLED IN TAILWIND',
    },
    screen: screenSVG({ kind: 'chat', accent: CRIMSON }),
  },
]

export const getProject = (id) => projects.find((p) => p.id === id)
export const projectIndex = (id) => projects.findIndex((p) => p.id === id)
