import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'IDA Management App',
  description: 'International Automobile Authority - Order Management System',
}

export default function IDALayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <div className="min-h-screen bg-[#FAF9F6] dark:bg-gray-900">
          {children}
        </div>
      </body>
    </html>
  )
}
