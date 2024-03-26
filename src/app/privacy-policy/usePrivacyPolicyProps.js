import { useGetDirectory } from "@/services/api";

export const usePrivacyPolicyProps = () => {

  const crumbs = [
    {
      title: "Главная",
      href: "/",
    },
    { title: "Политика конфиденциальности", },
  ];

  const directory = useGetDirectory({ data: JSON.stringify({ status:["politeka_confidentiality"], with_relations: true }), });

  return { directory: directory.data?.response?.[0], crumbs };
};
