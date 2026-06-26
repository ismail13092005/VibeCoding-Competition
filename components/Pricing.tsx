'use client'

/**
 * Pricing — Feature 1: Matrix-Driven Pricing & Performance-Isolated Currency Switcher
 *
 * RE-RENDER ISOLATION STRATEGY:
 * The outer Pricing shell renders ONCE and never re-renders on billing/currency changes.
 * State is held in a plain object ref (no useState/useReducer on the shell).
 * Price text nodes are updated via direct DOM mutation — zero React reconciliation.
 */

import {
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
  memo,
} from 'react'
import { PRICING_CONFIG, computePrice, type Currency, type Billing } from '@/lib/pricing'
import SectionBackground from './SectionBackground'

/* ─── Types ─────────────────────────────────────────────────────────── */
type PriceHandle = { update: (billing: Billing, currency: Currency) => void }

/* ─── Check Icon ─────────────────────────────────────────────────────── */
const CheckIcon = memo(function CheckIcon() {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className="text-forsythia flex-shrink-0 mt-0.5"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
})

/* ─── PriceDisplay — mounts once, updates via DOM ref ────────────────── */
const PriceDisplay = forwardRef<PriceHandle, {
  planIndex: number
  initialBilling: Billing
  initialCurrency: Currency
}>(function PriceDisplay({ planIndex, initialBilling, initialCurrency }, ref) {
  const plan = PRICING_CONFIG.plans[planIndex]
  const amountRef = useRef<HTMLSpanElement>(null)
  const symbolRef = useRef<HTMLSpanElement>(null)
  const annualRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    update(billing: Billing, currency: Currency) {
      const price = computePrice(plan.monthlyPrices[currency], billing, PRICING_CONFIG.annualDiscount)
      const symbol = PRICING_CONFIG.currencySymbols[currency]
      const annualTotal = Math.round(price * 12)
      if (amountRef.current) amountRef.current.textContent = price.toLocaleString()
      if (symbolRef.current) symbolRef.current.textContent = symbol
      if (annualRef.current) {
        if (billing === 'annual') {
          annualRef.current.textContent = `${symbol}${annualTotal.toLocaleString()} billed annually · Save 20%`
          annualRef.current.style.opacity = '1'
        } else {
          annualRef.current.style.opacity = '0'
        }
      }
    }
  }), [plan])

  const initialPrice  = computePrice(plan.monthlyPrices[initialCurrency], initialBilling, PRICING_CONFIG.annualDiscount)
  const initialSymbol = PRICING_CONFIG.currencySymbols[initialCurrency]
  const initialAnnual = Math.round(initialPrice * 12)

  return (
    <div className="mb-6">
      <div className="flex items-end gap-1">
        <span
          className="font-mono font-bold text-arctic"
          style={{
            fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace',
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            lineHeight: 1,
          }}
        >
          <span ref={symbolRef}>{initialSymbol}</span>
          <span ref={amountRef}>{initialPrice.toLocaleString()}</span>
        </span>
        <span className="text-arctic/40 text-sm mb-1">/mo</span>
      </div>
      <div
        ref={annualRef}
        className="text-xs text-forsythia mt-1 transition-opacity duration-200"
        style={{ opacity: initialBilling === 'annual' ? 1 : 0 }}
        aria-live="polite"
      >
        {initialSymbol}{initialAnnual.toLocaleString()} billed annually · Save 20%
      </div>
    </div>
  )
})

