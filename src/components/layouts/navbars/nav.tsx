"use client";

import { routeNav } from "@/assets/data";
import { ArrowLeft } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import React, { useState } from "react";

export const Navigation: React.FC = () => {
  const { scrollY } = useScroll();
  const [isIntersecting, setIntersecting] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIntersecting(latest < 50);
  });
  return (
    <header>
      <div
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur duration-200 ${
          isIntersecting
            ? "border-transparent bg-zinc-900/0"
            : "bg-zinc-900/500 border-zinc-800"
        }`}
      >
        <div className="container mx-auto flex flex-row-reverse items-center justify-between p-6">
          <div className="flex justify-between gap-8">
            {routeNav.map(({ href, name }, idx) => (
              <Link
                key={idx}
                href={href}
                className="text-zinc-400 duration-200 hover:text-zinc-100"
              >
                {name}
              </Link>
            ))}
          </div>

          <Link
            href="/"
            className="text-zinc-300 duration-200 hover:text-zinc-100"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  );
};
