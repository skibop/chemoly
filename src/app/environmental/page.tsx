'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X, ArrowLeft, ArrowRight, Info, Droplets, Wind, Zap, Heart, ArrowDown } from 'lucide-react'

// Impact data with TypeScript interface
interface Impact {
  id: number;
  title: string;
  description: string;
  icon: React.JSX.Element;
  color: string;
  facts: string[];
}

const impacts: Impact[] = [
  {
    id: 1,
    title: "Water Ecosystems",
    description: "Microplastics disrupt aquatic food chains when ingested by marine life, causing physical and chemical toxicity throughout the food web.",
    icon: <Droplets size={32} />,
    color: "bg-blue-500",
    facts: [
      "Over 700 marine species are affected by plastic pollution",
      "Microplastics can absorb toxic chemicals up to 1 million times higher than surrounding waters",
      "By 2050, there may be more plastic than fish in the oceans by weight"
    ]
  },
  {
    id: 2,
    title: "Land & Soil",
    description: "Microplastics accumulate in soil through irrigation, fertilizers containing sewage sludge, and littering, altering soil structure and microbial communities.",
    icon: <ArrowDown size={32} />,
    color: "bg-green-600",
    facts: [
      "Agricultural soils may contain 4 to 23 times more microplastics than marine sediments",
      "Plastic contamination reduces earthworm growth and reproduction by up to 30%",
      "Microplastics can decrease crop yields by disrupting soil nutrition cycles"
    ]
  },
  {
    id: 3,
    title: "Air Quality",
    description: "Airborne microplastic fibers from textiles, tire wear, and degradation can be inhaled, potentially causing respiratory inflammation and related health issues.",
    icon: <Wind size={32} />,
    color: "bg-purple-500",
    facts: [
      "Urban air contains 1.5-11 microplastic particles per cubic meter",
      "Indoor air typically has 3-10 times more microplastics than outdoor air",
      "Microplastics have been detected in remote mountain regions and Arctic snow"
    ]
  },
  {
    id: 4,
    title: "Human Body",
    description: "Microplastics enter our bodies through ingestion, inhalation, and possibly skin absorption, accumulating in organs and potentially causing inflammation and cell damage.",
    icon: <Heart size={32} />,
    color: "bg-red-500",
    facts: [
      "The average person may consume up to 5 grams of microplastics weekly - equivalent to a credit card",
      "Microplastics have been detected in human blood, lungs, and placenta",
      "Plastic particles may enter human cells, causing oxidative stress and inflammation"
    ]
  },
  {
    id: 5,
    title: "Hormonal Systems",
    description: "Chemicals in plastics like BPA and phthalates can leach from microplastics, potentially disrupting hormone function and affecting reproduction and development.",
    icon: <Zap size={32} />,
    color: "bg-orange-500",
    facts: [
      "Some plastic compounds mimic estrogen, disrupting endocrine system function",
      "Prenatal exposure to plastic additives correlates with altered neurodevelopment",
      "Endocrine disrupting chemicals may affect metabolism and contribute to obesity"
    ]
  }
];

