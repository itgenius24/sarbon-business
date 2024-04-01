import authStore from "@/store/auth.store";
import { useAddCargoContext } from "../../providers";
import { Disabled, Done, Process } from "../StageStatuses";
import { format } from "date-fns";
import { useGetStoreData } from "@/hooks/useGetStoreData";
import { useTranslation } from "@/app/i18n/client";
import { useGetLang } from "@/hooks/useGetLang";

export const useStagesProps = () => {

  const { watch, startDate, endDate } = useAddCargoContext();

  const locale = useGetLang();

  const { t } = useTranslation(locale, "translations");

  const cargoWeight = watch("weight_measurement");
  const cargoWeightUnit = watch("weight_unit");
  const cargoType = watch("cargo_type");
  const volumeMeasurement = watch("volume_measurement");

  const loadings = watch("loadings")[0];
  const unloading = watch("unloading")[0];

  const transportType = watch("car_type");
  const transportCount = watch("transport_count");

  const price = watch("price");
  const pricePrepayment = watch("price_prepayment");
  const priceAfter = watch("price_after_order");
  const priceUnit = watch("price_prepayment_unit");
  const paymentType = watch("payment_type");

  const additionalDataContact = watch("contact");

  const { value: userData } = useGetStoreData(authStore, "userData");
  const additionalDataName = userData?.login;

  function getStatus(type) {
    switch(type) {
      case "cargo": {
        if(cargoWeight && cargoType?.value && volumeMeasurement) return "done";
        else if(cargoWeight || cargoType?.value || volumeMeasurement) return "process";
        else return "disabled";
      }
      case "date": {
        if(startDate && endDate) return "done";
        else if(startDate || endDate) return "process";
        else return "disabled";
      }
      case "loadings": {
        if(loadings?.address && unloading?.address) return "done";
        else if(loadings?.address || unloading?.address) return "process";
        else return "disabled";
      }
      case "transport": {
        if(transportType?.value && transportCount) return "done";
        else if(transportType?.value || transportCount) return "process";
        else return "disabled";
      }
      case "payment": {
        if((price && pricePrepayment && priceAfter && paymentType?.value) || watch("bargain") === "request") return "done";
        else if(price || pricePrepayment || priceAfter || paymentType?.value) return "process";
        else return "disabled";
      }
      case "contact": {
        if(additionalDataContact) return "done";
        else return "disabled";
      }
    }
  }


  const cargoStatus = getStatus("cargo");
  const dateStatus = getStatus("date");
  const loadingsStatus = getStatus("loadings");
  const transportStatus = getStatus("transport");
  const paymentStatus = getStatus("payment");
  const contactStatus = getStatus("contact");

  const statuses = {
    process: Process,
    disabled: Disabled,
    done: Done
  };

  const stages = [
    {
      title: t("Груз"),
      status: cargoStatus,
      subtitle: cargoStatus === "done"
        ? `${cargoType?.label} ${cargoWeight} ${cargoWeightUnit?.label} ${volumeMeasurement} m³`
        : t("не заполнено")
    },
    {
      title: "Когда",
      status: dateStatus,
      subtitle: dateStatus === "done" ? format(startDate, "dd.MM.yyyy") + " -> " + format(endDate, "dd.MM.yyyy") : t("не заполнено")
    },
    {
      title: "Маршрут",
      status: loadingsStatus,
      subtitle: loadingsStatus === "done" ? loadings?.address + " - " + unloading?.address : t("не заполнено")
    },
    {
      title: "Транспорт",
      status: transportStatus,
      subtitle: transportStatus === "done" ? `${transportType?.label} ${transportCount} шт` : t("не заполнено")
    },
    {
      title: "Оплата",
      status: paymentStatus,
      subtitle: paymentStatus === "done" ? `${price} ${priceUnit?.label}` : t("не заполнено")
    },
    {
      title: "Дополнительно",
      status: contactStatus,
      subtitle: contactStatus === "done" ? additionalDataName + " " + additionalDataContact : t("не заполнено")
    }
  ];


  return {
    stages,
    statuses
  };

};
