import {
  AndroidIcon,
  AppleIcon,
  BatareyFullIcon,
  BatareyIcon,
  BluetoothIcon,
  CencelMapIcon,
  CloseIconM,
  FurIcon,
  LoadgreenIcon,
  LoadOulineIcon,
  LocationActiveIcon,
  NextBtnIcon,
  StarsIcon,
  StoneIcon,
} from "@/assets/icons/icons";
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
}) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(`contendSingle`, contendSingle);

  const handleOpen = () => {
    onOpen();
    copy(
      `https://yandex.com/maps/?ll=${contendSingle?.users_gps?.[0]?.long},${contendSingle?.users_gps?.[0]?.lat}&z=15&pt=${contendSingle?.users_gps?.[0]?.long},${contendSingle?.users_gps?.[0]?.lat},pm2rdm`
    );
    setTimeout(() => {
      onClose();
    }, 1000);
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
              setModalType("");
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
                  new Date(contendSingle?.users_gps?.[0]?.update_time).setHours(new Date(contendSingle?.users_gps?.[0]?.update_time).getHours() - 5),
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
                      Поделится локацией
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
                        <p>Локациия скопирована</p>
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
                  <p className={cls.smallText}>Bluetooth </p>
                  <p className={cls.bigTitle}>Вкл</p>
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
                  : t( `Пока нет машины`)
              }
            >
              <p>
                {contendSingle?.vehicles?.[0]?.trailer_type_id_data?.name
                  ? contendSingle?.vehicles?.[0]?.trailer_type_id_data?.name
                  : t( `Пока нет машины`)}
              </p>
            </Tooltip>

            <Flex gap={3}>
              <Flex gap={1} alignItems={"center"}>
                <StoneIcon /> {contendSingle?.vehicles?.[0]?.capacity   } т.
              </Flex>
              <Flex gap={1} alignItems={"center"}>
                <LoadOulineIcon /> {contendSingle?.vehicles?.[0]?.height   } m3
              </Flex>
            </Flex>
          </Flex>
          <Flex
            p={`10px 0px`}
            borderBottom={`1px solid rgba(219, 216, 227, 1)`}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <span style={{fontWeight:400}}>{t(`Тип топлива`)}</span>
            <span>{contendSingle?.vehicles?.[0]?.fuel_id_data?.name}</span>
          </Flex>
          <Flex
            p={`10px 0px`}
            borderBottom={`1px solid rgba(219, 216, 227, 1)`}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <span style={{fontWeight:400}}>{t(`Экологический класс`)}</span>
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
                <span style={{ color: `black`, fontWeight: 400 }}>
                  {contendSingle?.vehicles?.[0]?.car_number}
                </span>
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

        <Button
          onClick={() => setCenterModalType(`selectCargo`)}
          size={`lg`}
          className={cls.btngreen}
        >
          {t(`Предложить груз`)}
        </Button>
      </Flex>
    </div>
  );
};

export default DriverFree;
