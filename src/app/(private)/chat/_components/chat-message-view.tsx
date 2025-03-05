/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { RedisMessage } from "@/lib/redis";
import ReactMarkdown from "react-markdown";
import { Mic, Paperclip, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextAreatAutoGrowing } from "@/components/ui/text-area-autogrowing";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import { ChatBubble, ChatBubbleMessage } from "./chat-bubble";

interface ChatMessageViewProps {
  userId: string | null;
  initialMessages: RedisMessage[];
  conversationId?: string;
}

export default function ChatMessageView({
  userId,
  initialMessages,
  conversationId,
}: ChatMessageViewProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<RedisMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadingVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const createOrUpdateSession = async (newSessionId: string) => {
    try {
      if (!conversationId) {
        router.replace(`/chat/${newSessionId}`);
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

    const userMessage: RedisMessage = { role: "user", content: userInput };
    const tempAssistantMessage: RedisMessage = {
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [...prev, userMessage, tempAssistantMessage]);

    try {
      if (!userId) {
        console.log("Server is bussy!");
        return;
      }

      const streamMode = false;
      const response = await fetch(
        `/api/chat?conversationId=${finalConversationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": userId,
            "x-user-tier": "Explorer",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-chat",
            messages: [{ role: "user", content: userInput }],
            stream: streamMode,
          }),
        },
      );

      console.log("response", response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error text:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) throw new Error("Failed to get response body");

      if (streamMode) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          assistantContent += chunk;

          console.log("assistantContent", assistantContent);

          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === "assistant") {
              lastMessage.content = assistantContent;
            }
            return newMessages;
          });
        }
      } else {
        const data = await response.json();
        const assistantContent = data.choices[0].message.content;

        setMessages((prev) => {
          const newMessages = [...prev].map((msg, index) => {
            if (index === prev.length - 1 && msg.role === "assistant") {
              return { ...msg, content: assistantContent };
            }
            return msg;
          });
          return newMessages;
        });
      }

      await createOrUpdateSession(finalConversationId);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => prev.slice(0, -2));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAttachFile = () => {
    //
  };

  const handleMicrophoneClick = () => {
    //
  };

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
    <div className="relative mx-auto flex h-full max-w-3xl flex-col">
      <div className="flex-1 space-y-4 p-4">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-12"
          >
            <h2 className="from-primary to-danger bg-gradient-to-r bg-clip-text text-3xl font-semibold text-transparent">
              Welcome, how can I help you today?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Start a conversation by typing your message below.
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          <motion.div
            key="chatMessageList"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChatMessageList>
              {messages.map((message, index) => (
                <ChatBubble
                  variant={message.role === "user" ? "sent" : "received"}
                  key={index}
                >
                  {message.role === "user" && (
                    <ChatBubbleMessage variant="sent">
                      {message.content}
                    </ChatBubbleMessage>
                  )}

                  {message.role === "assistant" && (
                    <ChatBubbleMessage variant="received">
                      <article className="pros">
                        <ReactMarkdown>
                          {message.content ? message.content.toString() : ""}
                        </ReactMarkdown>
                      </article>
                    </ChatBubbleMessage>
                  )}
                </ChatBubble>
              ))}
            </ChatMessageList>
          </motion.div>

          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <LoadingBubble />
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-3 z-10 w-full space-y-2.5 rounded-lg border border-neutral-600 bg-neutral-900 p-1 focus:outline-0"
      >
        <TextAreatAutoGrowing
          setText={setInput}
          value={input}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e as any);
            }
          }}
          className="h-8 max-h-32 overflow-y-auto border-none bg-neutral-900 p-3 outline-none focus:ring-0 focus:outline-none md:max-h-40 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700"
        />

        <div className="flex items-center justify-between p-3 pt-0">
          <div className="flex">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={handleAttachFile}
            >
              <Paperclip className="size-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={handleMicrophoneClick}
            >
              <Mic className="size-4" />
            </Button>
          </div>
          <Button
            type="submit"
            className="size-14 cursor-pointer rounded-full border-0 border-solid border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.8)] uppercase no-underline backdrop-blur-[30px] hover:bg-[rgba(255,255,255,0.2)]"
          >
            <SendHorizontal size="25px" />
          </Button>
        </div>
      </form>
    </div>
  );
}
