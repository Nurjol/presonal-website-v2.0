import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled]   = useState(false)
  const [active, setActive]       = useState('home')
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50)

      // Determine active section via scroll-spy
      const sections = navItems.map(n => n.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleNav(e, href) {
    e.preventDefault()
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      {/* ── Fixed header ──────────────────────────────────────── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,  opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(5,8,22,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(0,245,255,0.12)'
            : 'none',
          boxShadow: scrolled
            ? '0 1px 40px rgba(0,245,255,0.05)'
            : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNav(e, '#home')}
            className="font-mono text-sm font-semibold select-none"
            data-hover
            aria-label="Go to home section"
            style={{ letterSpacing: '0.04em' }}
          >
            <span
              style={{
                color: '#00f5ff',
                textShadow: '0 0 12px rgba(0,245,255,0.8), 0 0 24px rgba(0,245,255,0.4)',
              }}
            >
              &lt;
            </span>
            <span className="text-white">NB</span>
            <span
              style={{
                color: '#00f5ff',
                textShadow: '0 0 12px rgba(0,245,255,0.8), 0 0 24px rgba(0,245,255,0.4)',
              }}
            >
              /&gt;
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = active === item.href.replace('#', '')
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href)}
                  data-hover
                  className={`nav-link text-sm font-medium transition-all duration-200 ${
                    isActive ? 'active' : ''
                  }`}
                  style={{
                    color: isActive ? '#00f5ff' : 'rgba(156,163,175,1)',
                    textShadow: isActive
                      ? '0 0 10px rgba(0,245,255,0.6)'
                      : 'none',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.color = '#f8fafc'
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.color = 'rgba(156,163,175,1)'
                  }}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded"
            onClick={() => setMenuOpen(!menuOpen)}
            data-hover
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: '#00f5ff',
                boxShadow: '0 0 6px rgba(0,245,255,0.8)',
                transform: menuOpen ? 'translateY(4px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: '#00f5ff',
                boxShadow: '0 0 6px rgba(0,245,255,0.8)',
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? 'scaleX(0)' : 'none',
              }}
            />
            <span
              className="block w-5 h-px transition-all duration-300"
              style={{
                background: '#00f5ff',
                boxShadow: '0 0 6px rgba(0,245,255,0.8)',
                transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </motion.header>

      {/* ── Mobile full-screen neon overlay ───────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{
              background: 'rgba(5,8,22,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            {/* Decorative neon corner lines */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '40%',
                height: '1px',
                background: 'linear-gradient(90deg, #00f5ff, transparent)',
                opacity: 0.6,
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '40%',
                height: '1px',
                background: 'linear-gradient(270deg, #ff0080, transparent)',
                opacity: 0.6,
              }}
            />

            {/* Links */}
            <nav
              className="flex flex-col items-center justify-center h-full gap-10"
              role="navigation"
              aria-label="Mobile navigation links"
            >
              {navItems.map((item, i) => {
                const isActive = active === item.href.replace('#', '')
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNav(e, item.href)}
                    data-hover
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.35, ease: 'easeOut' }}
                    className="font-space text-3xl font-semibold tracking-wide relative group"
                    style={{
                      color: isActive ? '#00f5ff' : 'rgba(248,250,252,0.6)',
                      textShadow: isActive
                        ? '0 0 20px rgba(0,245,255,0.7)'
                        : 'none',
                      transition: 'color 0.2s, text-shadow 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#00f5ff'
                      e.currentTarget.style.textShadow = '0 0 20px rgba(0,245,255,0.7)'
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'rgba(248,250,252,0.6)'
                        e.currentTarget.style.textShadow = 'none'
                      }
                    }}
                  >
                    {/* Index prefix */}
                    <span
                      className="absolute -left-10 font-mono text-xs"
                      style={{ color: '#00f5ff', opacity: 0.45, top: '50%', transform: 'translateY(-50%)' }}
                      aria-hidden="true"
                    >
                      0{i + 1}
                    </span>
                    {item.label}
                  </motion.a>
                )
              })}
            </nav>

            {/* Bottom mono label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="section-label text-center pb-10"
              style={{ opacity: 0.3 }}
              aria-hidden="true"
            >
              nurjol.badyelkhan
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
