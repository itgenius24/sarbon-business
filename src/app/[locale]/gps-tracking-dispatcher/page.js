"use client";

import GpsTrackingDispatcher from "@/modules/GpsTrackingDispatcher";



export default function GpsTracking({params}) {
  const {locale} = params;
  return <GpsTrackingDispatcher locale={locale}/>;
}
