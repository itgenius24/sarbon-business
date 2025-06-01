"use client";

import { Container } from "@/components/Container";

import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
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

import { useMyCars } from "./useMyCars";
import {
  LoadOulineIcon,
  PlusIcon,
  StoneIcon,
  UserIconCerate,
} from "@/assets/icons/icons";

import { CarsCard } from "./component/CarsCard/CarsCard";
import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
import cls from "./style.module.scss";
import { Checkbox } from "@/components/Checkbox";
import { CarsCardMObile } from "./component/CarsCardMobile/CarsCardMObile";
import CheckBoxComponent from "../GpsTrackingCarrier/components/CheckBoxComponent";

export const MyCarsModule = () => {
  const {
    t,
    data,
    useList,
    setCarId,
    setUserId,
    handleUpdateId,
    handleUpdate,
    handleDelete,
    userId,
    centerModalType,
    setCenterModalType,
    carId,
    dataModal,
    isCheckboxChecked,
    setIsCheckboxChecked,
  } = useMyCars();

  const router = useRouter();
  const locale = useGetLang();
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  return (
    <>
      <Container my={isLargerThan845 ? "40px" : `20px`} pb={`20px`}>
        <Flex  width={"100%"} justifyContent={"space-between"}>
          <Heading
            size={isLargerThan845 ? "md" : "sm"}
            mb={isLargerThan845 ? "24px" : "12px"}
            color={`var(--primary-text)`}
          >
            {t("Ваши машины")}
          </Heading>
          <Button
            display={isLargerThan845 ? `flex` : `none`}
            onClick={() => router.push(`/${locale}/my-cars/create`)}
            width={"fit-content"}
            leftIcon={<PlusIcon />}
          >
            {t("Добавить новую машину")}
          </Button>
        </Flex>
        <Box mt={isLargerThan845 ? "37px" : `10px`}>
          {isLargerThan845
            ? data?.map((item) => (
                <CarsCard
                  centerModalType={centerModalType}
                  userId={userId}
                  setCenterModalType={setCenterModalType}
                  handleUpdate={handleUpdate}
                  handleUpdateId={handleUpdateId}
                  setCarId={setCarId}
                  setUserId={setUserId}
                  useList={useList}
                  key={item.guid}
                  item={item}
                  handleDelete={handleDelete}
                />
              ))
            : data?.map((item) => (
                <CarsCardMObile
                  centerModalType={centerModalType}
                  userId={userId}
                  setCenterModalType={setCenterModalType}
                  handleUpdate={handleUpdate}
                  handleUpdateId={handleUpdateId}
                  setCarId={setCarId}
                  setUserId={setUserId}
                  useList={useList}
                  key={item.guid}
                  item={item}
                  handleDelete={handleDelete}
                />
              ))}

          {(data?.length === 0 || !data) && (
            <Flex
              className={cls.noData}
              width={`100%`}
              height={`170px`}
              alignItems={`center`}
              justifyContent={`center`}
            >
              {t("У вас еще нет добавленных машину")}
            </Flex>
          )}
        </Box>

        <Button
          display={isLargerThan845 ? `none` : `block`}
          mt={`20px`}
          
          onClick={() => router.push(`/${locale}/my-cars/create`)}
          backgroundColor={`var(--primary-text)`}
          leftIcon={<PlusIcon />}
        >
          {t("Добавить новую машину")}
        </Button>
      </Container>
      { isLargerThan845 && (
        <Modal size={`2xl`} isCentered isOpen={centerModalType}>
          <ModalOverlay onClick={() => setCenterModalType(``)} />
          <ModalContent>
            <ModalHeader borderBottom={`1px solid rgba(219, 216, 227, 1)`}>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <p className={cls.topTitle}>
                  {t("Назначить водителя для")} <br />
                  <span>
                    {carId?.marka} {carId?.car_number}
                  </span>
                </p>
              </Flex>
              <ModalCloseButton  onClick={() => setCenterModalType(``)} />
            </ModalHeader>
            <ModalBody minHeight={`400px`}>
              <Box className={cls.modalContend} >
                {dataModal?.length > 0 ? (
                  dataModal?.map((item) => {
                    return (
                      <CheckBoxComponent
                        opacity={item?.vehicle_data ? 0.5 : 1}
                        key={item?.guid}
                        onClick={() =>
                          item?.vehicle_data
                            ? null
                            : setUserId(item?.guid)
                        }
                        active={item?.guid === userId}
                      >
                        <Box className={cls.countryWrap}>
                          <Flex gap={3}>
                            <Avatar
                              name={item?.full_name}
                              src={item?.photo}
                            />
                            <Box>
                              <p className={cls.name}>
                                {item?.full_name}
                              </p>
                              <p className={cls.subTitle}>
                                {item?.phone}
                              </p>
                            </Box>
                          </Flex>
                          {item?.vehicle_data && (
                            <Flex
                              flexDirection={`column`}
                              mr={5}
                              alignItems={`flex-end`}
                              className={cls.subTitle2}
                            >
                              <p className={cls.loadType}>
                                {`${item?.trailer_type?.name} ${
                                  item?.vehicle_data?.car_number
                                    ? item?.vehicle_data?.car_number
                                    : ``
                                }`}
                              </p>
                              <Flex gap={2}>
                                <Flex gap={1} alignItems={"center"}>
                                  <StoneIcon />
                                  {item?.vehicle_data?.capacity} т.
                                </Flex>
                                <Flex gap={1} alignItems={"center"}>
                                  <LoadOulineIcon />
                                  {item?.vehicle_data?.height} m3
                                </Flex>
                              </Flex>
                            </Flex>
                          )}
                        </Box>
                      </CheckBoxComponent>
                    );
                  })
                ) : (
                  <Flex direction={"column"} alignItems={"center"} gap={"30px"}>
                    <UserIconCerate />

                    <Text color={"blackAlpha.400"} fontSize={"18px"}>
                      {t("У вас пока нет водителей")}
                    </Text>
                    <Button
                      onClick={() => router.push(`/${locale}/drivers`)}
                      className={cls.topButton}
                      size="md"
                      width={`fit-content`}
                    >
                      {t("Добавить водителя")}
                    </Button>
                  </Flex>
                )}
              </Box>
            </ModalBody>
            <ModalFooter borderTop={`1px solid rgba(219, 216, 227, 1)`}>
              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                width={`100%`}
              >
                <Checkbox
                  onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                >
                  {t("Только свободные водители")}
                </Checkbox>
                <Flex gap={2}>
                  <Button
                    className={cls.topButton}
                    onClick={() => setCenterModalType("")}
                    variant="secondaryWhite"
                    size="md"
                    border="1px solid #D0D5DD"
                  >
                    {t("Отменить")}
                  </Button>
                  <Button
                    onClick={() => handleUpdate()}
                    className={cls.topButton}
                    size="md"
                    isDisabled={!userId}
                  >
                    {t("Сохранить")}
                  </Button>
                </Flex>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {!isLargerThan845 && (
        <Drawer placement="bottom" isOpen={centerModalType}>
          <DrawerOverlay />
          <DrawerContent borderRadius="12px 12px 0 0">
            <DrawerHeader>
              <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                className={cls.selectCargoTop}
              >
                <p className={cls.topTitle}>
                  {t("Назначить водителя для")} <br />{" "}
                  <span>
                    {carId?.marka} {carId?.car_number}
                  </span>
                </p>
              </Flex>
            </DrawerHeader>
            <DrawerCloseButton
              top={`15px`}
              onClick={() => setCenterModalType("")}
            />
            <DrawerBody>
              <Box className={cls.modalContend}>
                {dataModal?.length > 0 ? (
                  dataModal?.map((item) => {
                    return (
                      <CheckBoxComponent
                        opacity={item?.vehicle_data ? 0.5 : 1}
                        key={item?.guid}
                        onClick={() =>
                          item?.vehicle_data
                            ? null
                            : setUserId(item?.guid)
                        }
                        active={item?.guid === userId}
                      >
                        <Box
                          width={`100%`}
                          flexDirection={`column`}
                          justifyContent={`flex-start`}
                          className={cls.countryWrap}
                        >
                          <Flex gap={3}>
                            <Avatar
                              name={item?.full_name}
                              src={item?.photo}
                            />
                            <Box>
                              <Box>
                                <p className={cls.name}>
                                  {item?.full_name}
                                </p>
                                <p className={cls.phone}>{item?.phone}</p>
                              </Box>

                              {item?.vehicle_data && (
                                <Flex
                                  flexDirection={`column`}
                                  // mt={3}
                                  alignItems={`flex-start`}
                                  className={cls.subTitle2}
                                >
                                  <p className={cls.loadType}>
                                    {`${item?.vehicle_data?.marka} ${
                                      item?.vehicle_data?.car_number
                                        ? item?.vehicle_data?.car_number
                                        : ``
                                    }`}
                                  </p>
                                  <Flex gap={2}>
                                    <Flex gap={1} alignItems={"center"}>
                                      <StoneIcon />
                                      {item?.vehicle_data?.capacity} т.
                                    </Flex>
                                    <Flex gap={1} alignItems={"center"}>
                                      <LoadOulineIcon />
                                      {item?.vehicle_data?.height} m3
                                    </Flex>
                                  </Flex>
                                </Flex>
                              )}
                            </Box>
                          </Flex>
                        </Box>
                      </CheckBoxComponent>
                    );
                  })
                ) : (
                  <Flex direction={"column"} alignItems={"center"} gap={"30px"}>
                    <svg
                      width="122"
                      height="122"
                      viewBox="0 0 122 122"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M55.7049 34.059C50.7918 34.059 46.809 38.1556 46.809 43.209C46.809 48.2624 50.7918 52.359 55.7049 52.359C60.6179 52.359 64.6007 48.2624 64.6007 43.209C64.6007 38.1556 60.6179 34.059 55.7049 34.059ZM40.8785 43.209C40.8785 34.7866 47.5165 27.959 55.7049 27.959C63.8932 27.959 70.5312 34.7866 70.5312 43.209C70.5312 51.6313 63.8932 58.459 55.7049 58.459C47.5165 58.459 40.8785 51.6313 40.8785 43.209ZM89.8056 43.209C91.4432 43.209 92.7708 44.5745 92.7708 46.259V52.359H98.7014C100.339 52.359 101.667 53.7245 101.667 55.409C101.667 57.0935 100.339 58.459 98.7014 58.459H92.7708V64.559C92.7708 66.2435 91.4432 67.609 89.8056 67.609C88.1679 67.609 86.8403 66.2435 86.8403 64.559V58.459H80.9097C79.272 58.459 77.9444 57.0935 77.9444 55.409C77.9444 53.7245 79.272 52.359 80.9097 52.359H86.8403V46.259C86.8403 44.5745 88.1679 43.209 89.8056 43.209ZM34.8425 69.0256C37.623 66.1657 41.3942 64.559 45.3264 64.559H66.0833C70.0155 64.559 73.7867 66.1657 76.5672 69.0256C79.3477 71.8855 80.9097 75.7644 80.9097 79.809V85.909C80.9097 87.5934 79.5821 88.959 77.9444 88.959C76.3068 88.959 74.9792 87.5934 74.9792 85.909V79.809C74.9792 77.3823 74.0419 75.0549 72.3736 73.339C70.7053 71.623 68.4427 70.659 66.0833 70.659H45.3264C42.9671 70.659 40.7044 71.623 39.0361 73.339C37.3678 75.0549 36.4306 77.3823 36.4306 79.809V85.909C36.4306 87.5934 35.103 88.959 33.4653 88.959C31.8276 88.959 30.5 87.5934 30.5 85.909V79.809C30.5 75.7644 32.0621 71.8855 34.8425 69.0256Z"
                        fill="#B9B6BF"
                      />
                    </svg>

                    <Text color={"blackAlpha.400"} fontSize={"18px"}>
                      {t("У вас пока нет водителей")}
                    </Text>
                    <Button
                      onClick={() => router.push(`/${locale}/drivers`)}
                      className={cls.topButton}
                      size="md"
                      width={`fit-content`}
                    >
                      {t("Добавить водителя")}
                    </Button>
                  </Flex>
                )}
              </Box>
            </DrawerBody>
            <DrawerFooter mb={`20px`}>
              <Flex
                justifyContent={"space-between"}
                // alignItems={"center"}
                rowGap={`15px`}
                flexDirection={`column`}
                width={`100%`}
                className={cls.selectCargoBottom}
              >
                <Checkbox
                  onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                >
                  {t("Только свободные водители")}
                </Checkbox>
                <Flex flexDirection={`column`} gap={2}>
                  <Button
                    className={cls.topButton}
                    onClick={() => setCenterModalType("")}
                    variant="secondaryWhite"
                    size="md"
                    border="1px solid #D0D5DD"
                  >
                    {t("Отменить")}
                  </Button>
                  <Button
                    onClick={() => handleUpdate()}
                    className={cls.topButton}
                    size="md"
                  >
                    {t("Сохранить")}
                  </Button>
                </Flex>
              </Flex>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
