import Header from '@/components/header/Header'
import './globals.css'
import type { Metadata } from 'next'
import BottomHeader from '@/components/header/BottomHeader'
import Footer from '@/components/Footer'


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-bodyFont">
        <Header />
        <BottomHeader />
        {children}
        <Footer />
      </body>
    </html>
  )
}
