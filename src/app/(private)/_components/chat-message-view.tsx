"use client";

import { useState, FormEvent } from "react";
import { Paperclip, Mic, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/app/(private)/_components/chat-bubble";
import { TextAreatAutoGrowing } from "@/components/ui/text-area-autogrowing";

export function ChatMessageView() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! How can I help you today?",
      sender: "ai",
    },
    {
      id: 2,
      content: "I have a question about the component library.",
      sender: "user",
    },
    {
      id: 3,
      content: "Sure! I'd be happy to help. What would you like to know?",
      sender: "ai",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content: input,
        sender: "user",
      },
    ]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: "This is an AI response to your message.",
          sender: "ai",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleAttachFile = () => {
    //
  };

  const handleMicrophoneClick = () => {
    //
  };

  return (
    <>
      <div className="relative flex h-full flex-col justify-between">
        <div className="">
          <ChatMessageList>
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                variant={message.sender === "user" ? "sent" : "received"}
              >
                <ChatBubbleAvatar
                  className="h-8 w-8 shrink-0"
                  src={
                    message.sender === "user"
                      ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop"
                      : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
                  }
                  fallback={message.sender === "user" ? "US" : "AI"}
                />
                <ChatBubbleMessage
                  variant={message.sender === "user" ? "sent" : "received"}
                >
                  {message.content}
                </ChatBubbleMessage>
              </ChatBubble>
            ))}

            {isLoading && (
              <ChatBubble variant="received">
                <ChatBubbleAvatar
                  className="h-8 w-8 shrink-0"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
                  fallback="AI"
                />
                <ChatBubbleMessage isLoading />
              </ChatBubble>
            )}
          </ChatMessageList>
        </div>
        <div className="sticky bottom-0 z-10 pb-10">
          <div className="h-10 w-full rounded-md bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(23,23,23,0.5)_60%)] before:absolute before:inset-x-0 before:bottom-0 before:-z-10 before:h-[50%] before:bg-neutral-900"></div>

          <form
            onSubmit={handleSubmit}
            className="w-full space-y-2.5 rounded-lg border border-neutral-600 bg-neutral-900 p-1 focus:outline-0"
          >
            <TextAreatAutoGrowing
              setText={setInput}
              value={input}
              placeholder="Type your message..."
              className="max-h-32 overflow-y-auto border-none bg-neutral-900 p-3 focus:ring-0 md:max-h-40 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700"
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
      </div>
    </>
  );
}
