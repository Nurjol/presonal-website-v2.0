import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

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
        description: 'Developing intelligent automation and RAG-based systems using LangChain, LlamaIndex, Ollama and HuggingFace for government-scale digital services.',
        images: [],
        tags: ['LangChain', 'LlamaIndex', 'Ollama', 'HuggingFace', 'GCP', 'RAG'],
        link: null,
        comingSoon: true,
        detail: {
          when: 'March 2025 – Present',
          how: 'Working on production LLM systems integrating retrieval-augmented generation pipelines, vector databases, and open-source models via Ollama. Designing end-to-end AI workflows deployed on Google Cloud Platform.',
          acquired: ['LangChain & LlamaIndex RAG pipelines', 'Open-source LLM deployment with Ollama', 'HuggingFace model fine-tuning', 'Production AI system design', 'GCP AI infrastructure'],
        },
      },
    ],
  },
  {
    id: 'novelsoft',
    label: 'Previous Company',
    company: '@ Novelsoft LLC',
    period: 'March 2023 – March 2025',
    color: '#a855f7',
    description: "Data science and analytics work for Mongolia's public sector.",
    projects: [
      {
        id: 'ns-2',
        title: 'MOE Advanced Analytics Dashboard — Phase 2',
        subtitle: 'Ministry of Education & Science · GCP Big Data Architecture',
        description: "Large-scale analytics platform integrating ESIS, HEMIS, TVETS and national exam data. 5 main dashboards with 20 sub-dashboards, powered by a real-time Oracle → GCP pipeline with Medallion architecture. Successfully handed over to the Information Technology Center of Education.",
        images: [
          '/images/portfolio/moe-adv-arch.png',
          '/images/portfolio/moe-adv-dash1.png',
          '/images/portfolio/moe-adv-dash2.png',
        ],
        tags: ['BigQuery', 'Datastream', 'Dataform', 'Oracle', 'GCP', 'Tableau', 'Data Lineage'],
        link: null,
        linkLabel: null,
        detail: {
          when: '2024 – 2025, Novelsoft LLC',
          how: `Built a production-grade Big Data pipeline across two phases:

1. Oracle → Oracle (Staging): Real-time sync using Oracle GoldenGate to replicate source data from ESIS, HEMIS, TVETS systems and Teacher Evaluation / National Entrance Exam data into a staging Oracle database.

2. Oracle → GCP BigQuery: Used Google Datastream to stream data from the staging Oracle DB into BigQuery with approximately 5 minutes of lag.

3. Data Transformation: Designed and implemented a Medallion Architecture in BigQuery using Dataform — Bronze (raw), Silver (cleaned), Gold (aggregated/business-ready) layers.

4. Visualization: Built 5 main dashboards with 20 sub-dashboards in Tableau, each focused on key education KPIs.

My specific role: Designed the entire GCP architecture and workflow — from Datastream ingestion through Dataform transformations to dashboard-ready Gold layer. Also created full data lineage documentation, metadata management, and a Data Glossary using GCP Data Catalog.

Outcome: Project successfully handed over to the Information Technology Center of Education.`,
          acquired: [
            'Oracle GoldenGate real-time CDC replication',
            'Google Datastream (Oracle → BigQuery)',
            'Dataform & Medallion Architecture (Bronze/Silver/Gold)',
            'GCP Data Catalog, Data Lineage & Metadata management',
            'Large-scale multi-source data integration (ESIS, HEMIS, TVETS)',
            'End-to-end GCP Big Data pipeline design',
            'Tableau advanced dashboard development (20 sub-dashboards)',
          ],
        },
      },
      {
        id: 'ns-1',
        title: 'MOE Advanced Analytics Dashboard — Phase 1',
        subtitle: 'Ministry of Education & Science of Mongolia',
        description: "Comprehensive analytics platform on Mongolia's largest educational data system (ESIS). 9 sub-dashboards covering teacher shortage, movement, supply, salary and demographics — directly shaping national education policy.",
        images: ['/images/portfolio/dashboard.png'],
        tags: ['Tableau', 'SQL', 'BigQuery', 'GCP', 'ETL', 'Airflow'],
        link: 'https://dashboard.edu.mn/',
        linkLabel: 'Live Dashboard',
        detail: {
          when: '2023 – 2024, Novelsoft LLC',
          how: "Built on top of Mongolia's ESIS — the country's largest educational database. Designed ETL pipelines using Airflow and BigQuery on GCP. Built 9 interactive Tableau dashboards across 5 use cases: teacher shortage, movement, supply, salary, and demographics. Worked closely with Ministry of Education stakeholders to define KPIs.",
          acquired: ['Advanced SQL and data modeling', 'Tableau Desktop & Tableau Prep', 'Google Cloud Platform (BigQuery, Dataflow)', 'ETL/ELT pipeline design with Airflow', 'Stakeholder communication', 'Large-scale government data systems'],
        },
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
        description: 'Real-time fall detection using OpenPose keypoint estimation and the COCO dataset. Processes human skeletal data to classify fall events — built for safety monitoring applications.',
        images: ['/images/portfolio/fall.png'],
        tags: ['Deep Learning', 'OpenPose', 'OpenCV', 'Python'],
        link: 'https://github.com/Nurjol/Fall-Detecting-Model-using-OpenPose',
        linkLabel: 'GitHub',
        detail: {
          when: '2022, Computer Vision course — Inha University',
          how: 'Used OpenPose to extract 18-point human skeletal keypoints from video frames. Built a classification model analyzing joint angles and velocity (hip, shoulder, knee) to distinguish falls from normal movement. Trained on the COCO dataset with custom fall sequences. Implemented in Python with OpenCV for real-time video processing.',
          acquired: ['OpenPose human pose estimation', 'Computer Vision with OpenCV', 'Deep learning classification', 'Keypoint-based feature engineering', 'Real-time video processing with Python'],
        },
      },
      {
        id: 'uni-2',
        title: 'Apartment Price Prediction',
        subtitle: 'MLP · XGBoost · Feature Engineering',
        description: 'ML model predicting apartment prices using multi-layer perceptrons and gradient boosting. Incorporates diverse feature engineering to achieve accurate real estate valuations.',
        images: ['/images/portfolio/predict.png'],
        tags: ['XGBoost', 'MLP', 'Scikit-learn', 'Python'],
        link: 'https://github.com/Nurjol/AI-Model-for-Predicting-House-price',
        linkLabel: 'GitHub',
        detail: {
          when: '2022, Machine Learning course — Inha University',
          how: 'Collected and cleaned real estate data with variables including location, floor, area, building age, and nearby amenities. Compared MLP and XGBoost architectures. Tuned hyperparameters with cross-validation. XGBoost outperformed MLP due to the tabular nature of the data.',
          acquired: ['XGBoost and gradient boosting', 'Neural network architecture (MLP)', 'Feature engineering for tabular data', 'Hyperparameter tuning & cross-validation', 'Scikit-learn ML pipeline'],
        },
      },
      {
        id: 'uni-3',
        title: 'Space Shuttle Game',
        subtitle: 'OpenGL · C++ · Custom Renderer',
        description: 'Space shuttle game built from scratch in C++ with OpenGL. Features a custom rendering pipeline, physics-based movement and real-time graphics.',
        images: ['/images/portfolio/space.png'],
        tags: ['C++', 'OpenGL', 'Game Dev', 'Graphics'],
        link: 'https://github.com/Nurjol/Space-Shuttle-Game-OpenGL',
        linkLabel: 'GitHub',
        detail: {
          when: '2021, Computer Graphics course — Inha University',
          how: 'Built entirely from scratch in C++ without a game engine. Implemented a custom OpenGL rendering pipeline with vertex and fragment shaders. Added physics-based movement with thrust, gravity simulation, and collision detection. Approximately 50% complete — core engine and movement system fully functional.',
          acquired: ['OpenGL rendering pipeline', 'GLSL vertex & fragment shaders', 'C++ systems programming', 'Physics simulation (thrust, gravity)', 'Low-level graphics programming fundamentals'],
        },
      },
    ],
  },
]

