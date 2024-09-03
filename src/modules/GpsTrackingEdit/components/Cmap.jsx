import {
  GreenMapIcon,
  MapLoadGreenIcon,
  MapLoadIcon,
} from "@/assets/icons/icons";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  Clusterer,
  Map,
  Placemark,
  SearchControl,
  TypeSelector,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import React, { memo } from "react";

const Cmap = memo(
  ({
    getCarListProps,
    coordinates,
    balloonContent,
    mapIcon,
    watch,
    setModalType,
    balloonContentCargo,
    handleMouseEnter,
    locationData,
    setLoadState,
    handleMouseEnterCargo,
    setContendSingle,
    isLoading,
  }) => {
    return (
      <Map
        defaultState={{
          center: coordinates,
          zoom: 6,
        }}
        options={{
          maxZoom: 17,
          minZoom: 2,
        }}
        width="100%"
        height={"100vh"}
        modules={[
          "Placemark",
          "geocode",
          "control.SearchControl",
          "control.ZoomControl",
        ]}
      >
        <TypeSelector
          mapTypes={[
            "yandex#map",
            "yandex#satellite",
            "yandex#hybrid",
            "yandex#publicMap",
          ]}
        />
        <SearchControl options={{ float: "right" }} />
        <ZoomControl
          options={{
            position: {
              // bottom: "0vh",
              top: 350,
              right: 4,
            },
            size: "40px",
            marginBottom: "50%",
            width: "40px",
            height: "40px",
            cornerRadius: "50%",
          }}
        />

        <Clusterer
          options={{
            clusterIconColor: "rgba(52, 199, 89, 1)",
            style: {
              backgroundColor: "rgba(52, 199, 89, 1)",
              color: "white",
              borderRadius: "50%",
            },
          }}
        >
          {getCarListProps?.data?.map((carInfo) => {
            return (
              <>
                <Placemark
                  key={carInfo?.guid}
                  geometry={[carInfo?.lat, carInfo?.long]}
                  properties={{ balloonContent: balloonContent }}
                  options={{
                    iconLayout: "default#image",
                    iconImageHref:
                      "data:image/svg+xml;charset=UTF-8," +
                      encodeURIComponent(
                        mapIcon[carInfo?.users_id_data?.provisions?.[0]] ||
                          GreenMapIcon
                      ),
                    iconImageSize:
                      watch("users_id")?.value || watch("users_id2")?.value
                        ? [45, 105]
                        : [40, 52],
                    iconImageOffset: [-15, -42],
                  }}
                  modules={["geoObject.addon.balloon"]}
                  onBalloonOpen={(e) => {
                    const placemark = e.get("target");
                    const balloonInstance = placemark.balloon;
                    balloonInstance.events.add("click", () => {
                      setContendSingle(carInfo);
                      if (
                        carInfo?.users_id_data?.provisions?.[0] === "our_cargo"
                      ) {
                        setModalType("driverCheck");
                      } else if (
                        carInfo?.users_id_data?.provisions?.[0] ===
                        "someone_cargo"
                      ) {
                        setModalType("driverQuestion");
                      } else if (
                        carInfo?.users_id_data?.provisions?.[0] ===
                        "waiting_for_driver"
                      ) {
                        setModalType("driverExpectation");
                      } else {
                        setModalType("driverFree");
                      }
                    });
                  }}
                  onMouseEnter={(e) => handleMouseEnter(e, carInfo)}
                />
              </>
            );
          })}
        </Clusterer>

        {locationData &&
          locationData.map((item) => (
            <Placemark
              key={item?.id}
              geometry={[
                item.location_name.split(",")[0] * 1,
                item.location_name.split(",")[1] * 1,
              ]}
              properties={{
                balloonContent: balloonContentCargo,
                iconContent: "2000",
              }}
              options={{
                iconLayout: "default#image",
                iconImageHref:
                  "data:image/svg+xml;charset=UTF-8," +
                  encodeURIComponent(
                    item?.order_status[0] === "occupied_cargo"
                      ? MapLoadIcon
                      : MapLoadGreenIcon
                  ),
                iconImageSize: [50, 62],
                iconImageOffset: [-15, -42],
              }}
              onBalloonOpen={(e) => {
                const placemark = e.get("target");
                const balloonInstance = placemark.balloon;
                balloonInstance.events.add("click", () => {
                  setLoadState(item);
                  if (item?.order_status[0] === "occupied_cargo") {
                    setModalType("driverGruzGoods");
                  } else {
                    setModalType("driverGruz");
                  }
                });
              }}
              onMouseEnter={(e) => handleMouseEnterCargo(e, item)}

              // onClick={(e) => {

              //   // handlePlacemarkClick(e.get("target").getMap(), [
              //   //   item.location_name.split(",")[0] * 1,
              //   //   item.location_name.split(",")[1] * 1,
              //   // ]);
              // }}
            />
          ))}
      </Map>
    );
  }
);

export default Cmap;
