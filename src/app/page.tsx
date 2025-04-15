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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header with red background */}
      <header className="w-full bg-red-600 text-white py-4">
        <div className="container mx-auto px-4">
        </div>
      </header>

      {/* Centered Navigation */}
      <div className="w-full flex justify-center py-4 bg-white shadow-md">
        <NavigationMenu>
          <NavigationMenuList>
            {/* Different Types of Plastics - Main tab with dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-red-600 hover:text-red-800">Different Types of Plastics</NavigationMenuTrigger>
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

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero section */}
        <section className="mb-16">
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
              <div className="bg-red-100 w-full h-full rounded-lg flex items-center justify-center shadow-md">
                <img src="/api/placeholder/400/320" alt="Various plastic products" className="rounded-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Key properties section */}
        <section className="mb-16 bg-red-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">Key Properties of Plastics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-red-600 mb-2">Versatility</h3>
              <p className="text-gray-700">
                Plastics can be engineered to have a vast range of properties: rigid or flexible, transparent or opaque, and resistant to various chemicals or environmental conditions.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-red-600 mb-2">Durability</h3>
              <p className="text-gray-700">
                Most plastics are highly durable and resistant to degradation, which makes them useful for long-lasting products but problematic when they become waste.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-red-600 mb-2">Lightweight</h3>
              <p className="text-gray-700">
                Compared to materials like metal or glass, plastics are significantly lighter, which reduces transportation costs and energy usage in many applications.
              </p>
            </div>
          </div>
        </section>

        {/* Common uses section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-red-700 mb-6">Common Uses of Plastics</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 bg-red-50 p-4 rounded-lg shadow flex flex-col items-center text-center">
              <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mb-4">
                <img src="/api/placeholder/80/80" alt="Packaging icon" className="rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">Packaging</h3>
              <p className="text-gray-700">
                From food containers to shipping materials, packaging represents the largest sector of plastic use worldwide.
              </p>
            </div>
            <div className="w-full md:w-1/3 bg-red-50 p-4 rounded-lg shadow flex flex-col items-center text-center">
              <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mb-4">
                <img src="/api/placeholder/80/80" alt="Construction icon" className="rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">Construction</h3>
              <p className="text-gray-700">
                PVC pipes, insulation, flooring, and window frames are just a few examples of plastics used in building and construction.
              </p>
            </div>
            <div className="w-full md:w-1/3 bg-red-50 p-4 rounded-lg shadow flex flex-col items-center text-center">
              <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mb-4">
                <img src="/api/placeholder/80/80" alt="Healthcare icon" className="rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-red-600 mb-2">Healthcare</h3>
              <p className="text-gray-700">
                Medical devices, implants, protective equipment, and sterile packaging rely heavily on various types of plastics.
              </p>
            </div>
          </div>
        </section>

        {/* Environmental impact preview */}
        <section className="mb-8 bg-gradient-to-r from-red-600 to-red-700 text-white p-8 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Environmental Concerns</h2>
              <p className="mb-4">
                While plastics offer numerous benefits, their production and disposal present significant environmental challenges. Most conventional plastics are derived from fossil fuels and can persist in the environment for hundreds of years.
              </p>
              <p>
                Plastic pollution has become a global crisis, affecting marine life, wildlife habitats, and potentially human health through microplastics in food and water supplies.
              </p>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg shadow-inner">
                <img src="/api/placeholder/240/180" alt="Environmental impact of plastics" className="rounded" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Link href="#solutions" className="inline-block bg-white text-red-600 font-semibold py-2 px-6 rounded-full hover:bg-red-100 transition-colors">
              Learn About Solutions
            </Link>
          </div>
        </section>

        {/* Call to action */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Discover More About Plastics</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Explore our detailed guides on different types of plastics, how they're formed, and sustainable approaches to plastic use and disposal.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="#plastic-1" className="bg-red-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-red-700 transition-colors">
              Types of Plastics
            </Link>
            <Link href="#formation" className="bg-white text-red-600 border-2 border-red-600 font-semibold py-2 px-6 rounded-md hover:bg-red-50 transition-colors">
              Plastic Formation
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}