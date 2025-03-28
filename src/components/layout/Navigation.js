'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '@/styles/components/Navigation.module.css'

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      // Get current scroll position with good cross-browser support
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      
      // Get all sections
      const sections = document.querySelectorAll('section')
      
      // Track which section has the most visibility
      let maxVisibleSection = null
      let maxVisibleAmount = 0
      
      sections.forEach(section => {
        const sectionId = section.id || section.classList[0]
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        
        // Calculate how much of the section is visible in the viewport
        const visibleTop = Math.max(0, sectionTop - scrollPosition)
        const visibleBottom = Math.min(windowHeight, sectionTop + sectionHeight - scrollPosition)
        const visibleAmount = Math.max(0, visibleBottom - visibleTop)
        
        // Check if this section has more visibility than previous maximum
        if (visibleAmount > maxVisibleAmount) {
          maxVisibleAmount = visibleAmount
          maxVisibleSection = sectionId
        }
        
        // Special case for the first section (hero)
        if (scrollPosition < windowHeight / 2 && sectionId === 'hero') {
          maxVisibleSection = 'hero'
        }
      })
      
      // Update active section if we found a visible section
      if (maxVisibleSection) {
        setActiveSection(maxVisibleSection)
      }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Set initial active state
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleNavClick = (sectionId, e) => {
    e.preventDefault()
    
    const targetSection = document.getElementById(sectionId) || 
                        document.querySelector(`.${sectionId}`)
    
    if (targetSection) {
      // Smooth scroll to target
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth'
      })
      
      // Update active section
      setActiveSection(sectionId)
    }
  }

  return (
    <nav className={styles.navigation}>
      <div 
        className={`${styles.navItem} ${activeSection === 'hero' ? styles.active : ''}`} 
        onClick={(e) => handleNavClick('hero', e)}
      >
        <i className="fas fa-home"></i>
        <span className={styles.navTooltip}>Accueil</span>
      </div>
      
      <div 
        className={`${styles.navItem} ${activeSection === 'about' ? styles.active : ''}`} 
        onClick={(e) => handleNavClick('about', e)}
      >
        <i className="fas fa-user"></i>
        <span className={styles.navTooltip}>À propos</span>
      </div>
      
      <div 
        className={`${styles.navItem} ${activeSection === 'skills' ? styles.active : ''}`} 
        onClick={(e) => handleNavClick('skills', e)}
      >
        <i className="fas fa-code"></i>
        <span className={styles.navTooltip}>Compétences</span>
      </div>
      
      <div 
        className={`${styles.navItem} ${activeSection === 'projects' ? styles.active : ''}`} 
        onClick={(e) => handleNavClick('projects', e)}
      >
        <i className="fas fa-laptop-code"></i>
        <span className={styles.navTooltip}>Projets</span>
      </div>
      
      <div 
        className={`${styles.navItem} ${activeSection === 'threeD' ? styles.active : ''}`} 
        onClick={(e) => handleNavClick('threeD', e)}
      >
        <i className="fas fa-cube"></i>
        <span className={styles.navTooltip}>Projets 3D</span>
      </div>
      
      <div 
        className={`${styles.navItem} ${activeSection === 'travel' ? styles.active : ''}`} 
        onClick={(e) => handleNavClick('travel', e)}
      >
        <i className="fas fa-globe-europe"></i>
        <span className={styles.navTooltip}>Voyages</span>
      </div>
      
      <div 
        className={`${styles.navItem} ${activeSection === 'drone' ? styles.active : ''}`} 
        onClick={(e) => handleNavClick('drone', e)}
      >
        <i className="fas fa-camera"></i>
        <span className={styles.navTooltip}>Drone</span>
      </div>
      
      <div 
        className={`${styles.navItem} ${activeSection === 'contact' ? styles.active : ''}`} 
        onClick={(e) => handleNavClick('contact', e)}
      >
        <i className="fas fa-envelope"></i>
        <span className={styles.navTooltip}>Contact</span>
      </div>
    </nav>
  )
}