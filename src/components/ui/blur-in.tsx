"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface BlurIntProps {
  word: string;
  className?: string;
  variant?: {
    hidden: { filter: string; opacity: number };
    visible: { filter: string; opacity: number };
  };
  duration?: number;
}
const BlurIn = ({
  word,
  className,
  variant,
  duration = 0.75,
}: BlurIntProps) => {
  const defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0, y: 48 },
    visible: { filter: "blur(0px)", opacity: 1, y: 0 },
  };
  const combinedVariants = variant || defaultVariants;

  return (
    <motion.h1
      initial="hidden"
      animate="visible"
      transition={{ ease: "easeInOut", duration }}
      variants={combinedVariants}
      viewport={{ once: true }}
      className={cn("", className)}
    >
      {word}
    </motion.h1>
  );
};

export { BlurIn };
