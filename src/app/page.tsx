'use client'

import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { Droplets, Recycle, Factory, Leaf, ChevronDown, Menu, X } from "lucide-react"
import * as THREE from 'three'

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: true, // Set to true by default so it's visible immediately
    types: false,
    manufacturing: false,
    recycling: false
  });
  
  // State for dropdown menu
  const [typesDropdownOpen, setTypesDropdownOpen] = useState(false);
  
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Ref for the molecule container with proper typing
  const moleculeContainerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check visibility for each section
      setIsVisible({
        hero: true, // Always visible
        types: window.scrollY > 300,
        manufacturing: window.scrollY > 700,
        recycling: window.scrollY > 1100
      });
    };

    window.addEventListener("scroll", handleScroll);
    
    // Initialize visibility for first section - no longer needed since hero is always visible
    // setTimeout(() => {
    //   setIsVisible(prev => ({...prev, hero: true}));
    // }, 300);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Initialize the 3D molecule
  useEffect(() => {
    if (!moleculeContainerRef.current) return;
    
    // Create scene with dark space-like background
    const scene = new THREE.Scene();
    
    // Create camera with better perspective for complex molecule
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 10; // Increased camera distance to show more of the molecule
    
    // Create renderer with higher quality settings and larger size
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      precision: 'highp',
    });
    // Increased size for better visibility
    renderer.setSize(600, 600);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Clear the container before appending
    if (moleculeContainerRef.current) {
      while (moleculeContainerRef.current.firstChild) {
        moleculeContainerRef.current.removeChild(moleculeContainerRef.current.firstChild);
      }
      
      moleculeContainerRef.current.appendChild(renderer.domElement);
    }
    
    // Create a sophisticated molecule representing a caffeine-like structure
    const molecule = new THREE.Group();
    
    // Define materials for different atoms
    const carbonMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x808080, // Gray for carbon
      shininess: 90,
      specular: 0x222222
    });
    
    const hydrogenMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff, // White for hydrogen
      shininess: 80,
      specular: 0x222222
    });
    
    const oxygenMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xff0000, // Red for oxygen
      shininess: 100,
      specular: 0x222222
    });
    
    const nitrogenMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x0000ff, // Blue for nitrogen
      shininess: 90,
      specular: 0x222222
    });
    
    // Define geometries
    const carbonGeometry = new THREE.SphereGeometry(0.45, 32, 32);
    const hydrogenGeometry = new THREE.SphereGeometry(0.25, 24, 24);
    const oxygenGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const nitrogenGeometry = new THREE.SphereGeometry(0.48, 32, 32);
    const bondGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1, 16);
    
    // Create a more complex molecule structure (similar to caffeine)
    // Positions for a caffeine-like structure
    const atomPositions = [
      { type: 'C', position: [0, 0, 0] as [number, number, number] },
      { type: 'N', position: [1.2, 0.4, 0] as [number, number, number] },
      { type: 'C', position: [2.0, -0.6, 0.2] as [number, number, number] },
      { type: 'N', position: [1.4, -1.8, 0.1] as [number, number, number] },
      { type: 'C', position: [0.1, -1.7, -0.1] as [number, number, number] },
      { type: 'N', position: [-0.8, -2.7, -0.2] as [number, number, number] },
      { type: 'C', position: [-2.0, -2.1, -0.3] as [number, number, number] },
      { type: 'N', position: [-1.9, -0.7, -0.3] as [number, number, number] },
      { type: 'C', position: [-0.6, -0.4, -0.2] as [number, number, number] },
      { type: 'O', position: [3.2, -0.5, 0.4] as [number, number, number] },
      { type: 'C', position: [1.6, 1.8, 0.1] as [number, number, number] },
      { type: 'O', position: [-0.4, -4.0, -0.2] as [number, number, number] },
      { type: 'C', position: [-2.2, 0.3, 0.6] as [number, number, number] },
      { type: 'C', position: [-3.2, -2.8, -0.5] as [number, number, number] },
      { type: 'H', position: [1.1, 2.3, 0.9] as [number, number, number] },
      { type: 'H', position: [1.4, 2.2, -0.9] as [number, number, number] },
      { type: 'H', position: [2.7, 1.9, 0.2] as [number, number, number] },
      { type: 'H', position: [-1.5, 1.1, 0.6] as [number, number, number] },
      { type: 'H', position: [-3.2, 0.7, 0.4] as [number, number, number] },
      { type: 'H', position: [-2.2, -0.1, 1.6] as [number, number, number] },
      { type: 'H', position: [-3.3, -3.6, 0.2] as [number, number, number] },
      { type: 'H', position: [-3.2, -3.3, -1.5] as [number, number, number] },
      { type: 'H', position: [-4.1, -2.2, -0.4] as [number, number, number] }
    ];
    
    // Define the atom structure type
    interface Atom {
      position: THREE.Vector3;
      type: string;
      mesh: THREE.Mesh;
    }
    
    // Create atoms
    const atoms: Atom[] = [];
    atomPositions.forEach(atom => {
      let geometry, material;
      
      switch(atom.type) {
        case 'C':
          geometry = carbonGeometry;
          material = carbonMaterial;
          break;
        case 'H':
          geometry = hydrogenGeometry;
          material = hydrogenMaterial;
          break;
        case 'O':
          geometry = oxygenGeometry;
          material = oxygenMaterial;
          break;
        case 'N':
          geometry = nitrogenGeometry;
          material = nitrogenMaterial;
          break;
        default:
          geometry = carbonGeometry;
          material = carbonMaterial;
      }
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(atom.position[0], atom.position[1], atom.position[2]);
      molecule.add(mesh);
      atoms.push({
        position: new THREE.Vector3(atom.position[0], atom.position[1], atom.position[2]),
        type: atom.type,
        mesh
      });
    });
    
    // Create bonds between atoms
    const bondPairs = [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], 
      [6, 7], [7, 8], [8, 0], [4, 8], [2, 9], [1, 10], 
      [5, 11], [7, 12], [6, 13], [10, 14], [10, 15], 
      [10, 16], [12, 17], [12, 18], [12, 19], [13, 20], 
      [13, 21], [13, 22]
    ];
    
    bondPairs.forEach(pair => {
      const [i, j] = pair;
      const atom1 = atoms[i];
      const atom2 = atoms[j];
      
      // Calculate direction and midpoint
      const direction = new THREE.Vector3().subVectors(atom2.position, atom1.position);
      const midpoint = new THREE.Vector3().addVectors(atom1.position, atom2.position).multiplyScalar(0.5);
      
      // Create bond
      const distance = direction.length();
      const bond = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, distance, 16),
        new THREE.MeshPhongMaterial({ 
          color: 0xcccccc,
          shininess: 80,
          transparent: true,
          opacity: 0.8
        })
      );
      
      // Position and rotate bond
      bond.position.copy(midpoint);
      
      // Orient the bond to connect the two atoms
      const quaternion = new THREE.Quaternion();
      quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0), 
        direction.clone().normalize()
      );
      bond.setRotationFromQuaternion(quaternion);
      
      molecule.add(bond);
    });
    
    // Double bonds (for visual effect)
    const doubleBondPairs = [
      [0, 8], [2, 9], [5, 11]
    ];
    
    doubleBondPairs.forEach(pair => {
      const [i, j] = pair;
      const atom1 = atoms[i];
      const atom2 = atoms[j];
      
      // Calculate direction and midpoint
      const direction = new THREE.Vector3().subVectors(atom2.position, atom1.position);
      const midpoint = new THREE.Vector3().addVectors(atom1.position, atom2.position).multiplyScalar(0.5);
      
      // Create bond
      const distance = direction.length();
      const bond = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, distance, 16),
        new THREE.MeshPhongMaterial({ 
          color: 0xcccccc,
          shininess: 80,
          transparent: true,
          opacity: 0.8
        })
      );
      
      // Position and rotate bond
      bond.position.copy(midpoint);
      
      // Orient the bond to connect the two atoms
      const quaternion = new THREE.Quaternion();
      quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0), 
        direction.clone().normalize()
      );
      bond.setRotationFromQuaternion(quaternion);
      
      molecule.add(bond);
    });
    
    // Center the molecule
    molecule.position.set(0, 0, 0);
    
    // Scale the molecule to be more prominent
    molecule.scale.set(1.2, 1.2, 1.2);
    
    scene.add(molecule);
    
    // Add ambient lighting for base illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    // Add multiple directional lights for better 3D effect
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.set(1, 1, 2);
    scene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);
    
    // Add a subtle red light for accent
    const redLight = new THREE.PointLight(0xff0000, 0.5, 10);
    redLight.position.set(2, 0, 3);
    scene.add(redLight);
    
    // Add a subtle blue light for contrast
    const blueLight = new THREE.PointLight(0x0044ff, 0.5, 10);
    blueLight.position.set(-2, 0, 3);
    scene.add(blueLight);
    
    // Animation loop with proper request animation frame handling
    let animationFrameId: number;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Rotate molecule more slowly for a majestic effect
      molecule.rotation.x += 0.002;
      molecule.rotation.y += 0.003;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (moleculeContainerRef.current) {
        while (moleculeContainerRef.current.firstChild) {
          moleculeContainerRef.current.removeChild(moleculeContainerRef.current.firstChild);
        }
      }
      
      // Cancel animation frame to prevent memory leaks
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Header with navigation - now with glassmorphism effect */}
      <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white bg-opacity-80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center py-4"> {/* Changed justify-between to justify-center */}      
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              <Link href="/" className="px-4 py-2 hover:text-red-600 transition-colors font-medium rounded-md hover:bg-red-50">
                HOME
              </Link>
              
              {/* Types of Plastics dropdown */}
              <div className="relative" onMouseEnter={() => setTypesDropdownOpen(true)} onMouseLeave={() => setTypesDropdownOpen(false)}>
                <Link href="/types" className="px-4 py-2 hover:text-red-600 transition-colors font-medium rounded-md hover:bg-red-50 flex items-center">
                  TYPES OF PLASTICS
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Link>
                
                {/* Dropdown menu with modern styling */}
                {typesDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-xl bg-white border border-red-100 overflow-hidden z-50 transition-all duration-300 ease-out transform origin-top-left">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <Link href="/types/plastic-1" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                        Plastic #1 - PET
                      </Link>
                      <Link href="/types/plastic-2" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                        Plastic #2 - HDPE
                      </Link>
                      <Link href="/types/plastic-3" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                        Plastic #3 - PVC
                      </Link>
                      <Link href="/types/plastic-4" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                        Plastic #4 - LDPE
                      </Link>
                      <Link href="/types/plastic-5" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                        Plastic #5 - PP
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Other main navigation links */}
              <Link href="/formation" className="px-4 py-2 hover:text-red-600 transition-colors font-medium rounded-md hover:bg-red-50">
                PLASTIC FORMATION
              </Link>
              <Link href="/environmental" className="px-4 py-2 hover:text-red-600 transition-colors font-medium rounded-md hover:bg-red-50">
                ENVIRONMENTAL EFFECTS
              </Link>
              <Link href="/solutions" className="px-4 py-2 hover:text-red-600 transition-colors font-medium rounded-md hover:bg-red-50">
                SOLUTIONS
              </Link>
              <Link href="/citations" className="px-4 py-2 hover:text-red-600 transition-colors font-medium rounded-md hover:bg-red-50">
                CITATIONS
              </Link>
            </div>
            
            {/* Mobile menu button - positioned absolutely to keep centered nav */}
            <button 
              className="md:hidden absolute right-4 text-gray-800 hover:text-red-600 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
        
        {/* Mobile Navigation Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white bg-opacity-95 backdrop-blur-md shadow-lg border-t border-red-100 py-4 z-50 animate-fade-in">
            <div className="container mx-auto px-4 flex flex-col space-y-2">
              <Link 
                href="/" 
                className="px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                HOME
              </Link>
              <Link 
                href="/types" 
                className="px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                TYPES OF PLASTICS
              </Link>
              <Link 
                href="/formation" 
                className="px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                PLASTIC FORMATION
              </Link>
              <Link 
                href="/environmental" 
                className="px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                ENVIRONMENTAL EFFECTS
              </Link>
              <Link 
                href="/solutions" 
                className="px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                SOLUTIONS
              </Link>
              <Link 
                href="/citations" 
                className="px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                CITATIONS
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 relative">  {/* Removed pt-16 padding-top */}
        {/* Background with enhanced design */}
        <div className="fixed inset-0 z-0">
          {/* Grid pattern with particle effect */}
          <div className="absolute inset-0 bg-grid-pattern opacity-15"></div>
          
          {/* Earth image with enhanced styling */}
          <div className="absolute top-0 right-0 w-full md:w-2/3 h-full">
            <div className="w-full h-full relative overflow-hidden">
              <div className="absolute right-0 top-0 w-full h-full">
                <img 
                  src="/api/placeholder/1200/1200" 
                  alt="Earth view" 
                  className="rounded-full opacity-40 animation-rotate"
                  style={{
                    position: 'absolute',
                    top: '-25%',
                    right: '-25%',
                    width: '150%',
                    height: '150%',
                    objectFit: 'cover',
                    filter: 'saturate(1.2) brightness(1.05)'
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent"></div>
          
          {/* Subtle animated patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 right-0 h-full bg-pattern-overlay"></div>
          </div>
        </div>

        {/* Title section with 3D molecule - Modified to be 100vh for full viewport height */}
        <section className="relative z-10 min-h-screen h-screen flex items-center">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6"> {/* Added gap-6 and changed justify-between to justify-center */}
              {/* Text Content */}
              <div className="max-w-2xl transition-all duration-1000 transform mb-10 md:mb-0"
                   style={{opacity: isVisible.hero ? 1 : 0, transform: isVisible.hero ? 'translateY(0)' : 'translateY(50px)'}}>
                <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gray-900">
                  <span className="block">Plastics</span>
                  <span className="block text-red-600 relative">
                    Revolution
                    <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-red-600 rounded-full"></span>
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                  Exploring the materials that transformed modern life, their impact on our world, and sustainable futures.
                </p>
                
                {/* Call to action button */}
                <div className="flex space-x-4">
                  <Link href="/types" className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-medium rounded-full transition-all duration-300 hover:bg-red-700 hover:shadow-lg transform hover:-translate-y-1">
                    Explore Plastics
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                  <Link href="/environmental" className="inline-flex items-center px-6 py-3 bg-white text-red-600 font-medium rounded-full transition-all duration-300 border border-red-600 hover:bg-red-50 hover:shadow-lg transform hover:-translate-y-1">
                    Learn Impact
                  </Link>
                </div>
              </div>
              
              {/* 3D Molecule Container - Increased size and positioned closer to text */}
              <div className="w-80 h-80 md:w-144 md:h-144 relative transition-all duration-1000 transform" 
                  style={{opacity: isVisible.hero ? 1 : 0, transform: isVisible.hero ? 'translateY(0)' : 'translateY(50px)'}}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div ref={moleculeContainerRef} className="w-full h-full transform scale-110"></div> {/* Added scale-110 to make molecule appear larger */}
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced animated plastic particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-400 rounded-full animate-float opacity-70" style={{animationDuration: '15s'}}></div>
            <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-red-300 rounded-full animate-float opacity-60" style={{animationDuration: '18s', animationDelay: '2s'}}></div>
            <div className="absolute top-2/3 left-1/3 w-5 h-5 bg-red-500 rounded-full animate-float opacity-50" style={{animationDuration: '20s', animationDelay: '5s'}}></div>
            <div className="absolute top-1/2 left-3/4 w-6 h-6 bg-red-200 rounded-full animate-float opacity-40" style={{animationDuration: '25s', animationDelay: '1s'}}></div>
            <div className="absolute top-3/4 left-1/5 w-4 h-4 bg-red-300 rounded-full animate-float opacity-50" style={{animationDuration: '22s', animationDelay: '3s'}}></div>
            <div className="absolute top-1/6 left-2/5 w-5 h-5 bg-red-400 rounded-full animate-float opacity-60" style={{animationDuration: '19s', animationDelay: '4s'}}></div>
          </div>
        </section>

        {/* Discovery section with improved cards */}
        <section className="relative z-10 py-20 bg-gray-50 bg-opacity-70 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-red-600 inline-block relative">
                Discover the World of Plastics
                <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-red-600 rounded-full transform"></span>
              </h2>
              <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
                From everyday items to advanced technologies, plastics shape our modern world. Explore their types, creation processes, and sustainable futures.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 - Redesigned with hover effects */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg group transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 border border-gray-100">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src="/api/placeholder/600/400"
                    alt="Types of plastics" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900 to-transparent opacity-40"></div>
                  <div className="absolute top-4 left-4 bg-red-600 text-white rounded-full p-3">
                    <Recycle className="h-6 w-6" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-red-600 transition-colors">Plastic Types</h3>
                  <p className="text-gray-600 mb-4">
                    Discover the different types of plastics, their properties, applications, and environmental impacts.
                  </p>
                  <Link href="/types" className="inline-flex items-center text-red-600 font-medium hover:text-red-700 group-hover:translate-x-1 transition-all">
                    Learn more
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg group transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 border border-gray-100">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src="/api/placeholder/600/400"
                    alt="Plastic manufacturing" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900 to-transparent opacity-40"></div>
                  <div className="absolute top-4 left-4 bg-red-600 text-white rounded-full p-3">
                    <Factory className="h-6 w-6" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-red-600 transition-colors">Manufacturing Process</h3>
                  <p className="text-gray-600 mb-4">
                    Explore how plastics are created from raw materials to finished products through various techniques.
                  </p>
                  <Link href="/formation" className="inline-flex items-center text-red-600 font-medium hover:text-red-700 group-hover:translate-x-1 transition-all">
                    Learn more
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg group transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 border border-gray-100">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src="/api/placeholder/600/400"
                    alt="Environmental solutions" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900 to-transparent opacity-40"></div>
                  <div className="absolute top-4 left-4 bg-red-600 text-white rounded-full p-3">
                    <Leaf className="h-6 w-6" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-red-600 transition-colors">Sustainable Solutions</h3>
                  <p className="text-gray-600 mb-4">
                    Discover innovative approaches to plastic waste management and sustainable alternatives.
                  </p>
                  <Link href="/solutions" className="inline-flex items-center text-red-600 font-medium hover:text-red-700 group-hover:translate-x-1 transition-all">
                    Learn more
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Added statistics section with animated counters */}
        <section className="relative z-10 py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Plastic By The Numbers</h2>
              <p className="text-xl text-gray-600 mt-2">Global statistics reveal the scale of plastic production and consumption</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-red-50 rounded-xl p-6 text-center transform transition-all hover:scale-105">
                <div className="text-4xl font-bold text-red-600 mb-2">380M+</div>
                <div className="text-gray-600">Tons of plastic produced annually worldwide</div>
              </div>
              
              <div className="bg-red-50 rounded-xl p-6 text-center transform transition-all hover:scale-105">
                <div className="text-4xl font-bold text-red-600 mb-2">9%</div>
                <div className="text-gray-600">Of all plastic waste ever produced has been recycled</div>
              </div>
              
              <div className="bg-red-50 rounded-xl p-6 text-center transform transition-all hover:scale-105">
                <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
                <div className="text-gray-600">Years for plastic to degrade in the environment</div>
              </div>
              
              <div className="bg-red-50 rounded-xl p-6 text-center transform transition-all hover:scale-105">
                <div className="text-4xl font-bold text-red-600 mb-2">8M+</div>
                <div className="text-gray-600">Tons of plastic enter our oceans every year</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with improved design */}
      
      {/* Footer */}
      <footer className="relative z-10 bg-red-50 border-t border-red-100 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-700 mb-2">Designed and Developed by Ankit Kale, Sreeram Vuppala, and Abhiram Kuuram</p>
          <p> South Brunswick High School Team A, 2025 </p>
        </div>
      </footer>

      {/* Enhanced Custom CSS */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(220, 38, 38, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(220, 38, 38, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .bg-pattern-overlay {
          background-image: radial-gradient(circle at 25% 25%, rgba(220, 38, 38, 0.1) 1%, transparent 7%),
                            radial-gradient(circle at 75% 75%, rgba(220, 38, 38, 0.1) 1%, transparent 7%);
          background-size: 100px 100px;
        }
        
        .animation-rotate {
          animation: rotate 120s linear infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(220, 38, 38, 0.6);
          border-radius: 6px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(220, 38, 38, 0.8);
        }
      `}</style>
    </div>
  )
}