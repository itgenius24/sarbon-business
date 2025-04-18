import { PlusIcon, UserDisIcon } from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import SlotCounter from "react-slot-counter";
import cls from "./style.module.scss";
import React from "react";
import { useProfileDis } from "./useProfileDis";
import { filterTabstopDis } from "../MyLoadsMain/data";
import SarbonTable from "@/components/SarbonTable/SarbonTable";
import { NewPage } from "../MyLoadsMain/components/NewPage/NewPage";
import { ApproveFromDriver } from "../MyLoadsMain/components/ApproveFromDriver/ApproveFromDriver";
import { PerfomedPage } from "../MyLoadsMain/components/PerfomedPage/PerfomedPage";
import { CancellationPage } from "../MyLoadsMain/components/CancellationPage/CancellationPage";
import { ArchivePage } from "../MyLoadsMain/components/ArchivePage/ArchivePage";
import DriversDispachers from "./components/Drivers/Drivers";
import Image from "next/image";
import { format } from "date-fns";
import { formatDateTime } from "@/utils/formatDateTime";

const ProfileDispatcher = ({ locale }) => {
  const {
    status,
    t,
    tab,
    setTabs,
    columns,
    router,
    guid,
    userData,
    date,
    setDateType,
    dateType,
    data,
  } = useProfileDis();

  return (
    <Container my="40px">
      <Flex
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        h={`122px`}
      >
        <Flex gap={`19px`} alignItems={"center"}>
          {userData?.photo ? (
            <Image
              style={{ width: `100px`, height: `100px`, borderRadius: `100%` }}
              src={
                userData?.photo
                  ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${
                      userData?.photo || ""
                    }`
                  : "/images/avatar.png"
              }
              width={150}
              height={150}
            />
          ) : (
            <UserDisIcon />
          )}

          <Box>
            <Flex>
              <p className={cls.disTitle}>Диспетчер</p>
              <span className={cls.date}>
                {date ? formatDateTime(date) : ``}
              </span>
            </Flex>
            <p className={cls.disName}>{userData?.full_name} </p>
            <p
              onClick={() =>
                router.push(`/${locale}/dispatcher/create?id=${guid}`)
              }
              className={cls.disSetting}
            >
              Настройки профиля
            </p>
          </Box>
        </Flex>
        <Flex>
          <Box>
            <Flex
              gap={`16px`}
              alignItems={`center]`}
              justifyContent={`flex-end`}
            >
              <p
                className={dateType === `weekly` ? cls.activeMonth : cls.month}
                onClick={() => setDateType(`weekly`)}
              >
                Неделя
              </p>
              <p
                className={dateType === `monthly` ? cls.activeMonth : cls.month}
                onClick={() => setDateType(`monthly`)}
              >
                Месяц
              </p>
              <p
                className={dateType === `clear` ? cls.activeMonth : cls.month}
                onClick={() => setDateType(`clear`)}
              >
                Все время
              </p>
            </Flex>
            <Flex className={cls.statisWrap}>
              <Box pr={`20px`} borderRight={`1px solid rgba(219, 216, 227, 1)`}>
                <p className={cls.statisName}>Завершенные</p>
                <p className={cls.statisRes}>
                  <SlotCounter value={data?.archive?.[0]?.total_count || 0} />
                </p>
              </Box>
              <Box pl={`20px`}>
                <p className={cls.statisName}>Cумма заказов (UZS) </p>
                <p className={cls.statisRes}>
                  {" "}
                  <SlotCounter value={`0`} />
                </p>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Flex>

      <Tabs isLazy variant={`unstyled`}>
        <Flex width={`100%`} gap={`40px`} mt={`40px`}>
          <TabList className={cls.tab}>
            {filterTabstopDis.map((item) => (
              <Tab
                onClick={() => setTabs(item.value)}
                _selected={{
                  backgroundColor: `white !important`,
                  color: `rgba(38, 189, 73, 1) !important`,
                  boxShadow: `0px 0px 2px 0px rgba(0, 0, 0, 0.04) !important`,
                }}
                className={cls.tabBtn}
                key={item.value}
              >
                {item.label}
              </Tab>
            ))}
          </TabList>

          <TabPanels minHeight={`600px`} width={`70%`}>
            <TabPanel padding={0}>
              <NewPage t={t} orderStatus={`new`} />
            </TabPanel>
            <TabPanel padding={0}>
              <ApproveFromDriver t={t} orderStatus={`approve_from_driver`} />
            </TabPanel>
            <TabPanel padding={0}>
              <PerfomedPage t={t} orderStatus={`performed`} />
            </TabPanel>
            <TabPanel padding={0}>
              <CancellationPage t={t} orderStatus={`cancellation`} />
            </TabPanel>
            <TabPanel padding={0}>
              <ArchivePage t={t} orderStatus={`archive`} />
            </TabPanel>
            <TabPanel padding={0}>
              <DriversDispachers />
            </TabPanel>
          </TabPanels>
        </Flex>
      </Tabs>
    </Container>
  );
};

export default ProfileDispatcher;
