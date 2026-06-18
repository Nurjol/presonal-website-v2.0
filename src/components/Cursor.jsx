import { useEffect, useRef, useState } from 'react'

const TRAIL_COUNT = 7          // number of trailing particles
const TRAIL_LERP  = 0.18       // how fast each trail position catches up (0 = never, 1 = instant)
const TRAIL_FACTOR = 0.75      // multiplicative lag increase per trail step

// Touch / small-screen detection — hide on mobile
function isTouchDevice() {
  return (
    typeof window !== 'undefined' &&
    (window.matchMedia('(pointer: coarse)').matches ||
     'ontouchstart' in window)
  )
}

export default function Cursor() {
  const dotRef      = useRef(null)
  const ringRef     = useRef(null)
  const trailRefs   = useRef([])           // array of TRAIL_COUNT refs
  const posRef      = useRef({ x: -200, y: -200 })   // real cursor pos
  const ringPosRef  = useRef({ x: -200, y: -200 })   // lagging ring pos
  const trailPosRef = useRef(              // each trail position
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -200, y: -200 }))
  )
  const rafRef      = useRef(null)
  const hoverRef    = useRef(false)
  const clickRef    = useRef(false)

  // React state only for initial visibility (avoids per-frame re-renders)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (isTouchDevice()) {
      setHidden(true)
      return
    }

    // Pre-create trail ref elements array
    trailRefs.current = trailRefs.current.slice(0, TRAIL_COUNT)

    function onMove(e) {
      posRef.current = { x: e.clientX, y: e.clientY }

      // Hover detection
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const hoverable = el?.closest('a, button, [data-hover], input, textarea, select')
      hoverRef.current = !!hoverable
    }

    function onDown()  { clickRef.current = true  }
    function onUp()    { clickRef.current = false }

    function animate() {
      const mx = posRef.current.x
      const my = posRef.current.y
      const hovering = hoverRef.current
      const clicking = clickRef.current

      // ── Dot (follows cursor instantly) ────────────────────
      if (dotRef.current) {
        const size = clicking ? 5 : hovering ? 10 : 7
        const color = hovering ? '#ff0080' : '#00f5ff'
        const glow  = hovering
          ? '0 0 14px #ff0080, 0 0 28px rgba(255,0,128,0.5)'
          : '0 0 14px #00f5ff, 0 0 28px rgba(0,245,255,0.5)'
        dotRef.current.style.transform      = `translate(${mx - size / 2}px, ${my - size / 2}px)`
        dotRef.current.style.width          = `${size}px`
        dotRef.current.style.height         = `${size}px`
        dotRef.current.style.background     = color
        dotRef.current.style.boxShadow      = glow
      }

      // ── Ring (lagged) ──────────────────────────────────────
      const ringLerp = 0.12
      ringPosRef.current.x += (mx - ringPosRef.current.x) * ringLerp
      ringPosRef.current.y += (my - ringPosRef.current.y) * ringLerp

      if (ringRef.current) {
        const ringSize  = clicking ? 20 : hovering ? 52 : 34
        const ringColor = hovering
          ? 'rgba(255,0,128,0.55)'
          : 'rgba(0,245,255,0.45)'
        const ringShadow = hovering
          ? '0 0 18px rgba(255,0,128,0.25)'
          : '0 0 14px rgba(0,245,255,0.2)'
        const half = ringSize / 2
        ringRef.current.style.transform   = `translate(${ringPosRef.current.x - half}px, ${ringPosRef.current.y - half}px)`
        ringRef.current.style.width       = `${ringSize}px`
        ringRef.current.style.height      = `${ringSize}px`
        ringRef.current.style.borderColor = ringColor
        ringRef.current.style.boxShadow   = ringShadow
      }

      // ── Trail particles ────────────────────────────────────
      // Each particle chases the one before it with increasing lag
      let prevX = mx
      let prevY = my
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const lerpFactor = TRAIL_LERP * Math.pow(TRAIL_FACTOR, i)
        trailPosRef.current[i].x += (prevX - trailPosRef.current[i].x) * lerpFactor
        trailPosRef.current[i].y += (prevY - trailPosRef.current[i].y) * lerpFactor

        const el = trailRefs.current[i]
        if (el) {
          const t          = i / (TRAIL_COUNT - 1)          // 0 → 1
          const size       = Math.max(2, 5 - i * 0.55)      // shrinks toward tail
          const opacity    = (1 - t * 0.9) * (hovering ? 0.7 : 0.45)
          // Interpolate color: cyan → magenta along the trail
          const r = Math.round(0   + t * 255)
          const g = Math.round(245 - t * 245)
          const b = Math.round(255 - t * (255 - 128))
          const color = `rgb(${r},${g},${b})`
          const half = size / 2

          el.style.transform  = `translate(${trailPosRef.current[i].x - half}px, ${trailPosRef.current[i].y - half}px)`
          el.style.width      = `${size}px`
          el.style.height     = `${size}px`
          el.style.opacity    = opacity
          el.style.background = color
          el.style.boxShadow  = `0 0 ${size * 2}px ${color}`
        }

        prevX = trailPosRef.current[i].x
        prevY = trailPosRef.current[i].y
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    animate()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (hidden) return null

  return (
    <>
      {/* ── Trail particles ──────────────────────────────────── */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = el }}
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9995 - i,
            width: 5,
            height: 5,
            background: '#00f5ff',
            opacity: 0,
            // No transition — positions are mutated directly each frame
            willChange: 'transform',
          }}
        />
      ))}

      {/* ── Ring (lagged) ─────────────────────────────────────── */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          border: '1px solid rgba(0,245,255,0.45)',
          pointerEvents: 'none',
          zIndex: 9997,
          width: 34,
          height: 34,
          willChange: 'transform, width, height',
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
        }}
      />

      {/* ── Dot (instant) ─────────────────────────────────────── */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          width: 7,
          height: 7,
          background: '#00f5ff',
          boxShadow: '0 0 14px #00f5ff, 0 0 28px rgba(0,245,255,0.5)',
          willChange: 'transform, width, height',
          transition: 'background 0.15s ease, box-shadow 0.15s ease, width 0.15s ease, height 0.15s ease',
        }}
      />
    </>
  )
}
