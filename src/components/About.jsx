import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '4+', label: 'Years Experience' },
  { value: '4', label: 'Major Projects' },
  { value: '6', label: 'Languages Spoken' },
  { value: 'ACE', label: 'GCP Certified' },
]

const tags = [
  'Python', 'SQL', 'LangChain', 'LlamaIndex',
  'HuggingFace', 'Ollama', 'TensorFlow', 'PyTorch',
  'Tableau', 'Power BI', 'KNIME', 'Airflow',
  'BigQuery', 'GCP', 'PostgreSQL', 'MongoDB',
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-28 px-6">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.03) 0%, transparent 70%)',
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

        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Left: photo + stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Profile photo */}
            <div className="relative">
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff44, #a855f744)',
                  transform: 'rotate(3deg) scale(1.03)',
                  borderRadius: '1rem',
                }}
              />
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, #a855f722, #00d4ff22)',
                  transform: 'rotate(-3deg) scale(1.03)',
                  borderRadius: '1rem',
                }}
              />
              <img
                src="/images/nurjol.png"
                alt="Nurjol Badyelkhan"
                className="relative z-10 w-64 h-64 object-cover rounded-2xl"
                style={{
                  border: '1px solid rgba(0,212,255,0.2)',
                }}
              />
              {/* Online indicator */}
              <div
                className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(5,8,22,0.8)', border: '1px solid rgba(0,212,255,0.2)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 6px #34d399' }} />
                <span className="text-xs text-gray-300 font-mono">Available</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className="glass rounded-xl p-4 text-center"
                >
                  <div className="font-space font-bold text-2xl gradient-text">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: bio + tags */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                I'm <span className="text-white font-medium">Nurjol Badyelkhan</span>, an
                AI Engineer based in Ulaanbaatar, Mongolia. I hold a Bachelor's degree in{' '}
                <span className="text-[#00d4ff]">Information Communication Engineering</span> from
                Inha University, Korea — earned through a full{' '}
                <span className="text-[#a855f7]">ILWOO Foundation scholarship</span>.
              </p>
              <p>
                Currently at <span className="text-white font-medium">E-Mongolia</span> as an AI Engineer,
                building LLM-powered systems and AI pipelines. Previously at Novelsoft LLC I honed deep
                expertise in data analytics, ETL engineering and GCP — delivering dashboards for
                Mongolia's Ministry of Education and training workshops for the Ministry of Finance
                and the Mongolian Tax Administration.
              </p>
              <p>
                I hold a <span className="text-[#00d4ff]">Google Cloud Associate Cloud Engineer</span>{' '}
                certification (valid 2024–2027), have earned olympiad medals in Mathematics and Informatics,
                and speak <span className="text-[#a855f7]">6 languages</span>.
              </p>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-2">
              {[
                { label: 'Location', value: 'Ulaanbaatar, Mongolia' },
                { label: 'Email', value: 'Bmbi.nurjol@gmail.com' },
                { label: 'Role', value: 'AI Engineer @ E-Mongolia' },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 text-sm">
                  <span className="font-mono text-[#00d4ff] w-20 shrink-0">{item.label}</span>
                  <span className="text-gray-300">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Tech tags */}
            <div>
              <p className="section-label mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + i * 0.04 }}
                    className="text-xs font-mono px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(0,212,255,0.06)',
                      border: '1px solid rgba(0,212,255,0.15)',
                      color: '#94a3b8',
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
