'use client'

/**
 * BentoGrid — Feature 2: Bento-to-Accordion Wrapper with State Persistence
 *
 * CONTEXT LOCK CONSTRAINT (from problem statement):
 * ─────────────────────────────────────────────────
 * If a user is actively hovering over a specific bento-node on desktop and
 * abruptly resizes past the mobile breakpoint, the application must
 * programmatically transfer that exact active index context to the mobile
 * Accordion state, ensuring the corresponding panel opens smoothly.
 *
 * IMPLEMENTATION:
 * - hoverRef tracks which card is currently hovered on desktop (via onMouseEnter/Leave)
 * - clickedRef tracks the last explicitly clicked/activated card
 * - On breakpoint crossing (desktop→mobile), we prefer hoverRef if set, else clickedRef
 * - useReducer holds accordion open state — dispatched on resize crossing
 * - No external libraries, pure CSS transitions (300–400ms ease-in-out)
 */

import { useReducer, useRef, useEffect, useCallback, useState } from 'react'

/* ─── Types ─────────────────────────────────────────────────────────── */
type CardId = 'editor' | 'deploy' | 'collab' | 'stat-speed' | 'stat-teams' | 'stat-uptime' | 'stat-rating'

interface BentoState {
  // Desktop: which card is "active" (highlighted)
  activeId: CardId
  // Mobile: which accordion panel is open
  openId: CardId | null
}

type BentoAction =
  | { type: 'SET_ACTIVE';  id: CardId }
  | { type: 'TOGGLE_OPEN'; id: CardId }
  | { type: 'SYNC_TO_MOBILE'; id: CardId }  // context lock transfer

function bentoReducer(state: BentoState, action: BentoAction): BentoState {
  switch (action.type) {
    case 'SET_ACTIVE':
      return { ...state, activeId: action.id }
    case 'TOGGLE_OPEN':
      return { ...state, openId: state.openId === action.id ? null : action.id }
    case 'SYNC_TO_MOBILE':
      // Transfer hovered/active context from desktop → mobile accordion
      return { ...state, openId: action.id }
    default:
      return state
  }
}

/* ─── Visuals ────────────────────────────────────────────────────────── */
function MockCodeBlock() {
  return (
    <div
      className="rounded-xl overflow-hidden text-xs font-mono"
      style={{ background: '#0d1f26', border: '1px solid rgba(255,200,1,0.15)' }}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" aria-hidden="true" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" aria-hidden="true" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" aria-hidden="true" />
        <span className="ml-2 text-arctic/30 text-[10px]">ai-component.tsx</span>
      </div>
      <div className="p-4 space-y-1 leading-5">
        <div><span className="text-forsythia">import</span> <span className="text-arctic">&#123; useState &#125;</span> <span className="text-forsythia">from</span> <span className="text-saffron">&apos;react&apos;</span></div>
        <div className="mt-2">
          <span className="text-forsythia">export</span> <span className="text-forsythia">function</span>{' '}
          <span className="text-mint">Dashboard</span>
          <span className="text-arctic">() &#123;</span>
        </div>
        <div className="pl-4"><span className="text-forsythia">const</span> <span className="text-arctic">[data, setData] =</span></div>
        <div className="pl-8"><span className="text-mint">useState</span><span className="text-arctic">&lt;</span><span className="text-saffron">Metric[]</span><span className="text-arctic">&gt;([])</span></div>
        <div className="pl-4 mt-1"><span className="text-forsythia">return</span> <span className="text-arctic">(</span></div>
        <div className="pl-8"><span className="text-mint">&lt;MetricGrid</span></div>
        <div className="pl-12"><span className="text-arctic">data=</span><span className="text-saffron">&#123;data&#125;</span></div>
        <div className="pl-12"><span className="text-saffron">animated</span></div>
        <div className="pl-8"><span className="text-mint">/&gt;</span></div>
        <div className="pl-4"><span className="text-arctic">)</span></div>
        <div><span className="text-arctic">&#125;</span><span className="animate-blink text-forsythia ml-0.5">|</span></div>
      </div>
    </div>
  )
}

function MockTerminal() {
  return (
    <div
      className="rounded-xl overflow-hidden text-xs font-mono"
      style={{ background: '#0d1f26', border: '1px solid rgba(255,200,1,0.15)' }}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" aria-hidden="true" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" aria-hidden="true" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" aria-hidden="true" />
        <span className="ml-2 text-arctic/30 text-[10px]">terminal</span>
      </div>
      <div className="p-3 space-y-1.5 leading-5">
        <div><span className="text-forsythia">$</span> <span className="text-arctic">flowai deploy --prod</span></div>
        <div className="text-arctic/50">▸ Building optimized bundle…</div>
        <div className="text-arctic/50">▸ Running tests (24/24) ✓</div>
        <div className="text-arctic/50">▸ Uploading to CDN…</div>
        <div className="text-green-400">✓ Deployed in 3.2s</div>
        <div className="text-arctic/30">→ https://your-app.flowai.io</div>
      </div>
    </div>
  )
}

