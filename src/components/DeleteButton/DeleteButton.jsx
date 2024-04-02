import { DeleteIcon } from "@/assets/icons/icons";
import { Button } from "@chakra-ui/react";

export const DeleteButton = ({
  isDisabled,
  visibility,
  variant = "reset",
  color = "brand.700",
  children,
  onClick = () => {},
}) => {

  return <Button
    isDisabled={isDisabled}
    visibility={visibility}
    variant={variant}
    onClick={onClick}
    color={color}
    leftIcon={<DeleteIcon />}
  >
    {children}
  </Button>;
};
