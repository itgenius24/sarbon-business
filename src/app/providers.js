'use client'

import { theme } from '@/theme'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ children }) {
  return (
    <CacheProvider theme={theme}>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>
  )
}
