import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | The Synthesis | Biotech CEO Consultant",
  description: "Terms of Service for The Synthesis biotech consulting engagements.",
  robots: {
    index: false,
    follow: false,
  },
};

const TermsOfService = () => {
  const email = process.env.CONTACT_EMAIL || "steve@example.com";

  return (
    <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-navy-900 mb-8">Terms of Service</h1>
        <p className="text-sm text-navy-600 mb-8">
          Last updated: {new Date().toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-navy-700">
              By engaging The Synthesis ("Consultant", "we", "us", "our") for consulting
              services, you ("Client", "you") agree to be bound by these Terms of
              Service. If you do not agree to these terms, please do not engage
              our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              2. Consulting Services
            </h2>
            <p className="text-navy-700">
              The Synthesis provides consulting services including but not limited to:
              technical and strategic advisory, revenue growth roadmap development,
              and CEO coaching and leadership development. Services are provided
              on a time-based or project-based basis as agreed upon in writing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              3. Confidentiality
            </h2>
            <p className="text-navy-700">
              The Synthesis will maintain confidentiality of all proprietary and confidential
              information shared by the Client during the engagement. This
              obligation continues after the engagement ends.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              4. Independent Contractor
            </h2>
            <p className="text-navy-700">
              The Synthesis is an independent contractor, not an employee, partner, or agent
              of the Client. Consulting services are provided independently and
              are separate from any individual's role at Camena Bioscience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              5. No Guarantee of Results
            </h2>
            <p className="text-navy-700">
              While The Synthesis will provide guidance and advice based on our experience, we
              do not guarantee specific business outcomes or results. The Client
              is responsible for all business decisions and their consequences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              6. Limitation of Liability
            </h2>
            <p className="text-navy-700">
              The Synthesis's liability for any claims arising from the consulting services is
              limited to the fees paid by the Client for the specific engagement.
              We are not liable for indirect, incidental, or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              7. Intellectual Property
            </h2>
            <p className="text-navy-700">
              Any materials, frameworks, or methodologies we provide remain The Synthesis's
              intellectual property. The Client may use these materials for their
              business purposes but may not resell or redistribute them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              8. Cancellation and Refunds
            </h2>
            <p className="text-navy-700">
              Cancellation policies will be specified in the engagement agreement.
              Refunds for unused hours in package engagements may be available
              subject to the terms of the specific package agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              9. Governing Law
            </h2>
            <p className="text-navy-700">
              These Terms of Service are governed by the laws of England and
              Wales. Any disputes will be subject to the exclusive jurisdiction
              of the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              10. Contact Information
            </h2>
            <p className="text-navy-700">
              For questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-navy-700 mt-4">
              Email:{" "}
              <a href={`mailto:${email}`} className="text-teal-600 hover:text-teal-700">
                {email}
              </a>
              <br />
              Location: Cambridge, UK
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

