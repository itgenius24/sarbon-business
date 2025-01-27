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
  useMediaQuery,
} from "@chakra-ui/react";
import { LoadsCard } from "./components/LoadsCard";
import { useMyLoadsMainProps } from "./useMyLoadsMainProps";
import { TopFilter } from "@/components/TopFilter";
import { filterTabsDis, filterTabsZ } from "./data";
import { useTranslation } from "@/app/i18n/client";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useGetLang } from "@/hooks/useGetLang";
import { Empty } from "./components/Empty";
import { Performed } from "./components/Performed";
import authStore from "@/store/auth.store";
import { useState } from "react";
import { ExelIcon, StarGoodsIcon, StarOutlineIcon } from "@/assets/icons/icons";
import { groupByGuidFromData } from "@/utils/groupByGuidFromData";
import { CheckboxComment } from "./components/CheckboxComment";
import { CustomTextarea } from "@/components/CustomTextarea";

export const MyLoadsMain = () => {
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
    isPendingExe,
    getExcelFileFn,
    open,
    setOpen,
    goodComment,
    badComment,
    register,watch,setValue,
    handleCheckboxChange,
    comments,
    setComments,
    selectedRating,
    setSelectedRating,
    hoverRating,
    setHoverRating,
    onSubmit
  } = useMyLoadsMainProps();
  const role_id = authStore.userData.role_id;
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
 
  const locale = useGetLang();

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


  const [disabled, setDisabled] = useState(false);

  return (
    <Box px={"20px"} py="24px">
      <Container>
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
              {/* <span
                style={{
                  position: `absolute`,
                  top: `-10px`,
                  zIndex: `111`,
                  fontSize: `9px`,
                  fontWeight: 700,
                  padding: `0px 10px`,
                  borderRadius: `11px`,
                  background: `red`,
                  color: `white`,
                  right: 10,
                }}
              >
                СКОРО
              </span> */}
              <Button
                isLoading={isPendingExe}
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
                    handleCancel={handleCancel}
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
                    handleCancel={handleCancel}
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
                      <CheckboxComment defaultChecked={comments.includes(item.key)}  onChange={() => handleCheckboxChange(item.key)} key={item.key}>
                        {item.label}
                      </CheckboxComment>
                    );
                  })}

                {selectedRating <= 3 &&
                  selectedRating >= 1 &&
                  badComment.map((item) => {
                    return (
                      <CheckboxComment defaultChecked={comments.includes(item.key)}  onChange={() => handleCheckboxChange(item.key)} key={item.key}>
                        {item.label}
                      </CheckboxComment>
                    );
                  })}
              </Flex>
            </Box>
            <Box mt={`24px`}>
              <Heading fontSize={`18px`} lineHeight={`30px`} fontWeight={400}>Комментарий</Heading>
              <CustomTextarea textLimit={200} watch={watch}  register={register} name={`comment`}  />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button width={`100%`} mr={3} onClick={() => onSubmit()}>
              Готово
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
