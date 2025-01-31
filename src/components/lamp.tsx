"use client";

import { motion } from "framer-motion";

//    <div className="absolute top-0 isolate z-10 flex w-full flex-1 scale-[0.35] items-start justify-center sm:scale-[0.60] md:scale-75 lg:scale-100"></div>

const Lamp: React.FC = () => {
  return (
    <div className="absolute top-0 isolate z-10 flex w-full flex-1 scale-[0.35] items-start justify-center sm:scale-[0.60] md:scale-75 lg:scale-100">
      <div className="absolute top-0 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md md:hidden" />

      {/* Main glow */}
      <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-[-30%] rounded-full bg-primary/60 opacity-80 blur-3xl" />

      {/* Lamp effect */}
      <motion.div
        initial={{ width: "8rem" }}
        viewport={{ once: true }}
        transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
        whileInView={{ width: "16rem" }}
        className="absolute top-0 z-30 h-36 -translate-y-[20%] rounded-full bg-primary/60 blur-2xl"
      />

      {/* Top line */}
      <motion.div
        initial={{ width: "15rem" }}
        viewport={{ once: true }}
        transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
        whileInView={{ width: "30rem" }}
        className="absolute inset-auto z-50 h-0.5 -translate-y-[-10%] bg-primary/60"
      />

      {/* Left gradient cone */}
      <motion.div
        initial={{ opacity: 0.5, width: "15rem" }}
        whileInView={{ opacity: 1, width: "30rem" }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
        }}
        className="bg-gradient-conic absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible from-primary/60 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
      >
        <div className="absolute bottom-0 left-0 z-20 h-40 w-[100%] bg-background [mask-image:linear-gradient(to_top,white,transparent)]" />
        <div className="absolute bottom-0 left-0 z-20 h-[100%] w-40 bg-background [mask-image:linear-gradient(to_right,white,transparent)]" />
      </motion.div>

      {/* Right gradient cone */}
      <motion.div
        initial={{ opacity: 0.5, width: "15rem" }}
        whileInView={{ opacity: 1, width: "30rem" }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
        }}
        className="bg-gradient-conic absolute inset-auto left-1/2 h-56 w-[30rem] from-transparent via-transparent to-primary/60 [--conic-position:from_290deg_at_center_top]"
      >
        <div className="absolute bottom-0 right-0 z-20 h-[100%] w-40 bg-background [mask-image:linear-gradient(to_left,white,transparent)]" />
        <div className="absolute bottom-0 right-0 z-20 h-40 w-[100%] bg-background [mask-image:linear-gradient(to_top,white,transparent)]" />
      </motion.div>
    </div>
  );
};

export default Lamp;
