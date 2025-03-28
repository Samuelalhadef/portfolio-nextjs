'use client'

import { useState, useEffect, useRef } from 'react'

export default function useIntersectionObserver({
  root = null,
  rootMargin = '0px',
  threshold = 0,
  triggerOnce = false
}) {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)
  
  useEffect(() => {
    if (!ref.current) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update inView state
        setInView(entry.isIntersecting)
        
        // If triggerOnce is true and the element is visible, 
        // stop observing
        if (triggerOnce && entry.isIntersecting) {
          observer.unobserve(ref.current)
        }
      },
      { root, rootMargin, threshold }
    )
    
    observer.observe(ref.current)
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [root, rootMargin, threshold, triggerOnce])
  
  return { ref, inView }
}