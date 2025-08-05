import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { useGetDirectory } from "@/services/api";

export const useTermsProps = () => {

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const crumbs = [
    {
      title: t("Главная"),
      href: "/",
    },
    { title: t("Terms and Conditions"), },
  ];

  const directory = useGetDirectory({ data: JSON.stringify({ status:["terms"], with_relations: true }), });

  return { directory: directory.data?.response?.[0], crumbs, t };
};
