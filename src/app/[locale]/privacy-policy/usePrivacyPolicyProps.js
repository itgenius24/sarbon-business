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
    { title: t("Политика конфиденциальности"), },
  ];

  const directory = useGetDirectory({ data: JSON.stringify({ status:["politeka_confidentiality"], with_relations: true }), });

  return { directory: directory.data?.response?.[0], crumbs, t };
};
