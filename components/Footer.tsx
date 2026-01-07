import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const email = process.env.CONTACT_EMAIL || "steve@example.com";
  const linkedInUrl =
    process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/steve-harvey-camenabio/";

  return (
    <footer className="bg-adenine text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Information */}
          <div>
            <h3 className="font-display text-small mb-4 text-white">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="text-white hover:text-white/80 transition-colors"
                >
                  {email}
                </a>
              </li>
              <li className="text-white">Cambridge, UK</li>
              <li>
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors inline-flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Links - Centered */}
          <div className="text-center">
            <h3 className="font-display text-small mb-4 text-white">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/latest-synthesis"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  The Latest Synthesis
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links - Right Aligned */}
          <div className="text-left md:text-right">
            <h3 className="font-display text-small mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6">
          <p className="text-sm text-white/70 text-center">
            © {currentYear} The Synthesis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
