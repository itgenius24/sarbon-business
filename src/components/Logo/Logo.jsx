import cls from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@chakra-ui/react";
import { useGetLang } from "@/hooks/useGetLang";

export const Logo = ({ width = 150, height = 150 }) => {

  const locale = useGetLang();

  return <Link href={`/${locale}`} className={cls.logoLInk}>
    <Image
      width={width}
      height={height}
      src={"/svg/logo.svg"}
      alt="logo"
      // style={{ borderRadius: "50%" }}
    />
    {/* <Box as="span">Furgo</Box> */}
  </Link>;
};
