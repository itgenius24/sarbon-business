import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import CheckBoxComponent from "@/modules/GpsTrackingDispatcher/components/CheckBoxComponent";
import { color } from "framer-motion";

const ModalAddDis = ({
  onClose,
  open,
  userdataDis,
  setUserData,
  userdata,
  cls,
  createDisLoading,
  addUserFn,
  searchDis,
  setSearchDIs,
  ids
}) => {
  return (
    <Modal size={`2xl`} isOpen={open} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader paddingBottom={`5px`}>
          <Flex
            width={`100%`}
            justifyContent={`space-between`}
            alignItems={`center`}
          >
            <Box>
              <p>Назначить диспетчера</p>
              <p
                style={{
                  fontSize: `14px`,
                  fontWeight: 600,
                  color: `rgba(0, 51, 153, 1)`,
                }}
              >
                Выбрано{" "}
                {ids?.length}{" "}
                водители
              </p>
            </Box>

            <Box width={`40%`}>
              <Input
                value={searchDis}
                className={cls.input}
                placeholder={"Имя водителя, номер машины или телефон"}
                onChange={(e) => setSearchDIs(e.target?.value)}
              />
            </Box>
          </Flex>
        </ModalHeader>
        <ModalBody>
          {userdataDis?.map((item) => (
            <CheckBoxComponent
              key={item.id}
              onClick={() => setUserData(item)}
              active={item.guid === userdata.guid}
            >
              <Flex alignItems={`center`} gap={`10px`}>
                <Avatar
                  width={`52px`}
                  height={`52px`}
                  name={item?.first_dispatcher_data?.full_name}
                  src={item.first_dispatcher_data?.photo}
                />
                <Box>
                  <p
                    style={{
                      fontSize: `16px`,
                      fontWeight: 600,
                    }}
                  >
                    {item?.first_dispatcher_data?.full_name}
                  </p>
                  <p
                    style={{
                      fontSize: `14px`,
                      fontWeight: 400,
                      color: `rgba(126, 123, 134, 1)`,
                    }}
                  >
                    {item?.vehicle_count} машин
                  </p>
                </Box>
              </Flex>
            </CheckBoxComponent>
          ))}
        </ModalBody>
        <ModalFooter>
          <Flex gap={2}>
            <Button
              onClick={onClose}
              className={cls.topButton}
              variant="secondaryWhite"
              size="md"
              border="1px solid #D0D5DD"
            >
              Отменить
            </Button>
            <Button
              isDisabled={Boolean(!userdata)}
              onClick={addUserFn}
              className={cls.topButton}
              isLoading={createDisLoading}
              size="md"
            >
              Добавить
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalAddDis;
