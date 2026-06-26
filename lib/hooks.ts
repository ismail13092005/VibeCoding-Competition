'use client'

import { useEffect, useRef, useState, useReducer, useCallback } from 'react'

/* ─── useIntersectionObserver ───────────────────────────────────────── */
export function useIntersectionObserver(
  options?: IntersectionObserverInit
): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, options)

    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return [ref, isVisible]
}

/* ─── useMediaQuery ─────────────────────────────────────────────────── */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])

  return matches
}

/* ─── usePricingState ───────────────────────────────────────────────── */
export type PricingAction =
  | { type: 'SET_BILLING'; payload: 'monthly' | 'annual' }
  | { type: 'SET_CURRENCY'; payload: 'INR' | 'USD' | 'EUR' }

export type PricingState = {
  billing: 'monthly' | 'annual'
  currency: 'INR' | 'USD' | 'EUR'
}

const pricingReducer = (state: PricingState, action: PricingAction): PricingState => {
  switch (action.type) {
    case 'SET_BILLING':
      return { ...state, billing: action.payload }
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload }
    default:
      return state
  }
}

export function usePricingState() {
  return useReducer(pricingReducer, { billing: 'monthly', currency: 'USD' })
}

/* ─── useScrolled ───────────────────────────────────────────────────── */
export function useScrolled(threshold = 50): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])

  return scrolled
}

/* ─── useRevealOnScroll ─────────────────────────────────────────────── */
export function useRevealOnScroll() {
  const applyReveal = useCallback(() => {
    const elements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    elements.forEach((el) => observer.observe(el))
    return observer
  }, [])

  useEffect(() => {
    const observer = applyReveal()
    return () => observer.disconnect()
  }, [applyReveal])
}
