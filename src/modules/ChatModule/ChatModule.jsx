"use client";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  ChannelList,
  Thread,
} from "stream-chat-react";
import { encodeToMp3 } from "stream-chat-react/mp3-encoder";

import { getToken } from "@/utils/getToken";
import { Box } from "@chakra-ui/react";

const ChatModule = () => {
  const [channel, setChannel] = useState(null);
  const [client, setClient] = useState(null);
  const [token, setToken] = useState(null);
  const [channelReady, setChannelReady] = useState(false);

  const apiKey = "8qurbezqtr38"; // Stream API key
  const userId = "bobur6975"; // User ID (o'zingizning ID)

  const user = {
    id: `boburxon`,
    name: `Bobur`,
    image: "https://example.com/profile.jpg",
  };
    const user2 = {
    id: `boburxon`,
    name: `Bobur`,
    image: "https://example.com/profile.jpg",
  };


  const filters = { type: "messaging", members: { $in: [user.id] } }; // Kanalga kerakli filtrlash
  const sort = { last_message_at: -1 }; // So'nggi xabar bo'yicha tartiblash

  useEffect(() => {
    const initChat = async () => {
      // const userToken = await getToken(userId); // Token olish

      const client = StreamChat.getInstance(apiKey); // StreamChat klientini yaratish
      await client.connectUser(user, client.devToken(user.id));
      const channel = client.channel(`messaging`, `test-sarbon`, {
        image: `https://example.com/profile.jpg`,
        name: `Sarbon User`,
        members: [user.id],
      });
      await channel.watch();
      setChannel(channel);
      setClient(client);
      // await client.connectUser(
      //   {
      //     id: userId,
      //     name: "Bobur6975", // Foydalanuvchi nomi
      //     image: "https://example.com/profile.jpg", // Foydalanuvchi rasmi
      //   },
      //   userToken // Tokenni uzatish
      // );

      // setChannel(client); // Klientni saqlash
      // setToken(userToken);   // Tokenni saqlash
      // setChannelReady(true);  // Kanal tayyorligini belgilash
    };

    initChat();

    if (client) return () => client.disconnectUser();
  }, []);

  console.log(`channel`, client, channel);

  if (!channel || !client) return <div>Yuklanmoqda...</div>; // Agar channel yoki kanal tayyor bo'lmasa

  return (
    <Chat client={client} theme="messaging light">
      <div style={{ display: "flex", height: "90vh" }}>
        <Box width={`300px`}>
          <ChannelList filters={filters} sort={sort} />
        </Box>
        <Box width={`100%`}>
          <Channel channel={channel}>
            <Window>
              <ChannelHeader /> {/* Kanal sarlavhasi */}
              <MessageList /> {/* Xabarlar ro'yxati */}
              <MessageInput
                audioRecordingEnabled
                
                focus
                audioRecordingConfig={{
                  transcoderConfig: { encoder: encodeToMp3 },
                }}
              />{" "}
              {/* Xabar kirita olish */}
            </Window>
            <Thread />
          </Channel>
        </Box>
      </div>
    </Chat>
  );
};

export default ChatModule;
