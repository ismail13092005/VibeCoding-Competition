'use client'

/**
 * SectionBackground — reusable dynamic 3D background for non-hero sections.
 * Uses pure CSS + inline SVG, zero canvas overhead, hardware-accelerated.
 *
 * variant:
 *  'dots'   — animated dot matrix with floating orbs
 *  'lines'  — diagonal animated lines with teal pulse
 *  'grid'   — pulsing grid with corner glows
 */
export default function SectionBackground({
  variant = 'dots',
  intensity = 1,
}: {
  variant?: 'dots' | 'lines' | 'grid'
  intensity?: number
}) {
  const op = intensity

  if (variant === 'lines') return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Diagonal moving lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <pattern id="diag-lines" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <line x1="0" y1="80" x2="80" y2="0" stroke={`rgba(255,200,1,${0.04 * op})`} strokeWidth="0.5"/>
            <line x1="-20" y1="80" x2="60" y2="0" stroke={`rgba(17,76,90,${0.06 * op})`} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag-lines)" style={{ animation: 'diagScroll 20s linear infinite' }}/>
      </svg>
      {/* Teal glows */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 300, height: 300, borderRadius: '50%',
        background: `radial-gradient(circle, rgba(17,76,90,${0.3 * op}) 0%, transparent 70%)`,
        filter: 'blur(60px)', animation: 'float-alt 12s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '8%', width: 250, height: 250, borderRadius: '50%',
        background: `radial-gradient(circle, rgba(255,200,1,${0.05 * op}) 0%, transparent 70%)`,
        filter: 'blur(50px)', animation: 'float-alt 15s ease-in-out infinite reverse' }} />
      <style>{`@keyframes diagScroll { from{transform:translateY(0)} to{transform:translateY(80px)} }`}</style>
    </div>
  )

  if (variant === 'grid') return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-grid-pulse" style={{ opacity: 0.4 * op }} />
      {/* Corner accent glows */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 400, height: 400,
        background: `radial-gradient(circle at 0% 0%, rgba(255,200,1,${0.06 * op}), transparent 60%)` }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 400, height: 400,
        background: `radial-gradient(circle at 100% 100%, rgba(17,76,90,${0.25 * op}), transparent 60%)` }} />
      {/* Horizontal scan line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, rgba(255,200,1,${0.3 * op}), transparent)`,
        animation: 'sectionScan 6s ease-in-out infinite',
      }}/>
      <style>{`
        @keyframes sectionScan {
          0%   { top: 0%;   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  )

  // dots (default)
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-dots" style={{ opacity: 0.5 * op }} />
      {/* Floating orbs with 3D-ish perspective offset */}
      {[
        { top: '10%',  left: '5%',   size: 280, color: `rgba(255,200,1,${0.05 * op})`,  delay: '0s',   dur: '11s' },
        { top: '60%',  right: '5%',  size: 240, color: `rgba(17,76,90,${0.3 * op})`,    delay: '3s',   dur: '13s' },
        { top: '35%',  left: '45%',  size: 180, color: `rgba(255,153,50,${0.04 * op})`, delay: '1.5s', dur: '9s'  },
      ].map((orb, i) => (
        <div key={i} style={{
          position: 'absolute', borderRadius: '50%',
          top: orb.top, left: ('left' in orb) ? (orb as { left: string }).left : undefined,
          right: ('right' in orb) ? (orb as { right: string }).right : undefined,
          width: orb.size, height: orb.size,
          background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          animation: `float-alt ${orb.dur} ease-in-out infinite`,
          animationDelay: orb.delay,
        }} />
      ))}
    </div>
  )
}
