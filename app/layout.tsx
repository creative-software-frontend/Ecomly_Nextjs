
import Footer from './components/layout/Footer/Footer'
import Navbar from './components/layout/Navbar'
import CategorySidebarWrapper from './components/layout/CategorySidebarWrapper'
import { LanguageProvider } from './context/LanguageContext'
import { CategorySidebarProvider } from '@/app/context/CategorySidebarContext'
import { CartProvider } from '@/app/context/CartContext'
import { AuthProvider } from '@/app/context/AuthContext'
import './globals.css'
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <CategorySidebarProvider>
                <Navbar />
                <main className="min-h-screen lg:ml-72">{children}</main>
                <CategorySidebarWrapper />
                <Footer />
              </CategorySidebarProvider>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}