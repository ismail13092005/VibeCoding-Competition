import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FlowAI — Ship Products 10x Faster',
  description:
    'FlowAI is the AI-powered product suite that helps teams design, build, and ship 10x faster. Join 50,000+ teams already using FlowAI.',
  keywords: ['AI development', 'product suite', 'ship faster', 'team collaboration', 'FlowAI'],
  authors: [{ name: 'FlowAI Team' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://flowai.io',
  },
  openGraph: {
    type: 'website',
    url: 'https://flowai.io',
    title: 'FlowAI — Ship Products 10x Faster',
    description:
      'FlowAI is the AI-powered product suite that helps teams design, build, and ship 10x faster.',
    siteName: 'FlowAI',
    images: [
      {
        url: 'https://flowai.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FlowAI — Ship Products 10x Faster',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@flowai',
    creator: '@flowai',
    title: 'FlowAI — Ship Products 10x Faster',
    description:
      'FlowAI is the AI-powered product suite that helps teams design, build, and ship 10x faster.',
    images: ['https://flowai.io/og-image.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FlowAI',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  url: 'https://flowai.io',
  description:
    'FlowAI is the AI-powered product suite that helps teams design, build, and ship 10x faster.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free 14-day trial',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '12500',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      style={{ background: '#172B36' }}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
