'use client'

import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import styles from '@/styles/components/Loading.module.css'

export default function Loading() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  
  // Refs pour les animations
  const containerRef = useRef(null)
  const iconRef = useRef(null)
  const progressRef = useRef(null)
  const textRef = useRef(null)
  const elementsRef = useRef([])
  
  // Timeline GSAP pour coordonner les animations
  const tl = useRef(null)

  useEffect(() => {
    // Initialiser la timeline GSAP
    tl.current = gsap.timeline()
    
    // Configuration avancée des particules
    const initParticles = () => {
      if (typeof window !== 'undefined' && window.particlesJS) {
        window.particlesJS("loading-particles", {
          particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: ["#4BE3AC", "#6C63FF", "#FF6B6B"] }, // Plusieurs couleurs
            shape: { 
              type: ["circle", "triangle", "polygon"], 
              polygon: { nb_sides: 6 }
            },
            opacity: {
              value: 0.6,
              random: true,
              anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
              value: 5,
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
              speed: 2,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: { enable: true, rotateX: 600, rotateY: 1200 }
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
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 }
            }
          },
          retina_detect: true
        });
      }
    }

    initParticles();

    // Animation d'entrée
    const startEntryAnimation = () => {
      // Définir l'état initial des éléments
      gsap.set(textRef.current, { y: 30, opacity: 0 })
      gsap.set(iconRef.current, { scale: 0.5, opacity: 0 })
      gsap.set(progressRef.current, { scaleX: 0, opacity: 0 })
      gsap.set(elementsRef.current, { opacity: 0, y: 20, rotation: -10 })
      
      // Animer l'entrée des éléments
      tl.current
        .to(iconRef.current, { 
          duration: 1.2, 
          scale: 1, 
          opacity: 1, 
          ease: "elastic.out(1, 0.5)",
          clearProps: "scale" 
        })
        .to(textRef.current, { 
          duration: 0.8, 
          y: 0, 
          opacity: 1, 
          ease: "power2.out" 
        }, "-=0.5")
        .to(progressRef.current, { 
          duration: 0.6, 
          opacity: 1, 
          scaleX: 1, 
          transformOrigin: "left center",
          ease: "power1.inOut" 
        }, "-=0.3")
        .to(elementsRef.current, { 
          duration: 0.8, 
          opacity: 1, 
          y: 0, 
          rotation: 0,
          stagger: 0.1,
          ease: "back.out(1.7)" 
        }, "-=0.4")
    }
    
    // Animation de l'icône principale
    const animateMainIcon = () => {
      gsap.to(iconRef.current, {
        boxShadow: "0 0 30px rgba(75, 227, 172, 0.8)",
        filter: "drop-shadow(0 0 8px rgba(75, 227, 172, 0.6))",
        scale: 1.1,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Animation de rotation subtile
      gsap.to(iconRef.current.querySelector('img'), {
        rotation: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    // Animation des éléments flottants
    const animateFloatingElements = () => {
      elementsRef.current.forEach((el, index) => {
        // Animation différente pour chaque élément
        gsap.to(el, {
          y: `-=${10 + index * 5}`,
          x: `+=${5 - index * 2}`,
          rotation: `+=${index % 2 === 0 ? 15 : -15}`,
          duration: 2 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2
        });
        
        // Effet de lueur pulsante
        gsap.to(el, {
          filter: "brightness(1.5)",
          duration: 1.5 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.15
        });
      });
    }
    
    // Animation de sortie
    const exitAnimation = () => {
      setIsExiting(true);
      
      return gsap.timeline()
        .to(elementsRef.current, { 
          duration: 0.5, 
          opacity: 0, 
          y: -20, 
          stagger: 0.05,
          ease: "back.in(1.7)" 
        })
        .to(progressRef.current, { 
          duration: 0.4, 
          scaleX: 0, 
          opacity: 0,
          transformOrigin: "right center",
          ease: "power1.inOut" 
        }, "-=0.2")
        .to(textRef.current, { 
          duration: 0.4, 
          y: -20, 
          opacity: 0, 
          ease: "power2.in" 
        }, "-=0.3")
        .to(iconRef.current, { 
          duration: 0.6, 
          scale: 1.5, 
          opacity: 0, 
          ease: "power2.in" 
        }, "-=0.4")
        .to(containerRef.current, {
          duration: 0.8,
          opacity: 0,
          ease: "power2.inOut",
          onComplete: () => setIsLoading(false)
        }, "-=0.2");
    }
    
    // Lancer les animations d'entrée
    startEntryAnimation();
    animateMainIcon();
    animateFloatingElements();

    // Simuler la progression de chargement avec une courbe plus naturelle
    const loadingInterval = setInterval(() => {
      setProgress(prev => {
        // Formule pour une progression plus naturelle
        const remaining = 100 - prev;
        const increment = Math.max(
          0.1,
          (remaining * 0.07) + (Math.sin(prev * 0.04) * 2)
        );
        
        const newProgress = prev + increment;
        
        // Assurons-nous que le chargement se termine après un certain temps
        // Même si la progression n'atteint pas exactement 100%
        if (newProgress >= 99 || prev >= 99) {
          clearInterval(loadingInterval);
          
          // Mettre immédiatement à 100% pour des raisons visuelles
          setProgress(100);
          
          // Animation finale et transition après un court délai
          setTimeout(() => {
            exitAnimation();
          }, 800);
          
          return 100;
        }
        
        return Math.min(99, newProgress);
      });
    }, 120);
    
    // Garantir que le chargement se termine après un délai maximum (5 secondes)
    const maxLoadingTime = setTimeout(() => {
      clearInterval(loadingInterval);
      setProgress(100);
      setTimeout(() => {
        exitAnimation();
      }, 800);
    }, 5000);

    return () => {
    clearInterval(loadingInterval);
    clearTimeout(maxLoadingTime);
  };
  }, []);

  // Si le chargement est terminé, ne rien rendre
  if (!isLoading) return null;

  // Fonction pour ajouter des références aux éléments flottants
  const addToElementsRef = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <div className={styles.loadingScreen} ref={containerRef}>
      <canvas id="loading-particles" className={styles.loadingParticles}></canvas>
      
      <div className={styles.loadingContent}>
        <div className={styles.loadingAnimation}>
          <div className={styles.loadingIcon} ref={iconRef}>
            {/* Icône créative directement intégrée (ampoule avec cerveau) */}
            <svg viewBox="0 0 24 24" width="70" height="70" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Contour de l'ampoule */}
              <path 
                d="M9 21h6m-6-3h6m-6.5-2h7c0-1 1.5-3 1.5-5 0-3.5-2.5-6-6-6s-6 2.5-6 6c0 2 1.5 4 1.5 5h2z" 
                stroke="#4BE3AC" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              {/* Filament de l'ampoule */}
              <path 
                d="M10 8.5c0 0 1.5-0.5 2-0.5s2 0.5 2 0.5" 
                stroke="#4BE3AC" 
                strokeWidth="1.2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              {/* Cerveau stylisé */}
              <path 
                d="M12 7.5c-1.5 0-2 1-2 1s0.5-0.5 0.75-0.25S11.5 9 11 9s-1-0.5-1.5 0 0 1.5 0.5 1.5 1-0.5 1.5 0-0.5 1 0 1.5" 
                stroke="#FF6B6B" 
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <path 
                d="M12 7.5c1.5 0 2 1 2 1s-0.5-0.5-0.75-0.25S12.5 9 13 9s1-0.5 1.5 0 0 1.5-0.5 1.5-1-0.5-1.5 0 0.5 1 0 1.5" 
                stroke="#FF6B6B" 
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              {/* Étoiles/étincelles autour de l'ampoule */}
              <path d="M18 6l1-1m-13 1l-1-1m4-3v-1m5 1v-1" stroke="#FFD166" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="9.5" cy="5.5" r="0.5" fill="#FFD166" />
              <circle cx="14.5" cy="4.5" r="0.5" fill="#FFD166" />
              <circle cx="16.5" cy="8.5" r="0.5" fill="#FFD166" />
            </svg>
          </div>
        </div>
        
        <div className={styles.loadingText} ref={textRef}>
          <h2>Initialisation du Portfolio</h2>
          <p>Préparation de l'expérience créative...</p>
        </div>
        
        <div className={styles.loadingProgressContainer}>
          <div className={styles.loadingProgress} ref={progressRef}>
            <div 
              className={styles.loadingProgressBar} 
              style={{ width: `${progress}%` }}
            ></div>
            <div className={styles.loadingProgressValue}>
              {Math.floor(progress)}%
            </div>
          </div>
        </div>
      </div>
      
      {/* Éléments flottants avec des icônes plus variées */}
      <div className={styles.loadingElements}>
        <div 
          className={`${styles.floatingElement} ${styles.elementCode}`} 
          ref={addToElementsRef}
          style={{ top: '15%', left: '10%' }}
        >
          <i className="fas fa-code"></i>
        </div>
        <div 
          className={`${styles.floatingElement} ${styles.elementDesign}`}
          ref={addToElementsRef}
          style={{ top: '25%', right: '15%' }}
        >
          <i className="fas fa-paint-brush"></i>
        </div>
        <div 
          className={`${styles.floatingElement} ${styles.elementIdea}`}
          ref={addToElementsRef}
          style={{ top: '65%', left: '20%' }}
        >
          <i className="fas fa-lightbulb"></i>
        </div>
        <div 
          className={`${styles.floatingElement} ${styles.elementCreative}`}
          ref={addToElementsRef}
          style={{ top: '75%', right: '25%' }}
        >
          <i className="fas fa-magic"></i>
        </div>
        <div 
          className={`${styles.floatingElement} ${styles.elementTech}`}
          ref={addToElementsRef}
          style={{ top: '40%', left: '85%' }}
        >
          <i className="fas fa-laptop-code"></i>
        </div>
        <div 
          className={`${styles.floatingElement} ${styles.elementWeb}`}
          ref={addToElementsRef}
          style={{ top: '55%', left: '5%' }}
        >
          <i className="fas fa-globe"></i>
        </div>
      </div>
    </div>
  )
}