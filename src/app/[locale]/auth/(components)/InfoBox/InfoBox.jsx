import Image from "next/image";
import cls from "./styles.module.scss";
import BlueImg from "@/assets/images/Blue.svg";
import PhoneCard from "@/assets/images/phone2x.png";

import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";
import clsx from "clsx";
import { Flex } from "@chakra-ui/react";
import { LikeIconY, MapIconE, TruckIconBlue } from "@/assets/icons/icons";
import { useState } from "react";

export const InfoBox = () => {
  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!isHovered) return;
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 }); // Joyiga qaytish
  };

  const calculateOffset = (speed) => ({
    transform: isHovered
      ? `translate(${(mousePosition.x - window.innerWidth / 2) * speed}px, 
                        ${
                          (mousePosition.y - window.innerHeight / 2) * speed
                        }px)`
      : `translate(0, 0)`, // Asl joyiga qaytadi
    transition: "transform 0.3s ease-out",
  });

  return (
    <div className={cls.infoBox}>
      {/* Each element moves independently */}
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cls.infoWrap}
      >
        <div className={cls.blueCard} style={calculateOffset(0.004)}>
          <Image width={1000} height={1000} src={BlueImg} alt="blueCard" />
        </div>

        <div className={cls.blueText} style={calculateOffset(0.004)}>
          <p className={cls.text}>
            Sarbon — биржа грузоперевозок и экосистема логистических сервисов в
            Евразии
          </p>
        </div>

        <div className={cls.phoneCard} style={calculateOffset(-0.02)}>
          <Image width={980} height={980} src={PhoneCard} alt="PhoneCard" />
        </div>

        <Flex
          gap={`11px`}
          alignItems={`center`}
          className={cls.statist1}
          style={calculateOffset(0.015)}
        >
          <TruckIconBlue />
          <div>
            <p className={cls.title}>700+</p>
            <p className={cls.subTitle}>активных водителей</p>
          </div>
        </Flex>

        <Flex
          gap={`11px`}
          className={cls.statist2}
          style={calculateOffset(0.018)}
        >
          <MapIconE />
          <div>
            <p className={cls.title}>GPS -Треккинг</p>
            <p className={cls.subTitle}>мониторинг груза на карте</p>
          </div>
        </Flex>

        <Flex
          gap={`11px`}
          className={cls.statist3}
          style={calculateOffset(0.024)}
        >
          <LikeIconY />
          <div>
            <p className={cls.title}>99.9%</p>
            <p className={cls.subTitle}>успешных грузоперевозок</p>
          </div>
        </Flex>
      </div>
    </div>
  );
};

// import Image from "next/image";
// import cls from "./styles.module.scss";
// import BigLogoIcon from "@/assets/images/logo.svg";
// import { useGetLang } from "@/hooks/useGetLang";
// import { useTranslation } from "@/app/i18n/client";
// import clsx from "clsx";

// export const InfoBox = () => {

//   const locale = useGetLang();

//   const { t } = useTranslation(locale, "translations");

//   return <div className={cls.infoBox}>
//     <div className={cls.infoWrap}>
//       <div className={clsx(cls.logoWrap)}>
//         <Image src={BigLogoIcon} alt="logo" className={cls.logo} width={235} height={235} />
//       </div>
//       <div className={cls.textWrap}>
//         <h1 className={cls.textWrapTitle}>
//           {t("Sarbon — биржа грузоперевозок и крупнейшая экосистема сервисов для транспортной логистики в Узбекистане")}
//         </h1>
//         <h1 className={cls.textWrapTitle}>{t("Впервые у нас?")}</h1>
//         <p className={cls.desc}>
//           {t("Зарегистрируйтесь и сможете размещать свои грузы и машины, общаться на форуме и многое другое")}
//         </p>
//       </div>
//     </div>
//   </div>;
// };
