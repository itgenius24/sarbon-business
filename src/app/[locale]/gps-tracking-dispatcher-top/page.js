"use client";

import GpsTrackingDispatcherTop from "@/modules/GpsTrackingDispatcherTop";




export default function GpsTracking({ params }) {
  const { locale } = params;
  return <GpsTrackingDispatcherTop locale={locale}/>;
}
