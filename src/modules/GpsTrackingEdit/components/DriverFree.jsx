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
import { Avatar, Box, Button, Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";

const DriverFree = ({
  cls,
  setModalType,
  contendSingle,
  setCenterModalType,
  setIconStatus,
}) => {

  console.log("contendSingle",contendSingle)
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
              name={contendSingle?.users_id_data?.full_name}
              src={contendSingle?.users_id_data?.photo}
            />
            <Box>
              <p className={cls.userName}>
                {contendSingle?.users_id_data?.full_name}
              </p>
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
        <Box mt={`17px`} className={cls.cardWrap}>
          <Flex alignItems={"center"} gap={2}>
            <LocationActiveIcon />
            <Box>
              <p className={cls.smallText}>Вкл: {format(contendSingle?.update_time,"yyyy-MM-dd, hh:mm")} </p>
              <p className={cls.bigTitle}>{contendSingle?.location_name || "Нет адреса"}</p>
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
                {contendSingle?.os === "android" ? (
                  <AndroidIcon />
                ) : (
                  <AppleIcon />
                )}

                <Box>
                  <p className={cls.smallText}>Смартфон </p>
                  <p className={cls.bigTitle}>{contendSingle?.os}</p>
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
                {contendSingle?.battery > 20 ? (
                  <BatareyFullIcon />
                ) : (
                  <BatareyIcon />
                )}

                <Box>
                  <p className={cls.smallText}>Батарея </p>
                  <p className={cls.bigTitle}>{contendSingle?.battery}%</p>
                </Box>
              </Flex>

              <Flex alignItems={"center"} gap={2}>
                <FurIcon />
                <Box>
                  <p className={cls.smallText}>Версия </p>
                  <p className={cls.bigTitle}>{contendSingle?.version}</p>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Box>
        <Box className={cls.btnOutline}>
          <Flex width={"100%"} justifyContent={"space-between"}>
          <Tooltip border={`1px solid rgba(219, 216, 227, 1)`} background={`white`} color={`black`} placement='top-end' label={contendSingle?.users_id_data?.vehicle_type_id_data?.name}>
          <p>
              {contendSingle?.users_id_data?.vehicle_type_id_data?.name}
                
            </p>
          </Tooltip>
          
            <Flex gap={3}>
              <Flex gap={1} alignItems={"center"}>
                {" "}
                <StoneIcon /> 22 т.
              </Flex>
              <Flex gap={1} alignItems={"center"}>
                {" "}
                <LoadOulineIcon /> 86m3
              </Flex>
            </Flex>
          </Flex>
        </Box>

        {contendSingle?.users_id_data?.provisions?.[0] === `broke_down` ? (
          <Button
            onClick={() => {
              setCenterModalType("changeIcon");
              setIconStatus(
                contendSingle?.users_id_data?.provisions?.[0] || "empty"
              );
            }}
            leftIcon={<CencelMapIcon />}
            rightIcon={<NextBtnIcon />}
            size={`lg`}
            className={cls.btngreenCanseleOutline}
          >
           Сломалась
          </Button>
        ) : (
          <Button
            onClick={() => {
              setCenterModalType("changeIcon");
              setIconStatus(
                contendSingle?.users_id_data?.provisions?.[0] || "empty"
              );
            }}
            leftIcon={<LoadgreenIcon />}
            rightIcon={<NextBtnIcon />}
            size={`lg`}
            className={cls.btngreenOutline}
          >
            Машина cвободна
          </Button>
        )}

        <Button
          onClick={() => setCenterModalType(`selectCargo`)}
          size={`lg`}
          className={cls.btngreen}
        >
          Предложить груз
        </Button>
      </Flex>
    </div>
  );
};

export default DriverFree;
