import {
  ModalBody,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

export const Modal = ({
  isOpen,
  onClose,
  children,
  title = "",
  firstBtnText = "Отменить",
  secondBtnText = "Сохранить",
  firstBtnCallback,
  secondBtnCallback = () => {},
  ...props
}) => {

  return <ChakraModal isOpen={isOpen} onClose={onClose} {...props}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader style={{ fontSize: "18px" }}>{title}</ModalHeader>
      <ModalBody>
        {children}
      </ModalBody>
      <ModalFooter>
        <Button variant="secondaryWhite" border="1px solid #000" borderColor="brand.300" mr={3} onClick={firstBtnCallback || onClose}>
          {firstBtnText || "Закрыть"}
        </Button>
        <Button onClick={secondBtnCallback}>
          {secondBtnText}
        </Button>
      </ModalFooter>
    </ModalContent>
  </ChakraModal>;
};
