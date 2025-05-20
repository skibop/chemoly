'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X, ArrowRight, ArrowLeft, AlertCircle, Heart, Brain, Droplet, Fish, Wind } from 'lucide-react'

// Main data structures
const environmentalImpacts = [
  {
    id: 1,
    title: "Aquatic Ecosystem Disruption",
    description: "Microplastics are ingested by marine life at all levels of the food chain, causing physical blockages, inflammation, and reduced feeding.",
    imageUrl: "/api/placeholder/400/300",
    icon: <Fish className="h-6 w-6" />,
    color: "bg-blue-600",
    facts: [
      "Over 800 marine species are affected by plastic debris",
      "Microplastics found in 100% of sea turtles in recent studies",
      "Some fish preferentially feed on microplastics, mistaking them for food"
    ]
  },
  {
    id: 2,
    title: "Soil Degradation",
    description: "Agricultural soils are contaminated through sewage sludge, plastic mulches, and atmospheric deposition, affecting soil structure and microbes.",
    imageUrl: "/api/placeholder/400/300",
    color: "bg-amber-600",
    facts: [
      "Microplastics reduce soil porosity and water retention capacity",
      "Up to 300,000 microplastic particles per kg found in some soils",
      "Earthworms transport microplastics deeper into soil profiles"
    ]
  },
  {
    id: 3,
    title: "Water Cycle Contamination",
    description: "Microplastics found in all parts of the water cycle—from rain to groundwater—with impacts on climate and hydrological systems.",
    imageUrl: "/api/placeholder/400/300",
    icon: <Droplet className="h-6 w-6" />,
    color: "bg-blue-400",
    facts: [
      "Detected in Arctic snow and Antarctic ice cores",
      "249,000 microplastic particles per square meter found in rainfall",
      "Even remote mountain watersheds show contamination"
    ]
  },
  {
    id: 4,
    title: "Climate Change Interactions",
    description: "Microplastics influence climate by affecting surface reflectivity, ocean carbon sequestration, and greenhouse gas emissions.",
    imageUrl: "/api/placeholder/400/300",
    icon: <Wind className="h-6 w-6" />,
    color: "bg-red-600",
    facts: [
      "Ocean plastics alter heat absorption and exchange",
      "Reduce efficiency of ocean carbon sinks by affecting plankton",
      "Degrading plastics release methane and ethylene gases"
    ]
  }
];

const healthImpacts = [
  {
    id: 1,
    title: "Digestive System",
    description: "Humans ingest microplastics through food and water. Average person consumes 5g weekly—equivalent to a credit card.",
    imageUrl: "/api/placeholder/300/200",
    concerns: ["Gut inflammation", "Microbiome disruption", "Translocation to bloodstream", "Carrier for toxins"]
  },
  {
    id: 2,
    title: "Respiratory System",
    description: "Microplastics can be inhaled, reaching deep into lungs. Indoor environments with textiles have high concentrations.",
    imageUrl: "/api/placeholder/300/200",
    concerns: ["Lung inflammation", "Oxidative stress", "Asthma exacerbation", "Potential fibrosis"]
  },
  {
    id: 3,
    title: "Cardiovascular System",
    description: "Nanoplastics may enter bloodstream through digestion or lungs, potentially affecting heart health.",
    imageUrl: "/api/placeholder/300/200",
    concerns: ["Blood vessel inflammation", "Atherosclerosis risk", "Heart function interference", "Blood clot formation"]
  },
  {
    id: 4,
    title: "Brain & Nervous System",
    description: "Research suggests nanoplastics may cross the blood-brain barrier, raising neurological concerns.",
    imageUrl: "/api/placeholder/300/200",
    concerns: ["Neuroinflammation", "Cell signaling disruption", "Behavioral effects", "Brain tissue stress"]
  }
];

