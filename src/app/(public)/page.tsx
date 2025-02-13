// import Lamp from "@/components/lamp";
import HeroRoot from "./_components/hero-root";
import { TimelineArcalis } from "./_components/timeline";
import PricingPlan from "./feature/_components/pricing-plan";

export default function RootPage() {
  return (
    <main className="overflow-x-hidden">
      {/* <Lamp /> */}
      <HeroRoot />
      <TimelineArcalis />
      <PricingPlan />
    </main>
  );
}
