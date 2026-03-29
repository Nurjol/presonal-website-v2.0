import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'

const eras = [
  {
    id: 'eMongolia',
    label: 'Current',
    company: '@ E-Mongolia',
    period: 'March 2025 – Present',
    color: '#00d4ff',
    description: 'Building AI-powered systems and LLM pipelines for government digital services.',
    projects: [
      {
        id: 'em-1',
        title: 'AI Engineering at E-Mongolia',
        subtitle: 'LLM · RAG · Automation',
        description:
          'Developing intelligent automation and RAG-based systems using LangChain, LlamaIndex, Ollama and HuggingFace. Designing and deploying production AI workflows on Google Cloud Platform for government-scale digital services.',
        image: null,
        tags: ['LangChain', 'LlamaIndex', 'Ollama', 'HuggingFace', 'GCP', 'RAG'],
        link: null,
        comingSoon: true,
      },
    ],
  },
  {
    id: 'novelsoft',
    label: 'Previous Company',
    company: '@ Novelsoft LLC',
    period: 'March 2023 – March 2025',
    color: '#a855f7',
    description: 'Data science and analytics work for Mongolia\'s public sector.',
    projects: [
      {
        id: 'ns-1',
        title: 'MOE Analytics Dashboard',
        subtitle: 'Ministry of Education & Science of Mongolia',
        description:
          "Comprehensive analytics platform on Mongolia's largest educational data system (ESIS). 9 sub-dashboards covering teacher shortage, movement, supply, salary and demographics — directly shaping national education policy.",
        image: '/images/portfolio/dashboard.png',
        tags: ['Tableau', 'SQL', 'BigQuery', 'GCP', 'ETL', 'Airflow'],
        link: 'https://dashboard.edu.mn/',
        linkLabel: 'Live Dashboard',
      },
    ],
  },
  {
    id: 'university',
    label: 'University',
    company: '@ Inha University',
    period: '2019 – 2023',
    color: '#ec4899',
    description: 'Academic AI and engineering projects exploring computer vision, ML, and graphics.',
    projects: [
      {
        id: 'uni-1',
        title: 'Fall Detection Model',
        subtitle: 'Deep Learning · OpenPose · COCO',
        description:
          'Real-time fall detection using OpenPose keypoint estimation and the COCO dataset. Processes human skeletal data to classify fall events — built for safety monitoring applications.',
        image: '/images/portfolio/fall.png',
        tags: ['Deep Learning', 'OpenPose', 'OpenCV', 'Python'],
        link: 'https://github.com/Nurjol/Fall-Detecting-Model-using-OpenPose',
        linkLabel: 'GitHub',
      },
      {
        id: 'uni-2',
        title: 'Apartment Price Prediction',
        subtitle: 'MLP · XGBoost · Feature Engineering',
        description:
          'ML model predicting apartment prices using multi-layer perceptrons and gradient boosting. Incorporates diverse feature engineering to achieve accurate real estate valuations.',
        image: '/images/portfolio/predict.png',
        tags: ['XGBoost', 'MLP', 'Scikit-learn', 'Python'],
        link: 'https://github.com/Nurjol/AI-Model-for-Predicting-House-price',
        linkLabel: 'GitHub',
      },
      {
        id: 'uni-3',
        title: 'Space Shuttle Game',
        subtitle: 'OpenGL · C++ · Custom Renderer',
        description:
          'Space shuttle game built from scratch in C++ with OpenGL. Features a custom rendering pipeline, physics-based movement and real-time graphics — a deep dive into low-level graphics programming.',
        image: '/images/portfolio/space.png',
        tags: ['C++', 'OpenGL', 'Game Dev', 'Graphics'],
        link: 'https://github.com/Nurjol/Space-Shuttle-Game-OpenGL',
        linkLabel: 'GitHub',
      },
    ],
  },
]

