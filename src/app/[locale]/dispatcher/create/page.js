"use client";

import { DispatcherCreate } from "@/modules/DispatcherCreate";


export default function Dispatcher({params}) {
  const { locale } = params;
  return <DispatcherCreate locale={locale}/>;
}
