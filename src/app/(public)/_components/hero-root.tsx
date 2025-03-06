"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { ArrowDown } from "lucide-react";
import localFont from "next/font/local";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { cookiesManagement } from "../../../../actions/cookie-store";

const marsFont = localFont({
  src: "../../../assets/fonts/mars.otf",
  variable: "--font-mars",
});

const HeroRoot: React.FC = () => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  useEffect(() => {
    if (address) {
      cookiesManagement(true, address);
    } else {
      cookiesManagement(false);
    }
  }, [address]);
  return (
    <section className="flex min-h-screen w-screen flex-col items-center justify-center">
      <div className="animate-glow animate-fade-left hidden h-px w-screen bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />

      <h1
        className={`${marsFont.className} text-edge-outline animate-title duration-3s z-10 cursor-default bg-white bg-linear-to-b from-neutral-50 to-neutral-400 bg-clip-text px-0.5 py-3.5 text-6xl font-bold whitespace-nowrap text-transparent sm:text-7xl md:text-9xl`}
      >
        Calestia
      </h1>

      <div className="animate-glow animate-fade-right hidden h-px w-screen bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
      <div className="animate-title space-y-2 text-center">
        <h2 className="text-sm text-zinc-500 sm:text-lg md:text-xl">
          Switch Models Like Chains - The Multi-AI Ecosystem.
        </h2>
        <div className="mt-10 flex justify-center gap-2">
          <Link
            href={"#timeline"}
            className={buttonVariants({
              variant: "ghost",
              className: "h-12 cursor-pointer font-medium",
            })}
          >
            Learn More <ArrowDown />
          </Link>

          {address ? (
            <ConnectButton />
          ) : (
            <Button
              onClick={openConnectModal}
              className="animate-shimmer inline-flex h-12 cursor-pointer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,oklch(0.623_0.214_259.815),45%,rgba(255,255,255,0.5),55%,oklch(0.623_0.214_259.815))] bg-[length:200%_100%] px-6 font-medium text-zinc-100 transition-colors hover:text-slate-50"
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroRoot;
