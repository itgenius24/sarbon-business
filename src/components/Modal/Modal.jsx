import {
  ModalBody,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  ModalCloseButton,
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
  oneBtn = false,
  withCloseBtn,
  width,
  withFooter = true,
  ...props
}) => {

  return <ChakraModal isOpen={isOpen} onClose={onClose} {...props}>
    <ModalOverlay />
    <ModalContent maxWidth={width}>
      <ModalHeader style={{ fontSize: "18px" }}>
        {title}
        {
          withCloseBtn && <ModalCloseButton />
        }
      </ModalHeader>
      <ModalBody>
        {children}
      </ModalBody>
      {
        withFooter && <ModalFooter>
          {
            !oneBtn && <Button variant="secondaryWhite" border="1px solid #000" borderColor="brand.300" mr={3} onClick={firstBtnCallback || onClose}>
              {firstBtnText || "Закрыть"}
            </Button>
          }
          <Button onClick={(e) => {
            e.stopPropagation();
            secondBtnCallback();
          }}>
            {secondBtnText}
          </Button>
        </ModalFooter>
      }
    </ModalContent>
  </ChakraModal>;
};
