'use client'

import { useState, useEffect, useRef } from 'react'
import { useScrolled } from '@/lib/hooks'

const navLinks = [
  { label: 'Features',     href: '#features'     },
  { label: 'Pricing',      href: '#pricing'       },
  { label: 'Testimonials', href: '#testimonials'  },
  { label: 'FAQ',          href: '#faq'           },
]

export default function Navigation() {
  const scrolled   = useScrolled(50)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('')
  const indicatorRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Active section tracker
  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>('section[id]')
      let cur = ''
      sections.forEach((s) => { if (s.getBoundingClientRect().top <= 100) cur = s.id })
      const matched = navLinks.find((l) => l.href === `#${cur}`)
      if (matched) setActiveHref(matched.href)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Slide the active indicator
  useEffect(() => {
    const nav = navRef.current
    const indicator = indicatorRef.current
    if (!nav || !indicator || !activeHref) return
    const activeEl = nav.querySelector<HTMLElement>(`a[href="${activeHref}"]`)
    if (!activeEl) return
    const navRect = nav.getBoundingClientRect()
    const elRect  = activeEl.getBoundingClientRect()
    indicator.style.left   = `${elRect.left - navRect.left}px`
    indicator.style.width  = `${elRect.width}px`
    indicator.style.opacity = '1'
  }, [activeHref])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    setActiveHref(href)
    const target = document.querySelector(href)
    target?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        transition: 'background 0.4s ease, height 0.3s ease, box-shadow 0.3s ease',
        height: scrolled ? 56 : 64,
        background: scrolled ? 'rgba(23,43,54,0.92)' : 'rgba(23,43,54,0.6)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      {/* Animated bottom border */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,200,1,0.4) 30%, rgba(255,153,50,0.4) 70%, transparent 100%)',
          opacity: scrolled ? 1 : 0,
          transition: 'opacity 0.4s ease',
          animation: scrolled ? 'navBorderPulse 3s ease-in-out infinite' : 'none',
        }}
      />

      <nav
        role="navigation"
        aria-label="Main navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between"
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-1 group flex-shrink-0" aria-label="FlowAI — back to top">
          <span
            className="font-mono text-xl font-bold text-arctic tracking-tight"
            style={{
              fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace',
              transition: 'color 0.2s ease',
            }}
          >Flow</span>
          <span
            className="font-mono text-xl font-bold text-forsythia tracking-tight"
            style={{ fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace' }}
          >AI</span>
          <span className="w-1.5 h-1.5 rounded-full bg-forsythia ml-0.5 animate-pulse-glow" aria-hidden="true" />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 relative">
          <ul ref={navRef} className="flex items-center gap-8 relative" role="list">
            {/* Sliding active indicator */}
            <div
              ref={indicatorRef}
              aria-hidden="true"
              style={{
                position: 'absolute', bottom: -4, height: 2, borderRadius: 1,
                background: 'linear-gradient(90deg, #FFC801, #FF9932)',
                opacity: 0,
                transition: 'left 0.3s var(--ease-spring), width 0.3s var(--ease-spring), opacity 0.2s ease',
                boxShadow: '0 0 8px rgba(255,200,1,0.5)',
              }}
            />
            {navLinks.map(({ label, href }) => {
              const isActive = activeHref === href
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(href) }}
                    className="relative text-sm font-medium transition-all duration-150 ease-out"
                    style={{
                      color: isActive ? '#FFC801' : 'rgba(241,246,244,0.7)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = '#FFC801'
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = 'rgba(241,246,244,0.7)'
                    }}
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className="btn-ghost btn-ripple"
            style={{ padding: '8px 20px', borderRadius: 10, fontSize: '0.875rem' }}
          >
            Sign In
          </button>
          <button
            className="btn-primary btn-beam btn-ripple magnetic"
            style={{ padding: '8px 20px', borderRadius: 10, fontSize: '0.875rem', fontWeight: 600 }}
          >
            Get Started
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-arctic/80 transition-all duration-150"
          style={{
            transition: 'color 0.15s ease, background 0.15s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.color = '#FFC801'
            el.style.background = 'rgba(17,76,90,0.4)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.color = ''
            el.style.background = ''
          }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="3"  y1="6"  x2="21" y2="6"
              style={{ transformOrigin: 'center', transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
            <line x1="3"  y1="12" x2="21" y2="12"
              style={{ transition: 'opacity 0.3s ease', opacity: menuOpen ? 0 : 1 }} />
            <line x1="3"  y1="18" x2="21" y2="18"
              style={{ transformOrigin: 'center', transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="menu"
        style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? '400px' : '0',
          transition: 'max-height 0.4s var(--ease-spring)',
          background: 'rgba(13,30,39,0.98)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <ul className="flex flex-col gap-1 px-4 pt-2 pb-4" role="list">
          {navLinks.map(({ label, href }, i) => (
            <li key={href} style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'none' : 'translateX(-16px)', transition: `opacity 0.3s ease ${i * 50}ms, transform 0.3s var(--ease-spring) ${i * 50}ms` }}>
              <a
                href={href}
                role="menuitem"
                onClick={(e) => { e.preventDefault(); handleNavClick(href) }}
                className="block px-3 py-3 text-sm font-medium rounded-xl transition-all duration-150"
                style={{ color: activeHref === href ? '#FFC801' : 'rgba(241,246,244,0.8)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(17,76,90,0.4)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '' }}
              >
                {label}
              </a>
            </li>
          ))}
          <li className="pt-2 flex flex-col gap-2">
            <button className="btn-ghost btn-ripple w-full" style={{ padding: '10px', borderRadius: 10, fontSize: '0.875rem' }}>Sign In</button>
            <button className="btn-primary btn-beam btn-ripple w-full" style={{ padding: '10px', borderRadius: 10, fontSize: '0.875rem' }}>Get Started</button>
          </li>
        </ul>
      </div>

      <style>{`@keyframes navBorderPulse { 0%,100%{opacity:0.5} 50%{opacity:1} }`}</style>
    </header>
  )
}
