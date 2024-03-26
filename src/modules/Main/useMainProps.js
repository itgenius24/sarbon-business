import { useGetPartnersCompany } from "@/services/api";

export const useMainProps = () => {

  const getBanner = useGetPartnersCompany({
    data: JSON.stringify({
      status: ["banner"],
      with_relations: true,
    })
  });

  return { banner: getBanner.data?.response[0] };
};
