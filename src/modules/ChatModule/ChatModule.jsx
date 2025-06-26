"use client";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  ChannelList,
  Thread,
  ChannelPreviewMessenger,
} from "stream-chat-react";
import { getToken } from "@/utils/getToken";
import { Box } from "@chakra-ui/react";
import { MessageInputWithLocationButton } from "./components/MessageInputWithLocationButton/MessageInputWithLocationButton";
import { AttachmentWithMap } from "./components/AttachmentWithMap/AttachmentWithMap";
import authStore from "@/store/auth.store";

const ChatModule = () => {
  const [channel, setChannel] = useState(null);
  const [client, setClient] = useState(null);

  const apiKey = "8qurbezqtr38"; // Stream API key

  const user = {
    id: authStore.userData.guid,
    name: authStore.userData.full_name,
    image: authStore.userData.photo || ``,
  };

  const filters = { type: "messaging", members: { $in: [user.id] } };

  const sort = { last_message_at: -1 };

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance(apiKey);
      await client.connectUser(user, client.devToken(user.id));
      setClient(client);
    };

    initChat();
    return () => {
      if (client) client.disconnectUser();
    };
  }, []);

  const handleSelectChannel = async (selectedChannel) => {
    await selectedChannel.watch(); // faqat tanlagandan keyin ulanadi
    setChannel(selectedChannel);
  };

  if (!client) return <div>Yuklanmoqda...</div>;

  return (
    <Chat client={client} theme="messaging light">
      <div style={{ display: "flex", height: "90vh" }}>
        <Box width={`400px`}>
          <ChannelList
            showChannelSearch
            filters={filters}
            sort={sort}
            Preview={(props) => (
              <div
                key={props.channel.id}
                onClick={() => handleSelectChannel(props.channel)}
              >
                <ChannelPreviewMessenger {...props} />
              </div>
            )}
          />
        </Box>

        <Box width={`100%`}>
          {channel ? (
            <Channel Attachment={AttachmentWithMap} channel={channel}>
              <Window>
                <Box width={`100%`} borderBottom={"1px solid #e2e8f0"}>
                  <ChannelHeader />
                </Box>
                <MessageList />
                <MessageInputWithLocationButton />
              </Window>
              <Thread />
            </Channel>
          ) : (
            <div style={{ padding: "2rem" }}>Kanal tanlang...</div>
          )}
        </Box>
      </div>
    </Chat>
  );
};

export default ChatModule;
