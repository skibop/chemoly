// 'use client'

// import Link from "next/link"
// import { useEffect, useRef, useState } from "react"
// import { ChevronDown, ArrowRight, Recycle, Info, Leaf, Droplet, Factory } from "lucide-react"

// export default function Plastic1() {
//   const [scrollY, setScrollY] = useState(0);
//   const [typesDropdownOpen, setTypesDropdownOpen] = useState(false);
//   const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//    // Mobile menu state
//    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activePlastic, setActivePlastic] = useState(1);
//   const [isVisible, setIsVisible] = useState({
//     hero: true, // Set to true by default so it's visible immediately
//     plastics: false
//   });
//   const handleMouseEnterDropdown = () => {
//     if (closeTimeoutRef.current) {
//       clearTimeout(closeTimeoutRef.current); // Cancel any pending close timeout
//     }
//     setTypesDropdownOpen(true);
//   };

//   const handleMouseLeaveDropdown = () => {
//     closeTimeoutRef.current = setTimeout(() => {
//       setTypesDropdownOpen(false);
//     }, 100); // Delay closing by 100ms
//   };


//   // Animation for plastic items appearing
//   const [visiblePlastics, setVisiblePlastics] = useState<number[]>([]);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
      
//       // Check visibility for each section
//       setIsVisible({
//         hero: true, // Always visible
//         plastics: window.scrollY > 300
//       });
//     };

//     window.addEventListener("scroll", handleScroll);
    
//     // Initialize visibility for first section - removed the setTimeout since hero is always visible
//     // setTimeout(() => {
//     //   setIsVisible(prev => ({...prev, hero: true}));
//     // }, 300);

//     // Staggered animation for plastic items
//     const animatePlastics = () => {
//       for (let i = 1; i <= 8; i++) {
//         setTimeout(() => {
//           setVisiblePlastics(prev => [...prev, i]);
//         }, 200 * i);
//       }
//     };
    
//     // Start the animation sooner
//     setTimeout(animatePlastics, 300);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//     return (
//     <div className="flex flex-col min-h-screen bg-white text-gray-900 overflow-x-hidden">
//         {/* Header with navigation - now sticky with transparency on scroll */}
//         <header className="w-full fixed top-0 z-50 bg-white bg-opacity-90 backdrop-blur-md shadow-lg transition-all duration-300">
//           <div className="container mx-auto px-4">
//             <nav className="flex items-center justify-center py-4"> {/* Changed justify-between to justify-center */}      
//               {/* Desktop Navigation */}
//               <div className="hidden md:flex space-x-1">
//                 <Link href="/" className="px-4 py-2 hover:text-red-600 transition-colors font-medium rounded-md hover:bg-red-50">
//                   HOME
//                 </Link>
                
//                 {/* Types of Plastics dropdown */}
//                 <div className="relative" onMouseEnter={handleMouseEnterDropdown} onMouseLeave={handleMouseLeaveDropdown}>
//                   <Link href="/types" className="px-4 py-2 hover:text-red-600 transition-colors font-medium rounded-md hover:bg-red-50 flex items-center">
//                     TYPES OF PLASTICS
//                     <ChevronDown className="ml-1 h-4 w-4" />
//                   </Link>
                  
//                   {/* Dropdown menu with modern styling */}
//                   {typesDropdownOpen && (
//                     <div className="absolute left-0 mt-2 w-56 rounded-xl shadow-xl bg-white border border-red-100 overflow-hidden z-50 transition-all duration-300 ease-out transform origin-top-left">
//                       <div className="py-1" role="menu" aria-orientation="vertical">
//                         <Link href="/types/plastic-1" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
//                           Plastic #1 - PET
//                         </Link>
//                         <Link href="/types/plastic-2" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
//                           Plastic #2 - HDPE
//                         </Link>
//                         <Link href="/types/plastic-3" className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
//                           Plastic #3 - PVC
//                         </Link>
//                       </div>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Other main navigation links */}
//                 <Link href="/formation" className="px-4 py-2 hover:text-red-600 transition-colors font-medium rounded-md hover:bg-red-50">
//                   PLASTIC FORMATION
//                 </Link>
//                 <Link href="/environmental" className="px-4 py-2 hover:text-red-600 transition-colors font-medium rounded-md hover:bg-red-50">
//                   ENVIRONMENTAL EFFECTS
//                 </Link>
//                 <Link href="/solutions" className="px-4 py-2 hover:text-red-600 transition-colors font-medium rounded-md hover:bg-red-50">
//                   SOLUTIONS
//                 </Link>
//                 <Link href="/citations" className="px-4 py-2 hover:text-red-600 transition-colors font-medium rounded-md hover:bg-red-50">
//                   CITATIONS
//                 </Link>
//               </div>
            
