import { Fragment } from "react";
import Particles from "@/components/particles";
import Link from "next/link";
import { routeNav } from "@/assets/data";

export default function RootPage() {
  return (
    <Fragment>
      <section className="flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
        <nav className="my-16 animate-fade-in">
          <ul className="flex items-center justify-center gap-4">
            {routeNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-500 duration-500 hover:text-zinc-300"
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </nav>
        <div className="animate-glow hidden h-px w-screen animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
        <Particles
          className="absolute inset-0 -z-10 animate-fade-in"
          quantity={100}
        />
        <h1 className="text-edge-outline font-display duration-3s z-10 animate-title cursor-default whitespace-nowrap bg-white bg-clip-text px-0.5 py-3.5 text-4xl font-bold text-transparent sm:text-6xl md:text-9xl">
          Arcalis Ai
        </h1>

        <div className="animate-glow hidden h-px w-screen animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
        <div className="my-16 animate-fade-in text-center">
          <h2 className="text-sm text-zinc-500">
            I&apos;m building AI tools to solve problem for developers.
          </h2>
        </div>
      </section>
    </Fragment>
  );
}
