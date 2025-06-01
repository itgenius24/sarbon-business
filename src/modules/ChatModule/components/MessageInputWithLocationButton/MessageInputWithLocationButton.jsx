import { LocationMarkIcon } from "@/assets/icons/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { MessageInput, useChannelStateContext } from "stream-chat-react";
import { encodeToMp3 } from "stream-chat-react/mp3-encoder";

export const MessageInputWithLocationButton = () => {
  const { channel } = useChannelStateContext();

  const handleSendLocation = () => {
    const shouldShareLocation = window.confirm("Joylashuvingizni ulashasizmi?");
    if (!shouldShareLocation) return;

    if (!navigator.geolocation) {
      alert("Geolocation qo‘llab-quvvatlanmaydi.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        channel.sendMessage({
          text: "📍 Joylashuvim",
          attachments: [
            {
              type: "location",
              latitude,
              longitude,
              url: `https://maps.google.com/?q=${latitude},${longitude}`,
            },
          ],
        });
      },
      (err) => {
        console.error(err);
        alert("Joylashuv olinmadi: " + err.message);
      },
      { maximumAge: 0, timeout: 10000 }
    );
  };

  return (
    <Flex alignItems={`center`}>
      <IconButton _hover={{backgroundColor:`transparent`}}  backgroundColor={`transparent`} width={`fit-content`}  icon={<LocationMarkIcon />} onClick={handleSendLocation}  />
          
   
      <MessageInput
        audioRecordingEnabled
        focus
        audioRecordingConfig={{
          transcoderConfig: { encoder: encodeToMp3 },
        }}
      />{" "}

    </Flex>
  );
};
