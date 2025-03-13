"use client";
import { useTranslation } from "@/app/i18n/client";
import { PopupIcon } from "@/assets/icons/icons";
import { useGetLang } from "@/hooks/useGetLang";
import {
  useDeleteDisTop,
  useGetCreateAddress,
  useGetUserData,
  useUpdateUserInfo,
} from "@/services/api";
import {
  Box,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useDebounce as useDebounce2 } from "use-debounce";
import { useState } from "react";
import { useForm } from "react-hook-form";
import cls from "./style.module.scss";
import authStore from "@/store/auth.store";

export const useMyDispatcher = () => {
  const router = useRouter();
  const locale = useGetLang();
  const { t } = useTranslation(locale, "translations");
  const [search, setSearch] = useState(``);
  const [debouncedValue] = useDebounce2(search, 500);
  const [valueR, setValueR] = useState(`val1`);

  const option = [
    {
      value: `val1`,
      label: t(`Активные`) + ` (22)`,
    },
    {
      value: `val2`,
      label: t(`Неактивные`) + `(1)`,
    },
  ];

  const { data: dataDis, refetch } = useGetCreateAddress({
    data: {
      data: {
        object_data: {
          type: "top_dispatcher",
          search:debouncedValue,
          dispatcher_id: authStore.userData.guid,
        },
      },
    },
  });

  const setSearchFn = (e) => {
    setSearch(e)
  };

  const { mutate: deleteData } = useDeleteDisTop({
    onSuccess: () => {
      refetch();
    },
  });

  const deleteFuntion = (id) => {
    deleteData({
      id: id,
    });
  };

  const { mutate: userData, isLoading } = useUpdateUserInfo({
    onSuccess() {
      refetch();
    },
    onError(er) {
      console.log(er);
    },
  });

  const removeDisFn = (data) => {
    userData({
      data: {
        guid: data?.guid,
        user_status:
          data?.user_status?.[0] === `blocked` ? ["approved"] : ["blocked"],
      },
    });
  };

  const onChange = (e) => {
    setValueR(e);
  };

  const addPage = () => {};

  const columns = [
    {
      title: t(`имя Диспетчера`),
      width: 350,
      render: (row, index) => row?.first_dispatcher_data?.full_name,
    },
    {
      title: t(`Номер телефона`),
      width: 350,
      render: (row, index) => row?.first_dispatcher_data?.phone,
    },
    {
      title: t(`Машины`),
      width: 250,
      filter: true,
      key: `time`,
      filterType: (type) => console.log(type),
      render: (row, index) => row?.vehicle_count,
    },
    {
      title: t(`Предложения`),
      width: 250,
      render: (row, index) => ``,
    },
    {
      title: t(`в исполнении`),
      width: 250,
      render: (row, index) => row?.vehicle_count,
    },
    {
      title: t(`Статус аккаунта`),
      width: 250,
      render: (row, index) => (
        <Flex
          onClick={(e) => e.stopPropagation()}
          justifyContent={`space-between`}
          width={`100%`}
        >
          <p>
            {" "}
            {row?.first_dispatcher_data?.user_status?.[0] === `blocked`
              ? `Отключен`
              : `Active`}{" "}
          </p>
          <Box className={cls.popup}>
            <Popover placement={"bottom-start"}>
              {({ isOpen, onClose }) => (
                <>
                  <PopoverTrigger>
                    <IconButton
                      size={"sm"}
                      borderRadius={"50%"}
                      icon={<PopupIcon />}
                      width="40px"
                      _hover={{ backgroundColor: "rgba(226, 228, 234, 1)" }}
                      backgroundColor={"white"}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent
                      boxShadow={" 0px 12px 16px 10px rgba(16, 24, 40, 0.1)"}
                      border={"1px solid rgba(234, 236, 240, 1"}
                      className={cls.popoverCon}
                    >
                      <PopoverArrow />
                      <PopoverBody>
                        <Box
                          style={{ padding: `10px 8px` }}
                          _hover={{
                            backgroundColor: `rgb(247, 247, 247)`,
                            borderRadius: `6px`,
                            color: `rgba(33, 31, 38, 1)`,
                            cursor: `pointer`,
                          }}
                          className={cls.menuItem}
                          onClick={() => {
                            router.push(
                              `/${locale}/dispatcher/create?id=${row?.first_dispatcher_data?.guid}`
                            );
                          }}
                        >
                          {t(`Изменить личные данные`)}
                        </Box>
                        <Box
                          style={{ padding: `10px 8px` }}
                          _hover={{
                            backgroundColor: `rgb(247, 247, 247)`,
                            borderRadius: `6px`,
                            color: `rgba(33, 31, 38, 1)`,
                            cursor: `pointer`,
                          }}
                          className={cls.menuItem}
                          onClick={() => {
                            router.push(
                              `/${locale}/my-cars-dispatchertest?id=${row?.first_dispatcher_data?.guid}`
                            );
                          }}
                        >
                          {t(`Доб./ удал. машины`)}
                        </Box>
                        <Box
                          style={{ padding: `10px 8px` }}
                          _hover={{
                            backgroundColor: `rgb(247, 247, 247)`,
                            borderRadius: `6px`,
                            color: `rgba(33, 31, 38, 1)`,
                            cursor: `pointer`,
                          }}
                          className={cls.menuItem}
                          onClick={() => {
                            removeDisFn(row?.first_dispatcher_data);
                            onClose();
                          }}
                        >
                          {row?.first_dispatcher_data?.user_status?.[0] ===
                          `blocked`
                            ? `Активировать диспетчера`
                            : t(`Отключить диспетчера`)}
                        </Box>

                        <Box
                          style={{ padding: `10px 8px`, color: `red` }}
                          _hover={{
                            backgroundColor: `rgb(247, 247, 247)`,
                            borderRadius: `6px`,
                            color: `rgba(255, 255, 255, 1)`,
                            cursor: `pointer`,
                          }}
                          className={cls.menuItem}
                          onClick={() => {
                            deleteFuntion(row?.guid);
                            onClose();
                          }}
                        >
                          {t(`Удалить диспетчера`)}
                        </Box>
                      </PopoverBody>
                    </PopoverContent>
                  </Portal>
                </>
              )}
            </Popover>
          </Box>
        </Flex>
      ),
    },
  ];

  return {
    t,
    data: dataDis?.response,
    option,
    valueR,
    setValueR,
    onChange,
    search,
    setSearchFn,
    deleteFuntion,
    addPage,
    columns,
    router,
  };
};
