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
  StarsIcon,
  StoneIcon,
} from "@/assets/icons/icons";
import { useGetOffer } from "@/services/api";
import { Avatar, Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";

const DriverCheck = ({ cls,contendSingle, setModalType,setCenterModalType,setIconStatus }) => {

  const getOfferCount = useGetOffer(
    {
      data: JSON.stringify({
        users_id_2: contendSingle?.user?.guid,
        with_relations: true,
      })
    },
    { enabled: Boolean(contendSingle?.user?.guid), }
  );


  
  
  return (
    <div className={cls.filter}>
        {!getOfferCount.isLoading && <Flex flexDirection={"column"} rowGap={`10px`} alignItems={"flex-start"}>
        <Flex width={'100%'} justifyContent={'space-between'} alignItems={"center"}>
          <Flex gap={3}>
            <Avatar name="Bobur Nimatllayey" src="#" />
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
            onClick={() => {setModalType("filter");setIconStatus('')}}
          />
        </Flex>
        <Box
          mt={`17px`}
          rightIcon={<NextBtnIcon />}
          size={`lg`}
          className={cls.chatCard}
        >
        <p className={cls.smallText}>Сегодня, 12:36</p>
         Я в пути, все идет по плану
        </Box>
        <Box className={cls.cardWrap}>
          <Flex alignItems={"center"} gap={2}>
            <LocationActiveIcon />
            <Box>
            <p className={cls.smallText}>Вкл: {format(contendSingle?.users_gps?.[0]?.update_time,"yyyy-mm-dd, hh:mm")} </p>
            <p className={cls.bigTitle}>{contendSingle?.users_gps?.[0]?.location_name || "Нет адреса"}</p>
            </Box>
          </Flex>
          <Flex mt={3} alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"} gap={2}>
              <BluetoothIcon />
              <Box>
                <p className={cls.smallText}>Bluetooth </p>
                <p className={cls.bigTitle}>Вкл</p>
              </Box>
            </Flex>
            <Flex alignItems={"center"} gap={2}>
              { contendSingle?.users_gps?.[0]?.battery > 20 ?   <BatareyFullIcon /> :  <BatareyIcon />}
              <Box>
                <p className={cls.smallText}>Батарея </p>
                <p className={cls.bigTitle}>{contendSingle?.users_gps?.[0]?.battery}%</p>
              </Box>
            </Flex>
          </Flex>
          <Flex mt={3} alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"} gap={2}>
             {contendSingle?.users_gps?.[0]?.os === "android" ? <AndroidIcon /> : <AppleIcon />}
              <Box>
                <p className={cls.smallText}>Смартфон </p>
                <p className={cls.bigTitle}>{contendSingle?.users_gps?.[0]?.os}</p>
              </Box>
            </Flex>
            <Flex alignItems={"center"} gap={2}>
              <FurIcon />
              <Box>
                <p className={cls.smallText}>Версия </p>
                <p className={cls.bigTitle}>{contendSingle?.users_gps?.[0]?.version}</p>
              </Box>
            </Flex>
          </Flex>
        </Box>
        <Box className={cls.cardWrap}>
          <Flex gap={2}>
          <div className={cls.startAIconWrap}><div  className={cls.startAIcon}>A</div> <div className={cls.line}></div> </div>
          <Box>
              <p className={cls.cardStartTitle}>{contendSingle?.order?.[0]?.cargo_id_data?.from}</p>
              <p className={cls.cardStartSubTitle}>
                
                {contendSingle?.order?.[0]?.cargo_id_data?.city_id_data?.address_id_data?.name} / <span>{format(contendSingle?.order?.[0]?.cargo_id_data?.load_time ? contendSingle?.order?.[0]?.cargo_id_data?.load_time : new Date(),"yyyy-mm-dd")}
                </span>
              </p>
            </Box>
          </Flex>
          <Flex mt={5} gap={2}>
            <div className={cls.startBIcon}>B</div>
            <Box>
              <p className={cls.cardStartTitle}>{contendSingle?.order?.[0]?.cargo_id_data?.to}</p>
              <p className={cls.cardStartSubTitle}>
                {contendSingle?.order?.[0]?.cargo_id_data?.city_id_2_data?.address_id_data?.name} / <span>{format(contendSingle?.order?.[0]?.cargo_id_data?.date ? contendSingle?.order?.[0]?.cargo_id_data?.date : new Date(),"yyyy-mm-dd")}</span>{" "}
              </p>
            </Box>
          </Flex>

          <Flex className={cls.gruz} mt={5} gap={2}>
            <GruzIcon />
            <Box>
              <p className={cls.cardStartTitle}>Оборудование и запчасти</p>
              <p className={cls.cardStartSubTitle}>
                <Flex width={"100%"} justifyContent={"space-between"}>
                  <span>{contendSingle?.order?.[0]?.cargo_id_data?.cargo_type_id_data?.name}</span>
                  <Flex ml={2} gap={3}>
                    <Flex gap={1} alignItems={"center"}>
                      <StoneIcon /> {contendSingle?.order?.[0]?.cargo_id_data?.weight} т.
                    </Flex>
                    <Flex gap={1} alignItems={"center"}>
                      <LoadOulineIcon /> {contendSingle?.order?.[0]?.cargo_id_data?.volume_m3}m3
                    </Flex>
                  </Flex>
                </Flex>
              </p>
            </Box>
          </Flex>
          <Flex mt={3} justifyContent={'space-between'}>
             <p className={cls.cardStartSubTitle}>Cумма</p>
             <p className={cls.cardStartSubTitle}>Тип оплаты: <span>Перечисление</span></p>
          </Flex>
          <Flex mt={3} justifyContent={'space-between'} alignItems={'center'}>
             <p className={cls.sum}>{contendSingle?.order?.[0]?.cargo_id_data?.bid_cash} {contendSingle?.order?.[0]?.cargo_id_data?.currency_id_data?.code} </p>
             <p className={cls.cardStartSubTitle}>Предоплата: <span>{contendSingle?.order?.[0]?.cargo_id_data?.prepayment_percentage > 0 ?"Da" : "Нет" }</span></p>
          </Flex>
        </Box>
        <Button  onClick={() => {setCenterModalType("changeIcon");setIconStatus(contendSingle?.user?.provisions?.[0])}}  leftIcon={<CheckBlueIcon />} rightIcon={<NextBtnIcon />} size={`lg`} className={cls.btnBlueOutline}>
        Занята нашим грузом
        </Button>
        <Box className={cls.cardWrap}>
           <Flex width={'100%'} alignItems={'center'} gap={3}>
            <Avatar  name={contendSingle?.order?.[0]?.cargo_id_data?.users_id_3_data?.full_name} src={contendSingle?.order?.[0]?.cargo_id_data?.users_id_3_data?.photo}  />
             <Box>
             <p className={cls.cardStartSubTitle}>Диспетчер: </p>
             <p className={cls.name}>
               {contendSingle?.order?.[0]?.cargo_id_data?.users_id_3_data?.full_name} {contendSingle?.order?.[0]?.cargo_id_data?.users_id_3_data?.your_id}
             </p>
             <p className={cls.cardStartSubTitle}>07.08.2024 / 12:36 </p>

             </Box>
           </Flex>
        </Box>
      </Flex>}
    </div>
  );
};

export default DriverCheck;
