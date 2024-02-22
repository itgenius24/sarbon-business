"use client";

import { theme } from "@/theme";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { YMaps as YandexMapsProvider } from "@pbe/react-yandex-maps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export function Providers({ children }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <CacheProvider theme={theme}>
      <ChakraProvider theme={theme}>
        <YandexMapsProvider>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </YandexMapsProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
