import { Container } from "@/components/Container";
import { Box, Button, Heading } from "@chakra-ui/react";
import { LoadsCard } from "./components/LoadsCard";
import { useMyLoadsMainProps } from "./useMyLoadsMainProps";
import { TopFilter } from "@/components/TopFilter";
import { filterTabs } from "./data";
import { useTranslation } from "@/app/i18n/client";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useGetLang } from "@/hooks/useGetLang";

export const MyLoadsMain = () => {

  const {
    cargos,
    onFilterChange,
    handleDelete,
    orderStatus,
    handleAccept,
    handleCancel,
    isFetching,
    ref,
    hasMore,
    handleLoadMore
  } = useMyLoadsMainProps();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return (
    <Box py="40px">
      <Container>
        <Heading size="md" mb="24px">
          {t("Мои грузы")}
        </Heading>
        <TopFilter onChange={onFilterChange} filterList={filterTabs} />
        <Box display="flex" flexDirection="column" rowGap="16px">
          {/* {cargos?.length ? ( */}
          {cargos?.map((cargo, index) => {
            if(index === cargos.length -1) {
              return (
                <LoadsCard
                  ref={ref}
                  key={cargo?.guid}
                  orderStatus={orderStatus}
                  handleDelete={handleDelete}
                  handleAccept={handleAccept}
                  handleCancel={handleCancel}
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
                  {...cargo}
                />
              );
            }
          })}
          {/* <Button onClick={handleLoadMore} isDisabled={!hasMore}>Load more</Button> */}
          {/* ) : (
            <Heading size="sm" textAlign="center">
              {t("Ничего не найдено")}
            </Heading>
          )} */}
          {/* {
            isFetching && <LoadingSpinner />
          } */}
        </Box>
      </Container>
    </Box>
  );
};
