import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToasterProvider } from '@/providers/toast-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { ReactQueryClientProvider } from '@/providers/react-query-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Truth or Dare',
  description: 'Truth or Dare',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <ReactQueryClientProvider>
        <html lang="en">
          <body className={`${inter.className} bg-red-300 w-full min-h-screen`}>
            <ToasterProvider />
            {children}
          </body>
        </html>
      </ReactQueryClientProvider>
    </ClerkProvider>
  )
}
