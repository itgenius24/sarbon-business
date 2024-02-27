"use client";

import { theme } from "@/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { YMaps } from "@pbe/react-yandex-maps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export function Providers({ children }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <CacheProvider theme={theme}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <YMaps
            query={{
              // load: "Map,Placemark",
              apikey: "983669bd-58ef-4054-8953-21f67b5c1466"
            }}>
            {children}
          </YMaps>
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
