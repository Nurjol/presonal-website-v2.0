import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── Contact Info Data ────────────────────────────────────────────────────────

const contactInfo = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Location',
    value: 'Ulaanbaatar, Mongolia',
    color: '#00f5ff',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'Bmbi.nurjol@gmail.com',
    color: '#ff0080',
    href: 'mailto:Bmbi.nurjol@gmail.com',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Phone',
    value: '+976 95855303',
    color: '#00ff88',
    href: 'tel:+97695855303',
  },
]

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Nurjol',
    color: '#00f5ff',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nurjol-badyelkhan/',
    color: '#ff0080',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/bmbi__/',
    color: '#00ff88',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
]

// ─── Neon Input ───────────────────────────────────────────────────────────────

function NeonInput({ as: Tag = 'input', label, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-xs font-mono tracking-wider"
        style={{ color: focused ? '#00f5ff' : '#6b7280' }}
      >
        {label}
      </label>
      <Tag
        {...props}
        className="bg-transparent rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none resize-none transition-all duration-200"
        style={{
          border: focused ? '1px solid rgba(0,245,255,0.5)' : '1px solid rgba(255,255,255,0.08)',
          background: focused ? 'rgba(0,245,255,0.03)' : 'rgba(255,255,255,0.02)',
          boxShadow: focused ? '0 0 16px rgba(0,245,255,0.12), inset 0 0 20px rgba(0,245,255,0.04)' : 'none',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        data-hover
      />
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sent'
  const [planeSent, setPlaneSent] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setPlaneSent(true)
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )
    window.open(`mailto:Bmbi.nurjol@gmail.com?subject=${subject}&body=${body}`)
    setTimeout(() => {
      setStatus('sent')
      setPlaneSent(false)
    }, 700)
  }

  function handleReset() {
    setStatus(null)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="relative py-28 px-6">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,245,255,0.03) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 20% 80%, rgba(255,0,128,0.025) 0%, transparent 60%)
          `,
        }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Let's Connect</span>
          <h2 className="font-space font-bold text-4xl md:text-5xl text-white mt-3">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-md mx-auto text-sm leading-relaxed">
            Have a project in mind or just want to say hello?{' '}
            <span style={{ color: '#00f5ff88' }}>I'd love to hear from you.</span>
          </p>
          {/* Divider */}
          <div
            className="mt-6 mx-auto"
            style={{
              width: '140px',
              height: '2px',
              background: 'linear-gradient(to right, transparent, #ff0080, #00f5ff, transparent)',
              boxShadow: '0 0 12px #00f5ff66',
            }}
          />
        </motion.div>

        {/* ── Body Grid ── */}
        <div className="grid md:grid-cols-5 gap-10 items-start">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-2 flex flex-col gap-4"
          >
            {/* Querying avatar */}
            <motion.div
              className="flex justify-center mb-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <div className="relative">
                <img
                  src="/avatars_pixelated/querying.png"
                  alt="Querying mascot"
                  className="float"
                  style={{
                    width: '88px',
                    height: '88px',
                    imageRendering: 'pixelated',
                    filter:
                      'drop-shadow(0 0 12px #ff0080) drop-shadow(0 0 28px #ff008066)',
                  }}
                />
                {/* Pixel speech bubble hint */}
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2.4 }}
                  className="absolute -top-2 -right-2 font-mono text-xs px-2 py-0.5 rounded"
                  style={{
                    background: 'rgba(255,0,128,0.15)',
                    border: '1px solid rgba(255,0,128,0.4)',
                    color: '#ff0080',
                    fontSize: '10px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  ping me!
                </motion.div>
              </div>
            </motion.div>

            {/* Contact info cards */}
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    className="glass rounded-xl p-4 flex items-start gap-4 block transition-all duration-300 group"
                    style={{ border: `1px solid ${item.color}22` }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = `${item.color}55`
                      e.currentTarget.style.boxShadow = `0 0 20px ${item.color}18`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = `${item.color}22`
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    data-hover
                  >
                    <ContactInfoInner item={item} />
                  </a>
                ) : (
                  <div
                    className="glass rounded-xl p-4 flex items-start gap-4 transition-all duration-300"
                    style={{ border: `1px solid ${item.color}22` }}
                  >
                    <ContactInfoInner item={item} />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Social links card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="glass rounded-xl p-5"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p
                className="text-xs font-mono uppercase tracking-widest mb-4"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Find me online
              </p>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all duration-300 group"
                    style={{
                      background: `${s.color}0d`,
                      border: `1px solid ${s.color}22`,
                      color: `${s.color}99`,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${s.color}1a`
                      e.currentTarget.style.borderColor = `${s.color}55`
                      e.currentTarget.style.color = s.color
                      e.currentTarget.style.boxShadow = `0 0 12px ${s.color}33`
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = `${s.color}0d`
                      e.currentTarget.style.borderColor = `${s.color}22`
                      e.currentTarget.style.color = `${s.color}99`
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                    data-hover
                  >
                    <span style={{ color: 'inherit' }}>{s.icon}</span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right column — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3"
          >
            <div
              className="glass rounded-2xl p-7 relative overflow-hidden"
              style={{
                border: '1px solid rgba(0,245,255,0.12)',
                boxShadow: 'inset 0 0 60px rgba(0,245,255,0.03)',
              }}
            >
              {/* Corner accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0, right: 0,
                  width: '60px', height: '60px',
                  background: 'linear-gradient(225deg, rgba(0,245,255,0.1) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-14 text-center gap-5"
                  >
                    {/* Animated checkmark */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                      className="w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{
                        background: 'rgba(0,245,255,0.08)',
                        border: '2px solid rgba(0,245,255,0.4)',
                        boxShadow: '0 0 32px rgba(0,245,255,0.25)',
                      }}
                    >
                      <motion.svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#00f5ff"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        className="w-10 h-10"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <motion.path d="M5 13l4 4L19 7" />
                      </motion.svg>
                    </motion.div>

                    <div>
                      <h3
                        className="font-space font-bold text-white text-2xl"
                        style={{ textShadow: '0 0 20px rgba(0,245,255,0.5)' }}
                      >
                        Message Sent!
                      </h3>
                      <p className="text-gray-400 text-sm mt-2 max-w-xs mx-auto">
                        Your email client should have opened. I'll get back to you soon.
                      </p>
                    </div>

                    <motion.button
                      onClick={handleReset}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="text-sm font-mono px-5 py-2 rounded-lg transition-all duration-200"
                      style={{
                        background: 'rgba(0,245,255,0.08)',
                        border: '1px solid rgba(0,245,255,0.25)',
                        color: '#00f5ff',
                      }}
                      data-hover
                    >
                      &gt; Send another message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Terminal-style header */}
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
                      </div>
                      <span
                        className="text-xs font-mono ml-2"
                        style={{ color: 'rgba(255,255,255,0.2)' }}
                      >
                        new_message.md
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <NeonInput
                        label="Your Name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                      <NeonInput
                        label="Your Email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                      />
                    </div>

                    <NeonInput
                      as="textarea"
                      label="Message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or just say hi..."
                    />

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.97 }}
                      className="group relative flex items-center justify-center gap-3 py-3.5 rounded-xl font-space font-semibold text-sm overflow-hidden transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(255,0,128,0.1))',
                        border: '1px solid rgba(0,245,255,0.35)',
                        color: '#00f5ff',
                        boxShadow: '0 0 20px rgba(0,245,255,0.1)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background =
                          'linear-gradient(135deg, rgba(0,245,255,0.25), rgba(255,0,128,0.18))'
                        e.currentTarget.style.borderColor = 'rgba(0,245,255,0.6)'
                        e.currentTarget.style.boxShadow = '0 0 30px rgba(0,245,255,0.22)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background =
                          'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(255,0,128,0.1))'
                        e.currentTarget.style.borderColor = 'rgba(0,245,255,0.35)'
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(0,245,255,0.1)'
                      }}
                      data-hover
                    >
                      {/* Shimmer overlay */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background:
                            'linear-gradient(90deg, transparent 0%, rgba(0,245,255,0.06) 50%, transparent 100%)',
                        }}
                      />

                      <span className="relative z-10">
                        {planeSent ? 'Launching...' : 'Send Message'}
                      </span>

                      {/* Paper plane icon with fly animation on hover */}
                      <motion.svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-4 h-4 relative z-10"
                        animate={planeSent ? { x: 40, y: -40, opacity: 0 } : { x: 0, y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ x: 4, y: -4 }}
                      >
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </motion.svg>
                    </motion.button>

                    {/* Mono hint */}
                    <p className="text-center text-xs font-mono" style={{ color: 'rgba(255,255,255,0.18)' }}>
                      // opens your email client · no backend required
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Footer ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="relative z-10 text-center mt-20 pt-8"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        {/* Pixel rule */}
        <div
          className="mx-auto mb-6"
          style={{
            width: '200px',
            height: '1px',
            background:
              'linear-gradient(to right, transparent, rgba(0,245,255,0.3), rgba(255,0,128,0.3), transparent)',
          }}
        />
        <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>
          <span style={{ color: '#00f5ff', textShadow: '0 0 8px #00f5ff' }}>&lt;</span>
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>Nurjol Badyelkhan</span>
          <span style={{ color: '#00f5ff', textShadow: '0 0 8px #00f5ff' }}> /&gt;</span>
          {' '}
          <span style={{ color: 'rgba(255,255,255,0.18)' }}>
            — Built with React &amp; Framer Motion · {new Date().getFullYear()}
          </span>
        </p>
      </motion.div>
    </section>
  )
}

// ─── Small helper (keeps JSX DRY inside both anchor + div variants) ────────────

function ContactInfoInner({ item }) {
  return (
    <>
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background: `${item.color}12`,
          color: item.color,
          border: `1px solid ${item.color}28`,
          boxShadow: `0 0 10px ${item.color}22`,
        }}
      >
        {item.icon}
      </div>
      <div>
        <p
          className="text-xs font-mono uppercase tracking-widest mb-1"
          style={{ color: `${item.color}88` }}
        >
          {item.label}
        </p>
        <p className="text-sm text-gray-300">{item.value}</p>
      </div>
    </>
  )
}
