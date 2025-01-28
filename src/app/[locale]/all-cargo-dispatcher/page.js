"use client";

import { AllCargoDispatcher } from "@/modules/AllCargoDispatcher";


export default function AllCargoDispatcherPage({ params }) {
  const { locale } = params;
  return <AllCargoDispatcher locale={locale} />;
}
