import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { use, useState } from "react";
import cls from "./style.module.scss";
import { TextFieldWithAddition } from "@/components/TextFieldWithAddition";
import { useAddCargoContext } from "../../providers";
import authStore from "@/store/auth.store";
import { useGetStoreData } from "@/hooks/useGetStoreData";
import { allowOnlyNumbers } from "@/utils/allowOnlyNumbers";
import { CustomTextarea } from "@/components/CustomTextarea";
import { useSSR, useTranslation } from "react-i18next";
import { Checkbox } from "@/components/Checkbox";
import {
  useCreateAddressMutation,
  useCreateCargoMutation,
  useUpdateCargo,
} from "@/services/api";
import { CheckModalIcon, ModalGruzIcon } from "@/assets/icons/icons";
import { addDaysToDate } from "@/utils/addDaysToDate";
import { ModalS } from "@/components/Modal";
import { TextField } from "@/components/TextField";
import { useRouter } from "next/navigation";
import { useGetLang } from "@/hooks/useGetLang";
const StepFive = ({ status }) => {
  const { t } = useTranslation();
  const {
    register,
    setValue,
    watch,
    canEdit,
    handleOpenTemplateModal,
    isTemplateModalOpen,
    handleCloseTemplateModal,
    handleResetForm,
    isClicked,
    loading,
    loadings,
    unloading,
    getValues,
    errors,
    setLoad,
    load,
    mone,
    setMoney,
    check,
    setCheck,
  } = useAddCargoContext();

  const { value: userData } = useGetStoreData(authStore, "userData");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpen2, setIsPopupOpen2] = useState(false);
  const [isUpdate, setIsUpdate] = useState(true);
  const [guid, setGuid] = useState();
  const router = useRouter();
  const locale = useGetLang();

  console.log(`unloading`,unloading)

  const getTrueKeys = (obj) => {
    return Object.keys(obj).filter((key) => obj[key] === true);
  };

  const updateCargo = useUpdateCargo({
    onSuccess: (data) => {
      setGuid(data.guid);
    },
  });
  const createAddress = useCreateAddressMutation({
    onSuccess: (res) => {
      if (isUpdate) {
        setIsPopupOpen(true);
      } else {
        setIsPopupOpen2(true);
        handleCloseTemplateModal();
      }
    },
    onError() {},
  });

  const createCargo = useCreateCargoMutation({
    onSuccess: (data) => {
      setGuid(data.guid);
      console.log(`data.guid`, data.guid);
      let loadingsData = loadings.map((item, index) => ({
        address: item?.address,
        date: new Date(item.from_date),
        lat: item?.cor.split(" ")[0],
        long: item?.cor.split(" ")[1],
        step: index + 1,
        type: ["shipper"],
        expectations: +item.loading_num || 0,
      }));
      let unloadinData = unloading.map((item, index) => ({
        address: item?.address,
        date: new Date(item.to_date),
        lat: item?.cor.split(" ")[0],
        long: item?.cor.split(" ")[1],
        step: index + 1,
        type: ["consignee"],
      }));

      createAddress.mutate({
        data: {
          object_data: {
            name: loadingsData.concat(unloadinData),
            cargo_id: data.guid,
          },
        },
      });
    },
    onError() {
      // setLoading(false);
    },
  });



  const onSubmitF = () => {
    setIsUpdate(true);
    const requestData = {
      data: {
        // step 1
        cargo_type_id: watch(`cargo_type`)?.value,
        weight: +watch(`weight_measurement`),
        measurement_id: watch(`weight_unit`)?.value,
        volume_m3: +watch(`volume_measurement`),
        packages_id: watch(`packaging`)?.value || "",
        package_quantity: +watch(`packaging_quantity`) || 0,
        length: +watch(`length`),
        width: watch(`width`),
        height: +watch(`height`),
        photo: watch(`image`),
        order_status: watch(`loadResId`)
          ? [watch(`order_status`)?.value]
          : ["in_moderation"],

        //  step3

        vehicle_type_id: watch("car_type")?.value,
        number_of_cars: watch("transport_count"),
        tir: watch("tir"),
        t1: watch("t1"),
        cmr: watch("cmr"),
        med: watch(`medic_certificate`),
        straps_number: watch("straps_number"),
        hitch: watch("hitch") || false,
        pneumatic: watch("pneumatic") || false,
        bunks: watch("bunks") || false,
        load_type: getTrueKeys(load),
        take_all_unloads: watch(`is_ftl`),
        load_around_the_clock: watch(`is_ltl`),

        //step4

        guid: check ? watch(`loadResId`) : undefined,
        money_code: check ? getTrueKeys(mone) : undefined,
        bid_cash: check ? undefined : +watch("price"),
        prepayment_percentage: check ? undefined : +watch(`price_prepayment`),
        dim_length_special: check ? undefined : watch("price_after_order"),
        payment_description: check ? undefined : watch("payment_description"),
        currency_id: check ? undefined : watch("price_prepayment_unit").value,
        map_id: check ? undefined : watch("payment_type")?.value,
        map_id_2: check ? undefined : watch("payment_type_1")?.value,
        map_id_3: check ? undefined : watch("payment_type_2")?.value,

        // step5
        load_time: addDaysToDate(
          loadings[0].from_date || new Date(),
          loadings[0].loading_num
        ),
        date: new Date(unloading[unloading.length - 1].to_date),
        phone: watch(`contact`),
        comment: watch(`note`),
        location_name: loadings[0].cor,
        cargo_type: ["cargo"],
        users_id: authStore.userData.id,
        address_name: `${loadings[0].address}|${
          unloading[unloading.length - 1].address
        }`,
        flag_ot: watch(`flag_ot`),
        flag_do: watch(`flag_do`),
        country_code_from: watch(`country_code_from`),
        country_code_to: watch(`country_code_to`),
        from: loadings[0].address,
        to: unloading[unloading.length - 1].address,
      },
    };
    createCargo.mutate(requestData);
  };

  const shablonF = () => {
    setIsUpdate(false);
    const requestData = {
      data: {
        // step 1
        cargo_type_id: watch(`cargo_type`)?.value,
        weight: +watch(`weight_measurement`),
        measurement_id: watch(`weight_unit`)?.value,
        volume_m3: +watch(`volume_measurement`),
        packages_id: watch(`packaging`)?.value || "",
        package_quantity: +watch(`packaging_quantity`) || 0,
        length: +watch(`length`),
        width: watch(`width`),
        height: +watch(`height`),
        photo: watch(`image`),
        order_status: watch(`loadResId`)
          ? [watch(`order_status`)?.value]
          : ["in_moderation"],

        //  step3

        vehicle_type_id: watch("car_type")?.value,
        number_of_cars: watch("transport_count"),
        tir: watch("tir"),
        t1: watch("t1"),
        cmr: watch("cmr"),
        med: watch(`medic_certificate`),
        straps_number: watch("straps_number"),
        hitch: watch("hitch") || false,
        pneumatic: watch("pneumatic") || false,
        bunks: watch("bunks") || false,
        load_type: getTrueKeys(load),
        take_all_unloads: watch(`is_ftl`),
        load_around_the_clock: watch(`is_ltl`),

        //step4

        guid: check ? watch(`loadResId`) : undefined,
        money_code: check ? getTrueKeys(mone) : undefined,
        bid_cash: check ? undefined : +watch("price"),
        prepayment_percentage: check ? undefined : +watch(`price_prepayment`),
        dim_length_special: check ? undefined : watch("price_after_order"),
        payment_description: check ? undefined : watch("payment_description"),
        currency_id: check ? undefined : watch("price_prepayment_unit").value,
        map_id: check ? undefined : watch("payment_type")?.value,
        map_id_2: check ? undefined : watch("payment_type_1")?.value,
        map_id_3: check ? undefined : watch("payment_type_2")?.value,

        //step5

        load_time: addDaysToDate(
          loadings[0].from_date || new Date(),
          loadings[0].loading_num
        ),
        date: new Date(unloading[unloading.length - 1].to_date),
        phone: watch(`contact`),
        comment: watch(`note`),
        location_name: loadings[0].cor,
        cargo_type: ["template"],
        template_name: watch(`template_name`),
        users_id: authStore.userData.id,
        address_name: `${loadings[0].address}|${
          unloading[unloading.length - 1].address
        }`,
        flag_ot: watch(`flag_ot`),
        flag_do: watch(`flag_do`),
        country_code_from: watch(`country_code_from`),
        country_code_to: watch(`country_code_to`),
        from: loadings[0].address,
        to: unloading[unloading.length - 1].address,
      },
    };
    createCargo.mutate(requestData);

    // let loadingsData = loadings.map((item, index) => ({
    //   address: item?.address,
    //   date: new Date(item.from_date),
    //   lat: item?.cor.split(" ")[0],
    //   long: item?.cor.split(" ")[1],
    //   step: index + 1,
    //   type: ["shipper"],
    //   expectations: +item.loading_num || 0,
    // }));

    // let unloadinData = unloading.map((item, index) => ({
    //   address: item?.address,
    //   date: new Date(item.to_date),
    //   lat: item?.cor.split(" ")[0],
    //   long: item?.cor.split(" ")[1],
    //   step: index + 1,
    //   type: ["consignee"],
    // }));
    // createAddress.mutate({
    //   data: {
    //     object_data: {
    //       name: loadingsData.concat(unloadinData),
    //       cargo_id: watch(`loadResId`),
    //     },
    //   },
    // });
  };

  const clearF = () => {
    handleResetForm();
    setIsPopupOpen2(false);
    setValue(`cargoIndex`, 1);
  };

  const routerClick = () => {
    handleResetForm();
    router.push(`/${locale}/my-loads/in_moderation/${guid}?isFirst=true`);
  };
  return (
    <>
      <Box className={cls.step1}>
        <Flex alignItems={"center"} justifyContent={"flex-start"}>
          <Box className={cls.box} width={"40%"}>
            <h2 className={cls.title}>Ваши контакты</h2>
            <p className={cls.deck}>укажите, к кому обратиться по объявлению</p>
          </Box>
          <Box width={"50%"}>
            <TextFieldWithAddition
              disabled={!canEdit}
              additionalItemPosition="left"
              additionalItemTheme="light"
              additionalItemPlaceholder={userData?.full_name || userData?.login}
              onKeyDown={allowOnlyNumbers}
              placeholder="+998 (99) 999-99-99"
              name="contact"
              register={register}
              rules={{
                required: {
                  value: true,
                  message: "Обязательное поле",
                },
              }}
            />
          </Box>
        </Flex>
        <Flex mt={4} alignItems={"center"} justifyContent={"flex-start"}>
          <Box className={cls.box} width={"40%"}>
            <h2 className={cls.title}>Комментарий</h2>
            <p className={cls.deck}>
              Не указывайте контакты (телефоны, скайп и пр.), иначе ваш груз
              удалит модератор.
            </p>
          </Box>
          <Box width={"50%"}>
            <CustomTextarea
              disabled={!canEdit}
              name={"note"}
              watch={watch}
              placeholder={t("Пишите здесь")}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 1000) {
                  setValue("note", value);
                }
              }}
              value={watch("note")}
              height={"10px"}
            />
          </Box>
        </Flex>
      </Box>
      {!status && (
        <Box mt="32px">
          <Checkbox name="accept" register={register} filled>
            <Text fontSize="14px" maxWidth="396px" width="100%">
              {t("Нажимая кнопку, вы принимаете условия")}{" "}
              <a style={{ color: "#026FE7", fontWeight: "600" }} href="">
                {t("Пользовательская  соглашения")}
              </a>
            </Text>
          </Checkbox>
          <Box
            mt="16px"
            display="flex"
            columnGap="12px"
            justifyContent="flex-start"
            maxWidth="900px"
          >
            <Button
              isDisabled={!watch("accept") || isClicked}
              isLoading={loading}
              size="md"
              maxWidth="223px"
              onClick={onSubmitF}
            >
              {t("Опубликовать груз")}
            </Button>
            <Button
              onClick={handleOpenTemplateModal}
              // isLoading={loading}
              size="md"
              maxWidth="223px"
              variant="secondaryWhite"
            >
              {t("Сохранить как шаблон")}
            </Button>
          </Box>
        </Box>
      )}

      <ModalS
        oneBtn
        isOpen={isTemplateModalOpen}
        title={t("Назовите шаблон")}
        onClose={handleCloseTemplateModal}
        secondBtnCallback={() => shablonF()}
        isDisabled={!watch("template_name")}
        secondBtnProps={{ isLoading: loading }}
        secondBtnText={t("Сохранить")}
      >
        <TextField
          register={register}
          errors={errors}
          name="template_name"
          label={t("Название шаблона")}
        />
      </ModalS>
      <Modal isOpen={isPopupOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <CheckModalIcon />
          </ModalHeader>
          <ModalCloseButton onClick={() => setIsPopupOpen(false)} />
          <ModalBody>
            <p style={{ fontWeight: 600, fontSize: "18px" }}>
              Груз успешно добавлен!
            </p>
            <p
              style={{
                fontWeight: 400,
                fontSize: "14px",
                color: `rgba(126, 123, 134, 1)`,
              }}
            >
              После модерации он станет доступен для поиска в системе
            </p>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => routerClick()}
              style={{
                background: "white",
                border: "1px solid rgba(208, 213, 221, 1)",
                color: "black",
              }}
              className={cls.btnOutline}
              mr={3}
            >
              Посмотреть детали
            </Button>
            <Button
              onClick={() => clearF()}
              style={{
                background: "white",
                border: "1px solid rgba(208, 213, 221, 1)",
                color: "black",
              }}
              className={cls.btngreen}
            >
              Добавить новый груз
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isPopupOpen2} isCentered>
        <ModalOverlay onClick={() => setIsPopupOpen2(false)} />
        <ModalContent>
          <ModalHeader>
            <CheckModalIcon />
          </ModalHeader>
          <ModalCloseButton onClick={() => setIsPopupOpen2(false)} />
          <ModalBody paddingBottom={`40px`}>
            <p style={{ fontWeight: 600, fontSize: "18px" }}>
              Шаблон успешно добавлен
            </p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StepFive;
