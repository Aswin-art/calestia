"use server";
import React from "react";
import { redisClient } from "@/lib/redis";
import ChatMessageView from "./chat-message-view";

export default async function ChatContainer({
  conversationId,
  userId,
}: {
  conversationId: string;
  userId: string | null;
}) {
  const initialMessages = await redisClient.getHistory(userId, conversationId);

  return (
    <ChatMessageView
      userId={userId}
      initialMessages={initialMessages}
      conversationId={conversationId}
    />
  );
}
