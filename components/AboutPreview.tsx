import Link from "next/link";
import CTAButton from "./CTAButton";

const AboutPreview = () => {
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/your-url";

  return (
    <section className="py-16 lg:py-24 bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-section lg:text-hero text-adenine mb-8 text-center lg:whitespace-nowrap">
            Why Did I Start <span className="text-cytosine">The Synthesis</span>?
          </h2>

          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-body text-text-body mb-4">
              I started a biotech company because the technology I needed didn't exist yet.
            </p>
            <p className="text-body text-text-body mb-4">
              I'd witnessed two technology revolutions at the bench: next-generation sequencing transformed our ability to read DNA, and CRISPR revolutionised genome editing overnight.
            </p>
            <p className="text-body text-text-body mb-4">
              But those leaps exposed a critical gap. DNA synthesis technology was error-prone, slow, and many genes remained inaccessible.
            </p>
            <p className="text-body text-text-body mb-4">
              The opportunity was clear to me. Build the DNA synthesis technology we desperately needed, making a faster and more accurate technology.
            </p>
            <p className="text-body text-text-body mb-4">
              I ran with that idea and converted it into a multi-million dollar revenue. I secured partnerships with major pharmaceutical companies, led multiple funding rounds, and built a high-performance team.
            </p>
            <p className="text-body text-text-body mb-4">
              But I also know what it's like to navigate the uncertainty. The technical dead-ends. The fundraising pressure. The strategic pivots that keep you up at night. I've faced the same questions founders and CEOs face today.
            </p>
            <p className="text-body text-text-body mb-4">
              And that's why I started The Synthesis.
            </p>
            <p className="text-body text-text-body mb-4">
              Too many biotech founders are navigating this journey alone, making expensive mistakes I've already made. The Synthesis is my advisory practice. I work directly with founders, CEOs, and boards to accelerate the path from bench to revenue.
            </p>
            <p className="text-body text-text-body">
              No consultant speak. No 100-page decks. Just practical guidance from someone who's actually built a biotech company and knows both the technical and commercial realities.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/latest-synthesis"
              className="inline-block text-thymine hover:text-thymine-light font-semibold text-body text-center"
            >
              Read My Latest Articles →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;

