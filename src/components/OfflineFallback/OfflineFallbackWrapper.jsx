"use client";

import dynamic from "next/dynamic";

const OfflineFallback = dynamic(
  () => import("./OfflineFallback").then((mod) => ({ default: mod.OfflineFallback })),
  {
    ssr: false,
    loading: () => (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: "#f6f7f8"
      }}>
        <div style={{ textAlign: "center" }}>
          <h1>Loading...</h1>
        </div>
      </div>
    ),
  }
);

export { OfflineFallback };
