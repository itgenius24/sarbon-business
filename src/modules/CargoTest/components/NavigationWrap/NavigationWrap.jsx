import {
  CheckIconStep,
  CricleBlueIcon,
  CricleIcon,
  NextIconMobile,
  PlusIconStepMobile,
  PrevIconMobile,
} from "@/assets/icons/icons";
import { Flex } from "@chakra-ui/react";
import React from "react";

const NavigationWrap = ({ cls, addCargoProps, clsx }) => {
  return (
    <Flex
      background={`rgba(0, 122, 255, 1)`}
      width={`100%`}
      justifyContent={`space-between`}
      alignItems={`center`}
      padding={`0 20px`}
      className={cls.mobileNavigation}
    >
      {addCargoProps.watch(`cargoIndex`) === 1 ? (
        <div onClick={addCargoProps.handleOpenModal}>
          <PlusIconStepMobile />
        </div>
      ) : (
        <div
          onClick={() =>
            addCargoProps.setValue(
              `cargoIndex`,
              addCargoProps.watch(`cargoIndex`) > 5
                ? ``
                : addCargoProps.watch(`cargoIndex`) - 1
            )
          }
        >
          <PrevIconMobile />
        </div>
      )}
      {addCargoProps.watch(`cargoIndex`) === 1 && (
        <div className={cls.arrowWrap2}>
          <div className={clsx(cls.arrow)}>
            <div className={cls.text}>
              <p>1. Груз</p>
              <span>
                {addCargoProps.watch("cargo_type")?.label &&
                addCargoProps.watch("weight_measurement") &&
                addCargoProps.watch("volume_measurement")
                  ? `${
                      addCargoProps.watch("cargo_type").label
                    } ${addCargoProps.watch("weight_measurement")}T 
                          ${addCargoProps.watch("volume_measurement")}m³`
                  : "не заполнено"}
              </span>
            </div>
          </div>
        </div>
      )}

      {addCargoProps.watch(`cargoIndex`) === 2 && (
        <div className={cls.arrowWrap2}>
          <div className={clsx(cls.arrow)}>
            <div className={cls.text}>
              <p>2. Маршрут и время</p>
              {addCargoProps.watch(`loadings[0].address`) &&
              addCargoProps.watch("unloading[0].address") ? (
                <Flex alignItems={`center`} gap={`5px`}>
                  <p className={cls.locationText}>
                    {addCargoProps.watch(`loadings[0].address`)}
                  </p>
                  -{`>`}
                  <p className={cls.locationText}>
                    {addCargoProps.watch("unloading[0].address")}
                  </p>
                </Flex>
              ) : (
                <Flex alignItems={`center`} gap={`5px`}>
                  <span>не заполнено</span>
                </Flex>
              )}
            </div>
          </div>
        </div>
      )}
      {addCargoProps.watch(`cargoIndex`) === 3 && (
        <div className={cls.arrowWrap2}>
          <div className={clsx(cls.arrow)}>
            <div className={cls.text}>
              <p>3. Транспорт</p>
              <span>
                {addCargoProps.watch("car_type")?.label
                  ? addCargoProps.watch("car_type")?.label
                  : "не заполнено"}{" "}
              </span>
            </div>
          </div>
        </div>
      )}
      {addCargoProps.watch(`cargoIndex`) === 4 && (
        <div className={cls.arrowWrap2}>
          <div className={clsx(cls.arrow)}>
            <div className={cls.text}>
              <p>4. Оплата</p>
              <span>
                {addCargoProps.check
                  ? addCargoProps.getTrueKeys(addCargoProps.mone)?.join(`,`)
                  : addCargoProps.watch(`price_after_order`)
                  ? addCargoProps.watch(`price`) || 0
                  : `не заполнено`}
              </span>
            </div>
          </div>
        </div>
      )}
      <div
        onClick={() =>
          addCargoProps.setValue(
            `cargoIndex`,
            addCargoProps.watch(`cargoIndex`) > 5
              ? ``
              : addCargoProps.watch(`cargoIndex`) + 1
          )
        }
      >
        <NextIconMobile />
      </div>
    </Flex>
  );
};

export default NavigationWrap;
