"use client";
import { Cargo } from "@/modules/Cargo";

export default function Page({ params: { cargo } }) {
  return <Cargo id={cargo} />;
}
