import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function DaoProposal({
  title,
  description,
  creator,
}: {
  title: string;
  description: string;
  creator: string;
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
      animate={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative h-52 w-full overflow-hidden rounded-2xl border border-zinc-600 duration-700 hover:border-zinc-400/50 hover:bg-zinc-800/10"
      >
        <div
          className="absolute inset-0 z-0 transition-opacity duration-300 ease-in-out"
          style={{
            background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2), transparent 80%)`,
            opacity: isHovered ? 1 : 0,
            pointerEvents: "none",
          }}
        />

        <article className="h-full p-4">
          <h2 className="font-display z-20 truncate text-xl font-semibold text-zinc-200 duration-1000 group-hover:text-white">
            {title}
          </h2>

          <div className="flex items-center gap-x-2">
            <div className="size-2 rounded-full bg-green-600"></div>
            <p className="truncate text-sm">{creator}</p>
          </div>

          <p className="mt-4 line-clamp-6 text-sm text-zinc-400 group-hover:text-zinc-200">
            {description}
          </p>
        </article>
      </motion.div>
    </motion.div>
  );
}
