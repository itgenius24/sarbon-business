"use client";

import dynamic from "next/dynamic";

const PWAInstallPrompt = dynamic(
  () => import("./PWAInstallPrompt").then((mod) => ({ default: mod.PWAInstallPrompt })),
  {
    ssr: false,
    loading: () => null,
  }
);

export { PWAInstallPrompt };
