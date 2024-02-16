import { createContext, useContext } from "react";

const AuthContext = createContext({
  smsId: "",
  setSmsId: () => {},
  phone: "",
  setPhone: () => {},
  clientTypeId: "",
  setClientTypeId: () => {},
  roleId: "",
  setRoleId: () => {},
});

export default function AuthProvider({ children, value }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
