const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex flex-col items-center">
            <h1 className="font-display text-hero text-adenine mb-6">
            Hi. I&apos;m Steve.
            </h1>
          <div className="w-full h-px bg-adenine mb-6"></div>
        </div>
        <h2 className="font-display text-section text-adenine">
          Curious About <span className="text-cytosine">The Synthesis</span>? Scroll Down.
        </h2>
      </div>
    </section>
  );
};

export default Hero;
