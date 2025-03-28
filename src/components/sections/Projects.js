'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import styles from '@/styles/sections/Projects.module.css'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Données des projets
// Update your projects array to include GitHub links
const projects = [
  {
    title: "Pétanque 3D",
    category: "jeu",
    description: "Simulation réaliste de pétanque en 3D avec physique avancée et environnements variés.",
    image: "/assets/images/app-section/petanque.png",
    projectUrl: "#",
    githubUrl: "https://github.com/yourusername/petanque-3d"
  },
  {
    title: "СОВЕТСКИЙ ТЕТРИС",
    category: "jeu",
    description: "Version rétro du classique Tetris avec esthétique soviétique, musique thématique et effets visuels nostalgiques.",
    image: "/assets/images/app-section/tetrissovietique.png",
    projectUrl: "#",
    githubUrl: "https://github.com/yourusername/soviet-tetris"
  },
  {
    title: "Anim'Hopy",
    category: "app",
    description: "Site web pour une association d'aide aux enfants dans les hôpitaux de Villeneuve Saint-George, facilitant le bénévolat et les dons.",
    image: "/assets/images/app-section/animhopy.png",
    projectUrl: "#",
    githubUrl: "https://github.com/yourusername/animhopy"
  },
  {
    title: "Taskflow",
    category: "app",
    description: "Application de gestion de tâches inspirée de Trello, avec fonctionnalités de drag-and-drop et organisation en tableaux personnalisables.",
    image: "/assets/images/app-section/taskflow.png",
    projectUrl: "#",
    githubUrl: "https://github.com/yourusername/taskflow"
  },
  {
    title: "Techno Music",
    category: "app",
    description: "Générateur de particules réactif à la musique créant des visualisations immersives et synchronisées au rythme des morceaux.",
    image: "/assets/images/app-section/musiqueparticule.png",
    projectUrl: "#",
    githubUrl: "https://github.com/yourusername/techno-music"
  },
  {
    title: "Ma Boutique Symphony",
    category: "app",
    description: "Site e-commerce complet développé avec Symfony, incluant gestion des produits, panier, paiement et espace client.",
    image: "/assets/images/app-section/maboutique.png",
    projectUrl: "#",
    githubUrl: "https://github.com/yourusername/boutique-symphony"
  },
  {
    title: "MousquetAI",
    category: "ia",
    description: "Assistant intelligent pour sites web offrant un support utilisateur en temps réel avec une interface conversationnelle naturelle.",
    image: "/assets/images/app-section/iaassistant.png",
    projectUrl: "#",
    githubUrl: "https://github.com/yourusername/mousquetai"
  },
  {
    title: "Object Detector",
    category: "ia",
    description: "Application de détection d'objets en temps réel utilisant la vision par ordinateur et l'apprentissage profond.",
    image: "/assets/images/app-section/iadetector.png",
    projectUrl: "#",
    githubUrl: "https://github.com/yourusername/object-detector"
  },
  {
    title: "Sign Language Translator",
    category: "ia",
    description: "Logiciel de traduction du langage des signes en temps réel, facilitant la communication entre personnes sourdes et entendantes.",
    image: "/assets/images/app-section/signia.png",
    projectUrl: "#",
    githubUrl: "https://github.com/yourusername/sign-translator"
  },
  {
    title: "Anim Generator IA",
    category: "ia",
    description: "Logiciel de génération de vidéos utilisant des modèles d'IA avancés pour créer du contenu animé à partir de descriptions textuelles.",
    image: "/assets/images/app-section/iavideo.png",
    projectUrl: "#",
    githubUrl: "https://github.com/yourusername/anim-generator"
  }
]

export default function Projects() {
  // État pour gérer le filtre actif et les projets filtrés
  const [activeFilter, setActiveFilter] = useState('all')
  const [filteredProjects, setFilteredProjects] = useState(projects)
  
  // Hook personnalisé pour détecter quand la section devient visible
  const { ref, inView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  })

  // Effet pour animer les éléments lorsque la section devient visible
  useEffect(() => {
    if (inView) {
      // Animer le titre
      gsap.to(`.${styles.sectionTitle}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8
      })
      
      // Animer les boutons de filtre avec un délai progressif
      gsap.to(`.${styles.filterBtn}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.5,
        stagger: 0.1, // Chaque bouton apparaît 0.1s après le précédent
        delay: 0.2
      })
      
      // Animer le conteneur du slider
      gsap.to(`.${styles.sliderContainer}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        delay: 0.4
      })
    }
  }, [inView, styles])

  // Effet pour filtrer les projets lorsque le filtre actif change
  useEffect(() => {
    // Filtrer les projets selon la catégorie sélectionnée
    if (activeFilter === 'all') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter))
    }
  }, [activeFilter])

  // Fonction pour gérer le clic sur les boutons de filtre
  const handleFilterClick = (filter) => {
    setActiveFilter(filter)
  }

  return (
    <section className={styles.projects} ref={ref} id="projects" data-scroll-section>
      <div className={styles.sectionContent}>
        <h2 className={`${styles.sectionTitle} hidden`}>Projets</h2>
        
        {/* Filtres de projets */}
        <div className={styles.projectFilters}>
          <button 
            className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''} hidden`}
            onClick={() => handleFilterClick('all')}
          >
            Tous
          </button>
          <button 
            className={`${styles.filterBtn} ${activeFilter === 'jeu' ? styles.active : ''} hidden`}
            onClick={() => handleFilterClick('jeu')}
          >
            Jeux
          </button>
          <button 
            className={`${styles.filterBtn} ${activeFilter === 'app' ? styles.active : ''} hidden`}
            onClick={() => handleFilterClick('app')}
          >
            Applications
          </button>
          <button 
            className={`${styles.filterBtn} ${activeFilter === 'ia' ? styles.active : ''} hidden`}
            onClick={() => handleFilterClick('ia')}
          >
            Intelligence Artificielle
          </button>
        </div>
        
        {/* Slider de projets */}
        <div className={`${styles.sliderContainer} hidden`}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              // Quand la largeur de viewport >= 640px
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // Quand la largeur de viewport >= 1024px
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className={styles.projectsSlider}
          >
            {filteredProjects.map((project, index) => (
  <SwiperSlide key={index}>
    <div className={styles.projectCard}>
      <div className={styles.projectImageWrapper}>
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={200}
          className={styles.projectImage}
        />
      </div>
      <div className={styles.projectContent}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <div className={styles.projectCategory}>
          {project.category === 'jeu' ? 'Jeu' : 
           project.category === 'app' ? 'Application web' : 
           'Intelligence Artificielle'}
        </div>
        <p className={styles.projectDescription}>{project.description}</p>
        <div className={styles.projectLinks}>
          <a href={project.projectUrl} className={styles.projectLink}>Voir le projet</a>
          <a href={project.githubUrl} className={styles.githubLink}>GitHub</a>
        </div>
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