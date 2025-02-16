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
    // Ambil daftar conversation untuk user menggunakan method redisClient
    const conversations = await redisClient.getUserConversations(userId);

    if (conversations.length > 0) {
      // Untuk setiap conversation, ambil history chat-nya
      const datas = await Promise.all(
        conversations.map(async (roomId) => {
          // getHistory mengembalikan array string, jadi kita parsing tiap pesan
          const rawMessages = await redisClient.getHistory(userId, roomId);
          const messages = rawMessages.map((msg) =>
            JSON.parse(msg),
          ) as RedisMessage[];

          // Cari pesan dari assistant untuk dijadikan title (dengan pengecekan jika tidak ada)
          const assistantMsg = messages.find(
            ({ role }) => role === "assistant",
          );
          const title = assistantMsg ? assistantMsg.content : "";

          return {
            roomId, // untuk pelacakan
            messages,
            title,
          };
        }),
      );

      // Urutkan data berdasarkan roomId secara descending
      const sortedDatas = datas.sort(
        (a, b) => Number(b.roomId) - Number(a.roomId),
      );
      return sortedDatas;
    }

    return []; // Jika tidak ada percakapan, kembalikan array kosong
  } catch (error) {
    console.error(`Error fetching room chats for user ${userId}:`, error);
    throw error;
  }
};
