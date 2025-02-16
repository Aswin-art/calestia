"use client";

import { useState, FormEvent } from "react";
import { Paperclip, Mic, SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import type { TChatMessage, TUserContent } from "@/types/index.type";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/app/(private)/_components/chat-bubble";
import { TextAreatAutoGrowing } from "@/components/ui/text-area-autogrowing";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

export function ChatMessageView({
  historyChat,
  conversationId,
}: {
  historyChat: TChatMessage[];
  conversationId: string;
}) {
  const userId = "user123";
  const router = useRouter();

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    if (!input.trim()) return;

    if (historyChat.length === 0) {
      router.push(`/chat-ai/${conversationId}`);
    }

    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_REDIS_BE}?userId=${userId}&conversationId=${conversationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-chat",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: input,
                  },
                ],
              },
            ],
          }),
        },
      );

      await req.json();
      setInput("");
      router.refresh();
    } catch (error) {
      console.log(error);
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

  return (
    <>
      <div className="relative flex h-full flex-col justify-between">
        <div className="">
          {historyChat.length > 0 ? (
            <ChatMessageList>
              {historyChat &&
                historyChat.map(({ content, role }, idx) => (
                  <ChatBubble
                    variant={role === "user" ? "sent" : "received"}
                    key={idx}
                  >
                    <ChatBubbleAvatar
                      className="h-8 w-8 shrink-0"
                      src={
                        role === "user"
                          ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop"
                          : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop"
                      }
                      fallback={role === "user" ? "US" : "AI"}
                    />

                    {role === "user" && (
                      <ChatBubbleMessage variant={"sent"}>
                        {role === "user"
                          ? (content as TUserContent[])[0].text
                          : ""}
                      </ChatBubbleMessage>
                    )}

                    {role === "assistant" && (
                      <ChatBubbleMessage variant={"received"}>
                        <article className="pros">
                          <ReactMarkdown>
                            {role === "assistant" && content
                              ? content.toString()
                              : ""}
                          </ReactMarkdown>
                        </article>
                      </ChatBubbleMessage>
                    )}
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
          ) : (
            <h2 className="from-primary to-danger bg-gradient-to-r bg-clip-text text-3xl font-semibold text-transparent">
              Welcome, how can i help you today?
            </h2>
          )}
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
