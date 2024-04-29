import { Container } from "@/components/Container";
import { Box, Button, Heading, useMediaQuery } from "@chakra-ui/react";
import { LoadsCard } from "./components/LoadsCard";
import { useMyLoadsMainProps } from "./useMyLoadsMainProps";
import { TopFilter } from "@/components/TopFilter";
import { filterTabs } from "./data";
import { useTranslation } from "@/app/i18n/client";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useGetLang } from "@/hooks/useGetLang";
import { Empty } from "./components/Empty";

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
  } = useMyLoadsMainProps();

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return (
    <Box px={"20px"} py="24px" >
      <Container >
        <Heading p={3} fontSize={isLargerThan768 ? "30px" : "22px"} size="md" mb="24px">
          {t("Мои грузы")}
        </Heading>
        <TopFilter
          driverCount={driverCount}
          waitingDriverCount={waitingDriverCount}
          onChange={onFilterChange}
          filterList={filterTabs}
        />
        <Box display="flex" flexDirection="column" rowGap="16px">
          {
            cargos?.length > 0 && cargos?.map((cargo, index) => {
              if(index === cargos.length -1) {
                return (
                  <LoadsCard
                    ref={ref}
                    key={cargo?.guid}
                    orderStatus={orderStatus}
                    handleDelete={handleDelete}
                    handleAccept={handleAccept}
                    handleCancel={handleCancel}
                    isLargerThan768={isLargerThan768}
                    {...cargo}
                  />
                );
              } else {
                return (
                  <LoadsCard
                    key={cargo?.guid}
                    orderStatus={orderStatus}
                    handleDelete={handleDelete}
                    handleAccept={handleAccept}
                    handleCancel={handleCancel}
                    isLargerThan768={isLargerThan768}
                    {...cargo}
                  />
                );
              }
            })
          }
          {
            (!cargos?.length && !isLoading) && <Empty t={t} />
          }
          {
            isLoading && <LoadingSpinner />
          }
        </Box>
      </Container>
    </Box>
  );
};
