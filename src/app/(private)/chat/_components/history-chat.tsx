"use client";

import { motion } from "framer-motion";
import React from "react";
import { Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { roomChatAI } from "../../../../../actions/chat-ai";
import { useAccount } from "wagmi";

const HistoryChat: React.FC = () => {
  const { address } = useAccount();

  const { data, isLoading } = useQuery({
    queryKey: ["history_chatAI"],
    queryFn: () => roomChatAI(address as string),
    enabled: address !== undefined,
  });

  return (
    <motion.div className="h-5/6 space-y-3.5 overflow-x-hidden overflow-y-auto pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700">
      <div className="space-y-4">
        {isLoading && <Loader className="mx-auto size-8 animate-spin" />}

        {data &&
          data.map(({ title, roomId }, idx) => (
            <Link
              href={`/chat/${roomId}`}
              key={idx}
              className="flex items-center gap-x-4 truncate rounded-full px-4 py-2 font-semibold transition-all hover:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] hover:text-[rgba(255,255,255,0.8)] hover:backdrop-blur-[30px]"
            >
              <p className="truncate font-semibold">
                {title ? title.toString() : ""}
              </p>
            </Link>
          ))}
      </div>
    </motion.div>
  );
};

export default HistoryChat;
