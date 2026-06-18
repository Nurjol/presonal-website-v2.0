import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Data ────────────────────────────────────────────────────────────────────

const workItems = [
  {
    title: 'AI Engineer',
    org: 'E-Mongolia',
    period: 'March 2025 – Present',
    type: 'work',
    color: '#00f5ff',
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
    color: '#00f5ff',
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
    type: 'university',
    color: '#ff0080',
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
    type: 'university',
    color: '#ff0080',
    bullets: [
      'Discovered passion for programming and IT during this period',
      'Applied for ILWOO scholarship and was selected to study in Korea',
    ],
  },
  {
    title: 'High School',
    org: 'Bayan-Ulgii Empathy School (Mongolian-Turkish School)',
    period: 'September 2014 – June 2017',
    type: 'school',
    color: '#00ff88',
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
    type: 'school',
    color: '#00ff88',
    bullets: [
      'Enrolled in a special class focused on Mathematics',
      'Discovered passion for math and coding during these formative years',
      'Mentored by teacher J. Bayanbat, who later achieved 2nd place at the National Math Olympiad among teachers',
    ],
  },
]

// ─── Animated Timeline Line ───────────────────────────────────────────────────

function AnimatedTimelineLine({ color, inView }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={inView ? { scaleY: 1 } : {}}
      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
      style={{
        position: 'absolute',
        left: '7px',
        top: 0,
        bottom: 0,
        width: '2px',
        background: `linear-gradient(to bottom, ${color}, ${color}44, transparent)`,
        transformOrigin: 'top',
        boxShadow: `0 0 8px ${color}66`,
      }}
    />
  )
}

// ─── Timeline Item ────────────────────────────────────────────────────────────

