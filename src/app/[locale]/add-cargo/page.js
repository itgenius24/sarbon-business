"use client";

import { Cargo } from "@/modules/Cargo";


export default function AddCargoPage({ params }) {
  const { locale } = params;
  return <Cargo locale={locale} />;
}
