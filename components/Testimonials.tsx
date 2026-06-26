'use client'

import { useEffect, useRef } from 'react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO · Launchpad Labs',
    initials: 'SC',
    color: '#FFC801',
    textColor: '#172B36',
    quote: 'FlowAI cut our deployment cycle from 3 weeks to 2 days. The AI code generation alone saved 40+ hours per sprint. Nothing else comes close.',
    rating: 5,
    metric: '14× faster deploys',
  },
  {
    name: 'Marcus Reid',
    role: 'Lead Engineer · Orbit Systems',
    initials: 'MR',
    color: '#FF9932',
    textColor: '#172B36',
    quote: 'We evaluated 8 tools. FlowAI eliminated every bottleneck we had — the bento workspace, real-time collab, and one-click deploys are genuinely magical.',
    rating: 5,
    metric: 'Zero DevOps overhead',
  },
  {
    name: 'Priya Nair',
    role: 'VP Product · Stellar HQ',
    initials: 'PN',
    color: '#114C5A',
    textColor: '#FFC801',
    quote: 'Our PM team now prototypes in FlowAI before handing off to engineering. The feedback loop is 10× tighter. Product quality went through the roof.',
    rating: 5,
    metric: '10× faster feedback',
  },
]

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FFC801" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.tcard')
    if (!cards?.length) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  /* 3D tilt */
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = (e.clientX - left) / width  - 0.5
    const y = (e.clientY - top)  / height - 0.5
    el.style.transform = `translateY(-8px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`
    el.style.transition = 'transform 0.1s ease-out'
  }
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement
    el.style.transform = 'translateY(0) rotateY(0) rotateX(0) scale(1)'
    el.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1)'
  }

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
      className="py-28 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0f2230 0%, #172B36 100%)' }}
    >
      {/* ── Bioluminescent ocean bg ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Base */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(160deg, #0a1f2e 0%, #0f2230 50%, #091825 100%)' }}/>
        {/* Large deep glow */}
        <div style={{
          position:'absolute', bottom:'-10%', left:'50%', transform:'translateX(-50%)',
          width:900, height:500,
          background:'radial-gradient(ellipse, rgba(17,76,90,0.35) 0%, transparent 65%)',
          filter:'blur(60px)',
        }}/>
        {/* Floating bioluminescent dots */}
        {([
          {w:4,h:4,top:'15%',left:'10%',dur:'7s',del:'0s',color:'rgba(255,200,1,0.4)'},
          {w:6,h:6,top:'35%',left:'25%',dur:'9s',del:'1s',color:'rgba(17,76,90,0.8)'},
          {w:3,h:3,top:'60%',left:'8%',dur:'6s',del:'2s',color:'rgba(255,200,1,0.3)'},
          {w:5,h:5,top:'20%',left:'75%',dur:'11s',del:'0.5s',color:'rgba(255,153,50,0.35)'},
          {w:4,h:4,top:'70%',left:'80%',dur:'8s',del:'1.5s',color:'rgba(255,200,1,0.25)'},
          {w:7,h:7,top:'45%',left:'55%',dur:'13s',del:'3s',color:'rgba(17,76,90,0.6)'},
          {w:3,h:3,top:'80%',left:'40%',dur:'7s',del:'4s',color:'rgba(255,200,1,0.2)'},
          {w:5,h:5,top:'10%',left:'50%',dur:'10s',del:'2s',color:'rgba(255,153,50,0.2)'},
        ] as Array<{w:number,h:number,top:string,left:string,dur:string,del:string,color:string}>).map((d,i) => (
          <div key={i} style={{
            position:'absolute', top:d.top, left:d.left,
            width:d.w, height:d.h, borderRadius:'50%',
            background:d.color,
            boxShadow:`0 0 ${d.w*3}px ${d.color}`,
            animation:`bioDrift ${d.dur} ease-in-out infinite`,
            animationDelay:d.del,
          }}/>
        ))}
        {/* Diagonal light ray */}
        <div style={{
          position:'absolute', top:'-20%', left:'60%',
          width:200, height:'140%',
          background:'linear-gradient(180deg, rgba(255,200,1,0.03) 0%, transparent 100%)',
          transform:'skewX(-15deg)',
          filter:'blur(20px)',
          animation:'rayPulse 8s ease-in-out infinite',
        }}/>
      </div>
      <style>{`
        @keyframes bioDrift {
          0%,100%{transform:translate(0,0) scale(1)}
          33%{transform:translate(8px,-12px) scale(1.2)}
          66%{transform:translate(-6px,6px) scale(0.9)}
        }
        @keyframes rayPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 reveal">
          <div className="tag-pill mb-5 inline-flex">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Customer stories
          </div>
          <h2 id="testimonials-heading"
            className="font-mono font-bold text-arctic mb-4"
            style={{ fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace', fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
            What teams are saying
          </h2>
          <p className="text-arctic/55 text-lg max-w-xl mx-auto">Real results from real teams.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              className="tcard group relative rounded-2xl p-8 glass-card overflow-hidden cursor-default"
              style={{
                opacity: 0, transform: 'translateY(28px)',
                transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`,
                transformStyle: 'preserve-3d',
              }}
              aria-label={`Testimonial from ${t.name}`}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${t.color}60, transparent)` }}
                aria-hidden="true"
              />

              {/* Metric badge */}
              <div className="absolute top-5 right-5">
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full"
                  style={{ background: `${t.color}15`, color: t.color, border: `1px solid ${t.color}25` }}>
                  {t.metric}
                </span>
              </div>

              <Stars n={t.rating} />

              {/* Large quote mark */}
              <div className="text-7xl font-serif leading-none text-forsythia/20 mt-2 mb-1 select-none" aria-hidden="true">"</div>

              <blockquote className="text-arctic/80 leading-relaxed text-base flex-1 mb-6">
                {t.quote}
              </blockquote>

              <footer className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 transition-transform duration-200 ease-out group-hover:scale-110"
                  style={{ background: t.color, color: t.textColor, boxShadow: `0 0 20px ${t.color}40` }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-arctic">{t.name}</div>
                  <div className="text-xs text-arctic/40">{t.role}</div>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>

      <style>{`.tcard.visible { opacity: 1 !important; transform: translateY(0) !important; }`}</style>
    </section>
  )
}
