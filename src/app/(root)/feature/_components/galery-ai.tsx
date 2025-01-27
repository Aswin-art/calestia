"use client";

import React from "react";
import ParallaxImages from "@/app/(root)/feature/_components/parallax-images";
import { CenterImage } from "@/app/(root)/feature/_components/center-image";
import Particles from "@/components/particles";

export const SECTION_HEIGHT = 1500;

const GaleryAi = () => {
  return (
    <section>
      <Particles
        className="fixed inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <div
        style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
        className="relative w-full"
      >
        <CenterImage />

        <ParallaxImages />

        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
      </div>
    </section>
  );
};

export default GaleryAi;
