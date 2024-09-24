import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
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
import { useCreateAddressMutation, useUpdateCargo } from "@/services/api";
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
    getValues,errors
  } = useAddCargoContext();
  const { value: userData } = useGetStoreData(authStore, "userData");
  const [isPopupOpen,setIsPopupOpen] = useState(false)
  const [isPopupOpen2,setIsPopupOpen2] = useState(false)
  const [isUpdate,setIsUpdate] = useState(true)
  const [guid,setGuid] = useState();
  const router = useRouter()
  const locale = useGetLang();
  const updateCargo = useUpdateCargo({
    onSuccess: (data) => {
      setGuid(data.guid)

    },
  });
  const createAddress = useCreateAddressMutation({
    onSuccess:(res) => {
      if(isUpdate){
        setIsPopupOpen(true)
      
      }else{
        setIsPopupOpen2(true)
        handleCloseTemplateModal()
      }
    },
    onError() {

    },
  });
console.log(`loadinss`,unloading)

  const onSubmitF = () =>{
    const requestData = {
      data:{
        load_time: addDaysToDate(getValues("loadings")[0].from_date || new Date(),getValues("loadings")[0].loading_num),
        date: new Date(getValues("unloading")[getValues("unloading").length - 1].to_date),
        phone: watch(`contact`),
        comment: watch(`note`),
        guid: watch(`loadResId`),
        cargo_type: ["cargo"],
        users_id:authStore.userData.id,
        address_name: `${loadings[0].address}|${unloading[unloading.length -1].address}`
      }
    }
    updateCargo.mutate(requestData)

    let loadingsData = getValues("loadings").map((item,index) => ({
      address:item?.address,
      date: addDaysToDate(item.from_date,item.loading_num),
      lat: item?.cor.split(" ")[0],
      long: item?.cor.split(" ")[1],
      step:index+1,
      type:["shipper"]
    }));
    let unloadinData = getValues("unloading").map((item,index) => ({
      address:item?.address,
      date: new Date(item.to_date),
      lat: item?.cor.split(" ")[0],
      long: item?.cor.split(" ")[1],
      step:index+1,
      type:["consignee"]

    }));
    // console.log(`loadingsData`,getValues("loadings"))

    createAddress.mutate(
      {
        data: {
          object_data: {
            name: loadingsData.concat(unloadinData),
            cargo_id: watch(`loadResId`),
          },
        },
      },
    );
  }

  const shablonF = () => {
    setIsUpdate(false)
    const requestData = {
      data:{
        load_time: addDaysToDate(getValues("loadings")[0].from_date || new Date(),getValues("loadings")[0].loading_num),
        date: new Date(getValues("unloading")[getValues("unloading").length - 1].to_date),
        phone: watch(`contact`),
        comment: watch(`note`),
        guid: watch(`loadResId`),
        cargo_type: ["template"],
        template_name: watch(`template_name`),
        users_id:authStore.userData.id,
        address_name: `${loadings[0].address}|${unloading[unloading.length -1].address}`

      }
    }
    updateCargo.mutate(requestData)

    let loadingsData = getValues("loadings").map((item,index) => ({
      address:item?.address,
      date: addDaysToDate(item.from_date,item.loading_num?.value),
      lat: item?.cor.split(" ")[0],
      long: item?.cor.split(" ")[1],
      step:index+1,
      type:["shipper"]
    }));

    let unloadinData = getValues("unloading").map((item,index) => ({
      address:item?.address,
      date: new Date(item.to_date),
      lat: item?.cor.split(" ")[0],
      long: item?.cor.split(" ")[1],
      step:index+1,
      type:["consignee"]

    }));
    createAddress.mutate(
      {
        data: {
          object_data: {
            name: loadingsData.concat(unloadinData),
            cargo_id: watch(`loadResId`),
          },
        },
      },
    );
  }

  const clearF = () => {
    handleResetForm()
    setIsPopupOpen2(false)
    setValue(`cargoIndex`,1)
  }

  const routerClick = () => {
    handleResetForm()
    router.push(`/${locale}/my-loads/in_moderation/${guid}?isFirst=true`)
  }
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
      {
        !status && <Box mt="32px">
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
      }

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
            <p style={{ fontWeight:600,fontSize:"18px" }}>Груз успешно добавлен!</p>
            <p style={{ fontWeight:400,fontSize:"14px", color:`rgba(126, 123, 134, 1)` }}>После модерации он станет доступен для поиска в системе</p>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => routerClick()} style={{ background:'white',border:'1px solid rgba(208, 213, 221, 1)',color:'black' }} className={cls.btnOutline} mr={3}>
               Посмотреть детали
            </Button>
            <Button onClick={() => clearF()} style={{ background:'white',border:'1px solid rgba(208, 213, 221, 1)',color:'black' }} className={cls.btngreen}>
               Добавить новый груз
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isPopupOpen2} isCentered>
        <ModalOverlay onClick={() => clearF()} />
        <ModalContent>
          <ModalHeader>
            <CheckModalIcon />
          </ModalHeader>
          <ModalCloseButton onClick={() => clearF()} />
          <ModalBody paddingBottom={`40px`}>
            <p style={{ fontWeight:600,fontSize:"18px" }}>Шаблон успешно добавлен</p>
          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  );
};

export default StepFive;
