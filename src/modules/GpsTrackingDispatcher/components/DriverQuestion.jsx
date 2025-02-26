import {
  AndroidIcon,
  AppleIcon,
  BatareyFullIcon,
  BatareyIcon,
  BluetoothIcon,
  CheckBlueIcon,
  CloseIconM,
  FurIcon,
  GreenCheckIcon,
  GruzIcon,
  LoadgreenIcon,
  LoadOulineIcon,
  LocationActiveIcon,
  NextBtnIcon,
  QuestionBlueIcon,
  StarsIcon,
  StoneIcon,
} from "@/assets/icons/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  setModalType,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";

const DriverQuestion = ({
  cls,
  contendSingle,
  stateMap,
  addressAdd,
  setCenterModalType,
  setModalType,
  setStateMap,
  handleOpenModal,
  handleCloseModal,
  setIconStatus,
}) => {
  const { t } = useTranslation();
  console.log(`contendSingle`,contendSingle)
  return (
    <div className={cls.filter}>
      <Flex flexDirection={"column"} rowGap={`10px`} alignItems={"flex-start"}>
        <Flex
          width={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
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
            icon={<CloseIconM />}
            onClick={() => {
              setModalType("filter");
              setIconStatus("");
            }}
          />
        </Flex>

        <Box className={cls.cardWrapOutline}>
          <Flex alignItems={"center"} gap={2}>
            <LocationActiveIcon />
            <Box>
              <p className={cls.smallText}>
                Вкл:{" "}
                {format(
                  new Date(contendSingle?.users_gps?.[0]?.update_time).setHours(new Date(contendSingle?.users_gps?.[0]?.update_time).getHours() - 5),
                  "yyyy-MM-dd, H:mm"
                )}{" "}
              </p>
              <p className={cls.bigTitle}>
                {contendSingle?.users_gps?.[0]?.location_name || "Нет адреса"}
              </p>
            </Box>
          </Flex>
          <Flex justifyContent={"space-between"}>
            <Flex
              mt={3}
              alignItems={"flex-start"}
              rowGap={"15px"}
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
                  <p className={cls.bigTitle}>{contendSingle?.users_gps?.[0]?.battery}%</p>
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
        <Box className={cls.cardWrapOutline}>
          <Flex gap={2}>
            <div className={cls.startAIconWrap}>
              <div className={cls.startAIcon}>A</div>{" "}
              <div className={cls.line}></div>{" "}
            </div>
            <Box>
              <p className={cls.cardStartTitle}>
                {contendSingle?.users_gps?.[0]?.location_name || "Нет адреса"}
              </p>
              <p className={cls.cardStartSubTitle}>
                {format(
                  contendSingle?.users_gps?.[0]?.update_time,
                  "yyyy-MM-dd"
                )}
              </p>
            </Box>
          </Flex>

          <Flex mt={5} gap={2}>
            <div className={cls.startBIcon}>B</div>
            {addressAdd || contendSingle?.user?.address_name ? (
              <Box>
                <p className={cls.cardStartTitle}>
                  {addressAdd
                    ? `${addressAdd?.address.slice(0, 17)}...`
                    : `${contendSingle?.user?.address_name.slice(0, 17)}...`}
                </p>
                <p className={cls.cardStartSubTitle}>
                  {/* RUS / <span>18 августа</span> */}
                </p>
              </Box>
            ) : (
              <Box
                onClick={() => {
                  setStateMap(true);
                  handleOpenModal();
                }}
              >
                <p className={cls.cardStartTitleAdd}> Добавить адрес</p>
              </Box>
            )}
          </Flex>

          <Flex className={cls.gruz2} mt={5} gap={2}>
            <GruzIcon />
            <Box>
              <p className={cls.cardStartTitle}>Оборудование и запчасти</p>
              <p className={cls.cardStartSubTitle}>
                <Flex width={"100%"} justifyContent={"space-between"}>
                  <span>Контейнеровоз</span>
                  <Flex ml={2} gap={3}>
                    <Flex gap={1} alignItems={"center"}>
                      <StoneIcon /> {contendSingle?.vehicles?.[0]?.capacity} т.
                    </Flex>
                    <Flex gap={1} alignItems={"center"}>
                      <LoadOulineIcon /> {contendSingle?.vehicles?.[0]?.height3}m3
                    </Flex>
                  </Flex>
                </Flex>
              </p>
            </Box>
          </Flex>
        </Box>
        <Button
          onClick={() => {
            setCenterModalType("changeIcon");
            setIconStatus(contendSingle?.user?.provisions?.[0]);
          }}
          leftIcon={<QuestionBlueIcon />}
          rightIcon={<NextBtnIcon />}
          size={`lg`}
          className={cls.btnBlueOutline}
        >
          Занята чужим грузом
        </Button>
        {/* <Box className={cls.cardWrapOutline}>
           <Flex width={'100%'} alignItems={'center'} gap={3}>
            <Avatar  name="B"  />
             <Box>
             <p className={cls.cardStartSubTitle}>Диспетчер: </p>
             <p className={cls.name}>
               Абдулла Хакимов (U-000001838 )
             </p>
             <p className={cls.cardStartSubTitle}>07.08.2024 / 12:36 </p>

             </Box>
           </Flex>
        </Box> */}
      </Flex>
    </div>
  );
};

export default DriverQuestion;