//             </nav>
//           </div>
          
//           {/* Mobile Navigation Overlay */}
//           {mobileMenuOpen && (
//             <div className="md:hidden absolute top-full left-0 right-0 bg-white bg-opacity-95 backdrop-blur-md shadow-lg border-t border-red-100 py-4 z-50 animate-fade-in">
//               <div className="container mx-auto px-4 flex flex-col space-y-2">
//                 <Link 
//                   href="/" 
//                   className="px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   HOME
//                 </Link>
//                 <Link 
//                   href="/types" 
//                   className="px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   TYPES OF PLASTICS
//                 </Link>
//                 <Link 
//                   href="/formation" 
//                   className="px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   PLASTIC FORMATION
//                 </Link>
//                 <Link 
//                   href="/environmental" 
//                   className="px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   ENVIRONMENTAL EFFECTS
//                 </Link>
//                 <Link 
//                   href="/solutions" 
//                   className="px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   SOLUTIONS
//                 </Link>
//                 <Link 
//                   href="/citations" 
//                   className="px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   CITATIONS
//                 </Link>
//               </div>
//             </div>
//           )}
//         </header>
//         <div className="flex flex-col min-h-screen bg-white text-gray-900 overflow-x-hidden">
//             {/* Header */}
//             <header className="w-full bg-red-600 text-white pt-32 pb-16 shadow-md">
//                 <div className="container mx-auto px-4 text-center">
//                     <h1 className="text-6xl font-bold">PET</h1>
//                      <p className="text-xl mt-4">Polyethylene Terephthalate</p>
//                 </div>
//             </header>

//             {/* Main Content */}
//             <main className="container mx-auto px-4 py-8 space-y-12">
//                 {/* Chemical Structure and Formation Reaction */}
//                 <section className="space-y-4">
//                     <h2 className="text-xl font-semibold text-red-600">Chemical Structure and Formation Reaction</h2>
//                     <p>
//                         Polyethylene Terephthalate (PET) is a polymer formed by the condensation reaction of ethylene glycol and terephthalic acid. 
//                         Its chemical structure consists of repeating units of ester groups, making it lightweight, strong, and transparent.
//                     </p>
//                 </section>

//                 {/* Potential Concerns */}
//                 <section className="space-y-4">
//                     <h2 className="text-xl font-semibold text-red-600">Potential Concerns</h2>
//                     <p>
//                         PET is generally considered safe for single use, but repeated use may lead to leaching of harmful chemicals such as antimony, 
//                         a catalyst used in its production. Additionally, the production process is energy-intensive and contributes to greenhouse gas emissions.
//                     </p>
//                 </section>

//                 {/* Processing After Use and Environmental Impact */}
//                 <section className="space-y-4">
//                     <h2 className="text-xl font-semibold text-red-600">Processing After Use and Environmental Impact</h2>
//                     <p>
//                         PET is widely recycled and often processed into polyester fibers for clothing, carpeting, or new containers. However, improper disposal 
//                         can lead to ocean pollution, where it breaks down into microplastics, harming marine life and entering the food chain.
//                     </p>
//                 </section>

//                 {/* Biodegradability */}
//                 <section className="space-y-4">
//                     <h2 className="text-xl font-semibold text-red-600">Biodegradability</h2>
//                     <p>
//                         PET is not biodegradable and can persist in the environment for hundreds of years. While recycling mitigates its impact, 
//                         the low biodegradability of PET remains a significant environmental concern.
//                     </p>
//                 </section>
//             </main>

//             {/* Footer */}
//             <footer className="w-full bg-gray-100 py-4">
//                 <div className="container mx-auto px-4 text-center text-sm text-gray-600">
//                     © 2025 Chemoly. All rights reserved.
//                 </div>
//             </footer>
//         </div>
//     </div>
//     );
    