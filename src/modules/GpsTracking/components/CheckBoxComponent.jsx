import { CircleCheckIcon, GreenCheckIcon } from "@/assets/icons/icons";
import { background, Box, Flex } from "@chakra-ui/react";

const CheckBoxComponent = ({ children, active }) => {
  return (
    <Flex mt={2} justifyContent={'space-between'} background={active ? `rgba(240, 237, 246, 1)` : `` } p={`14px`} borderRadius={`12px`} _hover={{background:`rgba(240, 237, 246, 1)`}}   width={`100%`} alignItems={`center`}>
      {children}
      {active ? <GreenCheckIcon /> : <CircleCheckIcon />}
    </Flex>
  );
};

export default CheckBoxComponent;
