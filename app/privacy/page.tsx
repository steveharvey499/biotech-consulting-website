import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | The Synthesis | Biotech CEO Consultant",
  description: "Privacy Policy for The Synthesis biotech consulting website. GDPR compliant privacy practices.",
  robots: {
    index: false,
    follow: false,
  },
};

const PrivacyPolicy = () => {
  const email = process.env.CONTACT_EMAIL || "steve@thesynthesis.co.uk";

  return (
    <div className="pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-navy-900 mb-8">Privacy Policy</h1>
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
              1. Introduction
            </h2>
            <p className="text-navy-700">
              This Privacy Policy explains how The Synthesis (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;, &quot;The Synthesis&quot;)
              collects, uses, and protects your personal information when you
              visit this website or use our consulting services. The Synthesis is committed
              to protecting your privacy and ensuring compliance with the General
              Data Protection Regulation (GDPR) and other applicable data
              protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              2. Information We Collect
            </h2>
            <h3 className="text-xl font-semibold text-navy-900 mt-6 mb-3">
              2.1 Information You Provide
            </h3>
            <p className="text-navy-700">
              When you contact us through the contact form or book a consultation,
              we may collect:
            </p>
            <ul className="list-disc pl-6 text-navy-700 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Company name</li>
              <li>Message content</li>
            </ul>

            <h3 className="text-xl font-semibold text-navy-900 mt-6 mb-3">
              2.2 Automatically Collected Information
            </h3>
            <p className="text-navy-700">
              When you visit this website, we may automatically collect:
            </p>
            <ul className="list-disc pl-6 text-navy-700 space-y-2">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
            </ul>
            <p className="text-navy-700 mt-4">
              This information is collected through cookies and similar tracking
              technologies, including Google Analytics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-navy-700">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-navy-700 space-y-2">
              <li>Respond to your inquiries and provide consulting services</li>
              <li>Schedule and manage consultations</li>
              <li>Send you information about our services (with your consent)</li>
              <li>Improve this website and user experience</li>
              <li>Analyze website usage and trends</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              4. Legal Basis for Processing
            </h2>
            <p className="text-navy-700">
              Under GDPR, we process your personal data based on:
            </p>
            <ul className="list-disc pl-6 text-navy-700 space-y-2">
              <li>
                <strong>Consent:</strong> When you provide information through
                the contact form or book a consultation
              </li>
              <li>
                <strong>Legitimate Interest:</strong> For website analytics and
                improving user experience
              </li>
              <li>
                <strong>Contract:</strong> To fulfill consulting service
                agreements
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              5. Data Sharing and Disclosure
            </h2>
            <p className="text-navy-700">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-navy-700 space-y-2">
              <li>
                <strong>Service Providers:</strong> Third-party services that
                help us operate this website (e.g., email service providers,
                hosting providers, analytics services)
              </li>
              <li>
                <strong>Calendly:</strong> When you book a consultation, your
                information is processed by Calendly in accordance with their
                privacy policy
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to
                protect our rights
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              6. Data Retention
            </h2>
            <p className="text-navy-700">
              We retain your personal information only for as long as necessary to:
            </p>
            <ul className="list-disc pl-6 text-navy-700 space-y-2">
              <li>Provide consulting services</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce agreements</li>
            </ul>
            <p className="text-navy-700 mt-4">
              Contact form submissions are typically retained for up to 2 years
              unless you request deletion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              7. Your Rights Under GDPR
            </h2>
            <p className="text-navy-700">
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 text-navy-700 space-y-2">
              <li>
                <strong>Right to Access:</strong> Request a copy of your personal
                data
              </li>
              <li>
                <strong>Right to Rectification:</strong> Request correction of
                inaccurate data
              </li>
              <li>
                <strong>Right to Erasure:</strong> Request deletion of your data
                (&quot;right to be forgotten&quot;)
              </li>
              <li>
                <strong>Right to Restrict Processing:</strong> Request
                limitation of data processing
              </li>
              <li>
                <strong>Right to Data Portability:</strong> Request transfer of
                your data
              </li>
              <li>
                <strong>Right to Object:</strong> Object to processing of your
                data
              </li>
              <li>
                <strong>Right to Withdraw Consent:</strong> Withdraw consent at
                any time
              </li>
            </ul>
            <p className="text-navy-700 mt-4">
              To exercise these rights, please contact us at{" "}
              <a href={`mailto:${email}`} className="text-teal-600 hover:text-teal-700">
                {email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              8. Cookies
            </h2>
            <p className="text-navy-700">
              This website uses cookies to improve user experience and analyze
              website traffic. You can control cookies through your browser
              settings. Essential cookies are necessary for the website to
              function properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              9. Security
            </h2>
            <p className="text-navy-700">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              10. International Data Transfers
            </h2>
            <p className="text-navy-700">
              Your information may be transferred to and processed in countries
              outside the European Economic Area (EEA). We ensure appropriate
              safeguards are in place to protect your data in accordance with
              GDPR requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              11. Children&apos;s Privacy
            </h2>
            <p className="text-navy-700">
              This website is not intended for individuals under 18 years of age.
              We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              12. Changes to This Privacy Policy
            </h2>
            <p className="text-navy-700">
              We may update this Privacy Policy from time to time. The updated
              version will be posted on this page with a revised &quot;Last updated&quot;
              date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
              13. Contact Information
            </h2>
            <p className="text-navy-700">
              If you have questions about this Privacy Policy or wish to
              exercise your rights, please contact us at:
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

export default PrivacyPolicy;
