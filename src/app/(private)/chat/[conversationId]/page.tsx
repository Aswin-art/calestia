import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { ErrorFallback } from "../_components/error-fallback";
import ChatContainer from "../_components/chat-container";
import { cookies } from "next/headers";

const PageChatAiConversation: React.FC<{
  params: Promise<{ conversationId: string }>;
}> = async ({ params }) => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session-address");
  const userAddress = sessionCookie ? JSON.parse(sessionCookie.value) : null;

  const conversationId = (await params).conversationId;

  return (
    <ErrorBoundary errorComponent={ErrorFallback}>
      <ChatContainer
        userId={userAddress ? userAddress?.value : null}
        conversationId={conversationId}
      />
    </ErrorBoundary>
  );
};

export default PageChatAiConversation;
