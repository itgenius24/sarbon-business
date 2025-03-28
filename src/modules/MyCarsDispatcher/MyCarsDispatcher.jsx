"use client";

import { Container } from "@/components/Container";

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useMediaQuery,
} from "@chakra-ui/react";

import {
  IocnFilter,
  IocnSortBack,
  PlusIcon,
  SearchIcon,
} from "@/assets/icons/icons";

import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
import cls from "./style.module.scss";
import { useMyCarsDispatcher } from "./useMyCarsDispatcher";
import { CarsCard } from "./component/CarsCard/CarsCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import authStore from "@/store/auth.store";
import { TextField } from "@/components/TextField";
import { Modak } from "next/font/google";
import CheckBoxComponent from "../GpsTrackingDispatcher/components/CheckBoxComponent";
import SarbonTable from "@/components/SarbonTable/SarbonTable";

export const MyCarsDispatcherModule = () => {
  const {
    t,
    data,
    deleteFuntion,
    nameFilter,
    isLoading,
    setSearchFn,
    search,
    statusData,
    count,
    addPage,
    open,
    setOpen,
    iconStatus,
    setIconStatus,
    statusIconChange,
    columns,
    rowClassName,
  } = useMyCarsDispatcher();
  const router = useRouter();
  const locale = useGetLang();

  const isSuperDispatcher = authStore?.userData?.user_status?.[0];

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  return (
    <>
      <Container maxW={`1444px`} my="40px">
        <Flex width={"100%"} justifyContent={"space-between"}>
          <Heading
            size={isLargerThan845 ? "md" : "sm"}
            mb={isLargerThan845 ? "24px" : "12px"}
            color={`var(--primary-text)`}
          >
            {t("Ваши водители")}
          </Heading>
          <Flex gap={`28px`}>
            {/* {isSuperDispatcher === "approved" && (
              <Button
                onClick={() =>
                  router.push(`/${locale}/my-cars-dispatcher/create`)
                }
                width={"fit-content"}
                leftIcon={<PlusIcon />}
              >
                {t(`Добавить водителя`)}
              </Button>
            )} */}
          </Flex>
        </Flex>
        <Flex
          width={`100%`}
          justifyContent={`space-between`}
          alignItems={`center`}
        >
          <Box width={`40%`}>
            <InputGroup>
              <InputLeftElement>
                <SearchIcon />
              </InputLeftElement>
              <Input
                value={search}
                className={cls.input}
                placeholder={t("Имя водителя, номер машины или телефон")}
                onChange={(e) => setSearchFn(e.target?.value)}
              />
            </InputGroup>
          </Box>
          <Box className={cls.countrWrap}>
            <p>
              {t(`Всего`)}: <span>{count?.count || 0}</span>
            </p>
            <p>
              {t(`Свободных`)}:<span>{count?.free_count || 0}</span>
            </p>
          </Box>
        </Flex>

        <Box mt={"37px"}>
          <SarbonTable
            rowClassName={rowClassName}
            variant="card"
            columns={columns}
            data={data}
          />
        </Box>

        <div>
          {isLoading && data?.length <= 50 && (
            <Box pt={`20px`}>
              <LoadingSpinner />
            </Box>
          )}
          {data?.length >= 50 && (
            <Box mt={6} width={`fit-contend`}>
              <Button
                width={`fit-contend`}
                isLoading={isLoading}
                onClick={addPage}
                className={cls.btnLoad}
              >
                Загрузить еще 50
              </Button>
            </Box>
          )}
        </div>
      </Container>

      <Modal isOpen={open} onClose={() => setOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Статус машины</ModalHeader>
          <ModalCloseButton onClick={() => setOpen(false)} />
          <ModalBody>
            {statusData.map((item) => (
              <CheckBoxComponent
                key={item.id}
                onClick={() => setIconStatus(item.type)}
                active={item.type === iconStatus}
              >
                <Flex gap={3} alignItems={"center"}>
                  <item.icon /> <spa>{item.title}</spa>
                </Flex>
              </CheckBoxComponent>
            ))}
          </ModalBody>
          <ModalFooter>
            <Flex gap={2}>
              <Button
                onClick={() => setOpen(false)}
                className={cls.topButton}
                variant="secondaryWhite"
                size="md"
                border="1px solid #D0D5DD"
              >
                Отменить
              </Button>
              <Button
                isDisabled={Boolean(!iconStatus)}
                onClick={statusIconChange}
                className={cls.topButton}
                size="md"
              >
                Сохранить
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
