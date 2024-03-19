import { format } from "date-fns";

export const formatDate = (date, dateFormat = "dd.MM.yyyy") => {
  let isValid = true;
  try {
    format(date, dateFormat);
  } catch(err) {
    isValid = false;
  }

  return isValid ? format(date, dateFormat) : "";
};
