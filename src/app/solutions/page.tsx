'use client'

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ChevronDown, MapPin, ArrowRight, Recycle, Info, Leaf, Droplet, Factory, Globe, Menu, X } from "lucide-react"

export default function Solutions() {
  const [scrollY, setScrollY] = useState(0);
  const [typesDropdownOpen, setTypesDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSolution, setActiveSolution] = useState("epa");
  const [isVisible, setIsVisible] = useState({
    hero: true,
    map: false,
    details: false
  });
  
  const handleMouseEnterDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setTypesDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setTypesDropdownOpen(false);
    }, 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check visibility for each section
      setIsVisible({
        hero: true,
        map: window.scrollY > 200,
        details: window.scrollY > 600
      });
    };

    window.addEventListener("scroll", handleScroll);
    
    // Initialize visibility for sections with some delay
    setTimeout(() => {
      setIsVisible(prev => ({...prev, map: true}));
    }, 500);
    
    setTimeout(() => {
      setIsVisible(prev => ({...prev, details: true}));
    }, 800);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Solution data
  const solutions = {
    epa: {
      id: "epa",
      name: "EPA's Approach to Plastic Pollution",
      country: "United States",
      coordinates: { x: 25, y: 38 },
      color: "bg-blue-600",
      textColor: "text-white",
      icon: <Factory size={24} />,
      description: "Targets the entire plastic lifecycle, from production to end-of-life with a comprehensive strategy.",
      keyPoints: [
        "Reduce pollution from production",
        "Innovate product and material design",
        "Decrease overall plastic waste generation",
        "Improve waste collection, sorting, and recycling systems",
        "Enhance removal of existing pollution from environments",
        "Protect waterways and oceans from plastic contamination"
      ],
      details: "Aims to build a circular economy that keeps materials in use longer and reduces waste. Sets a goal to eliminate plastic waste release into the environment by 2040. Promotes multi-sector collaboration with governments, businesses, academia, NGOs, and the public. Builds on the National Recycling Strategy and incorporates input from over 92,000 public comments.",
      pros: [
        "Comprehensive coverage across the full lifecycle of plastic products",
        "Stimulates innovation in biodegradable materials and reusable designs",
        "Broad stakeholder involvement increases buy-in and diverse perspectives",
        "Long-term goal (2040) allows time for gradual, systemic change",
        "Supports circular economy development for sustainable material use"
      ],
      cons: [
        "Complex to coordinate across different agencies, sectors, and jurisdictions",
        "High cost and infrastructure needs may burden smaller communities",
        "Voluntary elements may not lead to consistent national results",
        "Potential industry pushback could delay or weaken implementation",
        "Limited international reach—U.S.-based strategy may not address global plastic flows"
      ]
    },
    nasa: {
      id: "nasa",
      name: "NASA: Detecting Concentrations of Ocean Plastic",
      country: "United States",
      coordinates: { x: 23, y: 39 },
      color: "bg-blue-500",
      textColor: "text-white",
      icon: <Globe size={24} />,
      description: "Uses satellite technology to detect and track plastic pollution concentrations in the ocean.",
      keyPoints: [
        "Employs the Cyclone Global Navigation Satellite System (CYGNSS)",
        "Monitors surface roughness of water to distinguish plastic from natural materials",
        "Provides real-time data on plastic movement",
        "Enhances understanding of how plastic travels across oceans",
        "Supports cleanup planning and response efforts"
      ],
      details: "The Cyclone Global Navigation Satellite System helps monitor the surface roughness of the water, which helps distinguish plastic from natural materials. This provides real-time data on plastic movement, aiding in cleanup planning and response, especially near coasts and river mouths. The aim is to support efforts to clean the sea and protect marine ecosystems.",
      pros: [
        "Accurate remote sensing enables broad, continuous coverage of ocean regions",
        "Supports data-driven cleanup efforts by locating high-concentration plastic zones",
        "Helps protect aquatic life by identifying harmful debris areas early",
        "Can be integrated with other initiatives like marine patrols or ocean current models"
      ],
      cons: [
        "May require calibration and validation with on-site measurements to confirm accuracy",
        "Detects surface-level plastics only, not submerged or microplastic particles",
        "Data interpretation may be limited by ocean conditions like waves or weather",
        "Not a direct cleanup tool—must be used in conjunction with active removal strategies"
      ]
    },
    oceancleaup: {
      id: "oceancleaup",
      name: "The Ocean Cleanup",
      country: "Netherlands",
      coordinates: { x: 48, y: 35 },
      color: "bg-orange-500",
      textColor: "text-white",
      icon: <Droplet size={24} />,
      description: "Focuses on removing plastic from the Great Pacific Garbage Patch using passive systems.",
      keyPoints: [
        "Uses System 001, a 600-meter-long floating barrier",
        "Drifts with ocean currents and wind to collect debris",
        "Designed to collect both large plastics and microplastics",
        "Collected plastics are brought to shore and recycled",
        "Goal: Remove 50% of the Great Pacific Garbage Patch plastic within five years"
      ],
      details: "Operations are currently centered between Hawaii and California, with plans to scale globally. The system collects plastic waste which is then transported to land for recycling. The 600m-long floating structures are intended to contain marine debris and microplastics while relying on wind and ocean currents for movement.",
      pros: [
        "Targets one of the most concentrated zones of ocean plastic pollution",
        "Operates passively using natural currents and wind, reducing energy use",
        "System is modular and scalable for deployment in other ocean gyres",
        "Generates recycled material that can re-enter the supply chain"
      ],
      cons: [
        "Only works in high-density plastic areas, not near coastlines or in rivers",
        "Slow process—collection is limited by passive movement and ocean conditions",
        "System durability and maintenance in open ocean can be challenging",
        "Still needs support from governments and donors to scale effectively"
      ]
    },
    carbios: {
      id: "carbios",
      name: "Carbios: Enzymatic Recycling",
      country: "France",
      coordinates: { x: 47, y: 36 },
      color: "bg-blue-400",
      textColor: "text-white",
      icon: <Recycle size={24} />,
      description: "Uses enzymes to break down plastic polymers into monomers that can be reused.",
      keyPoints: [
        "Process allows plastics to be purified and recycled when mixed with other materials",
        "Particularly effective on PET plastic (bottles and textiles)",
        "Currently scaling up for industrial-level application",
        "Breaks down long chains of polymers for true circular recycling"
      ],
      details: "The process enables true circular recycling by breaking plastics back to raw components. It works even on contaminated or mixed plastic waste, where mechanical recycling fails. This reduces the need for virgin plastic production from fossil fuels and offers the potential to recycle repeatedly without degradation of material quality.",
      pros: [
        "Enables true circular recycling—breaking plastics back to raw components",
        "Works even on contaminated or mixed plastic waste",
        "Reduces the need for virgin plastic production from fossil fuels",
        "Potential to recycle repeatedly without degradation of material quality"
      ],
      cons: [
        "Currently limited to specific plastic types, such as PET",
        "Scaling the process is cost-intensive and technologically complex",
        "Energy and enzyme production costs could limit affordability",
        "Industrial adoption requires regulatory support and market incentives"
      ]
    },
    evoware: {
      id: "evoware",
      name: "Evoware: Seaweed Bioplastics",
      country: "Indonesia",
      coordinates: { x: 78, y: 50 },
      color: "bg-green-500",
      textColor: "text-white",
      icon: <Leaf size={24} />,
      description: "Produces biodegradable packaging made from seaweed, an abundant local resource.",
      keyPoints: [
        "Products include wrappers, sachets, and films that dissolve in hot water",
        "Some products are edible, completely eliminating waste",
        "Works with local seaweed farmers, promoting sustainable agriculture",
        "Indonesia produces 10 million tonnes of seaweed annually"
      ],
      details: "Evoware creates biodegradable packaging from seaweed that can dissolve in hot water and is sometimes edible. They work with local seaweed farmers, promoting sustainable agriculture and income while aiming to reduce reliance on single-use plastics in food and personal care industries.",
      pros: [
        "Uses fast-growing, renewable seaweed, reducing environmental impact",
        "Products are fully biodegradable and in some cases edible",
        "Supports local economies and empowers seaweed farming communities",
        "Ideal for single-use plastic replacements, especially in food service"
      ],
      cons: [
        "May not yet match the durability or shelf life of conventional plastics",
        "Cost of production is higher than traditional plastic alternatives",
        "Bioplastics need specific composting or disposal conditions to break down properly",
        "Still in the early stages of global scalability and awareness"
      ]
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Header with navigation */}
      <header className="w-full fixed top-0 z-50 bg-white bg-opacity-90 backdrop-blur-md shadow-lg transition-all duration-300">
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
              <Link href="/solutions" className="px-4 py-2 text-red-600 transition-colors font-medium rounded-md bg-red-50">
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
                className="px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                ENVIRONMENTAL EFFECTS
              </Link>
              <Link 
                href="/solutions" 
                className="px-4 py-3 bg-red-50 text-red-600 rounded-lg transition-colors"
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
      <main className="flex-1 relative">
        {/* Background with overlay */}
        <div className="fixed inset-0 z-0">
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white to-white"></div>
        </div>

        {/* Hero Section */}
        <section className="relative z-10 min-h-screen flex flex-col justify-center bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="container mx-auto px-6 py-16">
            <div className="max-w-4xl mx-auto text-center transition-all duration-1000 transform"
                 style={{opacity: isVisible.hero ? 1 : 0, transform: isVisible.hero ? 'translateY(0)' : 'translateY(50px)'}}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Global Plastic Solutions</h1>
              <p className="text-xl leading-relaxed mb-8 text-red-100">
                Discover innovative approaches from around the world that are addressing plastic pollution through technology, policy, and creative thinking.
              </p>
              
              {/* Animated globe icon */}
              <div className="flex justify-center mb-8">
                <div className="animate-spin-slow">
                  <Globe size={64} className="text-white" />
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                {Object.values(solutions).map((solution) => (
                  <button 
                    key={solution.id}
                    onClick={() => {
                      setActiveSolution(solution.id);
                      const element = document.getElementById('world-map');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`px-4 py-3 rounded-md font-bold transition-all flex items-center justify-center
                      ${activeSolution === solution.id ? 'bg-white text-red-600 shadow-lg scale-105' : 'bg-red-700 bg-opacity-30 text-white hover:bg-red-700 hover:bg-opacity-50'}`}
                  >
                    {solution.country}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-20 text-white fill-current">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,122.39,51.91,321.39,56.44Z" />
            </svg>
          </div>
        </section>
        
        {/* World Map Section */}
        <section id="world-map" className="relative z-10 py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto text-center mb-12 transition-all duration-1000 transform"
                 style={{opacity: isVisible.map ? 1 : 0, transform: isVisible.map ? 'translateY(0)' : 'translateY(50px)'}}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Solutions Around the World</h2>
              <p className="text-xl text-gray-600">
                Click on a location to learn more about innovative solutions to plastic pollution
              </p>
            </div>
            
            {/* World Map with clickable locations */}
            <div className="relative bg-blue-50 rounded-xl overflow-hidden shadow-lg mb-12 transition-all duration-1000 transform"
                 style={{opacity: isVisible.map ? 1 : 0, transform: isVisible.map ? 'translateY(0)' : 'translateY(50px)'}}>
              <div className="relative" style={{paddingBottom: "50%"}}>
                {/* Base world map image */}
                <div className="absolute inset-0 p-4">
                  <div className="w-full h-full bg-world-map bg-contain bg-no-repeat bg-center relative">
                    {/* Clickable location markers */}
                    {Object.values(solutions).map((solution) => (
                      <button
                        key={solution.id}
                        onClick={() => setActiveSolution(solution.id)}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 
                          ${activeSolution === solution.id ? 'scale-125 z-10' : 'scale-100 hover:scale-110'}`}
                        style={{ 
                          left: `${solution.coordinates.x}%`, 
                          top: `${solution.coordinates.y}%` 
                        }}
                      >
                        <div className={`w-12 h-12 rounded-full ${solution.color} ${solution.textColor} flex items-center justify-center shadow-lg
                          ${activeSolution === solution.id ? 'ring-4 ring-white' : ''}`}>
                          {solution.icon}
                        </div>
                        <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap 
                          font-bold text-xs px-2 py-1 rounded-md ${solution.color} ${solution.textColor} shadow-md`}>
                          {solution.country}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-red-600 to-red-500 py-4 px-6 text-white">
                <div className="text-center text-sm md:text-base">
                  Each marker represents an innovative solution to plastic pollution. Click to learn more.
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Selected Solution Details */}
        <section className="relative z-10 py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto transition-all duration-1000 transform"
                 style={{opacity: isVisible.details ? 1 : 0, transform: isVisible.details ? 'translateY(0)' : 'translateY(50px)'}}>
              
              {/* Active solution details */}
              {Object.values(solutions).map((solution) => (
                <div 
                  key={solution.id}
                  className={`transition-all duration-500 ${activeSolution === solution.id ? 'opacity-100' : 'hidden opacity-0'}`}
                >
                  <div className="relative">
                    {/* Solution header */}
                    <div className={`${solution.color} rounded-t-lg p-8 text-white`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-3xl font-bold mb-2">{solution.name}</h2>
                          <div className="flex items-center">
                            <MapPin size={18} className="mr-2" />
                            <span className="text-lg">{solution.country}</span>
                          </div>
                        </div>
                        <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                            <div className={`w-12 h-12 ${solution.color} rounded-full flex items-center justify-center`}>
                              {solution.icon}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Solution content */}
                    <div className="bg-white rounded-b-lg shadow-lg p-8">
                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4 text-gray-900">Overview</h3>
                        <p className="text-gray-700 text-lg mb-6">{solution.description}</p>
                        
                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                          <h4 className="text-lg font-bold mb-4 text-gray-900">Key Points</h4>
                          <ul className="space-y-2">
                            {solution.keyPoints.map((point, index) => (
                              <li key={index} className="flex items-start">
                                <ArrowRight size={18} className="text-red-600 mt-1 mr-2 flex-shrink-0" />
                                <span className="text-gray-700">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <p className="text-gray-700">{solution.details}</p>
                      </div>
                      
                      {/* Pros and Cons */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                          <h3 className="text-xl font-bold mb-4 text-green-700 flex items-center">
                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            Advantages
                          </h3>
                          <ul className="space-y-3">
                            {solution.pros.map((pro, index) => (
                              <li key={index} className="flex items-start">
                                <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                                  <span className="block w-2 h-2 bg-green-600 rounded-full"></span>
                                </div>
                                <span className="text-gray-700">{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-red-50 rounded-lg p-6 border border-red-100">
                          <h3 className="text-xl font-bold mb-4 text-red-700 flex items-center">
                            <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                            Limitations
                          </h3>
                          <ul className="space-y-3">
                            {solution.cons.map((con, index) => (
                              <li key={index} className="flex items-start">
                                <div className="bg-red-100 rounded-full p-1 mr-3 mt-1">
                                  <span className="block w-2 h-2 bg-red-600 rounded-full"></span>
                                </div>
                                <span className="text-gray-700">{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="relative z-10 bg-red-50 border-t border-red-100 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-700 mb-2">Designed and Developed by Ankit Kale, Sreeram Vuppala, and Abhiram Kuuram</p>
          <p>South Brunswick High School Team A, 2025</p>
        </div>
      </footer>

      {/* Custom CSS */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes fade-rotate-in {
          from { opacity: 0; transform: rotate(-10deg) scale(0.9); }
          to { opacity: 1; transform: rotate(0) scale(1); }
        }
        
        @keyframes slide-up-fade {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(220, 38, 38, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(220, 38, 38, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .bg-world-map {
          background-image: url('/world-map.svg');
        }
        
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        
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
  );
}