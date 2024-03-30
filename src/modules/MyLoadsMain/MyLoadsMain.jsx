import { Container } from "@/components/Container";
import { Box, Heading } from "@chakra-ui/react";
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
    ref
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
            if(cargos.length === index + 1) {
              return <div key={cargo.guid} ref={ref}>
                <LoadsCard
                  orderStatus={orderStatus}
                  handleDelete={handleDelete}
                  handleAccept={handleAccept}
                  handleCancel={handleCancel}
                  {...cargo}
                />
              </div>;
            } else {
              return <div key={cargo.guid}>
                <LoadsCard
                  orderStatus={orderStatus}
                  handleDelete={handleDelete}
                  handleAccept={handleAccept}
                  handleCancel={handleCancel}
                  {...cargo}
                />
              </div>;
            }
          })}
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
