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
  getUserGpsData: (params) =>
    request.get("/v2/object-slim/get-list/users_gps", { params }),
  getVehicle: (params) =>
    request.get("/v2/object-slim/get-list/vehicle", { params }),

  getVehicleSin: (params) => request.get(`/v2/items/vehicle/${params.id}`),
  getCurrency: (params) =>
    request.get("/v2/object-slim/get-list/currency", { params }),
  getPackage: (params) =>
    request.get("/v2/object-slim/get-list/packages", { params }),
  getPaymentType: (params) =>
    request.get("/v2/object-slim/get-list/map", { params }),
  getUserCargo: (params) =>
    request.get("/v2/object-slim/get-list/cargo", { params }),
  getCarList: (params) =>
    request.get("/v2/object-slim/get-list/route", { params }),
  getLogistikaGpsTrackingFilterDriver: (data) =>
    request.post(
      "/v1/invoke_function/logistika-gps-tracking-filter-driver",
      data
    ),
  getCar: (data) =>
    request.post("/v1/invoke_function/logistika-get-cargo-list", data),
  getLocation: (data) =>
    request.post("v1/invoke_function/logistika-get-cargo-for-map", data),
  getOffer: (params) =>
    request.get("/v2/object-slim/get-list/response", { params }),
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

export const useGetCarListOnSubmit = (mutationSettings) => {
  return useMutation({
    mutationFn: (params) => objectService.getCarList(params),
    ...mutationSettings,
  });
};

export const useGetCar = (mutationSettings) => {
  return useMutation({
    mutationFn: (params) => objectService.getCar(params),
    ...mutationSettings,
  });
};

export const useLogistikaGpsTrackingFilterDriver = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) =>
      objectService.getLogistikaGpsTrackingFilterDriver(data),
    ...mutationSettings,
  });
};

export const useLocation = (mutationSettings) => {
  return useMutation({
    mutationFn: (data) => objectService.getLocation(data),
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
    ...props,
  });
};

export const useGetCargoType = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  console.log(`querySettings`, querySettings, params);
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
    querySettings,
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

export const useGetVehicleSingle = ({
  params = { data: JSON.stringify({}) },
  querySettings,
}) => {
  return useQuery({
    queryKey: ["object/getCargo", params],
    queryFn: () => objectService.getVehicleSin(params),
    querySettings,
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

export const useGetUserCargo = (params, settings) => {
  return useQuery({
    queryKey: ["object/getUserCargo", params],
    queryFn: () => objectService.getUserCargo(params),
    ...settings,
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
