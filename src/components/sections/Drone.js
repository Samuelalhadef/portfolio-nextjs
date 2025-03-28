'use client'

import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import styles from '@/styles/sections/Drone.module.css'

// Données des slides drone avec timestamps fixes
const droneSlides = [
  {
    location: "Forêt de Fontainebleau - Clairière",
    date: "Automne 2023",
    description: "Vue aérienne de la clairière dorée au cœur de Fontainebleau, capturant le contraste des chênes centenaires et des roches de grès.",
    image: "/images/drone-section/grotte.jpg",
    altitude: "120m",
    coordinates: "48.4167° N, 2.7000° E",
    timestamp: "00:01:27" // Timestamp fixe pour chaque slide
  },
  {
    location: "Forêt de Fontainebleau - Gorges d'Apremont",
    date: "Été 2023",
    description: "Survol des célèbres gorges d'Apremont dans la forêt de Fontainebleau, avec ses formations rocheuses uniques et sa végétation luxuriante.",
    image: "/images/drone-section/rocher-canon2.jpg",
    altitude: "85m",
    coordinates: "48.4052° N, 2.6832° E",
    timestamp: "00:02:43"
  },
  {
    location: "Forêt de Fontainebleau - Étangs",
    date: "Printemps 2023",
    description: "Les étangs cachés de Fontainebleau au lever du soleil, offrant un miroir parfait pour le ciel et la canopée environnante.",
    image: "/images/drone-section/rocher-canon.jpg",
    altitude: "95m",
    coordinates: "48.4093° N, 2.6914° E",
    timestamp: "00:03:18"
  },
  {
    location: "Paris - La Défense",
    date: "Hiver 2022",
    description: "Géométrie urbaine de La Défense capturée au crépuscule, révélant les formes angulaires des gratte-ciels et leurs lumières scintillantes.",
    image: "/images/drone-section/ladefense.jpg",
    altitude: "110m",
    coordinates: "48.8918° N, 2.2385° E",
    timestamp: "00:04:56"
  },
  {
    location: "Cologne - Cathédrale et Rhin",
    date: "Été 2022",
    description: "La majestueuse cathédrale de Cologne et le Rhin sous un ciel d'été, mettant en valeur ce chef-d'œuvre gothique et le cœur vivant de la ville.",
    image: "/images/drone-section/cathedrale.jpg",
    altitude: "100m",
    coordinates: "50.9413° N, 6.9583° E",
    timestamp: "00:05:33"
  },
  {
    location: "Cologne - Vieille Ville",
    date: "Automne 2022",
    description: "Vue panoramique de l'Altstadt (vieille ville) de Cologne avec ses rues pittoresques et ses maisons colorées vues des airs.",
    image: "/images/drone-section/cologne-ville.jpg",
    altitude: "75m",
    coordinates: "50.9375° N, 6.9603° E",
    timestamp: "00:06:12"
  },
  {
    location: "Cologne - Pont Hohenzollern",
    date: "Printemps 2022",
    description: "Le célèbre pont Hohenzollern au coucher du soleil, avec ses milliers de cadenas d'amour qui scintillent dans la lumière dorée.",
    image: "/images/drone-section/pont.jpg",
    altitude: "60m",
    coordinates: "50.9408° N, 6.9650° E",
    timestamp: "00:07:05"
  }
]

