"use client";
import Dashboard from "@/modules/Dashboard/Dashboard";


export default function DashboardPage({ params }) {
  const { locale } = params;
  return <Dashboard locale={locale} />;
}
