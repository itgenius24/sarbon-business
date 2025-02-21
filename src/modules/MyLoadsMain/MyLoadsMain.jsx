import { Container } from "@/components/Container";
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
  useMediaQuery,
} from "@chakra-ui/react";
import { LoadsCard } from "./components/LoadsCard";
import { useMyLoadsMainProps } from "./useMyLoadsMainProps";
import { TopFilter } from "@/components/TopFilter";
import { filterTabsDis, filterTabsZ } from "./data";
import { useTranslation } from "@/app/i18n/client";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Empty } from "./components/Empty";
import { Performed } from "./components/Performed";
import authStore from "@/store/auth.store";
import { useState } from "react";
import {
  ExelIcon,
  IconCeckNewStatusIcon,
  StarGoodsIcon,
  StarOutlineIcon,
} from "@/assets/icons/icons";
import { CheckboxComment } from "./components/CheckboxComment";
import styles from "./style.module.scss";
import { CustomTextarea } from "@/components/CustomTextarea";
import { CheckboxModalPred } from "@/components/CheckboxModalPred/CheckboxModalPred";

export const MyLoadsMain = ({locale}) => {
  const {
    cargos,
    onFilterChange,
    handleDelete,
    orderStatus,
    handleAccept,
    handleCancel,
    ref,
    isLoading,
    driverCount,
    noDataDisCount,
    waitingDriverCount,
    setDataPred,
    dataPred,
    isLoadingExe,
    getExcelFileFn,
    open,
    setOpen,
    goodComment,
    badComment,
    register,
    watch,
    setValue,
    handleCheckboxChange,
    comments,
    setComments,
    selectedRating,
    setSelectedRating,
    hoverRating,
    setHoverRating,
    onSubmit,
    addPage,
  } = useMyLoadsMainProps(locale);
  const role_id = authStore.userData.role_id;
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");



  const { t } = useTranslation(locale, "translations");

  const handleMouseEnter = (index) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    setSelectedRating(index);
    setComments([]);
  };

  const onClose = () => {
    setDataPred(false);
  };
  const obj = {
    after_payment: t(`Оплата после завершения`),
    prepayment: t(`Предоплата`),
  };

  const [disabled, setDisabled] = useState(false);

  return (
    <Box px={"20px"} py="24px">
      <Container maxW={`1444px`}>
        <Flex alignItems={`center`} justifyContent={`space-between`}>
          <Heading
            p={3}
            fontSize={isLargerThan768 ? "30px" : "22px"}
            size="md"
            mb="24px"
            color={`var(--primary-text)`}
          >
            {t("Мои грузы")}
          </Heading>
          {role_id === "48871d27-7361-4f69-8fe4-b54daf270739" && (
            <Box position={`relative`}>
              <Button
                isLoading={isLoadingExe}
                onClick={getExcelFileFn}
                // isDisabled={true}
                style={{
                  background: `rgba(255, 255, 255, 1)`,
                  color: `black`,
                  border: `1px solid rgba(0, 122, 255, 1)`,
                }}
                leftIcon={<ExelIcon />}
              >
                Экспорт в Excel
              </Button>
            </Box>
          )}
        </Flex>
        <TopFilter
          driverCount={driverCount}
          noDataDisCount={noDataDisCount}
          waitingDriverCount={waitingDriverCount}
          onChange={onFilterChange}
          filterList={
            role_id === `785678f2-fae7-4a00-8766-99ea67d3784f`
              ? filterTabsDis
              : filterTabsZ
          }
        />
        <Box display="flex" flexDirection="column" rowGap="16px">
          {orderStatus == "performed" ||
          orderStatus == "new" ||
          orderStatus == "approve_from_driver" ||
          orderStatus == "cancellation" ||
          orderStatus == "new" ||
          orderStatus == "no_dispatcher" ||
          orderStatus == "archive" ? (
            <>
              {cargos?.length > 0 &&
                cargos?.map((cargo, index) => {
                  return (
                    <Performed
                      orderStatus={orderStatus}
                      key={index}
                      handleAccept={handleAccept}
                      handleCancel={handleCancel}
                      cargo={cargo}
                      setDisabled={setDisabled}
                      disabled={disabled}
                      setDataPred={setDataPred}
                      dataPred={dataPred}
                      open={open}
                      setOpen={setOpen}
                      ref={ref}
                    />
                  );
                })}
            </>
          ) : (
            cargos?.length > 0 &&
            cargos?.map((cargo, index) => {
              if (index === cargos.length - 1) {
                return (
                  <LoadsCard
                    ref={ref}
                    key={cargo?.guid}
                    orderStatus={orderStatus}
                    handleDelete={handleDelete}
                    handleAccept={handleAccept}
                    isLargerThan768={isLargerThan768}
                    cargo={cargo}
                  />
                );
              } else {
                return (
                  <LoadsCard
                    // ref={ref}
                    key={cargo?.guid}
                    orderStatus={orderStatus}
                    handleDelete={handleDelete}
                    handleAccept={handleAccept}
                    isLargerThan768={isLargerThan768}
                    // {...cargo}
                    cargo={cargo}
                  />
                );
              }
            })
          )}
          {!cargos?.length && !isLoading && <Empty t={t} />}
          {isLoading && <LoadingSpinner />}
          {cargos?.length >= 40 && (
            <Box width={`fit-content`}>
              <Button
                isLoading={isLoading}
                onClick={addPage}
                // className={cls.btnLoad}
              >
                Загрузить еще
              </Button>
            </Box>
          )}
        </Box>
      </Container>
      <Modal size={`xl`} isOpen={open} onClose={() => setOpen(null)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Оцените водителя</ModalHeader>
          <ModalCloseButton onClose={() => setOpen(null)} />
          <ModalBody>
            <Box width={`100%`} display={`flex`} justifyContent={`center`}>
              <Flex gap={`24px`} alignItems={`center`}>
                {[1, 2, 3, 4, 5].map((item) => {
                  return (
                    <div
                      onMouseEnter={() => handleMouseEnter(item)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleClick(item)}
                      key={item}
                    >
                      {" "}
                      {item <= (hoverRating || selectedRating) ? (
                        <StarGoodsIcon />
                      ) : (
                        <StarOutlineIcon />
                      )}{" "}
                    </div>
                  );
                })}
              </Flex>
            </Box>
            <Box mt={`30px`}>
              <Heading fontSize={`20px`}>С чем вы остались недовольны?</Heading>
              <Flex flexDirection={`column`}>
                {(selectedRating > 3 || selectedRating === 0) &&
                  goodComment.map((item) => {
                    return (
                      <CheckboxComment
                        defaultChecked={comments.includes(item.key)}
                        onChange={() => handleCheckboxChange(item.key)}
                        key={item.key}
                      >
                        {item.label}
                      </CheckboxComment>
                    );
                  })}

                {selectedRating <= 3 &&
                  selectedRating >= 1 &&
                  badComment.map((item) => {
                    return (
                      <CheckboxComment
                        defaultChecked={comments.includes(item.key)}
                        onChange={() => handleCheckboxChange(item.key)}
                        key={item.key}
                      >
                        {item.label}
                      </CheckboxComment>
                    );
                  })}
              </Flex>
            </Box>
            <Box mt={`24px`}>
              <Heading fontSize={`18px`} lineHeight={`30px`} fontWeight={400}>
                Комментарий
              </Heading>
              <CustomTextarea
                textLimit={200}
                watch={watch}
                register={register}
                name={`comment`}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button width={`100%`} mr={3} onClick={() => onSubmit()}>
              Готово
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={dataPred} onClose={onClose} isCentered>
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
                <p style={{ fontWeight: 400 }} className={styles.subTitle}>
                  {t(`Тип оплаты`)}
                </p>
                <p style={{ fontWeight: 600 }} className={styles.title}>
                  {dataPred?.payment_type
                    ? obj[dataPred?.payment_type?.[0]]
                    : dataPred?.cargo_id_data?.payment_type}
                </p>
              </Box>
              <Box>
                <p style={{ fontWeight: 400 }} className={styles.subTitle}>
                  {t(`Предоплата`)}
                </p>
                <p style={{ fontWeight: 600 }} className={styles.title}>
                  {dataPred?.payment_type?.[0] === "prepayment"
                    ? `${dataPred?.prepayment} ${dataPred?.currency_id_data?.code}`
                    : 0}
                </p>
              </Box>
              <Box>
                <p style={{ fontWeight: 400 }} className={styles.subTitle}>
                  {t(`Общая сумма`)}
                </p>
                <p style={{ fontWeight: 600 }} className={styles.title}>
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
          <ModalFooter gap={`10px`} className={styles.modalFooter} mt="0px">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
                // handleCancel(cargo.guid);
              }}
              className={styles.bntOutline}
              style={{
                background: `#fff`,
                border: `1px solid rgba(208, 213, 221, 1)`,
                color: `black`,
              }}
            >
              {t(`Отказать`)}
            </Button>
            <Button
              isDisabled={!disabled}
              style={{ background: `rgba(21, 186, 77, 1)` }}
              leftIcon={<IconCeckNewStatusIcon />}
              onClick={(e) => {
                e.stopPropagation();
                handleAccept(dataPred?.guid, dataPred?.users_id_2);
              }}
              className={styles.bntNew}
            >
              {t(`Да, принять`)}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
