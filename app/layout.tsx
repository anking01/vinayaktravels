import type { Metadata } from 'next'
import Script from 'next/script'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'
import LayoutShell from '@/components/LayoutShell'
import Providers from '@/components/Providers'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  verification: {
    google: "tEzS2WwuiT7wBrJd_RlfnY7cCb3QKHV2DcNCF-gtJ1U",
  },
  title: 'Vinayak Travels – Safe, Comfortable & Affordable Travel in Maharashtra',
  description:
    'Vinayak Travels offers Jyotirling pilgrimage tours across Maharashtra and Gujarat. 6 months, 1000+ happy travelers. GPS tracked vehicles, no hidden charges.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} h-full`} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col antialiased">
        <Providers>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5VC453BTCX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5VC453BTCX');
          `}
        </Script>
      </body>
    </html>
  )
}
