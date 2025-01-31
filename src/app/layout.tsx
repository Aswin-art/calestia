import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import ReactLenis from "lenis/react";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/theme-provider";
import Particles from "@/components/particles";

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
      </body>
    </html>
  );
}
