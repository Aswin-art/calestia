import { Suspense } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { ErrorFallback } from "../../_components/error-fallback";
import { ChatLoadingSkeleton } from "../../_components/chat-loading";
import { redisClient } from "@/lib/redis";
import ChatMessageView from "../../_components/chat-message-view";

async function ChatContainer({ conversationId }: { conversationId: string }) {
  const userId = "user123";
  const initialMessages = await redisClient.getHistory(userId, conversationId);

  return (
    <ChatMessageView
      initialMessages={initialMessages}
      conversationId={conversationId}
    />
  );
}

const PageChatAiConversation: React.FC<{
  params: Promise<{ conversationId: string }>;
}> = async ({ params }) => {
  const conversationId = (await params).conversationId;
  return (
    <ErrorBoundary errorComponent={ErrorFallback}>
      <Suspense fallback={<ChatLoadingSkeleton />}>
        <ChatContainer conversationId={conversationId} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default PageChatAiConversation;
