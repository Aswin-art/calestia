"use client";

import { SECTION_HEIGHT } from "@/assets/data";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";

export const CenterImage: React.FC<{ src: string; base64: string }> = ({
  src,
  base64,
}) => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"],
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0],
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
      }}
    >
      <div className="relative size-full">
        <Image
          style={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%",
          }}
          src={src}
          alt="test"
          priority
          width="1400"
          height="1400"
          placeholder="blur"
          blurDataURL={base64}
        />

        <h1 className="absolute left-1/2 top-1/2 max-w-2xl -translate-x-1/2 -translate-y-1/2 text-center text-5xl leading-snug text-white">
          Scale your{" "}
          <span className="relative">
            Marketing
            <svg
              viewBox="0 0 286 73"
              fill="none"
              className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-1"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.25,
                  ease: "easeInOut",
                }}
                d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                stroke="#FACC15"
                strokeWidth="3"
              />
            </svg>
          </span>{" "}
          with Simple AI Tools
        </h1>
      </div>
    </motion.div>
  );
};