function ProjectCard({ project, color, index, inView }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const onMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * 8, y: -x * 8 })
  }, [])

  const onMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.1 }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
      }}
      className="group relative rounded-2xl overflow-hidden h-full"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 50% 0%, ${color}12 0%, transparent 65%)`,
          border: `1px solid ${color}33`,
        }}
      />

      <div
        className="glass rounded-2xl overflow-hidden h-full flex flex-col"
        style={{ border: `1px solid rgba(255,255,255,0.05)` }}
      >
        {/* Image or coming soon placeholder */}
        {project.image ? (
          <div className="relative overflow-hidden h-44">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, #050816 0%, transparent 55%)' }}
            />
          </div>
        ) : (
          <div
            className="relative h-44 flex items-center justify-center overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${color}08, ${color}04)` }}
          >
            {/* Animated pulse circles */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{ border: `1px solid ${color}22` }}
                animate={{ width: [40, 120], height: [40, 120], opacity: [0.6, 0] }}
                transition={{ duration: 2.5, delay: i * 0.8, repeat: Infinity, ease: 'easeOut' }}
              />
            ))}
            <div
              className="relative z-10 flex flex-col items-center gap-2"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" className="w-5 h-5">
                  <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-mono" style={{ color: `${color}88` }}>In Progress</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 gap-3">
          <div>
            <p className="text-xs font-mono mb-1" style={{ color }}>
              {project.subtitle}
            </p>
            <h3 className="font-space font-semibold text-base text-white leading-snug">
              {project.title}
            </h3>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed flex-1">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2 py-0.5 rounded"
                style={{
                  background: `${color}08`,
                  color: '#64748b',
                  border: `1px solid ${color}15`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Link */}
          {project.comingSoon ? (
            <span className="text-xs font-mono mt-1" style={{ color: `${color}66` }}>
              More details coming soon
            </span>
          ) : (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:gap-3 mt-1"
              style={{ color }}
              data-hover
            >
              {project.linkLabel}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function EraSection({ era, globalInView }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="relative">
      {/* Era header */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="flex flex-wrap items-center gap-4 mb-8"
      >
        {/* Accent line */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className="w-1 h-10 rounded-full shrink-0"
            style={{ background: `linear-gradient(to bottom, ${era.color}, ${era.color}33)` }}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="text-xs font-mono px-2.5 py-1 rounded-full"
                style={{
                  background: `${era.color}12`,
                  color: era.color,
                  border: `1px solid ${era.color}25`,
                }}
              >
                {era.label}
              </span>
              <h3
                className="font-space font-bold text-xl md:text-2xl"
                style={{ color: era.color }}
              >
                {era.company}
              </h3>
              <span className="text-xs font-mono text-gray-600">{era.period}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{era.description}</p>
          </div>
        </div>

        {/* Decorative line extending right */}
        <div
          className="hidden md:block flex-1 h-px"
          style={{ background: `linear-gradient(to right, ${era.color}20, transparent)` }}
        />
      </motion.div>

      {/* Project cards grid */}
      <div
        className={`grid gap-5 ${
          era.projects.length === 1
            ? 'md:grid-cols-1 max-w-lg'
            : era.projects.length === 2
            ? 'md:grid-cols-2'
            : 'md:grid-cols-3'
        }`}
      >
        {era.projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            color={era.color}
            index={i}
            inView={inView}
          />
        ))}
      </div>
    </div>
  )
}

export default function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="relative py-28 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(168,85,247,0.025) 0%, transparent 65%)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-label">My Work</span>
          <h2 className="font-space font-bold text-4xl md:text-5xl text-white mt-3">
            Projects &{' '}
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm">
            From university experiments to production systems — a timeline of what I've built.
          </p>
        </motion.div>

        {/* Era sections */}
        <div className="flex flex-col gap-20">
          {eras.map((era) => (
            <EraSection key={era.id} era={era} globalInView={inView} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/Nurjol"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#00d4ff] transition-colors duration-200"
            data-hover
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            View all projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
