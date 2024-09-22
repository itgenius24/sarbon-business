"use client";
import { Cargo } from "@/modules/Cargo";
import { CargoViews } from "@/modules/CargoTest/CargoViews";

export default function Page({ params: { cargo, locale } }) {

  const [status, id] = cargo || [];

  return <CargoViews status={status} id={id} locale={locale} />;
}