function MockCollaboration() {
  const users = [
    { initial: 'S', bg: '#FFC801', color: '#172B36', name: 'Sarah', status: 'editing Hero.tsx' },
    { initial: 'A', bg: '#FF9932', color: '#172B36', name: 'Alex',  status: 'reviewing PR #42' },
    { initial: 'M', bg: '#114C5A', color: '#FFC801', name: 'Maya',  status: 'deployed staging' },
    { initial: 'J', bg: '#D9E8E2', color: '#172B36', name: 'Jake',  status: 'online'           },
  ]
  return (
    <div className="space-y-2">
      {users.map((u) => (
        <div key={u.name} className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: u.bg, color: u.color }}
            aria-hidden="true"
          >
            {u.initial}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-arctic truncate">{u.name}</div>
            <div className="text-[10px] text-arctic/40 truncate">{u.status}</div>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 ml-auto" aria-hidden="true" />
        </div>
      ))}
    </div>
  )
}

/* ─── Card definitions ───────────────────────────────────────────────── */
const BENTO_CARDS: Array<{
  id: CardId
  title: string
  subtitle: string
  colSpan?: string
  rowSpan?: string
  content: React.ReactNode
}> = [
  {
    id: 'editor',
    title: 'AI-Powered Editor',
    subtitle: 'Write code 10× faster with context-aware AI suggestions and full codebase understanding.',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2',
    content: <MockCodeBlock />,
  },
  {
    id: 'deploy',
    title: 'Deploy in Seconds',
    subtitle: 'One command to build, test, and ship to any cloud provider.',
    content: <MockTerminal />,
  },
  {
    id: 'collab',
    title: 'Team Collaboration',
    subtitle: 'Real-time presence, inline comments, and shared workspaces.',
    content: <MockCollaboration />,
  },
  {
    id: 'stat-speed',
    title: '10× Faster',
    subtitle: 'Ship features in hours, not weeks.',
    content: (
      <div className="font-mono text-3xl font-bold text-forsythia" style={{ fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace' }}>10×</div>
    ),
  },
  {
    id: 'stat-teams',
    title: '50K Teams',
    subtitle: 'Trusted by startups and Fortune 500s.',
    content: (
      <div className="font-mono text-3xl font-bold text-forsythia" style={{ fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace' }}>50K</div>
    ),
  },
  {
    id: 'stat-uptime',
    title: '99.9% Uptime',
    subtitle: 'Enterprise-grade SLA backed by redundant infra.',
    content: (
      <div className="font-mono text-3xl font-bold text-forsythia" style={{ fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace' }}>99.9%</div>
    ),
  },
  {
    id: 'stat-rating',
    title: '4.9★ Rating',
    subtitle: 'Loved by engineers and product managers alike.',
    content: (
      <div className="font-mono text-3xl font-bold text-forsythia" style={{ fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace' }}>4.9★</div>
    ),
  },
]

/* ─── BentoGrid ──────────────────────────────────────────────────────── */
export default function BentoGrid() {
  const [state, dispatch] = useReducer(bentoReducer, {
    activeId: 'editor',
    openId: 'editor',
  })

  // Track hover context on desktop — used for the Context Lock Constraint
  const hoverRef   = useRef<CardId | null>(null)
  // Track last breakpoint to detect crossing direction
  const wasMobileRef = useRef<boolean | null>(null)
  // Stable: whether we're on desktop (>=768px)
  const [isDesktop, setIsDesktop] = useState(false)

  // Breakpoint detection + context lock transfer
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const nowDesktop = e.matches
      const wasMobile  = wasMobileRef.current === false

      setIsDesktop(nowDesktop)

      // Crossing desktop → mobile: transfer active/hover context to accordion
      if (!nowDesktop && wasMobileRef.current !== null && wasMobileRef.current !== false) {
        const contextId = hoverRef.current ?? state.activeId
        dispatch({ type: 'SYNC_TO_MOBILE', id: contextId })
      }

      wasMobileRef.current = nowDesktop
    }

    // Init
    const initial = { matches: mq.matches } as MediaQueryList
    handleChange(initial)
    wasMobileRef.current = mq.matches

    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [state.activeId])

  const handleCardHover = useCallback((id: CardId | null) => {
    hoverRef.current = id
    if (id) dispatch({ type: 'SET_ACTIVE', id })
  }, [])

  const handleCardClick = useCallback((id: CardId) => {
    dispatch({ type: 'SET_ACTIVE', id })
  }, [])

  const handleAccordionToggle = useCallback((id: CardId) => {
    dispatch({ type: 'TOGGLE_OPEN', id })
  }, [])

  return (
    <section
      id="features-bento"
      aria-labelledby="bento-heading"
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #111f28 0%, #172B36 50%, #0f1e26 100%)' }}
    >
      {/* ── Circuit board background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* SVG circuit traces */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M0 60 L40 60 L40 20 L80 20 L80 60 L120 60" fill="none" stroke="#FFC801" strokeWidth="1"/>
              <path d="M60 0 L60 40 L100 40 L100 80 L60 80 L60 120" fill="none" stroke="#FFC801" strokeWidth="1"/>
              <circle cx="40" cy="60" r="3" fill="#FFC801"/>
              <circle cx="80" cy="20" r="3" fill="#FFC801"/>
              <circle cx="60" cy="40" r="3" fill="#FFC801"/>
              <circle cx="100" cy="80" r="3" fill="#FFC801"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
        {/* Animated trace highlight */}
        <div style={{
          position:'absolute', top:0, left:'-100%', width:'50%', height:'100%',
          background:'linear-gradient(90deg, transparent, rgba(255,200,1,0.04), transparent)',
          animation:'traceSweep 8s linear infinite',
        }}/>
        {/* Top-left corner glow */}
        <div style={{
          position:'absolute', top:0, left:0, width:400, height:400,
          background:'radial-gradient(circle at 0% 0%, rgba(17,76,90,0.4) 0%, transparent 60%)',
        }}/>
        {/* Bottom-right corner glow */}
        <div style={{
          position:'absolute', bottom:0, right:0, width:400, height:400,
          background:'radial-gradient(circle at 100% 100%, rgba(255,200,1,0.04) 0%, transparent 60%)',
        }}/>
      </div>
      <style>{`@keyframes traceSweep { from{left:-50%} to{left:150%} }`}</style>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2
            id="bento-heading"
            className="font-mono font-bold text-arctic mb-4"
            style={{
              fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            }}
          >
            One workspace, infinite possibilities
          </h2>
          <p className="text-arctic/60 text-lg max-w-xl mx-auto">
            Everything your team needs — no context switching required.
          </p>
        </div>

        {/* ── Desktop: Bento CSS Grid ── */}
        <div className="hidden md:grid grid-cols-3 gap-4" style={{ gridTemplateRows: 'auto auto auto' }}>
          {BENTO_CARDS.map((card) => {
            const isActive = state.activeId === card.id
            return (
              <article
                key={card.id}
                className={`
                  rounded-2xl p-5 border bg-nocturnal/20 cursor-pointer
                  transition-all duration-300 ease-in-out
                  ${card.colSpan ?? ''} ${card.rowSpan ?? ''}
                  ${isActive
                    ? 'border-forsythia/50 ring-1 ring-forsythia/30 shadow-lg shadow-forsythia/10 bg-nocturnal/40'
                    : 'border-nocturnal/60 hover:border-forsythia/30 hover:bg-nocturnal/30'
                  }
                `}
                aria-label={card.title}
                onMouseEnter={() => handleCardHover(card.id)}
                onMouseLeave={() => handleCardHover(null)}
                onClick={() => handleCardClick(card.id)}
                tabIndex={0}
                onFocus={() => handleCardHover(card.id)}
                onBlur={() => handleCardHover(null)}
                onKeyDown={(e) => e.key === 'Enter' && handleCardClick(card.id)}
              >
                <h3 className="font-semibold text-arctic text-sm mb-1">{card.title}</h3>
                <p className="text-arctic/50 text-xs mb-3 leading-relaxed">{card.subtitle}</p>
                <div>{card.content}</div>
              </article>
            )
          })}
        </div>

        {/* ── Mobile: Touch-Optimized Accordion ── */}
        <div className="md:hidden space-y-2" role="list">
          {BENTO_CARDS.map((card) => {
            const isOpen = state.openId === card.id
            const panelId  = `bento-panel-${card.id}`
            const headerId = `bento-header-${card.id}`

            return (
              <div
                key={card.id}
                role="listitem"
                className="rounded-2xl border border-nocturnal/60 bg-nocturnal/20 overflow-hidden"
              >
                <h3 id={headerId}>
                  <button
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => handleAccordionToggle(card.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-150 ease-out hover:bg-nocturnal/30 active:bg-nocturnal/40"
                  >
                    <div className="min-w-0 mr-3">
                      <div className="text-sm font-semibold text-arctic leading-snug">{card.title}</div>
                      <div className="text-xs text-arctic/50 mt-0.5 leading-snug">{card.subtitle}</div>
                    </div>
                    {/* Chevron — CSS rotate transition 300ms ease-in-out */}
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      className="text-forsythia flex-shrink-0"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 300ms ease-in-out',
                      }}
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </h3>

                {/* Panel — max-height CSS transition 350ms ease-in-out */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  style={{
                    maxHeight: isOpen ? '600px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 350ms ease-in-out',
                  }}
                >
                  <div className="px-5 pb-5 pt-1">
                    {card.content}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
