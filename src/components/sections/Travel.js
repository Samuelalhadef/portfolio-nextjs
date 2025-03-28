'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import GlobeVisualization from '@/components/ui/GlobeVisualization'
import styles from '@/styles/sections/Travel.module.css'

export default function Travel() {
  const { ref, inView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  })

  useEffect(() => {
    if (inView) {
      // Animate in the content when section becomes visible
      gsap.to(`.${styles.sectionTitle}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8
      })
      
      gsap.to(`.${styles.travelIntro}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        delay: 0.2
      })
      
      gsap.to(`.${styles.globeContainer}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        delay: 0.4
      })
      
      gsap.to(`.${styles.globeStats}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.5,
        stagger: 0.15,
        delay: 0.6
      })
    }
  }, [inView])

  return (
    <section className={styles.travel} ref={ref} id="travel" data-scroll-section>
      <div className={styles.sectionContent}>
        <h2 className={`${styles.sectionTitle} hidden`}>Voyages - Ma Passion</h2>
        
        <div className={`${styles.travelIntro} hidden`}>
          <p>
            Voyager est pour moi bien plus qu'un simple loisir - c'est une véritable passion qui 
            nourrit ma créativité et élargit ma vision du monde. Chaque destination est une source 
            d'inspiration unique qui enrichit mon regard et influence profondément mon travail créatif.
          </p>
        </div>
        
        <div className={`${styles.globeContainer} hidden`}>
          <GlobeVisualization />
          
          <div className={`${styles.globeStats} hidden`}>
            <div className={styles.globeStatItem}>
              <div className={styles.globeStatIcon}>
                <i className="fas fa-plane"></i>
              </div>
              <div className={styles.globeStatText}>
                <div className={styles.globeStatValue}>14</div>
                <div className={styles.globeStatLabel}>Pays visités</div>
              </div>
            </div>
            
            <div className={styles.globeStatItem}>
              <div className={styles.globeStatIcon}>
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className={styles.globeStatText}>
                <div className={styles.globeStatValue}>43</div>
                <div className={styles.globeStatLabel}>Villes explorées</div>
              </div>
            </div>
            
            <div className={styles.globeStatItem}>
              <div className={styles.globeStatIcon}>
                <i className="fas fa-suitcase"></i>
              </div>
              <div className={styles.globeStatText}>
                <div className={styles.globeStatValue}>5</div>
                <div className={styles.globeStatLabel}>Voyages prévus</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}