'use client'

import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'

// Import dynamique de Locomotive Scroll avec { ssr: false }
// Cela garantit qu'il ne sera chargé que côté client
const LocomotiveScroll = dynamic(
  () => import('locomotive-scroll').then((mod) => mod.default),
  { ssr: false }
)

export default function useLocomotiveScroll() {
  const [scroll, setScroll] = useState(null)
  const scrollRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // Vérifier que nous sommes côté client
    if (typeof window === 'undefined') return

    // Enregistrer ScrollTrigger avec GSAP
    if (gsap.registerPlugin) {
      gsap.registerPlugin(ScrollTrigger)
    }

    // Attendre que le DOM soit complètement chargé
    const initScroll = () => {
      if (!LocomotiveScroll) {
        console.warn("Locomotive Scroll n'est pas disponible")
        return
      }

      // Trouver l'élément de conteneur
      const scrollContainer = document.querySelector('[data-scroll-container]')
      if (!scrollContainer) {
        console.warn("Conteneur de défilement non trouvé ([data-scroll-container])")
        return
      }

      // Initialiser Locomotive Scroll
      const locomotiveScroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        smoothMobile: false,
        multiplier: 1
      })

      // Stocker l'instance
      scrollRef.current = locomotiveScroll
      setScroll(locomotiveScroll)
      
      // Configurer ScrollTrigger pour qu'il fonctionne avec Locomotive Scroll
      if (ScrollTrigger) {
        // FIX: Utiliser locomotive-scroll v4 API correctly
        // En v4, nous devons utiliser .scroll.on au lieu de .on directement
        if (locomotiveScroll.scroll && typeof locomotiveScroll.scroll.on === 'function') {
          locomotiveScroll.scroll.on('scroll', ScrollTrigger.update)
        } else {
          console.warn('Locomotive Scroll API: La méthode .scroll.on est indisponible, essai de méthode alternative')
          // Fallback pour différentes versions de Locomotive Scroll
          if (typeof locomotiveScroll.on === 'function') {
            locomotiveScroll.on('scroll', ScrollTrigger.update)
          } else {
            // Version fallback - utiliser un écouteur d'événements standard si aucune méthode n'est disponible
            console.warn('Aucune méthode de liaison d\'événements trouvée pour Locomotive Scroll')
            scrollContainer.addEventListener('scroll', ScrollTrigger.update)
          }
        }

        // Proxy de ScrollTrigger pour Locomotive Scroll
        ScrollTrigger.scrollerProxy(scrollContainer, {
          scrollTop(value) {
            // Adapter pour les différentes versions de l'API
            if (arguments.length) {
              return locomotiveScroll.scrollTo(value, 0, 0)
            }
            
            // Essayer d'abord la structure de v4
            if (locomotiveScroll.scroll && locomotiveScroll.scroll.instance) {
              return locomotiveScroll.scroll.instance.scroll.y
            }
            
            // Fallback pour les versions antérieures ou différentes structures
            if (locomotiveScroll.instance && locomotiveScroll.instance.scroll) {
              return locomotiveScroll.instance.scroll.y
            }
            
            // Dernier recours
            return scrollContainer.scrollTop
          },
          getBoundingClientRect() {
            return {
              top: 0, 
              left: 0, 
              width: window.innerWidth, 
              height: window.innerHeight
            }
          },
          pinType: scrollContainer.style.transform ? 'transform' : 'fixed'
        })

        // Mise à jour de Locomotive Scroll après le refresh de ScrollTrigger
        ScrollTrigger.addEventListener('refresh', () => {
          if (locomotiveScroll && typeof locomotiveScroll.update === 'function') {
            locomotiveScroll.update()
          }
        })
        
        // Refresh ScrollTrigger
        ScrollTrigger.refresh()
      }
    }

    // Initialiser avec un petit délai pour s'assurer que le DOM est prêt
    const timer = setTimeout(initScroll, 100)

    // Nettoyage
    return () => {
      clearTimeout(timer)
      
      if (scrollRef.current) {
        scrollRef.current.destroy()
        scrollRef.current = null
      }
      
      // Nettoyer ScrollTrigger
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }
  }, [])

  return { scroll, ref: containerRef }
}