"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import localFont from "next/font/local";

const marsFont = localFont({
  src: "../../../../assets/fonts/mars.otf",
  variable: "--font-mars",
});

export const Logo = () => {
  return (
    <Link
      href="/chat"
      className={`relative z-20 flex w-full items-center justify-between space-x-2 py-1 text-black`}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`${marsFont.className} text-xl whitespace-pre text-black dark:text-white`}
      >
        Calestia
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/chat"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </Link>
  );
};
