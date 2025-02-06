import { routeNav } from "@/assets/data";
import Link from "next/link";
import React from "react";

const HeroRoot: React.FC = () => {
  return (
    <section className="flex min-h-screen w-screen flex-col items-center justify-center">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {routeNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-zinc-500 duration-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="animate-glow hidden h-px w-screen animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />

      <h1 className="text-edge-outline font-display z-10 animate-title cursor-default whitespace-nowrap bg-white bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text px-0.5 py-3.5 text-4xl font-bold text-transparent duration-3s sm:text-6xl md:text-9xl">
        Arcalis Ai
      </h1>

      <div className="animate-glow hidden h-px w-screen animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
      <div className="my-16 animate-fade-in space-y-2 text-center">
        <h2 className="text-sm text-zinc-500">
          I&apos;m building AI tools to solve problem for developers.
        </h2>
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-500 transition-colors hover:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Action Click
        </button>
      </div>
    </section>
  );
};

export default HeroRoot;
