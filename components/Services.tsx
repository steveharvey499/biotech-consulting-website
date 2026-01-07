import type { Service } from "@/types";

const services: Service[] = [
  {
    title: "Technical & Strategic Advisory",
    description:
      "Navigate complex technical decisions and strategic challenges in biotech. From synthetic biology and therapeutic development to competitive positioning and partnership strategy, get expert guidance grounded in real-world experience building and scaling life sciences companies.",
    whoItsFor: "Founders and executives at early-stage biotech companies",
    deliverables: [
      "Strategic planning sessions",
      "Technical assessment",
      "Competitive analysis",
      "Partnership guidance",
    ],
  },
  {
    title: "0 to £10M Revenue Roadmap",
    description:
      "Proven frameworks for building revenue-generating biotech businesses. From identifying your first customers to closing major pharmaceutical partnerships, I'll help you navigate product-market fit, pricing strategy, sales process development, and revenue scaling strategies specific to life sciences.",
    whoItsFor: "Pre-revenue and early revenue biotech companies",
    deliverables: [
      "Revenue strategy development",
      "Customer acquisition frameworks",
      "Pricing models",
      "Partnership negotiation support",
    ],
  },
  {
    title: "CEO Coaching & Leadership Development",
    description:
      "Leading a biotech company requires unique skills. Get personalized executive coaching on leadership challenges, team building, fundraising, investor relations, and the mental resilience needed to navigate the founder journey. Build the leadership capabilities to scale yourself as your company grows.",
    whoItsFor: "Biotech founders and CEOs",
    deliverables: [
      "1-on-1 executive coaching",
      "Leadership development",
      "Team building strategies",
      "Founder support",
    ],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 lg:py-24 bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-section text-adenine mb-4">
            Services
          </h2>
          <p className="text-intro text-text-body max-w-2xl mx-auto">
            Comprehensive consulting services tailored to your biotech company&apos;s
            unique challenges and growth stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-bg-primary border-2 border-guanine/20 rounded-lg p-6 lg:p-8 hover:shadow-xl hover:border-thymine transition-all duration-300 flex flex-col"
            >
              <h3 className="font-display text-subsection text-adenine mb-4">
                {service.title}
              </h3>
              <p className="text-body text-text-body mb-6 flex-grow">{service.description}</p>

              <div className="mb-6">
                <h4 className="font-semibold text-adenine mb-2">Who it&apos;s for:</h4>
                <p className="text-small text-text-secondary">{service.whoItsFor}</p>
              </div>

              <div>
                <h4 className="font-semibold text-adenine mb-3">Deliverables:</h4>
                <ul className="space-y-2">
                  {service.deliverables.map((deliverable, idx) => (
                    <li key={idx} className="flex items-start text-small text-text-body">
                      <svg
                        className="w-5 h-5 text-thymine mr-2 flex-shrink-0 mt-0.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

