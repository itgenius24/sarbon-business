import {
  AndroidIcon,
  AppleIcon,
  BatareyFullIcon,
  BatareyIcon,
  BluetoothIcon,
  CencelMapIcon,
  CloseIconM,
  ExelIcon,
  FurIcon,
  LoadgreenIcon,
  LoadOulineIcon,
  LocationActiveIcon,
  NextBtnIcon,
  StarsIcon,
  StoneIcon,
  TelegramOpasitiyIcon,
  WatsapOpasitiyIcon,
} from "@/assets/icons/icons";
import { TextField } from "@/components/TextField";
import { useGetCompanyList, useGetExcelPost } from "@/services/api";
import authStore from "@/store/auth.store";
import { flegCountry } from "@/utils/flegCountry";
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import copy from "copy-to-clipboard";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const DriverFree = ({
  cls,
  setModalType,
  contendSingle,
  setCenterModalType,
  setIconStatus,
  errors,
  control,
  register,
  watch,
}) => {
  console.log("contendSingle", contendSingle);
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(`contendSingle`, contendSingle);
  const { t } = useTranslation();

  const handleOpen = () => {
    onOpen();
    copy(
      `https://yandex.com/maps/?ll=${contendSingle?.users_gps?.[0]?.long},${contendSingle?.users_gps?.[0]?.lat}&z=15&pt=${contendSingle?.users_gps?.[0]?.long},${contendSingle?.users_gps?.[0]?.lat},pm2rdm`
    );
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const getCompanyList = useGetCompanyList(
    {
      data: JSON.stringify({
        guid: contendSingle?.firm_data?.firm_data?.[0]?.firm_id,
      }),
    },
    {
      enabled: Boolean(contendSingle?.firm_data?.firm_data?.[0]?.firm_id),
    }
  );

  const downloadByLanguage = async (url) => {
    try {
      const link = document.createElement("a");
      const res = `https://pub-be0226dfadb94399a1ec5722d30b655b.r2.dev/${url}`;
      link.href = res;
      link.target = "_blank";
      link.download = `Груз`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.log(2);
    }
  };

  const getExcelFile = useGetExcelPost({
    onSuccess: (res) => {
      downloadByLanguage(res?.url);
    },
  });

  const getExcelFileFn = () => {
    getExcelFile.mutate({
      data: {
        object_data: {
          driver_name:contendSingle?.user?.full_name,
          driver_number:contendSingle?.user?.phone,
          type: "dispatcher_driver",
        },
      },
    });
  };

  return (
    <div className={cls.filter}>
      <Flex flexDirection={"column"} rowGap={`10px`} alignItems={"flex-start"}>
        <Flex
          width={`100%`}
          justifyContent={`space-between`}
          alignItems={"center"}
        >
          <Flex gap={3}>
            <Avatar
              name={contendSingle?.user?.full_name}
              src={contendSingle?.user?.photo}
            />
            <Box>
              <p className={cls.userName}>{contendSingle?.user?.full_name}</p>
              <p className={cls.version}>
                <StarsIcon /> 4.1<span>{" (16 отзывов)"}</span>
              </p>
            </Box>
          </Flex>
          <IconButton
            width={"fit-content"}
            style={{ background: "transparent" }}
            onClick={() => {
              setModalType("filter");
              setIconStatus("");
            }}
            icon={<CloseIconM />}
          />
        </Flex>
        <Box mt={`17px`} className={cls.cardWrapOutline}>
          <Flex alignItems={"center"} gap={2}>
            <LocationActiveIcon />
            <Box>
              <p className={cls.smallText}>
                Вкл:{" "}
                {format(
                  new Date(contendSingle?.users_gps?.[0]?.update_time).setHours(
                    new Date(
                      contendSingle?.users_gps?.[0]?.update_time
                    ).getHours() - 5
                  ),
                  "yyyy-MM-dd, HH:mm"
                )}{" "}
              </p>
              <p className={cls.bigTitle}>
                {contendSingle?.users_gps?.[0]?.location_name || "Нет адреса"}
              </p>
              <Box>
                <Popover
                  onOpen={isOpen}
                  onClose={onClose}
                  placement="top-start"
                >
                  <PopoverTrigger>
                    <Button
                      onClick={handleOpen}
                      style={{
                        padding: `1px 0px`,
                        background: `transparent`,
                        color: `rgba(0, 122, 255, 1)`,
                        borderBottom: `1px dashed rgba(0, 122, 255, 1)`,
                        width: `fit-content`,
                        borderRadius: `0px`,
                        lineHeight: `18px`,
                        height: `25px`,
                        fontWeight: 400,
                        fontSize: `14px`,
                      }}
                    >
                      {t(`Поделится локацией`)}
                    </Button>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent
                      borderRadius={`4px`}
                      border={`none`}
                      bg={`rgba(0, 122, 255, 1)`}
                      width={`fit-content`}
                    >
                      <PopoverArrow
                        className={cls.popoverArrow}
                        size={`lg`}
                        bg={`rgba(0, 122, 255, 1)`}
                      />
                      <PopoverBody
                        color={`white`}
                        borderRadius={`4px`}
                        border={`none`}
                        width={`fit-content`}
                      >
                        <p>{t(`Локациия скопирована`)}</p>
                      </PopoverBody>
                    </PopoverContent>
                  </Portal>
                </Popover>
              </Box>
            </Box>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Flex
              mt={3}
              alignItems={"flex-start"}
              rowGap={"15px"}
              justifyContent={"space-between"}
              flexDirection={"column"}
            >
              <Flex alignItems={"center"} gap={2}>
                <BluetoothIcon />
                <Box>
                  <p className={cls.smallText}>{t(`Bluetooth`)} </p>
                  <p className={cls.bigTitle}>{t(`Вкл`)}</p>
                </Box>
              </Flex>
              <Flex alignItems={"center"} gap={2}>
                {contendSingle?.users_gps?.[0]?.os === "android" ? (
                  <AndroidIcon />
                ) : (
                  <AppleIcon />
                )}

                <Box>
                  <p className={cls.smallText}>{t(`Смартфон`)} </p>
                  <p className={cls.bigTitle}>
                    {contendSingle?.users_gps?.[0]?.os}
                  </p>
                </Box>
              </Flex>
            </Flex>
            <Flex
              mt={3}
              alignItems={"flex-start"}
              rowGap={"15px"}
              flexDirection={"column"}
            >
              <Flex alignItems={"center"} gap={2}>
                {contendSingle?.users_gps?.[0]?.battery > 20 ? (
                  <BatareyFullIcon />
                ) : (
                  <BatareyIcon />
                )}

                <Box>
                  <p className={cls.smallText}>{t(`Батарея`)} </p>
                  <p className={cls.bigTitle}>
                    {contendSingle?.users_gps?.[0]?.battery}%
                  </p>
                </Box>
              </Flex>

              <Flex alignItems={"center"} gap={2}>
                <FurIcon />
                <Box>
                  <p className={cls.smallText}>{t(`Версия`)} </p>
                  <p className={cls.bigTitle}>
                    {contendSingle?.users_gps?.[0]?.version}
                  </p>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Box>
        <Box className={cls.btnOutline}>
          <Flex
            pb={`10px`}
            borderBottom={`1px solid rgba(219, 216, 227, 1)`}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <Tooltip
              border={`1px solid rgba(219, 216, 227, 1)`}
              background={`white`}
              color={`black`}
              placement="top-end"
              label={
                contendSingle?.vehicles?.[0]?.trailer_type_id_data?.name
                  ? contendSingle?.vehicles?.[0]?.trailer_type_id_data?.name
                  : t(`Пока нет машины`)
              }
            >
              <p className={cls.cargoType}>
                {contendSingle?.vehicles?.[0]?.trailer_type_id_data?.name
                  ? contendSingle?.vehicles?.[0]?.trailer_type_id_data?.name
                  : t(`Пока нет машины`)}
              </p>
            </Tooltip>

            <Flex gap={3}>
              <Flex gap={1} alignItems={"center"}>
                <StoneIcon /> {contendSingle?.vehicles?.[0]?.capacity} т.
              </Flex>
              <Flex gap={1} alignItems={"center"}>
                <LoadOulineIcon /> {contendSingle?.vehicles?.[0]?.height} m3
              </Flex>
            </Flex>
          </Flex>
          <Flex
            p={`10px 0px`}
            borderBottom={`1px solid rgba(219, 216, 227, 1)`}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <span style={{ fontWeight: 400 }}>{t(`Тип топлива`)}</span>
            <span>{contendSingle?.vehicles?.[0]?.fuel_id_data?.name}</span>
          </Flex>
          <Flex
            p={`10px 0px`}
            borderBottom={`1px solid rgba(219, 216, 227, 1)`}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <span style={{ fontWeight: 400 }}>{t(`Экологический класс`)}</span>
            <span>{contendSingle?.vehicles?.[0]?.eco_standart}</span>
          </Flex>
          <Flex pt={`10px`} width={"100%"} justifyContent={"space-between"}>
            <Flex gap={`5px`} alignItems={`center`}>
              <Tooltip
                border={`1px solid rgba(219, 216, 227, 1)`}
                background={`white`}
                color={`black`}
                placement="top-end"
                label={contendSingle?.vehicles?.[0]?.car_country || `uz`}
              >
                <Image
                  style={{
                    width: `35px`,
                    height: `25px`,
                  }}
                  width={100}
                  height={100}
                  src={flegCountry(
                    contendSingle?.vehicles?.[0]?.car_country || `uz`
                  )}
                />
              </Tooltip>
              <Box>
                <p style={{ color: `black`, fontWeight: 400 }}>
                  {contendSingle?.vehicles?.[0]?.car_number}
                </p>
              </Box>
            </Flex>
          </Flex>
        </Box>

    

        {contendSingle?.user?.provisions?.[0] === `broke_down` ? (
          <Button
            onClick={() => {
              setCenterModalType("changeIcon");
              setIconStatus(contendSingle?.user?.provisions?.[0] || "empty");
            }}
            leftIcon={<CencelMapIcon />}
            rightIcon={<NextBtnIcon />}
            size={`lg`}
            className={cls.btngreenCanseleOutline}
          >
            {t(`Сломалась`)}
          </Button>
        ) : (
          <Button
            onClick={() => {
              setCenterModalType("changeIcon");
              setIconStatus(contendSingle?.user?.provisions?.[0] || "empty");
            }}
            leftIcon={<LoadgreenIcon />}
            rightIcon={<NextBtnIcon />}
            size={`lg`}
            className={cls.btngreenOutline}
          >
            {t(`Машина cвободна`)}
          </Button>
        )}
        {getCompanyList?.data?.response?.[0] && (
          <Box style={{ background: `white` }} className={cls.cardWrapOutline}>
            <Flex width={"100%"} alignItems={"center"} gap={3}>
              <Avatar
                name={getCompanyList?.data?.response?.[0]?.full_name}
                src={getCompanyList?.data?.response?.[0]?.full_name}
              />
              <Box>
                <p className={cls.cardStartSubTitlez}>Перевозчик </p>
                <p style={{ fontSize: `16px` }} className={cls.name}>
                  {getCompanyList?.data?.response?.[0]?.full_name}
                </p>
                <Flex alignItems={"center"} gap={2}>
                  <p className={cls.cardStartSubTitleZTel}>
                    {getCompanyList?.data?.response?.[0]?.phone_number}
                  </p>
                  <a
                    href={`https://t.me/${getCompanyList?.data?.response?.[0]?.phone_number}`}
                  >
                    <TelegramOpasitiyIcon />
                  </a>
                  <a
                    href={`https://wa.me/${getCompanyList?.data?.response?.[0]?.phone_number}`}
                  >
                    <WatsapOpasitiyIcon />
                  </a>
                </Flex>
              </Box>
            </Flex>
          </Box>
        )}

        <Button
          onClick={() => setCenterModalType(`selectCargo`)}
          size={`lg`}
          className={cls.btngreen}
        >
          {t(`Предложить груз`)}
        </Button>
        <TextField
          // className={cls.textField}
          errors={errors}
          control={control}
          name="distance"
          register={register}
          // additionalItemName="weight_unit"
          placeholder={t("Введите расстояние поиска")}
          type="number"
          zIndex={90}
        />
        <Box
          as="button"
          color={`black`}
          _hover={{ background: `white` }}
          backgroundColor={`white`}
          border={`1px solid rgba(21, 186, 77, 1)`}
          // leftIcon={}
          onClick={getExcelFileFn}
          maxWidth={`400px`}
          width={`100%`}
          padding={`10px`}
          whiteSpace={`nowrap`}
          textOverflow={`ellipsis`}
          overflow={`hidden`}
          borderRadius={`8px`}
        >
          <Flex alignItems={`center`} gap={1}>
            <ExelIcon />
            <p
              style={{
                fontWeight: 600,
                overflow: `hidden`,
                textOverflow: `ellipsis`,
                width: `100%`,
              }}
            >
              Список ближайших в машин Excel
            </p>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

export default DriverFree;
