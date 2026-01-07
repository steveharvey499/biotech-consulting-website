import Image from "next/image";

const PhotoQuote = () => {
  return (
    <section className="relative py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-6xl mx-auto">
          <div className="relative">
            {/* Photo - Left Side, Smaller */}
            <div className="relative w-full lg:w-[450px] h-[400px] lg:h-[550px] rounded-lg overflow-hidden bg-guanine/10">
              <Image
                src="/images/headshot.jpg"
                alt="Steve Harvey"
                fill
                className="object-cover"
                style={{ objectPosition: 'center' }}
                sizes="(max-width: 1024px) 100vw, 450px"
                priority
              />
            </div>

            {/* Text Box - Overlapping on Right */}
            <div className="relative -mt-32 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-0 lg:mt-0 w-full lg:w-[650px] bg-cytosine/10 rounded-lg p-8 lg:p-10 shadow-xl z-10 border border-cytosine/20">
              <p className="font-display text-body lg:text-intro text-adenine leading-relaxed">
                I spent 10 years as a biotech CEO, taking an idea from the bench to a multi-million dollar revenue stream. And with almost no budget, I built a brand that generated 10M+ impressions. Technical challenges. Commercial pivots. Fundraising pressure. Team building. I've lived it all. Now I help founders, CEOs and boards navigate that same journey, but hopefully with fewer scars.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoQuote;

