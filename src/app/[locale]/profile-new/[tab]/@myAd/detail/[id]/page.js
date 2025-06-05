"use client";

import { AdDetail } from "@/modules/AdDetail";

export default function Create({ params }) {
  const { id } = params;
  return <AdDetail id={id} />;
}
