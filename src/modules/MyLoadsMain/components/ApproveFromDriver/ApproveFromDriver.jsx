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
} from "@chakra-ui/react";

import cls from "./style.module.scss";
import { Performed } from "../Performed";

import { Empty } from "../Empty";
import useFromDriverProps from "./useFromDriverProps";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CheckboxComment } from "../CheckboxComment";
import { CustomTextarea } from "@/components/CustomTextarea";
import SarbonTable from "@/components/SarbonTable/SarbonTable";

export const ApproveFromDriver = ({ orderStatus, t, locale, isProfile }) => {
  const {
    cargoData,
    isLoading,
    handleCancel,
    isLoadingCancel,
    comment,
    canCelIsOpen,
    canCelOnClose,
    canCelOnOpen,
    handleCheckboxChange,
    watch,
    comments,
    handleCancelButton,
    register,
    columns,
  } = useFromDriverProps(orderStatus, t, locale);

  return (
    <>
      <Box
        width={isProfile ? `1130px` : `100%`}
        overflow={isProfile ? `hidden` : `none`}
        overflowX={isProfile ? `scroll` : `none`}
      >
        {cargoData?.length > 0 && !isProfile && (
          <SarbonTable
            width="100%"
            variant="card"
            columns={columns}
            data={cargoData}
          />
        )}

        {cargoData?.length > 0 &&
          isProfile &&
          cargoData?.map((item, index) => (
            <Performed
              orderStatus={orderStatus}
              key={index}
              cargo={item}
              handleCancel={handleCancel}
              disabledCancelBtn={isLoadingCancel}
            />
          ))}

        {cargoData?.length === 0 && !isLoading && <Empty t={t} />}

        {cargoData?.length === 0 && isLoading && <LoadingSpinner />}
      </Box>
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
              isLoading={isLoadingCancel}
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