// ── Image Slider ────────────────────────────────────────────────────────────
function ImageSlider({ images, color, height = 'h-48' }) {
  const [current, setCurrent] = useState(0)
  const total = images.length

  const prev = (e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + total) % total) }
  const next = (e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % total) }

  return (
    <div className={`relative overflow-hidden ${height} group/slider`} style={{ background: '#06090f' }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`slide-${current}`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="w-full h-full object-contain"
        />
      </AnimatePresence>

      {total > 1 && (
        <>
          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200"
            style={{ background: 'rgba(5,8,22,0.75)', border: `1px solid ${color}33` }}
            data-hover
          >
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" className="w-3.5 h-3.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200"
            style={{ background: 'rgba(5,8,22,0.75)', border: `1px solid ${color}33` }}
            data-hover
          >
            <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" className="w-3.5 h-3.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === current ? 16 : 6,
                  height: 6,
                  background: i === current ? color : `${color}44`,
                }}
                data-hover
              />
            ))}
          </div>

          {/* Counter */}
          <div
            className="absolute top-2 right-2 text-xs font-mono px-2 py-0.5 rounded"
            style={{ background: 'rgba(5,8,22,0.7)', color: `${color}cc` }}
          >
            {current + 1}/{total}
          </div>
        </>
      )}
    </div>
  )
}

