"use client";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { ErrorFallback } from "./_components/error-fallback";
import ChatMessageView from "./_components/chat-message-view";
import { useAccount } from "wagmi";

function ChatContainer() {
  const { address } = useAccount();
  return (
    <ChatMessageView initialMessages={[]} userId={address as string | null} />
  );
}

const PageChatAi: React.FC = () => {
  return (
    <ErrorBoundary errorComponent={ErrorFallback}>
      <ChatContainer />
    </ErrorBoundary>
  );
};

export default PageChatAi;
