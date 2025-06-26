import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import React, { useRef } from "react";

import cls from "./style.module.scss";
import { useRouter } from "next/navigation";

const PopoverUserName = ({ user_id, user_name, style = {}, locale }) => {
  const initRef = useRef();
  const router = useRouter();

  const handleChat = (e) => {
    e.stopPropagation();
    router.push(`/${locale}/chat?user_id=${user_id}`);
  };

  const handleProfile = (e) => {
    e.stopPropagation();
    router.push(
      `/${locale}/my-cars-dispatcher/profile-driver?user_id=${user_id}&type=driver`
    );
  };
  return (
    <div>
      <Popover
        placement={`bottom-start`}
        closeOnBlur={false}
        initialFocusRef={initRef}
      >
        {({ isOpen, onClose }) => (
          <>
            <PopoverTrigger>
              <Button style={style} height={0}>
                {user_name}
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent
                top={`5px`}
                boxShadow={`5px 5px 16px 0px rgba(0, 0, 0, 0.16)`}
                border={` 1px solid rgba(215, 214, 217, 1)`}
                width={`200px`}
              >
                <PopoverArrow
                  size={`lg`}
                  width={`20px`}
                  height={`20px`}
                  borderLeft={` 1px solid rgba(215, 214, 217, 1)`}
                  borderTop={` 1px solid rgba(215, 214, 217, 1)`}
                />
                <PopoverBody
                  display={`flex`}
                  flexDirection={`column`}
                  rowGap={`5px`}
                >
                  <p onClick={handleChat} className={cls.title}>
                    Написать сообщение
                  </p>
                  <p onClick={handleProfile} className={cls.title}>
                    Профиль
                  </p>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </>
        )}
      </Popover>
    </div>
  );
};

export default PopoverUserName;
