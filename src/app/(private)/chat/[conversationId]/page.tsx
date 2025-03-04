import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { ErrorFallback } from "../_components/error-fallback";
import ChatContainer from "../_components/chat-container";

const PageChatAiConversation: React.FC<{
  params: Promise<{ conversationId: string }>;
}> = async ({ params }) => {
  const conversationId = (await params).conversationId;

  return (
    <ErrorBoundary errorComponent={ErrorFallback}>
      <ChatContainer
        userId={"0x0090C6d8144B20f049bBCa8cB4b2D50a203a708f"}
        conversationId={conversationId}
      />
    </ErrorBoundary>
  );
};

export default PageChatAiConversation;
