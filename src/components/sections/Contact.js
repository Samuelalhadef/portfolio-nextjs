'use client'

import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import emailjs from '@emailjs/browser'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import styles from '@/styles/sections/Contact.module.css'

export default function Contact() {
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  
  const { ref, inView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  })

  // Configuration EmailJS - Remplacez par vos propres clés
  const emailjsServiceId = 'PortfolioSamuel'
  const emailjsTemplateId = 'template_7wb8yla'
  const emailjsPublicKey = 'xcrdvgPUprLxVXPH2'

  useEffect(() => {
    if (inView) {
      // Animation d'entrée pour les éléments visibles
      gsap.to(`.${styles.sectionTitle}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8
      })
      
      gsap.to(`.${styles.contactInfo}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        delay: 0.2
      })
      
      gsap.to(`.${styles.contactItem}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.5,
        stagger: 0.15,
        delay: 0.4
      })
      
      gsap.to(`.${styles.contactForm}`, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        delay: 0.6
      })
    }
  }, [inView])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Effacer l'erreur pour ce champ lorsque l'utilisateur saisit
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) {
      errors.name = 'Le nom est requis'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'L\'email est requis'
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      errors.email = 'Veuillez entrer une adresse email valide'
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Le sujet est requis'
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Le message est requis'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsSubmitting(true)
      setSubmitError(null)
      
      // Préparation des paramètres pour EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      }
      
      // Envoi du formulaire avec EmailJS
      emailjs.send(
        emailjsServiceId,
        emailjsTemplateId,
        templateParams,
        emailjsPublicKey
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text)
        setIsSubmitting(false)
        setSubmitSuccess(true)
        
        // Réinitialiser le formulaire après envoi réussi
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
        
        // Réinitialiser le message de succès après quelques secondes
        setTimeout(() => {
          setSubmitSuccess(false)
        }, 5000)
      })
      .catch((err) => {
        console.error('FAILED...', err)
        setIsSubmitting(false)
        setSubmitError("Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.")
      })
    }
  }

  // Initialiser EmailJS
  useEffect(() => {
    emailjs.init(emailjsPublicKey)
  }, [emailjsPublicKey])

  return (
    <section className={styles.contact} ref={ref} id="contact" data-scroll-section>
      <div className={styles.sectionContent}>
        <h2 className={`${styles.sectionTitle} hidden`}>Contact</h2>
        
        <div className={styles.contactContainer}>
          <div className={`${styles.contactInfo} hidden`}>
            <h3>Parlons de votre projet</h3>
            <p className={styles.contactText}>
              Vous avez un projet stimulant ou une idée novatrice ? Je suis toujours 
              à la recherche de nouvelles collaborations qui me permettent de repousser 
              mes limites créatives. N'hésitez pas à me contacter pour discuter de 
              la façon dont nous pourrions transformer votre vision en réalité numérique.
            </p>
            
            <div className={styles.contactDetails}>
              <div className={`${styles.contactItem} hidden`}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className={styles.contactValue}>48 avenue foch, Bois le roi</div>
              </div>
              
              <div className={`${styles.contactItem} hidden`}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-envelope"></i>
                </div>
                <div className={styles.contactValue}>samuel.alhadef@gmail.com</div>
              </div>
              
              <div className={`${styles.contactItem} hidden`}>
                <div className={styles.contactIcon}>
                  <i className="fas fa-phone"></i>
                </div>
                <div className={styles.contactValue}>06 52 21 34 87</div>
              </div>
            </div>
          </div>
          
          <div className={`${styles.contactForm} hidden`}>
            {submitSuccess ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>Message envoyé !</h3>
                <p>Merci pour votre message. Je vous répondrai dès que possible.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>Nom</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`${styles.formInput} ${formErrors.name ? styles.inputError : ''}`} 
                  />
                  {formErrors.name && <div className={styles.errorMessage}>{formErrors.name}</div>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${styles.formInput} ${formErrors.email ? styles.inputError : ''}`} 
                  />
                  {formErrors.email && <div className={styles.errorMessage}>{formErrors.email}</div>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.formLabel}>Sujet</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${styles.formInput} ${formErrors.subject ? styles.inputError : ''}`} 
                  />
                  {formErrors.subject && <div className={styles.errorMessage}>{formErrors.subject}</div>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${styles.formInput} ${styles.textArea} ${formErrors.message ? styles.inputError : ''}`}
                  ></textarea>
                  {formErrors.message && <div className={styles.errorMessage}>{formErrors.message}</div>}
                </div>
                
                {submitError && (
                  <div className={styles.errorAlert}>
                    <i className="fas fa-exclamation-circle"></i> {submitError}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles.spinner}></span>
                      Envoi en cours...
                    </>
                  ) : 'Envoyer le message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}