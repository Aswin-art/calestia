"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import React from "react";
import { AlignLeft, ChevronDown } from "lucide-react";

const HistoryChat: React.FC = () => {
  const { open, animate } = useSidebar();

  return (
    <motion.div
      animate={{
        display: animate ? (open ? "inline-block" : "none") : "inline-block",
        opacity: animate ? (open ? 1 : 0) : 1,
      }}
      className="h-5/6 overflow-x-hidden overflow-y-auto pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700"
    >
      <div className="space-y-4">
        {Array.from({ length: 20 }, (_, index) => (
          <div
            key={index}
            className="flex items-center gap-x-4 rounded-full px-4 py-2 transition-all hover:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.1)] hover:text-[rgba(255,255,255,0.8)] hover:backdrop-blur-[30px]"
          >
            <AlignLeft className="w-10 md:w-14" />
            <p className="line-clamp-1">
              Lorem {index + 1} ipsum dolor sit amet consectetur adipisicing
              elit. Dolor architecto animi sapiente maiores laudantium fuga
              perspiciatis facere.
            </p>
          </div>
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
