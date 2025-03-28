'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import styles from '@/styles/components/GlobeVisualization.module.css'

export default function GlobeVisualization() {
  const canvasRef = useRef(null)
  const tooltipRef = useRef(null)
  const [autoRotate, setAutoRotate] = useState(true)
  const [countryImages, setCountryImages] = useState({})
  
  // Créer une référence directe pour contrôler la rotation - ceci est clé pour résoudre le problème
  const shouldRotateRef = useRef(true)
  
  // Country code mapping for flag API
  const getCountryCode = (countryName) => {
    const countryMap = {
      "États-Unis": "us", 
      "Canada": "ca",
      "Angleterre": "gb",
      "Royaume-Uni": "gb",
      "Islande": "is",
      "Allemagne": "de",
      "Suisse": "ch",
      "Italie": "it",
      "Autriche": "at",
      "République Tchèque": "cz",
      "Hongrie": "hu",
      "Pologne": "pl",
      "Slovaquie": "sk",
      "Israël": "il",
      "Chine": "cn",
      "Japon": "jp",
      "Australie": "au"
    };
    return countryMap[countryName] || "xx"; 
  };

  const getFlagUrl = (countryName) => {
    const countryCode = getCountryCode(countryName);
    return `https://flagcdn.com/w160/${countryCode}.png`;
  };

  const getCountryImageUrl = async (countryName) => {
    try {
      const pexelsApiKey = "7FuYYKklCJ0H2NInJPYSymzI1AkZjUgwNDTB1mUTOc1JsQzwlVWrTGU5";
      const searchQuery = `${countryName} landscape scenic travel`;
      
      const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=1`, {
        headers: {
          Authorization: pexelsApiKey
        }
      });
      
      const data = await response.json();
      
      if (data.photos && data.photos.length > 0) {
        return data.photos[0].src.large2x;
      } else {
        const fallbackResponse = await fetch(`https://api.pexels.com/v1/search?query=landscape&per_page=1`, {
          headers: {
            Authorization: pexelsApiKey
          }
        });
        
        const fallbackData = await fallbackResponse.json();
        
        if (fallbackData.photos && fallbackData.photos.length > 0) {
          return fallbackData.photos[0].src.large2x;
        }
        
        return `https://via.placeholder.com/1600x900?text=${encodeURIComponent(countryName)}`;
      }
    } catch (error) {
      console.error(`Failed to fetch image for ${countryName}:`, error);
      return `https://via.placeholder.com/1600x900?text=${encodeURIComponent(countryName)}`;
    }
  };

  // Country data for the globe
  const countries = [
    { 
      name: "États-Unis", 
      lat: 38.8951, 
      lng: -77.0364,
      visited: true, 
      year: "2022",
      imgFlag: getFlagUrl("États-Unis"),
      description: "Découverte de New York et San Francisco, avec leurs contrastes saisissants entre urbanisme vertical et nature environnante.",
      continent: "america"
    },
    { 
      name: "Canada", 
      lat: 45.4215, 
      lng: -75.6972,
      visited: true, 
      year: "2022",
      imgFlag: getFlagUrl("Canada"),
      description: "Exploration des vastes paysages canadiens, de Montréal à Toronto, avec leurs cultures francophones et anglophones.",
      continent: "america"
    },
    { 
      name: "Angleterre", 
      lat: 51.5074, 
      lng: -0.1278,
      visited: true, 
      year: "2023",
      imgFlag: getFlagUrl("Angleterre"),
      description: "Voyage dans la capitale britannique pour découvrir son histoire riche et son mélange unique de tradition et modernité.",
      continent: "europe"
    },
    { 
      name: "Islande", 
      lat: 64.1466, 
      lng: -21.9426,
      visited: true, 
      year: "2021",
      imgFlag: getFlagUrl("Islande"),
      description: "Immersion dans les paysages volcaniques et les aurores boréales de cette terre de feu et de glace.",
      continent: "europe"
    },
    { 
      name: "Allemagne", 
      lat: 52.5200, 
      lng: 13.4050,
      visited: true, 
      year: "2019",
      imgFlag: getFlagUrl("Allemagne"),
      description: "Découverte de Berlin et Munich, mêlant histoire complexe et modernité dynamique dans le cœur de l'Europe.",
      continent: "europe"
    },
    { 
      name: "Suisse", 
      lat: 46.9480, 
      lng: 7.4474,
      visited: true, 
      year: "2020",
      imgFlag: getFlagUrl("Suisse"),
      description: "Panoramas alpins à couper le souffle, lacs cristallins et précision horlogère dans ce joyau européen.",
      continent: "europe"
    },
    { 
      name: "Italie", 
      lat: 41.9028, 
      lng: 12.4964,
      visited: true, 
      year: "2021",
      imgFlag: getFlagUrl("Italie"),
      description: "Voyage à travers Rome, Florence et Venise, immergé dans l'art, l'histoire et la gastronomie italienne.",
      continent: "europe"
    },
    { 
      name: "Autriche", 
      lat: 48.2082, 
      lng: 16.3738,
      visited: true, 
      year: "2020",
      imgFlag: getFlagUrl("Autriche"),
      description: "Vienne et Salzbourg, entre valses impériales et paysages alpins, terre de Mozart et de Sissi.",
      continent: "europe"
    },
    { 
      name: "République Tchèque", 
      lat: 50.0755, 
      lng: 14.4378,
      visited: true, 
      year: "2020",
      imgFlag: getFlagUrl("République Tchèque"),
      description: "Prague et ses environs offrent un voyage dans le temps avec leur architecture médiévale préservée.",
      continent: "europe"
    },
    { 
      name: "Hongrie", 
      lat: 47.4979, 
      lng: 19.0402,
      visited: true, 
      year: "2020",
      imgFlag: getFlagUrl("Hongrie"),
      description: "Budapest, la perle du Danube, entre bains thermaux historiques et architecture époustouflante.",
      continent: "europe"
    },
    { 
      name: "Pologne", 
      lat: 52.2297, 
      lng: 21.0122,
      visited: true, 
      year: "2019",
      imgFlag: getFlagUrl("Pologne"),
      description: "Varsovie et Cracovie, entre histoire poignante et renouveau culturel dans ce pays d'Europe de l'Est.",
      continent: "europe"
    },
    { 
      name: "Slovaquie", 
      lat: 48.1486, 
      lng: 17.1077,
      visited: true, 
      year: "2020",
      imgFlag: getFlagUrl("Slovaquie"),
      description: "Bratislava et les Tatras, entre châteaux médiévaux et nature préservée dans ce petit joyau d'Europe centrale.",
      continent: "europe"
    },
    { 
      name: "Israël", 
      lat: 31.7683, 
      lng: 35.2137,
      visited: true, 
      year: "2018",
      imgFlag: getFlagUrl("Israël"),
      description: "Jérusalem et Tel Aviv, entre sites historiques millénaires et vie moderne dans cette terre chargée d'histoire et de spiritualité.",
      continent: "asia"
    },
    { 
      name: "Chine", 
      lat: 39.9042, 
      lng: 116.4074,
      visited: true, 
      year: "2017",
      imgFlag: getFlagUrl("Chine"),
      description: "Pékin et Shanghai, entre Grande Muraille et gratte-ciels futuristes dans ce gigantesque pays aux contrastes saisissants.",
      continent: "asia"
    },
    { 
      name: "Japon", 
      lat: 35.6762, 
      lng: 139.6503,
      visited: false,
      imgFlag: getFlagUrl("Japon"),
      description: "Destination future pour explorer le parfait équilibre entre traditions ancestrales et innovations technologiques.",
      continent: "asia"
    },
    { 
      name: "Australie", 
      lat: -33.8688, 
      lng: 151.2093,
      visited: false,
      imgFlag: getFlagUrl("Australie"),
      description: "Projet d'aventure à l'autre bout du monde pour découvrir des paysages extraordinaires et une faune unique.",
      continent: "oceania"
    }
  ];

  // Pre-fetch all country images on component mount
  useEffect(() => {
    const fetchAllImages = async () => {
      const imagePromises = countries.map(async (country) => {
        const imageUrl = await getCountryImageUrl(country.name);
        return { countryName: country.name, imageUrl };
      });
      
      const results = await Promise.all(imagePromises);
      
      const imageMap = {};
      results.forEach(({ countryName, imageUrl }) => {
        imageMap[countryName] = imageUrl;
      });
      
      setCountryImages(imageMap);
    };
    
    fetchAllImages();
  }, []);

  // Synchroniser l'état React avec notre référence directe
  useEffect(() => {
    shouldRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // THREE.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 300;
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.8;
    controls.minDistance = 150;
    controls.maxDistance = 500;
    controls.enablePan = false;
    
    // Globe configuration
    const globeRadius = 120;
    const rotationSpeed = 0.001;
    
    // Load Earth texture
    const textureLoader = new THREE.TextureLoader();
    
    // Define a backup texture in case the remote one fails
    const backupMaterial = new THREE.MeshBasicMaterial({
      color: 0x1a3052,
      transparent: false,
      opacity: 1.0
    });
    
    // Create the globe
    let earthTexture, globeMaterial;
    try {
      earthTexture = textureLoader.load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/land_ocean_ice_cloud_2048.jpg');
      globeMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
    } catch (error) {
      console.warn("Failed to load Earth texture, using fallback");
      globeMaterial = backupMaterial;
    }
    
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globeMesh);
    
    // Add atmospheric glow
    const atmosphereGeometry = new THREE.SphereGeometry(globeRadius + 2, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x4BE3AC,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
    
    // Function to convert lat/lng to 3D coordinates
    function latLngToVector3(lat, lng, radius) {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      
      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      
      return new THREE.Vector3(x, y, z);
    }
    
    // Create country markers
    const countryPoints = new THREE.Group();
    const countryData = {};
    
    countries.forEach((country, index) => {
      const position = latLngToVector3(country.lat, country.lng, globeRadius + 5);
      
      // Create marker for each country
      const markerGeometry = new THREE.SphereGeometry(2.5, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ 
        color: country.visited ? 0x4BE3AC : 0xFC3D21,
        transparent: true,
        opacity: 0.8
      });
      
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(position.x, position.y, position.z);
      marker.userData = { countryIndex: index };
      countryPoints.add(marker);
      
      // Store country data
      countryData[index] = {
        marker,
        position,
        info: country
      };
    });
    
    scene.add(countryPoints);
    
    // Raycaster for country hover detection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredCountry = null;
    
    // IMPORTANT: Fonction pour arrêter la rotation immédiatement
    const pauseRotation = () => {
      shouldRotateRef.current = false;
      setAutoRotate(false);
    };
    
    // Mouse event handling - MODIFIÉ pour arrêter la rotation immédiatement
    const handleMouseMove = (event) => {
      // Calculate normalized mouse position
      const rect = canvasRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / canvasRef.current.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / canvasRef.current.clientHeight) * 2 + 1;
      
      // Update raycaster
      raycaster.setFromCamera(mouse, camera);
      
      // Check for intersections with country markers
      const intersects = raycaster.intersectObjects(countryPoints.children);
      
      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        const countryIndex = intersectedObject.userData.countryIndex;
        
        // Make sure country data exists
        if (countryData[countryIndex] && countryData[countryIndex].info) {
          const countryInfo = countryData[countryIndex].info;
          
          // Update tooltip
          if (tooltipRef.current) {
            const tooltipNameEl = tooltipRef.current.querySelector(`.${styles.countryName}`);
            const tooltipFlagEl = tooltipRef.current.querySelector(`.${styles.countryFlagImg}`);
            const tooltipImgEl = tooltipRef.current.querySelector(`.${styles.countryTooltipImg}`);
            const tooltipDescEl = tooltipRef.current.querySelector(`.${styles.countryDescription}`);
            const tooltipBadgeEl = tooltipRef.current.querySelector(`.${styles.countryBadge}`);
            
            if (tooltipNameEl) tooltipNameEl.textContent = countryInfo.name;
            if (tooltipFlagEl && countryInfo.imgFlag) tooltipFlagEl.src = countryInfo.imgFlag;
            
            // Use the dynamically fetched image from Pexels
            if (tooltipImgEl) {
              const imageUrl = countryImages[countryInfo.name] || null;
              tooltipImgEl.src = imageUrl;
              // Add loading class if image is still loading
              if (imageUrl) {
                tooltipImgEl.className = `${styles.countryTooltipImg} ${styles.loading}`;
                tooltipImgEl.onload = () => {
                  tooltipImgEl.className = styles.countryTooltipImg;
                };
              }
            }
            
            if (tooltipDescEl) tooltipDescEl.textContent = countryInfo.description;
            
            if (tooltipBadgeEl) {
              if (countryInfo.visited) {
                tooltipBadgeEl.textContent = `Visité en ${countryInfo.year}`;
                tooltipBadgeEl.className = `${styles.countryBadge} ${styles.visited}`;
              } else {
                tooltipBadgeEl.textContent = 'Destination future';
                tooltipBadgeEl.className = `${styles.countryBadge} ${styles.future}`;
              }
            }
            
            // Show and position tooltip
            tooltipRef.current.classList.add(styles.active);
            tooltipRef.current.style.left = `${event.clientX}px`;
            tooltipRef.current.style.top = `${event.clientY - (tooltipRef.current.offsetHeight || 200) - 20}px`;
          }
          
          // MODIFICATION CLÉ: Arrêter immédiatement la rotation lorsqu'un pays est survolé
          pauseRotation();
          
          // Enlarge hovered marker
          if (hoveredCountry !== countryIndex) {
            // Reset previously hovered marker
            if (hoveredCountry !== null && countryData[hoveredCountry]) {
              countryData[hoveredCountry].marker.scale.set(1, 1, 1);
            }
            
            // Scale up the hovered marker
            intersectedObject.scale.set(2, 2, 2);
            hoveredCountry = countryIndex;
          }
        }
      } else {
        // Hide tooltip when not hovering any country
        if (tooltipRef.current) {
          tooltipRef.current.classList.remove(styles.active);
        }
        
        // Reset previously hovered marker
        if (hoveredCountry !== null && countryData[hoveredCountry]) {
          countryData[hoveredCountry].marker.scale.set(1, 1, 1);
          hoveredCountry = null;
        }
      }
    };
    
    // Handle mouse leaving canvas
    const handleMouseLeave = () => {
      if (tooltipRef.current) {
        tooltipRef.current.classList.remove(styles.active);
      }
      
      // Reset hovered marker
      if (hoveredCountry !== null && countryData[hoveredCountry]) {
        countryData[hoveredCountry].marker.scale.set(1, 1, 1);
        hoveredCountry = null;
      }
    };
    
    // Handle click on countries - AJOUTÉ
    const handleClick = (event) => {
      const rect = canvasRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / canvasRef.current.clientWidth) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / canvasRef.current.clientHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(countryPoints.children);
      
      if (intersects.length > 0) {
        // Arrêter immédiatement la rotation lorsqu'on clique sur un pays
        pauseRotation();
      }
    };
    
    // Add event listeners
    canvasRef.current.addEventListener('mousemove', handleMouseMove);
    canvasRef.current.addEventListener('mouseleave', handleMouseLeave);
    canvasRef.current.addEventListener('click', handleClick);
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop - MODIFIÉ pour utiliser notre référence directe
    const animate = () => {
      requestAnimationFrame(animate);
      
      // MODIFICATION CLÉ: Utilise la référence directe shouldRotateRef.current au lieu de l'état autoRotate
      if (shouldRotateRef.current) {
        // Only rotate the globe when autoRotate is true
        globeMesh.rotation.y += rotationSpeed;
        atmosphere.rotation.y += rotationSpeed;
        countryPoints.rotation.y += rotationSpeed;
      }
      
      // Always update controls for interaction
      controls.update();
      renderer.render(scene, camera);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      canvasRef.current?.removeEventListener('mousemove', handleMouseMove);
      canvasRef.current?.removeEventListener('mouseleave', handleMouseLeave);
      canvasRef.current?.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      
      // Dispose Three.js resources
      if (globeMesh) {
        globeMesh.geometry.dispose();
        globeMesh.material.dispose();
      }
      
      if (atmosphere) {
        atmosphere.geometry.dispose();
        atmosphere.material.dispose();
      }
      
      // Dispose country markers
      countryPoints.children.forEach(marker => {
        marker.geometry.dispose();
        marker.material.dispose();
      });
      
      controls.dispose();
      renderer.dispose();
    };
  }, [countryImages]);

  // Toggle function - MODIFIÉ pour utiliser notre référence directe
  const handleRotationToggle = () => {
    const newRotateState = !autoRotate;
    // Mettre à jour immédiatement notre référence
    shouldRotateRef.current = newRotateState;
    // Puis mettre à jour l'état React
    setAutoRotate(newRotateState);
  };

  return (
    <div className={styles.globeContainer}>
      <canvas ref={canvasRef} className={styles.globeCanvas}></canvas>
      
      {/* Globe controls */}
      <div className={styles.globeControls}>
        <button 
          className={styles.globeBtn} 
          onClick={handleRotationToggle}
        >
          <i className={`fas fa-${autoRotate ? 'pause' : 'play'}`}></i>
        </button>
      </div>
      
      {/* Country tooltip */}
      <div ref={tooltipRef} className={styles.countryTooltip}>
        <div className={styles.countryTooltipHeader}>
          <div className={styles.countryFlag}>
            <img src={null} alt="Drapeau" className={styles.countryFlagImg} />
          </div>
          <h3 className={styles.countryName}>Nom du pays</h3>
        </div>
        <div className={styles.countryImage}>
          <img src={null} alt="Image du pays" className={styles.countryTooltipImg} />
        </div>
        <p className={styles.countryDescription}>Description du pays</p>
        <div className={styles.countryBadge}>Visité en 2022</div>
      </div>
    </div>
  );
}