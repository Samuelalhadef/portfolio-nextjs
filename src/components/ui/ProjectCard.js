import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/components/ProjectCard.module.css'

export default function ProjectCard({ title, category, description, image }) {
  const getCategoryDisplay = (category) => {
    switch(category) {
      case 'jeu': return 'Jeu';
      case 'app': return 'Application web';
      case 'ia': return 'Intelligence Artificielle';
      default: return category;
    }
  };

  return (
    <div className={styles.projectCard}>
      <div className={styles.projectImageWrapper}>
        <Image
          src={image}
          alt={title}
          width={400}
          height={200}
          className={styles.projectImage}
        />
      </div>
      <div className={styles.projectContent}>
        <h3 className={styles.projectTitle}>{title}</h3>
        <div className={styles.projectCategory}>{getCategoryDisplay(category)}</div>
        <p className={styles.projectDescription}>{description}</p>
        <Link href="#" className={styles.projectLink}>
          Voir le projet
        </Link>
      </div>
    </div>
  )
}