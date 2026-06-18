import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTION_MAP = [
  { id: 'home',       avatar: '/avatars_pixelated/feeling_cool.png', caption: 'Welcome in.' },
  { id: 'about',      avatar: '/avatars_pixelated/querying.png',     caption: 'Here\'s my story.' },
  { id: 'skills',     avatar: '/avatars_pixelated/thinking.png',     caption: 'My toolkit.' },
  { id: 'experience', avatar: '/avatars_pixelated/talking.png',      caption: 'The journey.' },
  { id: 'projects',   avatar: '/avatars_pixelated/new_idea.jpg',     caption: 'Things I built.' },
  { id: 'contact',    avatar: '/avatars_pixelated/querying.png',     caption: 'Say hi!' },
]

export default function AvatarMascot() {
  const [active, setActive] = useState(SECTION_MAP[0])
  const rafRef = useRef(null)
  const reduceMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const ids = SECTION_MAP.map((s) => s.id)

    const updateActive = () => {
      const viewH = window.innerHeight
      let best = null
      let bestRatio = -1

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const visible = Math.max(0, Math.min(rect.bottom, viewH) - Math.max(rect.top, 0))
        const ratio = visible / viewH
        if (ratio > bestRatio) {
          bestRatio = ratio
          best = id
        }
      }

      if (best) {
        const match = SECTION_MAP.find((s) => s.id === best)
        if (match) setActive((prev) => (prev.id === match.id ? prev : match))
      }
    }

    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        updateActive()
        rafRef.current = null
      })
    }

    updateActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const scrollTop = () => {
    const hero = document.getElementById('home')
    if (hero) hero.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 55,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 10,
        pointerEvents: 'auto',
      }}
      className="hidden md:flex"
    >
      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id + '-bubble'}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.92 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.94 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative' }}
        >
          <div
            className="glass neon-border"
            style={{
              padding: '7px 13px',
              borderRadius: 10,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: '#00f5ff',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
              boxShadow: '0 0 12px rgba(0,245,255,0.2)',
            }}
          >
            {active.caption}
          </div>
          {/* Bubble tail */}
          <div
            style={{
              position: 'absolute',
              bottom: -7,
              right: 22,
              width: 0,
              height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderTop: '8px solid rgba(0,245,255,0.45)',
              filter: 'drop-shadow(0 2px 4px rgba(0,245,255,0.2))',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Avatar */}
      <AnimatePresence mode="wait">
        <motion.button
          key={active.id + '-avatar'}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.82 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollTop}
          aria-label="Scroll to top"
          data-hover
          style={{
            width: 96,
            height: 96,
            borderRadius: 16,
            overflow: 'hidden',
            border: '1.5px solid rgba(0,245,255,0.55)',
            boxShadow: '0 0 20px rgba(0,245,255,0.35), 0 0 40px rgba(0,245,255,0.1)',
            background: '#050816',
            padding: 0,
            cursor: 'pointer',
            display: 'block',
          }}
          className={reduceMotion ? '' : 'float'}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={active.avatar}
            alt="mascot"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              imageRendering: 'pixelated',
              display: 'block',
            }}
          />
        </motion.button>
      </AnimatePresence>
    </div>
  )
}
