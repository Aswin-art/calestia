import Image from "next/image";
import React from "react";
import { FeatureSection } from "./why";

const About = () => {
  return (
    <>
      <div className="mb-20 flex flex-col items-center justify-center gap-2">
        <p className="text-center text-sm font-bold lg:text-xl">
          About Calestia
        </p>
        <div className="h-[1px] w-[10%] border border-b border-blue-500 lg:w-[5%]"></div>
      </div>
      <div className="grid min-h-[500px] grid-cols-1 gap-16 lg:grid-cols-2">
        <div
          className="relative h-[300px] overflow-hidden rounded-xl lg:h-[600px]"
          style={{
            WebkitMaskImage:
              "radial-gradient(circle, white 50%, transparent 100%)",
            maskImage: "radial-gradient(circle, white 50%, transparent 100%)",
          }}
        >
          <Image
            src="/space-astronout.png"
            alt="image-astronout"
            fill
            loading="lazy"
            sizes="100%"
            className="rounded-xl object-cover"
          />
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-bold lg:text-3xl">
            Redefining AI’s Future, Owned by the Community
          </h3>
          <div className="flex flex-col gap-2 text-justify text-sm lg:text-lg">
            <p>
              Calestia is the world’s first decentralized AI platform built on
              <span className="font-bold"> Bitfinity Network</span>, designed to
              democratize access to advanced artificial intelligence. We combine
              cutting-edge AI models, blockchain-powered governance, and a
              privacy-first infrastructure to create an all-in-one ecosystem
              where users and developers collaborate to shape the future of AI.
            </p>
            <p>
              Unlike traditional platforms controlled by corporations, Calestia
              empowers its community through{" "}
              <span className="font-bold">DAO governance</span>, allowing users
              to vote on model integrations, platform upgrades, and social
              impact initiatives. Our modular architecture supports seamless
              integration of new AI models, tools, and services, ensuring you
              always have access to the latest innovations—without vendor
              lock-in.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-40 mb-20 flex flex-col items-center justify-center gap-2">
        <p className="text-muted-foreground text-center text-sm lg:text-xl">
          Why Calestia?
        </p>
        <h3 className="text-center text-xl font-bold lg:text-3xl">
          The Decentralized Advantage
        </h3>
        <div className="h-[1px] w-[15%] border border-b border-blue-500 lg:w-[5%]"></div>
        <FeatureSection />
      </div>
    </>
  );
};

export default About;
