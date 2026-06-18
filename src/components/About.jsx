import { useRef, useEffect, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

const stats = [
  { value: '4+', label: 'Years Experience', numeric: 4, suffix: '+' },
  { value: '4', label: 'Major Projects', numeric: 4, suffix: '' },
  { value: '6', label: 'Languages Spoken', numeric: 6, suffix: '' },
  { value: 'ACE', label: 'GCP Certified', numeric: null, suffix: '' },
]

const tags = [
  'Python', 'SQL', 'LangChain', 'LlamaIndex',
  'HuggingFace', 'Ollama', 'TensorFlow', 'PyTorch',
  'Tableau', 'Power BI', 'KNIME', 'Airflow',
  'BigQuery', 'GCP', 'PostgreSQL', 'MongoDB',
]

const funFacts = [
  { icon: '◈', label: '6 Languages', sub: 'Mongolian, Korean, English, Russian + more', color: '#00f5ff' },
  { icon: '◆', label: 'Math Olympiad Gold', sub: 'Mongolian National Championship', color: '#ffd700' },
  { icon: '◇', label: 'Informatics Silver', sub: 'National Olympiad Medal', color: '#c0c0c0' },
  { icon: '◉', label: '1-of-300 Scholar', sub: 'Full ILWOO Foundation Scholarship', color: '#ff0080' },
]

const terminalLines = [
  { prompt: '$', text: 'whoami', delay: 0 },
  { prompt: '>', text: 'Nurjol Badyelkhan — AI Engineer', delay: 0.3, color: '#00f5ff' },
  { prompt: '$', text: 'cat location.txt', delay: 0.7 },
  { prompt: '>', text: 'Ulaanbaatar, Mongolia', delay: 1.0, color: '#00ff88' },
  { prompt: '$', text: 'cat education.txt', delay: 1.4 },
  { prompt: '>', text: 'B.Eng. Information Communication Engineering', delay: 1.7, color: '#00ff88' },
  { prompt: '>', text: 'Inha University, Korea  [ILWOO Foundation Scholar]', delay: 1.9, color: '#00ff88' },
  { prompt: '$', text: 'cat current_role.txt', delay: 2.3 },
  { prompt: '>', text: 'AI Engineer @ E-Mongolia', delay: 2.6, color: '#00f5ff' },
  { prompt: '>', text: 'Building LLM pipelines & AI-powered systems', delay: 2.8, color: '#aaa' },
  { prompt: '$', text: 'cat certs.txt', delay: 3.2 },
  { prompt: '>', text: 'Google Cloud ACE  (valid 2024–2027)', delay: 3.5, color: '#00ff88' },
  { prompt: '$', text: 'cat prev_exp.txt', delay: 3.9 },
  { prompt: '>', text: 'Novelsoft LLC — Data Analytics, ETL, GCP', delay: 4.2, color: '#aaa' },
  { prompt: '>', text: 'Dashboards: Ministry of Education (MN)', delay: 4.4, color: '#aaa' },
  { prompt: '>', text: 'Training: Ministry of Finance + MTA', delay: 4.6, color: '#aaa' },
  { prompt: '$', text: '_', delay: 5.0, blink: true },
]

function AnimatedCounter({ numeric, suffix, value, inView, color }) {
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!inView) return
    if (numeric === null) {
      // Reveal letter by letter for ACE
      const letters = value.split('')
      let idx = 0
      const iv = setInterval(() => {
        idx++
        setDisplay(value.slice(0, idx))
        if (idx >= letters.length) clearInterval(iv)
      }, 120)
      return () => clearInterval(iv)
    }
    const controls = animate(0, numeric, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate(v) {
        setDisplay(Math.round(v).toString() + suffix)
      },
    })
    return () => controls.stop()
  }, [inView, numeric, suffix, value])

  return (
    <span
      className="font-space font-bold text-3xl"
      style={{ color, textShadow: `0 0 18px ${color}99` }}
    >
      {display || (numeric === null ? value : '0' + suffix)}
    </span>
  )
}

