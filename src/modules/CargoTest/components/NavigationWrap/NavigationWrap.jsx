import {
  CheckIconStep,
  CricleBlueIcon,
  CricleIcon,
  NextIconMobile,
  PlusIconStepMobile,
  PrevIconMobile,
} from "@/assets/icons/icons";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

const NavigationWrap = ({ cls, addCargoProps, clsx }) => {
  const { t } = useTranslation();
  return (
    <>
      {addCargoProps.watch(`cargoIndex`) !== 5 ? (
        <Flex
          background={`rgba(0, 122, 255, 1)`}
          width={`100%`}
          justifyContent={`space-between`}
          alignItems={`center`}
          padding={`0 20px`}
          className={cls.mobileNavigation}
        >
          {addCargoProps.watch(`cargoIndex`) === 1 ? (
            <div style={{cursor:`pointer`}} onClick={addCargoProps.handleOpenModal}>
              <PlusIconStepMobile />
            </div>
          ) : (
            <div
             style={{cursor:`pointer`}}
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
                  <p>1. {t(`Груз`)}</p>
                  <span>
                    {addCargoProps.watch("cargo_type")?.label &&
                    addCargoProps.watch("weight_measurement") &&
                    addCargoProps.watch("volume_measurement")
                      ? `${
                          addCargoProps.watch("cargo_type").label
                        } ${addCargoProps.watch("weight_measurement")}T 
                          ${addCargoProps.watch("volume_measurement")}m³`
                      : t("не заполнено")}
                  </span>
                </div>
              </div>
            </div>
          )}

          {addCargoProps.watch(`cargoIndex`) === 2 && (
            <div className={cls.arrowWrap2}>
              <div className={clsx(cls.arrow)}>
                <div className={cls.text}>
                  <p>2. {t(`Маршрут и время`)}</p>
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
                      <span>{t(`не заполнено`)}</span>
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
                  <p>3. {t(`Транспорт`)}</p>
                  <span>
                    {addCargoProps.watch("car_type")?.label
                      ? addCargoProps.watch("car_type")?.label
                      : t("не заполнено")}{" "}
                  </span>
                </div>
              </div>
            </div>
          )}
          {addCargoProps.watch(`cargoIndex`) === 4 && (
            <div className={cls.arrowWrap2}>
              <div className={clsx(cls.arrow)}>
                <div className={cls.text}>
                  <p>4. {t(`Оплата`)}</p>
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
          style={{cursor:`pointer`}} 
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
      ) : (
        <Flex className={cls.resultStepWrap}>
          <Flex
            padding={`8px 0px`}
            onClick={() => addCargoProps.setValue(`cargoIndex`,1)}
            cursor={`pointer`}
            borderBottom={`1px solid rgba(226, 228, 234, 1)`}
            width={`100%`}
            justifyContent={`space-between`}
            alignItems={`center`}
          >
            <Box>
              <div className={cls.textResult}>
                <p>1. {t(`Груз`)}</p>
                <span>
                  {addCargoProps.watch("cargo_type")?.label &&
                  addCargoProps.watch("weight_measurement") &&
                  addCargoProps.watch("volume_measurement")
                    ? `${
                        addCargoProps.watch("cargo_type").label
                      } ${addCargoProps.watch("weight_measurement")}T 
                          ${addCargoProps.watch("volume_measurement")}m³`
                    : t("не заполнено")}
                </span>
              </div>
            </Box>
            <CheckIconStep />
          </Flex>
          <Flex
            borderBottom={`1px solid rgba(226, 228, 234, 1)`}
            width={`100%`}
            justifyContent={`space-between`}
            alignItems={`center`}
            padding={`8px 0px`}
            onClick={() => addCargoProps.setValue(`cargoIndex`,2)}
            cursor={`pointer`}
          >
            <Box>
              <div className={cls.textResult}>
                <p>2. {t(`Маршрут и время`)}</p>
                {addCargoProps.watch(`loadings[0].address`) &&
                addCargoProps.watch("unloading[0].address") ? (
                  <Flex width={`100%`} alignItems={`center`} gap={`5px`}>
                    <p  className={cls.locationText}>
                    
                      {addCargoProps.watch(`loadings[0].address`)}
                    </p>
                    -{`>`}
                    <p className={cls.locationText}>
                      {addCargoProps.watch("unloading[0].address")}
                    </p>
                  </Flex>
                ) : (
                  <Flex alignItems={`center`} gap={`5px`}>
                    <span>{t(`не заполнено`)}</span>
                  </Flex>
                )}
              </div>
            </Box>
            <CheckIconStep />
          </Flex>
          <Flex
            borderBottom={`1px solid rgba(226, 228, 234, 1)`}
            width={`100%`}
            justifyContent={`space-between`}
            alignItems={`center`}
            padding={`8px 0px`}
            onClick={() => addCargoProps.setValue(`cargoIndex`,3)}
            cursor={`pointer`}
          >
            <Box>
              <div className={cls.textResult}>
                <p>3. {t(`Транспорт`)}</p>
                <span>
                  {addCargoProps.watch("car_type")?.label
                    ? addCargoProps.watch("car_type")?.label
                    : t("не заполнено")}{" "}
                </span>
              </div>
            </Box>
            <CheckIconStep />
          </Flex>
          <Flex
            borderBottom={`1px solid rgba(226, 228, 234, 1)`}
            width={`100%`}
            justifyContent={`space-between`}
            alignItems={`center`}
            padding={`8px 0px`}
            onClick={() => addCargoProps.setValue(`cargoIndex`,4)}
            cursor={`pointer`}
          >
            <Box>
              <div className={cls.textResult}>
                <p>4. {t(`Оплата`)}</p>
                <span>
                  {addCargoProps.check
                    ? addCargoProps.getTrueKeys(addCargoProps.mone)?.join(`,`)
                    : addCargoProps.watch(`price_after_order`)
                    ? addCargoProps.watch(`price`) || 0
                    : `не заполнено`}
                </span>
              </div>
            </Box>
            <CheckIconStep />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default NavigationWrap;
