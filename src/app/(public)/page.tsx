import Wrapper from "@/components/wrapper";
import About from "./_components/about";
import HeroRoot from "./_components/hero-root";
import { TimelineArcalis } from "./_components/timeline";
import PricingPlan from "./feature/_components/pricing-plan";
import FAQ from "./_components/faq";
import { CTASection } from "./_components/newsletter";

export default function RootPage() {
  return (
    <main className="overflow-x-hidden">
      <HeroRoot />
      <Wrapper>
        <About />
        <TimelineArcalis />
        <PricingPlan />
        <FAQ />
        <CTASection />
      </Wrapper>
    </main>
  );
}
