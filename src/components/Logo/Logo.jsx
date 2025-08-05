import { useGetLang } from "@/hooks/useGetLang";
import { useStoreHydration } from "@/hooks/useStoreHydration";
import authStore from "@/store/auth.store";
import Image from "next/image";
import Link from "next/link";
import cls from "./styles.module.scss";

export const Logo = ({ width = 150, height = 150 }) => {

  const locale = useGetLang();
  const isHydrated = useStoreHydration();

  // Check if user is authenticated
  const isAuth = isHydrated ? authStore?.token?.access_token : false;

  // Redirect to auth page if not logged in, otherwise to home
  const href = isAuth ? `/${locale}` : `/${locale}/auth`;

  return <Link href={href} className={cls.logoLInk}>
    <Image
      width={width}
      height={height}
      src={"/svg/logo.svg"}
      alt="logo"
    />
  </Link>;
};
