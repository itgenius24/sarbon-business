import React from 'react'
import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useMediaQuery,
  } from "@chakra-ui/react";
import CheckBoxComponent from '@/modules/GpsTrackingDispatcher/components/CheckBoxComponent';

const ModalStatus = ({setOpen, open,statusData,setIconStatus,iconStatus,cls,statusIconChange}) => {
  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Статус машины</ModalHeader>
      <ModalCloseButton onClick={() => setOpen(false)} />
      <ModalBody>
        {statusData.map((item) => (
          <CheckBoxComponent
            key={item.id}
            onClick={() => setIconStatus(item.type)}
            active={item.type === iconStatus}
          >
            <Flex gap={3} alignItems={"center"}>
              <item.icon /> <spa>{item.title}</spa>
            </Flex>
          </CheckBoxComponent>
        ))}
      </ModalBody>
      <ModalFooter>
        <Flex gap={2}>
          <Button
            onClick={() => setOpen(false)}
            className={cls.topButton}
            variant="secondaryWhite"
            size="md"
            border="1px solid #D0D5DD"
          >
            Отменить
          </Button>
          <Button
            isDisabled={Boolean(!iconStatus)}
            onClick={statusIconChange}
            className={cls.topButton}
            size="md"
          >
            Сохранить
          </Button>
        </Flex>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}

export default ModalStatus