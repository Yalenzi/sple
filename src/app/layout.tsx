import type { Metadata } from 'next'
import { Tajawal, Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { LanguageProvider } from '@/providers/LanguageProvider'
import { Toaster } from 'react-hot-toast'

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'PharmaQuest - منصة امتحانات الصيدلة السعودية',
  description: 'منصة تفاعلية لدراسة امتحانات ترخيص الصيدلة في المملكة العربية السعودية',
  keywords: 'صيدلة, امتحانات, ترخيص, السعودية, SPLE, pharmacy, licensing',
  authors: [{ name: 'PharmaQuest Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'PharmaQuest - منصة امتحانات الصيدلة السعودية',
    description: 'منصة تفاعلية لدراسة امتحانات ترخيص الصيدلة في المملكة العربية السعودية',
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${tajawal.variable} ${inter.variable} font-tajawal antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
              {children}
            </div>
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--toast-bg)',
                  color: 'var(--toast-color)',
                  fontFamily: 'var(--font-tajawal)',
                },
              }}
            />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
