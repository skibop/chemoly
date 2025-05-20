'use client'

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ChevronDown, Recycle, Info, Leaf, Droplet, Factory } from "lucide-react"

export default function Types() {
  const [_scrollY, setScrollY] = useState(0);
  const [typesDropdownOpen, setTypesDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
   // Mobile menu state
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePlastic, setActivePlastic] = useState(1);
  const [isVisible, setIsVisible] = useState({
    hero: true, // Set to true by default so it's visible immediately
    plastics: false
  });
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
    
    // Initialize visibility for first section - removed the setTimeout since hero is always visible
    // setTimeout(() => {
    //   setIsVisible(prev => ({...prev, hero: true}));
    // }, 300);

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

  const plasticTypes = [
    {
      id: 1,
      code: "PETE",
      name: "Polyethylene Terephthalate",
      color: "bg-red-600",
      textColor: "text-white",
      description: "Commonly used for water and soda bottles, food jars, and some clothing fibers. PETE is lightweight, strong, and commonly recycled. While generally considered safe for single use, repeated use may lead to bacterial growth or chemical leaching.",
      properties: ["Transparent", "Lightweight", "Gas & moisture barrier", "Recyclable", "Strong"],
      uses: ["Beverage bottles", "Food containers", "Polyester fibers", "Microwavable food trays", "Packaging"],
      recycling: "Widely recycled; typically processed into polyester fibers for clothing, carpeting, or new containers.",
      environmental: "One of the most recycled plastics, but still contributes to ocean pollution when improperly disposed."
    },
    {
      id: 2,
      code: "HDPE",
      name: "High-Density Polyethylene",
      color: "bg-red-500",
      textColor: "text-white",
      description: "A versatile plastic with excellent chemical resistance and strength-to-density ratio. HDPE is commonly used for milk jugs, detergent bottles, and toys. It's considered one of the safer plastic types and is readily recyclable in most municipal programs.",
      properties: ["Opaque", "Excellent chemical resistance", "Rigid", "Temperature resistant", "Lightweight"],
      uses: ["Milk jugs", "Detergent bottles", "Toys", "Shampoo bottles", "Pipe systems"],
      recycling: "Highly recyclable; typically converted into plastic lumber, trash cans, or new containers.",
      environmental: "Less energy-intensive to produce than some plastics and widely recycled, reducing environmental impact."
    },
    {
      id: 3,
      code: "PVC",
      name: "Polyvinyl Chloride",
      color: "bg-red-400",
      textColor: "text-gray-900",
      description: "Known for durability and resistance to weathering, PVC is commonly used in construction, medical devices, and some food packaging. However, it contains chlorine and potentially harmful additives like phthalates, raising health and environmental concerns.",
      properties: ["Durable", "Weather resistant", "Chemical resistant", "Versatile", "Fire-resistant"],
      uses: ["Pipes & fittings", "Medical tubing", "Wire insulation", "Window frames", "Credit cards"],
      recycling: "Difficult to recycle due to additives; limited recycling infrastructure compared to other types.",
      environmental: "Production and disposal can release toxic chemicals; dioxins may form if incinerated."
    },
    {
      id: 4,
      code: "LDPE",
      name: "Low-Density Polyethylene",
      color: "bg-red-300",
      textColor: "text-gray-900",
      description: "A flexible plastic with good transparency and low reactivity. LDPE is commonly used for plastic bags, shrink wrap, and squeeze bottles. It's considered relatively safe for food contact but is less commonly recycled than PETE or HDPE.",
      properties: ["Flexible", "Transparent", "Low melting point", "Good chemical resistance", "Waterproof"],
      uses: ["Plastic bags", "Shrink wrap", "Squeeze bottles", "Six-pack rings", "Coatings for paper"],
      recycling: "Less commonly recycled curbside, but collection programs are increasing for items like grocery bags.",
      environmental: "Often becomes litter due to lightweight nature; contributes to microplastic pollution."
    },
    {
      id: 5,
      code: "PP",
      name: "Polypropylene",
      color: "bg-red-200",
      textColor: "text-gray-900",
      description: "A versatile plastic with high heat resistance, PP is commonly used for food containers, medicine bottles, and automotive parts. It's considered one of the safer plastics for food contact and is increasingly being accepted in recycling programs.",
      properties: ["Heat resistant", "Tough", "Good chemical resistance", "Flexible", "Fatigue resistant"],
      uses: ["Yogurt containers", "Medicine bottles", "Bottle caps", "Automotive parts", "Microwave-safe containers"],
      recycling: "Increasingly recyclable; can be processed into industrial fiber or plastic parts.",
      environmental: "Lower environmental impact in production compared to some plastics; growing recycling rates."
    },
    {
      id: 6,
      code: "PS",
      name: "Polystyrene",
      color: "bg-red-100",
      textColor: "text-gray-900",
      description: "Available in rigid or foam forms (Styrofoam), PS is used for food containers, protective packaging, and disposable utensils. It may leach styrene, particularly when heated, and is challenging to recycle, making it a concern for environmental and health advocates.",
      properties: ["Rigid or foam", "Insulating", "Lightweight", "Inexpensive", "Brittle"],
      uses: ["Foam packaging", "Disposable cups & containers", "CD cases", "Insulation", "Laboratory ware"],
      recycling: "Difficult to recycle; limited infrastructure and high costs of processing.",
      environmental: "Persists in environment for hundreds of years; often becomes litter and breaks into microplastics."
    },
    {
      id: 7,
      code: "OTHER",
      name: "Other Plastics",
      color: "bg-gray-200",
      textColor: "text-gray-900",
      description: "This category includes plastics that don't fit into the other six categories, including polycarbonate, acrylic, nylon, and bioplastics. These have varying properties, uses, and safety profiles. Many are difficult to recycle in conventional programs.",
      properties: ["Varies by specific type", "Often specialized applications", "Diverse characteristics", "May contain BPA or other concerns"],
      uses: ["Electronics", "Medical devices", "Specialty applications", "Multi-layer packaging"],
      recycling: "Generally not recyclable in most municipal programs; requires specialized handling.",
      environmental: "Environmental impact varies widely depending on specific plastic type."
    },
    {
      id: 7.1,
      code: "PMMA",
      name: "Poly(methyl Methacrylate)",
      color: "bg-gray-300",
      textColor: "text-gray-900",
      description: "Better known as acrylic or by the brand name Plexiglas, PMMA is a transparent thermoplastic often used as a lightweight or shatter-resistant alternative to glass. It has excellent optical clarity and weather resistance, making it ideal for outdoor applications.",
      properties: ["Excellent transparency", "Weather resistant", "UV resistant", "Rigid", "Impact resistant"],
      uses: ["Displays & signs", "Windows & shields", "Lighting fixtures", "Contact lenses", "Dentures & dental implants"],
      recycling: "Technically recyclable but not often accepted in curbside programs; specialized recycling required.",
      environmental: "Durable and long-lasting, reducing replacement frequency; can be recycled but often isn't."
    },
  ];

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
                      Heavy-Duty Plastic Bottles - HDPE
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

      {/* Main content */}
      <main className="flex-1 relative">  {/* Removed pt-20 padding-top */}
        {/* Background with overlay */}
        <div className="fixed inset-0 z-0">
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white to-white"></div>
        </div>

        {/* Hero Section - Modified to be full viewport height */}
        <section className="relative z-10 min-h-screen flex flex-col justify-center bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="container mx-auto px-6 py-16">  {/* Added py-16 for vertical padding */}
            <div className="max-w-4xl mx-auto text-center transition-all duration-1000 transform"
                 style={{opacity: isVisible.hero ? 1 : 0, transform: isVisible.hero ? 'translateY(0)' : 'translateY(50px)'}}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Types of Plastics</h1>
              <p className="text-xl leading-relaxed mb-8 text-red-100">
                Understanding the different plastic types and their properties is crucial for proper use, 
                recycling, and environmental management. Each plastic type has a resin identification code to help with sorting and recycling.
              </p>
              
              {/* Animated recycling symbol */}
              <div className="flex justify-center mb-8">
                <div className="animate-spin-slow">
                  <Recycle size={64} className="text-white" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {[1, 2, 3, 4, 5, 6, 7].map(num => (
                  <button 
                    key={num}
                    onClick={() => {
                      setActivePlastic(num);
                      const element = document.getElementById(`plastic-${num}`);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    className={`px-4 py-3 rounded-md font-bold transition-all flex items-center justify-center
                      ${activePlastic === num ? 'bg-white text-red-600 shadow-lg scale-105' : 'bg-red-700 bg-opacity-30 text-white hover:bg-red-700 hover:bg-opacity-50'}`}
                  >
                    #{num}
                  </button>
                ))}
                <button 
                  onClick={() => {
                    setActivePlastic(7.1);
                    const element = document.getElementById(`plastic-7.1`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  className={`px-4 py-3 rounded-md font-bold transition-all flex items-center justify-center
                    ${activePlastic === 7.1 ? 'bg-white text-red-600 shadow-lg scale-105' : 'bg-red-700 bg-opacity-30 text-white hover:bg-red-700 hover:bg-opacity-50'}`}
                >
                  #7 (PMMA)
                </button>
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
        
        {/* Plastic Types Section */}
        <section className="relative z-10 py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              {plasticTypes.map((plastic, index) => (
                <div 
                  id={`plastic-${plastic.id}`}
                  key={plastic.id} 
                  className={`mb-16 transition-all duration-700 transform ${
                    visiblePlastics.includes(index + 1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                >
                  <div className="relative">
                    {/* Resin code circle */}
                    <div className={`absolute -top-8 -left-8 md:-left-16 w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center ${plastic.color} ${plastic.textColor} shadow-lg border-4 border-white z-10 plastic-number-animation`}>
                      <div className="text-center">
                        <div className="text-xl md:text-3xl font-bold">#{String(plastic.id).split('.')[0]}</div>
                        <div className="text-xs md:text-sm font-medium">{plastic.code}</div>
                      </div>
                    </div>
                    
                    {/* Main content */}
                    <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
                      {/* Header */}
                      <div className={`${plastic.color} ${plastic.textColor} p-6 pl-20 md:pl-24`}>
                        <h2 className="text-3xl font-bold">{plastic.name}</h2>
                        <div className="flex items-center mt-1">
                          <div className="text-lg font-medium">{plastic.code}</div>
                          {plastic.id.toString().includes('.') && (
                            <div className="ml-2 text-sm bg-white bg-opacity-20 px-2 py-1 rounded">Subtype of #7</div>
                          )}
                        </div>
                      </div>
                      
                      {/* Content grid */}
                      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left column */}
                        <div>
                          <div className="mb-6">
                            <h3 className="text-xl font-bold mb-3 text-red-600 flex items-center">
                              <Info className="mr-2" size={20} />
                              Description
                            </h3>
                            <p className="text-gray-700">{plastic.description}</p>
                          </div>
                          
                          <div className="mb-6">
                            <h3 className="text-xl font-bold mb-3 text-red-600 flex items-center">
                              <Leaf className="mr-2" size={20} />
                              Properties
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {plastic.properties.map((prop, i) => (
                                <span key={i} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                                  {prop}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-xl font-bold mb-3 text-red-600 flex items-center">
                              <Factory className="mr-2" size={20} />
                              Common Uses
                            </h3>
                            <ul className="list-disc pl-5 text-gray-700 space-y-1">
                              {plastic.uses.map((use, i) => (
                                <li key={i}>{use}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        {/* Right column */}
                        <div>
                          {/* Chemical structure */}
                          <div className="mb-6">
                            <h3 className="text-xl font-bold mb-3 text-red-600">Chemical Structure</h3>
                            <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-center">
                              <img 
                                src={`/images/structures/${plastic.name.toLowerCase().replace(/\s+/g, '-')}.png`} 
                                alt={`${plastic.name} chemical structure`} 
                                className="max-h-48 object-contain structure-animation"
                              />
                            </div>
                          </div>
                          
                          <div className="mb-6">
                            <h3 className="text-xl font-bold mb-3 text-red-600 flex items-center">
                              <Recycle className="mr-2" size={20} />
                              Recycling Information
                            </h3>
                            <p className="text-gray-700 mb-2">{plastic.recycling}</p>
                            <div className={`w-full h-3 rounded-full overflow-hidden ${
                              plastic.id === 1 || plastic.id === 2 ? 'bg-green-100' : 
                              plastic.id === 4 || plastic.id === 5 ? 'bg-yellow-100' : 'bg-red-100'
                            }`}>
                              <div className={`h-full ${
                                plastic.id === 1 || plastic.id === 2 ? 'bg-green-500 w-4/5' : 
                                plastic.id === 4 || plastic.id === 5 ? 'bg-yellow-500 w-2/5' : 'bg-red-500 w-1/5'
                              }`}></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {plastic.id === 1 || plastic.id === 2 ? 'Widely Recycled' : 
                                plastic.id === 4 || plastic.id === 5 ? 'Limited Recycling' : 'Rarely Recycled'}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-xl font-bold mb-3 text-red-600 flex items-center">
                              <Droplet className="mr-2" size={20} />
                              Environmental Impact
                            </h3>
                            <p className="text-gray-700">{plastic.environmental}</p>
                          </div>
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
          <p> South Brunswick High School Team A, 2025 </p>
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
        
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .shadow-glow-red {
          box-shadow: 0 0 15px rgba(220, 38, 38, 0.3);
        }
        
        .structure-animation {
          animation: fade-rotate-in 0.8s ease-out forwards;
        }
        
        .plastic-number-animation {
          animation: pulse-scale 4s ease-in-out infinite;
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
  )
}