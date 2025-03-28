'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import styles from '@/styles/sections/About.module.css'

export default function About() {
  const { ref, inView } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  })

  useEffect(() => {
    if (inView) {
      // Animate in the content when section becomes visible
      gsap.to(`.${styles.aboutImage}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8
      })
      
      gsap.to(`.${styles.aboutContent}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        delay: 0.2
      })
      
      // Animate stats with staggered delay
      gsap.to(`.${styles.statItem}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.15,
        delay: 0.4
      })
    }
  }, [inView])

  return (
    <section className={styles.about} ref={ref} id="about" data-scroll-section>
      <div className={styles.sectionContent}>
        <h2 className={styles.sectionTitle}>À propos</h2>
        
        <div className={styles.aboutGrid}>
          <div className={`${styles.aboutImage} hidden`}>
            <Image 
              src="/images/samuel.jpg" 
              alt="Samuel Alhadef"
              width={800}
              height={500}
              layout="responsive"
              objectFit="cover"
            />
            <div className={styles.imageOverlay}></div>
          </div>
          
          <div className={`${styles.aboutContent} hidden`}>
            <h3>Passionné par la Création Numérique</h3>
            <p>
              Je vis et respire le développement web, avec une passion dévorante pour 
              la création d'expériences numériques innovantes. Chaque ligne de code que 
              j'écris, chaque design que je crée est guidé par mon enthousiasme pour 
              l'excellence et ma soif insatiable d'apprentissage.
            </p>
            <p>
              Actuellement étudiant en première année à l'IIM Digital School, je m'immerge 
              complètement dans l'univers du développement web, du design numérique et des 
              technologies émergentes. Ma curiosité sans limite me pousse constamment à 
              explorer de nouvelles compétences et techniques pour donner vie à des idées 
              ambitieuses.
            </p>
            
            <div className={styles.aboutStats}>
              <div className={`${styles.statItem} hidden`}>
                <div className={styles.statValue}>2</div>
                <div className={styles.statLabel}>Pays travaillé</div>
              </div>
              <div className={`${styles.statItem} hidden`}>
                <div className={styles.statValue}>5+</div>
                <div className={styles.statLabel}>Langages Maîtrisés</div>
              </div>
              <div className={`${styles.statItem} hidden`}>
                <div className={styles.statValue}>2+</div>
                <div className={styles.statLabel}>Années d'Etudes</div>
              </div>
              <div className={`${styles.statItem} hidden`}>
                <div className={styles.statValue}>40+</div>
                <div className={styles.statLabel}>Projets Réalisés</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}