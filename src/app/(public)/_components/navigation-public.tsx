"use client";

import Link from "next/link";

import React, { useState } from "react";
import { routeNav } from "@/assets/data";
import { useRouter } from "next/navigation";
import { Instagram, Linkedin, Lock, Menu, X } from "lucide-react";
import {
  useMotionValueEvent,
  AnimatePresence,
  motion,
  useScroll,
} from "motion/react";
import IconDiscord from "@/assets/icons/discord";
import IconTwitter from "@/assets/icons/twitter";
import IconTelegram from "@/assets/icons/telegram";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import Wrapper from "@/components/wrapper";
import { Badge } from "@/components/ui/badge";

const marsFont = localFont({
  src: "../../../assets/fonts/mars.otf",
  variable: "--font-mars",
});

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

  const components: {
    title: string;
    isLock: boolean;
    href: string;
    description: string;
  }[] = [
    {
      title: "Chat AI",
      isLock: false,
      href: "/chat-ai",
      description:
        "Interact in real-time with AI to get instant answers and assistance.",
    },
    {
      title: "Video Generator",
      isLock: true,
      href: "#",
      description: "Automatically create videos from text or images using AI.",
    },
    {
      title: "Image Generator",
      isLock: false,
      href: "/image-gen",
      description: "Generate high-quality AI images from your description.",
    },
    {
      title: "Face Editor",
      isLock: true,
      href: "#",
      description: "Edit faces in photos with automatic retouching features.",
    },
    {
      title: "Audio Generator",
      isLock: true,
      href: "#",
      description: "Quickly and easily create AI-generated sounds or music.",
    },
    {
      title: "Many More",
      isLock: false,
      href: "/#timeline",
      description: "Enjoy many more exciting features for your digital needs.",
    },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur duration-200 ${
        isIntersecting
          ? "border-transparent bg-zinc-900/0"
          : "border-zinc-800 bg-zinc-900/500"
      }`}
    >
      <Wrapper>
        <nav className="flex items-center justify-between px-4 py-8 lg:py-6">
          <div className="flex flex-1 items-center gap-1">
            <div className="relative inline-block">
              <Link href="/" className={`${marsFont.className} text-2xl`}>
                Arcalis
              </Link>
              <Badge
                variant="outline"
                className="absolute -top-2 -right-25" // sesuaikan nilai top/right sesuai kebutuhan
              >
                <span className="text-xs text-red-500">Beta Version</span>
              </Badge>
            </div>
          </div>
          <div className="hidden flex-1 justify-center lg:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-md bg-transparent",
                      )}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-md bg-transparent">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                          isLock={component.isLock}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="https://garrulous-coyote-265.notion.site/Arcalis-Documentation-1996834eb34880238e47cca691c1ed90"
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      target="_blank"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-md bg-transparent",
                      )}
                    >
                      Docs
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="https://docs.google.com/document/d/1shUkg63IJZS5qH2ZFoy7xywzYKmw0fZYTVnFCiES_XQ/edit?tab=t.0"
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      target="_blank"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-md bg-transparent",
                      )}
                    >
                      White Paper
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/dao" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-md bg-transparent",
                      )}
                    >
                      DAO
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="text-md text-zinc-40 hidden flex-1 justify-end gap-x-2 sm:gap-x-5 lg:flex">
            <Link
              href={"https://discord.gg/ps4HpGEcS7"}
              target="_blank"
              className="hover:bg-accent rounded border border-white/50 p-1.5"
            >
              <IconDiscord className="size-4" />
            </Link>
            <Link
              href={"/#"}
              target="_blank"
              className="hover:bg-accent rounded border border-white/50 p-1.5"
            >
              <IconTwitter className="size-4 fill-white" />
            </Link>
            <Link
              href={"#"}
              target="_blank"
              className="hover:bg-accent rounded border border-white/50 p-1.5"
            >
              <Instagram className="size-4" />
            </Link>

            <Link
              href={"#"}
              target="_blank"
              className="hover:bg-accent rounded border border-white/50 p-1.5"
            >
              <IconTelegram className="size-4" />
            </Link>

            <Link
              href={"https://www.linkedin.com/company/arcalisai/"}
              target="_blank"
              className="hover:bg-accent rounded border border-white/50 p-1.5"
            >
              <Linkedin className="size-4" />
            </Link>
          </div>

          <div className="block lg:hidden">
            <Menu className="cursor-pointer" onClick={toggleMenu} />
          </div>
        </nav>
      </Wrapper>

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

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  isLock?: boolean;
}

const ListItem = ({
  className,
  title,
  children,
  isLock,
  onClick,
  href = "#",
  ...props
}: ListItemProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isLock) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(e);
  };

  if (href === "#") {
    return (
      <li>
        <div
          className={cn(
            "relative block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
            !isLock &&
              "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            isLock && "cursor-not-allowed",
            className,
          )}
        >
          {isLock && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 bg-black/60 transition-colors">
              <Lock className="h-6 w-6 text-white" /> Coming Soon
            </div>
          )}
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </div>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={href as string}
        onClick={handleClick}
        className={cn(
          "relative block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
          !isLock &&
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          isLock && "cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {isLock && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 bg-black/60 transition-colors">
            <Lock className="h-6 w-6 text-white" /> Coming Soon
          </div>
        )}
        <div className="text-sm leading-none font-medium">{title}</div>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
          {children}
        </p>
      </Link>
    </li>
  );
};
