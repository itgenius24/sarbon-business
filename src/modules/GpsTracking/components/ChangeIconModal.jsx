
import { CencelMapIcon, CheckBlueIcon, CloseIconModal, GreenCarIcon, QuestionBlueIcon } from "@/assets/icons/icons";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import CheckBoxComponent from "./CheckBoxComponent";


const ChangeIconModal = ({cls}) => {
  return (
    <div className={cls.selectedIcon}>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
            <p className={cls.modalTitle}>Статус машины</p> <IconButton variant={'outline'} border={'none'} background={'white'} width={'50px'} icon={<CloseIconModal/>} />
        </Flex>
        <Box>
        <CheckBoxComponent active={true}>
               <Flex gap={3} alignItems={'center'}>
                 <GreenCarIcon /> <spa>Свободна</spa>
               </Flex>
        </CheckBoxComponent>
        <CheckBoxComponent >
               <Flex gap={3} alignItems={'center'}>
                 <CheckBlueIcon /> <spa>Занята нашим грузом</spa>
               </Flex>
        </CheckBoxComponent>
        <CheckBoxComponent >
               <Flex gap={3} alignItems={'center'}>
                 <QuestionBlueIcon /> <spa>Занята чужим грузом</spa>
               </Flex>
        </CheckBoxComponent>
        <CheckBoxComponent >
               <Flex gap={3} alignItems={'center'}>
                 <CencelMapIcon /> <spa>Занята чужим грузом</spa>
               </Flex>
        </CheckBoxComponent>
        
        </Box>
    </div>
  );
};

export default ChangeIconModal;