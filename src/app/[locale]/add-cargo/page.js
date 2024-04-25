"use client";
import cls from "./styles.module.scss";
import { Cargo } from "@/modules/Cargo";
import { useLoadingFormProps } from "../(components)/LoadingForm/useLoadingFormProps";
import { LoadingForm } from "../(components)/LoadingForm";

export default function AddCargoPage({ params }) {
  const { locale } = params;
  const formProps = useLoadingFormProps();
  return <div className={cls.cargo}>
    <LoadingForm {...formProps} />
    <Cargo
      loadingsWatch={formProps.watch}
      getLoadingsValues={formProps.getValues}
      setLoadingsValue={formProps.setValue}
      resetLoadings={formProps.reset}
      locale={locale}
      canEdit={true}
      setCanEdit={() => {}}
    />
  </div>;
}
