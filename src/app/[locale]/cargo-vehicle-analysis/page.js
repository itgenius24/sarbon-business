"use client";

import { CargoVehicleAnalysisPage } from "@/modules/CargoVehicleAnalysis/CargoVehicleAnalysisPage";

export default function CargoVehicleAnalysisPageRoute({ params }) {
  const { locale } = params;
  return <CargoVehicleAnalysisPage locale={locale} />;
}
