import React from "react";
import { AnimateParallaxImg } from "./animate-paralax-image";
import { plaiceholderImageRemote } from "@/lib/plaiceholder-img";
import { dataParallaxImages } from "@/assets/data";

const ParallaxImages: React.FC = async () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      {dataParallaxImages.map(async ({ src, ...data }, idx) => {
        const base64 = await plaiceholderImageRemote(src as string);

        return (
          <AnimateParallaxImg
            key={idx}
            src={src}
            blurDataURL={base64}
            placeholder="blur"
            {...data}
          />
        );
      })}
    </div>
  );
};

export default ParallaxImages;
