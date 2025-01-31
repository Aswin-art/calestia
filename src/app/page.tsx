import Lamp from "@/components/lamp";
import HeroRoot from "./(public)/_components/hero-root";

export default function RootPage() {
  return (
    <main className="overflow-x-hidden">
      <Lamp />
      <HeroRoot />
    </main>
  );
}
