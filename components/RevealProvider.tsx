'use client'

import { useEffect } from 'react'

/**
 * RevealProvider — global motion engine
 * 1. IntersectionObserver for all .reveal* classes with stagger
 * 2. Magnetic effect on .magnetic elements
 * 3. Ripple effect on .btn-ripple elements
 * 4. Icon hover animations on .icon-bounce, .icon-spin
 */
export default function RevealProvider() {
  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur')
        .forEach((el) => el.classList.add('visible'))
      return
    }

    /* ── 1. Scroll Reveal ── */
    const REVEAL_CLASSES = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur'
    const allEls = document.querySelectorAll<HTMLElement>(REVEAL_CLASSES)

    // Apply stagger delays to sibling groups
    allEls.forEach((el) => {
      const parent = el.parentElement
      if (!parent) return
      const siblings = parent.querySelectorAll<HTMLElement>(REVEAL_CLASSES)
      siblings.forEach((sib, idx) => {
        if (!sib.style.transitionDelay) {
          sib.style.transitionDelay = `${idx * 80}ms`
        }
      })
    })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    allEls.forEach((el) => io.observe(el))

    /* ── 2. Magnetic buttons ── */
    const magnets = document.querySelectorAll<HTMLElement>('.magnetic')
    const cleanup: (() => void)[] = []

    magnets.forEach((btn) => {
      const move = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect()
        const dx = (e.clientX - (rect.left + rect.width  / 2)) * 0.3
        const dy = (e.clientY - (rect.top  + rect.height / 2)) * 0.3
        btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`
      }
      const leave = () => { btn.style.transform = '' }
      btn.addEventListener('mousemove', move)
      btn.addEventListener('mouseleave', leave)
      cleanup.push(() => { btn.removeEventListener('mousemove', move); btn.removeEventListener('mouseleave', leave) })
    })

    /* ── 3. Ripple effect ── */
    const rippleBtns = document.querySelectorAll<HTMLElement>('.btn-ripple')
    rippleBtns.forEach((btn) => {
      const handler = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const ripple = document.createElement('span')
        ripple.className = 'ripple'
        ripple.style.left = `${x}px`
        ripple.style.top  = `${y}px`
        btn.appendChild(ripple)
        setTimeout(() => ripple.remove(), 700)
      }
      btn.addEventListener('click', handler)
      cleanup.push(() => btn.removeEventListener('click', handler))
    })

    return () => {
      io.disconnect()
      cleanup.forEach((fn) => fn())
    }
  }, [])

  return null
}
