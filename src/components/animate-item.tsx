"use client";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useRef, useState } from "react";

export default function AnimatedItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setMousePosition({ x, y });
    }
  }

  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-6"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative w-full overflow-hidden rounded-2xl border border-zinc-600 duration-700 hover:border-zinc-400/50 hover:bg-zinc-800/10"
      >
        <div
          className="absolute inset-0 z-0 transition-opacity duration-300 ease-in-out"
          style={{
            background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2), transparent 80%)`,
            opacity: isHovered ? 1 : 0,
            pointerEvents: "none",
          }}
        />

        <article className="p-4 md:p-8">
          <div className="flex items-center justify-between gap-2">
            <span className="drop-shadow-orange text-xs text-zinc-200 duration-1000 group-hover:border-zinc-200 group-hover:text-white">
              <span>SOON</span>
            </span>
            <span className="flex items-center gap-1 text-xs text-zinc-500">
              <Eye className="h-4 w-4" /> 12312132
            </span>
          </div>
          <h2 className="font-display z-20 text-xl font-medium text-zinc-200 duration-1000 group-hover:text-white">
            {title}
          </h2>
          <p className="z-20 mt-4 text-sm text-zinc-400 duration-1000 group-hover:text-zinc-200">
            {description}
          </p>
        </article>
      </motion.div>
    </motion.div>
  );
}
