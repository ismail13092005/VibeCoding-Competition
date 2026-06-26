'use client'

import { useState, useRef, useEffect } from 'react'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('cta-in'); io.disconnect() }
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cta-heading"
      className="py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #172B36 0%, #0f2230 100%)' }}
    >
      {/* Animated gradient blob */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(255,200,1,0.08) 0%, transparent 70%)',
          animation: 'gradientShift 8s ease infinite', backgroundSize: '200% 200%'
        }}
      />

      {/* Grid */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" aria-hidden="true" />

      {/* ── Enhanced 3D ring system ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true"
        style={{ perspective:'800px' }}>
        {/* 3D tilted ring 1 */}
        <div style={{
          position:'absolute', width:700, height:700, borderRadius:'50%',
          border:'1px solid rgba(255,200,1,0.06)',
          animation:'ctaRing1 25s linear infinite',
          transformStyle:'preserve-3d',
        }}/>
        {/* 3D tilted ring 2 */}
        <div style={{
          position:'absolute', width:500, height:500, borderRadius:'50%',
          border:'1px solid rgba(17,76,90,0.4)',
          animation:'ctaRing2 18s linear infinite',
          transformStyle:'preserve-3d',
        }}/>
        {/* Inner glow ring */}
        <div style={{
          position:'absolute', width:300, height:300, borderRadius:'50%',
          border:'1px solid rgba(255,200,1,0.1)',
          boxShadow:'0 0 40px rgba(255,200,1,0.05) inset',
          animation:'ctaRing3 10s linear infinite reverse',
        }}/>
        {/* Orbiting bright dot on ring 2 */}
        <div style={{
          position:'absolute', width:500, height:500,
          animation:'ctaRing2 18s linear infinite',
        }}>
          <div style={{
            position:'absolute', top:-4, left:'50%', transform:'translateX(-50%)',
            width:8, height:8, borderRadius:'50%',
            background:'#FFC801',
            boxShadow:'0 0 16px rgba(255,200,1,0.8), 0 0 40px rgba(255,200,1,0.3)',
          }}/>
        </div>
      </div>
      <style>{`
        @keyframes ctaRing1 { from{transform:rotateX(72deg) rotateZ(0deg)} to{transform:rotateX(72deg) rotateZ(360deg)} }
        @keyframes ctaRing2 { from{transform:rotateX(65deg) rotateY(0deg) rotateZ(0deg)} to{transform:rotateX(65deg) rotateY(30deg) rotateZ(360deg)} }
        @keyframes ctaRing3 { from{transform:rotateY(80deg) rotateZ(0deg)} to{transform:rotateY(80deg) rotateZ(-360deg)} }
      `}</style>

      {/* Corner accent blobs */}
      <div style={{
        position:'absolute', top:'-10%', left:'-5%', width:350, height:350, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(255,200,1,0.06) 0%, transparent 70%)',
        filter:'blur(40px)', pointerEvents:'none', animation:'ctaBlob1 10s ease-in-out infinite',
      }} aria-hidden="true"/>
      <div style={{
        position:'absolute', bottom:'-10%', right:'-5%', width:300, height:300, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(17,76,90,0.5) 0%, transparent 70%)',
        filter:'blur(50px)', pointerEvents:'none', animation:'ctaBlob1 13s ease-in-out infinite reverse',
      }} aria-hidden="true"/>
      <style>{`@keyframes ctaBlob1 { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1.15) translate(10px,-10px)} }`}</style>

      <div className="max-w-3xl mx-auto text-center relative z-10">

        <div className="tag-pill mb-6 inline-flex">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
            <line x1="6" y1="1" x2="6" y2="4"/>
            <line x1="10" y1="1" x2="10" y2="4"/>
            <line x1="14" y1="1" x2="14" y2="4"/>
          </svg>
          Start for free today
        </div>

        <h2
          id="cta-heading"
          className="font-mono font-bold mb-5"
          style={{
            fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #F1F6F4 30%, #FFC801 70%, #FF9932 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}
        >
          Ready to ship 10× faster?
        </h2>

        <p className="text-arctic/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Join 50,000+ teams already using FlowAI to design, build, and deploy at the speed of thought.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            aria-label="Get started with FlowAI"
          >
            <label htmlFor="cta-email" className="sr-only">Work email address</label>
            <input
              id="cta-email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@company.com"
              required
              className="flex-1 px-5 py-3.5 rounded-2xl text-sm text-arctic placeholder-arctic/30 focus:outline-none focus:ring-2 focus:ring-forsythia/50 transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            />
            <button type="submit"
              className="btn-beam px-7 py-3.5 rounded-2xl font-bold text-sm text-noir whitespace-nowrap cursor-pointer overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #FFC801, #FF9932)', boxShadow: '0 8px 24px rgba(255,200,1,0.3)' }}
            >
              Get Started Free
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl max-w-md mx-auto"
            style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span className="text-green-400 font-medium text-sm">You&apos;re on the list! We&apos;ll be in touch.</span>
          </div>
        )}

        <p className="mt-5 text-arctic/35 text-xs">
          No credit card required · Free 14-day trial · Cancel anytime
        </p>

        {/* Trust logos row */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 opacity-30">
          {['SOC 2','GDPR','ISO 27001','HIPAA'].map((badge) => (
            <div key={badge} className="px-3 py-1.5 rounded-lg border border-arctic/10 text-arctic text-xs font-mono">
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
