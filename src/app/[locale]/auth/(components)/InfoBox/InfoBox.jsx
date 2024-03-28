import Image from "next/image";
import cls from "./styles.module.scss";
import BigLogoIcon from "@/assets/images/big-logo.svg";

export const InfoBox = () => {

  return <div className={cls.infoBox}>
    <div className={cls.infoWrap}>
      <div className={cls.logoWrap}>
        <Image src={BigLogoIcon} alt="logo" className={cls.logo} width={170} height={170} />
      </div>
      <div className={cls.textWrap}>
        <h1 className={cls.textWrapTitle}>
          “Logistics — биржа грузоперевозок и крупнейшая экосистема
          сервисов для транспортной логистики в Узбекистане”
        </h1>
        <h1 className={cls.textWrapTitle}>Впервые у нас?</h1>
        <p className={cls.desc}>
          Зарегистрируйтесь и сможете размещать свои грузы и машины,
          общаться на форуме и многое другое
        </p>
      </div>
    </div>
  </div>;
};
