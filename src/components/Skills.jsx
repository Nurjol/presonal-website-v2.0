import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skillCategories = [
  {
    title: 'Languages & Core',
    color: '#00d4ff',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'SQL', level: 90 },
      { name: 'C++', level: 82 },
    ],
  },
  {
    title: 'AI / LLM Engineering',
    color: '#a855f7',
    skills: [
      { name: 'LangChain / LlamaIndex', level: 85 },
      { name: 'HuggingFace', level: 82 },
      { name: 'TensorFlow / PyTorch', level: 75 },
      { name: 'OpenCV', level: 80 },
    ],
  },
  {
    title: 'Data & Analytics',
    color: '#ec4899',
    skills: [
      { name: 'Tableau / Power BI', level: 88 },
      { name: 'KNIME', level: 85 },
      { name: 'Google Cloud / BigQuery', level: 85 },
      { name: 'Airflow / ETL', level: 80 },
    ],
  },
]

function SkillBar({ name, level, color, delay, inView }) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-gray-300 font-medium">{name}</span>
        <span className="text-xs font-mono" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
          style={{
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 10px ${color}44`,
          }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="relative py-28 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(168,85,247,0.03) 0%, transparent 70%)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">What I Work With</span>
          <h2 className="font-space font-bold text-4xl md:text-5xl text-white mt-3">
            Technical <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-opacity-30 transition-all duration-300"
              style={{
                borderColor: `${cat.color}22`,
                border: `1px solid ${cat.color}22`,
              }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${cat.color}15` }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
                  />
                </div>
                <h3 className="font-space font-semibold text-sm text-white">{cat.title}</h3>
              </div>

              {/* Skill bars */}
              <div className="flex flex-col gap-4">
                {cat.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={cat.color}
                    delay={0.3 + ci * 0.1 + si * 0.1}
                    inView={inView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {[
            'Ollama', 'LlamaIndex', 'Redis', 'PostgreSQL', 'MongoDB', 'Oracle',
            'Google Looker', 'Dataflow', 'Tableau Prep', 'XGBoost', 'OpenGL',
            'Pandas', 'Git', 'Linux', 'Jupyter', 'Seaborn',
          ].map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.05 }}
              whileHover={{ y: -3, scale: 1.05 }}
              className="px-4 py-2 rounded-full text-xs font-mono text-gray-400 transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {tech}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
