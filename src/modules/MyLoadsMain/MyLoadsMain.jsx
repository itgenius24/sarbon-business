import { Container } from "@/components/Container";
import { Box, Button, Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import { LoadsCard } from "./components/LoadsCard";
import { useMyLoadsMainProps } from "./useMyLoadsMainProps";
import { TopFilter } from "@/components/TopFilter";
import { filterTabsDis, filterTabsZ } from "./data";
import { useTranslation } from "@/app/i18n/client";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useGetLang } from "@/hooks/useGetLang";
import { Empty } from "./components/Empty";
import { Performed } from "./components/Performed";
import authStore from "@/store/auth.store";
import { useState } from "react";
import { ExelIcon } from "@/assets/icons/icons";

export const MyLoadsMain = () => {
  const {
    cargos,
    onFilterChange,
    handleDelete,
    orderStatus,
    handleAccept,
    handleCancel,
    ref,
    isLoading,
    driverCount,
    waitingDriverCount,
    setDataPred,
    dataPred,
  } = useMyLoadsMainProps();
  const role_id = authStore.userData.role_id;
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const [disabled, setDisabled] = useState(false);

  return (
    <Box px={"20px"} py="24px">
      <Container>
        <Flex alignItems={`center`} justifyContent={`space-between`}>
          <Heading
            p={3}
            fontSize={isLargerThan768 ? "30px" : "22px"}
            size="md"
            mb="24px"
          >
            {t("Мои грузы")}
          </Heading>
          {
            role_id === "48871d27-7361-4f69-8fe4-b54daf270739"
          }
            <Box position={`relative`}>
               <span style={{
                position:`absolute`,
                top:`-10px`,
                zIndex:`111`,
                fontSize:`9px`,
                fontWeight:700,
                padding:`0px 10px`,
                borderRadius:`11px`,
                background:`red`,
                color:`white`,
                right:10
               }}>
                  СКОРО
               </span>
               <Button isDisabled style={{background:`rgba(255, 255, 255, 1)`,color:`black`,border:`1px solid rgba(0, 122, 255, 1)`}} leftIcon={<ExelIcon />}>
                 Экспорт в Excel
               </Button>
            </Box>
        </Flex>
        <TopFilter
          driverCount={driverCount}
          waitingDriverCount={waitingDriverCount}
          onChange={onFilterChange}
          filterList={
            role_id === `785678f2-fae7-4a00-8766-99ea67d3784f`
              ? filterTabsDis
              : filterTabsZ
          }
        />
        <Box display="flex" flexDirection="column" rowGap="16px">
          {orderStatus == "performed" ||
          orderStatus == "new" ||
          orderStatus == "approve_from_driver" ||
          orderStatus == "cancellation" ||
          orderStatus == "new" ||
          orderStatus == "archive" ? (
            <>
              {cargos?.length > 0 &&
                cargos?.map((cargo, index) => {
                  return (
                    <Performed
                      orderStatus={orderStatus}
                      key={index}
                      handleAccept={handleAccept}
                      handleCancel={handleCancel}
                      cargo={cargo}
                      setDisabled={setDisabled}
                      disabled={disabled}
                      setDataPred={setDataPred}
                      dataPred={dataPred}
                    />
                  );
                })}
            </>
          ) : (
            cargos?.length > 0 &&
            cargos?.map((cargo, index) => {
              if (index === cargos.length - 1) {
                return (
                  <LoadsCard
                    ref={ref}
                    key={cargo?.guid}
                    orderStatus={orderStatus}
                    handleDelete={handleDelete}
                    handleAccept={handleAccept}
                    handleCancel={handleCancel}
                    isLargerThan768={isLargerThan768}
                    cargo={cargo}
                  />
                );
              } else {
                return (
                  <LoadsCard
                    // ref={ref}
                    key={cargo?.guid}
                    orderStatus={orderStatus}
                    handleDelete={handleDelete}
                    handleAccept={handleAccept}
                    handleCancel={handleCancel}
                    isLargerThan768={isLargerThan768}
                    // {...cargo}
                    cargo={cargo}
                  />
                );
              }
            })
          )}
          {!cargos?.length && !isLoading && <Empty t={t} />}
          {isLoading && <LoadingSpinner />}
        </Box>
      </Container>
    </Box>
  );
};
