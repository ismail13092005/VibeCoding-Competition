'use client'

import { useEffect, useRef, useState } from 'react'
import HeroBackground from './HeroBackground'

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

const stats = [
  { value: 50000, suffix: '+', label: 'Teams', sub: 'Worldwide' },
  { value: 99,    suffix: '.9%', label: 'Uptime', sub: 'SLA Guaranteed' },
  { value: 4,     suffix: '.9★', label: 'Rating', sub: 'G2 & Capterra' },
  { value: 10,    suffix: '×',   label: 'Faster', sub: 'Avg Deploy Speed' },
]

const press = ['TechCrunch', 'ProductHunt', 'Y Combinator', 'Forbes', 'Wired']

export default function Hero() {
  const heroRef     = useRef<HTMLElement>(null)
  const cursorRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = heroRef.current
    if (!section) return
    const handler = (e: MouseEvent) => {
      const { left, top } = section.getBoundingClientRect()
      if (cursorRef.current) {
        cursorRef.current.style.left    = `${e.clientX - left}px`
        cursorRef.current.style.top     = `${e.clientY - top}px`
        cursorRef.current.style.opacity = '1'
      }
    }
    const leave = () => { if (cursorRef.current) cursorRef.current.style.opacity = '0' }
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
      <HeroBackground />

      {/* Cursor halo */}
      <div ref={cursorRef} className="absolute pointer-events-none opacity-0 will-change-transform" aria-hidden="true"
        style={{ width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,200,1,0.08) 0%, rgba(255,200,1,0.02) 40%, transparent 70%)',
          transform: 'translate(-50%,-50%)', left: '50%', top: '40%', filter: 'blur(4px)',
          transition: 'opacity 0.4s ease',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 text-center">

        {/* Top badge */}
        <div className="animate-fade-in" style={{ animationDelay: '50ms', opacity: 0 }}>
          <div className="inline-flex items-center gap-3 mb-10"
            style={{
              padding: '6px 20px 6px 8px', borderRadius: 9999,
              background: 'linear-gradient(135deg, rgba(255,200,1,0.12), rgba(255,153,50,0.08))',
              border: '1px solid rgba(255,200,1,0.3)',
              boxShadow: '0 0 24px rgba(255,200,1,0.1)',
            }}>
            <span style={{
              background: 'linear-gradient(135deg, #FFC801, #FF9932)',
              color: '#172B36', fontSize: '0.65rem', fontWeight: 800,
              padding: '3px 10px', borderRadius: 9999, letterSpacing: '0.08em',
            }}>NEW</span>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,200,1,0.9)', fontWeight: 600, letterSpacing: '0.03em' }}>
              v2.0 · AI Code Generation Now Available
            </span>
          </div>
        </div>

        {/* H1 */}
        <h1 className="font-mono font-bold text-arctic mb-6"
          style={{
            fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace',
            fontSize: 'clamp(3rem, 9vw, 6rem)',
            lineHeight: 1.02, letterSpacing: '-0.04em',
          }}
        >
          <span className="block animate-fade-in-up" style={{ animationDelay: '120ms', opacity: 0,
            textShadow: '0 0 80px rgba(255,200,1,0.1)' }}>
            Ship Products
          </span>
          <span className="block animate-fade-in-up mt-2" style={{ animationDelay: '240ms', opacity: 0, minHeight: '1.1em' }}>
            <Typewriter />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-arctic/65 sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '380ms', opacity: 0, fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
          FlowAI unifies design, code, and deployment into one intelligent workspace.
          Your team ships features — not friction.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in-up"
          style={{ animationDelay: '500ms', opacity: 0 }}>
          <button
            className="btn-beam magnetic btn-ripple relative px-10 py-4 rounded-2xl font-bold text-noir text-base overflow-hidden cursor-pointer animate-cta-pulse"
            style={{
              background: 'linear-gradient(135deg, #FFC801 0%, #FF9932 100%)',
              fontSize: '1.05rem',
            }}
            aria-label="Start Free Trial — no credit card required"
          >
            Start Free Trial — Free Forever
          </button>
          <button
            className="magnetic btn-ripple relative px-10 py-4 rounded-2xl font-semibold text-arctic text-base cursor-pointer flex items-center justify-center gap-3 group"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
              fontSize: '1.05rem',
              transition: 'all 0.2s ease-out',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.borderColor = 'rgba(255,200,1,0.5)'
              el.style.background  = 'rgba(255,200,1,0.07)'
              el.style.boxShadow   = '0 8px 32px rgba(255,200,1,0.15)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.borderColor = 'rgba(255,255,255,0.12)'
              el.style.background  = 'rgba(255,255,255,0.04)'
              el.style.boxShadow   = ''
            }}
            aria-label="Watch Demo"
          >
            <span className="w-9 h-9 rounded-full border border-forsythia/40 flex items-center justify-center group-hover:bg-forsythia/15 transition-all duration-200" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFC801"><path d="M8 5v14l11-7z"/></svg>
            </span>
            Watch 2-min Demo
          </button>
        </div>

        {/* No credit card note */}
        <p className="text-arctic/30 text-xs mb-16 animate-fade-in" style={{ animationDelay: '600ms', opacity: 0 }}>
          No credit card required · 14-day free trial · Cancel anytime
        </p>

        {/* Press mentions */}
        <div className="animate-fade-in mb-16" style={{ animationDelay: '700ms', opacity: 0 }}>
          <p className="text-arctic/25 text-xs uppercase tracking-[0.2em] mb-4">As featured in</p>
          <div className="flex flex-wrap justify-center gap-8">
            {press.map((name, i) => (
              <span key={i} style={{
                fontFamily: i % 2 === 0 ? 'var(--font-jetbrains, JetBrains Mono), monospace' : 'var(--font-inter, Inter), sans-serif',
                fontWeight: 700, fontSize: '0.85rem',
                color: 'rgba(241,246,244,0.2)',
                letterSpacing: i % 2 === 0 ? '-0.02em' : '0.02em',
                transition: 'color 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,200,1,0.5)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(241,246,244,0.2)' }}
              >{name}</span>
            ))}
          </div>
        </div>

        {/* Stats grid */}
        <div className="animate-fade-in-up" style={{ animationDelay: '800ms', opacity: 0 }}>
          <div className="section-sep mb-10" aria-hidden="true" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(({ value, suffix, label, sub }, i) => (
              <div key={i} className="stat-card">
                <div className="font-mono font-bold shimmer-text mb-1"
                  style={{ fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)' }}>
                  <Counter target={value} suffix={suffix} />
                </div>
                <div className="text-sm font-semibold text-arctic/80 mb-0.5">{label}</div>
                <div className="text-xs text-arctic/30">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in z-10"
        style={{ animationDelay: '1400ms', opacity: 0 }} aria-hidden="true">
        <span className="text-[9px] text-arctic/20 uppercase tracking-[0.25em]">Scroll to explore</span>
        <div className="w-5 h-9 rounded-full flex items-start justify-center pt-2"
          style={{ border: '1px solid rgba(255,200,1,0.15)' }}>
          <div className="w-1 h-2.5 rounded-full bg-forsythia/60" style={{ animation: 'scrollBounce 2s ease-in-out infinite' }} />
        </div>
      </div>
      <style>{`@keyframes scrollBounce { 0%,100%{transform:translateY(0);opacity:1} 60%{transform:translateY(10px);opacity:0.3} }`}</style>
    </section>
  )
}