export default function Drone() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [batteryLevel, setBatteryLevel] = useState(100)
  const timerRef = useRef(null)
  const { ref, inView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  })

  // Simuler l'épuisement de la batterie
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => {
        const newLevel = prev > 0 ? prev - 0.5 : 100;
        return newLevel;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (inView) {
      // Animer les éléments quand la section devient visible
      gsap.to(`.${styles.sectionTitle}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8
      })
      
      gsap.to(`.${styles.droneIntro}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        delay: 0.2
      })
      
      gsap.to(`.${styles.droneViewport}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        delay: 0.4
      })
      
      gsap.to(`.${styles.droneSpecs}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        delay: 0.6,
        stagger: 0.15
      })

      // Démarrer le diaporama automatique
      startAutoSlideshow();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [inView]);

  const startAutoSlideshow = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    timerRef.current = setTimeout(() => {
      goToNextSlide();
    }, 5000);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Animation de transition entre les slides
    const timeline = gsap.timeline({
      onComplete: () => {
        setCurrentSlide(index);
        setIsTransitioning(false);
        startAutoSlideshow();
      }
    });
    
    timeline
      .to(`.${styles.droneImage}`, {
        opacity: 0,
        y: -20,
        duration: 0.4
      })
      .to(`.${styles.droneInfoContent}`, {
        opacity: 0,
        y: 20,
        duration: 0.3
      }, '-=0.3')
      .set(`.${styles.droneCamera}`, {
        attr: { 'data-slide': index }
      })
      .to(`.${styles.droneImage}`, {
        opacity: 1,
        y: 0,
        duration: 0.5
      })
      .to(`.${styles.droneInfoContent}`, {
        opacity: 1,
        y: 0,
        duration: 0.4
      }, '-=0.3');
      
    // Simuler le mouvement de l'indicateur drone
    gsap.to(`.${styles.dronePositionIndicator}`, {
      left: `${(index / (droneSlides.length - 1)) * 100}%`,
      duration: 1,
      ease: "power2.inOut"
    });
  };

  const goToNextSlide = () => {
    const nextIndex = (currentSlide + 1) % droneSlides.length;
    goToSlide(nextIndex);
  };

  const goToPrevSlide = () => {
    const prevIndex = (currentSlide - 1 + droneSlides.length) % droneSlides.length;
    goToSlide(prevIndex);
  };

  return (
    <section className={styles.drone} ref={ref} id="drone" data-scroll-section>
      <div className={styles.sectionContent}>
        <h2 className={`${styles.sectionTitle} hidden`}>Photographie Aérienne</h2>
        
        <div className={`${styles.droneIntro} hidden`}>
          <p>
            La photographie par drone est devenue l'une de mes passions les plus intenses. 
            Cette technologie révolutionnaire m'offre une perspective unique sur le monde, 
            me permettant de capturer des images saisissantes depuis les cieux.
          </p>
        </div>
        
        <div className={`${styles.droneViewport} hidden`}>
          {/* Interface inspirée d'un écran de contrôle de drone */}
          <div className={styles.droneCamera} data-slide={currentSlide}>
            <div className={styles.droneCameraFrame}>
              {/* Image principale */}
              <div className={styles.droneImageContainer}>
                <Image
                  src={droneSlides[currentSlide].image}
                  alt={droneSlides[currentSlide].location}
                  layout="fill"
                  objectFit="cover"
                  className={styles.droneImage}
                />
              </div>
              
              {/* Overlay HUD */}
              <div className={styles.droneHUD}>
                <div className={styles.hudElement}>
                  <div className={styles.hudLabel}>ALT</div>
                  <div className={styles.hudValue}>{droneSlides[currentSlide].altitude}</div>
                </div>
                
                <div className={styles.hudElement}>
                  <div className={styles.hudLabel}>GPS</div>
                  <div className={styles.hudValue}>{droneSlides[currentSlide].coordinates}</div>
                </div>
                
                <div className={styles.hudElement}>
                  <div className={styles.hudLabel}>BAT</div>
                  <div className={styles.hudBattery}>
                    <div 
                      className={styles.hudBatteryLevel} 
                      style={{ width: `${batteryLevel}%`, 
                               backgroundColor: batteryLevel > 20 ? '#4BE3AC' : '#FC3D21' 
                             }}
                    ></div>
                  </div>
                </div>
                
                <div className={styles.hudCorners}>
                  <div className={styles.hudCorner}></div>
                  <div className={styles.hudCorner}></div>
                  <div className={styles.hudCorner}></div>
                  <div className={styles.hudCorner}></div>
                </div>
                
                <div className={styles.hudTimestamp}>
                  REC {droneSlides[currentSlide].timestamp}
                </div>
              </div>
            </div>
            
            {/* Contrôles et informations */}
            <div className={styles.droneControls}>
              <button className={styles.droneNavButton} onClick={goToPrevSlide}>
                <i className="fas fa-caret-left"></i>
              </button>
              
              <div className={styles.dronePositionTrack}>
                <div className={styles.dronePositionLine}></div>
                <div className={styles.dronePositionIndicator}></div>
                
                {droneSlides.map((_, index) => (
                  <div 
                    key={index}
                    className={`${styles.dronePositionMarker} ${index === currentSlide ? styles.active : ''}`}
                    onClick={() => goToSlide(index)}
                  ></div>
                ))}
              </div>
              
              <button className={styles.droneNavButton} onClick={goToNextSlide}>
                <i className="fas fa-caret-right"></i>
              </button>
            </div>
          </div>
          
          <div className={styles.droneInfo}>
            <div className={styles.droneInfoContent}>
              <h3 className={styles.droneLocation}>{droneSlides[currentSlide].location}</h3>
              <div className={styles.droneMetadata}>
                <span className={styles.droneDate}>{droneSlides[currentSlide].date}</span>
                <span className={styles.droneCoordinates}>{droneSlides[currentSlide].coordinates}</span>
              </div>
              <p className={styles.droneDescription}>{droneSlides[currentSlide].description}</p>
            </div>
          </div>
        </div>
        
        <div className={styles.droneSpecs}>
          <div className={`${styles.droneSpec} hidden`}>
            <div className={styles.specIcon}>
              <i className="fas fa-camera"></i>
            </div>
            <div className={styles.specName}>Appareil</div>
            <div className={styles.specValue}>DJI Mavic Air 2</div>
          </div>
          
          <div className={`${styles.droneSpec} hidden`}>
            <div className={styles.specIcon}>
              <i className="fas fa-microchip"></i>
            </div>
            <div className={styles.specName}>Capteur</div>
            <div className={styles.specValue}>1/2" CMOS, 12MP</div>
          </div>
          
          <div className={`${styles.droneSpec} hidden`}>
            <div className={styles.specIcon}>
              <i className="fas fa-film"></i>
            </div>
            <div className={styles.specName}>Vidéo</div>
            <div className={styles.specValue}>4K/60fps, HDR</div>
          </div>
        </div>
      </div>
    </section>
  )
}