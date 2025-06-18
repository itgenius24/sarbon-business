import Image from "next/image";
import cls from "./styles.module.scss";
import Auth1 from "@/assets/images/auth4.jpg";
import Auth2 from "@/assets/images/auth6.jpg";
import Auth3 from "@/assets/images/auth3.jpg";

import { useGetLang } from "@/hooks/useGetLang";
import { useTranslation } from "@/app/i18n/client";
import { useSearchParams } from "next/navigation";

export const InfoBox = () => {
  const locale = useGetLang();
  const searchParams = useSearchParams();
  const { t } = useTranslation(locale, "translations");
  const im =
    searchParams.get(`type`) == 0
      ? Auth1
      : searchParams.get(`type`) == 1
      ? Auth2
      : searchParams.get(`type`) == 2
      ? Auth3
      : Auth1;


  return (
    <div className={cls.infoBox}>
      <Image
        width={1000}
        height={1000}
        className={cls.image}
        src={im}
        alt="Auth1"
      />
    </div>
  );
};
