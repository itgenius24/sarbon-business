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

const ProfileDispatcher = () => {
  const { status, t, tab, setTabs, columns } = useProfileDis();

  return (
    <Container my="40px">
      <Flex
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        h={`122px`}
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
                  <p className={cls.statisRes}>
                    <SlotCounter value={`31`} />
                  </p>
                </Box>
                <Box pl={`20px`}>
                  <p className={cls.statisName}>Cумма заказов (UZS) </p>
                  <p className={cls.statisRes}>
                    {" "}
                    <SlotCounter value={`424,056,0001`} />
                  </p>
                </Box>
              </Flex>
            </Box>
          
        </Flex>
      </Flex>

      <Tabs variant={`unstyled`}>
        <Flex width={`100%`} gap={`40px`} mt={`40px`}>
          <TabList className={cls.tab}>
            {filterTabstopDis.map((item) => (
              <Tab
                onClick={() => setTabs(item.value)}
                className={tab === item.value ? cls.activeBtn : cls.tabBtn}
                key={item.value}
              >
                {item.label}
              </Tab>
            ))}
          </TabList>

          <TabPanels width={`70%`}>
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
            <DriversDispachers/>
            </TabPanel>
          </TabPanels>
        </Flex>
      </Tabs>

      {/* <Flex width={`100%`} gap={`40px`} mt={`40px`}>
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
          <SarbonTable
            variant="card"
            width="100%"
            data={[1, 2, 3]}
            columns={columns}
          />
        </Box>
      </Flex> */}
    </Container>
  );
};

export default ProfileDispatcher;
