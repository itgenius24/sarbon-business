import { CircleCloseIcon, DeleteIcon } from "@/assets/icons/icons";
import { Button } from "@chakra-ui/react";

export const DeleteButton = ({
  isDisabled,
  visibility,
  variant = "reset",
  color = "brand.400",
  children,
  onClick = () => {},
  ...props
}) => {

  return <Button
    isDisabled={isDisabled}
    visibility={visibility}
    variant={variant}
    onClick={onClick}
    color={color}
    rightIcon={<CircleCloseIcon color="#98A2B3" />}
    {...props}
  >
    {children}
  </Button>;
};
