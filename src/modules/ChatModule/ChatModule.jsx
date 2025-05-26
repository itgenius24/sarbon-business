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

const ChatModule = () => {
  const [channel, setChannel] = useState(null);
  const [client, setClient] = useState(null);
  console.log(`channel`, channel?.state?.members);

  const apiKey = "8qurbezqtr38"; // Stream API key

  const user = {
    id: `boburxon`,
    name: `Bobur`,
    image: "https://example.com/profile.jpg",
  };

  const filters = { type: "messaging", members: { $in: [user.id] } };
  const sort = { last_message_at: -1 };
  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance(apiKey);
      await client.connectUser(user, client.devToken(user.id));
      const channel = client.channel(`messaging`, `test-sarbon`, {
        image: `https://example.com/profile.jpg`,
        name: `Sarbon User`,
        members: [user.id],
      });
      await channel.watch();
      // setChannel(channel);
      setClient(client);
    };

    initChat();

    if (client) return () => client.disconnectUser();
  }, []);

  if (!client) return <div>Yuklanmoqda...</div>; // Agar channel yoki kanal tayyor bo'lmasa

  return (
    <Chat client={client} theme="messaging light">
      <div style={{ display: "flex", height: "90vh" }}>
        <Box width={`400px`}>
          <ChannelList
            showChannelSearch
            additionalChannelSearchProps={{
              filters,
              sort,
            }}
            filters={filters}
            sort={sort}
            Preview={(props) => (
              <div
                onClick={() => {
                  setChannel(props.channel);
                }}
              >
                <ChannelPreviewMessenger {...props} />
              </div>
            )}
          />
        </Box>
        <Box width={`100%`}>
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
        </Box>
      </div>
    </Chat>
  );
};

export default ChatModule;
