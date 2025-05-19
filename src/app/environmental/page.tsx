'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowDown, ArrowUp, Info, Droplets, Wind, Zap, Heart } from 'lucide-react'

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

export default function MicroplasticsImpactPage(): React.JSX.Element {
  const [activePanel, setActivePanel] = useState<number | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Check screen size
  useEffect(() => {
    const handleResize = (): void => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Scroll to active panel
  useEffect(() => {
    if (activePanel !== null && panelRefs.current[activePanel]) {
      panelRefs.current[activePanel]?.scrollIntoView({
        behavior: 'smooth',
        block: isSmallScreen ? 'start' : 'center'
      });
    }
  }, [activePanel, isSmallScreen]);

  // Toggle panel
  const togglePanel = (index: number): void => {
    setActivePanel(activePanel === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-teal-500 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Microplastics: <span className="text-teal-200">The Invisible Threat</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            How tiny plastic particles affect our environment and human health across ecosystems worldwide
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto py-12 px-4">
        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Understanding the Problem</h2>
            <p className="text-lg mb-6">
              Microplastics—plastic particles smaller than 5mm—are now found everywhere on Earth, from the deepest ocean trenches to mountain peaks. These tiny fragments come from the breakdown of larger plastics and from products designed to contain them, like exfoliating beads in cosmetics. As their prevalence grows, so does our understanding of their widespread impacts.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded-lg">
                <span className="block text-3xl font-bold text-blue-600">5.25T</span>
                <span className="text-sm">Plastic pieces in oceans</span>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <span className="block text-3xl font-bold text-green-600">24.4T</span>
                <span className="text-sm">Microplastics in land ecosystems</span>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <span className="block text-3xl font-bold text-purple-600">~2K</span>
                <span className="text-sm">Particles inhaled daily</span>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <span className="block text-3xl font-bold text-red-600">5g</span>
                <span className="text-sm">Weekly human consumption</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Impact Panels */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Impact Areas</h2>
          <p className="text-lg text-center mb-8">Click each panel to learn how microplastics affect different ecosystems and human health</p>
          
          <div className="space-y-4">
            {impacts.map((impact, index) => (
              <div 
                key={impact.id}
                ref={el => { panelRefs.current[index] = el }}
                className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                  activePanel === index 
                    ? 'shadow-lg border-blue-300' 
                    : 'shadow border-gray-200 hover:border-blue-200'
                }`}
              >
                {/* Panel Header */}
                <button 
                  onClick={() => togglePanel(index)}
                  className={`w-full p-5 flex items-center justify-between text-left transition-colors ${
                    activePanel === index ? impact.color + ' text-white' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${
                      activePanel === index ? 'bg-white/20' : impact.color + ' text-white'
                    }`}>
                      {impact.icon}
                    </div>
                    <h3 className="text-xl font-bold">{impact.title}</h3>
                  </div>
                  <div>
                    {activePanel === index ? <ArrowUp size={24} /> : <ArrowDown size={24} />}
                  </div>
                </button>

                {/* Panel Content */}
                <div 
                  className={`bg-white transition-all duration-300 overflow-hidden ${
                    activePanel === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-5 md:p-6 border-t border-gray-100">
                    <div className="md:flex gap-8">
                      {/* Main content */}
                      <div className="md:w-2/3">
                        <p className="text-lg mb-6">{impact.description}</p>
                        
                        {/* Impact visualization */}
                        <div className="mb-6 h-48 md:h-64 flex items-center justify-center">
                          <div className={`relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100`}>
                            {impact.id === 1 && (
                              <div className="relative w-full h-full">
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
                              <div className="relative w-full h-full">
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
                              <div className="relative w-full h-full">
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
                              <div className="relative w-full h-full">
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
                              <div className="relative w-full h-full">
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
                      
                      {/* Key facts */}
                      <div className="md:w-1/3 mt-4 md:mt-0">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                            <Info size={16} className="mr-1" /> Key Facts
                          </h4>
                          <ul className="space-y-2">
                            {impact.facts.map((fact, i) => (
                              <li key={i} className="flex items-start">
                                <span className={`${impact.color} rounded-full w-2 h-2 mt-2 mr-2 flex-shrink-0`}></span>
                                <span className="text-gray-700 text-sm">{fact}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Research Highlights */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Latest Research Findings</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                2024 Study
              </div>
              <h3 className="text-xl font-bold mb-3">Blood-Brain Barrier Penetration</h3>
              <p className="text-gray-700">
                Researchers demonstrated that nano-sized plastic particles can cross the blood-brain barrier, potentially affecting neural function and behavior. Lab studies showed behavioral changes in animals exposed to polystyrene nanoparticles.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                2023 Study
              </div>
              <h3 className="text-xl font-bold mb-3">Soil Microbial Disruption</h3>
              <p className="text-gray-700">
                Microplastics alter soil microbial communities, with research showing a 30% reduction in bacterial diversity in contaminated soils. This disruption affects nutrient cycling and may reduce agricultural productivity.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                2024 Study
              </div>
              <h3 className="text-xl font-bold mb-3">Immune System Activation</h3>
              <p className="text-gray-700">
                Human studies reveal that microplastics trigger inflammatory responses in the immune system. Chronic exposure has been linked to increased cytokine production, potentially contributing to systemic inflammation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                2023 Study
              </div>
              <h3 className="text-xl font-bold mb-3">Carbon Cycle Disruption</h3>
              <p className="text-gray-700">
                Microplastics may be affecting climate systems by altering ocean carbon sequestration. Research indicates that plastic-laden plankton have reduced carbon capture capacity, potentially reducing ocean carbon sink effectiveness.
              </p>
            </div>
          </div>
        </section>
        
        {/* Call to action */}
        <section className="bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">What Can We Do About Microplastics?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            While the challenges are significant, there are steps we can take individually and collectively to reduce microplastic pollution.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-colors shadow-md hover:shadow-lg">
              Explore Solutions
            </button>
            <button className="px-6 py-3 bg-transparent text-white font-medium rounded-full border-2 border-white hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4 mt-12">
        <div className="max-w-5xl mx-auto text-center">
          <p className="mb-2">Designed and Developed for Environmental Awareness</p>
          <p className="text-gray-400">South Brunswick High School Team A, 2025</p>
        </div>
      </footer>

      {/* Custom CSS */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}