"use client";

import { Container } from "@/components/Container";

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";

import { PlusIcon } from "@/assets/icons/icons";

import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
import cls from "./style.module.scss";
import { useMyCarsDispatcher } from "./useMyCarsDispatcher";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import authStore from "@/store/auth.store";
import SarbonTable from "@/components/SarbonTable/SarbonTable";
import ModalStatus from "./component/ModalStatus/ModalStatus";
import ModalAddDis from "./component/ModalAddDis/ModalAddDis";

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
    ids,
    userdata,
    setUserData,
    dataDis,
    addSubDis,
    onOpen,
    isOpen,
    onClose,
    createDisLoading,
    searchDis,
    setSearchDIs,
    removeSubDis,
    removeDisLoading,
    deleteLoding
  } = useMyCarsDispatcher();
  const router = useRouter();
  const locale = useGetLang();

  const isSuperDispatcher = authStore?.userData?.user_status?.[0];

  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");

  const isRemoveDisBtn = ids?.filter((item) => item.dispatcher_full_data);

  return (
    <>
      <Container maxW={`1444px`} my="40px">
        <Box position={`relative`} h={`100%`}>
          <Flex width={"100%"} justifyContent={"space-between"}>
            <Heading
              size={isLargerThan845 ? "md" : "sm"}
              mb={isLargerThan845 ? "24px" : "12px"}
              color={`var(--primary-text)`}
            >
              {t("Ваши водители")}
            </Heading>
            <Flex gap={`28px`}>
              <Box className={cls.countrWrap}>
                <p>
                  {t(`Всего`)}: <span>{count?.count || 0}</span>
                </p>
                <p>
                  {t(`Свободных`)}:<span>{count?.free_count || 0}</span>
                </p>
              </Box>
              {isSuperDispatcher === "approved" && (
                <Button
                  onClick={() =>
                    router.push(`/${locale}/my-cars-dispatcher/create`)
                  }
                  width={"fit-content"}
                  leftIcon={<PlusIcon />}
                >
                  {t(`Добавить водителя`)}
                </Button>
              )}
            </Flex>
          </Flex>
          <Flex>
            <Box width={`40%`}>
              <Input
                value={search}
                className={cls.input}
                placeholder={t("Имя водителя, номер машины или телефон")}
                onChange={(e) => setSearchFn(e.target?.value)}
              />
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

          {isLoading && data?.length <= 50 && (
            <Box pt={`20px`}>
              <LoadingSpinner />
            </Box>
          )}

          {data?.length > 0 && (
            <Flex
              className={cls.sticiy}
              alignItems={`center`}
              justifyContent={`center`}
              mt={`20px`}
            >
              <Flex gap={`16px`} className={cls.addUser}>
                <p className={cls.addText}>
                  {t(`Выбрано`)}: {ids?.length}
                </p>
                <Button
                  isLoading={createDisLoading}
                  onClick={onOpen}
                  isDisabled={ids?.length === 0}
                  className={cls.btnAddLoad}
                >
                  {t(`Назначить диспетчера`)}
                </Button>
                {isRemoveDisBtn?.length > 0 && (
                  <Button
                    isLoading={removeDisLoading}
                    onClick={removeSubDis}
                    isDisabled={ids?.length === 0}
                    className={cls.btnAddLoad}
                  >
                    {t(`Открепить диспетчера`)}
                  </Button>
                )}

                <Button
                  isLoading={deleteLoding}
                  onClick={deleteFuntion}
                  isDisabled={ids?.length === 0}
                  _disabled={{
                    background: `rgba(249, 245, 255, 1)`,
                    opacity: 0.5,
                  }}
                  className={cls.btnDelete}
                >
                  {t(`Удалить выбранные`)}
                </Button>
              </Flex>
            </Flex>
          )}

          <div>
            {data?.length >= 50 && count?.count > data?.length && (
              <Box
                position={`absolute`}
                zIndex={`876543`}
                bottom={`25px`}
                left={`32px`}
                width={`fit-contend`}
              >
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
        </Box>
      </Container>

      <ModalStatus
        open={open}
        setOpen={setOpen}
        statusData={statusData}
        setIconStatus={setIconStatus}
        iconStatus={iconStatus}
        cls={cls}
        statusIconChange={statusIconChange}
      />

      <ModalAddDis
        userdataDis={dataDis}
        userdata={userdata}
        open={isOpen}
        cls={cls}
        onClose={onClose}
        setUserData={setUserData}
        createDisLoading={createDisLoading}
        addUserFn={addSubDis}
        searchDis={searchDis}
        setSearchDIs={setSearchDIs}
      />
    </>
  );
};
