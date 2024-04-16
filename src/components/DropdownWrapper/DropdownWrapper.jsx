import { Dropdown } from "@/components/Dropdown";
import { useGetCityList } from "@/services/api";

export const DropdownWrapper = ({ searchName, watch, ...props }) => {

  const getCity = useGetCityList({
    data: JSON.stringify(
      {
        view_fields: ["name"],
        with_relations: true,
        search: watch(searchName),
      },
      { enabled: !!watch(searchName), }
    )
  });

  const getAddressOptions = getCity.data?.response?.map(item => ({ label: `${item.name} ${item.address_id_data?.name}`, value: item.address_id_data?.guid, guid: item?.guid, addressId: item.address_id }));

  return <Dropdown watch={watch} options={getAddressOptions} searchName={searchName} {...props} />;
};
