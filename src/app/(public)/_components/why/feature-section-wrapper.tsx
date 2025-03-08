import { cn } from "@/lib/utils";
import {
  IconCloud,
  IconEaseInOut,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";
import { GlobeLock, Zap } from "lucide-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Dynamic AI Model Ecosystem",
      description:
        "Access 6+ specialized AI models (and growing) in one platform. From NLP to multimodal reasoning",
      icon: <IconTerminal2 />,
    },
    {
      title: "DAO-Driven Evolution",
      description:
        "Your voice shapes Calestia. Propose features, vote on upgrades, and earn governance power through engagement.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Privacy by Design",
      description:
        "Powered by Bitfinity Network’s ZKPs, Calestia ensures data confidentiality for sensitive use cases.",
      icon: <GlobeLock />,
    },
    {
      title: "Enterprise-Ready & Scalable",
      description:
        "Low fees, high throughput (200+ TPS), and Polkadot-based interoperability let businesses deploy AI at scale.",
      icon: <IconCloud />,
    },
    {
      title: "Shared Impact Fund",
      description:
        "10% of platform fees fund social good. The community votes to support education, open-source AI research, and blockchain literacy programs worldwide.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "Energy-Efficient Infrastructure",
      description:
        "Committed to environmental sustainability, Calestia operates on Bitfinity's Proof-of-Stake (PoS) consensus, consuming 99% less energy than Bitcoin’s Proof-of-Work. ",
      icon: <Zap />,
    },
  ];
  return (
    <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "group/feature relative flex flex-col py-10 lg:border-r dark:border-neutral-800",
        (index === 0 || index === 3) && "lg:border-l dark:border-neutral-800",
        index < 3 && "lg:border-b dark:border-neutral-800",
      )}
    >
      {index < 3 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
      )}
      {index >= 3 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
      )}
      <div className="relative z-10 mb-4 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-md relative z-10 mb-2 px-10 font-bold lg:text-lg">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-tr-full rounded-br-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-blue-500 dark:bg-neutral-700" />
        <span className="inline-block text-neutral-800 transition duration-200 group-hover/feature:translate-x-2 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-neutral-600 dark:text-neutral-300">
        {description}
      </p>
    </div>
  );
};
