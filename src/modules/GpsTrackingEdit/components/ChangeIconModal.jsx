import {
  BluePendingIcon,
  CencelMapIcon,
  CheckBlueIcon,
  CloseIconModal,
  GreenCarIcon,
  QuestionBlueIcon,
} from "@/assets/icons/icons";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import CheckBoxComponent from "./CheckBoxComponent";
import authStore from "@/store/auth.store";
import { useTranslation } from "react-i18next";

const ChangeIconModal = ({
  cls,
  setIconStatus,
  iconStatus,
  statusIconChange,
  setCenterModalType,
}) => {
  const role_id = authStore.userData.role_id
  const { t } = useTranslation();
  const data = [
    {
      id: 1,
      type: "empty",
      icon: GreenCarIcon,
      title: "Свободная",
    },
    {
      id: 2,
      type: "our_cargo",
      icon: CheckBlueIcon,
      title:t( "Занята нашим грузом"),
    },
    {
      id: 3,
      type: "someone_cargo",
      icon: QuestionBlueIcon,
    title:t( "Занята чужим грузом")
    },
    // {
    //   id: 4,
    //   type: "waiting_for_driver",
    //   icon: BluePendingIcon,
    //   title: "В ожидании ответа",
    // },
    {
      id: 4,
      type: "broke_down",
      icon: CencelMapIcon,
      title:t( "Неисправна")
    },
  ];

  const iconStatusData = [
    {
      id: 1,
      type: "empty",
      icon: GreenCarIcon,
      title: "Свободная",
    },
    {
      id: 2,
      type: "broke_down",
      icon: CencelMapIcon,
      title:t( "Неисправна")
    },
  ]

  return (
    <div className={cls.selectedIcon}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <p className={cls.modalTitle}>Статус машины</p>
        <IconButton
          variant={"outline"}
          border={"none"}
          background={"white"}
          width={"50px"}
          icon={<CloseIconModal />}
          onClick={() => setCenterModalType("")}
        />
      </Flex>
      <Box>
        { role_id === `f81d3c3d-228d-479e-a2b1-9948c98640f2` ? iconStatusData.map((item) => (
          <CheckBoxComponent
            key={item.id}
            onClick={() => setIconStatus(item.type)}
            active={item.type === iconStatus}
          >
            <Flex gap={3} alignItems={"center"}>
              <item.icon /> <spa>{item.title}</spa>
            </Flex>
          </CheckBoxComponent>
        )) : data.map((item) => (
          <CheckBoxComponent
            key={item.id}
            onClick={() => setIconStatus(item.type)}
            active={item.type === iconStatus}
          >
            <Flex gap={3} alignItems={"center"}>
              <item.icon /> <spa>{item.title}</spa>
            </Flex>
          </CheckBoxComponent>
        ))}
      </Box>
      <Flex mt={3} gap={2}>
        <Button
          onClick={() => setCenterModalType(``)}
          className={cls.topButton}
          variant="secondaryWhite"
          size="md"
          border="1px solid #D0D5DD"
        >
          Отменить
        </Button>
        <Button
          isDisabled={Boolean(!iconStatus)}
          onClick={statusIconChange}
          className={cls.topButton}
          size="md"
        >
          Сохранить
        </Button>
      </Flex>
    </div>
  );
};

export default ChangeIconModal;
