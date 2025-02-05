"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LayoutDashboard, UserCog, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dashboard } from "./dashboard";
import { Logo, LogoIcon } from "./logo-dashboard";

import HistoryChat from "./history-chat";
import { ChatMessageListDemo } from "./chat-message-list";

export function SidebarDashboard() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <LayoutDashboard className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <UserCog className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <Settings className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <LogOut className="h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800 md:flex-row",
        "h-dvh",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col justify-normal gap-y-8 overflow-y-auto overflow-x-hidden md:justify-between">
            {open ? <Logo /> : <LogoIcon />}

            <HistoryChat />
            <div className="flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          {/* <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div> */}
        </SidebarBody>
      </Sidebar>

      <div className="h-full w-full overflow-y-auto rounded-tl-2xl border border-neutral-200 bg-white px-2 pt-2 dark:border-neutral-700 dark:bg-neutral-900 md:px-10 md:pb-0 md:pt-10">
        <div className="relative mx-auto h-full w-full max-w-screen-lg">
          <ChatMessageListDemo />

          {/* <ChatMessageListDemo />

          <ChatMessageListDemo /> */}
        </div>
      </div>
    </div>
  );
}
