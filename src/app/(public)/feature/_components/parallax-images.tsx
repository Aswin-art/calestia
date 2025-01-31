import React from "react";
import { AnimateParallaxImg } from "@/app/(public)/feature/_components/animate-paralax-image";
import { plaiceholderImageRemote } from "@/lib/plaiceholder-img";
import { TAnimateParallaxImg } from "@/types/index.type";
export const dataParallaxImages: TAnimateParallaxImg[] = [
  {
    src: "https://images.unsplash.com/photo-1484600899469-230e8d1d59c0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "And example of a space launch",
    start: -200,
    end: 200,
    className: "w-1/3",
  },

  {
    src: "https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "An example of a space launch",
    start: 200,
    end: -250,
    className: "mx-auto w-2/3",
  },

  {
    src: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Orbiting satellite",
    start: -200,
    end: 200,
    className: "ml-auto w-1/3",
  },

  {
    src: "https://images.unsplash.com/photo-1494022299300-899b96e49893?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Orbiting satellite",
    start: 0,
    end: -500,
    className: "ml-24 w-5/12",
  },
];

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
