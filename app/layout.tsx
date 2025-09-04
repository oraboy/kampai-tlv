import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kampai TLV - Premium Japanese Imports | יבוא יפני פרימיום',
  description: 'Direct import of premium Japanese ingredients to Tel Aviv. Uni, Wagyu, Sake, and more for restaurants, chefs, and culinary enthusiasts.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
