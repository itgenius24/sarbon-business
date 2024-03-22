import { Card, CardBody, CardFooter, Divider } from "@chakra-ui/react";
import React from "react";

export const MainContentCard = ({ children, footer, ...rest }) => {
  return (
    <Card
      mt="32px"
      variant="outline"
      rounded="12px"
      bg="white"
      borderColor="brand.200"
      {...rest}
    >
      {children && <CardBody p="24px">{children}</CardBody>}
      {footer && (
        <>
          <Divider />
          <CardFooter p="17px 24px" >{footer}</CardFooter>
        </>
      )}
    </Card>
  );
};
