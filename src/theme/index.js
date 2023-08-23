// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'
import Button from '@/theme/components/button'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac'
  }
}

export const theme = extendTheme({
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Roboto, sans-serif'
  },
  colors,
  components: {
    Button
  }
})
