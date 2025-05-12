"use client";

import { CargoViews } from "@/modules/CargoTest/CargoViews";

export default function CargoViewsPage({ params: { locale } }) {

  return <CargoViews  locale={locale} />;
}
