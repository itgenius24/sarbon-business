import { Container } from "@/components/Container";
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { LoadsCard } from "./components/LoadsCard";
import { useMyLoadsMainProps } from "./useMyLoadsMainProps";
import { TopFilter } from "@/components/TopFilter";
import { filterTabsDis, filterTabsZ } from "./data";
import { useTranslation } from "@/app/i18n/client";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Empty } from "./components/Empty";
import { Performed } from "./components/Performed";
import authStore from "@/store/auth.store";
import { useState } from "react";
import {
  ExelIcon,
  IconCeckNewStatusIcon,
  LocationIconStep,
  LocationMarkIcon,
  NavigationBtnLeftIcon,
  SearchIcon,
  StarGoodsIcon,
  StarOutlineIcon,
} from "@/assets/icons/icons";
import { CheckboxComment } from "./components/CheckboxComment";
import styles from "./style.module.scss";
import { CustomTextarea } from "@/components/CustomTextarea";
import { CheckboxModalPred } from "@/components/CheckboxModalPred/CheckboxModalPred";
import { TextFieldWithAdditionMap } from "@/components/TextFieldWithAddition/TextFieldWithAdditionMap";
import { TextField } from "@/components/TextField";
import { NewPage } from "./components/NewPage/NewPage";
import { ApproveFromDriver } from "./components/ApproveFromDriver/ApproveFromDriver";
import { PerfomedPage } from "./components/PerfomedPage/PerfomedPage";
import { InModerationPage } from "./components/InModerationPage/InModerationPage";
import { InActivePage } from "./components/InActivePage/InActivePage";
import { AllPage } from "./components/AllPage/AllPage";
import { ArchivePage } from "./components/ArchivePage/ArchivePage";
import { CancellationPage } from "./components/CancellationPage/CancellationPage";
import { ActivePage } from "./components/ActivePage/ActivePage";

