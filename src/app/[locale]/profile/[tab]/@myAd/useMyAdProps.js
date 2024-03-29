
import { useGetLang } from "@/hooks/useGetLang";
import { useGetCarsOnSale } from "@/services/api";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const carParam = {
  publish: {
    status: ["active"],
    with_relations: true,
  },
  archive: { status: ["in_active"], },
};
export const useMyAdProps = () => {
  const { id } = useParams();
  const { push } = useRouter();

  const locale = useGetLang();

  const openCreateAdCard = () => {
    push(`/${locale}/profile/my-ad/detail`);
  };

  const [tabState, setTabState] = useState("publish");

  const changeTabState=({ value }) => {
    if(value) {
      setTabState(value);
    }
  };

  const {
    data: carsList = [],
    isLoading,
  } = useGetCarsOnSale(
    {
      data: JSON.stringify({
        ...carParam[tabState],
        users_id: id,
        with_relations: true,
      }),
    },
    {
      select: (res) => {
        return res?.response;
      },
    }
  );

  return {
    changeTabState,
    carsList,
    isLoading,
    openCreateAdCard,
    tabState,
  };
};
