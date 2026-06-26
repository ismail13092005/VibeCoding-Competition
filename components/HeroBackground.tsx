'use client'

import { useEffect, useRef } from 'react'

/**
 * HeroBackground — pure Canvas 2D + CSS
 *
 * Layers (back → front):
 * 1. Star-field with depth parallax (slow/mid/fast layers)
 * 2. Connecting neural-network lines between nearby particles
 * 3. Mouse-reactive particle that attracts nearest nodes
 * 4. CSS: 3D rotating wireframe rings (CSS perspective)
 * 5. CSS: Animated aurora gradient beams
 * 6. CSS: Floating 3D hex grid panels (CSS 3D transforms)
 */
export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })
  const rafRef    = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    /* ── Resize ── */
    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    /* ── Particles ── */
    type Particle = {
      x: number; y: number; vx: number; vy: number
      r: number; alpha: number; layer: number
      baseX: number; baseY: number
    }

    const COUNT = 120
    const particles: Particle[] = []

    const spawn = (): Particle => {
      const layer = Math.random() < 0.33 ? 0 : Math.random() < 0.5 ? 1 : 2
      const speed = [0.12, 0.22, 0.38][layer]
      const angle = Math.random() * Math.PI * 2
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      return {
        x, y, baseX: x, baseY: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: [1, 1.5, 2][layer] + Math.random() * 1,
        alpha: [0.25, 0.45, 0.7][layer],
        layer,
      }
    }

    for (let i = 0; i < COUNT; i++) particles.push(spawn())

    /* ── Draw ── */
    const CONNECT_DIST = 110
    const MOUSE_ATTRACT = 140

    let t = 0
    const draw = () => {
      t++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      /* move */
      for (const p of particles) {
        // mouse attraction (layer 2 only, subtle)
        if (p.layer === 2) {
          const dx = mx - p.x, dy = my - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_ATTRACT) {
            p.vx += (dx / dist) * 0.012
            p.vy += (dy / dist) * 0.012
          }
        }
        // drag
        p.vx *= 0.994
        p.vy *= 0.994

        p.x += p.vx
        p.y += p.vy

        // wrap
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -10) p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10
      }

      /* connections */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          // Only connect particles within same or adjacent layers
          if (Math.abs(a.layer - b.layer) > 1) continue
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            const strength = 1 - dist / CONNECT_DIST
            const alpha = strength * 0.3 * Math.min(a.alpha, b.alpha)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            // Gold → teal gradient per line
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
            grad.addColorStop(0, `rgba(255,200,1,${alpha})`)
            grad.addColorStop(1, `rgba(17,76,90,${alpha * 1.5})`)
            ctx.strokeStyle = grad
            ctx.lineWidth = strength * 0.8
            ctx.stroke()
          }
        }
      }

      /* dots */
      for (const p of particles) {
        // subtle pulse per particle
        const pulse = 0.85 + 0.15 * Math.sin(t * 0.04 + p.x * 0.01)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2)

        // glow for layer 2
        if (p.layer === 2) {
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.5)
          grd.addColorStop(0, `rgba(255,200,1,${p.alpha})`)
          grd.addColorStop(1, `rgba(255,200,1,0)`)
          ctx.fillStyle = grd
          ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2)
        } else {
          ctx.fillStyle = `rgba(255,200,1,${p.alpha * pulse})`
        }
        ctx.fill()
      }

      /* mouse halo */
      if (mx > 0 && mx < canvas.width) {
        const halo = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_ATTRACT)
        halo.addColorStop(0, 'rgba(255,200,1,0.06)')
        halo.addColorStop(1, 'rgba(255,200,1,0)')
        ctx.beginPath()
        ctx.arc(mx, my, MOUSE_ATTRACT, 0, Math.PI * 2)
        ctx.fillStyle = halo
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    /* mouse */
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">

      {/* ── 1. Canvas particle field ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.85 }}
      />

      {/* ── 2. Deep base gradient ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% 0%, #0a2a38 0%, #0d1e27 40%, #060f14 100%)',
          zIndex: -1,
        }}
      />

      {/* ── 3. Aurora beams ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Beam 1 */}
        <div style={{
          position: 'absolute',
          top: '-20%', left: '15%',
          width: '35%', height: '70%',
          background: 'linear-gradient(180deg, rgba(255,200,1,0.07) 0%, transparent 80%)',
          transform: 'skewX(-18deg)',
          filter: 'blur(40px)',
          animation: 'auroraBeam1 8s ease-in-out infinite',
        }} />
        {/* Beam 2 */}
        <div style={{
          position: 'absolute',
          top: '-20%', left: '50%',
          width: '25%', height: '60%',
          background: 'linear-gradient(180deg, rgba(17,76,90,0.25) 0%, transparent 80%)',
          transform: 'skewX(12deg)',
          filter: 'blur(50px)',
          animation: 'auroraBeam2 11s ease-in-out infinite',
        }} />
        {/* Beam 3 */}
        <div style={{
          position: 'absolute',
          top: '-10%', right: '5%',
          width: '20%', height: '55%',
          background: 'linear-gradient(180deg, rgba(255,153,50,0.06) 0%, transparent 80%)',
          transform: 'skewX(-8deg)',
          filter: 'blur(35px)',
          animation: 'auroraBeam3 13s ease-in-out infinite',
        }} />
      </div>

      {/* ── 4. CSS 3D rotating rings ── */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{ perspective: '800px' }}>

        {/* Ring 1 — slow tilt */}
        <div style={{
          position: 'absolute',
          width: 520, height: 520,
          borderRadius: '50%',
          border: '1px solid rgba(255,200,1,0.07)',
          animation: 'ring3d1 18s linear infinite',
          transformStyle: 'preserve-3d',
        }} />
        {/* Ring 2 — mid speed, different axis */}
        <div style={{
          position: 'absolute',
          width: 360, height: 360,
          borderRadius: '50%',
          border: '1px solid rgba(17,76,90,0.35)',
          animation: 'ring3d2 12s linear infinite',
          transformStyle: 'preserve-3d',
        }} />
        {/* Ring 3 — fast, inner */}
        <div style={{
          position: 'absolute',
          width: 200, height: 200,
          borderRadius: '50%',
          border: '1px solid rgba(255,200,1,0.12)',
          animation: 'ring3d3 7s linear infinite',
          transformStyle: 'preserve-3d',
        }} />

        {/* Dashed orbit ring */}
        <div style={{
          position: 'absolute',
          width: 680, height: 680,
          borderRadius: '50%',
          border: '1px dashed rgba(255,200,1,0.04)',
          animation: 'ring3d1 30s linear infinite reverse',
        }} />
      </div>

      {/* ── 5. Floating 3D hex-grid panels ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ perspective: '1200px' }}>

        {/* Panel TL */}
        <div style={{
          position: 'absolute',
          top: '8%', left: '2%',
          width: 180, height: 120,
          background: 'linear-gradient(135deg, rgba(17,76,90,0.15) 0%, rgba(23,43,54,0.05) 100%)',
          border: '1px solid rgba(255,200,1,0.06)',
          borderRadius: 12,
          backdropFilter: 'blur(4px)',
          animation: 'panel3d1 14s ease-in-out infinite',
          transform: 'rotateY(25deg) rotateX(8deg)',
        }}>
          <div style={{ padding: 12 }}>
            <div style={{ width: '60%', height: 4, background: 'rgba(255,200,1,0.15)', borderRadius: 2, marginBottom: 6 }} />
            <div style={{ width: '80%', height: 4, background: 'rgba(255,200,1,0.08)', borderRadius: 2, marginBottom: 6 }} />
            <div style={{ width: '45%', height: 4, background: 'rgba(255,200,1,0.06)', borderRadius: 2 }} />
          </div>
        </div>

        {/* Panel BR */}
        <div style={{
          position: 'absolute',
          bottom: '12%', right: '2%',
          width: 160, height: 100,
          background: 'linear-gradient(135deg, rgba(17,76,90,0.12) 0%, rgba(23,43,54,0.04) 100%)',
          border: '1px solid rgba(17,76,90,0.4)',
          borderRadius: 12,
          backdropFilter: 'blur(4px)',
          animation: 'panel3d2 17s ease-in-out infinite',
          transform: 'rotateY(-20deg) rotateX(-6deg)',
        }}>
          <div style={{ padding: 10 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
              {[40, 70, 55, 85, 60].map((h, i) => (
                <div key={i} style={{ flex: 1, height: h * 0.5, background: `rgba(255,200,1,${0.1 + i * 0.04})`, borderRadius: 2, alignSelf: 'flex-end' }} />
              ))}
            </div>
            <div style={{ width: '70%', height: 3, background: 'rgba(255,200,1,0.1)', borderRadius: 2 }} />
          </div>
        </div>

        {/* Panel TR */}
        <div style={{
          position: 'absolute',
          top: '20%', right: '1%',
          width: 140, height: 90,
          background: 'rgba(255,200,1,0.03)',
          border: '1px solid rgba(255,200,1,0.08)',
          borderRadius: 12,
          animation: 'panel3d3 10s ease-in-out infinite',
          transform: 'rotateY(-30deg) rotateX(12deg)',
        }}>
          <div style={{ padding: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,200,1,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFC801', boxShadow: '0 0 8px #FFC801' }} />
            </div>
            <div>
              <div style={{ width: 50, height: 4, background: 'rgba(255,200,1,0.2)', borderRadius: 2, marginBottom: 4 }} />
              <div style={{ width: 36, height: 3, background: 'rgba(74,222,128,0.3)', borderRadius: 2 }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── 6. Bottom vignette ── */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0d1e27 0%, transparent 100%)' }}
      />

      {/* ── 7. CSS keyframes injected ── */}
      <style>{`
        @keyframes auroraBeam1 {
          0%,100% { opacity: 0.6; transform: skewX(-18deg) translateX(0); }
          50%      { opacity: 1;   transform: skewX(-22deg) translateX(30px); }
        }
        @keyframes auroraBeam2 {
          0%,100% { opacity: 0.5; transform: skewX(12deg) translateX(0); }
          50%      { opacity: 0.9; transform: skewX(8deg)  translateX(-20px); }
        }
        @keyframes auroraBeam3 {
          0%,100% { opacity: 0.4; transform: skewX(-8deg) translateY(0); }
          50%      { opacity: 0.8; transform: skewX(-12deg) translateY(-15px); }
        }
        @keyframes ring3d1 {
          0%   { transform: rotateX(70deg) rotateZ(0deg); }
          100% { transform: rotateX(70deg) rotateZ(360deg); }
        }
        @keyframes ring3d2 {
          0%   { transform: rotateX(60deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(60deg) rotateY(45deg) rotateZ(360deg); }
        }
        @keyframes ring3d3 {
          0%   { transform: rotateY(80deg) rotateZ(0deg); }
          100% { transform: rotateY(80deg) rotateZ(-360deg); }
        }
        @keyframes panel3d1 {
          0%,100% { transform: rotateY(25deg) rotateX(8deg) translateY(0px); }
          50%      { transform: rotateY(18deg) rotateX(12deg) translateY(-12px); }
        }
        @keyframes panel3d2 {
          0%,100% { transform: rotateY(-20deg) rotateX(-6deg) translateY(0px); }
          50%      { transform: rotateY(-28deg) rotateX(-10deg) translateY(-10px); }
        }
        @keyframes panel3d3 {
          0%,100% { transform: rotateY(-30deg) rotateX(12deg) translateY(0px); }
          50%      { transform: rotateY(-22deg) rotateX(6deg) translateY(-8px); }
        }
      `}</style>
    </div>
  )
}
