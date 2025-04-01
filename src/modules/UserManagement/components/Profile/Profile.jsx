import { Box, Flex, Heading, Tooltip } from "@chakra-ui/react";
import React from "react";
import cls from "./style.module.scss";
import Image from "next/image";
import StatusComponent from "../StatusComponent/StatusComponent";
import StarRating from "../StarRating/StarRating";
import { flegCountry } from "@/utils/flegCountry";
import { LoadOulineIcon, StoneIcon } from "@/assets/icons/icons";

const Profile = ({ type = `voditel` }) => {
  return (
    <Box className={cls.box}>
      <Heading fontSize="20px">
        Данные {type === `voditel` ? `водителя` : `перевозчика`}{" "}
      </Heading>
      <Flex gap={`50px`} mt={`20px`}>
        <Flex flexDirection={`column`} rowGap={`16px`}>
        {/* <ProfileIconDriverBig /> */}
          <Image
            width={300}
            height={300}
            alt={`lo`}
            src={`/images/avatar.png`}
            className={type === `voditel` ? cls.radiusImg : cls.image}
          />
          <StatusComponent status={`success`} date={new Date()} />
          <StarRating rating={3} />
        </Flex>

        {type === `voditel` ? (
          <Flex flexDirection={`column`} rowGap={`27px`}>
            <Box>
              <p className={cls.label}>Имя</p>
              <p className={cls.name}>Абдурахмонов Дилшод</p>
            </Box>
            <Box>
              <p className={cls.label}>Водит. удостоверения</p>
              <p className={cls.name}>CD 1234567</p>
            </Box>
            <Box>
              <p className={cls.label}>Номер телефона</p>
              <a href={`https://t.me/998930776161`} className={cls.nameLink}>
                +998 93 0776161
              </a>
            </Box>
            <Box>
              <p className={cls.label}>Машина</p>
              <p className={cls.name}>Тентованный полуприцеп</p>

              <Flex alignItems={`center`} gap={`16px`} marginTop={`8px`}>
                <Flex gap={`10px`}>
                  <Flex gap={`3px`} alignItems={`center`}>
                    <StoneIcon /> <p className={cls.subTitle1}> 20 т</p>
                  </Flex>
                  <Flex gap={`3px`} alignItems={`center`}>
                    <LoadOulineIcon /> <p className={cls.subTitle1}> 20 м3</p>
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
                      src={flegCountry(`uz`)}
                    />
                  </Tooltip>
                  <p className={cls.subTitle1}>01 A 123 NN</p>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        ) : (
          <Flex flexDirection={`column`} rowGap={`27px`}>
            <Box>
              <p className={cls.label}>Полное наименование</p>
              <p className={cls.name}>
                Uztrans Logistics Group Mas`uliyati cheklangan jamiyat
              </p>
            </Box>
            <Box>
              <p className={cls.label}>Имя руководителя</p>
              <p className={cls.name}>Абдурахмонов Дилшод</p>
            </Box>
            <Box>
              <p className={cls.label}>Тип аккаунта</p>
              <p className={cls.name}>Юридическое лицо</p>
            </Box>
            <Box>
              <p className={cls.label}>ИНН Оргазинации</p>
              <p className={cls.nameLink}>304299004</p>
            </Box>
            <Box>
              <p className={cls.label}>Номер телефона</p>
              <a href={`https://t.me/998930776161`} className={cls.nameLink}>
                +998 93 0776161
              </a>
            </Box>
            <Box>
              <p className={cls.label}>Количество водителей</p>
              <p className={cls.nameLink}>31</p>
            </Box>
            <Box>
              <p className={cls.label}>Количество машин</p>
              <p className={cls.nameLink}>40</p>
            </Box>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Profile;
