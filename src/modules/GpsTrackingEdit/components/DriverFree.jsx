import {
  AndroidIcon,
  AppleIcon,
  BatareyFullIcon,
  BatareyIcon,
  BluetoothIcon,
  CloseIconM,
  FurIcon,
  LoadgreenIcon,
  LoadOulineIcon,
  LocationActiveIcon,
  NextBtnIcon,
  StarsIcon,
  StoneIcon,
} from "@/assets/icons/icons";
import { Avatar, Box, Button, Flex, IconButton } from "@chakra-ui/react";
import React from "react";

const DriverFree = ({ cls,setModalType,contendSingle,setCenterModalType,setIconStatus }) => {

  return (
    <div className={cls.filter}>
      <Flex flexDirection={"column"} rowGap={`10px`} alignItems={"flex-start"}>
        <Flex width={`100%`} justifyContent={`space-between`} alignItems={"center"}>
          <Flex gap={3}>
            <Avatar name={contendSingle?.users_id_data?.full_name} src={contendSingle?.users_id_data?.photo} />
            <Box>
              <p className={cls.userName}>{contendSingle?.users_id_data?.full_name}</p>
              <p className={cls.version}>
                <StarsIcon /> 4.1<span>{" (16 отзывов)"}</span>
              </p>
            </Box>
          </Flex>
          <IconButton
            width={"fit-content"}
            style={{ background: "transparent" }}
            onClick={() => {setModalType('filter');setIconStatus("")}}
            icon={<CloseIconM />}
          />
        </Flex>
        <Box mt={`17px`} className={cls.cardWrap}>
          <Flex alignItems={"center"} gap={2}>
            <LocationActiveIcon />
            <Box>
              <p className={cls.smallText}>Вкл: сегодня / 12:38 </p>
              <p className={cls.bigTitle}>г. Нукус, Каракалпакстан</p>
            </Box>
          </Flex>
          <Flex justifyContent={'space-between'} >
            <Flex mt={3}  alignItems={"flex-start"} rowGap={'15px'} justifyContent={"space-between"} flexDirection={'column'}>
              <Flex alignItems={"center"} gap={2}>
                <BluetoothIcon />
                <Box>
                  <p className={cls.smallText}>Bluetooth </p>
                  <p className={cls.bigTitle}>Вкл</p>
                </Box>
              </Flex>
              <Flex alignItems={"center"} gap={2}>
                {
              contendSingle?.os === "android" ? <AndroidIcon /> : <AppleIcon />
                }

                <Box>
                  <p className={cls.smallText}>Смартфон </p>
                  <p className={cls.bigTitle}>{contendSingle?.os}</p>
                </Box>
              </Flex>
            </Flex>
            <Flex  mt={3} alignItems={"flex-start"} rowGap={'15px'}  flexDirection={'column'}>
              <Flex alignItems={"center"} gap={2}>
                {
              contendSingle?.battery > 20 ? <BatareyFullIcon /> : <BatareyIcon />
                }

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
          <Flex width={'100%'} justifyContent={'space-between'}>
            <span>{contendSingle?.users_id_data?.vehicle_type_id_data?.name?.length  < 17  ? contendSingle?.users_id_data?.vehicle_type_id_data?.name : `${contendSingle?.users_id_data?.vehicle_type_id_data?.name.slice(0,14)}...` }</span>
            <Flex gap={3}>
              <Flex gap={1} alignItems={'center'}> <StoneIcon /> 22 т.</Flex>
              <Flex gap={1} alignItems={'center'}> <LoadOulineIcon /> 86m3</Flex>
            </Flex>
          </Flex>
        </Box>
        <Button onClick={() =>{setCenterModalType("changeIcon");setIconStatus(contendSingle?.users_id_data?.provisions?.[0] || "empty")}} leftIcon={<LoadgreenIcon />} rightIcon={<NextBtnIcon />} size={`lg`} className={cls.btngreenOutline}>
          Машина cвободна
        </Button>
        <Button onClick={() => setCenterModalType(`selectCargo`)} size={`lg`} className={cls.btngreen}>
          Предложить груз
        </Button>
      </Flex>
    </div>
  );
};

export default DriverFree;
