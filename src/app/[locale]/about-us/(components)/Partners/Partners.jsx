import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

export const Partners = ({ partners, t }) => {

  return <Box pt="124px" pb="192px">
    <Heading textAlign="center" mb="20px" fontSize="36px" lineHeight="44px">{t("Наши партнеры")}</Heading>
    <Text color="brand.600" textAlign="center" fontSize="20px" lineHeight="30px">Trusted by 4,000+ companies</Text>
    <Box mt="32px" display="flex" columnGap="47px" justifyContent="center">
      {
        partners?.map((partner, index) => (
          <Image style={{ objectFit: "contain", height: "48px" }} src={partner.photo} key={index} alt="" width="198" height="48" />
        ))
      }
    </Box>
  </Box>;
};
