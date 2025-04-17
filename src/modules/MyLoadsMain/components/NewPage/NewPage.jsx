import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import useNewPageProps from "./useNewPageProps";
import cls from "./style.module.scss";
import { Performed } from "../Performed";
import { CheckboxModalPred } from "@/components/CheckboxModalPred/CheckboxModalPred";
import { IconCeckNewStatusIcon } from "@/assets/icons/icons";
import { Empty } from "../Empty";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CheckboxComment } from "../CheckboxComment";
import { CustomTextarea } from "@/components/CustomTextarea";

export const NewPage = ({
  orderStatus,
  t,
  setNotificationId,
  notificationID,
  refetchNewPred,
  refetchNoDisPred,
  refetchWaitingDriverCount,
}) => {
  const {
    newData,
    setDataPred,
    handleAccept,
    handleCancel,
    dataPred,
    onClose,
    disabled,
    setDisabled,
    obj,
    isLoading,
    disabledBtn,
    isOpen,
    onOpen,
    canCelIsOpen,
    canCelOnClose,
    canCelOnOpen,
    handleCancelButton,
    comment,
    comments,
    setComments,
    handleCheckboxChange,
    watch,
    register,
  } = useNewPageProps(
    orderStatus,
    t,
    refetchNewPred,
    refetchNoDisPred,
    refetchWaitingDriverCount,
    setNotificationId,
    notificationID
  );

  return (
    <>
      <Box>
        {newData?.map((item, index) => (
          <Performed
            orderStatus={orderStatus}
            setDataPred={setDataPred}
            key={index}
            cargo={item}
            handleCancel={handleCancel}
            disabledCancelBtn={disabledBtn}
            onOpen={onOpen}
          />
        ))}
      </Box>

      {newData?.length === 0 && !isLoading && <Empty t={t} />}

      {newData?.length === 0 && isLoading && <LoadingSpinner />}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Text fontSize={`18px`}>
              {t(`Принять предложение от`)} {dataPred?.users_id_data?.full_name}
              ?
            </Text>

            <Flex
              mt={`25px`}
              justifyContent={`space-between`}
              alignItems={`center`}
            >
              <Box>
                <p style={{ fontWeight: 400 }} className={cls.subTitle}>
                  {t(`Тип оплаты`)}
                </p>
                <p style={{ fontWeight: 600 }} className={cls.title}>
                  {dataPred?.payment_type
                    ? obj[dataPred?.payment_type?.[0]]
                    : dataPred?.cargo_id_data?.payment_type}
                </p>
              </Box>
              <Box>
                <p style={{ fontWeight: 400 }} className={cls.subTitle}>
                  {t(`Предоплата`)}
                </p>
                <p style={{ fontWeight: 600 }} className={cls.title}>
                  {dataPred?.payment_type?.[0] === "prepayment"
                    ? `${dataPred?.prepayment} ${dataPred?.currency_id_data?.code}`
                    : 0}
                </p>
              </Box>
              <Box>
                <p style={{ fontWeight: 400 }} className={cls.subTitle}>
                  {t(`Общая сумма`)}
                </p>
                <p style={{ fontWeight: 600 }} className={cls.title}>
                  {dataPred?.offers} {dataPred?.currency_id_data?.code}
                </p>
              </Box>
            </Flex>
            <Flex
              alignItems={`center`}
              background={`rgba(237, 239, 245, 1)`}
              padding={`7.5px`}
              borderRadius={`4px`}
              mt={`15px`}
            >
              <CheckboxModalPred
                defaultChecked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              >
                {t(`Я согласовал это предложение с заказчиком*`)}
              </CheckboxModalPred>
            </Flex>
          </ModalBody>
          <ModalFooter gap={`10px`} className={cls.modalFooter} mt="0px">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className={cls.bntOutline}
              style={{
                background: `#fff`,
                border: `1px solid rgba(208, 213, 221, 1)`,
                color: `black`,
              }}
            >
              {t(`Отказать`)}
            </Button>
            <Button
              isDisabled={!disabled || disabledBtn}
              style={{ background: `rgba(21, 186, 77, 1)` }}
              leftIcon={<IconCeckNewStatusIcon />}
              onClick={(e) => {
                e.stopPropagation();
                handleAccept(dataPred?.guid, dataPred?.users_id_2);
                onClose();
              }}
              className={cls.bntNew}
            >
              {t(`Да, принять`)}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        size={`2xl`}
        isOpen={canCelIsOpen}
        onClose={canCelOnClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Укажите причину отмены</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Box mt={`10px`}>
              <Flex flexDirection={`column`}>
                {comment.map((item) => {
                  return (
                    <CheckboxComment
                      type="radio"
                      defaultChecked={comments?.[0] === item.key}
                      onChange={() => handleCheckboxChange(item.key)}
                      key={item.key}
                    >
                      {item.label}
                    </CheckboxComment>
                  );
                })}
              </Flex>
            </Box>
            {comments?.[0] === `own_version` && (
              <Box mt={`24px`}>
                <Heading fontSize={`18px`} lineHeight={`30px`} fontWeight={400}>
                  Комментарий
                </Heading>
                <CustomTextarea
                  textLimit={200}
                  watch={watch}
                  register={register}
                  name={`comment`}
                  placeholder="Введите текст"
                />
              </Box>
            )}
          </ModalBody>
          <ModalFooter gap={`10px`} className={cls.modalFooter} mt="0px">
            <Button
              isLoading={disabledBtn}
              isDisabled={
                watch(`comment`) ? false : comments.length === 0 ? true : false
              }
              onClick={(e) => {
                e.stopPropagation();
                handleCancelButton();
                canCelOnClose();
              }}
            >
              {t(`Отменить предложение`)}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
