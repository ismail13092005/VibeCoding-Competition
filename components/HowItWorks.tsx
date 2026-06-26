'use client'

import { useEffect, useRef } from 'react'

function GitVisual() {
  return (
    <div className="rounded-2xl p-6 h-full min-h-[240px] flex flex-col justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d1f26, #0a1820)', border: '1px solid rgba(255,200,1,0.12)' }} aria-hidden="true">
      <div className="absolute inset-0 bg-grid-dense opacity-20" aria-hidden="true" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-forsythia/15 border border-forsythia/20 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFC801" strokeWidth="2" strokeLinecap="round">
              <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/>
              <path d="M13 6h3a2 2 0 0 1 2 2v7"/>
              <line x1="6" y1="9" x2="6" y2="21"/>
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold text-arctic">my-project</div>
            <div className="text-xs text-arctic/40 font-mono">main · 42 commits</div>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow-sm" />
            <span className="text-xs text-green-400">Connected</span>
          </div>
        </div>
        <div className="space-y-2.5">
          {['feat: add auth module','fix: API response types','refactor: cleanup hooks'].map((msg, i) => (
            <div key={i} className="flex items-center gap-3 text-xs">
              <div className="w-6 h-6 rounded-lg bg-nocturnal border border-forsythia/10 flex items-center justify-center flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-forsythia/60" />
              </div>
              <span className="font-mono text-arctic/60 truncate">{msg}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-forsythia">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
          Codebase scanned — 847 files indexed
        </div>
      </div>
    </div>
  )
}

function AIProcessVisual() {
  return (
    <div className="rounded-2xl p-6 h-full min-h-[240px] flex flex-col justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d1f26, #0a1820)', border: '1px solid rgba(255,200,1,0.12)' }} aria-hidden="true">
      <div className="relative z-10">
        <div className="flex justify-center mb-5">
          <div className="relative w-20 h-20">
            {/* Orbiting rings */}
            <div className="absolute inset-0 rounded-full border border-forsythia/20" style={{ animation: 'spin-slow 4s linear infinite' }} />
            <div className="absolute inset-2 rounded-full border border-saffron/25" style={{ animation: 'spin-slow 3s linear infinite reverse' }} />
            <div className="absolute inset-4 rounded-full border border-forsythia/15" style={{ animation: 'spin-slow 6s linear infinite' }} />
            {/* Orbiting dot */}
            <div className="absolute" style={{ top: '50%', left: '50%', transformOrigin: '0 0', animation: 'orbit 3s linear infinite' }}>
              <div className="w-2 h-2 rounded-full bg-forsythia" style={{ boxShadow: '0 0 8px rgba(255,200,1,0.8)' }} />
            </div>
            <div className="absolute inset-6 rounded-full bg-forsythia/10 border border-forsythia/20 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFC801" strokeWidth="2.5">
                <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="text-center text-sm font-semibold text-arctic mb-4">AI Processing…</div>
        <div className="space-y-2.5">
          {[
            { label: 'Parsing codebase',     pct: 100, done: true  },
            { label: 'Identifying patterns', pct: 100, done: true  },
            { label: 'Generating plan',       pct: 68,  done: false },
          ].map((s, i) => (
            <div key={i}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={s.done ? 'text-arctic/50' : 'text-arctic'}>{s.label}</span>
                <span className={s.done ? 'text-green-400' : 'text-forsythia'}>{s.done ? '✓' : `${s.pct}%`}</span>
              </div>
              <div className="h-1 rounded-full bg-nocturnal/60 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${s.pct}%`, background: s.done ? '#4ade80' : 'linear-gradient(90deg,#FFC801,#FF9932)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DeployVisual() {
  return (
    <div className="rounded-2xl p-6 h-full min-h-[240px] flex flex-col justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d1f26, #0a1820)', border: '1px solid rgba(255,200,1,0.12)' }} aria-hidden="true">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-arctic/40 font-mono">production · v2.4.1</span>
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-green-400 bg-green-400/10 border border-green-400/20">
            ● LIVE
          </span>
        </div>
        <div className="space-y-3 mb-4">
          {[
            { r: 'us-east-1',   ms: '12ms' },
            { r: 'eu-west-1',   ms: '18ms' },
            { r: 'ap-south-1',  ms: '22ms' },
          ].map((x) => (
            <div key={x.r} className="flex items-center gap-3 text-xs">
              <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" style={{ boxShadow: '0 0 6px #4ade80' }} />
              <span className="font-mono text-arctic/55 flex-1">{x.r}</span>
              <span className="text-forsythia font-mono">{x.ms}</span>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-white/5">
          <div className="text-xs text-arctic/30 mb-2">Deploy timeline</div>
          <div className="flex gap-1 items-end">
            {[55,70,45,90,80,100,88,95].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm"
                style={{ height: `${h * 0.4}px`, background: i === 7 ? '#FFC801' : 'rgba(17,76,90,0.8)', boxShadow: i === 7 ? '0 0 8px rgba(255,200,1,0.5)' : 'none' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const steps = [
  { number: '01', title: 'Connect your repo', description: "Link GitHub, GitLab, or Bitbucket in seconds. FlowAI instantly scans your codebase, maps your stack, and sets up an intelligent workspace tailored to your patterns.", visual: <GitVisual /> },
  { number: '02', title: 'AI analyzes & builds', description: "FlowAI's engine reads your entire codebase, identifies patterns, fills gaps, writes tests, and proposes improvements — all in real time while you focus on product.", visual: <AIProcessVisual /> },
  { number: '03', title: 'Ship with confidence', description: 'One-click deploy to any cloud with zero-downtime deployments, automated rollbacks, and global CDN. Watch metrics stream in live from the moment you ship.', visual: <DeployVisual /> },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.hiw-item')
    if (!items?.length) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      aria-labelledby="how-heading"
      className="py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #114C5A 0%, #0d3d4a 100%)' }}
    >
      {/* ── Data flow streams ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Base gradient */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, #114C5A 0%, #0d3d4a 50%, #0a2f3a 100%)' }}/>
        {/* Vertical flowing lines */}
        {[8,18,28,38,48,58,68,78,88].map((left, i) => (
          <div key={i} style={{
            position:'absolute', top:'-100%', left:`${left}%`, width:1, height:'200%',
            background:`linear-gradient(180deg, transparent 0%, rgba(255,200,1,${0.04 + (i%3)*0.02}) 40%, rgba(17,76,90,0.15) 60%, transparent 100%)`,
            animation:`dataFlow ${6 + i * 0.8}s linear infinite`,
            animationDelay:`${-i * 0.7}s`,
          }}/>
        ))}
        {/* Horizontal scan */}
        <div style={{
          position:'absolute', left:0, right:0, height:2,
          background:'linear-gradient(90deg, transparent, rgba(255,200,1,0.15), transparent)',
          animation:'hiwScan 5s ease-in-out infinite',
          top:'50%',
        }}/>
        {/* Central radial */}
        <div style={{
          position:'absolute', top:0, left:'50%', transform:'translateX(-50%)',
          width:800, height:400,
          background:'radial-gradient(ellipse, rgba(255,200,1,0.05) 0%, transparent 70%)',
          filter:'blur(30px)',
        }}/>
      </div>
      <style>{`
        @keyframes dataFlow { from{transform:translateY(0)} to{transform:translateY(50%)} }
        @keyframes hiwScan { 0%,100%{top:10%;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{top:90%;opacity:0} }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 reveal">
          <div className="tag-pill mb-5 inline-flex">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            Three steps to production
          </div>
          <h2 id="how-heading"
            className="font-mono font-bold text-arctic mb-4"
            style={{ fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace', fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
            How FlowAI Works
          </h2>
          <p className="text-arctic/55 text-lg max-w-xl mx-auto">From zero to production in three simple steps.</p>
        </div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, i) => {
            const even = i % 2 === 1
            return (
              <div
                key={step.number}
                className={`hiw-item flex flex-col gap-10 md:flex-row md:items-center md:gap-20 ${even ? 'md:flex-row-reverse' : ''}`}
                style={{ opacity: 0, transform: 'translateY(32px)', transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 150}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 150}ms` }}
              >
                {/* Text */}
                <div className="flex-1 pl-12 md:pl-0">
                  {/* Step number with animated border */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-sm text-forsythia animate-border-breathe"
                      style={{ fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace', background: 'rgba(255,200,1,0.08)', border: '1px solid rgba(255,200,1,0.3)' }}
                      aria-hidden="true"
                    >
                      {step.number}
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-forsythia/20 to-transparent" aria-hidden="true" />
                  </div>
                  <h3
                    className="font-mono font-semibold text-arctic text-2xl mb-4"
                    style={{ fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace', letterSpacing: '-0.02em' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-arctic/55 leading-relaxed text-base">{step.description}</p>

                  {/* Arrow link */}
                  <button className="mt-6 flex items-center gap-2 text-sm text-forsythia font-medium group cursor-pointer" aria-label={`Learn more about ${step.title}`}>
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                      className="transition-transform duration-150 ease-out group-hover:translate-x-1" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                </div>

                {/* Visual */}
                <div className="flex-1">{step.visual}</div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`.hiw-item.visible { opacity: 1 !important; transform: translateY(0) !important; }`}</style>
    </section>
  )
}
