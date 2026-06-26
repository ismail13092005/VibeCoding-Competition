'use client'

import { useEffect, useRef } from 'react'

/**
 * ScrollProgress — thin gold top bar + back-to-top button
 * All updates via direct DOM mutations — zero React re-renders on scroll.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const navLinksRef = useRef<NodeListOf<HTMLAnchorElement> | null>(null)

  useEffect(() => {
    const bar = barRef.current
    const btn = btnRef.current
    if (!bar || !btn) return

    // Cache nav anchor hrefs → section elements
    navLinksRef.current = document.querySelectorAll('nav a[href^="#"]')

    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

      // Progress bar
      bar.style.transform = `scaleX(${progress / 100})`

      // Back-to-top button
      const visible = scrollTop > 400
      btn.style.opacity = visible ? '1' : '0'
      btn.style.transform = visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.9)'
      btn.style.pointerEvents = visible ? 'auto' : 'none'

      // Active nav link highlight
      const sections = document.querySelectorAll<HTMLElement>('section[id], div[id]')
      let activeId = ''
      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top
        if (top <= 80) activeId = section.id
      })

      navLinksRef.current?.forEach((link) => {
        const href = link.getAttribute('href') ?? ''
        const isActive = href === `#${activeId}`
        if (isActive) {
          link.style.color = '#FFC801'
          link.setAttribute('aria-current', 'page')
        } else {
          link.style.color = ''
          link.removeAttribute('aria-current')
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // init
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      {/* Progress bar */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 9998,
          background: 'linear-gradient(90deg, #FFC801, #FF9932)',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
          transition: 'transform 0.1s linear',
          boxShadow: '0 0 8px rgba(255,200,1,0.5)',
        }}
        ref={barRef}
      />

      {/* Back to top */}
      <button
        ref={btnRef}
        onClick={scrollToTop}
        aria-label="Back to top"
        style={{
          position: 'fixed', bottom: 32, right: 24, zIndex: 9997,
          width: 44, height: 44, borderRadius: '50%',
          background: 'linear-gradient(135deg, #FFC801, #FF9932)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0, transform: 'translateY(16px) scale(0.9)',
          transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s ease',
          boxShadow: '0 4px 16px rgba(255,200,1,0.3)',
          pointerEvents: 'none',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.transform = 'translateY(0) scale(1.12)'
          el.style.boxShadow = '0 8px 32px rgba(255,200,1,0.5)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.transform = 'translateY(0) scale(1)'
          el.style.boxShadow = '0 4px 16px rgba(255,200,1,0.3)'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#172B36" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
    </>
  )
}
