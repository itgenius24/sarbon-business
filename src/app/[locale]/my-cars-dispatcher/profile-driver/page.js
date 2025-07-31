"use client";

import UserManagement from "@/modules/UserManagement/UserManagement";



export default function MyCarsDispatcher({ params }) {
  const { locale } = params;
  return <UserManagement locale={locale} />;
}
