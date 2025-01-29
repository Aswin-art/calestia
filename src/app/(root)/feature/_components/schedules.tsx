"use client";

import AnimatedItem from "@/components/animate-item";
import { motion } from "framer-motion";

export const Schedule: React.FC = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-48 text-white"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-20 text-4xl font-black uppercase text-zinc-50"
      >
        Launch Schedule
      </motion.h1>

      <AnimatedItem title="NG-21" description="adoaskdoksaodksao" />
      <AnimatedItem title="Starlink" description="adoaskdoksaodksao" />
      <AnimatedItem title="Turksat 6A" description="adoaskdoksaodksao" />
      <AnimatedItem title="NROL-186" description="adoaskdoksaodksao" />
      <AnimatedItem title="GOES-U" description="adoaskdoksaodksao" />
      <AnimatedItem title="ASTRA 1P" description="adoaskdoksaodksao" />
    </section>
  );
};
