

"use client";

import { BackArrow } from "@/assets/icons/icons";
import authStore from "@/store/auth.store";
import { Box, Flex, IconButton, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  ChannelPreviewMessenger,
  Chat,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { AttachmentWithMap } from "./components/AttachmentWithMap/AttachmentWithMap";
import { MessageInputWithLocationButton } from "./components/MessageInputWithLocationButton/MessageInputWithLocationButton";

const ChatModule = () => {
  const [channel, setChannel] = useState(null);
  const [client, setClient] = useState(null);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [pinnedMessages, setPinnedMessages] = useState([]);

  const user = {
    id: authStore.userData.guid,
    name: authStore.userData.full_name,
    image: authStore.userData.photo || ``,
  };

  const filters = { type: "messaging", members: { $in: [user.id] } };
  const sort = { last_message_at: -1 };

  useEffect(() => {
    const initChat = async () => {
      try {
        const client = StreamChat.getInstance("sp5htu3uat75");
        await client.connectUser(user, client.devToken(user.id));
        setClient(client);
      } catch (error) {
        console.log('error', error);
      }
    };

    initChat();
    return () => {
      if (client) client.disconnectUser();
    };
  }, []);

  const handleSelectChannel = async (selectedChannel) => {
    // await selectedChannel.watch();
    setChannel(selectedChannel);
  };

  if (!client) return <div>Yuklanmoqda...</div>;

  return (
    <Chat client={client} theme="messaging light">
      <div style={{ display: "flex", height: "90vh" }}>
        {!isMobile && (
          <Box width={`400px`} borderRight="1px solid #e2e8f0">
            <ChannelList
              showChannelSearch
              filters={filters}
              sort={sort}
              Preview={(props) => (
                <div key={props.channel.id} onClick={() => handleSelectChannel(props.channel)}>
                  <ChannelPreviewMessenger {...props} />
                </div> 
              )}
            />
          </Box>
        )}

        <Box width="100%">
          {isMobile && !channel && (
            <ChannelList
              showChannelSearch
              filters={filters}
              sort={sort}
              Preview={(props) => (
                <div key={props.channel.id} onClick={() => handleSelectChannel(props.channel)}>
                  <ChannelPreviewMessenger {...props} />
                </div>
              )}
            />
          )}
          {channel && (
            <Channel  Attachment={AttachmentWithMap} channel={channel}>
              <Window>
                <Flex
                  alignItems={`center`}
                  borderBottom="1px solid #e2e8f0"
                  width="100%"
                >
                  {isMobile && (
                    <Box px={2} py={2} bg="gray.50">
                      <IconButton
                        icon={<BackArrow />}
                        aria-label="Ortga"
                        onClick={() => setChannel(null)}
                        size="sm"
                        variant="ghost"
                      />
                    </Box>
                  )}
                  <ChannelHeader />
                </Flex>

                {/* <Box
                  width={`100%`}
                  display={`flex`}
                  justifyContent={`center`}
                  position={`absolute`}
                  top={`75px`}
                >
                  <PinnedMessageBar messages={pinnedMessages} />
                </Box> */}
                <MessageList />
                <MessageInputWithLocationButton />
              </Window>
              <Thread />
            </Channel>
          )}

          {!isMobile && !channel && (
            <div style={{ padding: "2rem" }}>Kanal tanlang...</div>
          )}
        </Box>
      </div>
    </Chat>
  );
};

export default ChatModule;
