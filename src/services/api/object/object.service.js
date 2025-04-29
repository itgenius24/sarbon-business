import request from "@/services/request";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

const objectService = {
  getCarsOnSale: (params) =>
    request.get("/v2/object-slim/get-list/car_sale", { params }),
  getManualList: (params) =>
    request.get("/v2/object-slim/get-list/directory", { params }),
  getNewsList: (params) =>
    request.get("/v2/object-slim/get-list/news", { params }),

  getCompanyList: (params) =>
    request.get("/v2/object-slim/get-list/firm", { params }),
  getRoleList: (params) =>
    request.get("/v2/object-slim/get-list/role", { params }),
  getCargoType: (params) =>
    request.get(`/v2/object-slim/get-list/cargo_type`, { params }),
  getMeasurement: (params) =>
    request.get("/v2/object-slim/get-list/measurement", { params }),
  getAddress: (params) =>
    request.get("/v2/object-slim/get-list/address", { params }),
  getCarType: (params) =>
    request.get("/v2/object-slim/get-list/vehicle_type", { params }),
  getTrailerType: (params) =>
    request.get("/v2/object-slim/get-list/trailer_type", { params }),
  getUserData: (params) =>
    request.get("/v2/object-slim/get-list/users", { params }),
  getCarNumber: (params) =>
    request.get("/v2/object-slim/get-list/vehicle", { params }),
  getUserGpsData: (params) =>
    request.get("/v2/object-slim/get-list/users_gps", { params }),
  getUserGpsBYData: (params) =>
    request.get("/v2/object-slim/get-list/users", { params }),
  getVehicle: (params) =>
    request.get("/v2/object-slim/get-list/vehicle", { params }),

  getCurrency: (params) =>
    request.get("/v2/object-slim/get-list/currency", { params }),
  getPackage: (params) =>
    request.get("/v2/object-slim/get-list/packages", { params }),
  getPaymentType: (params) =>
    request.get("/v2/object-slim/get-list/map", { params }),
  getUserCargo: (params) =>
    request.get("/v2/object-slim/get-list/cargo", { params }),
  getCargoAll: (data) => request.post("/v2/object/get-list/cargo", data),
  getCarList: (params) =>
    request.get("/v2/object-slim/get-list/route", { params }),

  getOffer: (params) =>
    request.get("/v2/object-slim/get-list/order", { params }),
  getOfferDispatcher: (params) =>
    request.get("/v2/object-slim/get-list/dispatcher_drivers", { params }),
  getOfferDispatcherFirms: (params) =>
    request.get("/v2/object-slim/get-list/dispatcher_and_firms", { params }),
  getCargoById: (params) =>
    request.get("/v2/object-slim/get-list/cargo", { params }),
  getMaps: (params) =>
    request.get("/v2/object-slim/get-list/period", { params }),
  getDirectory: (params) =>
    request.get("/v2/object-slim/get-list/directory", { params }),
  getPartners: (params) =>
    request.get("/v2/object-slim/get-list/partners_company", { params }),
  getCityList: (params) =>
    request.get("/v2/object-slim/get-list/city", { params }),
  getCityCar: (params) =>
    request.get("/v2/object-slim/get-list/vehicle_type", { params }),
  getLoadingTypes: (params) =>
    request.get("/v2/object-slim/get-list/load_type", { params }),
  getUsers: (params) =>
    request.get("/v2/object-slim/get-list/users", {
      params,
    }),
  getGPSHistory: (params) =>
    request.get("/v2/object-slim/get-list/gps_history", { params }),
  getDriverLocation: (params) =>
    request.get("/v2/object-slim/get-list/users_gps", { params }),

  deleteDis: (data) =>
    request.delete(
      `/v1/object/project-id=f539f64b-961e-4c6c-8534-140091f7f27b`,
      { data }
    ),
  checkUser: (data) => request.post("/v2/object/get-list/users", data),
  getCargo: (params) =>
    request.get("/v2/object-slim/get-list/cargo", { params }),
  getNote: (params) => request.get("/v2/object-slim/get-list/note", { params }),
  updateNote: (data) => request.put(`/v2/items/note`, data),
  getDriverPosition: (params) =>
    request.get("/v2/object-slim/get-list/gps_history", { params }),
  getPhoneUser: (params) =>
    request.get("/v2/object-slim/get-list/users", { params }),
  getActionUser: (params) =>
    request.get("/v2/object-slim/get-list/action_histories", { params }),
  getCountApk: (params) =>
    request.get("/v2/object-slim/get-list/apk", { params }),
  getRole: (params) => request.get("/v2/object-slim/get-list/role", { params }),
};

