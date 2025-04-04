"use client";
import { Container } from "@/components/Container";
import {
  Box,
  Button,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import SlotCounter from "react-slot-counter";
import cls from "./style.module.scss";
import React from "react";
import { useProps } from "./useProps";
import { NavigationBtnLeftIcon } from "@/assets/icons/icons";
import Notes from "./components/Notes/Notes";
import Profile from "./components/Profile/Profile";

const UserManagement = ({ locale }) => {
  const {
    t,
    tab,
    setTabs,
    filterTabs,
    vehicles_data_size,
    driver_size,
    firmData,
    router,
    reliabilitiy,
    time,
    rating,
    rev_count,
    user_type
  } = useProps();



  return (
    <Container my="15px">
      <Flex
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Button
            leftIcon={<NavigationBtnLeftIcon />}
            borderRadius={`4px`}
            border={`none`}
            variant={`outline`}
            background={`rgba(227, 230, 237, 1)`}
            color={`var(--primary-text)`}
            mb={`10px`}
            width={`fit-content`}
            fontSize={`12px`}
            height={`35px`}
            onClick={() => {
              router.back();
            }}
          >
            {t(`Вернутся в список`)}
          </Button>

          <Heading fontSize="30px">{firmData?.response?.company_name}</Heading>
        </Box>

        {user_type === `expeditor` && (
          <Flex className={cls.statisWrap}>
            <Box pr={`20px`} borderRight={`1px solid rgba(219, 216, 227, 1)`}>
              <p className={cls.statisName}>Водители</p>
              <p className={cls.statisRes}>
                <SlotCounter value={driver_size || 0} />
              </p>
            </Box>
            <Box pl={`20px`}>
              <p className={cls.statisName}>Машины </p>
              <p className={cls.statisRes}>
                <SlotCounter value={vehicles_data_size || 0} />
              </p>
            </Box>
          </Flex>
        )}
      </Flex>

      <Tabs isLazy defaultIndex={0} variant={`unstyled`}>
        <Flex width={`100%`} gap={`40px`} mt={`20px`}>
          <TabList className={cls.tab}>
            {filterTabs.map((item) => (
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
              <Profile
                type={user_type}
                vehicles_data_size={vehicles_data_size}
                driver_size={driver_size}
                data={firmData?.response}
                reliabilitiy={reliabilitiy}
                rev_count={rev_count}
                time={time}
                rating={rating}
              />
            </TabPanel>
            <TabPanel padding={0}>
              <Notes />
            </TabPanel>
          </TabPanels>
        </Flex>
      </Tabs>
    </Container>
  );
};

export default UserManagement;
