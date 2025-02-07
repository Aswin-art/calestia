"use client";

import Link from "next/link";

import { useState } from "react";
import { routeNav } from "@/assets/data";
import { usePathname } from "next/navigation";
import {
  useMotionValueEvent,
  AnimatePresence,
  motion,
  useScroll,
} from "motion/react";

const navLinks = [
  { title: "What we do", href: "/" },
  { title: "How it works", href: "/" },
  { title: "Case studies", href: "/" },
  { title: "About", href: "/" },
  { title: "Contact", href: "/" },
];
const NavigationPublic: React.FC = () => {
  const { scrollY } = useScroll();
  const [isIntersecting, setIntersecting] = useState(true);
  const router = usePathname();
  const nav = routeNav.filter(({ href }) => href !== router);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIntersecting(latest < 50);
  });
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur duration-200 ${
        isIntersecting
          ? "border-transparent bg-zinc-900/0"
          : "border-zinc-800 bg-zinc-900/500"
      }`}
    >
      <nav className="flex items-center justify-between px-4 py-8 lg:py-6">
        <div className="flex items-center gap-[1ch]">
          <div className="h-5 w-5 rounded-full bg-yellow-400" />
          <span className="text-sm font-semibold tracking-widest">
            PORTFOLIO
          </span>
        </div>
        <div className="text-md hidden gap-12 text-zinc-400 lg:flex">
          <Link href="#" className="font-medium text-black">
            Home
          </Link>
          <Link href={"/projects"}>Project</Link>
          Contact
        </div>
        <div
          className="text-md cursor-pointer text-black lg:hidden"
          onClick={toggleMenu}
        >
          Menu
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-0 left-0 z-20 h-screen w-full origin-top bg-neutral-800 backdrop-blur-[30px]"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-between">
                <h1 className="text-lg text-white">Portfolio</h1>
                <p
                  className="text-md cursor-pointer text-white"
                  onClick={toggleMenu}
                >
                  Close
                </p>
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="font-lora flex h-full flex-col items-center justify-center gap-4"
              >
                {navLinks.map((link, index) => {
                  return (
                    <div className="overflow-hidden" key={index}>
                      <MobileNavLink
                        key={index}
                        title={link.title}
                        href={link.href}
                      />
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavigationPublic;

const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};
const MobileNavLink = ({ title, href }: { title: string; href: string }) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      className="text-5xl text-black uppercase"
    >
      <Link href={href}>{title}</Link>
    </motion.div>
  );
};
