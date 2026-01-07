import Hero from "@/components/Hero";
import PhotoQuote from "@/components/PhotoQuote";
import AboutPreview from "@/components/AboutPreview";
import WhoIWorkWith from "@/components/WhoIWorkWith";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="flex justify-center py-8">
        <div className="w-96 h-px bg-guanine/20"></div>
      </div>
      <PhotoQuote />
      <div className="flex justify-center py-8">
        <div className="w-96 h-px bg-guanine/20"></div>
      </div>
      <AboutPreview />
      <div className="flex justify-center py-8">
        <div className="w-96 h-px bg-guanine/20"></div>
      </div>
      <WhoIWorkWith />
      <div className="flex justify-center py-8">
        <div className="w-96 h-px bg-guanine/20"></div>
      </div>
      <FinalCTA />
    </>
  );
}
