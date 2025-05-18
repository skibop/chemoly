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

  // State for active tab in the tab navigation
  const [activeTab, setActiveTab] = useState('recycling');

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
          <section className="flex flex-col items-center justify-start bg-red-600 w-full pt-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-102">
                <div className="container mx-auto px-4 text-center">
                  <h2 className="text-3xl font-semibold text-white mb-4">
                    <u style={{ textDecorationThickness: '2px' }}>Processing After Use and Environmental Impact</u>
                  </h2>
                  <div className="text-lg leading-relaxed text-center px-8 pb-8 text-white bg-red-600">
                    <p>
                      PET is highly recyclable but faces significant processing challenges and environmental consequences.
                    </p>
                  </div>
                </div>
                <div className="w-full bg-white pt-6 px-4">
                  <div className="max-w-6xl mx-auto flex flex-col items-center">
                    <div className="flex border-b border-gray-200 justify-center">
                      <button 
                        className={`py-3 px-6 font-medium text-sm transition-colors duration-200 relative ${activeTab === 'recycling' ? 'text-red-600' : 'text-gray-500 hover:text-red-500'}`}
                        onClick={() => setActiveTab('recycling')}
                      >
                        <div className="flex items-center">
                          <Recycle className="w-5 h-5 mr-2" />
                          Recycling Process
                        </div>
                        {activeTab === 'recycling' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>}
                      </button>
                      <button 
                        className={`py-3 px-6 font-medium text-sm transition-colors duration-200 relative ${activeTab === 'impact' ? 'text-red-600' : 'text-gray-500 hover:text-red-500'}`}
                        onClick={() => setActiveTab('impact')}
                      >
                        <div className="flex items-center">
                          <Leaf className="w-5 h-5 mr-2" />
                          Environmental Impact
                        </div>
                        {activeTab === 'impact' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>}
                      </button>
                      <button 
                        className={`py-3 px-6 font-medium text-sm transition-colors duration-200 relative ${activeTab === 'innovations' ? 'text-red-600' : 'text-gray-500 hover:text-red-500'}`}
                        onClick={() => setActiveTab('innovations')}
                      >
                        <div className="flex items-center">
                          <Factory className="w-5 h-5 mr-2" />
                          Processing Innovations
                        </div>
                        {activeTab === 'innovations' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>}
                      </button>
                    </div>
                    <div className="w-full border-b border-gray-200 mt-1" style={{ maxWidth: 'fit-content', margin: '0 auto' }}></div>
                  </div>
                </div>
                
                {/* Tab Content */}
                <div className="flex-grow w-full rounded-b-lg bg-white p-8" style={{ minHeight: '400px' }}>
                  {/* Recycling Process Content */}
                  <div className={`transition-opacity duration-300 ${activeTab === 'recycling' ? 'opacity-100' : 'hidden opacity-0'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="relative p-6 bg-red-50 rounded-xl shadow-md overflow-visible">
                        <span className="absolute -top-4 -left-4 bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">1</span>
                        <h3 className="text-lg font-medium text-gray-900 mt-2 ml-2">Collection & Sorting</h3>
                        <p className="mt-4 text-gray-700">
                          PET bottles and containers are collected, sorted by color and quality, then cleaned to remove labels, caps, and contaminants.
                        </p>
                      </div>
                      
                      <div className="relative p-6 bg-red-50 rounded-xl shadow-md overflow-visible">
                        <span className="absolute -top-4 -left-4 bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold z-50">2</span>
                        <h3 className="text-lg font-medium text-gray-900 mt-2 ml-2">Processing</h3>
                        <p className="mt-4 text-gray-700">
                          Clean PET is shredded into flakes, washed again, dried, and then either melted for direct molding or processed into pellets for future use.
                        </p>
                      </div>
                      
                      <div className="relative p-6 bg-red-50 rounded-xl shadow-md overflow-visible">
                        <span className="absolute -top-4 -left-4 bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold z-50">3</span>
                        <h3 className="text-lg font-medium text-gray-900 mt-2 ml-2">Remanufacturing</h3>
                        <p className="mt-4 text-gray-700">
                          Recycled PET (rPET) becomes new bottles, packaging, textiles (polyester), industrial strapping, and construction materials.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8 p-5 bg-gray-100 rounded-lg border-l-4 border-red-600">
                      <div className="flex items-start">
                        <Info className="w-6 h-6 text-red-600 mt-1 mr-3 flex-shrink-0" />
                        <p className="text-gray-700">
                          Each recycling cycle typically degrades PET quality, limiting how many times it can be recycled into the same product. Most PET is "downcycled" into lower-grade products after its first recycling.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Environmental Impact Content */}
                  <div className={`transition-opacity duration-300 ${activeTab === 'impact' ? 'opacity-100' : 'hidden opacity-0'}`}>
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="w-full md:w-1/2">
                        <div className="bg-red-50 p-6 rounded-xl shadow-md h-full">
                          <div className="flex items-center mb-4">
                            <Droplet className="w-8 h-8 text-blue-600 mr-3" />
                            <h3 className="text-xl font-medium text-gray-900">Water Systems Impact</h3>
                          </div>
                          <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                              <div className="bg-red-100 rounded-full p-1 mr-3 mt-1">
                                <span className="block w-2 h-2 bg-red-600 rounded-full"></span>
                              </div>
                              <span>PET microplastics have been found in water bodies worldwide</span>
                            </li>
                            <li className="flex items-start">
                              <div className="bg-red-100 rounded-full p-1 mr-3 mt-1">
                                <span className="block w-2 h-2 bg-red-600 rounded-full"></span>
                              </div>
                              <span>Can take 450+ years to completely degrade in marine environments</span>
                            </li>
                            <li className="flex items-start">
                              <div className="bg-red-100 rounded-full p-1 mr-3 mt-1">
                                <span className="block w-2 h-2 bg-red-600 rounded-full"></span>
                              </div>
                              <span>Affects marine life through ingestion and entanglement</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="w-full md:w-1/2">
                        <div className="bg-red-50 p-6 rounded-xl shadow-md h-full">
                          <div className="flex items-center mb-4">
                            <Factory className="w-8 h-8 text-gray-600 mr-3" />
                            <h3 className="text-xl font-medium text-gray-900">Production Impact</h3>
                          </div>
                          <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                              <div className="bg-red-100 rounded-full p-1 mr-3 mt-1">
                                <span className="block w-2 h-2 bg-red-600 rounded-full"></span>
                              </div>
                              <span>Manufacturing 1kg of PET produces ~2.3kg of CO₂ emissions</span>
                            </li>
                            <li className="flex items-start">
                              <div className="bg-red-100 rounded-full p-1 mr-3 mt-1">
                                <span className="block w-2 h-2 bg-red-600 rounded-full"></span>
                              </div>
                              <span>Using recycled PET reduces energy consumption by ~60% compared to virgin plastic</span>
                            </li>
                            <li className="flex items-start">
                              <div className="bg-red-100 rounded-full p-1 mr-3 mt-1">
                                <span className="block w-2 h-2 bg-red-600 rounded-full"></span>
                              </div>
                              <span>Requires petroleum extraction, contributing to resource depletion</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 bg-white border border-red-200 rounded-xl overflow-hidden">
                      <div className="bg-red-600 py-2 px-4">
                        <h4 className="text-white font-large text-center">Global Recovery Statistics</h4>
                      </div>
                      <div className="p-4">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="text-center pl-16">
                            <div className="text-3xl font-bold text-red-600">29%</div>
                            <p className="text-sm text-gray-600">Global Collection Rate</p>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-red-600">~500B</div>
                            <p className="text-sm text-gray-600">PET Bottles Produced Annually</p>
                          </div>
                          <div className="text-center pr-16">
                            <div className="text-3xl font-bold text-red-600">20%</div>
                            <p className="text-sm text-gray-600">Actually Recycled</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Innovations Content */}
                  <div className={`transition-opacity duration-300 ${activeTab === 'innovations' ? 'opacity-100' : 'hidden opacity-0'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl shadow-md p-6 transition-transform duration-300 hover:scale-105">
                        <h3 className="text-xl font-medium text-gray-900 border-b border-red-200 pb-3 mb-4">Chemical Recycling</h3>
                        <p className="text-gray-700 mb-4">
                          Breaks down PET into its original chemical components through processes like glycolysis, methanolysis, and hydrolysis, allowing for unlimited recycling without quality degradation.
                        </p>
                        <div className="flex items-center mt-auto">
                          <ArrowRight className="w-5 h-5 text-red-600 mr-2" />
                          <span className="text-sm font-medium text-red-600">Promising technology</span>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl shadow-md p-6 transition-transform duration-300 hover:scale-105">
                        <h3 className="text-xl font-medium text-gray-900 border-b border-red-200 pb-3 mb-4">Enzymatic Recycling</h3>
                        <p className="text-gray-700 mb-4">
                          Uses specialized enzymes to break down PET at a molecular level under mild conditions, consuming less energy and allowing for true circular recycling of plastic materials.
                        </p>
                        <div className="flex items-center mt-auto">
                          <ArrowRight className="w-5 h-5 text-red-600 mr-2" />
                          <span className="text-sm font-medium text-red-600">Eco-friendly approach</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 bg-white p-6 rounded-xl border border-red-200">
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Technology Adoption Timeline</h4>
                      <div className="relative">
                        {/* Timeline */}
                        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-red-200"></div>
                        
                        <div className="space-y-8">
                          <div className="relative flex items-start pl-16">
                            <div className="absolute left-0 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-medium">
                              Now
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900">Mechanical Recycling Dominance</h5>
                              <p className="text-sm text-gray-700 mt-1">
                                Traditional shredding and melting remains the most common method, with limitations on recycling cycles.
                              </p>
                            </div>
                          </div>
                          
                          <div className="relative flex items-start pl-16">
                            <div className="absolute left-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-medium">
                              5yr
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900">Chemical Recycling Scaling</h5>
                              <p className="text-sm text-gray-700 mt-1">
                                Industrial-scale chemical recycling plants becoming more common, improving quality of recycled PET.
                              </p>
                            </div>
                          </div>
                          
                          <div className="relative flex items-start pl-16">
                            <div className="absolute left-0 w-10 h-10 bg-red-400 rounded-full flex items-center justify-center text-white font-medium">
                              10yr
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900">Enzymatic Breakthrough</h5>
                              <p className="text-sm text-gray-700 mt-1">
                                Widespread adoption of enzymatic PET recycling, enabling true plastic circularity.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
    {/* Biodegradability */}
    <section className="flex flex-col items-center justify-start bg-red-600 w-full pt-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-102">
                <div className="container mx-auto px-4 text-center">
                  <h2 className="text-3xl font-semibold text-white mb-4">
                    <u style={{ textDecorationThickness: '2px' }}>Biodegradability</u>
                  </h2>
                  <div className="text-lg leading-relaxed text-center px-8 pb-8 text-white bg-red-600">
                    <p>
                      PET has limited biodegradability under typical environmental conditions, requiring specific treatments for decomposition.
                    </p>
                  </div>
                </div>
                
                <div className="flex-grow w-full rounded-b-lg bg-white p-8">
                  {/* Split Panel Design */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                    
                    {/* Left Panel - Environmental Conditions */}
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl shadow-md p-6 border border-red-100">
                      <div className="h-full flex flex-col">
                        <div className="flex items-center mb-6">
                          <div className="bg-red-100 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-medium text-gray-900 ml-4">Environmental Conditions</h3>
                        </div>
                        
                        <div className="space-y-6 flex-grow">
                          <div className="relative">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-gray-600">Marine Environment</span>
                              <span className="text-sm font-bold text-red-600">450+ years</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div className="bg-red-500 h-3 rounded-full" style={{ width: '95%' }}></div>
                            </div>
                            <p className="text-xs text-gray-600 mt-2">Cold temperatures and UV exposure slow breakdown</p>
                          </div>
                          
                          <div className="relative">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-gray-600">Landfill Environment</span>
                              <span className="text-sm font-bold text-red-600">700+ years</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div className="bg-red-600 h-3 rounded-full" style={{ width: '98%' }}></div>
                            </div>
                            <p className="text-xs text-gray-600 mt-2">Anaerobic conditions prevent standard degradation</p>
                          </div>
                          
                          <div className="relative">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-gray-600">Composting Facility</span>
                              <span className="text-sm font-bold text-orange-600">No degradation</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div className="bg-gray-400 h-3 rounded-full" style={{ width: '100%' }}></div>
                            </div>
                            <p className="text-xs text-gray-600 mt-2">Standard PET remains unchanged in composting</p>
                          </div>
                        </div>
                        
                        <div className="mt-6 p-4 bg-white rounded-lg border border-red-200">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-gray-700">
                              PET's crystalline structure makes it highly resistant to natural decomposition processes.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right Panel - Biodegradation Process */}
                    <div className="bg-gradient-to-br from-gray-50 to-red-50 rounded-xl shadow-md p-6 border border-red-100">
                      <div className="h-full flex flex-col">
                        <div className="flex items-center mb-6">
                          <div className="bg-green-100 p-3 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-medium text-gray-900 ml-4">Enhanced Biodegradation</h3>
                        </div>
                        
                        {/* Flowchart-style process */}
                        <div className="flex-grow">
                          <div className="relative">
                            {/* Vertical connector line */}
                            <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-300 z-0"></div>
                            
                            <div className="space-y-8 relative z-10">
                              <div className="flex items-start">
                                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mr-4 shadow-md">
                                  1
                                </div>
                                <div className="flex-grow">
                                  <h4 className="font-medium text-gray-900">Enzymatic Treatment</h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    Specialized enzymes like PETase can break down PET in laboratory conditions within weeks.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-start">
                                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mr-4 shadow-md">
                                  2
                                </div>
                                <div className="flex-grow">
                                  <h4 className="font-medium text-gray-900">Thermal Treatment</h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    High-temperature industrial composting (60-70°C) can accelerate breakdown over months.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-start">
                                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mr-4 shadow-md">
                                  3
                                </div>
                                <div className="flex-grow">
                                  <h4 className="font-medium text-gray-900">Biodegradable Additives</h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    Modified PET with pro-degradant additives can reduce decomposition time to 3-5 years.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 bg-white rounded-lg border border-green-200 overflow-hidden">
                          <div className="bg-red-500 py-2 px-4">
                            <h4 className="text-white font-medium text-sm text-center">Breakthrough Research</h4>
                          </div>
                          <div className="p-4">
                            <p className="text-sm text-gray-700">
                              Scientists have discovered bacteria that can naturally consume PET, offering hope for biological 
                              solutions to plastic waste. Research into engineered organisms continues to show promising results.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Comparison Chart */}
                  <div className="mt-8 bg-white border border-red-200 rounded-xl overflow-hidden">
                    <div className="bg-red-600 py-3 px-6">
                      <h4 className="text-white font-medium text-center">Biodegradation Timeline Comparison</h4>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-red-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-red-600 mb-2">2-6</div>
                          <div className="text-xs text-gray-600 mb-1">WEEKS</div>
                          <div className="text-sm font-medium text-gray-800">Enzymatic Lab</div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600 mb-2">3-5</div>
                          <div className="text-xs text-gray-600 mb-1">YEARS</div>
                          <div className="text-sm font-medium text-gray-800">Modified PET</div>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-red-600 mb-2">450+</div>
                          <div className="text-xs text-gray-600 mb-1">YEARS</div>
                          <div className="text-sm font-medium text-gray-800">Ocean Environment</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-gray-600 mb-2">700+</div>
                          <div className="text-xs text-gray-600 mb-1">YEARS</div>
                          <div className="text-sm font-medium text-gray-800">Landfill</div>
                        </div>
                      </div>
                    </div>
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
    }