const testimonials = [
    {
      quote:
        "StreamLine has transformed our operational efficiency by 40%. The implementation was seamless and the ROI has been exceptional.",
      author: "Jane Doe",
      position: "Chief Operations Officer",
      company: "Global Enterprises Inc.",
    },
    {
      quote:
        "As a multinational corporation, we needed a solution that could scale with our complex needs. StreamLine delivered beyond our expectations.",
      author: "John Smith",
      position: "VP of Technology",
      company: "Innovative Solutions LLC",
    },
    {
      quote:
        "The analytics capabilities have provided our executive team with insights that have directly contributed to our strategic planning process.",
      author: "Emily Johnson",
      position: "Director of Strategy",
      company: "Enterprise Ventures",
    },
  ]
  
  export default function Testimonials() {
    return (
      <section id="testimonials" className="py-24 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              See how StreamLine has helped organizations across various industries optimize their operations and achieve
              their business goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-corporate">
                <div className="mb-6">
                  <svg className="h-8 w-8 text-primary opacity-80" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <p className="text-lg mb-6 text-gray-700 italic">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                  <p className="text-sm text-primary">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  