'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X, ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'

// Stage data structure
const stages = [
  {
    id: 1,
    title: "Everyday PET Plastics",
    description: "PET (polyethylene terephthalate) is found in common items like water bottles, soda bottles, food containers, and synthetic clothing (polyester).",
    imageUrl: "/graphic/pet-sources.svg",
    iconColor: "bg-blue-500",
    facts: [
      "Over 500 billion plastic bottles are used worldwide every year",
      "The average American uses 156 plastic bottles annually",
      "PET is the most commonly recycled plastic"
    ]
  },
  {
    id: 2,
    title: "Breaks into Microplastics",
    description: "Plastic items break down into microplastics (particles less than 5mm) through mechanical abrasion, UV degradation, and washing synthetic fabrics.",
    imageUrl: "/graphic/microplastic-formation.svg",
    iconColor: "bg-purple-500",
    facts: [
      "A single wash of polyester clothing can release 700,000 microplastic fibers",
      "Microplastics can be created through physical wear or UV degradation",
      "Microplastics are defined as plastic particles smaller than 5mm"
    ]
  },
  {
    id: 3,
    title: "Microplastics in Air, Water, and Soil",
    description: "Microplastics enter the environment through multiple pathways: washing machines to wastewater to water bodies, and littering leading to degradation into soil and water.",
    imageUrl: "/graphic/environment-entry.svg",
    iconColor: "bg-green-500",
    facts: [
      "14 million tons of microplastics are estimated to be on the ocean floor",
      "Rain can contain up to 249,000 microplastic particles per square meter",
      "Wastewater treatment plants can remove 90% of microplastics, but the remainder still enters waterways"
    ]
  },
  {
    id: 4,
    title: "Inhaled and Ingested",
    description: "Humans are exposed to microplastics primarily through ingestion (bottled water, seafood, salt) and inhalation of airborne fibers from synthetic materials.",
    imageUrl: "/graphic/human-exposure.svg",
    iconColor: "bg-orange-500",
    facts: [
      "The average person may consume up to 5 grams of microplastics weekly - equivalent to a credit card",
      "Bottled water contains 22x more microplastics than tap water on average",
      "Indoor air can contain 2-20 microplastic particles per cubic meter"
    ]
  },
  {
    id: 5,
    title: "Where It Ends Up",
    description: "Microplastics have been detected in human blood, lungs, placenta, and stool. Research on health effects is ongoing, with concerns about inflammation and hormone disruption.",
    imageUrl: "/graphic/body-impact.svg",
    iconColor: "bg-red-500",
    facts: [
      "Microplastics have been found in human placentas, potentially affecting fetal development",
      "A 2022 study found microplastics in human blood for the first time",
      "Research suggests microplastics may cause inflammation and cellular damage"
    ]
  }
]

