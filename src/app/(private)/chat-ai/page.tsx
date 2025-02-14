import { Fragment } from "react";
import { ChatMessageView } from "../_components/chat-message-view";
import { historyChatAI } from "../../../../actions/chat-ai";

const PageChatAi: React.FC = async () => {
  const conversationId = Date.now().toString();

  const chat = await historyChatAI("user123", conversationId);

  return (
    <Fragment>
      <ChatMessageView historyChat={chat} conversationId={conversationId} />
    </Fragment>
  );
};

export default PageChatAi;
