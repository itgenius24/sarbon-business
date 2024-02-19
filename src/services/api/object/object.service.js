import request from "@/services/request";
import { useQuery } from "@tanstack/react-query";

const objectService = {
  getCompanyList: (params) => request.get("/v2/object-slim/get-list/company", { params }),
  getRoleList: (params) => request.get("/v2/object-slim/get-list/role", { params }),
};


export const useGetCompanyList = (params) => {
  return useQuery({
    queryKey: ["object/getCompanyList", params],
    queryFn: () => objectService.getCompanyList(params),
  });
};

export const useGetRoleList = (params, props) => {
  return useQuery({
    queryKey: ["object/getRoleList", params],
    queryFn: () => objectService.getRoleList(params),
    ...props
  });
};
