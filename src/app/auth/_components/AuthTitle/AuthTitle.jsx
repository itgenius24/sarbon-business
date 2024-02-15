import { Box } from "@chakra-ui/react";
import cls from "./styles.module.scss";

export const AuthTitle = ({ title, subtitle, ...props }) => {
  return <Box as="div" {...props}>
    <h2 className={cls.title}>{title}</h2>
    <p className={cls.subtitle}>{subtitle}</p>
  </Box>;
};
