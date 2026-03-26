import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const rafRef = useRef(null)

  useEffect(() => {
    function onMove(e) {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    function onDown() { setIsClicking(true) }
    function onUp() { setIsClicking(false) }

    function checkHover(e) {
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const hoverable = el?.closest('a, button, [data-hover], input, textarea')
      setIsHovering(!!hoverable)
    }

    function animate() {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`
      }

      // Lag on ring
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.12
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.12

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPosRef.current.x - 16}px, ${ringPosRef.current.y - 16}px)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousemove', checkHover)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    animate()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousemove', checkHover)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-0"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: isHovering ? '#a855f7' : '#00d4ff',
          boxShadow: isHovering
            ? '0 0 12px #a855f7, 0 0 24px #a855f766'
            : '0 0 12px #00d4ff, 0 0 24px #00d4ff66',
          transition: 'background 0.2s, box-shadow 0.2s',
          transform: 'translate(-4px, -4px)',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderRadius: '50%',
          border: `1px solid ${isHovering ? '#a855f766' : '#00d4ff44'}`,
          boxShadow: isHovering ? '0 0 20px #a855f722' : '0 0 10px #00d4ff22',
          transform: 'translate(-16px, -16px)',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          scale: isClicking ? '0.8' : '1',
        }}
      />
    </>
  )
}
