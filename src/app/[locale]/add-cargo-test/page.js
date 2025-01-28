"use client";

import { CargoTest } from "@/modules/CargoTest";


export default function AddCargoPageTest({ params }) {
  const { locale } = params;
  return <CargoTest locale={locale} />;
}
