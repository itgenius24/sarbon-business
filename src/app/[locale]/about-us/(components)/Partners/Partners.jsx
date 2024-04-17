import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

export const Partners = ({ partners, isLargerThan768, t }) => {

  return <Box pt={isLargerThan768 ? "124px" : "64px"} pb={isLargerThan768 ? "192px" : "40px"}>
    <Heading textAlign="center" mb={isLargerThan768 ? "20px" : "4px"} fontSize={isLargerThan768 ? "36px" : "24px"} lineHeight={isLargerThan768 ? "44px" : "32px"}>{t("Наши партнеры")}</Heading>
    <Text color="brand.600" textAlign="center" fontSize="20px" lineHeight="30px">Trusted by 4,000+ companies</Text>
    <Box
      mt={isLargerThan768 ? "32px" : "24px"}
      display="flex"
      columnGap="47px"
      justifyContent="center"
      overflow={isLargerThan768 ? "visible" : "auto"}
    >
      {
        partners?.map((partner, index) => (
          <Image style={{ objectFit: "contain", height: "48px" }} src={partner.photo} key={index} alt="" width="198" height="48" />
        ))
      }
    </Box>
  </Box>;
};
