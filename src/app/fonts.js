import { Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  preload: true,
  adjustFontFallback: true,
});
