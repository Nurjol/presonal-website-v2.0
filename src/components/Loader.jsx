import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  '> initializing portfolio.exe...',
  '> loading neural assets...',
  '> compiling experience data...',
  '> mounting interface...',
]

export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    // Advance progress bar over ~2s
    const totalMs = 2000
    const steps = 60
    const interval = totalMs / steps
    let step = 0

    const tick = setInterval(() => {
      step++
      setProgress(Math.min(100, Math.round((step / steps) * 100)))

      // advance terminal line roughly every 25%
      setLineIndex(Math.min(LINES.length - 1, Math.floor((step / steps) * LINES.length)))

      if (step >= steps) {
        clearInterval(tick)
        // short hold then dismiss
        setTimeout(() => setVisible(false), 200)
      }
    }, interval)

    return () => clearInterval(tick)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9990,
            background: '#050816',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
          }}
        >
          {/* Scanlines overlay */}
          <div className="scanlines" aria-hidden="true" />

          {/* Pixel grid */}
          <div className="pixel-grid" aria-hidden="true" />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>

            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 96,
                height: 96,
                borderRadius: 16,
                overflow: 'hidden',
                border: '1.5px solid rgba(0,245,255,0.6)',
                boxShadow: '0 0 30px rgba(0,245,255,0.4), 0 0 60px rgba(0,245,255,0.1)',
              }}
              className="float"
            >
              <img
                src="/avatars_pixelated/feeling_cool.png"
                alt="loading"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  imageRendering: 'pixelated',
                  display: 'block',
                }}
              />
            </motion.div>

            {/* Terminal text */}
            <div
              style={{
                width: 320,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: 'rgba(0,245,255,0.7)',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                minHeight: 80,
              }}
            >
              {LINES.slice(0, lineIndex + 1).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ opacity: i === lineIndex ? 1 : 0.45 }}
                >
                  {line}
                  {i === lineIndex && (
                    <span className="cursor-blink" style={{ marginLeft: 2 }}>_</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div
                style={{
                  height: 3,
                  width: '100%',
                  borderRadius: 2,
                  background: 'rgba(0,245,255,0.1)',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #00f5ff, #ff0080)',
                    boxShadow: '0 0 8px rgba(0,245,255,0.7)',
                    borderRadius: 2,
                    width: `${progress}%`,
                  }}
                  transition={{ ease: 'linear' }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: 'rgba(0,245,255,0.4)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                <span>LOADING</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
