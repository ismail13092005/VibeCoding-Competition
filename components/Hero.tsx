'use client'

import { useEffect, useRef, useState } from 'react'
import HeroBackground from './HeroBackground'

/* ─── Animated counter ───────────────────────────────────────────────── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1400, step = 16
        const increment = target / (duration / step)
        let cur = 0
        const id = setInterval(() => {
          cur = Math.min(cur + increment, target)
          setVal(Math.round(cur))
          if (cur >= target) clearInterval(id)
        }, step)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

/* ─── Typewriter effect ──────────────────────────────────────────────── */
const TYPE_WORDS = ['10× Faster', 'Smarter', 'At Scale', 'With AI']
function Typewriter() {
  const [wordIdx, setWordIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [pause, setPause] = useState(false)

  useEffect(() => {
    if (pause) return
    const word = TYPE_WORDS[wordIdx]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === word.length) {
      setPause(true)
      timeout = setTimeout(() => { setPause(false); setDeleting(true) }, 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length - 1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setWordIdx((i) => (i + 1) % TYPE_WORDS.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, pause, wordIdx])

  return (
    <span className="gradient-text-animated">
      {displayed}
      <span className="animate-blink text-forsythia" aria-hidden="true">|</span>
    </span>
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const cursorHaloRef = useRef<HTMLDivElement>(null)

  /* Cursor halo */
  useEffect(() => {
    const section = heroRef.current
    if (!section) return
    const handler = (e: MouseEvent) => {
      const { left, top } = section.getBoundingClientRect()
      const halo = cursorHaloRef.current
      if (!halo) return
      halo.style.left = `${e.clientX - left}px`
      halo.style.top  = `${e.clientY - top}px`
      halo.style.opacity = '1'
    }
    const leave = () => { if (cursorHaloRef.current) cursorHaloRef.current.style.opacity = '0' }
    section.addEventListener('mousemove', handler, { passive: true })
    section.addEventListener('mouseleave', leave)
    return () => { section.removeEventListener('mousemove', handler); section.removeEventListener('mouseleave', leave) }
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-label="Hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#060f14' }}
    >
      {/* ── Full 3D animated background ── */}
      <HeroBackground />

      {/* ── Cursor halo ── */}
      <div
        ref={cursorHaloRef}
        className="absolute pointer-events-none opacity-0 transition-opacity duration-500 will-change-transform"
        aria-hidden="true"
        style={{
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,200,1,0.09) 0%, rgba(255,200,1,0.03) 40%, transparent 70%)',
          transform: 'translate(-50%,-50%)',
          left: '50%', top: '40%',
          filter: 'blur(4px)',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 tag-pill mb-10 animate-fade-in"
          style={{ animationDelay: '50ms', opacity: 0 }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFC801', boxShadow: '0 0 8px rgba(255,200,1,0.8)' }} aria-hidden="true" />
          Trusted by 50,000+ teams worldwide
        </div>

        {/* H1 */}
        <h1
          className="font-mono font-bold text-arctic mb-6"
          style={{
            fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace',
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}
        >
          <span
            className="block animate-fade-in-up"
            style={{ animationDelay: '120ms', opacity: 0 }}
          >
            Ship Products
          </span>
          <span
            className="block animate-fade-in-up mt-2"
            style={{ animationDelay: '240ms', opacity: 0, minHeight: '1.2em' }}
          >
            <Typewriter />
          </span>
        </h1>

        {/* Sub */}
        <p
          className="text-arctic/60 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '380ms', opacity: 0 }}
        >
          FlowAI unifies design, code, and deployment into one intelligent workspace.
          Your team ships features — not friction.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-fade-in-up"
          style={{ animationDelay: '500ms', opacity: 0 }}
        >
          <button
            className="btn-beam magnetic relative px-10 py-4 rounded-2xl font-bold text-noir text-base overflow-hidden cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #FFC801 0%, #FF9932 100%)',
              boxShadow: '0 8px 40px rgba(255,200,1,0.4), 0 2px 8px rgba(0,0,0,0.4)',
            }}
            aria-label="Start Free Trial"
          >
            Start Free Trial
          </button>
          <button
            className="magnetic relative px-10 py-4 rounded-2xl font-semibold text-arctic text-base cursor-pointer flex items-center justify-center gap-3 group"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.2s ease-out',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.borderColor = 'rgba(255,200,1,0.4)'
              el.style.background  = 'rgba(255,200,1,0.06)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.borderColor = 'rgba(255,255,255,0.12)'
              el.style.background  = 'rgba(255,255,255,0.04)'
            }}
            aria-label="Watch Demo"
          >
            {/* Animated play icon */}
            <span
              className="w-9 h-9 rounded-full border border-forsythia/40 flex items-center justify-center group-hover:bg-forsythia/10 transition-colors duration-200"
              aria-hidden="true"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFC801">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            Watch Demo
          </button>
        </div>

        {/* Stats row */}
        <div
          className="flex flex-wrap justify-center gap-12 animate-fade-in-up"
          style={{ animationDelay: '640ms', opacity: 0 }}
        >
          {[
            { value: 50000, suffix: '+', label: 'Teams', sub: 'worldwide' },
            { value: 99,    suffix: '.9%', label: 'Uptime', sub: 'SLA guaranteed' },
            { value: 4,     suffix: '.9★', label: 'Rating', sub: 'on G2 & Capterra' },
            { value: 10,    suffix: '×',   label: 'Faster', sub: 'avg deploy speed' },
          ].map(({ value, suffix, label, sub }, i) => (
            <div key={i} className="flex flex-col items-center gap-0.5 group cursor-default">
              <span
                className="font-mono font-bold shimmer-text"
                style={{
                  fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace',
                  fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
                }}
              >
                <Counter target={value} suffix={suffix} />
              </span>
              <span className="text-sm font-semibold text-arctic/70">{label}</span>
              <span className="text-xs text-arctic/30">{sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in z-10"
        style={{ animationDelay: '1200ms', opacity: 0 }}
        aria-hidden="true"
      >
        <span className="text-[10px] text-arctic/20 uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-5 h-9 rounded-full flex items-start justify-center pt-2"
          style={{ border: '1px solid rgba(255,200,1,0.2)' }}>
          <div className="w-1 h-2.5 rounded-full bg-forsythia/70"
            style={{ animation: 'scrollBounce 2s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollBounce {
          0%,100% { transform: translateY(0); opacity: 1; }
          60%      { transform: translateY(10px); opacity: 0.3; }
        }
      `}</style>
    </section>
  )
}
