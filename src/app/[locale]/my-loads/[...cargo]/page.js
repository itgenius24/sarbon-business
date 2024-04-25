"use client";
import cls from "./styles.module.scss";
import { Cargo } from "@/modules/Cargo";
import { useLoadingFormProps } from "../../(components)/LoadingForm/useLoadingFormProps";
import { LoadingForm } from "../../(components)/LoadingForm";
import clsx from "clsx";
import { useState } from "react";

export default function Page({ params: { cargo, locale } }) {
  const [canEdit, setCanEdit] = useState(false);

  const [status, id] = cargo || [];

  const formProps = useLoadingFormProps();

  return <div className={clsx(cls.cargo, { [cls.moderation]: status === "in_moderation" })}>
    <LoadingForm
      isEditing={true}
      {...formProps}
      canEdit={canEdit}
    />
    <Cargo
      loadingsWatch={formProps.watch}
      getLoadingsValues={formProps.getValues}
      setLoadingsValue={formProps.setValue}
      resetLoadings={formProps.reset}
      status={status}
      id={id}
      locale={locale}
      setCanEdit={setCanEdit}
      canEdit={canEdit}
    />
  </div>;
}
