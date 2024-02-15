import "./globals.scss";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { MainLayout } from "@/layouts/MainLayout";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
  display: "swap"
});

export const metadata = {
  title: "Logistics",
  description: "X Logistics"
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='html layout'>
      <body className={inter.className}>
        <Providers>
          <MainLayout>
            {children}
          </MainLayout>
        </Providers>
      </body>
    </html>
  );
}
