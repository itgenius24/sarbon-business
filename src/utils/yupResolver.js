import { yupResolver as resolver } from "@hookform/resolvers/yup";

export const yupResolver = (scheme) => {

  return resolver(scheme);
};
