import { Suspense } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { ErrorFallback } from "./_components/error-fallback";
import { ChatLoadingSkeleton } from "./_components/chat-loading";
import ChatMessageView from "./_components/chat-message-view";

async function ChatContainer() {
  return <ChatMessageView initialMessages={[]} />;
}

const PageChatAi: React.FC = () => {
  return (
    <ErrorBoundary errorComponent={ErrorFallback}>
      <Suspense fallback={<ChatLoadingSkeleton />}>
        <ChatContainer />
      </Suspense>
    </ErrorBoundary>
  );
};

export default PageChatAi;
