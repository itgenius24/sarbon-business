import { DeleteIcon, PaymentIcon, SuccessIcon, WaringIcon } from "@/assets/icons/icons";
import cls from "./styles.module.scss";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import clsx from "clsx";

const icons = {
  delete: <DeleteIcon />,
  warning: <WaringIcon />,
  success: <SuccessIcon />,
  payment: <PaymentIcon />
};

export const Popup = ({
  isOpen,
  onClose = () => {},
  mainText = "",
  subText = "",
  status = "success",
  btn1Text = "Отмена",
  btn2Text = "Удалить",
  btn1Callback,
  btn2Callback = () => {},
  icon,
  hideButtons,
}) => {

  return <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent className={cls.modalContent}>
      <ModalHeader>
        <ModalCloseButton />
      </ModalHeader>
      <ModalBody className={cls.modalBody}>
        <span className={clsx(cls.modalIcon, cls[status])}>
          {icon || icons[status]}
        </span>
        <Text fontSize="18px" lineHeight="28px" fontWeight="600" color="brand.900">{mainText}</Text>
        {subText && <Text mt="16" fontSize="16px" lineHeight="24px" fontWeight="500" color="brand.600">{subText}</Text>}
      </ModalBody>
      {
        !hideButtons && <ModalFooter className={cls.modalFooter} mt="32px">
          <button className={clsx(cls.btn, cls.secondary)} onClick={btn1Callback || onClose}>{btn1Text}</button>
          <button className={clsx(cls.btn, cls[status])} onClick={btn2Callback}>{btn2Text}</button>
        </ModalFooter>
      }
    </ModalContent>
  </Modal>;
};
