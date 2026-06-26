import type { FC } from 'react'

const productLinks = [
  { label: 'Features',     href: '#features'     },
  { label: 'Pricing',      href: '#pricing'       },
  { label: 'How It Works', href: '#how-it-works'  },
  { label: 'Changelog',    href: '#'              },
  { label: 'Roadmap',      href: '#'              },
]
const companyLinks = [
  { label: 'About',    href: '#' },
  { label: 'Blog',     href: '#' },
  { label: 'Careers',  href: '#' },
  { label: 'Press',    href: '#' },
  { label: 'Contact',  href: '#' },
]

const socialLinks = [
  { label: 'X / Twitter', href: 'https://twitter.com/flowai',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: 'GitHub', href: 'https://github.com/flowai',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg> },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/flowai',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: 'Discord', href: 'https://discord.gg/flowai',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.079.11 18.1.124 18.11a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 13.955 13.955 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg> },
]

const Footer: FC = () => (
  <footer
    role="contentinfo"
    aria-label="Site footer"
    className="relative pt-16 pb-8 px-4 sm:px-6 overflow-hidden"
    style={{ background: '#0d1e27', borderTop: '1px solid rgba(255,200,1,0.08)' }}
  >
    {/* ── Constellation background ── */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Deep space base */}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, #0d1e27 0%, #060f14 100%)' }}/>
      {/* Constellation SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <line x1="10%" y1="20%" x2="25%" y2="40%" stroke="#FFC801" strokeWidth="0.5"/>
        <line x1="25%" y1="40%" x2="45%" y2="25%" stroke="#FFC801" strokeWidth="0.5"/>
        <line x1="45%" y1="25%" x2="60%" y2="50%" stroke="#FFC801" strokeWidth="0.5"/>
        <line x1="60%" y1="50%" x2="80%" y2="30%" stroke="#FFC801" strokeWidth="0.5"/>
        <line x1="80%" y1="30%" x2="90%" y2="60%" stroke="#FFC801" strokeWidth="0.5"/>
        <line x1="15%" y1="70%" x2="35%" y2="60%" stroke="#FFC801" strokeWidth="0.5"/>
        <line x1="35%" y1="60%" x2="55%" y2="75%" stroke="#FFC801" strokeWidth="0.5"/>
        {/* Star nodes */}
        {(['10%','25%','45%','60%','80%','90%','15%','35%','55%'] as string[]).map((cx, i) => {
          const cyArr = ['20%','40%','25%','50%','30%','60%','70%','60%','75%']
          return <circle key={i} cx={cx} cy={cyArr[i]} r="2" fill="#FFC801"/>
        })}
      </svg>
      {/* Scattered micro stars */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:'radial-gradient(circle, rgba(241,246,244,0.4) 1px, transparent 1px)',
        backgroundSize:'60px 60px',
        opacity:0.06,
      }}/>
      {/* Bottom glow */}
      <div style={{
        position:'absolute', bottom:0, left:'50%', transform:'translateX(-50%)',
        width:800, height:200,
        background:'radial-gradient(ellipse, rgba(255,200,1,0.05) 0%, transparent 70%)',
        filter:'blur(30px)',
      }}/>
    </div>

    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <a href="#" className="inline-flex items-center gap-1 mb-5" aria-label="FlowAI homepage">
            <span className="font-mono text-xl font-bold text-arctic" style={{ fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace' }}>Flow</span>
            <span className="font-mono text-xl font-bold text-forsythia" style={{ fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace' }}>AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-forsythia ml-0.5 animate-pulse-glow-sm" aria-hidden="true" />
          </a>
          <p className="text-arctic/35 text-sm leading-relaxed mb-5 max-w-[200px]">
            The AI-powered product suite helping teams ship 10× faster.
          </p>
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
            style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.15)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 4px #4ade80' }} aria-hidden="true" />
            <span className="text-green-400 font-medium">All systems operational</span>
          </div>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-arctic text-xs font-semibold uppercase tracking-widest mb-5">Product</h3>
          <ul className="space-y-3" role="list">
            {productLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="text-arctic/35 text-sm hover:text-forsythia transition-colors duration-150 ease-out">{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-arctic text-xs font-semibold uppercase tracking-widest mb-5">Company</h3>
          <ul className="space-y-3" role="list">
            {companyLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="text-arctic/35 text-sm hover:text-forsythia transition-colors duration-150 ease-out">{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-arctic text-xs font-semibold uppercase tracking-widest mb-5">Connect</h3>
          <ul className="space-y-3" role="list">
            {socialLinks.map(({ label, href, icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="flex items-center gap-2.5 text-arctic/35 hover:text-forsythia transition-colors duration-150 ease-out group">
                  <span className="transition-transform duration-150 group-hover:scale-110">{icon}</span>
                  <span className="text-sm">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="section-divider mb-6" aria-hidden="true" />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-arctic/20 text-xs">
          © {new Date().getFullYear()} FlowAI, Inc. All rights reserved.
        </p>
        <p className="text-arctic/20 text-xs">
          Built for{' '}
          <span className="text-forsythia/50 font-medium font-mono">FrontEnd Battle 3.0</span>
          {' '}· IIT Bhubaneswar
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