/* ─── PlanCard — memo-ized, never re-renders ─────────────────────────── */
const PlanCard = memo(forwardRef<PriceHandle, {
  planIndex: number
  initialBilling: Billing
  initialCurrency: Currency
}>(function PlanCard({ planIndex, initialBilling, initialCurrency }, ref) {
  const plan = PRICING_CONFIG.plans[planIndex]

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-7 border transition-transform duration-200 ease-out hover:-translate-y-1 ${
        plan.highlighted
          ? 'border-forsythia/60 bg-nocturnal shadow-xl shadow-forsythia/10'
          : 'border-nocturnal/60 bg-nocturnal/20 hover:border-forsythia/30 hover:shadow-lg hover:shadow-nocturnal/30'
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2" aria-label="Most popular plan">
          <span className="px-3 py-1 rounded-full text-xs font-bold text-noir bg-forsythia whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3
          className="font-mono font-bold text-arctic text-lg mb-1"
          style={{ fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace' }}
        >
          {plan.name}
        </h3>
        <p className="text-arctic/50 text-sm">{plan.description}</p>
      </div>

      <PriceDisplay
        ref={ref}
        planIndex={planIndex}
        initialBilling={initialBilling}
        initialCurrency={initialCurrency}
      />

      <button
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-colors duration-150 ease-out mb-6 cursor-pointer ${
          plan.highlighted
            ? 'bg-forsythia text-noir hover:bg-saffron'
            : 'bg-nocturnal/60 text-arctic border border-arctic/20 hover:border-forsythia/40 hover:text-forsythia'
        }`}
        aria-label={`${plan.cta} — ${plan.name} plan`}
      >
        {plan.cta}
      </button>

      <ul className="space-y-3" role="list" aria-label={`${plan.name} features`}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-arctic/70">
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}))

/* ─── Pricing Shell — renders ONCE, never re-renders ─────────────────── */
export default function Pricing() {
  const billingRef  = useRef<Billing>('monthly')
  const currencyRef = useRef<Currency>('USD')
  const priceHandles    = useRef<(PriceHandle | null)[]>([null, null, null])
  const billingBtnRefs  = useRef<(HTMLButtonElement | null)[]>([null, null])
  const currencyBtnRefs = useRef<(HTMLButtonElement | null)[]>([null, null, null])

  const pushPriceUpdates = useCallback(() => {
    priceHandles.current.forEach((h) => h?.update(billingRef.current, currencyRef.current))
  }, [])

  const updateBillingUI = useCallback((billing: Billing) => {
    const idx = billing === 'monthly' ? 0 : 1
    billingBtnRefs.current.forEach((btn, i) => {
      if (!btn) return
      if (i === idx) {
        btn.classList.add('bg-forsythia', 'text-noir')
        btn.classList.remove('text-arctic/60', 'hover:text-arctic')
        btn.setAttribute('aria-pressed', 'true')
      } else {
        btn.classList.remove('bg-forsythia', 'text-noir')
        btn.classList.add('text-arctic/60', 'hover:text-arctic')
        btn.setAttribute('aria-pressed', 'false')
      }
    })
  }, [])

  const updateCurrencyUI = useCallback((currency: Currency) => {
    const currencies: Currency[] = ['INR', 'USD', 'EUR']
    const idx = currencies.indexOf(currency)
    currencyBtnRefs.current.forEach((btn, i) => {
      if (!btn) return
      if (i === idx) {
        btn.classList.add('bg-forsythia', 'text-noir')
        btn.classList.remove('text-arctic/60', 'hover:text-arctic')
        btn.setAttribute('aria-pressed', 'true')
      } else {
        btn.classList.remove('bg-forsythia', 'text-noir')
        btn.classList.add('text-arctic/60', 'hover:text-arctic')
        btn.setAttribute('aria-pressed', 'false')
      }
    })
  }, [])

  const handleBilling = useCallback((billing: Billing) => {
    if (billingRef.current === billing) return
    billingRef.current = billing
    updateBillingUI(billing)
    pushPriceUpdates()
  }, [updateBillingUI, pushPriceUpdates])

  const handleCurrency = useCallback((currency: Currency) => {
    if (currencyRef.current === currency) return
    currencyRef.current = currency
    updateCurrencyUI(currency)
    pushPriceUpdates()
  }, [updateCurrencyUI, pushPriceUpdates])

  useEffect(() => {
    updateBillingUI(billingRef.current)
    updateCurrencyUI(currencyRef.current)
  }, [updateBillingUI, updateCurrencyUI])

  const currencies: Currency[] = ['INR', 'USD', 'EUR']
  const billings: Billing[]    = ['monthly', 'annual']

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative py-24 px-4 sm:px-6 overflow-hidden"
      style={{ background: '#172B36' }}
    >
      <SectionBackground variant="grid" intensity={0.7} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2
            id="pricing-heading"
            className="font-mono font-bold text-arctic mb-4"
            style={{
              fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            }}
          >
            Simple, transparent pricing
          </h2>
          <p className="text-arctic/60 text-lg max-w-xl mx-auto">
            Start free. Scale as you grow. No hidden fees.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <div
            className="flex items-center rounded-xl border border-nocturnal/60 bg-nocturnal/20 p-1"
            role="group"
            aria-label="Billing period"
          >
            {billings.map((b, i) => (
              <button
                key={b}
                ref={(el) => { billingBtnRefs.current[i] = el }}
                onClick={() => handleBilling(b)}
                aria-pressed="false"
                className="relative px-5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ease-out cursor-pointer"
              >
                {b === 'monthly' ? 'Monthly' : (
                  <span className="flex items-center gap-2">
                    Annual
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-forsythia/20 text-forsythia">
                      -20%
                    </span>
                  </span>
                )}
              </button>
            ))}
          </div>

          <div
            className="flex items-center rounded-xl border border-nocturnal/60 bg-nocturnal/20 p-1"
            role="group"
            aria-label="Currency"
          >
            {currencies.map((c, i) => (
              <button
                key={c}
                ref={(el) => { currencyBtnRefs.current[i] = el }}
                onClick={() => handleCurrency(c)}
                aria-pressed="false"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ease-out cursor-pointer"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_CONFIG.plans.map((plan, i) => (
            <PlanCard
              key={plan.id}
              ref={(el) => { priceHandles.current[i] = el }}
              planIndex={i}
              initialBilling="monthly"
              initialCurrency="USD"
            />
          ))}
        </div>

        <p className="text-center text-arctic/30 text-sm mt-8">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  )
}
