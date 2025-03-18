"use client";

import DashboardDispatcherTop from "@/modules/DashboardDispatcherTop/DashboardDispatcherTop";



export default function DashboardDispatcherPage({ params }) {
  const { locale } = params;
  return <DashboardDispatcherTop locale={locale} />;
}