function TerminalWindow({ inView }) {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (!inView) return
    setVisibleLines(0)
    terminalLines.forEach((line, i) => {
      const t = setTimeout(() => setVisibleLines(i + 1), line.delay * 1000)
      return () => clearTimeout(t)
    })
  }, [inView])

  return (
    <div
      className="glass rounded-2xl overflow-hidden"
      style={{
        border: '1px solid rgba(0,245,255,0.25)',
        boxShadow: '0 0 30px rgba(0,245,255,0.08), inset 0 0 30px rgba(0,245,255,0.02)',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          background: 'rgba(0,245,255,0.05)',
          borderBottom: '1px solid rgba(0,245,255,0.12)',
        }}
      >
        {/* Traffic-light dots */}
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57', boxShadow: '0 0 6px #ff5f5788' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e', boxShadow: '0 0 6px #febc2e88' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#28c840', boxShadow: '0 0 6px #28c84088' }} />
        </div>
        <span
          className="font-mono text-xs ml-2"
          style={{ color: 'rgba(0,245,255,0.6)' }}
        >
          nurjol@portfolio:~$ whoami
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-5 min-h-[320px] font-mono text-sm">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="flex gap-2 mb-1" style={{ opacity: 1 }}>
            <span style={{ color: line.color === '#aaa' ? 'rgba(0,245,255,0.4)' : 'rgba(0,245,255,0.55)', minWidth: '1ch' }}>
              {line.prompt}
            </span>
            {line.blink ? (
              <span
                className="cursor-blink"
                style={{ color: '#00f5ff' }}
              >
                {line.text}
              </span>
            ) : (
              <span style={{ color: line.color || 'rgba(255,255,255,0.7)' }}>
                {line.text}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const statColors = ['#00f5ff', '#ff0080', '#00ff88', '#00f5ff']

  return (
    <section id="about" className="relative py-28 px-6">
      {/* Radial ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 30% 50%, rgba(0,245,255,0.04) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 75% 60%, rgba(255,0,128,0.03) 0%, transparent 60%)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">About Me</span>
          <h2 className="font-space font-bold text-4xl md:text-5xl text-white mt-3">
            Who I <span className="gradient-text">Am</span>
          </h2>
        </motion.div>

        {/* Main grid: Terminal + Avatar | Stats + Fun Facts */}
        <div className="grid lg:grid-cols-2 gap-10 items-start mb-12">
          {/* LEFT: Terminal window */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <TerminalWindow inView={inView} />
          </motion.div>

          {/* RIGHT: Avatar + Stats + Fun Facts */}
          <div className="flex flex-col gap-8">
            {/* Avatar with speech bubble */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-start gap-5"
            >
              {/* Avatar */}
              <div className="flex-shrink-0 relative">
                <img
                  src="/avatars_pixelated/querying.png"
                  alt="Nurjol mascot"
                  className="float w-28 h-28 object-contain"
                  style={{
                    imageRendering: 'pixelated',
                    filter: 'drop-shadow(0 0 12px #00f5ff88) drop-shadow(0 0 24px #00f5ff44)',
                  }}
                />
                {/* Neon glow ring */}
                <div
                  className="absolute -inset-1 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(0,245,255,0.12) 0%, transparent 70%)',
                  }}
                />
              </div>

              {/* Speech bubble */}
              <div
                className="relative glass rounded-2xl rounded-tl-sm px-5 py-4 flex-1"
                style={{
                  border: '1px solid rgba(0,245,255,0.2)',
                  boxShadow: '0 0 20px rgba(0,245,255,0.06)',
                }}
              >
                {/* Bubble tail */}
                <div
                  className="absolute left-0 top-4 w-0 h-0"
                  style={{
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    borderRight: '10px solid rgba(0,245,255,0.2)',
                    marginLeft: '-10px',
                  }}
                />
                <p className="font-mono text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  <span style={{ color: '#00f5ff' }}>{'>'} </span>
                  Hey! I'm an AI Engineer building LLM systems in Mongolia.
                  <br />
                  <span style={{ color: '#00ff88' }}>{'>'} </span>
                  GCP certified, Olympiad medalist, polyglot.
                  <br />
                  <span style={{ color: '#ff0080' }}>{'>'} </span>
                  Let's build something cool!
                </p>
              </div>
            </motion.div>

            {/* Animated counter stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="grid grid-cols-2 gap-3"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.45, delay: 0.4 + i * 0.09 }}
                  whileHover={{ scale: 1.04, y: -3 }}
                  data-hover="true"
                  className="glass rounded-xl p-4 text-center cursor-default"
                  style={{
                    border: `1px solid ${statColors[i]}22`,
                    boxShadow: `0 0 0px ${statColors[i]}00`,
                    transition: 'box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 20px ${statColors[i]}33`}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 0px ${statColors[i]}00`}
                >
                  <AnimatedCounter
                    numeric={s.numeric}
                    suffix={s.suffix}
                    value={s.value}
                    inView={inView}
                    color={statColors[i]}
                  />
                  <div className="text-xs text-gray-500 mt-1 font-mono">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Fun Facts row */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mb-12"
        >
          <p
            className="section-label mb-4 text-center"
            style={{ letterSpacing: '0.2em' }}
          >
            Fun Facts
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {funFacts.map((fact, i) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                whileHover={{ y: -5, scale: 1.03 }}
                data-hover="true"
                className="glass rounded-xl p-4 text-center cursor-default"
                style={{
                  border: `1px solid ${fact.color}25`,
                  boxShadow: `0 4px 20px ${fact.color}0a`,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 4px 30px ${fact.color}33`; e.currentTarget.style.borderColor = `${fact.color}55` }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 4px 20px ${fact.color}0a`; e.currentTarget.style.borderColor = `${fact.color}25` }}
              >
                <div
                  className="text-2xl mb-2 font-mono"
                  style={{ color: fact.color, textShadow: `0 0 14px ${fact.color}88` }}
                >
                  {fact.icon}
                </div>
                <div className="font-space font-bold text-sm text-white mb-1">{fact.label}</div>
                <div className="font-mono text-xs text-gray-500 leading-tight">{fact.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact info + Tech tags */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="glass rounded-xl p-5"
            style={{ border: '1px solid rgba(0,245,255,0.12)' }}
          >
            <p className="section-label mb-4" style={{ letterSpacing: '0.18em' }}>Contact</p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Location', value: 'Ulaanbaatar, Mongolia', color: '#00f5ff' },
                { label: 'Email', value: 'Bmbi.nurjol@gmail.com', color: '#00ff88' },
                { label: 'Role', value: 'AI Engineer @ E-Mongolia', color: '#ff0080' },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 items-center text-sm font-mono">
                  <span
                    className="shrink-0 text-xs px-2 py-0.5 rounded"
                    style={{
                      color: item.color,
                      border: `1px solid ${item.color}44`,
                      background: `${item.color}0d`,
                      minWidth: '72px',
                      textAlign: 'center',
                    }}
                  >
                    {item.label}
                  </span>
                  <span className="text-gray-300">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tech stack tags */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            <p className="section-label mb-4" style={{ letterSpacing: '0.18em' }}>Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.04 }}
                  whileHover={{ y: -3, scale: 1.08 }}
                  data-hover="true"
                  className="text-xs font-mono px-3 py-1.5 rounded-full cursor-default"
                  style={{
                    background: 'rgba(0,245,255,0.06)',
                    border: '1px solid rgba(0,245,255,0.18)',
                    color: '#94a3b8',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#00f5ff'
                    e.currentTarget.style.borderColor = 'rgba(0,245,255,0.5)'
                    e.currentTarget.style.boxShadow = '0 0 14px rgba(0,245,255,0.25)'
                    e.currentTarget.style.background = 'rgba(0,245,255,0.1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#94a3b8'
                    e.currentTarget.style.borderColor = 'rgba(0,245,255,0.18)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.background = 'rgba(0,245,255,0.06)'
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
