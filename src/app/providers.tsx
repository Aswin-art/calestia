"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "@/lib/wagmi";

import { ThemeProvider } from "@/components/theme-provider";
import Particles from "@/components/particles";
import ReactLenis from "lenis/react";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ReactLenis
              root
              options={{
                lerp: 0.05,
              }}
            >
              <Particles
                className="fixed inset-0 -z-10 animate-fade-in"
                quantity={100}
              />

              {children}
            </ReactLenis>
          </ThemeProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
