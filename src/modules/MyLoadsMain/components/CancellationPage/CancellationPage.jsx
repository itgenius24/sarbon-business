import { Box, Button } from "@chakra-ui/react";

import cls from "./style.module.scss";
import { Performed } from "../Performed";

import { Empty } from "../Empty";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import useProps from "./useProps";
import { Popup } from "@/components/Popup";
import SarbonTable from "@/components/SarbonTable/SarbonTable";

export const CancellationPage = ({ orderStatus, t, locale,isProfile }) => {
  const {
    cargoData,
    isLoading,
    addPage,
    isFetching,
    isDeletePopupOpen,
    setIsDeletePopupOpen,
    onDeleteAccept,
    columns
  } = useProps(orderStatus, t, locale);

  return (
    <>
      <Box>
        {cargoData?.length > 0 && !isProfile && (
          <SarbonTable
            width="100%"
            variant="card"
            columns={columns}
            data={cargoData}
          />
        )}

        {cargoData?.length > 0 &&
          isProfile &&
          cargoData?.map((item, index) => (
            <Performed
              orderStatus={orderStatus}
              key={index}
              cargo={item}
              setIsDeletePopupOpen={setIsDeletePopupOpen}
              isDeletePopupOpen={isDeletePopupOpen}
            />
          ))}

        {cargoData?.length === 0 && !isLoading && <Empty t={t} />}

        {cargoData?.length === 0 && isLoading && <LoadingSpinner />}
      </Box>
      {cargoData?.length >= 40 && (
        <Box mt={`15px`} width={`fit-content`}>
          <Button isLoading={isFetching} onClick={addPage}>
            Загрузить еще
          </Button>
        </Box>
      )}

      <Popup
        isOpen={isDeletePopupOpen?.guid}
        onClose={() => setIsDeletePopupOpen(false)}
        mainText={t("Вы уверены что хотите удалить груз ?", { name: isDeletePopupOpen?.short_name, })}
        status="delete"
        btn2Callback={() => onDeleteAccept()}
      />
    </>
  );
};
