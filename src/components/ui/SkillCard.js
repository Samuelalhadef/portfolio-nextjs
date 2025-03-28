'use client'

import { useEffect, useRef } from 'react'
import styles from '@/styles/components/SkillCard.module.css'

export default function SkillCard({ name, icon, description, level }) {
  const cardRef = useRef(null)
  
  useEffect(() => {
    // Importer VanillaTilt dynamiquement pour éviter les erreurs d'hydratation
    const initTilt = async () => {
      if (typeof window !== 'undefined' && cardRef.current) {
        const { default: VanillaTilt } = await import('vanilla-tilt');
        VanillaTilt.init(cardRef.current, {
          max: 25,
          speed: 400,
          glare: true,
          "max-glare": 0.3,
        });
      }
    };
    
    // Initialiser seulement après le premier rendu
    setTimeout(initTilt, 100);
    
    return () => {
      if (cardRef.current && cardRef.current.vanillaTilt) {
        cardRef.current.vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <div 
      className={styles.skillCard} 
      ref={cardRef}
    >
      <div className={styles.skillCardInner}>
        <div className={styles.skillCardFront}>
          <div className={styles.skillIcon}>
            <i className={icon}></i>
          </div>
          <div className={styles.skillName}>{name}</div>
        </div>
        <div className={styles.skillCardBack}>
          <div className={styles.skillName}>{name}</div>
          <div className={styles.skillDescription}>{description}</div>
          <div className={styles.skillLevel}>
            <div 
              className={styles.skillProgress} 
              style={{ width: `${level}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}