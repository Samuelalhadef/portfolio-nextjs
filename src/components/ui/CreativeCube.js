'use client'

import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import styles from '@/styles/components/CreativeCube.module.css'

export default function CreativeCube() {
  const containerRef = useRef(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    if (!containerRef.current) return
    
    let scene, camera, renderer, cube
    let targetRotationX = 0
    let targetRotationY = 0
    let currentRotationX = 0
    let currentRotationY = 0
    
    const init = () => {
      // Créer la scène
      scene = new THREE.Scene()
      
      // Créer la caméra
      const aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera = new THREE.PerspectiveCamera(65, aspect, 0.1, 1000)
      camera.position.z = 6.5
      
      // Créer le rendu
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      containerRef.current.appendChild(renderer.domElement)
      
      // Créer les textures et le cube
      const textures = createTextures()
      cube = createCube(textures)
      scene.add(cube)
      
      // Ajouter lumières et particules
      addLights()
      addParticles()
      
      // Contrôles d'interaction
      addControls()
      
      // Animation
      animate()
      
      // Gestion du redimensionnement
      window.addEventListener('resize', onWindowResize)
    }
    
    // Fonctions de création des textures
    const createTextures = () => {
      // Implémenter selon le code original
      // ...
      
      // Simulation temporaire
      const textures = []
      const faces = [
        { title: 'WEB', color: 'rgba(75, 227, 172, 0.9)' },
        { title: 'FRAMEWORKS', color: 'rgba(11, 61, 145, 0.9)' },
        { title: '3D & ANIMATION', color: 'rgba(252, 61, 33, 0.9)' },
        { title: 'DESIGN', color: 'rgba(88, 24, 69, 0.9)' },
        { title: 'MEDIA', color: 'rgba(144, 190, 109, 0.9)' },
        { title: 'LANGUAGES', color: 'rgba(249, 187, 0, 0.9)' }
      ]
      
      faces.forEach(face => {
        const canvas = document.createElement('canvas')
        canvas.width = 512
        canvas.height = 512
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = face.color
        ctx.fillRect(0, 0, 512, 512)
        ctx.font = 'bold 60px Orbitron, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillStyle = 'white'
        ctx.fillText(face.title, 256, 100)
        
        const texture = new THREE.CanvasTexture(canvas)
        textures.push(texture)
      })
      
      return textures
    }
    
    // Fonctions de création du cube, lumieres, particules, etc.
    // Implémenter selon le code original
    
    const createCube = (textures) => {
      // Simulation temporaire
      const materials = textures.map(texture => {
        return new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          metalness: 0.3,
          roughness: 0.5
        })
      })
      
      const cubeSize = 4
      const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
      const cubeMesh = new THREE.Mesh(geometry, materials)
      
      return cubeMesh
    }
    
    const addLights = () => {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
      scene.add(ambientLight)
      
      const mainLight = new THREE.DirectionalLight(0xffffff, 1)
      mainLight.position.set(5, 5, 5)
      scene.add(mainLight)
    }
    
    const addParticles = () => {
      // Simulation temporaire
    }
    
    const addControls = () => {
      // Implémenter selon le code original
    }
    
    const onWindowResize = () => {
      if (!containerRef.current) return
      
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      
      renderer.setSize(width, height)
    }
    
    const animate = () => {
      if (!cube) return
      
      requestAnimationFrame(animate)
      
      if (autoRotate && !isUserInteracting) {
        cube.rotation.y += 0.006
        cube.rotation.x += 0.0035
      } else {
        currentRotationY += (targetRotationY - currentRotationY) * 0.1
        currentRotationX += (targetRotationX - currentRotationX) * 0.1
        
        cube.rotation.y = currentRotationY
        cube.rotation.x = currentRotationX
      }
      
      // Effet de flottaison
      cube.position.y = Math.sin(Date.now() * 0.001) * 0.25
      cube.position.x = Math.sin(Date.now() * 0.0008) * 0.15
      
      renderer.render(scene, camera)
    }
    
    // Initialiser
    init()
    
    // Nettoyage lors du démontage du composant
    return () => {
      if (renderer && renderer.domElement && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      
      window.removeEventListener('resize', onWindowResize)
      
      // Libérer la mémoire
      if (cube) {
        cube.geometry.dispose()
        cube.material.forEach(material => material.dispose())
      }
    }
  }, [autoRotate, isUserInteracting])

  // Gérer le clic pour activer/désactiver la rotation
  const handleClick = () => {
    if (!isUserInteracting) {
      setAutoRotate(prev => !prev)
      
      // Afficher le message de feedback
      setFeedback(autoRotate ? 'Auto Rotation OFF' : 'Auto Rotation ON')
      setTimeout(() => setFeedback(null), 1500)
    }
  }

  return (
    <div 
      ref={containerRef} 
      className={styles.cubeContainer}
      onClick={handleClick}
    >
      {feedback && (
        <div className={styles.feedback}>{feedback}</div>
      )}
    </div>
  )
}