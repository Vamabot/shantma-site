import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Shant Marootian',
  description: 'Entrepreneur, builder, systems thinker. Building agentic organizations.',
  openGraph: {
    title: 'Shant Marootian',
    description: 'Entrepreneur, builder, systems thinker.',
    url: 'https://shantma.com',
    siteName: 'Shant Marootian',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Shant Marootian',
    description: 'Entrepreneur, builder, systems thinker.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
          <Nav />
          <main className="max-w-2xl mx-auto px-6 py-16">
            {children}
          </main>
          <footer className="max-w-2xl mx-auto px-6 py-8 mt-16 border-t border-[#1f2937]">
            <p className="text-sm text-[#6b7280]">
              Shant Marootian · {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      </body>
    </html>
  )
}
