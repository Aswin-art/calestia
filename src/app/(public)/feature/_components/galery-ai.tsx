import React from "react";
import ParallaxImages from "@/app/(public)/feature/_components/parallax-images";
import { CenterImage } from "@/app/(public)/feature/_components/center-image";
import { SECTION_HEIGHT } from "@/assets/data";
import { plaiceholderImageRemote } from "@/lib/plaiceholder-img";

const GaleryAi: React.FC = async () => {
  const src =
    "https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const base64 = await plaiceholderImageRemote(src);

  return (
    <section>
      <div
        style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
        className="relative w-full"
      >
        <CenterImage src={src} base64={base64} />

        <ParallaxImages />

        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
      </div>
    </section>
  );
};

export default GaleryAi;
