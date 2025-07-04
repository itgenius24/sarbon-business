import {
  CloseIconM,
  ExelIcon,
  GruzGeenIcon,
  LoadOulineIcon,
  ModalGruzIcon,
  StoneIcon
} from "@/assets/icons/icons";
import { TextField } from "@/components/TextField";
import { useCreateActionHistoriesMutation, useGetExcelPost, useUpdateCargo } from "@/services/api";
import authStore from "@/store/auth.store";
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const DriverGruz = ({
  cls,
  loadState,
  setModalType,
  setOffset,
  setLocationData,
  locationData,
  errors,
  register,
  watch,
  control,
}) => {
  const { t } = useTranslation();

  const role_id = authStore.userData.role_id;

  const [isPopupOpen, setPopupOpen] = useState(false);
  function handleClosePopup() {
    setPopupOpen(false);
  }


  const { mutate } = useUpdateCargo({
    onSuccess: (res) => {
      actionCreate({
        data: {
          user_name: authStore.userData.full_name,
          phone_number: authStore.userData?.phone,
          user_id: authStore.userData.guid,
          increment_id: loadState?.number_of_order,
          action_time: new Date(),
          role_slug: `top_dispatcher`,
          action_comment: `booking_cargo`,
          role_id: authStore.userData?.role_id,
          action_type: [`update`],
        },
      });
      setPopupOpen(false);
      setModalType("filter");
      const find = locationData?.map((item) => {
        if (item?.guid === loadState.guid) {
          return { ...item, ...(item.new_status = ["occupied_cargo"]) };
        }
        return item;
      });

      setLocationData(find);
      // setOffset(0)
    },
  });

  const updateCar = () => {
    mutate({
      data: {
        guid: loadState?.guid, //yukni guidisi
        new_status: ["occupied_cargo"],
        users_id_3: authStore.userData.id,
      },
    });
  };

      const { mutate: actionCreate } = useCreateActionHistoriesMutation();
  

  const downloadByLanguage = async (url) => {
    try {
      const link = document.createElement("a");
      const res = `https://pub-be0226dfadb94399a1ec5722d30b655b.r2.dev/${url}`;
      link.href = res;
      // link.target = "_blank";
      link.download = `Груз`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (_) {
      return
    }
  };
  const getExcelFile = useGetExcelPost({
    onSuccess: (res) => {
      downloadByLanguage(res?.url);
      actionCreate({
        data: {
          user_name: authStore.userData.full_name,
          phone_number: authStore.userData?.phone,
          user_id: authStore.userData.guid,
          increment_id: loadState?.number_of_order,
          action_time: new Date(),
          role_slug: `top_dispatcher`,
          action_comment: `export_axcell_driver`,
          role_id: authStore.userData?.role_id,
          action_type: [`update`],
        },
      });
    },
  });

  const getExcelFileFn = () => {
    getExcelFile.mutate({
      data: {
        object_data: {
          cargo_name: loadState?.product_type,
          dispatcher_id: authStore?.userData?.id,
          cargo_number: loadState?.number_of_order,
          distance: +watch(`distance`),
          number_of_cars: loadState?.number_of_cars,
          type: "top_dispatcher",
          lat: loadState.location_name.split(" ")[0] * 1,
          long: loadState?.location_name.split(" ")[1] * 1,
          // customer_id: authStore?.userData?.id,
        },
      },
    });
  };

  return (
    <div className={cls.filter}>
      <Flex flexDirection={"column"} rowGap={"10px"} alignItems={"flex-start"}>
        <Flex
          justifyContent={"space-between"}
          width={"100%"}
          alignItems={"center"}
        >
          <Flex gap={3}>
            <Avatar name="Bobur Nimatllayey" src="#" />
            <Box>
              <p className={cls.version}>
                <span>{t(`Груз добавил`)}: </span>
              </p>
              <p className={cls.userName}>
                {loadState?.users_id_data?.full_name}
              </p>
            </Box>
          </Flex>
          <IconButton
            width={"fit-content"}
            style={{ background: "transparent" }}
            icon={<CloseIconM />}
            onClick={() => setModalType(``)}
          />
        </Flex>

        <Box mt={3} className={cls.cardWrapOutline}>
          <Flex gap={2}>
            <div className={cls.startAIconWrapGreen}>
              <div className={cls.startAGreenIcon}>A</div>{" "}
              <div className={cls.line}></div>{" "}
            </div>
            <Box>
              <p className={cls.cardStartTitle}>{loadState?.from} </p>
              <p className={cls.cardStartSubTitle}>
                {loadState?.country_code_from?.toUpperCase()} /{" "}
                <span>
                  {loadState?.as_soon_as_a
                    ? t( `Готов к загрузке`)
                    : format(loadState?.load_time, "yyyy-MM-dd")}
                </span>
              </p>
            </Box>
          </Flex>
          <Flex mt={5} gap={2}>
            <div className={cls.startAIconWrapGreen}>
              <div className={cls.startBGreenIcon}>B</div>
            </div>
            <Box>
              <p className={cls.cardStartTitle}>{loadState?.to}</p>
              <p className={cls.cardStartSubTitle}>
                {loadState?.country_code_to?.toUpperCase()} /
                <span>
                  {loadState?.as_soon_as_b
                    ? t( `Как можно скорее`)
                    : format(loadState?.date || new Date(), "yyyy-MM-dd")}
                </span>
              </p>
            </Box>
          </Flex>

          <Flex className={cls.gruz} mt={5} gap={2}>
            <GruzGeenIcon />
            <Box>
              <p className={cls.cardStartTitle}>
                {loadState?.cargo_type_id_data?.name}
              </p>
              <p className={cls.cardStartSubTitle}>
                <Flex width={"100%"} justifyContent={"space-between"}>
                  {loadState?.vehicle_type_id_data?.name?.length > 15 ? (
                    <Tooltip
                      background={`white`}
                      color={`black`}
                      label={loadState?.vehicle_type_id_data?.name}
                    >
                      <span style={{ whiteSpace: `nowrap` }}>
                        {loadState?.vehicle_type_id_data?.name?.slice(0, 15)}...
                      </span>
                    </Tooltip>
                  ) : (
                    loadState?.vehicle_type_id_data?.name
                  )}
                  <Flex ml={2} gap={3}>
                    <Flex gap={1} alignItems={"center"}>
                      <StoneIcon /> {loadState?.weight} т.
                    </Flex>
                    <Flex gap={1} alignItems={"center"}>
                      <LoadOulineIcon /> {loadState?.volume_m3}m3
                    </Flex>
                  </Flex>
                </Flex>
              </p>
            </Box>
          </Flex>
          <Flex mt={3} justifyContent={"space-between"}>
            <p className={cls.cardStartSubTitle}>{t(`Cумма`)}</p>
            <p className={cls.cardStartSubTitle}>
              {t(`Тип оплаты`)}:
              <span>
                {loadState?.map_id_data?.payment_type?.length > 15
                  ? `${loadState?.map_id_data?.payment_type?.slice(0, 15)}...`
                  : loadState?.map_id_data?.payment_type}
              </span>
            </p>
          </Flex>
          <Flex mt={3} justifyContent={"space-between"} alignItems={"center"}>
            <p className={cls.sumGreen}>
              {loadState?.bid_cash
                ? `${loadState?.bid_cash} ${loadState?.currency_id_data?.code}`
                : t(`По запросу`)}
            </p>
            <p className={cls.cardStartSubTitle}>
              {t(`Предоплата`)}:{" "}
              <span>
                {" "}
                {loadState?.prepayment_percentage > 0 ? "Дa" : "Нет"}{" "}
              </span>
            </p>
          </Flex>
          <Box>
            <span className={cls.cardStartSubTitle}>{t(`Номер груза`)}</span>
            <p className={cls.cardName}>{loadState?.number_of_order}</p>
          </Box>
        </Box>
        {/* {role_id !== `f81d3c3d-228d-479e-a2b1-9948c98640f2` && (
          <Button
            onClick={() => setPopupOpen(true)}
            size={"lg"}
            className={cls.btngreen}
          >
            {t(`Забронировать груз`)}
          </Button>
        )} */}
        <TextField
          // className={cls.textField}
          errors={errors}
          control={control}
          name="distance"
          register={register}
          // additionalItemName="weight_unit"
          placeholder={t("Введите расстояние поиска")}
          type="number"
          zIndex={90}
        />
        <Box
          as="button"
          color={`black`}
          _hover={{ background: `white` }}
          backgroundColor={`white`}
          border={`1px solid rgba(21, 186, 77, 1)`}
          // leftIcon={}
          onClick={getExcelFileFn}
          maxWidth={`400px`}
          width={`100%`}
          padding={`10px`}
          whiteSpace={`nowrap`}
          textOverflow={`ellipsis`}
          overflow={`hidden`}
          borderRadius={`8px`}
        >
          <Flex alignItems={`center`} gap={1}>
            <ExelIcon />
             <p style={{
                fontWeight: 600,
                overflow: `hidden`,
                textOverflow: `ellipsis`,
                width: `100%`,
             }}>
             
                Список ближайших машин в Excel
             </p>
          </Flex>
        </Box>
      </Flex>
      <Modal isOpen={isPopupOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalGruzIcon />
          </ModalHeader>
          <ModalCloseButton onClick={handleClosePopup} />
          <ModalBody>
            <p style={{ fontWeight: 600, fontSize: "18px" }}>
              {t(`Забронировать груз`)}?
            </p>
            <p style={{ fontWeight: 500, fontSize: "14px" }}>
             {t(`Груз будет забронирован и недоступен для других диспетчеров`)}.
            </p>
          </ModalBody>

          <ModalFooter>
            <Button
              style={{
                background: "white",
                border: "1px solid rgba(208, 213, 221, 1)",
                color: "black",
              }}
              onClick={handleClosePopup}
              className={cls.btnOutline}
              mr={3}
            >
             {t(`Нет`)}
            </Button>
            <Button
              style={{ background: "rgba(21, 186, 77, 1)" }}
              onClick={updateCar}
              className={cls.btngreen}
            >
              {t(`Забронировать`)}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DriverGruz;
