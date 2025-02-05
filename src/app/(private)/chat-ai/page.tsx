import { Fragment } from "react";
import { SidebarDashboard } from "../_components/sidebar";
import { ChatMessageListDemo } from "../_components/chat-message-list";

const PageChatAi: React.FC = () => {
  return (
    <Fragment>
      <SidebarDashboard />

      {/* <div className="w-full overflow-y-auto rounded-tl-2xl border border-neutral-200 bg-white p-2 dark:border-neutral-700 dark:bg-neutral-900 md:p-10">
        <div className="mx-auto w-full max-w-screen-lg">
          <ChatMessageListDemo />

          <ChatMessageListDemo />

          <ChatMessageListDemo />
        </div>
      </div> */}
    </Fragment>
  );
};

export default PageChatAi;
