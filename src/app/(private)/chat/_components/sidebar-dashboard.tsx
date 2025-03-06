"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LayoutDashboard, PlusIcon, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import HistoryChat from "./history-chat";
import Link from "next/link";

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <LayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <Settings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];

  const [open, setOpen] = useState(true);

  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-col overflow-hidden rounded-md border md:flex-row",
        "h-dvh",
      )}
    >
      <div className="p-5 dark:bg-neutral-900">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10 rounded-4xl">
            <div className="flex flex-1 flex-col justify-normal gap-y-8 overflow-x-hidden overflow-y-auto md:justify-between">
              <Link
                href={`/chat/${Date.now()}`}
                className="my-10 flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-white transition-colors hover:bg-blue-700 lg:my-5"
              >
                <PlusIcon className="h-5 w-5" />
                <span>New Conversation</span>
              </Link>

              <div className="flex-1 overflow-auto">
                <div className="space-y-2">
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    Your conversations
                  </p>
                  <HistoryChat />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
      </div>

      {children}
    </div>
  );
}
