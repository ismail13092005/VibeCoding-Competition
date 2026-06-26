'use client'

import { useReducer, useRef, useCallback, KeyboardEvent } from 'react'

/* ─── Data ───────────────────────────────────────────────────────────── */
const faqs = [
  {
    question: 'Is there a free trial?',
    answer:
      'Yes — every plan includes a full-featured 14-day free trial. No credit card required. You get access to all features in your chosen plan.',
  },
  {
    question: 'Can I change plans later?',
    answer:
      'Absolutely. You can upgrade or downgrade at any time from your billing settings. Upgrades are immediate; downgrades take effect at the next billing cycle.',
  },
  {
    question: 'How does the AI code generation work?',
    answer:
      "FlowAI connects to your repository and uses the full codebase as context — your patterns, conventions, and dependencies. The AI suggests and generates code that fits your existing style, not generic boilerplate.",
  },
  {
    question: 'Which cloud providers are supported for deployment?',
    answer:
      'FlowAI supports AWS, Google Cloud Platform, Azure, Vercel, Netlify, and self-hosted environments. You can configure multiple providers and choose per-project.',
  },
  {
    question: 'Is my code kept private and secure?',
    answer:
      'Yes. FlowAI is SOC 2 Type II certified. Your code is encrypted at rest and in transit. We do not train models on your proprietary code. Enterprise plans support on-premise deployments.',
  },
  {
    question: 'How many team members can I add?',
    answer:
      'Starter plans support up to 3 seats. Pro plans support unlimited team members. Enterprise plans include advanced permission management and SSO.',
  },
  {
    question: 'What is the SLA for the Pro and Enterprise plans?',
    answer:
      'Pro plans include 99.9% uptime SLA with automated incident reporting. Enterprise plans include a dedicated SLA agreement, priority incident response, and a named Customer Success Manager.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes, you can cancel at any time from the billing page — no penalties, no lock-in. Monthly subscribers are billed through the end of their current period; annual subscribers are not refunded for remaining months but retain access until the period ends.',
  },
]

/* ─── Reducer ────────────────────────────────────────────────────────── */
type FAQState = { openIndex: number | null }
type FAQAction = { type: 'TOGGLE'; index: number } | { type: 'OPEN'; index: number } | { type: 'CLOSE' }

function faqReducer(state: FAQState, action: FAQAction): FAQState {
  switch (action.type) {
    case 'TOGGLE':
      return { openIndex: state.openIndex === action.index ? null : action.index }
    case 'OPEN':
      return { openIndex: action.index }
    case 'CLOSE':
      return { openIndex: null }
    default:
      return state
  }
}

/* ─── FAQ Component ──────────────────────────────────────────────────── */
export default function FAQ() {
  const [state, dispatch] = useReducer(faqReducer, { openIndex: null })
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault()
          const next = (index + 1) % faqs.length
          buttonRefs.current[next]?.focus()
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          const prev = (index - 1 + faqs.length) % faqs.length
          buttonRefs.current[prev]?.focus()
          break
        }
        case 'Home': {
          e.preventDefault()
          buttonRefs.current[0]?.focus()
          break
        }
        case 'End': {
          e.preventDefault()
          buttonRefs.current[faqs.length - 1]?.focus()
          break
        }
      }
    },
    []
  )

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0d3d4a 0%, #114C5A 100%)' }}
    >

      {/* ── Hex grid bg ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,2 58,17 58,47 30,62 2,47 2,17" fill="none" stroke="#FFC801" strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)"/>
        </svg>
        {/* Glow nodes at intersections */}
        {([[15,13],[75,13],[45,39],[15,65],[75,65],[45,91]] as Array<[number,number]>).map(([x,y],i) => (
          <div key={i} style={{
            position:'absolute', left:`${x}%`, top:`${y * 0.7}%`,
            width:4, height:4, borderRadius:'50%',
            background:'rgba(255,200,1,0.5)',
            boxShadow:'0 0 8px rgba(255,200,1,0.4)',
            animation:`hexNode ${3+i*0.5}s ease-in-out infinite`,
            animationDelay:`${i*0.4}s`,
          }}/>
        ))}
        {/* Ambient glow */}
        <div style={{
          position:'absolute', top:'30%', left:'50%', transform:'translateX(-50%)',
          width:600, height:400,
          background:'radial-gradient(ellipse, rgba(255,200,1,0.04) 0%, transparent 70%)',
          filter:'blur(40px)',
        }}/>
        {/* Left accent glow */}
        <div style={{
          position:'absolute', top:0, left:0, width:300, height:'100%',
          background:'linear-gradient(90deg, rgba(17,76,90,0.3) 0%, transparent 100%)',
        }}/>
      </div>
      <style>{`@keyframes hexNode { 0%,100%{opacity:0.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.8)} }`}</style>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2
            id="faq-heading"
            className="font-mono font-bold text-arctic mb-4 reveal"
            style={{
              fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            }}
          >
            Frequently asked questions
          </h2>
          <p className="text-arctic/60 text-lg reveal" style={{ transitionDelay: '80ms' }}>
            Everything you need to know about FlowAI.
          </p>
        </div>

        <div className="space-y-3" role="list">
          {faqs.map((faq, i) => {
            const isOpen = state.openIndex === i
            const panelId = `faq-panel-${i}`
            const headerId = `faq-header-${i}`

            return (
              <div
                key={i}
                role="listitem"
                className="rounded-xl border border-arctic/10 bg-noir/30 overflow-hidden"
              >
                <h3 id={headerId}>
                  <button
                    ref={(el) => { buttonRefs.current[i] = el }}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => dispatch({ type: 'TOGGLE', index: i })}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-arctic hover:text-forsythia transition-colors duration-150 group"
                  >
                    <span>{faq.question}</span>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                      className="flex-shrink-0 ml-4 transition-transform duration-300 text-forsythia/60 group-hover:text-forsythia"
                      style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                      aria-hidden="true"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? '400px' : '0' }}
                >
                  <div className="px-5 pb-5">
                    <p className="text-arctic/60 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-arctic/40 text-sm">
            Still have questions?{' '}
            <a href="mailto:hello@flowai.io" className="text-forsythia hover:underline">
              Chat with us
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
