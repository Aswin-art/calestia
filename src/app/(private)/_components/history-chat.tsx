"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import React from "react";

const HistoryChat: React.FC = () => {
  const { open, animate } = useSidebar();

  return (
    <motion.div
      animate={{
        display: animate ? (open ? "inline-block" : "none") : "inline-block",
        opacity: animate ? (open ? 1 : 0) : 1,
      }}
      className="pointer-events-auto h-5/6 touch-pan-y overflow-y-auto overflow-x-hidden will-change-scroll [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar]:w-2"
    >
      <div className="w-60">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
        architecto animi sapiente maiores laudantium fuga perspiciatis facere.
        Exercitationem quidem corrupti laborum et. Cum sit deserunt possimus
        veritatis officia veniam suscipit. Lorem ipsum dolor, sit amet
        consectetur adipisicing elit. Excepturi saepe commodi architecto beatae
        maiores odio optio voluptates reprehenderit dignissimos assumenda ad quo
        modi sed facilis provident possimus non corporis, Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Ad quaerat sint magnam quam explicabo
        optio sit rem quae qui quos, voluptates harum est! Dolorum enim nostrum
        quo repudiandae blanditiis numquam quae ab mollitia praesentium. Quos
        velit molestiae ex laudantium numquam recusandae aut, omnis quasi fugiat
        ullam, enim commodi ea doloribus sint voluptatum. Cum repellendus nobis
        quas debitis, qui expedita provident! Aut illo minus esse, earum maxime
        sapiente totam voluptates aperiam in possimus a rerum, ut, aliquam
        consequatur molestiae nulla enim deleniti? Doloremque quae ducimus
        reiciendis harum ea dolores corporis assumenda! Enim mollitia tenetur
        omnis doloribus asperiores non odit ab nulla?
      </div>
    </motion.div>
  );
};

export default HistoryChat;
