"use server";

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
    // Ambil daftar conversation untuk user dari Redis
    const conversations = await redis.smembers(`conversations:${userId}`);

    if (conversations.length > 0) {
      // Ambil semua history chat berdasarkan conversationId yang ditemukan
      const datas = await Promise.all(
        conversations.map(async (roomId) => {
          const messages = (await redis.lrange(
            `history:${userId}:${roomId}`,
            0,
            -1,
          )) as unknown as TChatMessage[];

          return {
            roomId, // Simpan roomId agar bisa dilacak
            messages: messages, // Parsing pesan dari Redis
            title: messages.filter(({ role }) => role === "assistant")[0]
              .content,
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