export const useGetUserPost = ({ data, querySettings }) => {
  return useQuery({
    queryKey: ["checkUserRegister", data],
    queryFn: () => objectService.checkUser(data),
    ...querySettings,
  });
};
export const useGetRole = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  return useQuery({
    queryKey: ["object/getRole", params],
    queryFn: () => objectService.getRole(params),
    ...querySettings,
  });
};

export const useGetActionUser = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  return useQuery({
    queryKey: ["object/getActionUser", params],
    queryFn: () => objectService.getActionUser(params),
    ...querySettings,
  });
};

export const useGetDriverPosition = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  return useQuery({
    queryKey: ["object/getDriverPosition", params],
    queryFn: () => objectService.getDriverPosition(params),
    ...querySettings,
  });
};

export const useGetCargoList = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  return useQuery({
    queryKey: ["object/getCargo", params],
    queryFn: () => objectService.getCargo(params),
    ...querySettings,
  });
};

export const useGetCarById = (
  params = { data: JSON.stringify({}) },
  settings
) => {
  return useQuery({
    queryKey: ["object/getCarsOnSale", params],
    queryFn: () => objectService.getCarsOnSale(params),
    ...settings,
  });
};

export const useGetNoteList = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  return useQuery({
    queryKey: ["object/getNote", params],
    queryFn: () => objectService.getNote(params),
    ...querySettings,
  });
};

export const useGetCarsOnSale = (
  params = { data: JSON.stringify({}) },
  settings
) => {
  return useQuery({
    queryKey: ["object/getCarsOnSale", params],
    queryFn: () => objectService.getCarsOnSale(params),
    ...settings,
  });
};

export const useGetManualList = (
  params = { data: JSON.stringify({}) },
  settings
) => {
  return useQuery({
    queryKey: ["object/getManualList", params],
    queryFn: () => objectService.getManualList(params),
    ...settings,
  });
};

export const useGetCountApk = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  return useQuery({
    queryKey: ["object/getCountApk", params],
    queryFn: () => objectService.getCountApk(params),
    ...querySettings,
  });
};

export const useGetPhone = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => objectService.getPhoneUser(data),
    ...mutationSettings,
  });
};

export const useUpdateNoteData = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => objectService.updateNote(data),
    ...mutationSettings,
  });
};

export const useGetCarListOnSubmit = (mutationSettings) => {
  return useMutation({
    mutationFn: (params) => objectService.getCarList(params),
    ...mutationSettings,
  });
};

export const useDeleteDisAll = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => objectService.deleteDis(data),
    ...mutationSettings,
  });
};



export const useGetUserGpsBYData = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => objectService.getUserGpsBYData(data),
    ...mutationSettings,
  });
};

export const useGetNewsList = (
  params = { data: JSON.stringify({}) },
  settings
) => {
  return useQuery({
    queryKey: ["object/getNewsList", params],
    queryFn: () => objectService.getNewsList(params),
    ...settings,
  });
};
export const useGetLocation = (
  params = {
    data: JSON.stringify({ cargo_type: ["cargo"], order_status: ["active"] }),
  },
  settings
) => {
  return useQuery({
    queryKey: ["object/location", params],
    queryFn: () => objectService.getLocation(params),
    ...settings,
  });
};

export const useGetCompanyList = (params, props) => {
  return useQuery({
    queryKey: ["object/getCompanyList", params],
    queryFn: () => objectService.getCompanyList(params),
    ...props,
  });
};

