'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { Droplets, Recycle, Factory, Leaf, ChevronDown } from "lucide-react"

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    types: false,
    manufacturing: false,
    recycling: false
  });
  
  // State for dropdown menu
  const [typesDropdownOpen, setTypesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check visibility for each section
      setIsVisible({
        hero: window.scrollY > 50,
        types: window.scrollY > 300,
        manufacturing: window.scrollY > 700,
        recycling: window.scrollY > 1100
      });
    };

    window.addEventListener("scroll", handleScroll);
    
    // Initialize visibility for first section
    setTimeout(() => {
      setIsVisible(prev => ({...prev, hero: true}));
    }, 300);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Header with navigation - now sticky with transparency on scroll */}
      <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white bg-opacity-70 backdrop-blur-sm' : 'bg-white'
      }`}>
        <nav className="container mx-auto flex justify-center py-4">
          <div className={`flex space-x-6 px-6 py-2 rounded-full ${
            scrollY > 50 ? 'bg-white bg-opacity-70' : 'bg-white bg-opacity-90'
          } border border-red-700`}>
            {/* Home link */}
            <Link href="/" className="px-4 py-2 hover:text-red-600 transition-colors font-medium">
              HOME
            </Link>
            
            {/* Types of Plastics dropdown */}
            <div className="relative" onMouseEnter={() => setTypesDropdownOpen(true)} onMouseLeave={() => setTypesDropdownOpen(false)}>
              <Link href="/types" className="px-4 py-2 hover:text-red-600 transition-colors font-medium flex items-center">
                TYPES OF PLASTICS
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              
              {/* Dropdown menu */}
              {typesDropdownOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-red-700 ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link href="/types/plastic-1" className="block px-4 py-2 text-sm text-white hover:bg-red-800 hover:text-white transition-colors">
                      Plastic #1 (PET)
                    </Link>
                    <Link href="/types/plastic-2" className="block px-4 py-2 text-sm text-white hover:bg-red-800 hover:text-white transition-colors">
                      Plastic #2 (HDPE)
                    </Link>
                    <Link href="/types/plastic-3" className="block px-4 py-2 text-sm text-white hover:bg-red-800 hover:text-white transition-colors">
                      Plastic #3 (PVC)
                    </Link>
                    <Link href="/types/plastic-4" className="block px-4 py-2 text-sm text-white hover:bg-red-800 hover:text-white transition-colors">
                      Plastic #4 (LDPE)
                    </Link>
                    <Link href="/types/plastic-5" className="block px-4 py-2 text-sm text-white hover:bg-red-800 hover:text-white transition-colors">
                      Plastic #5 (PP)
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Other main navigation links */}
            <Link href="/formation" className="px-4 py-2 hover:text-red-600 transition-colors font-medium">
              PLASTIC FORMATION
            </Link>
            <Link href="/environmental" className="px-4 py-2 hover:text-red-600 transition-colors font-medium">
              ENVIRONMENTAL EFFECTS
            </Link>
            <Link href="/solutions" className="px-4 py-2 hover:text-red-600 transition-colors font-medium">
              APPROACHES & SOLUTIONS
            </Link>
            <Link href="/citations" className="px-4 py-2 hover:text-red-600 transition-colors font-medium">
              CITATIONS
            </Link>
          </div>
        </nav>
      </header>

      {/* Main content - adjusted for fixed navbar */}
      <main className="flex-1 relative pt-20">
        {/* Background with overlay */}
        <div className="fixed inset-0 z-0">
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
          
          {/* Earth image */}
          <div className="absolute top-0 right-0 w-full md:w-2/3 h-full">
            <div className="w-full h-full relative overflow-hidden">
              <div className="absolute right-0 top-0 w-full h-full">
                <img 
                  src="/api/placeholder/800/800" 
                  alt="Earth view" 
                  className="rounded-full opacity-50 animation-rotate"
                  style={{
                    position: 'absolute',
                    top: '-25%',
                    right: '-25%',
                    width: '150%',
                    height: '150%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent"></div>
        </div>

        {/* Title section */}
        <section className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl transition-all duration-1000 transform"
                 style={{opacity: isVisible.hero ? 1 : 0, transform: isVisible.hero ? 'translateY(0)' : 'translateY(50px)'}}>
              <h1 className="text-7xl md:text-9xl font-bold mb-6 text-gray-900">
                <span className="block">Plastics</span>
                <span className="block text-red-600">Revolution</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl leading-relaxed">
                Exploring the materials that transformed modern life, their impact on our world, and sustainable futures.
              </p>
              <div className="flex space-x-4">
                <Link 
                  href="/types" 
                  className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-glow-red"
                >
                  Explore Types
                </Link>
                <Link 
                  href="/environmental" 
                  className="px-6 py-3 border border-red-500 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                >
                  Environmental Impact
                </Link>
              </div>
            </div>
          </div>
          
          {/* Animated plastic particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-400 rounded-full animate-float opacity-70" style={{animationDuration: '15s'}}></div>
            <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-red-300 rounded-full animate-float opacity-60" style={{animationDuration: '18s', animationDelay: '2s'}}></div>
            <div className="absolute top-2/3 left-1/3 w-5 h-5 bg-red-500 rounded-full animate-float opacity-50" style={{animationDuration: '20s', animationDelay: '5s'}}></div>
            <div className="absolute top-1/2 left-3/4 w-6 h-6 bg-red-200 rounded-full animate-float opacity-40" style={{animationDuration: '25s', animationDelay: '1s'}}></div>
          </div>
        </section>

        {/* Homepage Featured Content - with more subdued colors */}
        <section className="relative z-10 py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-12 text-red-600 text-center">Discover the World of Plastics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Featured Card 1 - More subdued */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden shadow-md group border border-red-100">
                <div className="h-48 bg-red-50 relative overflow-hidden">
                  <img 
                    src="/api/placeholder/400/300"
                    alt="Types of plastics" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-700 to-transparent opacity-30"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-red-800">Plastic Types</h3>
                  <p className="text-gray-700 mb-4">
                    Discover the different types of plastics, their properties, applications, and environmental impacts.
                  </p>
                  <Link href="/types" className="text-red-600 font-medium hover:text-red-700 flex items-center">
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Featured Card 2 - More subdued */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden shadow-md group border border-red-100">
                <div className="h-48 bg-red-50 relative overflow-hidden">
                  <img 
                    src="/api/placeholder/400/300"
                    alt="Plastic manufacturing" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-700 to-transparent opacity-30"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-red-800">Manufacturing Process</h3>
                  <p className="text-gray-700 mb-4">
                    Explore how plastics are created from raw materials to finished products through various techniques.
                  </p>
                  <Link href="/formation" className="text-red-600 font-medium hover:text-red-700 flex items-center">
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Featured Card 3 - More subdued */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden shadow-md group border border-red-100">
                <div className="h-48 bg-red-50 relative overflow-hidden">
                  <img 
                    src="/api/placeholder/400/300"
                    alt="Environmental solutions" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-700 to-transparent opacity-30"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-red-800">Sustainable Solutions</h3>
                  <p className="text-gray-700 mb-4">
                    Discover innovative approaches to plastic waste management and sustainable alternatives.
                  </p>
                  <Link href="/solutions" className="text-red-600 font-medium hover:text-red-700 flex items-center">
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative z-10 py-20 bg-red-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 text-red-800">Ready to Learn More?</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
              Explore our comprehensive guides on plastic types, formation processes, environmental impacts, and sustainable solutions.
            </p>
            <Link href="/types" className="px-8 py-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-glow-red text-lg font-medium">
              Start Exploring
            </Link>
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
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(220, 38, 38, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(220, 38, 38, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .animation-rotate {
          animation: rotate 120s linear infinite;
        }
        
        .shadow-glow-red {
          box-shadow: 0 0 15px rgba(220, 38, 38, 0.3);
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}