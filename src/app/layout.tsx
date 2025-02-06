import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import NextTopLoader from "nextjs-toploader";

import Navbar from "@/components/navbar";

import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";

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
    default: "arcalis.com",
    template: "%s | arcalis.com",
  },
  description: "I'm building AI tools to solve problem for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-zinc-950 antialiased`}
      >
        <NextTopLoader />
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
