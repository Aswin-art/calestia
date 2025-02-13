import Image from "next/image";
import React from "react";
import { FeatureSection } from "./why";

const About = () => {
  return (
    <>
      <div className="mb-20 flex flex-col items-center justify-center gap-2">
        <p className="text-center text-xl font-bold">About Arcalis</p>
        <div className="h-[1px] w-[5%] border border-b border-blue-500"></div>
      </div>
      <div className="grid min-h-[500px] grid-cols-1 gap-16 lg:grid-cols-2">
        <div
          className="relative overflow-hidden rounded-xl"
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
            sizes="100%"
            className="rounded-xl object-cover"
          />
        </div>
        <div className="flex flex-col gap-10">
          <h3 className="text-3xl font-bold">
            Redefining AI’s Future, Owned by the Community
          </h3>
          <div className="flex flex-col gap-5 text-justify text-lg">
            <p>
              Arcalis is the world’s first decentralized AI platform built on
              **Manta Network**, designed to democratize access to advanced
              artificial intelligence. We combine cutting-edge AI models,
              blockchain-powered governance, and a privacy-first infrastructure
              to create an all-in-one ecosystem where users and developers
              collaborate to shape the future of AI.
            </p>
            <p>
              Unlike traditional platforms controlled by corporations, Arcalis
              empowers its community through **DAO governance**, allowing users
              to vote on model integrations, platform upgrades, and social
              impact initiatives. Our modular architecture supports seamless
              integration of new AI models, tools, and services, ensuring you
              always have access to the latest innovations—without vendor
              lock-in
            </p>
            <p>
              From startups to enterprises, educators to investors, Arcalis
              provides tailored AI solutions that adapt to your needs. Built on
              Manta Network’s zero-knowledge proofs (ZKPs), we guarantee
              **enterprise-grade security**, **energy efficiency**, and
              **cross-chain interoperability**, making AI accessible, ethical,
              and sustainable for everyone.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-40 mb-20 flex flex-col items-center justify-center gap-2">
        <p className="text-muted-foreground text-center text-xl">
          Why Arcalis?
        </p>
        <h3 className="text-4xl font-bold">The Decentralized Advantage</h3>
        <div className="h-[1px] w-[5%] border border-b border-blue-500"></div>
        <FeatureSection />
      </div>
    </>
  );
};

export default About;
