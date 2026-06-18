import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Cursor from './components/Cursor'
import NeuralBackground from './components/NeuralBackground'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import AvatarMascot from './components/AvatarMascot'
import Loader from './components/Loader'

export default function App() {
  const containerRef = useRef(null)

  // Scroll progress for the top bar
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  })

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen"
      style={{ background: '#050816', overflowX: 'hidden' }}
    >
      {/* ── Loading overlay ───────────────────────────────── */}
      <Loader />
      {/* ── Scroll progress bar ──────────────────────────────── */}
      <motion.div
        style={{
          scaleX,
          transformOrigin: 'left',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          zIndex: 60,
          background: 'linear-gradient(90deg, #00f5ff 0%, #ff0080 100%)',
          boxShadow: '0 0 10px rgba(0,245,255,0.7), 0 0 20px rgba(255,0,128,0.4)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Pixel grid background (z-0, full viewport) ───────── */}
      <div className="pixel-grid" style={{ zIndex: 1 }} aria-hidden="true" />

      {/* ── Three.js neural background (Worker B) ────────────── */}
      <NeuralBackground />

      {/* ── CRT scanlines overlay ─────────────────────────────── */}
      <div className="scanlines" style={{ zIndex: 9990, opacity: 0.6 }} aria-hidden="true" />

      {/* ── Custom cursor (highest z) ─────────────────────────── */}
      <Cursor />

      {/* ── Scroll-reactive avatar mascot ────────────────────── */}
      <AvatarMascot />

      {/* ── Navigation ───────────────────────────────────────── */}
      <Navigation />

      {/* ── Main content ─────────────────────────────────────── */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Portfolio />
        <Contact />
      </main>
    </div>
  )
}
