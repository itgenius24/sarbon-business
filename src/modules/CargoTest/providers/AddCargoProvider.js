import { createContext, useContext } from "react";


const AddCargoContext = createContext({
  register: () => {},
  control: {},
  setValue: () => {},
  handleSubmit: () => {},
  onSubmit: () => {},
  watch: () => {},
  errors: {},
});

export const AddCargoProvider = ({ children, value }) => {
  return <AddCargoContext.Provider value={value}>
    {children}
  </AddCargoContext.Provider>;
};

export const useAddCargoContext = () => {
  return useContext(AddCargoContext);
};
