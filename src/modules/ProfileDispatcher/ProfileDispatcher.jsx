import { PlusIcon, UserDisIcon } from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import { Box, Button, Flex } from "@chakra-ui/react";
import Image from "next/image";
import cls from "./style.module.scss";
import React from "react";
import { useProfileDis } from "./useProfileDis";
import { filterTabstopDis } from "../MyLoadsMain/data";
import SarbonTable from "@/components/SarbonTable/SarbonTable";

const ProfileDispatcher = () => {
  const { status, t, tab, setTabs,columns } = useProfileDis();

  return (
    <Container my="40px">
      <Flex
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Flex gap={`19px`} alignItems={"center"}>
          {/* <Image
            style={{ width: `100px`, height: `100px`, borderRadius: `100%` }}
            width={150}
            height={150}
          /> */}
          <UserDisIcon />
          <Box>
            <Flex>
              <p className={cls.disTitle}>Диспетчер</p>
              <span className={cls.date}>Сегодня 12:36</span>
            </Flex>
            <p className={cls.disName}>Шорасулов Олим </p>
            <p className={cls.disSetting}>Настройки профиля</p>
          </Box>
        </Flex>
        <Flex>
          {tab === `driver` ? (
            <Flex gap={`28px`}>
              <Box className={cls.countrWrap}>
                <p>
                  {t(`Всего`)}: <span>36</span>
                </p>
                <p>
                  {t(`Свободных`)}:<span>36</span>
                </p>
              </Box>

              <Button width={"fit-content"} leftIcon={<PlusIcon />}>
                {t(`Добавить водителя`)}
              </Button>
            </Flex>
          ) : (
            <Box>
              <Flex
                gap={`16px`}
                alignItems={`center]`}
                justifyContent={`flex-end`}
              >
                <p className={cls.month}>Неделя</p>
                <p className={cls.month}>Месяц</p>
                <p className={cls.month}>Все время</p>
              </Flex>
              <Flex className={cls.statisWrap}>
                <Box
                  pr={`20px`}
                  borderRight={`1px solid rgba(219, 216, 227, 1)`}
                >
                  <p className={cls.statisName}>Завершенные</p>
                  <p className={cls.statisRes}>31</p>
                </Box>
                <Box pl={`20px`}>
                  <p className={cls.statisName}>Cумма заказов (UZS) </p>
                  <p className={cls.statisRes}>424,056,0001</p>
                </Box>
              </Flex>
            </Box>
          )}
        </Flex>
      </Flex>
      <Flex width={`100%`} gap={`40px`}  mt={`40px`}>
        <Box className={cls.tab}>
          {filterTabstopDis.map((item) => (
            <Button
              onClick={() => setTabs(item.value)}
              className={tab === item.value ? cls.activeBtn : cls.tabBtn}
              key={item.value}
            >
              {item.label}
            </Button>
          ))}
        </Box>
        <Box width={`80%`}>
        <SarbonTable  data={[1,2,3]} columns={columns} />
        </Box>
      </Flex>
    </Container>
  );
};

export default ProfileDispatcher;
