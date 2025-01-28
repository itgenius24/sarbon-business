"use client";
import { CargoTest } from "@/modules/CargoTest";


export default function AddCargoPage({ params }) {
  const { locale } = params;
  return <CargoTest locale={locale} />;
}
