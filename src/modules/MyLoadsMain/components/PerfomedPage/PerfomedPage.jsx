import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";

import cls from "./style.module.scss";
import { Performed } from "../Performed";

import { Empty } from "../Empty";
import usePerfomedPageProps from "./usePerfomedPageProps";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CheckboxModalPred } from "@/components/CheckboxModalPred/CheckboxModalPred";
import SarbonTable from "@/components/SarbonTable/SarbonTable";

export const PerfomedPage = ({ orderStatus, t, locale, isProfile = false }) => {
  const {
    cargoData,
    isLoading,
    addPage,
    isFetching,
    setDisabled,
    disabled,
    onClose,
    isOpen,
    onOpen,
    handleCancel,
    setReason,
    reason,
    setDataPred,
    error,
    columns,
    onRow,
  } = usePerfomedPageProps(orderStatus, t, locale);

  return (
    <>
      <Box
        width={isProfile ? `1130px` : `100%`}
        overflow={isProfile ? `hidden` : `none`}
        overflowX={isProfile ? `scroll` : `none`}
      >
        {!isProfile && cargoData?.length > 0 && (
          <SarbonTable
            width="100%"
            variant="card"
            columns={columns}
            data={cargoData}
            onRow={onRow}
          />
        )}
        {cargoData?.length > 0 && isProfile  &&
          cargoData?.map((item, index) => (
            <Performed
              orderStatus={orderStatus}
              key={index}
              cargo={item}
              onOpen={onOpen}
              setDataPred={setDataPred}
            />
          ))}
      </Box>
      {cargoData?.length === 0 && isFetching && <LoadingSpinner />}
      {cargoData?.length === 0 && !isFetching && <Empty t={t} />}
      {cargoData?.length >= 40 && (
        <Box mt={`15px`} width={`fit-content`}>
          <Button isLoading={isFetching} onClick={addPage}>
            Загрузить еще
          </Button>
        </Box>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Text fontSize={`18px`}>
              {t(`Вы уверены что хотите отменить заказ`)}?
            </Text>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              border={`1px solid  ${
                error && reason.length === 0 ? `res` : `rgba(219, 216, 227, 1)`
              } `}
              _placeholder={{ color: `rgba(126, 123, 134, 1)` }}
              fontSize={`16px`}
              backgroundColor={`rgba(246, 247, 248, 1)`}
              mt={`10px`}
              placeholder="Укажите причину отмены..."
            />

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
                {t(`Я согласовал это с водителем или перевозчиком`)}
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
              {t(`Закрыть`)}
            </Button>
            <Button
              isDisabled={!disabled || reason.length === 0}
              style={{ background: `rgba(0, 51, 153, 1)` }}
              onClick={(e) => handleCancel()}
              className={cls.bntNew}
            >
              {t(`Отменить груз`)}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
