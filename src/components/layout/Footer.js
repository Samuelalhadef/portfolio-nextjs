import Link from 'next/link'
import styles from '@/styles/components/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLogo}>Samuel Alhadef</div>
      
      <nav className={styles.footerNav}>
        <Link href="#hero" className={styles.footerLink}>Accueil</Link>
        <Link href="#about" className={styles.footerLink}>À propos</Link>
        <Link href="#skills" className={styles.footerLink}>Compétences</Link>
        <Link href="#projects" className={styles.footerLink}>Projets</Link>
        <Link href="#threeD" className={styles.footerLink}>Projets 3D</Link>
        <Link href="#travel" className={styles.footerLink}>Voyages</Link>
        <Link href="#drone" className={styles.footerLink}>Drone</Link>
        <Link href="#contact" className={styles.footerLink}>Contact</Link>
      </nav>
      
      <div className={styles.socialLinks}>
        <a href="https://www.linkedin.com/in/samuel-alhadef-190951257/" className={styles.socialLink}>
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="https://github.com/Samuelalhadef" className={styles.socialLink}>
          <i className="fab fa-github"></i>
        </a>
        <a href="https://www.behance.net/samuelalhadef" className={styles.socialLink}>
          <i className="fab fa-behance"></i>
        </a>
        <a href="https://www.instagram.com/samuel.alhadef/" className={styles.socialLink}>
          <i className="fab fa-instagram"></i>
        </a>
      </div>
      
      <div className={styles.copyright}>© 2025 Samuel Alhadef. Tous droits réservés.</div>
    </footer>
  )
}