import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

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
    color: '#00d4ff',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'Bmbi.nurjol@gmail.com',
    color: '#a855f7',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Phone',
    value: '+976 95855303',
    color: '#ec4899',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'sent' | 'error'

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Mailto fallback (no backend needed)
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)
    window.open(`mailto:Bmbi.nurjol@gmail.com?subject=${subject}&body=${body}`)
    setStatus('sent')
  }

  return (
    <section id="contact" className="relative py-28 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,212,255,0.03) 0%, transparent 60%)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
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
          <p className="text-gray-500 mt-4 max-w-md mx-auto text-sm">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-2 flex flex-col gap-5"
          >
            {contactInfo.map((item, i) => (
              <div
                key={item.label}
                className="glass rounded-xl p-4 flex items-start gap-4"
                style={{ border: `1px solid ${item.color}18` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${item.color}12`, color: item.color }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-mono mb-1" style={{ color: item.color }}>{item.label}</p>
                  <p className="text-sm text-gray-300">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="glass rounded-xl p-5 mt-2" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="section-label mb-4">Find me online</p>
              <div className="flex gap-4">
                {[
                  { href: 'https://github.com/Nurjol', label: 'GitHub' },
                  { href: 'https://www.linkedin.com/in/nurjol-badyelkhan/', label: 'LinkedIn' },
                  { href: 'https://www.instagram.com/bmbi__/', label: 'Instagram' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-gray-500 hover:text-[#00d4ff] transition-colors"
                    data-hover
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3"
          >
            <div className="glass rounded-2xl p-7" style={{ border: '1px solid rgba(0,212,255,0.08)' }}>
              {status === 'sent' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full gap-4 py-10 text-center"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2" className="w-8 h-8">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-space font-semibold text-white text-xl">Message Sent!</h3>
                  <p className="text-gray-400 text-sm">Your email client should have opened. I'll get back to you soon.</p>
                  <button
                    onClick={() => { setStatus(null); setForm({ name: '', email: '', message: '' }) }}
                    className="text-sm text-[#00d4ff] hover:underline mt-2"
                    data-hover
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-gray-500">Your Name</label>
                      <input
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="bg-transparent rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200"
                        style={{
                          border: '1px solid rgba(255,255,255,0.08)',
                          background: 'rgba(255,255,255,0.02)',
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'rgba(0,212,255,0.4)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                        data-hover
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-gray-500">Your Email</label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="bg-transparent rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200"
                        style={{
                          border: '1px solid rgba(255,255,255,0.08)',
                          background: 'rgba(255,255,255,0.02)',
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'rgba(0,212,255,0.4)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                        data-hover
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-gray-500">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or just say hi..."
                      className="bg-transparent rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none resize-none transition-all duration-200"
                      style={{
                        border: '1px solid rgba(255,255,255,0.08)',
                        background: 'rgba(255,255,255,0.02)',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(0,212,255,0.4)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                      data-hover
                    />
                  </div>

                  <button
                    type="submit"
                    className="group flex items-center justify-center gap-2 py-3 rounded-lg font-space font-medium text-sm transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #00d4ff22, #a855f722)',
                      border: '1px solid rgba(0,212,255,0.3)',
                      color: '#00d4ff',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #00d4ff33, #a855f733)'
                      e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #00d4ff22, #a855f722)'
                      e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'
                    }}
                    data-hover
                  >
                    Send Message
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform group-hover:translate-x-1">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
        className="relative z-10 text-center mt-20 pt-8"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <p className="text-xs font-mono text-gray-600">
          <span className="text-[#00d4ff]">&lt;</span>
          Nurjol Badyelkhan
          <span className="text-[#00d4ff]"> /&gt;</span>
          {' '}— Built with React & Framer Motion · {new Date().getFullYear()}
        </p>
      </motion.div>
    </section>
  )
}
