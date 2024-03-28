import { Container } from "@/components/Container";
import { Box, Heading } from "@chakra-ui/react";
import { LoadsCard } from "./components/LoadsCard";
import { useMyLoadsMainProps } from "./useMyLoadsMainProps";
import { TopFilter } from "@/components/TopFilter";
import { filterTabs } from "./data";
import { useTranslation } from "@/app/i18n/client";
import localeStore from "@/store/locale.store";

export const MyLoadsMain = () => {

  const {
    cargos,
    onFilterChange,
    handleDelete,
    orderStatus,
    handleAccept,
    handleCancel,
  } = useMyLoadsMainProps();

  const { t } = useTranslation(localeStore.locale, "translations");

  return (
    <Box py="40px">
      <Container>
        <Heading size="md" mb="24px">
          {t("Мои грузы")}
        </Heading>
        <TopFilter onChange={onFilterChange} filterList={filterTabs} />
        <Box display="flex" flexDirection="column" rowGap="16px">
          {cargos?.length ? (
            cargos?.map((cargo) => (
              <LoadsCard
                key={cargo.guid}
                orderStatus={orderStatus}
                handleDelete={handleDelete}
                handleAccept={handleAccept}
                handleCancel={handleCancel}
                {...cargo}
              />
            ))
          ) : (
            <Heading size="sm" textAlign="center">
              {t("Ничего не найдено")}
            </Heading>
          )}
        </Box>
      </Container>
    </Box>
  );
};
