import request from "@/services/request";
import { useMutation, useQuery } from "@tanstack/react-query";

const objectService = {
  getNewsList: (params) => request.get("/v2/object-slim/get-list/news", { params }),
  getCompanyList: (params) => request.get("/v2/object-slim/get-list/company", { params }),
  getRoleList: (params) => request.get("/v2/object-slim/get-list/role", { params }),
  getCargoType: (params) => request.get("/v2/object-slim/get-list/cargo_type", { params }),
  getMeasurement: (params) => request.get("/v2/object-slim/get-list/measurement", { params }),
  getAddress: (params) => request.get("/v2/object-slim/get-list/address", { params }),
  getCarType: (params) => request.get("/v2/object-slim/get-list/vehicle_type", { params }),
  getCurrency: (params) => request.get("/v2/object-slim/get-list/currency", { params }),
  getPackage: (params) => request.get("/v2/object-slim/get-list/packages", { params }),
  getPaymentType: (params) => request.get("/v2/object-slim/get-list/map", { params }),
  getUserCargo: (params) => request.get("/v2/object-slim/get-list/cargo", { params }),
  getCarList: (params) => request.get("/v2/object-slim/get-list/route", { params }),
};


export const useGetCarListOnSubmit = (mutationSettings) => {
  return useMutation({
    mutationFn: (params) => objectService.getCarList(params),
    ...mutationSettings,
  });
};

export const useGetNewsList = (params, settings) => {
  return useQuery({
    queryKey: ["object/getNewsList", params],
    queryFn: () => objectService.getNewsList(params),
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
    ...props
  });
};

export const useGetCargoType = (params = { data: JSON.stringify({}) }) => {
  return useQuery({
    queryKey: ["object/getCargoType", params],
    queryFn: () => objectService.getCargoType(params),
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

export const useGetCarType = (params = { data: JSON.stringify({}) }) => {
  return useQuery({
    queryKey: ["object/getCarType", params],
    queryFn: () => objectService.getCarType(params),
  });
};

export const useGetCurrency = (params = { data: JSON.stringify({}) }) => {
  return useQuery({
    queryKey: ["object/getCurrency", params],
    queryFn: () => objectService.getCurrency(params),
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

export const useGetUserCargo = (params) => {
  return useQuery({
    queryKey: ["object/getUserCargo", params],
    queryFn: () => objectService.getUserCargo(params),
  });
};
