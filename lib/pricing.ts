export const PRICING_CONFIG = {
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for indie developers',
      monthlyPrices: { INR: 999, USD: 12, EUR: 11 },
      features: [
        'Up to 3 projects',
        'AI code suggestions',
        '5GB storage',
        'Community support',
        'Basic analytics',
        'Git integration',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For growing teams',
      monthlyPrices: { INR: 2999, USD: 36, EUR: 33 },
      features: [
        'Unlimited projects',
        'Advanced AI generation',
        '50GB storage',
        'Priority support',
        'Advanced analytics',
        'Team collaboration',
        'Custom domains',
        'One-click deploys',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations',
      monthlyPrices: { INR: 7999, USD: 96, EUR: 88 },
      features: [
        'Everything in Pro',
        'Unlimited storage',
        'Dedicated support',
        'SLA guarantee (99.9%)',
        'Custom integrations',
        'SSO / SAML',
        'Audit logs',
        'On-premise option',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ],
  annualDiscount: 0.20,
  currencySymbols: { INR: '₹', USD: '$', EUR: '€' },
} as const

export type Currency = 'INR' | 'USD' | 'EUR'
export type Billing  = 'monthly' | 'annual'

/**
 * Pure function — compute displayed price from config.
 * Annual = monthly * 12 * (1 - discount), then divide by 12 to show monthly-equivalent.
 */
export function computePrice(
  monthlyPrice: number,
  billing: Billing,
  discount: number
): number {
  if (billing === 'monthly') return monthlyPrice
  return Math.round(monthlyPrice * (1 - discount))
}
