import AnimatedItem from "@/components/animate-item";
import { BlurIn } from "@/components/ui/blur-in";

export const Schedule: React.FC = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-28 text-white lg:py-48"
    >
      <BlurIn
        word="Launch Schedule"
        className="mb-10 text-4xl font-black uppercase text-zinc-50 lg:mb-20"
      />

      <AnimatedItem title="NG-21" description="adoaskdoksaodksao" />
      <AnimatedItem title="Starlink" description="adoaskdoksaodksao" />
      <AnimatedItem title="Turksat 6A" description="adoaskdoksaodksao" />
      <AnimatedItem title="NROL-186" description="adoaskdoksaodksao" />
      <AnimatedItem title="GOES-U" description="adoaskdoksaodksao" />
      <AnimatedItem title="ASTRA 1P" description="adoaskdoksaodksao" />
    </section>
  );
};
