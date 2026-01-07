import type { Metadata } from "next";
import HubSpotMeetingWidget from "@/components/HubSpotMeetingWidget";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Steve Harvey | Biotech CEO Consultant & Executive Coach",
  description:
    "Book your complimentary 20-minute discovery call or get in touch to discuss how I can help scale your biotech company. Cambridge, UK.",
  openGraph: {
    title: "Contact | Steve Harvey | Biotech CEO Consultant",
    description:
      "Ready to scale your biotech? Book a discovery call or get in touch today.",
  },
};

const Contact = () => {
  const email = process.env.CONTACT_EMAIL || "steve@example.com";
  const linkedInUrl =
    process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/steve-harvey-camenabio/";

  return (
    <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-navy-50 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 mb-6">Let&apos;s Talk About Your Biotech</h1>
            <p className="text-lg text-navy-700">
              Book a call or send me a message.
            </p>
          </div>
        </div>
      </section>

      {/* HubSpot Meeting Widget */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Schedule Your Call
            </h2>
            <div className="bg-navy-50 rounded-lg p-6 lg:p-8">
              <HubSpotMeetingWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 lg:py-24 bg-navy-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Or Send a Message
            </h2>
            <div className="bg-white rounded-lg p-6 lg:p-8 shadow-lg">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Details */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">
              Contact Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="font-semibold text-navy-900 mb-2">Email</h3>
                <a
                  href={`mailto:${email}`}
                  className="text-teal-600 hover:text-teal-700 transition-colors"
                >
                  {email}
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-navy-900 mb-2">Location</h3>
                <p className="text-navy-700">Cambridge, UK</p>
              </div>
              <div>
                <h3 className="font-semibold text-navy-900 mb-2">LinkedIn</h3>
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 transition-colors inline-flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Connect
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
