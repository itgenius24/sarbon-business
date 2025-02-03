"use client";

import { theme } from "@/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { YMaps } from "@pbe/react-yandex-maps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export function Providers({ children }) {
  const [queryClient] = React.useState(() => new QueryClient());
  

  useEffect(() => {
    console.log(`salom`,window.location.hostname.includes("furgo"))
    if (window.location.hostname.includes("furgo")) {
      window.location.href = "https://sarbon.me";
    }
  }, []);

  return (
    <CacheProvider theme={theme}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <YMaps
          lang={`en`}
            query={{
              load: "Map,Placemark",
              apikey: process.env.NEXT_PUBLIC_YANDEX_MAP_KEY,
              suggest_apikey: process.env.NEXT_PUBLIC_YANDEX_MAP_SUGGEST_KEY,
            }}>
            {children}
          </YMaps>
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
