import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const skillCategories = [
  {
    title: 'Languages & Core',
    color: '#00f5ff',
    label: 'LANG_CORE',
    icon: '{ }',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'SQL', level: 90 },
      { name: 'C++', level: 82 },
    ],
  },
  {
    title: 'AI / LLM Engineering',
    color: '#ff0080',
    label: 'AI_LLM',
    icon: '⟡',
    skills: [
      { name: 'LangChain / LlamaIndex', level: 85 },
      { name: 'HuggingFace', level: 82 },
      { name: 'TensorFlow / PyTorch', level: 75 },
      { name: 'OpenCV', level: 80 },
    ],
  },
  {
    title: 'Data & Analytics',
    color: '#00ff88',
    label: 'DATA_OPS',
    icon: '◈',
    skills: [
      { name: 'Tableau / Power BI', level: 88 },
      { name: 'KNIME', level: 85 },
      { name: 'Google Cloud / BigQuery', level: 85 },
      { name: 'Airflow / ETL', level: 80 },
    ],
  },
]

const extraBadges = [
  'Ollama', 'LlamaIndex', 'Redis', 'PostgreSQL', 'MongoDB', 'Oracle',
  'Google Looker', 'Dataflow', 'Tableau Prep', 'XGBoost', 'OpenGL',
  'Pandas', 'Git', 'Linux', 'Jupyter', 'Seaborn',
]

// Radial progress arc SVG
function RadialLevel({ level, color, size = 40 }) {
  const r = (size - 5) / 2
  const circ = 2 * Math.PI * r
  const dash = (level / 100) * circ

  return (
    <svg width={size} height={size} className="flex-shrink-0" style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="3"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        style={{ filter: `drop-shadow(0 0 4px ${color}88)` }}
      />
      {/* Level text — rotate back */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          transform: 'rotate(90deg)',
          transformOrigin: '50% 50%',
          fontSize: '9px',
          fontFamily: 'monospace',
          fill: color,
          fontWeight: 700,
        }}
      >
        {level}
      </text>
    </svg>
  )
}

