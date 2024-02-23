import { useEffect, useState } from "react";

export const useGetStoreData = (store, key) => {
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(store[key]);
  }, [store, key]);

  return { value };
};