function TimelineItem({ item, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.4 + index * 0.13, ease: 'easeOut' }}
      className="relative pl-10 mb-6"
    >
      {/* Glowing pulsing dot */}
      <motion.div
        className="timeline-dot absolute left-0 top-2 w-4 h-4 rounded-full"
        animate={inView ? { boxShadow: [`0 0 0px ${item.color}`, `0 0 12px ${item.color}`, `0 0 0px ${item.color}`] } : {}}
        transition={{ repeat: Infinity, duration: 2.2, delay: index * 0.3 }}
        style={{
          background: '#050816',
          border: `2px solid ${item.color}`,
          boxShadow: `0 0 6px ${item.color}66`,
        }}
      />
      {/* Inner pixel dot */}
      <div
        style={{
          position: 'absolute',
          left: '5px',
          top: '7px',
          width: '6px',
          height: '6px',
          borderRadius: '1px',
          background: item.color,
          imageRendering: 'pixelated',
        }}
      />

      {/* Card */}
      <div
        className="glass rounded-xl p-5 transition-all duration-300 group"
        style={{
          border: `1px solid ${item.color}28`,
          boxShadow: `inset 0 0 20px ${item.color}05`,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = `${item.color}55`
          e.currentTarget.style.boxShadow = `inset 0 0 30px ${item.color}0a, 0 0 20px ${item.color}18`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = `${item.color}28`
          e.currentTarget.style.boxShadow = `inset 0 0 20px ${item.color}05`
        }}
        data-hover
      >
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3
              className="font-space font-bold text-white text-sm leading-tight"
              style={{ textShadow: `0 0 20px ${item.color}44` }}
            >
              {item.title}
            </h3>
            <p
              className="font-mono font-medium text-xs mt-1"
              style={{ color: item.color, textShadow: `0 0 10px ${item.color}88` }}
            >
              {item.org}
            </p>
          </div>
          {/* Period pill */}
          <span
            className="text-xs font-mono px-2.5 py-1 rounded-full shrink-0 tracking-wide"
            style={{
              background: `${item.color}10`,
              color: item.color,
              border: `1px solid ${item.color}33`,
              boxShadow: `0 0 8px ${item.color}22`,
            }}
          >
            {item.period}
          </span>
        </div>

        <ul className="space-y-1.5">
          {item.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-xs text-gray-400 leading-relaxed">
              <span
                className="mt-0.5 shrink-0 font-mono font-bold"
                style={{ color: item.color, textShadow: `0 0 8px ${item.color}` }}
              >
                &gt;
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

// ─── Section Header ──────────────────────────────────────────────────────────

function ColumnHeader({ icon, label, color, inView, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex items-center gap-3 mb-8"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: `${color}14`,
          border: `1px solid ${color}33`,
          boxShadow: `0 0 12px ${color}22`,
        }}
      >
        {icon}
      </div>
      <h3
        className="font-space font-bold text-white text-base tracking-wider uppercase"
        style={{ letterSpacing: '0.1em' }}
      >
        {label}
      </h3>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${color}44, transparent)` }} />
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="experience" className="relative py-28 px-6">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 15% 50%, rgba(0,245,255,0.025) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 85% 60%, rgba(255,0,128,0.025) 0%, transparent 60%)
          `,
        }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          {/* Floating avatar */}
          <motion.div
            className="float absolute -top-8 right-0 md:right-8 hidden md:block"
            style={{ width: '80px', height: '80px' }}
          >
            <img
              src="/avatars_pixelated/talking.png"
              alt="Mascot talking"
              style={{
                width: '80px',
                height: '80px',
                imageRendering: 'pixelated',
                filter: 'drop-shadow(0 0 12px #00f5ff) drop-shadow(0 0 24px #00f5ff66)',
              }}
            />
          </motion.div>

          <span className="section-label">My Journey</span>
          <h2 className="font-space font-bold text-4xl md:text-5xl text-white mt-3">
            Experience &amp;{' '}
            <span className="gradient-text">Education</span>
          </h2>

          {/* Scan line decoration */}
          <div
            className="mt-6 mx-auto"
            style={{
              width: '160px',
              height: '2px',
              background: 'linear-gradient(to right, transparent, #00f5ff, #ff0080, transparent)',
              boxShadow: '0 0 12px #00f5ff88',
            }}
          />
        </motion.div>

        {/* ── Featured Cards: Cert + Workshops ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="grid md:grid-cols-2 gap-6 mb-14"
        >
          {/* GCP Certification */}
          <div
            className="glass rounded-2xl p-5 flex gap-4 items-start relative overflow-hidden"
            style={{
              border: '1px solid rgba(0,245,255,0.28)',
              boxShadow: '0 0 24px rgba(0,245,255,0.08), inset 0 0 40px rgba(0,245,255,0.03)',
            }}
          >
            {/* Corner pixel accent */}
            <div
              style={{
                position: 'absolute',
                top: 0, right: 0,
                width: '40px', height: '40px',
                background: 'linear-gradient(225deg, rgba(0,245,255,0.15) 0%, transparent 60%)',
              }}
            />
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: 'rgba(0,245,255,0.1)',
                border: '1px solid rgba(0,245,255,0.3)',
                boxShadow: '0 0 16px rgba(0,245,255,0.2)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#00f5ff" strokeWidth="1.8" className="w-6 h-6">
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <p
                    className="text-xs font-mono uppercase tracking-widest mb-1"
                    style={{ color: '#00f5ff', opacity: 0.7 }}
                  >
                    Certification
                  </p>
                  <h4
                    className="font-space font-bold text-white text-sm"
                    style={{ textShadow: '0 0 16px rgba(0,245,255,0.4)' }}
                  >
                    Associate Cloud Engineer
                  </h4>
                  <p className="font-mono text-xs mt-0.5" style={{ color: '#00f5ff' }}>
                    Google Cloud Platform
                  </p>
                </div>
                <span
                  className="text-xs font-mono px-2.5 py-1 rounded-full shrink-0"
                  style={{
                    background: 'rgba(0,245,255,0.1)',
                    color: '#00f5ff',
                    border: '1px solid rgba(0,245,255,0.3)',
                    boxShadow: '0 0 8px rgba(0,245,255,0.2)',
                  }}
                >
                  Valid 2024 – 2027
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2 font-mono">
                Issued May 30, 2024 · Expires May 30, 2027
              </p>
            </div>
          </div>

          {/* Workshops & Teaching */}
          <div
            className="glass rounded-2xl p-5 flex gap-4 items-start relative overflow-hidden"
            style={{
              border: '1px solid rgba(255,0,128,0.28)',
              boxShadow: '0 0 24px rgba(255,0,128,0.08), inset 0 0 40px rgba(255,0,128,0.03)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0, right: 0,
                width: '40px', height: '40px',
                background: 'linear-gradient(225deg, rgba(255,0,128,0.15) 0%, transparent 60%)',
              }}
            />
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: 'rgba(255,0,128,0.1)',
                border: '1px solid rgba(255,0,128,0.3)',
                boxShadow: '0 0 16px rgba(255,0,128,0.2)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#ff0080" strokeWidth="1.8" className="w-6 h-6">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p
                className="text-xs font-mono uppercase tracking-widest mb-1"
                style={{ color: '#ff0080', opacity: 0.7 }}
              >
                Workshops &amp; Teaching
              </p>
              <h4
                className="font-space font-bold text-white text-sm mb-3"
                style={{ textShadow: '0 0 16px rgba(255,0,128,0.4)' }}
              >
                Instructor Experience
              </h4>
              <ul className="space-y-2">
                <li className="flex gap-2 text-xs text-gray-400">
                  <span
                    className="font-mono font-bold shrink-0"
                    style={{ color: '#ff0080', textShadow: '0 0 8px #ff0080' }}
                  >
                    &gt;
                  </span>
                  Tableau workshop — Ministry of Finance, Mongolia (×2 sessions)
                </li>
                <li className="flex gap-2 text-xs text-gray-400">
                  <span
                    className="font-mono font-bold shrink-0"
                    style={{ color: '#ff0080', textShadow: '0 0 8px #ff0080' }}
                  >
                    &gt;
                  </span>
                  KNIME 4-day training course — Mongolian Tax Administration
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* ── Two-Column Timeline ── */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">

          {/* Work Column */}
          <div>
            <ColumnHeader
              inView={inView}
              delay={0.18}
              color="#00f5ff"
              label="Work Experience"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="#00f5ff" strokeWidth="2" className="w-5 h-5">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              }
            />
            <div className="relative">
              <AnimatedTimelineLine color="#00f5ff" inView={inView} />
              {workItems.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} inView={inView} />
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <ColumnHeader
              inView={inView}
              delay={0.22}
              color="#ff0080"
              label="Education"
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="#ff0080" strokeWidth="2" className="w-5 h-5">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              }
            />
            <div className="relative">
              <AnimatedTimelineLine color="#ff0080" inView={inView} />
              {educationItems.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} inView={inView} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile avatar (shown below content on small screens) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center mt-12 md:hidden"
        >
          <img
            src="/avatars_pixelated/talking.png"
            alt="Mascot"
            className="float"
            style={{
              width: '72px',
              height: '72px',
              imageRendering: 'pixelated',
              filter: 'drop-shadow(0 0 14px #00f5ff) drop-shadow(0 0 28px #00f5ff66)',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
