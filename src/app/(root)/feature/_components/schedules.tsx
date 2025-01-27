"use client";

import AnimatedItem from "@/components/animate-item";
import { motion } from "framer-motion";

export const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-48 text-white"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
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

export type TScheduleItem = {
  title: string;
  date: Date | string;
  location: string;
};
export const ScheduleItem: React.FC<TScheduleItem> = ({
  title,
  date,
  location,
}) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
    >
      <div>
        <p className="mb-1.5 text-xl text-zinc-50">{title}</p>
        <p className="text-sm uppercase text-zinc-500">
          {date.toLocaleString()}
        </p>
      </div>
      <div className="flex items-center gap-1.5 text-end text-sm uppercase text-zinc-500">
        <p>{location}</p>
      </div>
    </motion.div>
  );
};
