import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// app/layout.tsx
import { Providers } from './providers'
import Header from './components/navbar/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PLANTAE Taiwan',
  description: '獻給您，來自大自然的贈禮'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
