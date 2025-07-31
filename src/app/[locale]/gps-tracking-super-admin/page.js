"use client";

import GpsTrackingCeo from "@/modules/GpsTrackingCeo";

export default function GpsTracking({ params }) {
  const { locale } = params;
  return <GpsTrackingCeo locale={locale}/>;
}
