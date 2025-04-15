import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto">
        <div className="bg-primary text-white rounded-lg shadow-corporate-lg p-12 text-center max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Enterprise?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join thousands of leading organizations already using StreamLine to optimize their operations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-medium px-8">
              Schedule a Demo
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-medium px-8">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
