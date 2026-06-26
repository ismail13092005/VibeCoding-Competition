export default function SocialProof() {
  const items = [
    { metric: '10×', desc: 'Faster deployments vs industry average' },
    { metric: '$2.4M', desc: 'Saved in DevOps costs by our users' },
    { metric: '847K', desc: 'Components generated this month' },
    { metric: '99.97%', desc: 'Customer satisfaction score' },
  ]
  return (
    <section aria-label="Social proof metrics" className="py-16 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0f2230 0%, #172B36 100%)' }}>
      <div className="section-sep absolute top-0 left-0 right-0" aria-hidden="true" />
      <div className="section-sep absolute bottom-0 left-0 right-0" aria-hidden="true" />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ metric, desc }, i) => (
            <div key={i} className="stat-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="font-mono font-bold text-forsythia mb-2"
                style={{ fontFamily: 'var(--font-jetbrains, JetBrains Mono), monospace', fontSize: 'clamp(1.6rem, 3vw, 2rem)' }}>
                {metric}
              </div>
              <p className="text-arctic/55 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
