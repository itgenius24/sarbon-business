import { useRef } from "react";
import cls from "./style.module.scss";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Button,
  Portal,
  Box,
  Flex,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import {
  ChatHeaderIcon,
  PauseChatIcon,
  ReplayIcon,
  WaveIcon,
} from "@/assets/icons/icons";

const ChatPopover = () => {
  const initRef = useRef();
  return (
    <>
      <Popover
        closeOnBlur={false}
        placement="bottom-start"
        initialFocusRef={initRef}
      >
        {({ isOpen, onClose }) => (
          <>
            <PopoverTrigger >
              <Box className={cls.popoverTrigger}>
                <Box className={cls.messageCount}>3</Box>
                <IconButton
                  padding={0}
                  backgroundColor={`transparent`}
                  _hover={{ backgroundColor: `transparent` }}
                  icon={<ChatHeaderIcon />}
                />
              </Box>
            </PopoverTrigger>
            <Portal>
              {isOpen && (
                <Box
                  position="fixed"
                  top={`73px`}
                  left={0}
                  width="100vw"
                  height="100vh"
                  background={`rgba(0, 0, 0, 0.22)`}
                  zIndex="1"
                  onClick={onClose}
                />
              )}
              <PopoverContent zIndex="3" className={cls.popoverContent}>
                <PopoverHeader className={cls.popoverHeader}>
                  <p className={cls.headerTitle}>Сообщения</p>
                </PopoverHeader>
                <PopoverBody className={cls.popoverBody}>
                  <Flex className={cls.messageWrap}>
                    <Avatar
                      size={`sm`}
                      width={`40px`}
                      height={`40px`}
                      name="Марат Валиев"
                    />
                    <Box width={`100%`}>
                      <Flex justifyContent={`space-between`}>
                        <p className={cls.name}>Марат Валиев</p>
                        <Flex className={cls.time}>
                          <div className={cls.newMessageIcon}></div> 16
                          час.назад
                        </Flex>
                      </Flex>
                      <p className={cls.lastMessage}>
                        Ассалому алейкум, кандай документ керак?
                      </p>
                    </Box>
                  </Flex>
                  <Flex className={cls.messageWrap}>
                    <Avatar
                      size={`sm`}
                      width={`40px`}
                      height={`40px`}
                      name="Бердийев Сирожиддин"
                    />
                    <Box width={`100%`}>
                      <Flex justifyContent={`space-between`}>
                        <p className={cls.name}>Бердийев Сирожиддин</p>
                        <Flex className={cls.time}>
                          <div className={cls.newMessageIcon}></div>{" "}
                          10.04.25,14:35
                        </Flex>
                      </Flex>
                      <Flex className={cls.lastMessageAudio}>
                        <PauseChatIcon /> <WaveIcon />{" "}
                        <span className={cls.timeAudio}>0:51</span>
                      </Flex>
                    </Box>
                  </Flex>
                  <Flex className={cls.messageWrap}>
                    <Avatar
                      size={`sm`}
                      width={`40px`}
                      height={`40px`}
                      name="Олег Макаревич"
                    />
                    <Box width={`100%`}>
                      <Flex justifyContent={`space-between`}>
                        <p className={cls.name}>Олег Макаревич</p>
                        <Flex className={cls.time}>
                          <div className={cls.newMessageIcon}></div>{" "}
                          10.04.25,14:35
                        </Flex>
                      </Flex>
                      <Flex gap={`7px`} alignItems={`center`}>
                        <ReplayIcon />
                        <p className={cls.lastMessage}>
                          Благодарим что пользуетесь Sarbon!
                        </p>
                      </Flex>
                    </Box>
                  </Flex>
                  <Button className={cls.btn}>Все Сообщения</Button>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </>
        )}
      </Popover>
    </>
  );
};

export default ChatPopover;
