'use client'

import Link from "next/link"
import { useState, useRef } from "react"
import { Menu, X } from "lucide-react"

export default function Citations() {
  const [scrollY, setScrollY] = useState(0);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [typesDropdownOpen, setTypesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                </Link>
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
              <Link href="/citations" className="px-4 py-2 text-red-600 transition-colors font-medium rounded-md bg-red-50">
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
                className="px-4 py-3 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                SOLUTIONS
              </Link>
              <Link 
                href="/citations" 
                className="px-4 py-3 bg-red-50 text-red-600 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                CITATIONS
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-8 text-gray-900 relative inline-block">
              Bibliography
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-red-600 rounded-full"></span>
            </h1>
            
            <div className="space-y-6 mt-10">
              {/* Citations List */}
              <div className="bg-white rounded-xl p-8 shadow-md">
                <ul className="space-y-6">
                  <li className="border-b border-gray-100 pb-6">
                    <p className="text-gray-800">US EPA, O. Sustainable Management of Plastics. www.epa.gov. https://www.epa.gov/plastics.</p>
                  </li>
                  
                  <li className="border-b border-gray-100 pb-6">
                    <p className="text-gray-800">Li, Y.; Tao, L.; Wang, Q.; Wang, F.; Li, G.; Song, M. Potential Health Impact of Microplastics: A Review of Environmental Distribution, Human Exposure, and Toxic Effects. Environment & Health 2023, 1 (4). https://doi.org/10.1021/envhealth.3c00052.</p>
                  </li>
                  
                  <li className="border-b border-gray-100 pb-6">
                    <p className="text-gray-800">National Oceanic and Atmospheric Administration. What are microplastics? Noaa.gov. https://oceanservice.noaa.gov/facts/microplastics.html.</p>
                  </li>
                  
                  <li className="border-b border-gray-100 pb-6">
                    <p className="text-gray-800">Lewis, J. 10 Scientific Solutions to Plastic Pollution. Earth.org. https://earth.org/scientific-solutions-to-plastic-pollution/.</p>
                  </li>
                  
                  <li className="border-b border-gray-100 pb-6">
                    <p className="text-gray-800">Lai, O. A French Start-Up Is Using Enzyme to Breakdown and Recycle PET Plastic. Earth.org. https://earth.org/a-french-start-up-is-using-enzyme-to-breakdown-and-recycle-pet-plastic/.</p>
                  </li>
                  
                  <li className="border-b border-gray-100 pb-6">
                    <p className="text-gray-800">Kang, J.; Zhou, L.; Duan, X.; Sun, H.; Ao, Z.; Wang, S. Degradation of Cosmetic Microplastics via Functionalized Carbon Nanosprings. Matter 2019, 1 (3), 745–758. https://doi.org/10.1016/j.matt.2019.06.004.</p>
                  </li>
                  
                  <li className="border-b border-gray-100 pb-6">
                    <p className="text-gray-800">EPA. National Strategy to Prevent Plastic Pollution | US EPA. US EPA. https://www.epa.gov/circulareconomy/national-strategy-prevent-plastic-pollution.</p>
                  </li>
                  
                  <li className="border-b border-gray-100 pb-6">
                    <p className="text-gray-800">Microplastics from Synthetic Clothing: Exposure Pathways and Health Impacts. Oasishealth.app. https://www.oasishealth.app/blog/microplastics_clothing (accessed 2025-05-20).</p>
                  </li>
                  
                  <li className="border-b border-gray-100 pb-6">
                    <p className="text-gray-800">Bergeson, A. R.; Silvera, A. J.; Alper, H. S. Bottlenecks in Biobased Approaches to Plastic Degradation. Nature Communications 2024, 15 (1). https://doi.org/10.1038/s41467-024-49146-8.</p>
                  </li>
                  
                  <li className="border-b border-gray-100 pb-6">
                    <p className="text-gray-800">Enzymatic biodegradation. Carbios. https://www.carbios.com/en/enzymatic-biodegradation/.</p>
                  </li>
                  
                  <li className="border-b border-gray-100 pb-6">
                    <p className="text-gray-800">The Ocean Cleanup. Oceans | The Ocean Cleanup. The Ocean Cleanup. https://theoceancleanup.com/oceans/.</p>
                  </li>
                  
                  <li className="border-b border-gray-100 pb-6">
                    <p className="text-gray-800">Evoware. EVOWARE. Evoware.id. https://www.evoware.id/.</p>
                  </li>
                  
                  <li className="border-b border-gray-100 pb-6">
                    <p className="text-gray-800">Samsara Eco strikes recycling "breakthrough." Theaustralian.com.au. https://www.theaustralian.com.au/business/technology/samsara-eco-strikes-recycling-breakthrough-turning-more-plastics-into-clothes/news-story/b14f383c98ba3e3fbc636cf9a2708cd3.</p>
                  </li>
                  
                  <li className="border-b border-gray-100 pb-6">
                    <p className="text-gray-800">Balode, E. What is Biotransformation? Polymateria Ltd. https://www.polymateria.com/about-us/what-is-biotransformation/.</p>
                  </li>
                  
                  <li className="border-b border-gray-100 pb-6">
                    <p className="text-gray-800">Guest Contributor. DRC gets first waste plastic-to-energy pyrolysis plant. Power Engineering International. https://www.powerengineeringint.com/renewables/drc-gets-first-waste-plastic-to-energy-pyrolysis-plant/ (accessed 2025-05-20).</p>
                  </li>
                  
                  <li className="border-b border-gray-100 pb-6">
                    <p className="text-gray-800">Saha, S. C.; Saha, G. Effect of Microplastics Deposition on Human Lung Airways: A Review with Computational Benefits and Challenges. Heliyon 2024, 10 (2), e24355. https://doi.org/10.1016/j.heliyon.2024.e24355.</p>
                  </li>
                  
                  <li className="border-b border-gray-100 pb-6">
                    <p className="text-gray-800">Bule Možar, K.; Miloloža, M.; Martinjak, V.; Cvetnić, M.; Kušić, H.; Bolanča, T.; Kučić Grgić, D.; Ukić, Š. Potential of Advanced Oxidation as Pretreatment for Microplastics Biodegradation. Separations 2023, 10 (2), 132. https://doi.org/10.3390/separations10020132.</p>
                  </li>
                  
                  <li className="border-b border-gray-100 pb-6">
                    <p className="text-gray-800">Spencer, B. Microplastics have made it into our brains. Should we be worried? Thetimes.com. https://www.thetimes.com/uk/science/article/microplastics-in-brain-should-we-worry-fv7pbk6qx.</p>
                  </li>
                  
                  <li className="border-b border-gray-100 pb-6">
                    <p className="text-gray-800">Fionn Ferreira. www.fionnferreira.com. https://www.fionnferreira.com/.</p>
                  </li>
                  
                  <li className="pb-2">
                    <p className="text-gray-800">Coffin, S.; Wyer, H.; Leapman, J. C. Addressing the Environmental and Health Impacts of Microplastics Requires Open Collaboration between Diverse Sectors. PLOS Biology 2021, 19 (3), e3000932. https://doi.org/10.1371/journal.pbio.3000932.</p>
                  </li>

                  <li className="pb-2">
                    <p className="text-gray-800">Guo, Z.; Wu, J.; Wang, J.-H. Chemical Degradation and Recycling of Polyethylene Terephthalate (PET): A Review. RSC Sustainability 2025. https://doi.org/10.1039/d4su00658e.</p>
                  </li>

                  <li className="pb-2">
                    <p className="text-gray-800">Samak, N. A.; Jia, Y.; Sharshar, M. M.; Mu, T.; Yang, M.; Peh, S.; Xing, J. Recent Advances in Biocatalysts Engineering for Polyethylene Terephthalate Plastic Waste Green Recycling. Environment International 2020, 145, 106144. https://doi.org/10.1016/j.envint.2020.106144.</p>
                  </li>

                  <li className="pb-2">
                    <p className="text-gray-800">Zhang, J.; Hirschberg, V.; Goecke, A.; Wilhelm, M.; Yu, W.; Orfgen, M.; Rodrigue, D. Effect of Mechanical Recycling on Molecular Structure and Rheological Properties of High-Density Polyethylene (HDPE). Polymer 2024, 297, 126866-126866. https://doi.org/10.1016/j.polymer.2024.126866.</p>
                  </li>

                  <li className="pb-2">
                    <p className="text-gray-800">Das, S.; Lizon, F.; François Gevaert; Capucine Bialais; Duong, G.; Baghdad Ouddane; Sami Souissi. Assessing Indicators of Arsenic Toxicity Using Variable Fluorescence in a Commercially Valuable Microalgae: Physiological and Toxicological Aspects. Journal of Hazardous Materials 2023, 452, 131215-131215. https://doi.org/10.1016/j.jhazmat.2023.131215.</p>
                  </li>

                  <li className="pb-2">
                    <p className="text-gray-800">Lu, L.; Li, W.; Cheng, Y.; Liu, M. Chemical Recycling Technologies for PVC Waste and PVC-Containing Plastic Waste: A Review. Waste Management 2023, 166, 245-258. https://doi.org/10.1016/j.wasman.2023.05.012.</p>
                  </li>

                  <li className="pb-2">
                    <p className="text-gray-800">Tian, Y.; Han, M.; Gu, D.; Bi, Z.; Gu, N.; Hu, T.; Li, G.; Zhang, N.; Lu, J. PVC Dechlorination for Facilitating Plastic Chemical Recycling: A Systematic Literature Review of Technical Advances, Modeling and Assessment. Sustainability 2024, 16 (19), 8331-8331. https://doi.org/10.3390/su16198331.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-red-50 border-t border-red-100 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-700 mb-2">Designed and Developed by Ankit Kale, Sreeram Vuppala, and Abhiram Kuuram</p>
          <p>South Brunswick High School Team A, 2025</p>
        </div>
      </footer>

      {/* Enhanced Custom CSS */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
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