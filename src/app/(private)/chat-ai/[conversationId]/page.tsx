import { Fragment } from "react";
import { ChatMessageView } from "@/app/(private)/_components/chat-message-view";
import { historyChatAI } from "../../../../../actions/chat-ai";

const PageChatAiConversation: React.FC<{
  params: Promise<{ conversationId: string }>;
}> = async ({ params }) => {
  const conversationId = (await params).conversationId;
  const chat = await historyChatAI("user123", conversationId);

  return (
    <Fragment>
      <ChatMessageView historyChat={chat} conversationId={conversationId} />
    </Fragment>
  );
};

export default PageChatAiConversation;
