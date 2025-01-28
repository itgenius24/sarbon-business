"use client";
import cls from "./styles.module.scss";
import { Cargo } from "@/modules/Cargo";
import { CargoViews } from "@/modules/CargoTest/CargoViews";
import { useState } from "react";

export default function Page({ params: { cargo, locale } }) {
  const [canEdit, setCanEdit] = useState(false);

  const [status, id] = cargo || [];

  return <CargoViews status={status} id={id} locale={locale} />;
}
