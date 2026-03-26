import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const workItems = [
  {
    title: 'AI Engineer',
    org: 'E-Mongolia',
    period: 'March 2025 – Present',
    type: 'work',
    color: '#00d4ff',
    bullets: [
      'Building AI-powered systems and LLM-based solutions for government digital services',
      'Working with LangChain, LlamaIndex, Ollama, and HuggingFace to develop RAG pipelines and intelligent automation',
      'Designing and deploying production AI workflows leveraging Google Cloud Platform',
    ],
  },
  {
    title: 'Data Scientist',
    org: 'Novelsoft LLC',
    period: 'March 2023 – March 2025',
    type: 'work',
    color: '#00d4ff',
    bullets: [
      'Built the MOE Analytics Dashboard — 9 sub-dashboards on teacher shortage, supply, salary & demographics for the Ministry of Education and Science of Mongolia',
      'Designed ETL/ELT pipelines using Airflow, BigQuery and Google Dataflow on GCP',
      'Conducted Tableau workshops for the Ministry of Finance, Mongolia (2 separate sessions)',
      'Delivered a 4-day KNIME training course for the Mongolian Tax Administration',
      'Proficient in Tableau, Tableau Prep, KNIME, Power BI, Looker Studio, PostgreSQL, MongoDB, Redis and Oracle',
    ],
  },
]

const educationItems = [
  {
    title: "Bachelor's — Information Communication Engineering",
    org: 'Inha University, Incheon, Korea',
    period: 'March 2019 – 2023',
    type: 'education',
    color: '#a855f7',
    bullets: [
      'Full ILWOO Foundation scholarship (selected from 300+ applicants)',
      'Completed 5 four-credit courses in a single semester',
      'Computer Vision course ignited deep passion for AI and ML',
    ],
  },
  {
    title: "Bachelor's — Business / Finance (transferred)",
    org: 'National University of Mongolia',
    period: 'September 2017 – June 2018',
    type: 'education',
    color: '#a855f7',
    bullets: [
      'Discovered passion for programming and IT during this period',
      'Applied for ILWOO scholarship and was selected to study in Korea',
    ],
  },
  {
    title: 'High School',
    org: 'Bayan-Ulgii Empathy School (Mongolian-Turkish School)',
    period: 'September 2014 – June 2017',
    type: 'education',
    color: '#ec4899',
    bullets: [
      'Best student of Bayan-Ulgii province',
      'Gold medal — Mongolian National Math Olympiad, 3rd Round (2017)',
      'Silver medal — Mongolian National Informatics Olympiad, 3rd Round (2017)',
      'Basketball',
    ],
  },
  {
    title: 'Middle School — Special Mathematics Class',
    org: 'School No.1 of Ulaanbaatar',
    period: '2011 – 2014',
    type: 'education',
    color: '#ec4899',
    bullets: [
      'Enrolled in a special class focused on Mathematics',
      'Discovered passion for math and coding during these formative years',
      'Mentored by teacher J. Bayanbat, who later achieved 2nd place at the National Math Olympiad among teachers',
    ],
  },
]

function TimelineItem({ item, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="relative pl-10"
    >
      {/* Dot */}
      <div
        className="timeline-dot absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-current"
        style={{
          color: item.color,
          borderColor: item.color,
          background: '#050816',
        }}
      />

      {/* Card */}
      <div
        className="glass rounded-xl p-5 mb-6 transition-all duration-300 hover:border-opacity-40"
        style={{ border: `1px solid ${item.color}18` }}
      >
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-space font-semibold text-white text-base">{item.title}</h3>
            <p className="font-medium text-sm" style={{ color: item.color }}>{item.org}</p>
          </div>
          <span
            className="text-xs font-mono px-2.5 py-1 rounded-full shrink-0"
            style={{ background: `${item.color}12`, color: item.color, border: `1px solid ${item.color}22` }}
          >
            {item.period}
          </span>
        </div>

        <ul className="mt-3 space-y-1.5">
          {item.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-400">
              <span style={{ color: item.color }} className="mt-0.5 shrink-0">›</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="relative py-28 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 20% 50%, rgba(0,212,255,0.02) 0%, transparent 60%)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">My Journey</span>
          <h2 className="font-space font-bold text-4xl md:text-5xl text-white mt-3">
            Experience &{' '}
            <span className="gradient-text">Education</span>
          </h2>
        </motion.div>

        {/* Certifications & Teaching row */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* GCP Cert */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="glass rounded-xl p-5 flex gap-4 items-start"
            style={{ border: '1px solid rgba(0,212,255,0.18)' }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(0,212,255,0.1)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="1.8" className="w-5 h-5">
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <h4 className="font-space font-semibold text-white text-sm">Associate Cloud Engineer</h4>
                  <p className="text-[#00d4ff] text-xs font-medium mt-0.5">Google Cloud Platform</p>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full shrink-0" style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.2)' }}>
                  Valid 2024 – 2027
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Issued May 30, 2024 · Expires May 30, 2027</p>
            </div>
          </motion.div>

          {/* Workshops */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="glass rounded-xl p-5 flex gap-4 items-start"
            style={{ border: '1px solid rgba(168,85,247,0.18)' }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(168,85,247,0.1)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.8" className="w-5 h-5">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h4 className="font-space font-semibold text-white text-sm mb-2">Workshops & Teaching</h4>
              <ul className="space-y-1.5">
                <li className="flex gap-2 text-xs text-gray-400">
                  <span className="text-[#a855f7] shrink-0">›</span>
                  Tableau workshop — Ministry of Finance, Mongolia (×2 sessions)
                </li>
                <li className="flex gap-2 text-xs text-gray-400">
                  <span className="text-[#a855f7] shrink-0">›</span>
                  KNIME 4-day training course — Mongolian Tax Administration
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Work */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,212,255,0.1)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2" className="w-4 h-4">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <h3 className="font-space font-semibold text-white">Work Experience</h3>
            </motion.div>

            {/* Line */}
            <div className="relative">
              <div
                className="absolute left-[7px] top-0 bottom-0 w-px"
                style={{ background: 'linear-gradient(to bottom, #00d4ff44, transparent)' }}
              />
              {workItems.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} inView={inView} />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.1)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" className="w-4 h-4">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h3 className="font-space font-semibold text-white">Education</h3>
            </motion.div>

            <div className="relative">
              <div
                className="absolute left-[7px] top-0 bottom-0 w-px"
                style={{ background: 'linear-gradient(to bottom, #a855f744, transparent)' }}
              />
              {educationItems.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} inView={inView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
