'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import styles from '@/styles/sections/ThreeD.module.css'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// 3D Project data
const threeDProjects = [
  {
    title: "Jiji et sa copine",
    category: "modelisation",
    description: "Modélisation 3D des chats de Kiki la petite sorcière avec textures détaillées et rig pour animation.",
    image: "/images/3D/chat.jpg"
  },
  {
    title: "Sophie la Girafe",
    category: "modelisation",
    description: "Reproduction fidèle du célèbre jouet pour enfants avec matériaux réalistes et textures détaillées.",
    image: "/images/3D/sophie.png"
  },
  {
    title: "Téléphone Fisher-Price",
    category: "modelisation",
    description: "Modélisation nostalgique du téléphone jouet classique avec des matériaux PBR et éclairage studio.",
    image: "/images/3D/telephone.png"
  },
  {
    title: "Figurine Playmobil",
    category: "modelisation",
    description: "Modélisation précise d'une figurine Playmobil avec système d'articulation et accessoires détaillés.",
    image: "/images/3D/playmobil.png"
  },
  {
    title: "Court-métrage \"trump vs biden\"",
    category: "video",
    description: "Animation 3D racontant l'histoire d'un robot qui découvre la conscience.",
    image: "/images/3D/trump.png"
  },
  {
    title: "Motion Design \"showreal 2024\"",
    category: "video",
    description: "Séquence de motion design avec des formes abstraites en transformation fluide.",
    image: "/images/3D/showreel.png"
  }
]

export default function ThreeD() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [filteredProjects, setFilteredProjects] = useState(threeDProjects)
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
      
      gsap.to(`.${styles.threeDIntro}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        delay: 0.2
      })
      
      gsap.to(`.${styles.threeDFilterBtn}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.5,
        stagger: 0.1,
        delay: 0.3
      })
      
      gsap.to(`.${styles.sliderContainer}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        delay: 0.5
      })
    }
  }, [inView])

  useEffect(() => {
    // Filter projects based on active filter
    if (activeFilter === 'all') {
      setFilteredProjects(threeDProjects)
    } else {
      setFilteredProjects(threeDProjects.filter(project => project.category === activeFilter))
    }
  }, [activeFilter])

  const handleFilterClick = (filter) => {
    setActiveFilter(filter)
  }

  // Style pour assurer que toutes les cartes ont la même taille
  const cardStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }

  const imageWrapperStyle = {
    width: '100%',
    height: '220px',
    position: 'relative',
    overflow: 'hidden'
  }

  const contentStyle = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem',
    height: '220px'  // Hauteur fixe pour la partie contenu
  }

  return (
    <section className={styles.threeD} ref={ref} id="threeD" data-scroll-section>
      <div className={styles.sectionContent}>
        <h2 className={`${styles.sectionTitle} hidden`}>Projets 3D</h2>
        
        <div className={`${styles.threeDIntro} hidden`}>
          <p>
            Découvrez mes créations 3D, fruit de ma passion pour la modélisation et la vidéo. 
            Chaque projet est une exploration des possibilités visuelles et narratives offertes 
            par les technologies 3D.
          </p>
        </div>
        
        <div className={styles.threeDSliderControls}>
          <button 
            className={`${styles.threeDFilterBtn} ${activeFilter === 'all' ? styles.active : ''} hidden`}
            onClick={() => handleFilterClick('all')}
          >
            Tous
          </button>
          <button 
            className={`${styles.threeDFilterBtn} ${activeFilter === 'modelisation' ? styles.active : ''} hidden`}
            onClick={() => handleFilterClick('modelisation')}
          >
            Modélisation
          </button>
          <button 
            className={`${styles.threeDFilterBtn} ${activeFilter === 'video' ? styles.active : ''} hidden`}
            onClick={() => handleFilterClick('video')}
          >
            Vidéo
          </button>
        </div>
        
        <div className={`${styles.sliderContainer} hidden`}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className={styles.threeDSlider}
          >
            {filteredProjects.map((project, index) => (
              <SwiperSlide key={index}>
                <div className={styles.threeDCard} style={cardStyle}>
                  <div className={styles.threeDImageWrapper} style={imageWrapperStyle}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={220}
                      className={styles.threeDImage}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%'
                      }}
                    />
                  </div>
                  <div className={styles.threeDContent} style={contentStyle}>
                    <h3 className={styles.threeDTitle}>{project.title}</h3>
                    <span className={styles.threeDType}>
                      {project.category === 'modelisation' ? 'Modélisation' : 'Vidéo'}
                    </span>
                    <p className={styles.threeDDescription}>{project.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}