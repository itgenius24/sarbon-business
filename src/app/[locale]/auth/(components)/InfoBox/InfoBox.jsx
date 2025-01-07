import Image from "next/image";
import cls from "./styles.module.scss";
import BigLogoIcon from "@/assets/images/logo.svg";
import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";
import clsx from "clsx";

export const InfoBox = () => {

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  return <div className={cls.infoBox}>
    <div className={cls.infoWrap}>
      <div className={clsx(cls.logoWrap)}>
        <Image src={BigLogoIcon} alt="logo" className={cls.logo} width={235} height={235} />
      </div>
      <div className={cls.textWrap}>
        <h1 className={cls.textWrapTitle}>
          {t("Furgo — биржа грузоперевозок и крупнейшая экосистема сервисов для транспортной логистики в Узбекистане")}
        </h1>
        <h1 className={cls.textWrapTitle}>{t("Впервые у нас?")}</h1>
        <p className={cls.desc}>
          {t("Зарегистрируйтесь и сможете размещать свои грузы и машины, общаться на форуме и многое другое")}
        </p>
      </div>
    </div>
  </div>;
};
