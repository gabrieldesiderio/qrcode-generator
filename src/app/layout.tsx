import './globals.css'

import type { Metadata } from 'next'

import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'QR Code Generator',
  description: 'Create a QR Code in a few seconds',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`antialiased`}>
        <main>{children}</main>
        <Toaster richColors theme="light" />
      </body>
    </html>
  )
}
