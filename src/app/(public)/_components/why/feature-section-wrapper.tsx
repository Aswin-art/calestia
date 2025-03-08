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
        "Your platform offers access to over 6 specialized AI models that continue to grow, covering various fields such as NLP (Natural Language Processing) and multimodal reasoning.",
      icon: <IconTerminal2 />,
    },
    {
      title: "DAO-Driven Evolution",
      description:
        "Users have a voice in the platform's development through features such as proposing new features, voting on upgrades, and earning governance power through engagement.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Robust Blockchain Infrastructure",
      description:
        "Calestia is built on Bitfinity, a next-generation Layer-2 solution for Bitcoin that offers compatibility with the Ethereum Virtual Machine (EVM).",
      icon: <GlobeLock />,
    },
    {
      title: "Enhanced On-Chain Privacy",
      description:
        "By utilizing threshold signature schemes, particularly Chain-Key technology, Bitfinity ensures user data privacy and security.",
      icon: <IconCloud />,
    },
    {
      title: "Shared Impact Fund",
      description:
        "10% of platform fees are allocated to support social good. The community can vote to fund education, open-source AI research, and blockchain literacy programs worldwide.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "Scalability & Low Fees",
      description:
        "Bitfinity supports over 1,000 transactions per second (TPS) and significantly reduces gas fees compared to layer-1 blockchains like Ethereum. ",
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
