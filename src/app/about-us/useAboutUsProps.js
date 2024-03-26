import { useGetDirectory, useGetPartnersCompany } from "@/services/api";

export const useAboutUsProps = () => {
  const crumbs = [
    {
      title: "Главная",
      href: "/",
    },
    { title: "О системе Logistics", },
  ];

  const directory = useGetDirectory({ data: JSON.stringify({ status:["about_system_logistics"], with_relations: true }), });

  const partners = useGetPartnersCompany({ data: JSON.stringify({ status:["partners company"], with_relations: true }), });

  return {
    directory: directory.data?.response?.[0],
    partners: partners.data?.response,
    crumbs
  };

};
