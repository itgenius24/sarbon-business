import { Dropdown } from "@/components/Dropdown";
import { useGetLang } from "@/hooks/useGetLang";
import { useGetCarList, useGetCityList } from "@/services/api";

export const DropdownWrapperCar = ({ searchName, watch, ...props }) => {
  const locale = useGetLang();

  const getCar = useGetCarList({
    data: JSON.stringify(
      {
        offset: 0,
        limit: 20,
        order: {},
        view_fields: ["name"],
        with_relations: true,
        search: watch(searchName),
      },
      { enabled: !!watch(searchName) }
    ),
  });

  const getAddressOptions = getCar.data?.response?.map((item) => ({
    label: item.name,
    value: item.guid
    // guid: item?.guid,
    // addressId: item.address_id,
  }));

  return (
    <Dropdown
      watch={watch}
      options={getAddressOptions}
      searchName={searchName}
      {...props}
    />
  );
};