export default function MicroplasticsImpactPage() {
  const [currentImpact, setCurrentImpact] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [typesDropdownOpen, setTypesDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activePanel, setActivePanel] = useState<number | null>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const impactRefs = useRef<(HTMLDivElement | null)[]>([])

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

  // Handle impact navigation
  const goToNextImpact = () => {
    if (currentImpact < 5 && !isTransitioning) {
      handleImpactTransition(currentImpact + 1)
    }
  }

  const goToPrevImpact = () => {
    if (currentImpact > 1 && !isTransitioning) {
      handleImpactTransition(currentImpact - 1)
    }
  }

  const handleImpactTransition = (impactNumber: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImpact(impactNumber)
      setIsTransitioning(false)
    }, 500)
  }

  // Toggle panel
  const togglePanel = (index: number): void => {
    setActivePanel(activePanel === index ? null : index);
  };

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
        goToNextImpact()
      } else if (e.key === 'ArrowLeft') {
        goToPrevImpact()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentImpact, isTransitioning])

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
                className="px-4 py-3 bg-red-50 text-red-600 rounded-lg transition-colors"
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
                Microplastics: <span className="text-red-600">The Invisible Threat</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                How tiny plastic particles affect our environment and human health across ecosystems worldwide
              </p>
            </div>
          </div>
        </section>

        {/* Introduction section */}
        <section className="relative z-10 py-8 mb-8">
          <div className="container mx-auto px-6">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Understanding the Problem</h2>
              <p className="text-lg mb-6">
                Microplastics—plastic particles smaller than 5mm—are now found everywhere on Earth, from the deepest ocean trenches to mountain peaks. These tiny fragments come from the breakdown of larger plastics and from products designed to contain them, like exfoliating beads in cosmetics. As their prevalence grows, so does our understanding of their widespread impacts.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-red-50 p-4 rounded-lg">
                  <span className="block text-3xl font-bold text-red-600">5.25T</span>
                  <span className="text-sm">Plastic pieces in oceans</span>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <span className="block text-3xl font-bold text-red-600">24.4T</span>
                  <span className="text-sm">Microplastics in land ecosystems</span>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <span className="block text-3xl font-bold text-red-600">~2K</span>
                  <span className="text-sm">Particles inhaled daily</span>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <span className="block text-3xl font-bold text-red-600">5g</span>
                  <span className="text-sm">Weekly human consumption</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive visualization section */}
        <section className="relative z-10 py-8">
          <div className="container mx-auto px-6">
            {/* Impact progress indicator */}
            <div className="flex justify-center mb-8">
              <div className="relative flex items-center w-full max-w-3xl">
                {impacts.map((impact, index) => (
                  <div key={impact.id} className="flex-1 flex flex-col items-center">
                    <button 
                      onClick={() => handleImpactTransition(impact.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        currentImpact >= impact.id 
                          ? impact.color + ' text-white' 
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {impact.id}
                    </button>
                    <div className="text-xs text-center mt-2 font-medium max-w-[100px]">
                      {impact.title.split(' ')[0]}
                    </div>
                    {index < impacts.length - 1 && (
                      <div className={`absolute h-1 top-5 left-0 right-0 -z-10 transition-all duration-500 ${
                        currentImpact > index + 1 ? impact.color : 'bg-gray-200'
                      }`} style={{left: `${(index + 0.5) * 100 / impacts.length}%`, right: `${100 - ((index + 1.5) * 100 / impacts.length)}%`}}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Impact visualization */}
            <div className="relative min-h-[500px] md:min-h-[600px]">
              {impacts.map((impact) => (
                <div 
                  key={impact.id}
                  ref={el => { impactRefs.current[impact.id - 1] = el; }}
                  className={`absolute inset-0 flex flex-col md:flex-row items-center gap-8 transition-all duration-500 ${
                    currentImpact === impact.id 
                      ? 'opacity-100 transform translate-x-0' 
                      : currentImpact > impact.id 
                        ? 'opacity-0 pointer-events-none transform -translate-x-full' 
                        : 'opacity-0 pointer-events-none transform translate-x-full'
                  }`}
                >
                  {/* Visual representation */}
                  <div className="w-full md:w-1/2 flex justify-center items-center">
                    <div className={`relative w-72 h-72 md:w-96 md:h-96 ${isTransitioning ? 'animate-pulse' : 'animate-float'}`} style={{animationDuration: '6s'}}>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-gray-100 shadow-lg flex items-center justify-center">
                        {/* Impact-specific visualizations */}
                        <div className="relative w-4/5 h-4/5 animate-bounce-slow" style={{animationDuration: '5s'}}>
                          {impact.id === 1 && (
                            <div className="absolute inset-0 rounded-full overflow-hidden">
                              <div className="absolute inset-0 bg-blue-50"></div>
                              <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-blue-100"></div>
                              <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-blue-200 opacity-70"></div>
                              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-blue-300 opacity-60"></div>
                              {/* Fish and microplastics */}
                              <div className="absolute h-2 w-2 bg-yellow-400 rounded-full" style={{top: '40%', left: '20%'}}></div>
                              <div className="absolute h-3 w-3 bg-yellow-400 rounded-full" style={{top: '60%', left: '50%'}}></div>
                              <div className="absolute h-2 w-2 bg-yellow-400 rounded-full" style={{top: '30%', left: '70%'}}></div>
                              <div className="absolute h-10 w-16 bg-blue-500 opacity-80 rounded-full" style={{top: '45%', left: '35%'}}></div>
                              <div className="absolute h-6 w-10 bg-blue-600 opacity-80 rounded-full" style={{top: '55%', left: '65%'}}></div>
                            </div>
                          )}
                          {impact.id === 2 && (
                            <div className="absolute inset-0 rounded-full overflow-hidden">
                              <div className="absolute inset-0 bg-green-50"></div>
                              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-green-900 opacity-30"></div>
                              {/* Plants and microplastics */}
                              <div className="absolute h-8 w-2 bg-green-500" style={{bottom: '50%', left: '30%'}}></div>
                              <div className="absolute h-8 w-8 bg-green-400 rounded-full" style={{bottom: '58%', left: '29%'}}></div>
                              <div className="absolute h-10 w-2 bg-green-500" style={{bottom: '50%', left: '50%'}}></div>
                              <div className="absolute h-10 w-10 bg-green-400 rounded-full" style={{bottom: '60%', left: '49%'}}></div>
                              <div className="absolute h-6 w-2 bg-green-500" style={{bottom: '50%', left: '70%'}}></div>
                              <div className="absolute h-6 w-6 bg-green-400 rounded-full" style={{bottom: '56%', left: '69%'}}></div>
                              <div className="absolute h-2 w-2 bg-yellow-400 rounded-full" style={{bottom: '20%', left: '25%'}}></div>
                              <div className="absolute h-3 w-3 bg-yellow-400 rounded-full" style={{bottom: '30%', left: '45%'}}></div>
                              <div className="absolute h-2 w-2 bg-yellow-400 rounded-full" style={{bottom: '15%', left: '65%'}}></div>
                            </div>
                          )}
                          {impact.id === 3 && (
                            <div className="absolute inset-0 rounded-full overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-50"></div>
                              {/* Air particles */}
                              <div className="absolute h-2 w-2 bg-purple-300 rounded-full animate-float" style={{top: '20%', left: '20%', animationDelay: '0s', animationDuration: '3s'}}></div>
                              <div className="absolute h-3 w-3 bg-purple-400 rounded-full animate-float" style={{top: '30%', left: '40%', animationDelay: '0.5s', animationDuration: '4s'}}></div>
                              <div className="absolute h-2 w-2 bg-purple-300 rounded-full animate-float" style={{top: '50%', left: '70%', animationDelay: '1s', animationDuration: '3.5s'}}></div>
                              <div className="absolute h-3 w-3 bg-purple-400 rounded-full animate-float" style={{top: '60%', left: '30%', animationDelay: '1.5s', animationDuration: '4.5s'}}></div>
                              <div className="absolute h-2 w-2 bg-purple-300 rounded-full animate-float" style={{top: '70%', left: '60%', animationDelay: '2s', animationDuration: '3s'}}></div>
                              <div className="absolute h-3 w-3 bg-purple-400 rounded-full animate-float" style={{top: '40%', left: '50%', animationDelay: '2.5s', animationDuration: '4s'}}></div>
                            </div>
                          )}
                          {impact.id === 4 && (
                            <div className="absolute inset-0 rounded-full overflow-hidden">
                              <div className="absolute inset-0 bg-red-50"></div>
                              {/* Human body outline */}
                              <div className="absolute h-3/4 w-1/3 bg-red-200 opacity-60 rounded-full" style={{top: '12.5%', left: '33.3%'}}></div>
                              <div className="absolute h-1/4 w-1/6 bg-red-200 opacity-60 rounded-full" style={{top: '30%', left: '25%'}}></div>
                              <div className="absolute h-1/4 w-1/6 bg-red-200 opacity-60 rounded-full" style={{top: '30%', left: '58.3%'}}></div>
                              <div className="absolute h-1/3 w-1/8 bg-red-200 opacity-60 rounded-full" style={{top: '50%', left: '41.7%'}}></div>
                              {/* Microplastics */}
                              <div className="absolute h-2 w-2 bg-yellow-400 rounded-full" style={{top: '30%', left: '40%'}}></div>
                              <div className="absolute h-3 w-3 bg-yellow-400 rounded-full" style={{top: '40%', left: '45%'}}></div>
                              <div className="absolute h-2 w-2 bg-yellow-400 rounded-full" style={{top: '50%', left: '38%'}}></div>
                            </div>
                          )}
                          {impact.id === 5 && (
                            <div className="absolute inset-0 rounded-full overflow-hidden">
                              <div className="absolute inset-0 bg-orange-50"></div>
                              {/* Endocrine system representation */}
                              <div className="absolute h-16 w-16 bg-orange-200 opacity-70 rounded-full" style={{top: '20%', left: '42%'}}></div>
                              <div className="absolute h-2 w-20 bg-orange-300 opacity-70" style={{top: '36%', left: '40%'}}></div>
                              <div className="absolute h-12 w-12 bg-orange-200 opacity-70 rounded-full" style={{top: '40%', left: '44%'}}></div>
                              <div className="absolute h-10 w-10 bg-orange-200 opacity-70 rounded-full" style={{top: '55%', left: '35%'}}></div>
                              <div className="absolute h-10 w-10 bg-orange-200 opacity-70 rounded-full" style={{top: '55%', left: '55%'}}></div>
                              {/* Microplastics and chemicals */}
                              <div className="absolute h-2 w-2 bg-yellow-400 rounded-full animate-pulse" style={{top: '25%', left: '45%', animationDuration: '3s'}}></div>
                              <div className="absolute h-3 w-3 bg-yellow-400 rounded-full animate-pulse" style={{top: '45%', left: '50%', animationDuration: '2.5s'}}></div>
                              <div className="absolute h-2 w-2 bg-yellow-400 rounded-full animate-pulse" style={{top: '55%', left: '40%', animationDuration: '3.5s'}}></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Text content */}
                  <div className="w-full md:w-1/2 p-6 bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100">
                    <div className={`inline-block ${impact.color} text-white px-3 py-1 rounded-full text-sm font-medium mb-4`}>
                      Impact Area {impact.id}
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-gray-900">{impact.title}</h2>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">{impact.description}</p>
                    
                    {/* Key facts */}
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h3 className="text-sm uppercase text-gray-500 font-medium mb-3">Key Facts</h3>
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
              
              {/* Navigation controls */}
              <div className="absolute left-0 right-0 bottom-0 flex justify-between items-center mt-8 px-4">
                <button 
                  onClick={goToPrevImpact}
                  disabled={currentImpact === 1 || isTransitioning}
                  className={`p-3 rounded-full ${
                    currentImpact === 1 || isTransitioning
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-red-100 text-red-600 hover:bg-red-200 transition-colors'
                  }`}
                >
                  <ArrowLeft size={24} />
                </button>
                
                <div className="text-gray-500 text-sm">
                  {currentImpact} / {impacts.length}
                </div>
                
                <button 
                  onClick={goToNextImpact}
                  disabled={currentImpact === 5 || isTransitioning}
                  className={`p-3 rounded-full ${
                    currentImpact === 5 || isTransitioning
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
        
        {/* Research Highlights section */}
        <section className="relative z-10 py-8 mt-12">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Latest Research Findings</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  2024 Study
                </div>
                <h3 className="text-xl font-bold mb-3">Blood-Brain Barrier Penetration</h3>
                <p className="text-gray-700">
                  Researchers demonstrated that nano-sized plastic particles can cross the blood-brain barrier, potentially affecting neural function and behavior. Lab studies showed behavioral changes in animals exposed to polystyrene nanoparticles.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  2023 Study
                </div>
                <h3 className="text-xl font-bold mb-3">Soil Microbial Disruption</h3>
                <p className="text-gray-700">
                  Microplastics alter soil microbial communities, with research showing a 30% reduction in bacterial diversity in contaminated soils. This disruption affects nutrient cycling and may reduce agricultural productivity.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  2024 Study
                </div>
                <h3 className="text-xl font-bold mb-3">Immune System Activation</h3>
                <p className="text-gray-700">
                  Human studies reveal that microplastics trigger inflammatory responses in the immune system. Chronic exposure has been linked to increased cytokine production, potentially contributing to systemic inflammation.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  2023 Study
                </div>
                <h3 className="text-xl font-bold mb-3">Carbon Cycle Disruption</h3>
                <p className="text-gray-700">
                  Microplastics may be affecting climate systems by altering ocean carbon sequestration. Research indicates that plastic-laden plankton have reduced carbon capture capacity, potentially reducing ocean carbon sink effectiveness.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to action section */}
        <section className="relative z-10 py-16 bg-gradient-to-r from-red-50 to-red-100 mt-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">What Can We Do About Microplastics?</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              While the challenges are significant, there are steps we can take individually and collectively to reduce microplastic pollution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/solutions" className="px-6 py-3 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-colors shadow-md hover:shadow-lg">
                Explore Solutions
              </Link>
              <Link href="/types" className="px-6 py-3 bg-white text-red-600 font-medium rounded-full border border-red-600 hover:bg-red-50 transition-colors shadow-md hover:shadow-lg">
                Learn About Plastic Types
              </Link>
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