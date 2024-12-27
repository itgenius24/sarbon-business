import {
  AppleIcon,
  BatareyFullIcon,
  BluetoothIcon,
  CheckBlueIcon,
  CloseIconM,
  FurIcon,
  GreenCheckIcon,
  GruzGeenIcon,
  GruzIcon,
  LoadgreenIcon,
  LoadOulineIcon,
  LocationActiveIcon,
  ModalGruzIcon,
  NextBtnIcon,
  StarsIcon,
  StoneIcon,
} from "@/assets/icons/icons";
import { Popup } from "@/components/Popup";
import { useUpdateCargo } from "@/services/api";
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
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const DriverGruz = ({
  cls,
  loadState,
  setModalType,
  setOffset,
  setLocationData,
  locationData,
}) => {
  const { t } = useTranslation();

  const role_id = authStore.userData.role_id;

  const [isPopupOpen, setPopupOpen] = useState(false);
  function handleClosePopup() {
    setPopupOpen(false);
  }

  console.log(`load`, loadState);

  const { mutate } = useUpdateCargo({
    onSuccess: (res) => {
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
                <span>Груз добавил: </span>
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
            onClick={() => setModalType(`filter`)}
          />
        </Flex>

        <Box mt={3} className={cls.cardWrap}>
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
                    ? t( `Как можно скорее`)
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
                : `По запросу`}
            </p>
            <p className={cls.cardStartSubTitle}>
              {t(`Предоплата`)}:{" "}
              <span>
                {" "}
                {loadState?.prepayment_percentage > 0 ? "Дa" : "Нет"}{" "}
              </span>
            </p>
          </Flex>
        </Box>
        {role_id !== `f81d3c3d-228d-479e-a2b1-9948c98640f2` && (
          <Button
            onClick={() => setPopupOpen(true)}
            size={"lg"}
            className={cls.btngreen}
          >
            {t(`Забронировать груз`)}
          </Button>
        )}
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
              Груз будет забронирован и недоступен для других диспетчеров.
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
              Нет
            </Button>
            <Button
              style={{ background: "rgba(21, 186, 77, 1)" }}
              onClick={updateCar}
              className={cls.btngreen}
            >
              Забронировать
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DriverGruz;
