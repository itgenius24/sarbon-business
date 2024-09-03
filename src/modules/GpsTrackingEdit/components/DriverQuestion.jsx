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
import { Avatar, Box, Button, Flex, IconButton,setModalType } from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";

const DriverQuestion = ({ cls,contendSingle,stateMap,addressAdd,setCenterModalType,setModalType,setStateMap,handleOpenModal,handleCloseModal,setIconStatus }) => {
   console.log("addressAdd",contendSingle)
  return (
    <div className={cls.filter}>
      <Flex  flexDirection={"column"} rowGap={`10px`} alignItems={"flex-start"}>
        <Flex width={'100%'} alignItems={"center"} justifyContent={'space-between'}>
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
            icon={<CloseIconM />}
            onClick={() => {setModalType("filter");
              setIconStatus('');  
            }}
          />
        </Flex>
  
        <Box className={cls.cardWrap}>
          <Flex alignItems={"center"} gap={2}>
            <LocationActiveIcon />
            <Box>
              <p className={cls.smallText}>Вкл: сегодня / 12:38 </p>
              <p className={cls.bigTitle}>{contendSingle?.location_name}</p>
            </Box>
          </Flex>
         <Flex justifyContent={'space-between'}>
         <Flex mt={3} alignItems={"flex-start"} rowGap={'15px'}  flexDirection={'column'}>
            <Flex alignItems={"center"} gap={2}>
              <BluetoothIcon />
              <Box>
                <p className={cls.smallText}>Bluetooth </p>
                <p className={cls.bigTitle}>Вкл</p>
              </Box>
            </Flex>
            <Flex alignItems={"center"} gap={2}>
            {contendSingle?.os === "android" ? <AndroidIcon /> : <AppleIcon />}
              <Box>
                <p className={cls.smallText}>Смартфон </p>
                <p className={cls.bigTitle}>{contendSingle?.os}</p>
              </Box>
            </Flex>
       
          </Flex>
          <Flex mt={3}  alignItems={"flex-start"} rowGap={'15px'}  flexDirection={'column'}>
          <Flex alignItems={"center"} gap={2}>
            { contendSingle?.battery > 20 ?   <BatareyFullIcon /> :  <BatareyIcon />}
              <Box>
                <p className={cls.smallText}>Батарея </p>
                <p className={cls.bigTitle}>{contendSingle?.batter}%</p>
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
        <Box className={cls.cardWrap}>
          <Flex gap={2}>
            <div className={cls.startAIconWrap}><div  className={cls.startAIcon}>A</div> <div className={cls.line}></div> </div>
            <Box>
              <p className={cls.cardStartTitle}>{contendSingle?.location_name || "Нет адреса"}</p>
              <p className={cls.cardStartSubTitle}>
                 {format(contendSingle?.update_time,"yyyy-mm-dd")}
              </p>
            </Box>
          </Flex>
         
          <Flex mt={5} gap={2}>
            <div className={cls.startBIcon}>B</div>
            {
              addressAdd ?    <Box>
              <p className={cls.cardStartTitle}>{`${addressAdd?.address.slice(0,17)}...`}</p>
              <p className={cls.cardStartSubTitle}>
               
                {/* RUS / <span>18 августа</span> */}
              </p>
            </Box> :    
            <Box onClick={() => {
              setStateMap(true)
              handleOpenModal()
            }} >
              <p className={cls.cardStartTitleAdd}>  Добавить адрес</p>
            </Box>
            }
        
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
                      <StoneIcon /> 22 т.
                    </Flex>
                    <Flex gap={1} alignItems={"center"}>
                      <LoadOulineIcon /> 86m3
                    </Flex>
                  </Flex>
                </Flex>
              </p>
            </Box>
          </Flex>
      
        </Box>
        <Button onClick={() => {setCenterModalType("changeIcon");setIconStatus(contendSingle?.users_id_data?.provisions?.[0])}} leftIcon={<QuestionBlueIcon />} rightIcon={<NextBtnIcon />} size={`lg`} className={cls.btnBlueOutline}>
            Занята чужим грузом
        </Button>
        {/* <Box className={cls.cardWrap}>
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
