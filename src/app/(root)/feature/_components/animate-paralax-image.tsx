"use client";

import { TAnimateParallaxImg } from "@/types/index.type";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export const AnimateParallaxImg: React.FC<TAnimateParallaxImg> = ({
  src,
  alt,
  className,
  start,
  end,
  ...props
}) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.div ref={ref} style={{ transform, opacity }}>
      <Image
        src={src}
        alt={alt}
        className={className}
        width="500"
        height="500"
        {...props}
      />
    </motion.div>
  );
};
