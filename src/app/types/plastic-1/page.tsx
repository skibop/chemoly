'use client'

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ChevronDown, ArrowRight, Recycle, Info, Leaf, Droplet, Factory } from "lucide-react"

export default function Plastic1() {
  const [scrollY, setScrollY] = useState(0);
  const [typesDropdownOpen, setTypesDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
   // Mobile menu state
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePlastic, setActivePlastic] = useState(1);
  const [isVisible, setIsVisible] = useState({
    hero: true, // Set to true by default so it's visible immediately
    plastics: false
  });

  // State for active image index in the carousel
  const [activeIndex, setActiveIndex] = useState(0);

  // Define the images array with URLs of the images
  const images = [
    "/images/image1.png",
    "/images/image2.png",
    "/images/image3.png"
  ];
  const handleMouseEnterDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current); // Cancel any pending close timeout
    }
    setTypesDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setTypesDropdownOpen(false);
    }, 100); // Delay closing by 100ms
  };


  // Animation for plastic items appearing
  const [visiblePlastics, setVisiblePlastics] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check visibility for each section
      setIsVisible({
        hero: true, // Always visible
        plastics: window.scrollY > 300
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Staggered animation for plastic items
    const animatePlastics = () => {
      for (let i = 1; i <= 8; i++) {
        setTimeout(() => {
          setVisiblePlastics(prev => [...prev, i]);
        }, 200 * i);
      }
    };
    
    // Start the animation sooner
    setTimeout(animatePlastics, 300);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 overflow-x-hidden">
        {/* Header with navigation - now sticky with transparency on scroll */}
        <header className="w-full fixed top-0 z-50 bg-white bg-opacity-90 backdrop-blur-md shadow-lg transition-all duration-300">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-center py-4"> {/* Changed justify-between to justify-center */}      
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-1">
                <Link href="/" className="px-4 py-2 hover:text-red-600 transition-colors font-medium rounded-md hover:bg-red-50">
                  HOME
                </Link>
                
                {/* Types of Plastics dropdown */}
                <div className="relative" onMouseEnter={handleMouseEnterDropdown} onMouseLeave={handleMouseLeaveDropdown}>
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
        <div className="flex flex-col min-h-screen bg-white text-gray-900 overflow-x-hidden">
            {/* Header */}
            <header className="w-full bg-red-600 text-white pt-32 pb-16 shadow-md">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-6xl font-bold">PET</h1>
                     <p className="text-xl mt-4">Polyethylene Terephthalate</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto px-16 py-16 space-y-12">
                {/* Chemical Structure and Formation Reaction */}
                <section className="flex flex-col items-center justify-start bg-red-600 w-full pt-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-102">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-semibold text-white mb-4">
                            <u style={{ textDecorationThickness: '2px' }}>Chemical Structure and Formation Reaction</u>
                        </h2>
                        <div className="text-lg leading-relaxed text-center px-8 pb-8 bg-gray-100 text-white bg-red-600">
                            <p>
                                Polyethylene Terephthalate (PET) is a polymer formed by the condensation reaction of ethylene glycol and terephthalic acid. 
                                Its chemical structure consists of repeating units of ester groups, making it lightweight, strong, and transparent.
                            </p>
                        </div>
                    </div>
                    <div className="flex-grow w-full rounded-b-lg bg-white pt-10">
                        {/* Image Carousel */}
                        <div className="relative w-full max-w-4xl mx-auto  bg-gray-200">
                            {/* Carousel Images */}
                            <div className="overflow-hidden rounded-lg">
                                <div
                                    className="flex transition-transform duration-500"
                                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                                >
                                    {images.map((src, index) => (
                                        <div
                                            key={index}
                                            className="w-full flex-shrink-0 flex items-center justify-center bg-gray-100 transition-transform duration-300 hover:scale-105"
                                            style={{ height: "400px" }} // Set the frame height
                                        >
                                            <img
                                                src={src}
                                                alt={`Image ${index + 1}`}
                                                className="max-w-full max-h-full object-contain"
                                                style={{ width: "auto", height: "auto", maxWidth: "90%", maxHeight: "90%" }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>



                            {/* Navigation Arrows */}
                            <button
                                className={`absolute top-1/2 left-4 transform -translate-y-1/2 p-2 rounded-full shadow-md transition-transform duration-200 ${
                                    activeIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:scale-110 shadow-md active:scale-95"
                                }`}
                                style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                onClick={() => {
                                    if (activeIndex > 0) {
                                        setActiveIndex((prev) => prev - 1);
                                    }
                                }}
                                disabled={activeIndex === 0}
                            >
                                &lt;
                            </button>
                            <button
                                className={`absolute top-1/2 right-4 transform -translate-y-1/2 p-2 rounded-full shadow-md transition-transform duration-200 ${
                                    activeIndex === images.length - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-white hover:scale-110 shadow-md active:scale-95"
                                }`}
                                style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                onClick={() => {
                                    if (activeIndex < images.length - 1) {
                                        setActiveIndex((prev) => prev + 1);
                                    }
                                }}
                                disabled={activeIndex === images.length - 1}
                            >
                                &gt;
                            </button>
                        </div>
                            {/* Navigation Dots */}
                            <div className="flex justify-center m-2 space-x-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-3 h-3 rounded-full ${
                                            activeIndex === index ? "bg-red-600" : "bg-gray-300"
                                        }`}
                                        onClick={() => setActiveIndex(index)}
                                    ></button>
                                ))}
                            </div>
                    </div>
                </section>
              {/* Potential Concerns */}
              <section className="flex flex-col items-center justify-start  bg-red-600 w-full pt-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-102">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-semibold text-white mb-4">
                <u style={{ textDecorationThickness: '2px' }}>Potential Concerns</u>
              </h2>
              <div className="text-lg leading-relaxed text-center px-8 pb-8 text-white bg-red-600">
                <p>
                  PET is generally considered safe for single use but has key environmental and health concerns.
                </p>
              </div>
            </div>
            <div className="flex-grow w-full rounded-b-lg bg-white p-8 flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Health Concerns Card */}
              <div className="bg-red-50 rounded-xl shadow-md p-6 w-full md:w-1/2 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 ml-4">Health Impact</h3>
                </div>
                <p className="text-gray-700">
                  Repeated use may lead to leaching of harmful chemicals such as antimony, a catalyst used in PET production. Single-use is generally considered safe but reuse can increase chemical migration.
                </p>
              </div>
              
              {/* Environmental Concerns Card */}
              <div className="bg-green-50 rounded-xl shadow-md p-6 w-full md:w-1/2 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 ml-4">Environmental Impact</h3>
                </div>
                <p className="text-gray-700">
                  Production is energy-intensive and contributes to greenhouse gas emissions. Despite recyclability, many PET containers end up in landfills or oceans where they persist for hundreds of years.
                </p>
              </div>
            </div>
          </section>
                
            </main>

            {/* Footer */}
            <footer className="w-full bg-gray-100 py-4">
                <div className="container mx-auto px-4 text-center text-sm text-gray-600">
                    © 2025 Chemoly. All rights reserved.
                </div>
            </footer>
        </div>
    </div>
    );