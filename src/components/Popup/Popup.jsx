import { DeleteIcon, LoadIconModal, PaymentIcon, SuccessIcon, WaringIcon } from "@/assets/icons/icons";
import cls from "./styles.module.scss";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const icons = {
  delete: <DeleteIcon />,
  warning: <WaringIcon />,
  success: <SuccessIcon />,
  payment: <PaymentIcon />,
  load:<LoadIconModal />
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
  const { t } = useTranslation();
  return <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent className={status !== `second` ? cls.modalContent : cls.modalContent2}>
      <ModalHeader>
        <ModalCloseButton />
      </ModalHeader>
      <ModalBody className={cls.modalBody}>
        { status !== `second` && <span className={clsx(cls.modalIcon, cls[status])}>
          {icon || icons[status]}
        </span>}
        <Text fontSize="18px" lineHeight="28px" fontWeight="600" color="brand.900">{t(mainText)}</Text>
        {subText && <Text mt="16" fontSize="16px" lineHeight="24px" fontWeight="500" color="brand.600">{t(subText)}</Text>}
      </ModalBody>
      {
        !hideButtons && <ModalFooter className={cls.modalFooter} mt="32px">
          <button className={clsx(cls.btn, cls.secondary)} onClick={btn1Callback || onClose}>{t(btn1Text)}</button>
          <button className={clsx(cls.btn, cls[status])} onClick={btn2Callback}>{t(btn2Text)}</button>
        </ModalFooter>
      }
    </ModalContent>
  </Modal>;
};
