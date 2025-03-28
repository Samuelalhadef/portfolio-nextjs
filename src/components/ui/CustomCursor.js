'use client'

import { useEffect, useState } from 'react'
import styles from '@/styles/components/CustomCursor.module.css'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Vérifier si c'est un appareil tactile (seulement côté client)
    setIsTouchDevice(
      'ontouchstart' in window && 
      !window.matchMedia('(pointer:fine)').matches
    )
    
    // Ne pas initialiser sur les appareils tactiles
    if ('ontouchstart' in window && !window.matchMedia('(pointer:fine)').matches) {
      return;
    }

    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mousedown', onMouseDown)
      document.addEventListener('mouseup', onMouseUp)
      document.addEventListener('mouseenter', onMouseEnter)
      document.addEventListener('mouseleave', onMouseLeave)

      // Événements pour les éléments interactifs
      const interactiveElements = document.querySelectorAll(
        'a, button, .nav-item, .project-card, .skill-card, .swiper-button-next, .swiper-button-prev, .drone-nav, .globe-btn'
      )

      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setLinkHovered(true))
        el.addEventListener('mouseleave', () => setLinkHovered(false))
      })
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    addEventListeners()
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  // Retourner null si c'est un appareil tactile
  if (isTouchDevice) {
    return null
  }

  return (
    <div 
      className={`${styles.cursorContainer} ${linkHovered ? styles.onInteractive : ''} ${hidden ? styles.hidden : ''}`}
    >
      <div
        className={`${styles.cursorDot} ${clicked ? styles.active : ''}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
      <div
        className={styles.cursorGlow}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
      {/* Trails du curseur */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={styles.cursorTrail}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${1 - (i * 0.05)})`,
            opacity: `${1 - (i / 8)}`,
            '--index': i
          }}
        />
      ))}
    </div>
  )
}