import { Dropdown } from "@/components/Dropdown";
import { useGetLang } from "@/hooks/useGetLang";
import { useGetCityList } from "@/services/api";

export const DropdownWrapper = ({ searchName, watch, ...props }) => {

  const locale = useGetLang();

  const getCity = useGetCityList({
    data: JSON.stringify(
      {
        view_fields: ["name_ru", "name_en", "name"],
        with_relations: true,
        search: watch(searchName),
      },
      { enabled: !!watch(searchName), }
    )
  });

  const getAddressOptions = getCity.data?.response?.map(item => ({ label: `${item["name_" + (locale === "uz" ? "en" : locale)]} ${item.address_id_data?.name}`, value: item.address_id_data?.guid, guid: item?.guid, addressId: item.address_id }));

  return <Dropdown watch={watch} options={getAddressOptions} searchName={searchName} {...props} />;
};
