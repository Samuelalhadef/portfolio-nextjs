'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'

// Import normal des composants légers
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'

// Import dynamique des composants qui utilisent des fonctionnalités côté client
const Skills = dynamic(() => import('@/components/sections/Skills'), { ssr: false })
const Projects = dynamic(() => import('@/components/sections/Projects'), { ssr: false })
const ThreeD = dynamic(() => import('@/components/sections/ThreeD'), { ssr: false })
const Travel = dynamic(() => import('@/components/sections/Travel'), { ssr: false })
const Drone = dynamic(() => import('@/components/sections/Drone'), { ssr: false })
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false })

// Import de notre hook de défilement
// Note: useLocomotiveScroll est déjà marqué 'use client' et contient la logique pour éviter les erreurs SSR
import useLocomotiveScroll from '@/hooks/useLocomotiveScroll'

export default function Home() {
  const { scroll } = useLocomotiveScroll()

  useEffect(() => {
    // Initialiser les autres scripts globaux si nécessaire
    // S'assurer que ces initialisation se font uniquement côté client
    if (typeof window !== 'undefined') {
      // Scripts d'initialisation ici...
    }
  }, [])

  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ThreeD />
      <Travel />
      <Drone />
      <Contact />
    </main>
  )
}