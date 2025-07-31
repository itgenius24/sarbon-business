"use client";
import { SearchLoadModule } from "@/modules/SearchLod";



export default function SearchLoad({ params }) {
  const { locale } = params
  return <SearchLoadModule locale={locale} />;
}
