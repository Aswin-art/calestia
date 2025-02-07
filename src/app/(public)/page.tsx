import HeroRoot from "./_components/hero-root";
import PricingPlan from "./feature/_components/pricing-plan";

export default function RootPage() {
  return (
    <main className="overflow-x-hidden">
      {/* <Lamp /> */}
      <HeroRoot />
      <PricingPlan />
    </main>
  );
}
