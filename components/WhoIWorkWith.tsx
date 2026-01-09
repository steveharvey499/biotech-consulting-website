const pillars = [
  {
    letter: "A",
    title: "Attention",
    subtitle: "Develop brands that attract talent and customers",
    color: "adenine",
    whyItMatters:
      "Your science is brilliant. But your company is unknown. You're competing for talent, customers, and capital against companies with worse technology but bigger budgets. You could spend six figures on recruitment but candidates choose brands they know. Great articulation means nothing if no one's listening.",
    howIHelp: [
      "Build founder and CEO brands with little marketing budget (proven: 10M+ impressions)",
      "Convert recruitment from expensive to effortless, with candidates seeking you",
      "Use \"building in public\" social frameworks that scale without consuming your time",
      "Turn founder visibility into talent acquisition, customer leads, and investor interest",
    ],
  },
  {
    letter: "T",
    title: "Trajectory",
    subtitle: "Strategic direction and knowing when to pivot",
    color: "thymine",
    whyItMatters:
      "Every founder faces moments where the path forward splits. Pivot or persevere. Raise now or extend runway. Fire your co-founder or work it out. These are hard decisions made in a  fog, with incomplete information and everything on the line. Missing the signal could cost you everything.",
    howIHelp: [
      "Recognize inflection points and market signals before they're obvious",
      "Navigate strategic pivots without losing your team or momentum",
      "Know when to raise capital versus validate assumptions first",
      "Make tough calls about product direction and market focus with confidence",
    ],
  },
  {
    letter: "C",
    title: "Culture",
    subtitle: "Build principles-led high-performance teams",
    color: "cytosine",
    whyItMatters:
      "Great science plus dysfunctional teams equals failure. Your team of scientist, operations and business people need to be aligned on a common target. Principles-based leadership can align your team, reduce inconsistencies and drive hiring. It sets a high bar for the perfomance you need.",
    howIHelp: [
      "Develop company principles that drive engagement, recruitment, and retention",
      "Create principles-based leadership frameworks that scale beyond the CEO or founder",
      "Build communication bridges between technical and commercial teams",
      "Hire the best talent across scientific and business functions",
    ],
  },
  {
    letter: "G",
    title: "Gains",
    subtitle: "Generating the commercial traction needed",
    color: "guanine",
    whyItMatters:
      "Everything else is theater until you have commercial validation. Pitch decks and technical milestones mean nothing without paying customers and signed partnerships. You need revenue to prove product-market fit, fund growth, and show investors you can execute. Commercial traction validates everything else.",
    howIHelp: [
      "Develop go-to-market strategies that actually convert prospects to customers",
      "Structure partnership deals that accelerate growth and validate your model",
      "Identify and close your first revenue-generating customers systematically",
      "Build revenue models that scale beyond services into sustainable business",
    ],
  },
];

const WhoIWorkWith = () => {
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/your-url";

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      adenine: "border-t-4 border-adenine",
      cytosine: "border-t-4 border-cytosine",
      guanine: "border-t-4 border-guanine",
      thymine: "border-t-4 border-thymine",
    };
    return colorMap[color] || colorMap.adenine;
  };

  const getLetterColor = (color: string) => {
    const colorMap: Record<string, string> = {
      adenine: "text-adenine",
      cytosine: "text-cytosine",
      guanine: "text-guanine",
      thymine: "text-thymine",
    };
    return colorMap[color] || colorMap.adenine;
  };

  return (
    <section className="py-16 lg:py-24 bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-section lg:text-hero text-adenine mb-6">
              Four Elements of Biotech Success:{" "}
              <span className="text-cytosine">ACTG</span>
            </h2>
            <p className="text-body text-text-body max-w-3xl mx-auto">
              The CEOs I meet are stretched with endless demands, impossible tradeoffs, and no time to step back and actually improve how they lead. I focus on four areas of leadership development that create the most leverage:  getting the attention you need to build a brand, how you set and communicate trajectory, how you shape culture, and how you drive tangible gains. The aim is to invest in making you the leader your company needs at each stage of growth.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className={`bg-bg-secondary rounded-lg p-8 lg:p-10 hover:shadow-xl transition-shadow flex flex-col h-full ${getColorClasses(
                  pillar.color
                )}`}
              >
                {/* Pillar Header */}
                <div className="flex items-start gap-6 mb-8 min-h-[120px]">
                  <div
                    className={`text-6xl lg:text-7xl font-display ${getLetterColor(
                      pillar.color
                    )} flex-shrink-0`}
                  >
                    {pillar.letter}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-subsection text-adenine mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-body text-text-body">{pillar.subtitle}</p>
                  </div>
                </div>

                {/* Pillar Content */}
                <div className="space-y-6 flex-1">
                  <div>
                    <h4 className="font-semibold text-adenine mb-3">
                      Why It Matters
                    </h4>
                    <p className="text-body text-text-body">
                      {pillar.whyItMatters}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-adenine mb-3">
                      How I Help
                    </h4>
                    <ul className="space-y-2">
                      {pillar.howIHelp.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-body text-text-body"
                        >
                          <svg
                            className={`w-5 h-5 ${getLetterColor(
                              pillar.color
                            )} mr-3 flex-shrink-0 mt-0.5`}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoIWorkWith;

