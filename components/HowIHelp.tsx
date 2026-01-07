import type { Service } from "@/types";
import CTAButton from "./CTAButton";

const services: Service[] = [
  {
    title: "Technical & Strategic Advisory",
    description:
      "Navigate your most complex technical and commercial decisions. From synthetic biology strategy to pharmaceutical partnership negotiations, get expert guidance from someone who's built and scaled a biotech company from the ground up.",
    whoItsFor: "Founders and executives facing critical decisions",
    deliverables: [
      "Critical decision points",
      "Partnership negotiations",
      "Competitive positioning",
      "Technical strategy validation",
    ],
  },
  {
    title: "Revenue Growth Roadmap",
    description:
      "Build a systematic approach to generating and scaling revenue in life sciences. Customer identification, pricing strategy, partnership models, and go-to-market frameworks specific to biotech. I'll help you navigate the journey from zero to £10M with proven methodologies.",
    whoItsFor: "Pre-revenue to £10M scaling companies",
    deliverables: [
      "Pre-revenue to £10M scaling",
      "Business model development",
      "First customer acquisition",
      "Partnership strategy",
    ],
  },
  {
    title: "CEO Coaching & Leadership Development",
    description:
      "Develop the leadership skills to match your company's growth trajectory. Managing technical teams, board dynamics, fundraising conversations, organizational structure, and personal resilience. Build the capabilities you need to lead effectively at every stage.",
    whoItsFor: "First-time founders and technical founders transitioning to CEO",
    deliverables: [
      "First-time founders",
      "Technical founders transitioning to CEO",
      "Leadership development",
      "Founder wellbeing",
    ],
  },
];

const HowIHelp = () => {
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/your-url";

  return (
    <section className="py-16 lg:py-24 bg-bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-section text-adenine mb-12 text-center">
            Three Ways We Can Work Together
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-bg-primary rounded-lg p-6 lg:p-8 shadow-md hover:shadow-xl transition-shadow flex flex-col border-l-4 border-thymine"
              >
                <h3 className="font-display text-subsection text-adenine mb-4">
                  {service.title}
                </h3>
                <p className="text-body text-text-body mb-6 flex-grow">
                  {service.description}
                </p>
                <div>
                  <h4 className="font-semibold text-adenine mb-2">Best for:</h4>
                  <p className="text-small text-text-secondary mb-3">{service.whoItsFor}</p>
                  <h4 className="font-semibold text-adenine mb-3">Key areas:</h4>
                  <ul className="space-y-2">
                    {service.deliverables.map((item, idx) => (
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
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <CTAButton href="/services" variant="primary">
              Learn More About Services
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowIHelp;

