import cls from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@chakra-ui/react";

export const Logo = ({ width = 35, height = 35 }) => {

  return <Link href="/" className={cls.logoLInk}>
    <Image
      width={width}
      height={height}
      src={"/svg/logo.svg"}
      alt="logo"
    />
    <Box as="span">Logistics</Box>
  </Link>;
};
