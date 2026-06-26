'use client'

const companies = [
  { name: 'Stripe',    mono: true  },
  { name: 'Vercel',    mono: false },
  { name: 'Linear',    mono: true  },
  { name: 'Notion',    mono: false },
  { name: 'Arc',       mono: true  },
  { name: 'Figma',     mono: false },
  { name: 'GitHub',    mono: true  },
  { name: 'Shopify',   mono: false },
  { name: 'Airbnb',    mono: true  },
  { name: 'Spotify',   mono: false },
  { name: 'Atlassian', mono: true  },
  { name: 'Twilio',    mono: false },
]

const items = [...companies, ...companies]

export default function TrustedCompanies() {
  return (
    <section
      aria-label="Trusted companies"
      className="relative py-14 overflow-hidden"
      style={{ background: '#0f2230' }}
    >
      {/* ── 3D starfield bg ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Nebula center glow */}
        <div style={{
          position:'absolute', top:'50%', left:'50%',
          width:600, height:200,
          transform:'translate(-50%,-50%)',
          background:'radial-gradient(ellipse, rgba(17,76,90,0.4) 0%, transparent 70%)',
          filter:'blur(40px)',
          animation:'nebulaPulse 6s ease-in-out infinite',
        }}/>
        {/* Drifting dots row */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, bottom:0,
          backgroundImage:'radial-gradient(circle, rgba(241,246,244,0.15) 1px, transparent 1px)',
          backgroundSize:'80px 40px',
          animation:'starDrift 40s linear infinite',
        }}/>
        {/* Gold shimmer line */}
        <div style={{
          position:'absolute', bottom:0, left:0, right:0, height:1,
          background:'linear-gradient(90deg, transparent, rgba(255,200,1,0.3), transparent)',
          animation:'shimmerLine 4s ease-in-out infinite',
        }}/>
      </div>
      <style>{`
        @keyframes nebulaPulse { 0%,100%{opacity:0.6;transform:translate(-50%,-50%) scale(1)} 50%{opacity:1;transform:translate(-50%,-50%) scale(1.1)} }
        @keyframes starDrift { from{transform:translateX(0)} to{transform:translateX(80px)} }
        @keyframes shimmerLine { 0%,100%{opacity:0.3} 50%{opacity:0.8} }
      `}</style>

      {/* Subtle top/bottom gradient borders */}
      <div className="section-divider absolute top-0 left-0 right-0" aria-hidden="true" />
      <div className="section-divider absolute bottom-0 left-0 right-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-8">
        <p className="text-xs font-medium text-arctic/30 uppercase tracking-[0.2em]">
          Powering teams at
        </p>
      </div>

      {/* Marquee row 1 — left */}
      <div
        className="relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <div
          className="flex gap-14 whitespace-nowrap"
          style={{ animation: 'marquee 30s linear infinite', width: 'max-content' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = 'paused' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = 'running' }}
          aria-hidden="true"
        >
          {items.map((c, i) => (
            <span
              key={i}
              className="text-lg select-none transition-all duration-200 ease-out cursor-default"
              style={{
                fontFamily: c.mono ? 'var(--font-jetbrains, JetBrains Mono), monospace' : 'var(--font-inter, Inter), sans-serif',
                fontWeight: c.mono ? 700 : 600,
                color: 'rgba(241,246,244,0.22)',
                letterSpacing: c.mono ? '-0.02em' : '0',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.color = '#FFC801'
                el.style.textShadow = '0 0 20px rgba(255,200,1,0.4)'
                el.style.transform = 'scale(1.08)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.color = 'rgba(241,246,244,0.22)'
                el.style.textShadow = 'none'
                el.style.transform = 'scale(1)'
              }}
            >
              {c.name}
            </span>
          ))}
        </div>
      </div>

      {/* Screen-reader accessible list */}
      <ul className="sr-only">
        {companies.map((c) => <li key={c.name}>{c.name}</li>)}
      </ul>
    </section>
  )
}
