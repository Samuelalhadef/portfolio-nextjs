/**
 * Utility functions for the portfolio website
 */

// Load external scripts dynamically
export const loadScript = (src, id) => {
    return new Promise((resolve, reject) => {
      if (document.getElementById(id)) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = src;
      script.id = id;
      script.async = true;
      
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      
      document.body.appendChild(script);
    });
  };
  
  // Format date to a specific locale
  export const formatDate = (dateString, locale = 'fr-FR') => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Debounce function for performance optimization
  export const debounce = (func, wait = 100) => {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };
  
  // Check if browser supports WebGL for 3D features
  export const hasWebGLSupport = () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  };
  
  // Check if device is mobile
  export const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  };
  
  // Random ID generator for elements
  export const generateId = (prefix = 'id') => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  };