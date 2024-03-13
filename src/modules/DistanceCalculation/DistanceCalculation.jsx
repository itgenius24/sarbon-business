import React from "react";
import { DeleteIcon, PlusIcon } from "@/assets/icons/icons";
import { Container } from "@/components/Container";
import { TextField } from "@/components/TextField";
import { Box, Button, Heading } from "@chakra-ui/react";
import { useDistanceCalculationProps } from "./useDistanceCalculationProps";
import { Modal } from "@/components/Modal";
import { GeoObject, GeolocationControl, Map, RouteEditor, RoutePanel, SearchControl, } from "@pbe/react-yandex-maps";

export const DistanceCalculation = () => {

  const {
    register,
    locations,
    handleAppend,
    handleRemove,
    handleCloseModal,
    handleOpenModal,
    isModalOpen,
    setYmaps,
    mapRef,
    panel,
    setPanel
  } = useDistanceCalculationProps();

  return <Container py="40px">
    <Heading size="md" mb="24px">Расчет расстояния</Heading>
    <Box p="24px" bgColor="baseWhite" borderRadius="12px">
      <Box display="flex" mb="20px" alignItems="center" justifyContent="space-between">
        <Heading size="sm" fontSize="18px" lineHeight="28px" fontWeight="600">Детали груза</Heading>
        <Button onClick={handleOpenModal} variant="reset" leftIcon={<PlusIcon color="#007aff" />}>Добавить доп. адрес</Button>
      </Box>
      <Box display="flex" flexDirection="column" rowGap="20px">
        <TextField register={register} name="from" label="Откуда" placeholder="Введите город, страну" />
        {
          locations.map((item, index) => (
            <Box key={item.id} display="flex" columnGap="16px" alignItems="center">
              <Button
                variant="reset"
                onClick={() => handleRemove(index)}
                color="brand.700"
                leftIcon={<DeleteIcon />}
              >
                Удалить
              </Button>
              <TextField register={register} label="Дополнительный адрес" name={`locations.${index}.name`} placeholder="Введите город, страну" />
            </Box>
          ))
        }
        <TextField register={register} name="to" label="Куда" placeholder="Введите город, страну" />
      </Box>
      <Button width="253px" mt="20px">Рассчитать расстояние</Button>
    </Box>
    <Modal size="xl" isOpen={isModalOpen} onClose={handleCloseModal}>
      <Box width="100%" height="500px">
        <Map
          instanceRef={mapRef}
          onLoad={(ymaps) => setYmaps(ymaps)}
          width="100%"
          height="100%"
          modules={["Placemark", "geocode", "control.SearchControl", "control.RouteEditor", "control.RoutePanel"]}
          defaultState={{
            center: [55.751574, 37.573856],
            zoom: 10
          }}
        >
          <RoutePanel
            onLoad={(panel) => setPanel(panel)}
            state={{
              start: [55.751574, 37.573856],
              end: [52.520008, 13.404954],
            }}
            options={{ float: "right" }}
          />
          {/* <RouteEditor /> */}
          {/* <GeolocationControl /> */}
          {/* <GeoObject
            geometry={{
              type: "LineString",
              coordinates: [
                [55.76, 37.64],
                [52.51, 13.38],
              ],
            }}
            options={{
              geodesic: true,
              strokeWidth: 5,
              strokeColor: "#F008",
            }}
          /> */}
        </Map>
      </Box>
    </Modal>
  </Container>;
};
