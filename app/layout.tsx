

import Footer from './components/layout/Footer/Footer'
import Navbar from './components/layout/Navbar'
import { LanguageProvider } from './context/LanguageContext'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}