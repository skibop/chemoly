import { Recycle, Droplets, Factory, Leaf, AlertTriangle, BarChart3 } from "lucide-react"

const features = [
  {
    icon: <Recycle className="h-10 w-10 text-primary" />,
    title: "Types of Plastics",
    description: "Learn about the seven main types of plastics, their properties, and common applications.",
  },
  {
    icon: <Factory className="h-10 w-10 text-primary" />,
    title: "Plastic Formation",
    description: "Understand the manufacturing processes used to create different plastic products.",
  },
  {
    icon: <AlertTriangle className="h-10 w-10 text-primary" />,
    title: "Environmental Impact",
    description: "Explore how plastics affect our environment, from production to disposal.",
  },
  {
    icon: <Droplets className="h-10 w-10 text-primary" />,
    title: "Ocean Pollution",
    description: "Discover the effects of plastic waste on marine ecosystems and wildlife.",
  },
  {
    icon: <Leaf className="h-10 w-10 text-primary" />,
    title: "Sustainable Alternatives",
    description: "Learn about biodegradable materials and eco-friendly alternatives to traditional plastics.",
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: "Recycling Solutions",
    description: "Explore innovative approaches to plastic recycling and waste management.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Plastic Information Center</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive resources on plastic types, manufacturing processes, environmental impacts, and
            sustainable solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-corporate border border-gray-100">
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