// ── Modal ───────────────────────────────────────────────────────────────────
function ProjectModal({ project, color, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(5, 8, 22, 0.97)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-2xl"
        style={{
          background: '#0a0e1a',
          border: `1px solid ${color}25`,
          boxShadow: `0 0 60px ${color}10`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
          style={{ background: 'rgba(10,14,26,0.9)', border: '1px solid rgba(255,255,255,0.1)' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(10,14,26,0.9)'}
          data-hover
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-400">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 rounded-2xl">

          {/* Image slider or placeholder */}
          {project.images && project.images.length > 0 ? (
            <div className="rounded-t-2xl overflow-hidden">
              <ImageSlider images={project.images} color={color} height="h-auto" />
            </div>
          ) : (
            <div className="h-20 rounded-t-2xl" style={{ background: `linear-gradient(135deg, ${color}10, ${color}05)` }} />
          )}

          <div className="p-7 pt-5 flex flex-col gap-6">
            {/* Title */}
            <div>
              <p className="text-xs font-mono mb-1.5" style={{ color }}>{project.subtitle}</p>
              <h3 className="font-space font-bold text-2xl text-white leading-snug">{project.title}</h3>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">{project.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-3 py-1 rounded-full"
                  style={{ background: `${color}10`, color, border: `1px solid ${color}22` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* When */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className="w-3 h-3">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </div>
                <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color }}>When</span>
              </div>
              <p className="text-sm text-gray-300 pl-7">{project.detail.when}</p>
            </div>

            {/* How */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className="w-3 h-3">
                    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color }}>How I Built It</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed pl-7 whitespace-pre-line">{project.detail.how}</p>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded flex items-center justify-center shrink-0" style={{ background: `${color}15` }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" className="w-3 h-3">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color }}>Skills Acquired</span>
              </div>
              <div className="pl-7 flex flex-col gap-2">
                {project.detail.acquired.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    className="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <div className="w-1 h-1 rounded-full shrink-0" style={{ background: color }} />
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Link */}
            {project.link && (
              <div className="pt-1 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:gap-3"
                  style={{ color }}
                  data-hover
                >
                  {project.linkLabel}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, color, index, inView, onClick }) {
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

  const hasImages = project.images && project.images.length > 0

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.1 }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
        cursor: 'pointer',
      }}
      className="group relative rounded-2xl overflow-hidden h-full"
      data-hover
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 50% 0%, ${color}12 0%, transparent 65%)`,
          border: `1px solid ${color}33`,
        }}
      />

      <div className="glass rounded-2xl overflow-hidden h-full flex flex-col" style={{ border: `1px solid rgba(255,255,255,0.05)` }}>

        {/* Image / placeholder */}
        {hasImages ? (
          <ImageSlider images={project.images} color={color} height="h-44" />
        ) : (
          <div className="relative h-44 flex items-center justify-center overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${color}08, ${color}04)` }}>
            {[0, 1, 2].map((i) => (
              <motion.div key={i} className="absolute rounded-full"
                style={{ border: `1px solid ${color}22` }}
                animate={{ width: [40, 120], height: [40, 120], opacity: [0.6, 0] }}
                transition={{ duration: 2.5, delay: i * 0.8, repeat: Infinity, ease: 'easeOut' }}
              />
            ))}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
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
            <p className="text-xs font-mono mb-1" style={{ color }}>{project.subtitle}</p>
            <h3 className="font-space font-semibold text-base text-white leading-snug">{project.title}</h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed flex-1 line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ background: `${color}08`, color: '#64748b', border: `1px solid ${color}15` }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono mt-1 transition-opacity duration-200"
            style={{ color: `${color}66`, opacity: hovered ? 1 : 0.4 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            Click to expand
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Era Section ──────────────────────────────────────────────────────────────
function EraSection({ era }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [activeProject, setActiveProject] = useState(null)

  return (
    <div ref={ref} className="relative">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="flex flex-wrap items-center gap-4 mb-8"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-1 h-10 rounded-full shrink-0"
            style={{ background: `linear-gradient(to bottom, ${era.color}, ${era.color}33)` }} />
          <div className="min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-mono px-2.5 py-1 rounded-full"
                style={{ background: `${era.color}12`, color: era.color, border: `1px solid ${era.color}25` }}>
                {era.label}
              </span>
              <h3 className="font-space font-bold text-xl md:text-2xl" style={{ color: era.color }}>
                {era.company}
              </h3>
              <span className="text-xs font-mono text-gray-600">{era.period}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{era.description}</p>
          </div>
        </div>
        <div className="hidden md:block flex-1 h-px"
          style={{ background: `linear-gradient(to right, ${era.color}20, transparent)` }} />
      </motion.div>

      <div className={`grid gap-5 ${
        era.projects.length === 1 ? 'md:grid-cols-1 max-w-lg'
        : era.projects.length === 2 ? 'md:grid-cols-2'
        : 'md:grid-cols-3'
      }`}>
        {era.projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} color={era.color}
            index={i} inView={inView} onClick={() => setActiveProject(project)} />
        ))}
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} color={era.color} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main Section ─────────────────────────────────────────────────────────────
export default function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(168,85,247,0.025) 0%, transparent 65%)' }} />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-label">My Work</span>
          <h2 className="font-space font-bold text-4xl md:text-5xl text-white mt-3">
            Projects & <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm">
            From university experiments to production systems — click any card to dive deeper.
          </p>
        </motion.div>

        <div className="flex flex-col gap-20">
          {eras.map((era) => (
            <EraSection key={era.id} era={era} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a href="https://github.com/Nurjol" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#00d4ff] transition-colors duration-200"
            data-hover>
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
