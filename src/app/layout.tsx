import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import NextTopLoader from "nextjs-toploader";

import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Arcalis",
    template: "%s | Arcalis",
  },
  description: "Switch Models Like Chains - The Multi-AI Ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} scroll-smooth bg-zinc-950 antialiased`}
      >
        <NextTopLoader />
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
