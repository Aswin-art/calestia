"use client";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { ErrorFallback } from "./_components/error-fallback";
import ChatMessageView from "./_components/chat-message-view";

function ChatContainer() {
  const storedUserId = localStorage.getItem("address");
  return <ChatMessageView initialMessages={[]} userId={storedUserId} />;
}

const PageChatAi: React.FC = () => {
  return (
    <ErrorBoundary errorComponent={ErrorFallback}>
      <ChatContainer />
    </ErrorBoundary>
  );
};

export default PageChatAi;
