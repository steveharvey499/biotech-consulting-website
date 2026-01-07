import CTAButton from "./CTAButton";

const FinalCTA = () => {
  return (
    <section className="py-16 lg:py-24 bg-adenine text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-intro text-white/90">
              Read the latest on leadership and company building
            </p>
            <CTAButton href="/latest-synthesis" variant="secondary">
              The Latest Synthesis
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

