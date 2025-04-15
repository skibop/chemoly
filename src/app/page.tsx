'use client'

import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import Image from "next/image"
import React, { useEffect } from 'react';
import {useState } from "react"
import { ChevronDown, Droplets, Package, Building, Activity, Recycle } from "lucide-react"

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    properties: false,
    uses: false,
    environment: false
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check visibility for each section
      setIsVisible({
        hero: window.scrollY > 50,
        properties: window.scrollY > 300,
        uses: window.scrollY > 700,
        environment: window.scrollY > 1100
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
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      {/* Animated plastic particles background in header */}
      <header className="w-full bg-red-600 text-white py-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {/* Animated plastic particles */}
          <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-white rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
          <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-white rounded-full animate-ping" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
          <div className="absolute top-2/3 left-1/3 w-5 h-5 bg-white rounded-full animate-ping" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/2 left-3/4 w-3 h-3 bg-white rounded-full animate-ping" style={{animationDuration: '4.5s', animationDelay: '0.7s'}}></div>
          <div className="absolute top-3/4 left-1/4 w-4 h-4 bg-white rounded-full animate-ping" style={{animationDuration: '5s', animationDelay: '1.5s'}}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">The World of Plastics</h1>
          <p className="text-xl max-w-2xl mx-auto animate-slideUp opacity-0" style={{animation: 'slideUp 1s ease-out 0.5s forwards'}}>
            Exploring the materials that shaped modern life and their impact on our planet
          </p>
        </div>
      </header>

      {/* Centered Navigation with floating effect */}
      <div className="w-full flex justify-center bg-white shadow-lg sticky top-0 z-50 transition-all duration-300" 
           style={{transform: scrollY > 100 ? 'translateY(0)' : 'translateY(0)', boxShadow: scrollY > 100 ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'}}>
        <NavigationMenu className="py-3">
          <NavigationMenuList>
            {/* Different Types of Plastics - Main tab with dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-red-600 hover:text-red-800 group">
                Different Types of Plastics
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-3 p-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="#plastic-1" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-red-100 text-red-600 hover:text-red-800 focus:bg-red-100 focus:text-red-800">
                        Plastic #1
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="#plastic-2" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-red-100 text-red-600 hover:text-red-800 focus:bg-red-100 focus:text-red-800">
                        Plastic #2
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="#plastic-3" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-red-100 text-red-600 hover:text-red-800 focus:bg-red-100 focus:text-red-800">
                        Plastic #3
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Plastic Formation tab */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="#formation" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors hover:bg-red-50 focus:bg-red-50 focus:text-red-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-red-100 data-[state=open]:bg-red-100">
                  Plastic Formation
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Environmental Approaches & Solutions tab */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="#solutions" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors hover:bg-red-50 focus:bg-red-50 focus:text-red-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-red-100 data-[state=open]:bg-red-100">
                  Environmental Approaches & Solutions
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Main content with scroll animations */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero section with animated entry */}
        <section className="mb-16 py-8 transition-all duration-1000 transform" 
                 style={{opacity: isVisible.hero ? 1 : 0, transform: isVisible.hero ? 'translateY(0)' : 'translateY(50px)'}}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-red-600 mb-4">What Are Plastics?</h2>
              <p className="text-gray-700 mb-4">
                Plastics are synthetic materials made from a wide range of organic polymers that can be molded into various shapes. They're derived primarily from petrochemicals and have become ubiquitous in modern life due to their versatility, durability, and low production cost.
              </p>
              <p className="text-gray-700">
                From packaging and construction to medical devices and electronics, plastics have revolutionized countless industries, while simultaneously presenting significant environmental challenges.
              </p>
            </div>
            <div className="w-full md:w-1/2 h-64 relative">
              <div className="bg-red-100 w-full h-full rounded-lg overflow-hidden shadow-lg relative perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src="/api/placeholder/400/320" alt="Various plastic products" className="rounded-lg transition-all duration-700 hover:scale-105" />
                  
                  {/* 3D floating plastic animation */}
                  <div className="absolute -top-8 -right-8 w-16 h-16 opacity-70 animate-float">
                    <Droplets size={64} className="text-red-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key properties section with animated cards */}
        <section className="mb-16 bg-red-50 p-6 rounded-lg shadow-md transition-all duration-1000 transform"
                 style={{opacity: isVisible.properties ? 1 : 0, transform: isVisible.properties ? 'translateY(0)' : 'translateY(50px)'}}>
          <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">Key Properties of Plastics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 transform cursor-pointer">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Droplets size={24} className="text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-red-600">Versatility</h3>
              </div>
              <p className="text-gray-700">
                Plastics can be engineered to have a vast range of properties: rigid or flexible, transparent or opaque, and resistant to various chemicals or environmental conditions.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 transform cursor-pointer delay-100">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Building size={24} className="text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-red-600">Durability</h3>
              </div>
              <p className="text-gray-700">
                Most plastics are highly durable and resistant to degradation, which makes them useful for long-lasting products but problematic when they become waste.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 transform cursor-pointer delay-200">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Package size={24} className="text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-red-600">Lightweight</h3>
              </div>
              <p className="text-gray-700">
                Compared to materials like metal or glass, plastics are significantly lighter, which reduces transportation costs and energy usage in many applications.
              </p>
            </div>
          </div>
        </section>

        {/* Common uses section with interactive elements */}
        <section className="mb-16 transition-all duration-1000 transform"
                 style={{opacity: isVisible.uses ? 1 : 0, transform: isVisible.uses ? 'translateY(0)' : 'translateY(50px)'}}>
          <h2 className="text-2xl font-bold text-red-700 mb-6">Common Uses of Plastics</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 bg-red-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-red-100">
              <div className="flex flex-col items-center text-center">
                <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-inner relative overflow-hidden">
                  <Package size={40} className="text-red-600 absolute" />
                  <div className="absolute inset-0 bg-red-500 opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-red-600 mb-2">Packaging</h3>
                <p className="text-gray-700">
                  From food containers to shipping materials, packaging represents the largest sector of plastic use worldwide.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-red-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-red-100 delay-100">
              <div className="flex flex-col items-center text-center">
                <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-inner relative overflow-hidden">
                  <Building size={40} className="text-red-600 absolute" />
                  <div className="absolute inset-0 bg-red-500 opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-red-600 mb-2">Construction</h3>
                <p className="text-gray-700">
                  PVC pipes, insulation, flooring, and window frames are just a few examples of plastics used in building and construction.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 bg-red-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-red-100 delay-200">
              <div className="flex flex-col items-center text-center">
                <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-inner relative overflow-hidden">
                  <Activity size={40} className="text-red-600 absolute" />
                  <div className="absolute inset-0 bg-red-500 opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-red-600 mb-2">Healthcare</h3>
                <p className="text-gray-700">
                  Medical devices, implants, protective equipment, and sterile packaging rely heavily on various types of plastics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Environmental impact preview with parallax effect */}
        <section className="mb-16 relative overflow-hidden rounded-lg shadow-xl transition-all duration-1000 transform"
                 style={{opacity: isVisible.environment ? 1 : 0, transform: isVisible.environment ? 'translateY(0)' : 'translateY(50px)'}}>
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700" 
               style={{transform: `translateY(${scrollY * 0.05}px)`}}></div>
          
          {/* Floating plastic waste particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/5 w-4 h-4 bg-white opacity-20 rounded animate-float" style={{animationDuration: '8s'}}></div>
            <div className="absolute top-2/4 left-3/4 w-3 h-3 bg-white opacity-20 rounded animate-float" style={{animationDuration: '10s', animationDelay: '2s'}}></div>
            <div className="absolute top-3/4 left-1/4 w-5 h-5 bg-white opacity-20 rounded animate-float" style={{animationDuration: '12s', animationDelay: '1s'}}></div>
          </div>
          
          <div className="relative z-10 text-white p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Recycle className="mr-2" />
                  Environmental Concerns
                </h2>
                <p className="mb-4">
                  While plastics offer numerous benefits, their production and disposal present significant environmental challenges. Most conventional plastics are derived from fossil fuels and can persist in the environment for hundreds of years.
                </p>
                <p>
                  Plastic pollution has become a global crisis, affecting marine life, wildlife habitats, and potentially human health through microplastics in food and water supplies.
                </p>
              </div>
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg shadow-inner overflow-hidden">
                  <img src="/api/placeholder/240/180" alt="Environmental impact of plastics" 
                       className="rounded transition-transform duration-500 hover:scale-110" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Link href="#solutions" className="inline-block bg-white text-red-600 font-semibold py-2 px-6 rounded-full hover:bg-red-100 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                Learn About Solutions
              </Link>
            </div>
          </div>
        </section>

        {/* Call to action with pulsing animation */}
        <section className="text-center py-12 relative">
          <div className="absolute inset-0 bg-red-50 opacity-50 rounded-2xl"></div>
          
          {/* Animated circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-red-100 rounded-full opacity-30 animate-ping" style={{animationDuration: '3s'}}></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Discover More About Plastics</h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Explore our detailed guides on different types of plastics, how they're formed, and sustainable approaches to plastic use and disposal.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="#plastic-1" className="bg-red-600 text-white font-semibold py-3 px-8 rounded-md hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                Types of Plastics
              </Link>
              <Link href="#formation" className="bg-white text-red-600 border-2 border-red-600 font-semibold py-3 px-8 rounded-md hover:bg-red-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                Plastic Formation
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer with gradient and animation */}
      <footer className="bg-gradient-to-r from-red-700 to-red-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">© 2025 Plastics Information Center</p>
          <p className="text-sm text-red-200">Educational resource for understanding plastic materials</p>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 1s ease-out forwards;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  )
}