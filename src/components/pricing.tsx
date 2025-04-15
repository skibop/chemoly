import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Business",
    price: "$99",
    description: "Perfect for small to medium businesses",
    features: [
      "Up to 25 team members",
      "50 projects",
      "Advanced analytics",
      "Priority email support",
      "API access",
      "SSO integration",
    ],
  },
  {
    name: "Enterprise",
    price: "$249",
    description: "Ideal for large organizations",
    features: [
      "Unlimited team members",
      "Unlimited projects",
      "Advanced analytics & reporting",
      "24/7 priority support",
      "Full API access",
      "Custom integrations",
      "Dedicated account manager",
      "On-premise deployment option",
    ],
  },
  {
    name: "Custom",
    price: "Contact us",
    description: "Tailored solutions for unique needs",
    features: [
      "Custom feature development",
      "White-label options",
      "Enterprise SLA",
      "Dedicated infrastructure",
      "Custom security requirements",
      "Compliance assistance",
      "Personalized training",
      "Strategic consulting",
    ],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Enterprise-Grade Pricing</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Flexible pricing options designed to meet the needs of organizations of all sizes.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-lg shadow-corporate-lg border ${
                index === 1 ? "border-primary/20" : "border-gray-100"
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <p className="text-4xl font-bold mb-6">
                {plan.price}
                {plan.price !== "Contact us" && <span className="text-lg font-normal text-gray-600">/month</span>}
              </p>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={
                  index === 1
                    ? "w-full bg-primary hover:bg-primary/90 text-white"
                    : "w-full border-primary text-primary hover:bg-primary/5"
                }
                variant={index === 1 ? "default" : "outline"}
              >
                {index === 2 ? "Contact Sales" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