export default function EnvironmentalEffectsPage() {
  const [currentImpact, setCurrentImpact] = useState(1)
  const [scrollY, setScrollY] = useState(0)
  const [typesDropdownOpen, setTypesDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState({
    hero: true,
    environmental: false,
    health: false,
    research: false
  })
const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handle navigation dropdown interactions
  const handleMouseEnterDropdown = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    setTypesDropdownOpen(true)
  }

  const handleMouseLeaveDropdown = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setTypesDropdownOpen(false)
    }, 100)
  }

  // Handle impact carousel navigation
  const goToNextImpact = () => {
    if (currentImpact < environmentalImpacts.length) {
      setCurrentImpact(currentImpact + 1)
    }
  }

  const goToPrevImpact = () => {
    if (currentImpact > 1) {
      setCurrentImpact(currentImpact - 1)
    }
  }

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      const viewportHeight = window.innerHeight
      setIsVisible({
        hero: true,
        environmental: window.scrollY > viewportHeight * 0.3,
        health: window.scrollY > viewportHeight * 0.7,
        research: window.scrollY > viewportHeight
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Keyboard navigation
  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') goToNextImpact()
    else if (e.key === 'ArrowLeft') goToPrevImpact()
  }

  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [])


  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Header with navigation */}
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
                          Synthetic Clothes - PET
                        </Link>
                        <Link href="/types/plastic-2" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                          Heavy-Duty Plastic Bottles - HDPE
                        </Link>
                        <Link href="/types/plastic-3" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                          Heavy-Duty Plastic Pipes - PVC
                        </Link>
                      </div>
                    </div>
                  )}
              </div>
              
              {/* Other main navigation links */}
              <Link href="/formation" className="px-4 py-2 hover:text-red-600 transition-colors font-medium rounded-md hover:bg-red-50">
                PLASTIC FORMATION
              </Link>
              <Link href="/environmental" className="px-4 py-2 text-red-600 transition-colors font-medium rounded-md bg-red-50">
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
          <div className="md:hidden absolute top-full left-0 right-0 bg-white bg-opacity-95 backdrop-blur-md shadow-lg border-t border-red-100 py-4 z-50">
            <div className="container mx-auto px-4 flex flex-col space-y-2">
              <Link href="/" className="px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>HOME</Link>
              <Link href="/types" className="px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>TYPES OF PLASTICS</Link>
              <Link href="/formation" className="px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>PLASTIC FORMATION</Link>
              <Link href="/environmental" className="px-4 py-3 bg-red-50 text-red-600 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>ENVIRONMENTAL EFFECTS</Link>
              <Link href="/solutions" className="px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>SOLUTIONS</Link>
              <Link href="/citations" className="px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>CITATIONS</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 relative pt-16 md:pt-20">
        {/* Background with subtle pattern */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-grid-pattern opacity-15"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent"></div>
          
          {/* Simple background particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="animate-float absolute top-1/4 left-1/4 w-4 h-4 bg-red-400 rounded-full opacity-70" style={{animationDuration: '15s'}}></div>
            <div className="animate-float absolute top-1/3 left-2/3 w-3 h-3 bg-red-300 rounded-full opacity-60" style={{animationDuration: '18s', animationDelay: '2s'}}></div>
            <div className="animate-float absolute top-2/3 left-1/3 w-5 h-5 bg-red-500 rounded-full opacity-50" style={{animationDuration: '20s', animationDelay: '5s'}}></div>
          </div>
        </div>

        {/* Hero section */}
        <section className="relative z-10 min-h-screen flex flex-col justify-center">
          <div className="container mx-auto px-6 py-20">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10 transition-all duration-1000 transform"
                   style={{opacity: isVisible.hero ? 1 : 0, transform: isVisible.hero ? 'translateY(0)' : 'translateY(50px)'}}>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                  Microplastics: <span className="text-red-600">Invisible Threat</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                  How tiny plastic particles impact our environment and health
                </p>
              </div>
              
              <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl border border-red-100 overflow-hidden">
                {/* Hero content */}
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2 p-6 bg-gradient-to-br from-red-50 to-red-100">
                    <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                      {/* Placeholder for main infographic */}
                      <div className="absolute inset-0 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url('/api/placeholder/500/350')" }}></div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2 p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">What Are Microplastics?</h2>
                    <p className="text-gray-700 mb-4">
                      Microplastics are tiny plastic particles less than 5mm in size that have become ubiquitous environmental pollutants. They include intentionally manufactured microbeads in cosmetics and fragments from larger plastic items.
                    </p>
                    
                    <div className="flex items-center space-x-3 text-sm">
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full font-medium">Found globally</span>
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full font-medium">Persist for centuries</span>
                      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full font-medium">Accumulate in food chains</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Key statistics */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-md border border-red-100 p-6 hover:shadow-lg transition-all">
                  <div className="text-4xl font-bold text-red-600 mb-2">14 Million</div>
                  <div className="text-gray-700">Tons of microplastics estimated to be on the ocean floor</div>
                </div>
                <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-md border border-red-100 p-6 hover:shadow-lg transition-all">
                  <div className="text-4xl font-bold text-red-600 mb-2">5 Grams</div>
                  <div className="text-gray-700">Average weekly microplastic consumption per person (equivalent to a credit card)</div>
                </div>
                <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-md border border-red-100 p-6 hover:shadow-lg transition-all">
                  <div className="text-4xl font-bold text-red-600 mb-2">170+</div>
                  <div className="text-gray-700">Species of marine animals documented to ingest microplastics</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Environmental Impacts Section */}
        <section className="relative z-10 py-20 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Environmental Impacts</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  From remote oceans to mountain soils, microplastics are changing global ecosystems
                </p>
              </div>
              
              {/* Impact slider */}
              <div className="relative min-h-[450px]">
                {/* Impact indicators */}
                <div className="flex justify-center mb-8">
                  <div className="flex items-center space-x-4">
                    {environmentalImpacts.map((impact) => (
                      <button 
                        key={impact.id}
                        onClick={() => setCurrentImpact(impact.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          currentImpact === impact.id ? impact.color + ' text-white' : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {impact.id}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Impact content */}
                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
                  {environmentalImpacts.map((impact) => (
                    <div 
                      key={impact.id}
                      className={`transition-all duration-500 ${
                        currentImpact === impact.id ? 'opacity-100' : 'hidden opacity-0'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 p-6">
                          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                            <div className="absolute inset-0 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url('${impact.imageUrl}')` }}></div>
                          </div>
                        </div>
                        
                        <div className="w-full md:w-1/2 p-6">
                          <div className={`inline-flex items-center ${impact.color} text-white px-3 py-1 rounded-full text-sm font-medium mb-4`}>
                            {impact.icon}
                            <span className="ml-2">Impact {impact.id}</span>
                          </div>
                          <h3 className="text-2xl font-bold mb-3 text-gray-900">{impact.title}</h3>
                          <p className="text-gray-700 mb-4">{impact.description}</p>
                          
                          <h4 className="text-sm uppercase text-gray-500 font-medium mb-2">Key Facts</h4>
                          <ul className="space-y-2">
                            {impact.facts.map((fact, i) => (
                              <li key={i} className="flex items-start">
                                <span className={`${impact.color} rounded-full w-2 h-2 mt-2 mr-2 flex-shrink-0`}></span>
                                <span className="text-gray-700">{fact}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Navigation controls */}
                <div className="absolute left-0 right-0 bottom-0 flex justify-between items-center mt-8 px-4">
                  <button 
                    onClick={goToPrevImpact}
                    disabled={currentImpact === 1}
                    className={`p-3 rounded-full ${
                      currentImpact === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    <ArrowLeft size={24} />
                  </button>
                  
                  <button 
                    onClick={goToNextImpact}
                    disabled={currentImpact === environmentalImpacts.length}
                    className={`p-3 rounded-full ${
                      currentImpact === environmentalImpacts.length ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    <ArrowRight size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Human Health Impacts Section */}
        <section className="relative z-10 py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center mr-2">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Human Health Impacts</h2>
                </div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Current research and concerns about microplastics in the human body
                </p>
              </div>
              
              {/* Human body interactive diagram - simplified */}
              <div className="mb-16 bg-gradient-to-r from-red-50 to-red-100 rounded-3xl overflow-hidden shadow-lg p-6">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-1/2 p-4">
                    <div className="relative h-80 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url('/api/placeholder/400/500')" }}>
                      {/* This would be the human body outline - simplified to just an image */}
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2 p-4">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Exposure Routes</h3>
                    <p className="text-gray-700 mb-6">
                      Microplastics enter the human body through multiple pathways. Primary routes include ingestion through food and water, inhalation of airborne particles, and potential absorption through skin contact.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 shadow-md border border-red-100">
                        <h4 className="font-bold text-red-600">Did You Know?</h4>
                        <p className="text-gray-700">A 2022 study detected plastic particles in human blood samples for the first time, confirming microplastics can circulate throughout the body.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Health impacts cards - simplified */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {healthImpacts.map((impact) => (
                  <div key={impact.id} className="bg-white rounded-xl shadow-md hover:shadow-lg border border-red-100 overflow-hidden">
                    <div className="flex flex-col h-full">
                      <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url('${impact.imageUrl}')` }}></div>
                      <div className="p-6 flex-grow">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{impact.title}</h3>
                        <p className="text-gray-700 mb-4">{impact.description}</p>
                        
                        <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-2">Health Concerns</h4>
                        <ul className="space-y-1">
                          {impact.concerns.map((concern, i) => (
                            <li key={i} className="flex items-start">
                              <span className="bg-red-600 rounded-full w-2 h-2 mt-2 mr-2 flex-shrink-0"></span>
                              <span className="text-gray-700 text-sm">{concern}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Research note */}
              <div className="mt-10 bg-amber-50 rounded-xl p-6 shadow-md border border-amber-200 max-w-4xl mx-auto">
                <div className="flex items-start">
                  <div className="bg-amber-100 rounded-full p-3 mr-4">
                    <AlertCircle className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Research Note</h3>
                    <p className="text-gray-700">
                      Research on human health impacts of microplastics is still emerging. While studies have confirmed the presence of microplastics in human tissues, the long-term health implications are not yet fully understood.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
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
        
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(220, 38, 38, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(220, 38, 38, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  )
}