function SkillTag({ skill, color, delay, inView }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 10 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay }}
      whileHover={{ scale: 1.08, y: -4 }}
      data-hover="true"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-default font-mono text-sm"
      style={{
        background: hovered ? `${color}15` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? color + '55' : color + '22'}`,
        boxShadow: hovered ? `0 0 20px ${color}33, inset 0 0 12px ${color}0a` : 'none',
        color: hovered ? color : 'rgba(255,255,255,0.75)',
        transition: 'all 0.25s ease',
      }}
    >
      <RadialLevel level={skill.level} color={color} size={36} />
      <span style={{ textShadow: hovered ? `0 0 10px ${color}77` : 'none' }}>
        {skill.name}
      </span>
    </motion.div>
  )
}

function CategoryPanel({ cat, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12 }}
      className="glass rounded-2xl overflow-hidden"
      style={{
        border: `1px solid ${cat.color}25`,
        boxShadow: `0 4px 40px ${cat.color}08`,
      }}
    >
      {/* Panel title bar */}
      <div
        className="px-5 py-3 flex items-center gap-3"
        style={{
          background: `linear-gradient(90deg, ${cat.color}12 0%, transparent 100%)`,
          borderBottom: `1px solid ${cat.color}20`,
        }}
      >
        <span
          className="font-mono font-bold text-sm"
          style={{ color: cat.color, textShadow: `0 0 12px ${cat.color}88` }}
        >
          [{cat.icon}]
        </span>
        <span
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: `${cat.color}cc` }}
        >
          {cat.label}
        </span>
        <span
          className="ml-auto font-mono text-xs px-2 py-0.5 rounded"
          style={{
            background: `${cat.color}15`,
            color: `${cat.color}99`,
            border: `1px solid ${cat.color}25`,
          }}
        >
          {cat.skills.length} skills
        </span>
      </div>

      {/* Skill tags */}
      <div className="p-5 flex flex-col gap-3">
        <p
          className="font-space font-semibold text-white text-sm mb-1"
          style={{ textShadow: `0 0 8px ${cat.color}44` }}
        >
          {cat.title}
        </p>
        {cat.skills.map((skill, si) => (
          <SkillTag
            key={skill.name}
            skill={skill}
            color={cat.color}
            delay={0.3 + index * 0.12 + si * 0.08}
            inView={inView}
          />
        ))}
      </div>
    </motion.div>
  )
}

// Tech ticker marquee (CSS animation via inline style)
function TechTicker() {
  const doubled = [...extraBadges, ...extraBadges]

  return (
    <div
      className="overflow-hidden py-2"
      style={{ maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}
    >
      <div
        className="flex gap-3 w-max"
        style={{
          animation: 'ticker-scroll 28s linear infinite',
        }}
      >
        {doubled.map((badge, i) => (
          <motion.span
            key={`${badge}-${i}`}
            whileHover={{ y: -4, scale: 1.1 }}
            data-hover="true"
            className="px-4 py-2 rounded-full font-mono text-xs cursor-default whitespace-nowrap"
            style={{
              background: 'rgba(0,255,136,0.05)',
              border: '1px solid rgba(0,255,136,0.15)',
              color: 'rgba(0,255,136,0.7)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#00ff88'
              e.currentTarget.style.borderColor = 'rgba(0,255,136,0.5)'
              e.currentTarget.style.boxShadow = '0 0 16px rgba(0,255,136,0.3)'
              e.currentTarget.style.background = 'rgba(0,255,136,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(0,255,136,0.7)'
              e.currentTarget.style.borderColor = 'rgba(0,255,136,0.15)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.background = 'rgba(0,255,136,0.05)'
            }}
          >
            {badge}
          </motion.span>
        ))}
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="relative py-28 px-6">
      {/* Radial ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,0,128,0.03) 0%, transparent 65%), radial-gradient(ellipse 50% 45% at 20% 70%, rgba(0,255,136,0.02) 0%, transparent 60%)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Section header with avatar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          {/* Floating thinking avatar — top right of header */}
          <div className="absolute right-0 top-0 hidden md:block">
            <img
              src="/avatars_pixelated/thinking.png"
              alt="thinking mascot"
              className="float w-20 h-20 object-contain"
              style={{
                imageRendering: 'pixelated',
                filter: 'drop-shadow(0 0 10px #ff008088) drop-shadow(0 0 22px #ff008044)',
              }}
            />
          </div>

          <span className="section-label">What I Work With</span>
          <h2 className="font-space font-bold text-4xl md:text-5xl text-white mt-3">
            Technical <span className="gradient-text">Skills</span>
          </h2>

          {/* Compiling status line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-4 flex items-center justify-center gap-2 font-mono text-xs"
            style={{ color: 'rgba(0,245,255,0.5)' }}
          >
            <span style={{ color: '#00ff88' }}>✓</span>
            <span>compiling skill_matrix.json</span>
            <span style={{ color: '#ff0080' }}>—</span>
            <span>{skillCategories.reduce((a, c) => a + c.skills.length, 0)} skills loaded</span>
            <span className="cursor-blink" style={{ color: '#00f5ff' }}>_</span>
          </motion.div>
        </motion.div>

        {/* Category panels */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {skillCategories.map((cat, ci) => (
            <CategoryPanel
              key={cat.title}
              cat={cat}
              index={ci}
              inView={inView}
            />
          ))}
        </div>

        {/* Divider with label */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex items-center gap-4 mb-8"
        >
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.3), transparent)' }}
          />
          <span
            className="font-mono text-xs tracking-widest uppercase px-4 py-1.5 rounded-full"
            style={{
              color: '#00ff88',
              border: '1px solid rgba(0,255,136,0.25)',
              background: 'rgba(0,255,136,0.06)',
            }}
          >
            extended toolkit
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.3), transparent)' }}
          />
        </motion.div>

        {/* Ticker marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <TechTicker />
        </motion.div>

        {/* Static badge cloud fallback (visible on mobile, hidden on desktop ticker) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mt-6 flex flex-wrap justify-center gap-2 md:hidden"
        >
          {extraBadges.map((badge, i) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9 + i * 0.04 }}
              whileHover={{ y: -3, scale: 1.06 }}
              data-hover="true"
              className="px-3 py-1.5 rounded-full font-mono text-xs cursor-default"
              style={{
                background: 'rgba(0,255,136,0.05)',
                border: '1px solid rgba(0,255,136,0.18)',
                color: 'rgba(0,255,136,0.65)',
              }}
            >
              {badge}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
