import { Box, Button } from "@chakra-ui/react";

import cls from "./style.module.scss";
import { Performed } from "../Performed";

import { Empty } from "../Empty";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import useProps from "./useProps";
import { Popup } from "@/components/Popup";

export const CancellationPage = ({ orderStatus, t }) => {
  const {
    cargoData,
    isLoading,
    addPage,
    isFetching,
    isDeletePopupOpen,
    setIsDeletePopupOpen,
    onDeleteAccept,
  } = useProps(orderStatus, t);

  if (isLoading && cargoData?.length < 0) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Box>
        {cargoData?.length > 0 ? (
          cargoData?.map((item, index) => (
            <Performed
              orderStatus={orderStatus}
              key={index}
              cargo={item}
              setIsDeletePopupOpen={setIsDeletePopupOpen}
              isDeletePopupOpen={isDeletePopupOpen}
            />
          ))
        ) : (
          <Empty t={t} />
        )}
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
        mainText={t("Вы уверены что хотите удалить груз ?", {
          name: isDeletePopupOpen?.short_name,
        })}
        status="delete"
        btn2Callback={() => onDeleteAccept()}
      />
    </>
  );
};
