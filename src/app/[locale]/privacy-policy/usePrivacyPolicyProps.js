import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";
import { useGetDirectory } from "@/services/api";

export const usePrivacyPolicyProps = () => {

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const crumbs = [
    {
      title: t("Главная"),
      href: "/",
    },
    { title: t("Privacy Policy for Sarbon"), },
  ];

  const directory = useGetDirectory({ data: JSON.stringify({ status:["directory"], with_relations: true }), });

  return { directory: directory.data?.response?.[0], crumbs, t };
};
