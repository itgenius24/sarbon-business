import cls from "./styles.module.scss";
import Image from "next/image";
import SmallLogoIcon from "@/assets/images/small-logo.svg";

export const MobileLogo = () => {
  return <div className={cls.mobileLogo}>
    <Image src={SmallLogoIcon} width={343} height={103} alt="logo" />
  </div>;
};
