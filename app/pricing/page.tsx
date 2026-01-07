import type { Metadata } from "next";
import CTAButton from "@/components/CTAButton";

export const metadata: Metadata = {
  title: "Pricing | Steve Harvey | Biotech CEO Consultant & Executive Coach",
  description:
    "Flexible pricing options for biotech consulting services. Hourly consulting at £1,499/hour, multi-session packages with discounts, and custom engagement options.",
  openGraph: {
    title: "Pricing | Steve Harvey | Biotech CEO Consultant",
    description:
      "Investment in your success. Flexible pricing from hourly consulting to comprehensive packages.",
  },
};

const Pricing = () => {
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/your-url";

  const pricingTiers = [
    {
      name: "Hourly Consulting",
      price: "£1,499",
      period: "per hour",
      description:
        "Initial consultation to assess needs. Flexible scheduling. Perfect for specific technical questions, strategic reviews, and quick decision support.",
      features: [
        "Initial consultation to assess needs",
        "Flexible scheduling",
        "Specific technical questions",
        "Strategic reviews",
        "Quick decision support",
      ],
      popular: false,
    },
    {
      name: "5-Hour Package",
      price: "£6,745",
      originalPrice: "£7,495",
      discount: "Save £750 (10% discount)",
      period: "one-time",
      description:
        "Structured engagement with clear milestones. Priority scheduling and between-session email support included.",
      features: [
        "Priority scheduling",
        "Between-session email support",
        "Structured engagement",
        "Clear milestones",
        "Best for ongoing strategic projects",
      ],
      popular: true,
    },
    {
      name: "10-Hour Package",
      price: "£11,992",
      originalPrice: "£14,990",
      discount: "Save £2,998 (20% discount)",
      period: "one-time",
      description:
        "Comprehensive roadmap development and sustained CEO coaching. Maximum value with significant savings.",
      features: [
        "Priority scheduling",
        "Between-session email support",
        "Structured engagement",
        "Clear milestones",
        "Comprehensive roadmap development",
        "Sustained CEO coaching",
      ],
      popular: false,
    },
  ];

  return (
    <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-navy-50 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 mb-6">
              Investment in Your Success
            </h1>
            <p className="text-lg text-navy-700">
              Flexible pricing options designed to meet your specific needs and
              support your biotech company&apos;s growth journey.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative bg-white border-2 rounded-lg p-8 ${
                  tier.popular
                    ? "border-teal-500 shadow-xl scale-105"
                    : "border-navy-100 shadow-md"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-teal-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-navy-900 mb-4">
                  {tier.name}
                </h3>
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-navy-900">
                      {tier.price}
                    </span>
                  </div>
                  {tier.originalPrice && (
                    <div className="mt-2">
                      <span className="text-lg text-navy-500 line-through mr-2">
                        {tier.originalPrice}
                      </span>
                      <span className="text-sm font-semibold text-teal-600">
                        {tier.discount}
                      </span>
                    </div>
                  )}
                  <p className="text-sm text-navy-600 mt-1">{tier.period}</p>
                </div>
                <p className="text-navy-700 mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-teal-600 mr-2 flex-shrink-0 mt-0.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-navy-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <CTAButton
                  href={calendlyUrl}
                  variant={tier.popular ? "primary" : "secondary"}
                  className="w-full"
                >
                  Book Now
                </CTAButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Options */}
      <section className="py-16 lg:py-24 bg-navy-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-6 text-center">
              Additional Options
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-navy-900 mb-3">
                  Monthly Engagement
                </h3>
                <p className="text-navy-700 mb-4">
                  Retainer-based arrangements with discounted hourly rates for
                  ongoing strategic support and CEO coaching.
                </p>
                <p className="text-sm text-navy-600">
                  Contact me to discuss custom retainer arrangements tailored to
                  your needs.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-navy-900 mb-3">
                  Custom Engagements
                </h3>
                <p className="text-navy-700 mb-4">
                  For board advisory, fractional executive roles, or custom
                  project-based work, contact me to discuss tailored arrangements.
                </p>
                <CTAButton href="/contact" variant="secondary">
                  Contact Me
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Call Note */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-navy-900 mb-3">
                Start with a Complimentary Discovery Call
              </h3>
              <p className="text-navy-700 mb-6">
                All engagements begin with a complimentary 20-minute discovery call
                to ensure alignment and discuss your specific needs. This call helps
                us understand your challenges and determine the best approach to
                support your success.
              </p>
              <CTAButton href={calendlyUrl} variant="primary">
                Book Your Discovery Call
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;

