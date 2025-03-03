"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import React from "react";
import { ChevronDown, Loader, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { roomChatAI } from "../../../../../actions/chat-ai";

const HistoryChat: React.FC = () => {
  const { open, animate } = useSidebar();

  const { data, isLoading } = useQuery({
    queryKey: ["history_chatAI"],
    queryFn: () => roomChatAI("user123"),
  });

  return (
    <motion.div
      animate={{
        display: animate ? (open ? "inline-block" : "none") : "inline-block",
        opacity: animate ? (open ? 1 : 0) : 1,
      }}
      className="h-5/6 space-y-3.5 overflow-x-hidden overflow-y-auto pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700"
    >
      <Link
        href={`/chat-ai/${Date.now()}`}
        type="button"
        className="flex w-fit cursor-pointer items-center gap-x-4 truncate rounded-full px-4 py-2 font-semibold transition-all hover:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] hover:text-[rgba(255,255,255,0.8)] hover:backdrop-blur-[30px]"
      >
        <Plus className="size-6" />

        <p>New Conversation</p>
      </Link>

      <div className="space-y-4">
        {isLoading && <Loader className="mx-auto size-8 animate-spin" />}

        {data &&
          data.map(({ title, roomId }, idx) => (
            <Link
              href={`/chat-ai/${roomId}`}
              key={idx}
              className="flex items-center gap-x-4 truncate rounded-full px-4 py-2 font-semibold transition-all hover:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] hover:text-[rgba(255,255,255,0.8)] hover:backdrop-blur-[30px]"
            >
              {/* {title.toString()} */}
              {/* <AlignLeft className="w-10 md:w-14" /> */}
              <p className="truncate font-semibold">
                {title ? title.toString() : ""}
              </p>
            </Link>
          ))}

        <div className="flex items-center gap-x-4 rounded-full py-2 pr-4 pl-1 transition-all hover:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] hover:text-[rgba(255,255,255,0.8)] hover:backdrop-blur-[30px] md:gap-x-0 md:pl-0 lg:pl-0">
          <ChevronDown className="w-10 md:w-14" />
          <p>Lainnya</p>
        </div>
      </div>
    </motion.div>
  );
};

export default HistoryChat;
