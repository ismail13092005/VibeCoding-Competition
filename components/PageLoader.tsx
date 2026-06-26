'use client'

import { useEffect, useState } from 'react'

/**
 * PageLoader — elegant sub-500ms intro sequence
 * Renders a full-screen loader that dissolves away, then unmounts.
 * Uses only CSS transforms + opacity — zero layout triggers.
 */
export default function PageLoader() {
  const [phase, setPhase] = useState<'loading' | 'dissolving' | 'done'>('loading')

  useEffect(() => {
    // After 380ms start the dissolve
    const t1 = setTimeout(() => setPhase('dissolving'), 380)
    // After dissolve animation (500ms) unmount completely
    const t2 = setTimeout(() => setPhase('done'), 900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#060f14',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 16,
        transition: 'opacity 500ms cubic-bezier(0.22,1,0.36,1), transform 500ms cubic-bezier(0.22,1,0.36,1)',
        opacity: phase === 'dissolving' ? 0 : 1,
        transform: phase === 'dissolving' ? 'scale(1.04)' : 'scale(1)',
        pointerEvents: phase === 'dissolving' ? 'none' : 'all',
      }}
    >
      {/* Logo mark */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 2,
        animation: 'loaderLogo 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
        opacity: 0,
      }}>
        <span style={{
          fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace',
          fontSize: '2rem', fontWeight: 700, color: '#F1F6F4', letterSpacing: '-0.03em',
        }}>Flow</span>
        <span style={{
          fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace',
          fontSize: '2rem', fontWeight: 700, color: '#FFC801', letterSpacing: '-0.03em',
        }}>AI</span>
        <span style={{
          width: 8, height: 8, borderRadius: '50%', background: '#FFC801',
          boxShadow: '0 0 12px rgba(255,200,1,0.8)', marginLeft: 2,
          animation: 'dotPulse 1s ease-in-out infinite',
        }}/>
      </div>

      {/* Progress bar */}
      <div style={{
        width: 120, height: 2, borderRadius: 1,
        background: 'rgba(255,200,1,0.15)', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', borderRadius: 1,
          background: 'linear-gradient(90deg, #FFC801, #FF9932)',
          animation: 'loaderBar 380ms cubic-bezier(0.22,1,0.36,1) forwards',
        }}/>
      </div>

      <style>{`
        @keyframes loaderLogo {
          from { opacity: 0; transform: translateY(12px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes loaderBar {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes dotPulse {
          0%,100% { transform: scale(1); box-shadow: 0 0 8px rgba(255,200,1,0.6); }
          50%     { transform: scale(1.4); box-shadow: 0 0 20px rgba(255,200,1,0.9); }
        }
      `}</style>
    </div>
  )
}
