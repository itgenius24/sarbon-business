import {
  CencelMapIcon,
  CheckBlueIcon,
  CloseIconModal,
  GreenCarIcon,
  QuestionBlueIcon,
} from "@/assets/icons/icons";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import CheckBoxComponent from "./CheckBoxComponent";

const ChangeIconModal = ({ cls, setIconStatus,iconStatus,statusIconChange,setCenterModalType }) => {
  const data = [
    {
      id:1,
      type:"empty",
      icon:GreenCarIcon,
      title:"Свободная",
    },
    {
      id:2,
      type:"our_cargo",
      icon:CheckBlueIcon,
      title:"Занята нашим грузом",
    },
    {
      id:3,
      type:"someone_cargo",
      icon:QuestionBlueIcon,
      title:"Занята чужим грузом",
    },
    {
      id:4,
      type:"broke_down",
      icon:CencelMapIcon,
      title:"Занята Cencel",
    }
  ];
  return (
    <div className={cls.selectedIcon}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <p className={cls.modalTitle}>Статус машины</p>{" "}
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

        {
          data.map(item => (
            <CheckBoxComponent key={item.id}  onClick={() => setIconStatus(item.type)}   active={item.type === iconStatus}>
              <Flex gap={3} alignItems={"center"}>
                <item.icon /> <spa>{item.title}</spa>
              </Flex>
            </CheckBoxComponent>
          ))
        }

      </Box>
      <Flex mt={3} gap={2}>
        <Button
          onClick={() =>setCenterModalType(``) }
          className={cls.topButton}
          variant="secondaryWhite"
          size="md"
          border="1px solid #D0D5DD"
        >
          Отменить
        </Button>
        <Button isDisabled={Boolean(!iconStatus)} onClick={statusIconChange} className={cls.topButton} size="md">
          Предложить
        </Button>
      </Flex>
    </div>
  );
};

export default ChangeIconModal;
