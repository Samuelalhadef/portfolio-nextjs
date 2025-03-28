/**
 * Animation utility functions using GSAP
 */
import { gsap } from 'gsap';

// Fade in animation for elements
export const fadeIn = (element, delay = 0, duration = 0.8) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 50, filter: 'blur(5px)' },
    { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)', 
      duration, 
      delay,
      ease: 'power2.out'
    }
  );
};

// Staggered animation for multiple elements
export const staggerElements = (elements, staggerTime = 0.1, delay = 0, duration = 0.8) => {
  return gsap.to(elements, {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration,
    stagger: staggerTime,
    delay,
    ease: 'power2.out'
  });
};

// Reveal section animation
export const revealSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (!section) return;
  
  const timeline = gsap.timeline();
  
  // Animate section title
  const title = section.querySelector('h2');
  if (title) {
    timeline.to(title, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8
    });
  }
  
  // Animate hidden elements within the section
  const hiddenElements = section.querySelectorAll('.hidden');
  timeline.to(hiddenElements, {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 0.8,
    stagger: 0.15,
    delay: 0.2
  });
  
  return timeline;
};

// Animated typing effect
export const typeText = (element, text, speed = 50) => {
  let i = 0;
  element.textContent = '';
  
  const typing = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, speed);
  
  return typing;
};

// 3D hover effect
export const add3DHoverEffect = (element) => {
  if (!element) return;
  
  const onMouseMove = (e) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    gsap.to(element, {
      rotationY: x * 20,
      rotationX: -y * 20,
      ease: 'power3.out',
      transformPerspective: 900,
      transformOrigin: 'center'
    });
  };
  
  const onMouseLeave = () => {
    gsap.to(element, {
      rotationY: 0,
      rotationX: 0,
      ease: 'power3.out'
    });
  };
  
  element.addEventListener('mousemove', onMouseMove);
  element.addEventListener('mouseleave', onMouseLeave);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('mousemove', onMouseMove);
    element.removeEventListener('mouseleave', onMouseLeave);
  };
};