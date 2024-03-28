import { Box, Text } from "@chakra-ui/react";
import EyeImg from "@/assets/images/eye.png";
import ClockImg from "@/assets/images/clock.png";
import Image from "next/image";

const img = "https://s3-alpha-sig.figma.com/img/64a9/effb/fd1dc08b66b1f70fbd77b7317b2caeab?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=f8ufnDLOztFnZzy0ZrPF1AetCHsdNLCen9A~oLwnm2UeIQT3vLPGje2N50DRYE7M~nM4bsov4~-9tf9k3flRBLHa4NzLGkJsKAnXh1fy7PTSbF5B3GZWTlqFre~d2qvh~QM2kHU-ui7dTAdkg6pwysjC1a-oAH8JD1AjYE9SvrrlyJFyWxs39oR-72vymcIiQaxLfI2bjcmuKykSX8Ckw8E3B~yGBr9Hy2unGPdy8FIr5ROWFcXh9sqEENd72oC9KMYIePYQbqzjE-9IycRvBDmFzHcEXQ3W0k2YPk7i1K9jlmvyf-z-R~cjLaOSAzp0cCCxbvU12TZZ5YCBBCsO3Q__";

export const Banner = () => {

  return <Box
    backgroundImage={img}
    p="64px"
    borderRadius="40px"
    display="flex"
    columnGap="32px"
  >
    <Box flexGrow={1} display="flex" columnGap="32px" >
      <Box flexGrow={1} textAlign="center" color="baseWhite" bgColor="rgba(0, 0, 0, 0.3)" backdropFilter="blur(8px)" borderRadius="20px" p="32px 24px">
        <Box mb="12px" display="flex" justifyContent="center">
          <Image width="70px" height="70px" src={EyeImg} alt="eye" />
        </Box>
        <Text fontWeight="600" fontSize="18px" lineHeight="28px">Views</Text>
        <Text fontWeight="600" fontSize="45px" lineHeight="60px">400</Text>
      </Box>
      <Box flexGrow={1} textAlign="center" color="baseWhite" bgColor="rgba(0, 0, 0, 0.3)" backdropFilter="blur(8px)" borderRadius="20px" p="32px 24px">
        <Box mb="12px" display="flex" justifyContent="center">
          <Image width="70px" height="70px" src={ClockImg} alt="clock" />
        </Box>
        <Text fontWeight="600" fontSize="18px" lineHeight="28px">Views</Text>
        <Text fontWeight="600" fontSize="45px" lineHeight="60px">400</Text>
      </Box>
    </Box>

  </Box>;
};
