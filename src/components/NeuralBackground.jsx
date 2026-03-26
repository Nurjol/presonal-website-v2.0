import { useEffect, useRef } from 'react'

export default function NeuralBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const animFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    let width, height

    function resize() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    function createParticles() {
      particles = []
      const count = Math.floor((width * height) / 12000)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.2,
          // Color variation: cyan or purple
          hue: Math.random() > 0.7 ? 280 : 190,
        })
      }
    }

    function drawParticle(p) {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.opacity})`
      ctx.fill()
      // Glow
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2)
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3)
      grad.addColorStop(0, `hsla(${p.hue}, 100%, 65%, ${p.opacity * 0.4})`)
      grad.addColorStop(1, `hsla(${p.hue}, 100%, 65%, 0)`)
      ctx.fillStyle = grad
      ctx.fill()
    }

    function drawConnections() {
      const maxDist = 120
      const mouseInfluence = 150

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]

        // Mouse repulsion
        const mdx = mouseRef.current.x - p1.x
        const mdy = mouseRef.current.y - p1.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < mouseInfluence) {
          const force = (mouseInfluence - mdist) / mouseInfluence
          p1.vx -= (mdx / mdist) * force * 0.8
          p1.vy -= (mdy / mdist) * force * 0.8
        }

        // Draw connections between mouse and nearby particles
        if (mdist < mouseInfluence * 1.5) {
          const alpha = (1 - mdist / (mouseInfluence * 1.5)) * 0.5
          ctx.beginPath()
          ctx.moveTo(mouseRef.current.x, mouseRef.current.y)
          ctx.lineTo(p1.x, p1.y)
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25
            const midHue = (p1.hue + p2.hue) / 2
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `hsla(${midHue}, 100%, 65%, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    function update() {
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy

        // Dampen
        p.vx *= 0.995
        p.vy *= 0.995

        // Add tiny random drift
        p.vx += (Math.random() - 0.5) * 0.02
        p.vy += (Math.random() - 0.5) * 0.02

        // Clamp velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5
          p.vy = (p.vy / speed) * 1.5
        }

        // Wrap around edges
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0
      })
    }

    function animate() {
      ctx.fillStyle = 'rgba(5, 8, 22, 0.15)'
      ctx.fillRect(0, 0, width, height)

      update()
      drawConnections()
      particles.forEach(drawParticle)

      animFrameRef.current = requestAnimationFrame(animate)
    }

    function onMouseMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    resize()
    createParticles()
    animate()

    window.addEventListener('resize', () => {
      resize()
      createParticles()
    })
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}
