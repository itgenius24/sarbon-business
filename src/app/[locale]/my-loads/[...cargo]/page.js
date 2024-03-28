"use client";
import { Cargo } from "@/modules/Cargo";

export default function Page({ params: { cargo } }) {

  const [status, id] = cargo || [];

  return <Cargo status={status} id={id} />;
}
