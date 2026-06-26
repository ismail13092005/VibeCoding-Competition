'use client'

import { useEffect, useRef } from 'react'
import SectionBackground from './SectionBackground'

const features = [
  {
    title: 'AI Code Generation',
    description: 'Generate production-ready components, APIs, and tests from natural language. FlowAI understands your full codebase context.',
    accent: '#FFC801',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        <line x1="12" y1="2" x2="12" y2="22"/>
      </svg>
    ),
  },
  {
    title: 'Smart Design System',
    description: 'AI-generated design tokens, component libraries, and style guides that stay in sync with your brand automatically.',
    accent: '#FF9932',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    title: 'One-Click Deploy',
    description: 'Push to any cloud — AWS, GCP, Vercel, self-hosted — with zero DevOps config. Ship from idea to production in seconds.',
    accent: '#D9E8E2',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: 'Real-time Collab',
    description: 'Multiplayer code editing, live cursors, inline comments. Build together across any timezone — zero latency.',
    accent: '#FFC801',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time performance metrics, error tracking, and user insights baked into your workflow from day one.',
    accent: '#FF9932',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6"  y1="20" x2="6"  y2="14"/>
        <line x1="2"  y1="20" x2="22" y2="20"/>
      </svg>
    ),
  },
  {
    title: 'Security First',
    description: 'SOC 2 Type II certified. End-to-end encryption, RBAC, automated vulnerability scanning in every pipeline.',
    accent: '#D9E8E2',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
]

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.feat-card')
    if (!cards?.length) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  /* 3D tilt */
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget as HTMLElement
    const { left, top, width, height } = card.getBoundingClientRect()
    const x = (e.clientX - left) / width  - 0.5
    const y = (e.clientY - top)  / height - 0.5
    card.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px) scale(1.02)`
    const glow = card.querySelector('.card-glow') as HTMLElement
    if (glow) { glow.style.left = `${(x + 0.5) * 100}%`; glow.style.top = `${(y + 0.5) * 100}%` }
  }
  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget as HTMLElement
    card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) translateY(0) scale(1)'
    card.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease'
  }
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget as HTMLElement
    card.style.transition = 'transform 0.1s ease-out, box-shadow 0.1s ease-out'
  }

  return (
    <section
      id="features"
      ref={sectionRef}
      aria-labelledby="features-heading"
      className="py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: '#172B36' }}
    >
      {/* BG decorative grid */}
      <div className="absolute inset-0 bg-grid-dense opacity-30 pointer-events-none" aria-hidden="true" />
      <SectionBackground variant="dots" intensity={0.8} />

      {/* Accent orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse, rgba(255,200,1,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-20 reveal">
          <div className="tag-pill mb-5 inline-flex">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            Core Capabilities
          </div>
          <h2
            id="features-heading"
            className="font-mono font-bold text-arctic mb-4"
            style={{
              fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace',
              fontSize: 'clamp(1.9rem, 4vw, 3rem)',
              letterSpacing: '-0.02em',
            }}
          >
            Everything your team needs
          </h2>
          <p className="text-arctic/55 text-lg max-w-2xl mx-auto">
            One platform to design, build, and ship — no more tool-switching, no more friction.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <article
              key={f.title}
              className="feat-card reveal group relative rounded-2xl p-7 border border-nocturnal/50 bg-nocturnal/15 cursor-default overflow-hidden"
              style={{
                transitionDelay: `${i * 70}ms`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease',
              }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Cursor-follow glow */}
              <div
                className="card-glow absolute pointer-events-none"
                aria-hidden="true"
                style={{
                  width: 200, height: 200, borderRadius: '50%',
                  background: `radial-gradient(circle, ${f.accent}18 0%, transparent 70%)`,
                  transform: 'translate(-50%, -50%)',
                  left: '50%', top: '50%',
                  transition: 'left 0.1s, top 0.1s',
                }}
              />

              {/* Top beam on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
                style={{ background: `linear-gradient(90deg, transparent, ${f.accent}60, transparent)` }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-200 group-hover:scale-110"
                style={{ background: `${f.accent}15`, color: f.accent, border: `1px solid ${f.accent}20` }}
                aria-hidden="true"
              >
                <div className="w-5 h-5">{f.icon}</div>
              </div>

              <h3 className="font-semibold text-arctic text-base mb-2.5 group-hover:text-forsythia transition-colors duration-200">
                {f.title}
              </h3>
              <p className="text-arctic/50 text-sm leading-relaxed">{f.description}</p>

              {/* Corner dot */}
              <div
                className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
                style={{ background: f.accent, boxShadow: `0 0 6px ${f.accent}` }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
