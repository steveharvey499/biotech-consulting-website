import CTAButton from "./CTAButton";

const Pricing = () => {
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/your-url";

  const packages = [
    {
      hours: 5,
      price: "£6,745",
      originalPrice: "£7,495",
      savings: "£750",
      savingsPercent: "10%",
    },
    {
      hours: 10,
      price: "£12,741",
      originalPrice: "£14,990",
      savings: "£2,249",
      savingsPercent: "15%",
    },
    {
      hours: 20,
      price: "£23,984",
      originalPrice: "£29,980",
      savings: "£5,996",
      savingsPercent: "20%",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-section text-adenine mb-6 text-center">
            Investment
          </h2>
          <p className="text-intro text-text-body mb-12 text-center max-w-2xl mx-auto">
            Clear, straightforward pricing for high-value consulting. All
            engagements begin with a complimentary 20-minute discovery call.
          </p>

          {/* Hourly Consulting */}
          <div className="bg-bg-primary rounded-lg p-8 mb-8 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h3 className="font-display text-subsection text-adenine mb-2">
                  Hourly Consulting
                </h3>
                <p className="text-body text-text-body">
                  Flexible single sessions. Perfect for specific decisions or
                  technical reviews. Book as needed. 60-minute minimum.
                </p>
              </div>
              <div className="mt-4 md:mt-0 md:text-right">
                <div className="text-3xl font-bold text-cytosine">£1,499</div>
                <div className="text-small text-guanine">per hour</div>
              </div>
            </div>
            <CTAButton href={calendlyUrl} variant="primary" className="w-full md:w-auto">
              Book a Session
            </CTAButton>
          </div>

          {/* Package Rates */}
          <div className="mb-8">
            <h3 className="font-display text-subsection text-adenine mb-6 text-center">
              Package Rates (Save 10-20%)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className="bg-bg-primary rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-cytosine mb-2">
                      {pkg.price}
                    </div>
                    <div className="text-small text-guanine mb-2">
                      {pkg.hours} hours
                    </div>
                    <div className="text-small text-text-tertiary line-through mb-1">
                      {pkg.originalPrice}
                    </div>
                    <div className="text-small font-semibold text-cytosine">
                      Save {pkg.savings} ({pkg.savingsPercent})
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-bg-primary rounded-lg p-6 shadow-md mb-6">
              <h4 className="font-semibold text-adenine mb-3">Package includes:</h4>
              <ul className="space-y-2 text-text-body">
                <li className="flex items-start">
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
                  Priority scheduling
                </li>
                <li className="flex items-start">
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
                  Between-session email support
                </li>
                <li className="flex items-start">
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
                  Structured engagement with milestones
                </li>
                <li className="flex items-start">
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
                  Best for ongoing strategic projects, comprehensive roadmap
                  development, sustained CEO coaching
                </li>
              </ul>
            </div>
            <div className="text-center">
              <CTAButton href={calendlyUrl} variant="primary">
                Book a Package
              </CTAButton>
            </div>
          </div>

          {/* Custom Engagements */}
          <div className="bg-bg-primary rounded-lg p-8 shadow-md">
            <h3 className="font-display text-subsection text-adenine mb-4">
              Custom Engagements
            </h3>
            <p className="text-body text-text-body mb-6">
              For board advisory, fractional executive roles, or project-based work,
              let's discuss tailored arrangements.
            </p>
            <CTAButton href="/contact" variant="secondary">
              Contact Me
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