export const useGetRoleList = (params, props) => {
  return useQuery({
    queryKey: ["object/getRoleList", params],
    queryFn: () => objectService.getRoleList(params),
    ...props,
  });
};

export const useGetCargoType = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  return useQuery({
    queryKey: ["object/getCargoType", params],
    queryFn: () => objectService.getCargoType(params),
    ...querySettings,
  });
};

export const useGetMeasurement = (params = { data: JSON.stringify({}) }) => {
  return useQuery({
    queryKey: ["object/getMeasurement", params],
    queryFn: () => objectService.getMeasurement(params),
  });
};

export const useGetAddress = (params = { data: JSON.stringify({}) }) => {
  return useQuery({
    queryKey: ["object/getAddress", params],
    queryFn: () => objectService.getAddress(params),
  });
};

export const useGetCarType = (
  params = { data: JSON.stringify({}) },
  settings = {}
) => {
  return useQuery({
    queryKey: ["object/getCarType", params],
    queryFn: () => objectService.getCarType(params),
    ...settings,
  });
};

export const useGetTrailerType = (
  params = { data: JSON.stringify({}) },
  settings = {}
) => {
  return useQuery({
    queryKey: ["object/getTrailerType", params],
    queryFn: () => objectService.getTrailerType(params),
    ...settings,
  });
};
// export const useGetUserData = ({params, settings = {}}) => {
//   return useQuery({
//     queryKey: ["object/getUserDta", params],
//     queryFn: () => objectService.getUserData({params}),
//     ...settings,
//   });
// };

export const useGetUserData = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  return useQuery({
    queryKey: ["object/getCargo", params],
    queryFn: () => objectService.getUserData(params),
    ...querySettings,
  });
};

export const useGetUserCargo2 = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  return useQuery({
    queryKey: ["object/getCargo2212", params],
    queryFn: () => objectService.getUserCargo(params),
    ...querySettings,
  });
};

export const useGetUserCargoAll = ({ data, querySettings }) => {
  return useQuery({
    queryKey: ["getCargoAll", data],
    queryFn: () => objectService.getCargoAll(data),
    ...querySettings,
  });
};

export const useGetVehicle2 = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  return useQuery({
    queryKey: ["object/getVehicle233", params],
    queryFn: () => objectService.getVehicle(params),
    ...querySettings,
  });
};

export const useGetUserCargo = (params, settings) => {
  return useQuery({
    queryKey: ["object/getUserCargo", params],
    queryFn: () => objectService.getUserCargo(params),
    ...settings,
  });
};

export const useGetUserCargoPa = (params, settings) => {
  return useQuery({
    queryKey: ["object/getUserCargoPA", params],
    queryFn: () => objectService.getUserCargo(params),
    ...settings,
  });
};

export const useGetCarNumber = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  return useQuery({
    queryKey: ["object/getCarNumber", params],
    queryFn: () => objectService.getCarNumber(params),
    ...querySettings,
  });
};

export const useGetUserGpsData = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  return useQuery({
    queryKey: ["object/getCargoGps", params],
    queryFn: () => objectService.getUserGpsData(params),
    ...querySettings,
  });
};

export const useGetUserGpsByIDData = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  return useQuery({
    queryKey: ["object/getCargoGpsBY", params],
    queryFn: () => objectService.getUserGpsBYData(params),
    ...querySettings,
  });
};

export const useGetVehicle = (
  params = { data: JSON.stringify({}) },
  settings = {}
) => {
  return useQuery({
    queryKey: ["object/getVehicle", params],
    queryFn: () => objectService.getVehicle(params),
    ...settings,
  });
};

export const useLoadingTypes = (
  params = { data: JSON.stringify({}) },
  settings = {}
) => {
  return useQuery({
    queryKey: ["object-slim/get-list/load_type", params],
    queryFn: () => objectService.getLoadingTypes(params),
    ...settings,
  });
};

export const useGetCurrency = (
  params = { data: JSON.stringify({}) },
  settings = {}
) => {
  return useQuery({
    queryKey: ["object/getCurrency", params],
    queryFn: () => objectService.getCurrency(params),
    ...settings,
  });
};

