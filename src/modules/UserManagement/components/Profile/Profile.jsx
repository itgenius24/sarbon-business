import { Box, Flex, Heading, Tooltip } from "@chakra-ui/react";
import React from "react";
import cls from "./style.module.scss";
import Image from "next/image";
import StatusComponent from "../StatusComponent/StatusComponent";
import StarRating from "../StarRating/StarRating";
import { flegCountry } from "@/utils/flegCountry";
import {
  LoadOulineIcon,
  ProfileIconDriverBig,
  ProfileIconXMBig,
  StoneIcon,
} from "@/assets/icons/icons";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

const Profile = ({
  type = ``,
  vehicles_data_size,
  driver_size,
  data,
  reliabilitiy,
  time,
  rating,
  rev_count,
  userData,
  locale
}) => {
  const typeUser = {
    ["legal_owner"]: `Юр. лицо`,
    [`physic_owner`]: `Физ. лицо`,
  };
  return (
    <Box className={cls.box}>
      <Heading fontSize="20px">
        Данные {type === `driver` ? `водителя` : `перевозчика`}{" "}
      </Heading>
     <Flex>
     <Flex gap={`50px`} mt={`20px`}>
        <Flex flexDirection={`column`} rowGap={`16px`}>
          {(data?.logo || userData?.photo )? (
            <Image
              width={300}
              height={300}
              alt={`lo`}
              src={type === `driver` ? userData?.photo : data?.logo || ``}
              className={type === `driver` ? cls.radiusImg : cls.image}
            />
          ) : type === `driver` ? (
            <ProfileIconDriverBig />
          ) : (
            <ProfileIconXMBig />
          )}

          {
           ( userData?.reliabilitiy?.status?.[0] ||  reliabilitiy) &&   <StatusComponent
            status={
              type === `driver`
                ? userData?.reliabilitiy?.status?.[0]
                : reliabilitiy
            }
            date={
              type === `driver` ? userData?.reliabilitiy?.create_time : time
            }
          />
          }

        
          <StarRating
            rating={
              type === `driver` ? userData?.reviews_count : rev_count || 0
            }
            comment={type === `driver` ? userData?.rating : rating ? rating : 0}
          />
        </Flex>

        {type === `driver` ? (
          <Flex flexDirection={`column`} rowGap={`27px`}>
            <Box>
              <p className={cls.label}>Имя</p>
              <p className={cls.name}>{userData?.full_name}</p>
            </Box>
            <Box>
              <p className={cls.label}>Водит. удостоверения</p>
              <p className={cls.name}>CD 1234567</p>
            </Box>
            <Box>
              <p className={cls.label}>Номер телефона</p>
              <a href={`https://t.me/${userData?.phone}`} className={cls.nameLink}>
               {formatPhoneNumber(userData?.phone)}
              </a>
            </Box>
            <Box>
              <p className={cls.label}>Машина</p>
              {
                userData?.trailer_type_id_data ?  <>
                <p className={cls.name}>{userData?.trailer_type_id_data?.[`name_${locale}`]}</p>
              <Flex alignItems={`center`} gap={`16px`} marginTop={`8px`}>
                <Flex gap={`10px`}>
                  <Flex gap={`3px`} alignItems={`center`}>
                    <StoneIcon /> <p className={cls.subTitle1}> {userData?.vehicle_data?.height}  т</p>
                  </Flex>
                  <Flex gap={`3px`} alignItems={`center`}>
                    <LoadOulineIcon /> <p className={cls.subTitle1}> {userData?.vehicle_data?.capacity} м3</p>
                  </Flex>
                </Flex>

                <Flex alignItems={`center`}>
                  <Tooltip
                    border={`1px solid rgba(219, 216, 227, 1)`}
                    background={`white`}
                    color={`black`}
                    placement="top-end"
                    label={`uz`}
                  >
                    <Image
                      alt="w"
                      style={{
                        width: `30px`,
                        height: `20px`,
                        marginRight: `9px`,
                      }}
                      width={100}
                      height={100}
                      src={flegCountry(userData?.vehicle_data?.car_country)}
                    />
                  </Tooltip>
                  <p className={cls.subTitle1}>{userData?.vehicle_data?.car_number}</p>
                </Flex>
              </Flex>
                </>:<p className={cls.noCar}>Без машины</p>
              }
            
            </Box>
          </Flex>
        ) : (
          <Flex flexDirection={`column`} rowGap={`27px`}>
            <Box>
              <p className={cls.label}>Полное наименование</p>
              <p className={cls.name}>{data?.company_name}</p>
            </Box>
            <Box>
              <p className={cls.label}>Имя руководителя</p>
              <p className={cls.name}> {data?.full_name}</p>
            </Box>
            <Box>
              <p className={cls.label}>Тип аккаунта</p>
              <p className={cls.name}>{typeUser[data?.tip_account?.[0]]}</p>
            </Box>
            <Box>
              <p className={cls.label}>ИНН Оргазинации</p>
              <p className={cls.nameLink}>{data?.tin}</p>
            </Box>
            <Box>
              <p className={cls.label}>Номер телефона</p>
              <a
                href={`https://t.me/${data?.phone_number}`}
                className={cls.nameLink}
              >
                {data?.phone_number}
              </a>
            </Box>
            <Box>
              <p className={cls.label}>Количество водителей</p>
              <p className={cls.nameLink}>{driver_size || 0}</p>
            </Box>
            <Box>
              <p className={cls.label}>Количество машин</p>
              <p className={cls.nameLink}>{vehicles_data_size || 0}</p>
            </Box>
          </Flex>
        )}
      </Flex>
      {/* <Box  className={cls.gpsWrap}>

        wssa
      </Box> */}
     </Flex>
    </Box>
  );
};

export default Profile;
