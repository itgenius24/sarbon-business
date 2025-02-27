import { Card, CardBody, CardFooter, Divider, useMediaQuery } from "@chakra-ui/react";
import React from "react";

export const MainContentCard = ({ children, footer, ...rest }) => {
  const [isLargerThan845] = useMediaQuery("(min-width: 845px)");
  return (
    <Card
      variant="outline"
      rounded="12px"
      bg="white"
      borderColor="brand.200"
      {...rest}
    >
      {children && <CardBody p={isLargerThan845 ? "40px" : "10px"}>{children}</CardBody>}
      {footer && (
        <>
          <Divider />
          <CardFooter p="17px 24px" >{footer}</CardFooter>
        </>
      )}
    </Card>
  );
};
