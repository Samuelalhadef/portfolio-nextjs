import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import Loading from '@/components/layout/Loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Samuel Alhadef | Portfolio Créatif',
  description: 'Portfolio interactif de Samuel Alhadef, étudiant en développement web',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={inter.className} data-scroll-container>
        <Loading />
        <CustomCursor />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}