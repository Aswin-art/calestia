import { routeNav } from "@/assets/data";
import Link from "next/link";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const HeroRoot: React.FC = () => {
  return (
    <section className="flex min-h-screen w-screen flex-col items-center justify-center">
      <nav className="animate-fade-in my-16">
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
      <div className="animate-glow animate-fade-left hidden h-px w-screen bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />

      <h1 className="text-edge-outline font-display animate-title duration-3s z-10 cursor-default bg-white bg-linear-to-b from-neutral-50 to-neutral-400 bg-clip-text px-0.5 py-3.5 text-4xl font-bold whitespace-nowrap text-transparent sm:text-6xl md:text-9xl">
        Arcalis Ai
      </h1>

      <div className="animate-glow animate-fade-right hidden h-px w-screen bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
      <div className="animate-fade-in my-16 space-y-2 text-center">
        <h2 className="text-sm text-zinc-500">
          I&apos;m building AI tools to solve problem for developers.
        </h2>
        <div className="mt-10 flex gap-2">
          <button className="animate-shimmer inline-flex h-12 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-zinc-500 transition-colors hover:text-slate-400 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-hidden">
            Action Click
          </button>
          <ConnectButton />
        </div>
      </div>
    </section>
  );
};

export default HeroRoot;
