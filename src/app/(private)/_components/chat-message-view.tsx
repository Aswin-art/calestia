"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { redisClient, RedisMessage } from "@/lib/redis";

interface ChatMessageViewProps {
  initialMessages: RedisMessage[];
  conversationId?: string;
}

export default function ChatMessageView({
  initialMessages,
  conversationId,
}: ChatMessageViewProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<RedisMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Animasi variabel
  const messageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  const loadingVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Scroll otomatis ke bawah setiap kali pesan diperbarui
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fungsionalitas pembuatan sesi baru atau pembaruan sesi
  const createOrUpdateSession = async (newSessionId: string) => {
    try {
      if (!conversationId) {
        router.replace(`/chat-ai/${newSessionId}`);
        return newSessionId;
      }
      return conversationId;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const userInput = input;
    setInput("");

    const finalConversationId = conversationId ?? Date.now().toString();

    // await redisClient.storeMessage("user123", finalConversationId, {
    //   role: "user",
    //   content: userInput,
    //   model: "deepseek/deepseek-chat",
    // });

    const currentSessionId = await createOrUpdateSession(finalConversationId);
    try {
      // Optimistic update dengan menambahkan pesan user
      const userMessage: RedisMessage = { role: "user", content: userInput };
      setMessages((prev) => [
        ...prev,
        userMessage,
        { role: "assistant", content: "" },
      ]);

      // Kirim permintaan chat ke API
      const response = await fetch(
        `/api/chat?conversationId=${currentSessionId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "deepseek/deepseek-chat",
            messages: [
              { role: "user", content: [{ type: "text", text: userInput }] },
            ],
            stream: true,
          }),
        },
      );

      if (!response.body) throw new Error("Failed to get response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantContent += chunk;

        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.role === "assistant") {
            lastMessage.content = assistantContent;
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => prev.slice(0, -2)); // Rollback jika terjadi kesalahan
    } finally {
      setIsLoading(false);
    }
  };

  // Komponen animasi loading
  const LoadingBubble = () => (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={loadingVariants}
      className="flex items-center gap-2 rounded-lg bg-gray-100 p-4 dark:bg-gray-800"
    >
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="h-2 w-2 rounded-full bg-gray-500"
      />
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
        className="h-2 w-2 rounded-full bg-gray-500"
      />
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
        className="h-2 w-2 rounded-full bg-gray-500"
      />
    </motion.div>
  );

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-12 text-center"
          >
            <h1 className="mb-4 text-3xl font-bold">
              Selamat datang di ArcalisAI
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Mulailah percakapan dengan mengetik pesan Anda di bawah ini
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-lg rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <LoadingBubble />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <motion.div layout className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pesan Anda..."
            className="flex-1 rounded-lg border p-2 dark:bg-gray-900"
            disabled={isLoading}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? "Memproses..." : "Kirim"}
          </motion.button>
        </motion.div>
      </form>
    </div>
  );
}
