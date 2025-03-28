'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import styles from '@/styles/sections/Hero.module.css'

export default function Hero() {
  const { ref, inView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  })
  
  const particlesRef = useRef(null)

  useEffect(() => {
    // Initialiser les particules de fond
    if (typeof window !== 'undefined' && window.particlesJS && particlesRef.current) {
      window.particlesJS("particles-canvas", {
        particles: {
          number: {
            value: window.innerWidth < 768 ? 50 : 100,
            density: { enable: true, value_area: 800 }
          },
          color: { value: "#4BE3AC" },
          shape: { type: "circle" },
          opacity: {
            value: 0.5,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#4BE3AC",
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 1 } },
            push: { particles_nb: 4 }
          }
        },
        retina_detect: true
      });
    }

    // Animation des éléments avec GSAP
    if (inView) {
      const timeline = gsap.timeline();
      
      timeline
        .to(`.${styles.heroSubtitle}`, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8
        })
        .to(`.${styles.heroTitle}`, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8
        }, "-=0.5")
        .to(`.${styles.heroDescription}`, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8
        }, "-=0.5")
        .to(`.${styles.heroCta}`, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8
        }, "-=0.5")
        .to(`.${styles.heroGraphic}`, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1
        }, "-=0.5")
        .to(`.${styles.floatingElement}`, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5
        }, "-=0.8");
    }
  }, [inView]);

  return (
    <section className={styles.hero} ref={ref} id="hero" data-scroll-section>
      <canvas id="particles-canvas" ref={particlesRef} className={styles.particlesCanvas}></canvas>
      
      <div className={styles.heroContent}>
        <h3 className={`${styles.heroSubtitle} hidden`}>CRÉATEUR DIGITAL PASSIONNÉ</h3>
        <h1 className={`${styles.heroTitle} hidden`}>
          Samuel <span className={styles.accentText}>Alhadef</span>
        </h1>
        <p className={`${styles.heroDescription} hidden`}>
          Développeur web & créateur numérique passionné par l'innovation et la résolution 
          de défis complexes. Explorez mon univers créatif et découvrez mes projets, 
          expériences et aventures.
        </p>
        <Link href="#about" className={`${styles.heroCta} hidden`}>
          Découvrir mon univers
        </Link>
      </div>
      
      {/* Nouvel élément graphique à la place du cube 3D */}
      <div className={`${styles.heroGraphic} hidden`}>
        <div className={styles.graphicContainer}>
          <div className={styles.graphicCircle}></div>
          <div className={styles.graphicRing}></div>
          <div className={styles.graphicRing} style={{ animationDelay: '1s' }}></div>
          <div className={styles.graphicRing} style={{ animationDelay: '2s' }}></div>
          
          {/* Éléments flottants avec des icônes */}
          <div className={`${styles.floatingElement} ${styles.element1} hidden`}>
            <i className="fab fa-react"></i>
          </div>
          <div className={`${styles.floatingElement} ${styles.element2} hidden`}>
            <i className="fas fa-code"></i>
          </div>
          <div className={`${styles.floatingElement} ${styles.element3} hidden`}>
            <i className="fas fa-cube"></i>
          </div>
          <div className={`${styles.floatingElement} ${styles.element4} hidden`}>
            <i className="fas fa-camera"></i>
          </div>
          <div className={`${styles.floatingElement} ${styles.element5} hidden`}>
            <i className="fas fa-globe-europe"></i>
          </div>
        </div>
      </div>
    </section>
  )
}