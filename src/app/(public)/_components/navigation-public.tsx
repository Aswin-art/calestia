"use client";

import Link from "next/link";

import { useState } from "react";
import { routeNav } from "@/assets/data";
import { useRouter } from "next/navigation";
import { Instagram, Menu, X } from "lucide-react";
import {
  useMotionValueEvent,
  AnimatePresence,
  motion,
  useScroll,
} from "motion/react";
import IconDiscord from "@/assets/icons/discord";
import IconTwitter from "@/assets/icons/twitter";
import IconTelegram from "@/assets/icons/telegram";

const NavigationPublic: React.FC = () => {
  const { scrollY } = useScroll();
  const [isIntersecting, setIntersecting] = useState(true);

  const router = useRouter();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIntersecting(latest < 50);
  });
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const closeToggleMenu = (route: string) => {
    router.push(route);
    setOpen(false);
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
          <Link href={"/"} className="size-5 rounded-full bg-yellow-400" />
        </div>
        <div className="text-md text-zinc-40gap-x-0 flex gap-x-3 sm:gap-x-5">
          <IconDiscord className="size-5" />
          <Link href={"/projects"}>
            <IconTwitter className="size-5 fill-white" />
          </Link>
          <Link href="#">
            <Instagram className="size-5 stroke-white" />
          </Link>

          <Link href="#">
            <IconTelegram className="size-5" />
          </Link>
        </div>

        <Menu className="size-6 cursor-pointer" onClick={toggleMenu} />
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-0 left-0 z-20 h-screen w-full origin-top overflow-hidden bg-neutral-950 backdrop-blur-md"
          >
            <div className="flex h-full flex-col text-white">
              <div className="flex justify-between p-8">
                <Link href={"/"} className="text-lg text-white">
                  Arcalis
                </Link>

                <X className="size-6 cursor-pointer" onClick={toggleMenu} />
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex w-full flex-col items-start space-y-2"
              >
                {routeNav.map((link, index) => {
                  return (
                    <MobileNavLink
                      key={index}
                      title={link.name}
                      onClick={() => closeToggleMenu(link.href)}
                    />
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
const MobileNavLink = ({
  title,
  onClick, // Perbaikan: Sesuaikan dengan tipe yang didefinisikan
}: {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>; // Tipe tetap benar
}) => {
  return (
    <motion.button
      onClick={onClick} // Pastikan konsistensi dengan properti yang diterima
      type="button"
      variants={mobileLinkVars}
      className="w-full cursor-pointer px-8 py-2 text-left font-semibold text-white hover:bg-white/10"
    >
      {title}
    </motion.button>
  );
};
