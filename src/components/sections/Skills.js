'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import SkillCard from '@/components/ui/SkillCard'
import styles from '@/styles/sections/Skills.module.css'

// Skill data
const programmingLanguages = [
  {
    name: 'HTML',
    icon: 'fab fa-html5',
    description: 'Structure et organisation du contenu web avec HTML5.',
    level: 90
  },
  {
    name: 'CSS',
    icon: 'fab fa-css3-alt',
    description: 'Stylisation et mise en page responsive avec CSS3.',
    level: 85
  },
  {
    name: 'JavaScript',
    icon: 'fab fa-js',
    description: 'Programmation front-end interactive et dynamique.',
    level: 80
  },
  {
    name: 'Python',
    icon: 'fab fa-python',
    description: 'Développement backend et scripting avec Python.',
    level: 75
  },
  {
    name: 'PHP',
    icon: 'fab fa-php',
    description: 'Développement backend et gestion de bases de données.',
    level: 70
  },
  {
    name: 'C',
    icon: 'fas fa-code',
    description: 'Programmation bas niveau et développement système.',
    level: 65
  },
  {
    name: 'C#',
    icon: 'fab fa-microsoft',
    description: 'Développement d\'applications .NET et jeux Unity.',
    level: 70
  }
]

const frameworks = [
  {
    name: 'Symfony',
    icon: 'fab fa-symfony',
    description: 'Framework PHP robuste pour applications web complexes.',
    level: 75
  },
  {
    name: 'React.js',
    icon: 'fab fa-react',
    description: 'Bibliothèque JavaScript pour interfaces utilisateur dynamiques.',
    level: 80
  },
  {
    name: 'Next.js',
    icon: 'fas fa-code',
    description: 'Framework React pour applications web optimisées et SSR.',
    level: 75
  },
  {
    name: 'Tailwind CSS',
    icon: 'fab fa-css3',
    description: 'Framework CSS utilitaire pour développement web rapide.',
    level: 85
  },
  {
    name: 'Photoshop',
    icon: 'fas fa-paint-brush',
    description: 'Édition et retouche d\'images professionnelles.',
    level: 85
  },
  {
    name: 'Illustrator',
    icon: 'fas fa-bezier-curve',
    description: 'Création de logos et illustrations vectorielles.',
    level: 80
  },
  {
    name: 'Figma',
    icon: 'fab fa-figma',
    description: 'Conception d\'interfaces et prototypage.',
    level: 75
  },
  {
    name: 'Blender',
    icon: 'fas fa-cube',
    description: 'Modélisation et animation 3D.',
    level: 70
  },
  {
    name: 'After Effects',
    icon: 'fas fa-film',
    description: 'Animation et effets visuels pour vidéos.',
    level: 65
  }
]

export default function Skills() {
  const { ref, inView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  })

  useEffect(() => {
    if (inView) {
      // Animate in the title and group headers
      gsap.to(`.${styles.sectionTitle}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8
      })
      
      gsap.to(`.${styles.groupTitle}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.2,
        delay: 0.2
      })
      
      // Animate skill cards with staggered delay
      gsap.to(`.${styles.skillCardWrapper}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.5,
        stagger: 0.05,
        delay: 0.4
      })
    }
  }, [inView])

  return (
    <section className={styles.skills} ref={ref} id="skills" data-scroll-section>
      <div className={styles.sectionContent}>
        <h2 className={`${styles.sectionTitle} hidden`}>Compétences</h2>
        
        <div className={styles.skillsContainer}>
          <div className={styles.skillsGroup}>
            <h3 className={`${styles.groupTitle} hidden`}>Langages de Programmation</h3>
            <div className={styles.skillCards}>
              {programmingLanguages.map((skill, index) => (
                <div className={`${styles.skillCardWrapper} hidden`} key={`lang-${index}`}>
                  <SkillCard 
                    name={skill.name}
                    icon={skill.icon}
                    description={skill.description}
                    level={skill.level}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.skillsGroup}>
            <h3 className={`${styles.groupTitle} hidden`}>Frameworks & Outils</h3>
            <div className={styles.skillCards}>
              {frameworks.map((skill, index) => (
                <div className={`${styles.skillCardWrapper} hidden`} key={`framework-${index}`}>
                  <SkillCard 
                    name={skill.name}
                    icon={skill.icon}
                    description={skill.description}
                    level={skill.level}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}