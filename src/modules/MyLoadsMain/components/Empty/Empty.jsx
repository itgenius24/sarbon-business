import { Box } from "@chakra-ui/react";
import NoteRemoteImg from "@/assets/images/note-remove.svg";
import Image from "next/image";

export const Empty = ({ t }) => {
  return <Box h="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" pt="96px">
    <Image src={NoteRemoteImg} width="200" height="200" alt="empty" />
    <span style={{ color: "#98A2B3", fontWeight: 600 }}>{t("Ничего не найдено")}</span>
  </Box>;
};
