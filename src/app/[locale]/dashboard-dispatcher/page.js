"use client";

import DashboardDispatcher from "@/modules/DashboardDispatcher/DashboardDispatcher";


export default function DashboardDispatcherPage({ params }) {
  const { locale } = params;
  return <DashboardDispatcher locale={locale} />;
}