export const useGetPackage = (params = { data: JSON.stringify({}) }) => {
  return useQuery({
    queryKey: ["object/getPackage", params],
    queryFn: () => objectService.getPackage(params),
  });
};

export const useGetPaymentType = (params = { data: JSON.stringify({}) }) => {
  return useQuery({
    queryKey: ["object/getPaymentType", params],
    queryFn: () => objectService.getPaymentType(params),
  });
};

export const useGetUserCargoPagination = (params, settings) => {
  return useInfiniteQuery({
    queryKey: ["object/getUserCargoPagination", params],
    queryFn: () => objectService.getUserCargo(params),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    ...settings,
  });
};

export const useGetOffer = (params, settings) => {
  return useQuery({
    queryKey: ["object/getOffer", params],
    queryFn: () => objectService.getOffer(params),
    ...settings,
  });
};

export const useGetOfferTab = (params, settings) => {
  return useQuery({
    queryKey: ["object/getOfferTab", params],
    queryFn: () => objectService.getOffer(params),
    ...settings,
  });
};

export const useGetOfferDispatcher = (params, settings) => {
  return useQuery({
    queryKey: ["object/getOfferDispatcher", params],
    queryFn: () => objectService.getOfferDispatcher(params),
    ...settings,
  });
};

export const useGetOfferDispatcherFirms = (params, settings) => {
  return useQuery({
    queryKey: ["object/getOfferDispatcherFirms", params],
    queryFn: () => objectService.getOfferDispatcherFirms(params),
    ...settings,
  });
};

export const useGetOfferCount = (params, settings) => {
  return useQuery({
    queryKey: ["object/getOfferCount", params],
    queryFn: () => objectService.getOffer(params),
    ...settings,
  });
};

export const useGetOfferPagination = (params, settings) => {
  return useInfiniteQuery({
    queryKey: ["object/getOfferPagination", params],
    queryFn: () => objectService.getOffer(params),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    ...settings,
  });
};

export const useGetOfferById = (params, settings) => {
  return useQuery({
    queryKey: ["object/getOfferById", params],
    queryFn: () => objectService.getOffer(params),
    ...settings,
  });
};

export const useGetCargoById = (params, settings) => {
  return useQuery({
    queryKey: ["object/getCargoById", params],
    queryFn: () => objectService.getCargoById(params),
    ...settings,
  });
};

export const useGetMaps = (params, settings) => {
  return useQuery({
    queryKey: ["object/getMaps", params],
    queryFn: () => objectService.getMaps(params),
    ...settings,
  });
};

export const useGetDirectory = (params, settings) => {
  return useQuery({
    queryKey: ["object/getDirectory", params],
    queryFn: () => objectService.getDirectory(params),
    ...settings,
  });
};

export const useGetPartnersCompany = (params, settings) => {
  return useQuery({
    queryKey: ["object/getPartners", params],
    queryFn: () => objectService.getPartners(params),
    ...settings,
  });
};

export const useGetCityList = (params, settings) => {
  return useQuery({
    queryKey: ["object/getCityList", params],
    queryFn: () => objectService.getCityList(params),
    ...settings,
  });
};

export const useGetCarList = (params, settings) => {
  return useQuery({
    queryKey: ["object/getCarList", params],
    queryFn: () => objectService.getCityCar(params),
    ...settings,
  });
};

export const useGetUsers = (params, settings) => {
  return useQuery({
    queryKey: ["object/users", params],
    queryFn: () => objectService.getUsers(params),
    ...settings,
  });
};

export const useGetGPSHistory = (params, settings) => {
  return useQuery({
    queryKey: ["object/getGPSHistory", params],
    queryFn: () => objectService.getGPSHistory(params),
    ...settings,
  });
};

export const useGetDriverLocation = (params, settings) => {
  return useQuery({
    queryKey: ["object/getDriverLocation", params],
    queryFn: () => objectService.getDriverLocation(params),
    ...settings,
  });
};
