"use server";

import { redisClient, RedisMessage } from "@/lib/redis";
import { redis } from "@/lib/utils";
import type { TChatMessage } from "@/types/index.type";

export const historyChatAI = async (
  userId: string,
  conversationId: string,
): Promise<TChatMessage[]> => {
  try {
    // Validasi jika userId tidak diberikan
    if (!userId || !conversationId) {
      throw new Error("User ID is required");
    }

    // Ambil semua pesan dari history:userId:conversationId
    const messages = await redis.lrange(
      `history:${userId}:${conversationId}`,
      0,
      -1,
    );

    // redirect(`/chat-ai?conversationId=${conversationId}`);

    return messages as unknown as TChatMessage[];
  } catch (error) {
    console.error(`Error fetching chat history for user ${userId}:`, error);
    throw error;
  }
};

export const roomChatAI = async (userId: string) => {
  try {
    const conversations = await redisClient.getUserConversations(userId);

    if (conversations.length > 0) {
      const datas = await Promise.all(
        conversations.map(async (roomId) => {
          const rawMessages = await redisClient.getHistory(userId, roomId);

          // Tidak perlu parsing karena data sudah berupa object
          const messages = rawMessages as RedisMessage[];

          const assistantMsg = messages.find(
            ({ role }) => role === "assistant",
          );
          const title = assistantMsg ? assistantMsg.content : "";

          return {
            roomId,
            messages,
            title,
          };
        }),
      );

      const sortedDatas = datas.sort(
        (a, b) => Number(b.roomId) - Number(a.roomId),
      );
      return sortedDatas;
    }

    return [];
  } catch (error) {
    console.error(`Error fetching room chats for user ${userId}:`, error);
    throw error;
  }
};
