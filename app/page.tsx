import Navigation       from '@/components/Navigation'
import Hero             from '@/components/Hero'
import TrustedCompanies from '@/components/TrustedCompanies'
import SocialProof      from '@/components/SocialProof'
import Features         from '@/components/Features'
import BentoGrid        from '@/components/BentoGrid'
import HowItWorks       from '@/components/HowItWorks'
import Pricing          from '@/components/Pricing'
import Testimonials     from '@/components/Testimonials'
import FAQ              from '@/components/FAQ'
import CTA              from '@/components/CTA'
import Footer           from '@/components/Footer'
import RevealProvider   from '@/components/RevealProvider'
import PageLoader       from '@/components/PageLoader'
import ScrollProgress   from '@/components/ScrollProgress'

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Global motion engine */}
      <PageLoader />
      <ScrollProgress />
      <RevealProvider />

      <Navigation />

      <main id="main-content" role="main">
        <Hero />
        <TrustedCompanies />
        <SocialProof />
        <Features />
        <BentoGrid />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </>
  )
}