export default function PlasticFormationPage() {
  const [currentStage, setCurrentStage] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [typesDropdownOpen, setTypesDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const stageRefs = useRef<(HTMLDivElement | null)[]>([])

  // Handle navigation dropdown interactions
  const handleMouseEnterDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    setTypesDropdownOpen(true)
  }

  const handleMouseLeaveDropdown = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setTypesDropdownOpen(false)
    }, 100)
  }

  // Handle stage navigation
  const goToNextStage = () => {
    if (currentStage < 5 && !isTransitioning) {
      handleStageTransition(currentStage + 1)
    }
  }

  const goToPrevStage = () => {
    if (currentStage > 1 && !isTransitioning) {
      handleStageTransition(currentStage - 1)
    }
  }

  const handleStageTransition = (stageNumber: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentStage(stageNumber)
      setIsTransitioning(false)
    }, 500)
  }

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextStage()
      } else if (e.key === 'ArrowLeft') {
        goToPrevStage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentStage, isTransitioning])

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Header with navigation - same as main page */}
      <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white bg-opacity-80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center py-4">      
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
              <Link href="/formation" className="px-4 py-2 text-red-600 transition-colors font-medium rounded-md bg-red-50">
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
            
            {/* Mobile menu button */}
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
                className="px-4 py-3 bg-red-50 text-red-600 rounded-lg transition-colors"
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
      <main className="flex-1 relative pt-24">
        {/* Background with enhanced design */}
        <div className="fixed inset-0 z-0">
          {/* Grid pattern with particle effect */}
          <div className="absolute inset-0 bg-grid-pattern opacity-15"></div>
          
          {/* Subtle animated patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 right-0 h-full bg-pattern-overlay"></div>
          </div>
          
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent"></div>
          
          {/* Animated plastic particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-400 rounded-full animate-float opacity-70" style={{animationDuration: '15s'}}></div>
            <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-red-300 rounded-full animate-float opacity-60" style={{animationDuration: '18s', animationDelay: '2s'}}></div>
            <div className="absolute top-2/3 left-1/3 w-5 h-5 bg-red-500 rounded-full animate-float opacity-50" style={{animationDuration: '20s', animationDelay: '5s'}}></div>
            <div className="absolute top-1/2 left-3/4 w-6 h-6 bg-red-200 rounded-full animate-float opacity-40" style={{animationDuration: '25s', animationDelay: '1s'}}></div>
            <div className="absolute top-3/4 left-1/5 w-4 h-4 bg-red-300 rounded-full animate-float opacity-50" style={{animationDuration: '22s', animationDelay: '3s'}}></div>
          </div>
        </div>

        {/* Page title */}
        <section className="relative z-10 py-8 mb-8">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                The Journey of <span className="text-red-600">Microplastics</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Follow the path of plastic from everyday products to microscopic particles that enter our environment and bodies.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive visualization section */}
        <section className="relative z-10 py-8">
          <div className="container mx-auto px-6">
            {/* Stage progress indicator */}
            <div className="flex justify-center mb-8">
              <div className="relative flex items-center w-full max-w-3xl">
                {stages.map((stage, index) => (
                  <div key={stage.id} className="flex-1 flex flex-col items-center">
                    <button 
                      onClick={() => handleStageTransition(stage.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        currentStage >= stage.id 
                          ? `${stage.iconColor} text-white` 
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {stage.id}
                    </button>
                    <div className="text-xs text-center mt-2 font-medium max-w-[100px]">
                      {stage.title.split(' ')[0]}
                    </div>
                    {index < stages.length - 1 && (
                      <div className={`absolute h-1 top-5 left-0 right-0 -z-10 transition-all duration-500 ${
                        currentStage > index + 1 ? stage.iconColor : 'bg-gray-200'
                      }`} style={{left: `${(index + 0.5) * 100 / stages.length}%`, right: `${100 - ((index + 1.5) * 100 / stages.length)}%`}}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Stage visualization */}
            <div className="relative min-h-[500px] md:min-h-[600px]">
              {stages.map((stage) => (
                <div 
                  key={stage.id}
                  ref={el => { stageRefs.current[stage.id - 1] = el; }}
                  className={`absolute inset-0 flex flex-col md:flex-row items-center gap-8 transition-all duration-500 ${
                    currentStage === stage.id 
                      ? 'opacity-100 transform translate-x-0' 
                      : currentStage > stage.id 
                        ? 'opacity-0 pointer-events-none transform -translate-x-full' 
                        : 'opacity-0 pointer-events-none transform translate-x-full'
                  }`}
                >
                  {/* Visual representation */}
                  <div className="w-full md:w-1/2 flex justify-center items-center">
                    <div className={`relative w-72 h-72 md:w-96 md:h-96 ${isTransitioning ? 'animate-pulse' : 'animate-float'}`} style={{animationDuration: '6s'}}>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-gray-100 shadow-lg flex items-center justify-center">
                        {/* Placeholder image - replace with actual images */}
                        <div className="relative w-4/5 h-4/5 animate-bounce-slow" style={{animationDuration: '5s'}}>
                          <div className="absolute inset-0 bg-contain bg-center bg-no-repeat" style={{
                            backgroundImage: `url('/api/placeholder/${stage.id}')`,
                            filter: 'drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.15))'
                          }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Text content */}
                  <div className="w-full md:w-1/2 p-6 bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
                    <div className={`inline-block ${stage.iconColor} text-white px-3 py-1 rounded-full text-sm font-medium mb-4`}>
                      Stage {stage.id}
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-gray-900">{stage.title}</h2>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">{stage.description}</p>
                    
                    {/* Key facts */}
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h3 className="text-sm uppercase text-gray-500 font-medium mb-3">Key Facts</h3>
                      <ul className="space-y-2">
                        {stage.facts.map((fact, i) => (
                          <li key={i} className="flex items-start">
                            <span className={`${stage.iconColor} rounded-full w-2 h-2 mt-2 mr-2 flex-shrink-0`}></span>
                            <span className="text-gray-700">{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Navigation controls */}
              <div className="absolute left-0 right-0 bottom-0 flex justify-between items-center mt-8 px-4">
                <button 
                  onClick={goToPrevStage}
                  disabled={currentStage === 1 || isTransitioning}
                  className={`p-3 rounded-full ${
                    currentStage === 1 || isTransitioning
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-red-100 text-red-600 hover:bg-red-200 transition-colors'
                  }`}
                >
                  <ArrowLeft size={24} />
                </button>
                
                <div className="text-gray-500 text-sm">
                  {currentStage} / {stages.length}
                </div>
                
                <button 
                  onClick={goToNextStage}
                  disabled={currentStage === 5 || isTransitioning}
                  className={`p-3 rounded-full ${
                    currentStage === 5 || isTransitioning
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-red-100 text-red-600 hover:bg-red-200 transition-colors'
                  }`}
                >
                  <ArrowRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to action section */}
        <section className="relative z-10 py-16 bg-gradient-to-r from-red-50 to-red-100 mt-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Learn More About Plastic Impact</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Discover how microplastics affect our environment and health, and what solutions are being developed.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/environmental" className="px-6 py-3 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-colors shadow-md hover:shadow-lg">
                Environmental Effects
              </Link>
              <Link href="/solutions" className="px-6 py-3 bg-white text-red-600 font-medium rounded-full border border-red-600 hover:bg-red-50 transition-colors shadow-md hover:shadow-lg">
                Solutions & Alternatives
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - same as main page */}
      <footer className="relative z-10 bg-red-50 border-t border-red-100 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-700 mb-2">Designed and Developed by Ankit Kale, Sreeram Vuppala, and Abhiram Kuuram</p>
          <p> South Brunswick High School Team A, 2025 </p>
        </div>
      </footer>

      {/* Custom CSS */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
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
      `}</style>
    </div>
  )
}