export const MyLoadsMain = ({ locale }) => {
  const {
    onFilterChange,
    driverCount,
    noDataDisCount,
    waitingDriverCount,
    isLoadingExe,
    getExcelFileFn,
    open,
    setOpen,
    goodComment,
    badComment,
    register,
    watch,
    setValue,
    handleCheckboxChange,
    comments,
    selectedRating,
    hoverRating,
    isLargerThan768,
    t,
    guid,
    full_name,
    results,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    setResults,
    address,
    setAddress,
    onSubmit,
    hanleAdress,
    index,
    tabButtons,
    router,
    refetchNewPred,
    refetchNoDisPred,
    setNotificationId,
    notificationID,
    refetchWaitingDriverCount,
    orderStatus,
  } = useMyLoadsMainProps(locale);

  const role_id = authStore.userData.role_id;

  console.log("comments", comments);

  return (
    <Box px={"20px"} py="24px">
      <Container maxW={`1544px`}>
        {guid && (
          <Button
            leftIcon={<NavigationBtnLeftIcon />}
            borderRadius={`4px`}
            border={`none`}
            variant={`outline`}
            background={`rgba(227, 230, 237, 1)`}
            color={`var(--primary-text)`}
            mb={`26px`}
            width={`fit-content`}
            onClick={() => {
              router.push(`/${locale}/dashboard`);
              // (window.location.href = `${
              //   window.location.origin
              // }/${`${locale}/my-loads`}`)
            }}
          >
            {t(`Назад`)}
          </Button>
        )}
        <Flex alignItems={`center`} justifyContent={`space-between`}>
          <Heading
            fontSize={isLargerThan768 ? "30px" : "22px"}
            size="md"
            mb="24px"
            color={`var(--primary-text)`}
          >
            {guid ? full_name : t("Мои грузы")}
          </Heading>
          {role_id === "48871d27-7361-4f69-8fe4-b54daf270739" && (
            <Box position={`relative`}>
              <Button
                isLoading={isLoadingExe}
                onClick={getExcelFileFn}
                // isDisabled={true}
                style={{
                  background: `rgba(255, 255, 255, 1)`,
                  color: `black`,
                  border: `1px solid rgba(0, 122, 255, 1)`,
                }}
                leftIcon={<ExelIcon />}
              >
                Экспорт в Excel
              </Button>
            </Box>
          )}
        </Flex>

        {role_id === `48871d27-7361-4f69-8fe4-b54daf270739` && (
          <Box width={`40%`} mb={`20px`} className={styles.locationWrap}>
            <TextField
              label={``}
              addonBefore={<SearchIcon />}
              placeholder={t("Укажите пункт назначения")}
              additionalItemTheme={`light`}
              register={register}
              onChange={(e) => {
                setAddress(e.target.value);
                if (e.target.value.length === 0) {
                  setValue(`from`, ``);
                }
              }}
              name={`from`}
              additionalItemPlaceholder={
                <span className={styles.additionalIcons}>
                  <LocationMarkIcon />
                </span>
              }
            />
            {results.length > 0 && address?.length > 0 && (
              <Box className={styles.optionsWrap}>
                {results?.map((location, idx) => {
                  const text = location?.GeoObject?.name || "";

                  const highlightText = (text, search) => {
                    if (!search) return text;
                    const regex = new RegExp(`(${search})`, "gi");
                    return text.replace(
                      regex,
                      `<span class="${styles.bold}">$1</span>`
                    );
                  };
                  return (
                    <Flex
                      onClick={() => hanleAdress(location, `from`, "loading")}
                      key={idx}
                      gap={3}
                      alignItems={"center"}
                    >
                      <p
                        className={styles.item}
                        dangerouslySetInnerHTML={{
                          __html: highlightText(text, address),
                        }}
                      />{" "}
                    </Flex>
                  );
                })}
              </Box>
            )}
          </Box>
        )}

        <Tabs
          isLazy
          onChange={(index) => onFilterChange(index)}
          defaultIndex={index * 1}
          variant="unstyled"
        >
          <TabList background={`#F2F3F5`} justifyContent={`space-between`}>
            {tabButtons?.map((item) => (
              <Tab
                className={styles.tab}
                _selected={{ background: `#FFFFFF` }}
                key={item.value}
              >
                {t(item.label)}
                {item.value === "new" && driverCount && (
                  <div className={styles.count}>{driverCount}</div>
                )}
                {item.value === "approve_from_driver" &&
                  waitingDriverCount > 0 && (
                    <div className={styles.count}>{waitingDriverCount}</div>
                  )}
                {item.value === "no_dispatcher" && noDataDisCount > 0 && (
                  <div className={styles.count}>{noDataDisCount}</div>
                )}
              </Tab>
            ))}
          </TabList>
          {role_id === `785678f2-fae7-4a00-8766-99ea67d3784f` || guid ? (
            <TabPanels padding={`24px 0`}>
              <TabPanel padding={0}>
                <NewPage
                  refetchNoDisPred={refetchNoDisPred}
                  refetchWaitingDriverCount={refetchWaitingDriverCount}
                  refetchNewPred={refetchNewPred}
                  t={t}
                  orderStatus={`no_dispatcher`}
                  setNotificationId={setNotificationId}
                  notificationID={notificationID}
                  locale={locale}
                />
              </TabPanel>
              <TabPanel padding={0}>
                <NewPage
                  refetchNoDisPred={refetchNoDisPred}
                  refetchWaitingDriverCount={refetchWaitingDriverCount}
                  refetchNewPred={refetchNewPred}
                  t={t}
                  orderStatus={`new`}
                  notificationID={notificationID}
                  locale={locale}
                />
              </TabPanel>
              <TabPanel padding={0}>
                <ApproveFromDriver
                  locale={locale}
                  t={t}
                  orderStatus={`approve_from_driver`}
                />
              </TabPanel>
              <TabPanel padding={0}>
                <PerfomedPage t={t} orderStatus={`performed`} locale={locale} />
              </TabPanel>
              <TabPanel padding={0}>
                <CancellationPage locale={locale} t={t} orderStatus={`cancellation`} />
              </TabPanel>
              <TabPanel padding={0}>
                <ArchivePage setOpen={setOpen} t={t} orderStatus={`archive`} />
              </TabPanel>
            </TabPanels>
          ) : (
            <TabPanels padding={`24px 0`}>
              <TabPanel padding={0}>
                <AllPage
                  locale={locale}
                  address={address}
                  search={watch(`from`)}
                  t={t}
                  orderStatus={``}
                />
              </TabPanel>
              <TabPanel padding={0}>
                <ActivePage
                  t={t}
                  address={address}
                  search={watch(`from`)}
                  orderStatus={`active`}
                  locale={locale}
                />
              </TabPanel>
              <TabPanel padding={0}>
                <InModerationPage
                  locale={locale}
                  t={t}
                  orderStatus={`in_moderation`}
                />
              </TabPanel>
              <TabPanel padding={0}>
                <PerfomedPage t={t} orderStatus={`performed`} locale={locale} />
              </TabPanel>
              <TabPanel padding={0}>
                <ArchivePage
                  setOpen={setOpen}
                  t={t}
                  orderStatus={`archive`}
                  locale={locale}
                />
              </TabPanel>
              <TabPanel padding={0}>
                <InActivePage t={t} orderStatus={`in_active`} locale={locale} />
              </TabPanel>
            </TabPanels>
          )}
        </Tabs>
      </Container>

      <Modal size={`xl`} isOpen={open} onClose={() => setOpen(null)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Оцените водителя</ModalHeader>
          <ModalCloseButton onClose={() => setOpen(null)} />
          <ModalBody>
            <Box width={`100%`} display={`flex`} justifyContent={`center`}>
              <Flex gap={`24px`} alignItems={`center`}>
                {[1, 2, 3, 4, 5].map((item) => {
                  return (
                    <div
                      onMouseEnter={() => handleMouseEnter(item)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleClick(item)}
                      key={item}
                    >
                      {" "}
                      {item <= (hoverRating || selectedRating) ? (
                        <StarGoodsIcon />
                      ) : (
                        <StarOutlineIcon />
                      )}{" "}
                    </div>
                  );
                })}
              </Flex>
            </Box>
            <Box mt={`30px`}>
              <Heading fontSize={`20px`}>С чем вы остались недовольны?</Heading>
              <Flex flexDirection={`column`}>
                {(selectedRating > 3 || selectedRating === 0) &&
                  goodComment.map((item) => {
                    return (
                      <CheckboxComment
                        defaultChecked={comments.includes(item.key)}
                        onChange={() => handleCheckboxChange(item.key)}
                        key={item.key}
                        isForm={false}
                      >
                        {item.label}
                      </CheckboxComment>
                    );
                  })}

                {selectedRating <= 3 &&
                  selectedRating >= 1 &&
                  badComment.map((item) => {
                    return (
                      <CheckboxComment
                        defaultChecked={comments.includes(item.key)}
                        onChange={() => handleCheckboxChange(item.key)}
                        key={item.key}
                        isForm={false}
                      >
                        {item.label}
                      </CheckboxComment>
                    );
                  })}
              </Flex>
            </Box>
            <Box mt={`24px`}>
              <Heading fontSize={`18px`} lineHeight={`30px`} fontWeight={400}>
                Комментарий
              </Heading>
              <CustomTextarea
                textLimit={200}
                watch={watch}
                register={register}
                name={`comment`}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button width={`100%`} mr={3} onClick={() => onSubmit()}>
              Готово
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
