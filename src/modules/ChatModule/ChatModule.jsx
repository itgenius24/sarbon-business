"use client";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  ChannelList,
} from "stream-chat-react";
// import "stream-chat-react/dist/css/index.css";

const ChatModule = () => {
  const apiKey = "8qurbezqtr38";
  const userId = "bobur6975";
  const userToken = "YOUR_USER_TOKEN"; // Usually generated from backend
  const chatClient = StreamChat.getInstance(apiKey);

  const token = chatClient.devToken('bobur6975');

  chatClient.connectUser(
    {
      id: userId,
      name: "Bobur6975",
      image: "https://example.com/profile.jpg",
    },
    token
  );

  const filters = { type: "messaging", members: { $in: [userId] } };
  const sort = { last_message_at: -1 };
  return (
    <Chat client={chatClient} theme="messaging light">
      <ChannelList filters={filters} sort={sort} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
};

export default ChatModule;
