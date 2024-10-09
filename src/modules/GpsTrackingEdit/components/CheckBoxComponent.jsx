import { CircleCheckIcon, GreenCheckIcon } from "@/assets/icons/icons";
import { background, Box, Flex } from "@chakra-ui/react";

const CheckBoxComponent = ({ children, active,status, ...props }) => {
  return (
    <Flex
      {...props}
      mt={2}
      position={`relative`}
      justifyContent={"space-between"}
      background={active ? `rgba(240, 237, 246, 1)` : status ? `rgba(240, 237, 246, 1)` : `` }
      cursor={status ? `not-allowed` : `pointer`}
      p={`14px 21px`}
      borderRadius={`12px`}
      _hover={{ background: `rgba(240, 237, 246, 1)` }}
      _after={{width:`100%`,height:`100%`,position:`absolute`,zIndex:`22343434`,background:`red`,top:0}}
      width={`100%`}
      alignItems={`center`}
    >
      {children}
      {active ? <GreenCheckIcon /> : status ? <GreenCheckIcon /> :  <CircleCheckIcon />}
    </Flex>
  );
};

export default CheckBoxComponent;
