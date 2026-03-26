import { useRef, useState, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'MOE Analytics Dashboard',
    subtitle: 'Ministry of Education & Science',
    description:
      "Comprehensive analytics platform analyzing Mongolia's largest educational data system (ESIS). Features 9 sub-dashboards covering teacher shortage, movement, supply, salary, and demographics — directly informing national education policy.",
    image: '/images/portfolio/dashboard.png',
    tags: ['Data Analytics', 'Tableau', 'SQL', 'Google Cloud'],
    color: '#00d4ff',
    link: 'https://dashboard.edu.mn/',
    linkLabel: 'Live Dashboard',
    featured: true,
  },
  {
    id: 2,
    title: 'Fall Detection Model',
    subtitle: 'Deep Learning with OpenPose',
    description:
      'Real-time fall detection system using OpenPose keypoint estimation and the COCO dataset. Processes human skeletal data to classify fall events with high accuracy for safety monitoring applications.',
    image: '/images/portfolio/fall.png',
    tags: ['Deep Learning', 'OpenPose', 'OpenCV', 'Python'],
    color: '#a855f7',
    link: 'https://github.com/Nurjol/Fall-Detecting-Model-using-OpenPose',
    linkLabel: 'GitHub',
  },
  {
    id: 3,
    title: 'Apartment Price Prediction',
    subtitle: 'MLP & XGBoost Model',
    description:
      'Machine learning model predicting apartment prices using multi-layer perceptrons and gradient boosting. Incorporates diverse feature engineering to achieve accurate valuations on real estate data.',
    image: '/images/portfolio/predict.png',
    tags: ['Machine Learning', 'XGBoost', 'MLP', 'Python', 'Scikit-learn'],
    color: '#ec4899',
    link: 'https://github.com/Nurjol/AI-Model-for-Predicting-House-price',
    linkLabel: 'GitHub',
  },
  {
    id: 4,
    title: 'Space Shuttle Game',
    subtitle: 'OpenGL / C++',
    description:
      'A 50%-complete space shuttle game built from scratch in C++ using OpenGL. Features custom rendering pipeline, physics-based movement, and real-time graphics — a deep dive into low-level game development.',
    image: '/images/portfolio/space.png',
    tags: ['C++', 'OpenGL', 'Game Dev', 'Graphics'],
    color: '#34d399',
    link: 'https://github.com/Nurjol/Space-Shuttle-Game-OpenGL',
    linkLabel: 'GitHub',
  },
]

function ProjectCard({ project, index, inView }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const onMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * 10, y: -x * 10 })
  }, [])

  const onMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
      }}
      className="group relative rounded-2xl overflow-hidden"
    >
      {/* Glow border on hover */}
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none z-0"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 50% 0%, ${project.color}15 0%, transparent 60%)`,
          border: `1px solid ${project.color}33`,
        }}
      />

      <div
        className="glass rounded-2xl overflow-hidden h-full flex flex-col"
        style={{ border: `1px solid rgba(255,255,255,0.06)` }}
      >
        {/* Image */}
        <div className="relative overflow-hidden h-48">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, #050816 0%, transparent 60%)`,
            }}
          />
          {project.featured && (
            <div
              className="absolute top-3 right-3 text-xs font-mono px-2.5 py-1 rounded-full"
              style={{
                background: `${project.color}22`,
                border: `1px solid ${project.color}44`,
                color: project.color,
              }}
            >
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 gap-3">
          <div>
            <p className="text-xs font-mono mb-1" style={{ color: project.color }}>
              {project.subtitle}
            </p>
            <h3 className="font-space font-semibold text-lg text-white leading-tight">
              {project.title}
            </h3>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2 py-0.5 rounded"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  color: '#64748b',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Link */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:gap-3 mt-1"
            style={{ color: project.color }}
            data-hover
          >
            {project.linkLabel}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
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
          background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(168,85,247,0.03) 0%, transparent 60%)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">My Work</span>
          <h2 className="font-space font-bold text-4xl md:text-5xl text-white mt-3">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm">
            Data science, AI, and engineering projects — each solving real problems with modern tools.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Nurjol"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#00d4ff] transition-colors duration-200"
            data-hover
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            View all projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
