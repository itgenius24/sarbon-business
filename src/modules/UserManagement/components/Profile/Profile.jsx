import { Box, Flex, Heading, Tooltip } from "@chakra-ui/react";
import React from "react";
import cls from "./style.module.scss";
import Image from "next/image";
import StatusComponent from "../StatusComponent/StatusComponent";
import StarRating from "../StarRating/StarRating";
import { flegCountry } from "@/utils/flegCountry";
import {
  BatareyDisabledIcon,
  BatareyFullIcon,
  BatareyIcon,
  FurDisabledIcon,
  FurIcon,
  LoadOulineIcon,
  LocationActiveIcon,
  LocationDisabledIcon,
  ProfileIconDriverBig,
  ProfileIconXMBig,
  StoneIcon,
} from "@/assets/icons/icons";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

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
  locale,
}) => {
  const router = useRouter();
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
            {data?.logo || userData?.photo ? (
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

            {(userData?.reliabilitiy?.status?.[0] || reliabilitiy) && (
              <StatusComponent
                status={
                  type === `driver`
                    ? userData?.reliabilitiy?.status?.[0]
                    : reliabilitiy
                }
                date={
                  type === `driver` ? userData?.reliabilitiy?.create_time : time
                }
              />
            )}

            <StarRating
              rating={
                type === `driver` ? userData?.rating || 0 : rev_count || 0
              }
              comment={
                type === `driver` ? userData?.reviews_count || 0 : rating ? rating : 0
              }
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
                <a
                  href={`https://t.me/${userData?.phone}`}
                  className={cls.nameLink}
                >
                  {formatPhoneNumber(userData?.phone)}
                </a>
              </Box>
              <Box>
                <p className={cls.label}>Машина</p>
                {userData?.trailer_type_id_data ? (
                  <>
                    <p className={cls.name}>
                      {userData?.trailer_type_id_data?.[`name_${locale}`] || userData?.trailer_type_id_data?.name}
                    </p>
                    <Flex alignItems={`center`} gap={`16px`} marginTop={`8px`}>
                      <Flex gap={`10px`}>
                        <Flex gap={`3px`} alignItems={`center`}>
                          <StoneIcon />{" "}
                          <p className={cls.subTitle1}>
                            {" "}
                            {userData?.vehicle_data?.capacity} т
                          </p>
                        </Flex>
                        <Flex gap={`3px`} alignItems={`center`}>
                          <LoadOulineIcon />{" "}
                          <p className={cls.subTitle1}>
                            {" "}
                            {userData?.vehicle_data?.height} м3
                          </p>
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
                            src={flegCountry(
                              userData?.vehicle_data?.car_country
                            )}
                          />
                        </Tooltip>
                        <p className={cls.subTitle1}>
                          {userData?.vehicle_data?.car_number}
                        </p>
                      </Flex>
                    </Flex>
                  </>
                ) : (
                  <p

                    className={cls.noCar}
                  >
                    Без машины. <span onClick={() =>
                      router.push(
                        `/${locale}/my-cars-dispatcher/add-car?driver_id=${
                          userData?.guid
                        }&firm_id=${
                          userData?.firm_id
                            ? userData?.firm_id
                            : 0
                        }&full_name=${userData?.full_name}&phone=${userData?.phone}`
                      )
                    } className={cls.addCar}>Добавить</span>
                  </p>
                )}
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
        {type === `driver` && (
          <Flex
            flexDirection={`column`}
            rowGap={`20px`}
            backgroundColor={
              userData?.order_data
                ? `rgba(235, 245, 255, 1)`
                : `rgba(21, 186, 77, 0.08)`
            }
            className={cls.gpsWrap}
          >
            {userData?.order_data ? (
              <p className={cls.gruzId}>
                Занята: <span>q23</span>
              </p>
            ) : (
              <p className={cls.freeStatus}>Свободна</p>
            )}
            <Flex gap={`3px`} alignItems={`center`}>
              {userData?.gps_data ? (
                <LocationActiveIcon />
              ) : (
                <LocationDisabledIcon />
              )}

              <Box>
                <p className={cls.text}>
                  {userData?.gps_data ? `Вкл` : `Выкл`}.{" "}
                  <span
                    className={userData?.gps_data ? cls.time : cls.timeDisabled}
                  >
                    {userData?.gps_data?.update_time ? (
                      format(userData?.gps_data?.update_time, `yyyy-MM-dd`)
                    ) : (
                      <>---</>
                    )}
                  </span>
                </p>
              </Box>
            </Flex>
            <Flex width={`100%`} justifyContent={`space-between`}>
              <Flex alignItems={`center`} gap={2}>
                <Flex gap={`5px`} alignItems={`center`}>
                  {userData?.gps_data ? <FurIcon /> : <FurDisabledIcon />}

                  <Box>
                    <p className={cls.title2}>
                      {userData?.gps_data?.version
                        ? userData?.gps_data?.version
                        : `---`}
                    </p>
                  </Box>
                </Flex>
              </Flex>
              <Flex alignItems={"center"} gap={2}>
                {userData?.gps_data ? (
                  userData?.gps_data?.battery > 20 ? (
                    <BatareyFullIcon />
                  ) : (
                    <BatareyIcon />
                  )
                ) : (
                  <BatareyDisabledIcon />
                )}
                <p className={cls.subTitle}>
                  <span className={cls.title}>
                    {userData?.gps_data
                      ? `${userData?.gps_data?.battery || 0} %`
                      : `---`}
                  </span>
                </p>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Profile;
